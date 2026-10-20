/**
 * Grade My Brain - App Controller
 * Compatible with Brave, Chrome, Safari, Firefox, and Edge.
 *
 * Flow: the player picks a version, then works through every question
 * without feedback. Every CHECKPOINT_EVERY questions (and at the end) a
 * review explains what they missed, offers a "how to think differently"
 * tip, gives a practice question on each missed bias, and adds a retest of
 * each missed bias to the end of the session, so the session grows with the
 * number of misses. Progress is saved in the browser (see progress.js); after a
 * full pass, the next session retests the bias types still answered wrong.
 */

import { sound } from './audio.js';
import { ScenarioBank, PAIRED_TESTS, BIAS_CATEGORIES, REVIEW_BLOCK, BONUS_TOKEN, SHORT_SESSION_MAX, OFFICE_SESSION_MAX } from './scenarioBank.js';
import { BiasAnalyzer } from './biasAnalyzer.js';
import { BrainChart } from './chart.js';
import { Progress } from './progress.js';

// Grades come from the share of reviewed answers that were right, so they
// mean the same thing however long the session runs
export const GRADES = [
    { min: 0, max: 49, grade: 'F', title: 'Fast Thinker', color: '#fb7185' },
    { min: 50, max: 59, grade: 'D', title: 'Brain in Training', color: '#f97316' },
    { min: 60, max: 69, grade: 'C', title: 'Curious Analyst', color: '#eab308' },
    { min: 70, max: 79, grade: 'B', title: 'Tactical Mind', color: '#3b82f6' },
    { min: 80, max: 89, grade: 'A', title: 'Grandmaster Strategist', color: '#8b5cf6' },
    { min: 90, max: 94, grade: 'S', title: 'Elite Mastermind', color: '#ec4899' },
    { min: 95, max: 100, grade: 'S+', title: 'Transcendent Genius', color: '#06b6d4' }
];
const UNGRADED = { grade: '?', title: 'Warming up', color: '#64748b' };

export const CHECKPOINT_EVERY = REVIEW_BLOCK;
// At most this many missed bias types get a practice question per review
const MAX_PRACTICE_PER_REVIEW = 3;
// Each bias type is retested at most this many times in one session
const MAX_RETESTS_PER_TOPIC = 2;
const STARTING_SCORE = 100;
const POINTS_CORRECT = 20;
// A miss costs nothing: points only ever go up for learning
const POINTS_WRONG = 0;
// The fake bonus pop-up appears once per player, at this question (0-based)
const BONUS_POPUP_AT = 6;
const BONUS_POPUP_SECONDS = 59;
// Averaging under this many seconds a question suggests clicking through
const FAST_ANSWER_SECONDS = 5;
// A question left open longer than this (the player stepped away) counts as this long
const MAX_COUNTED_SECONDS = 180;
// Switching away from the window more often than this while answering
// suggests looking things up
const LEAVE_WARNING_AFTER = 8;
// Hidden test: a pre-ticked "share to the leaderboard" box beside Continue on
// the first review at or after this question that isn't the last one
const LEADERBOARD_BOX_FROM = 20;

const KIND_LABELS = { deceptive: 'Deceptive practice', good: 'Better practice', example: 'Real-world case' };

function esc(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

// A friendly line after a review's tally, so a rough round never reads as a verdict
function missedCheer(missed, total) {
    if (missed === 0) return ' Flawless round!';
    if (missed * 2 >= total) return ' These are built to fool fast thinking, so that\'s normal. Each one below makes the next trick easier to spot.';
    return ' Nice going. The ones below show how each trick works.';
}

// Shown under the final grade: every grade gets encouragement, never a verdict
function gradeCheer(accuracy) {
    if (accuracy === null) return 'Your grade appears after your first review.';
    if (accuracy >= 90) return 'Your slow, careful brain was on duty. Very hard to trick!';
    if (accuracy >= 70) return 'You spotted most of the tricks. A few more rematches and you\'ll be untrickable.';
    if (accuracy >= 50) return 'Solid start. These questions are designed to catch everyone, and you caught a lot of them.';
    return 'Welcome to the club: these questions are designed to fool fast thinking, and they fool almost everyone at first. Every trick you review makes you harder to fool.';
}

// Work inboxes tag mail from outside the company. The domain is compared in
// its ASCII (punycode) form, so a lookalike with a Cyrillic letter is external.
function isExternalSender(sc, mail) {
    if (!sc.internalDomain) return false;
    const domain = mail.address.split('@')[1] || '';
    try {
        return new URL(`http://${domain}`).hostname !== sc.internalDomain;
    } catch (err) {
        return true;
    }
}

function externalTag(sc, mail) {
    return isExternalSender(sc, mail) ? '<span class="inbox-external">External</span>' : '';
}

// Seconds as m:ss
function formatTime(seconds) {
    const s = Math.round(seconds);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// The average time per question and, when it's very fast, a playful nudge
function paceHtml(times, scope) {
    if (!times || times.length === 0) return '';
    const average = times.reduce((sum, t) => sum + t, 0) / times.length;
    const shown = average < 1 ? 'under a second' : `${Math.round(average)} ${Math.round(average) === 1 ? 'second' : 'seconds'}`;
    const note = `<p class="pace-note">⏱ You averaged ${shown} per question ${scope}.</p>`;
    if (average >= FAST_ANSWER_SECONDS) return note;
    return note + `
        <div class="speed-run" role="note">
            <img src="images/speed-sloth.svg" alt="A sleepy sloth zooming along in a race car" width="150" height="98">
            <div>
                <p class="speed-run-title">⚡ Speed run detected!</p>
                <p>Under ${FAST_ANSWER_SECONDS} seconds a question usually means System 1 is doing the clicking.
                    These questions hide their tricks in the details, so give System 2 a few more seconds to read
                    each one.</p>
            </div>
        </div>`;
}

// A friendly note when the player keeps switching away while answering
function leavesHtml(count) {
    if (!count || count <= LEAVE_WARNING_AFTER) return '';
    return `
        <div class="pace-warning leave-warning">
            <strong>👀 Quick check:</strong> you switched away from this window ${count} times while answering.
            Looking things up or reaching for a calculator is a very System 2 move, but this game is about how you
            decide on your own, in the moment. Next time, try to stay on the page.
        </div>`;
}

function playSafely(fn) {
    try { fn(); } catch (err) { /* audio unavailable */ }
}

class GradeMyBrainApp {
    constructor() {
        this.progress = null;
        this.isProcessing = false;
        this.openedPolicy = false;

        // Header Elements
        this.scoreEl = document.getElementById('current-score');
        this.gradeBadgeEl = document.getElementById('grade-badge');
        this.gradeTitleEl = document.getElementById('grade-title');
        this.roundEl = document.getElementById('current-round');
        this.roundDotsEl = document.getElementById('round-dots');
        this.progressLabelEl = document.getElementById('progress-label');
        this.progressDetailEl = document.getElementById('progress-detail');
        this.progressTrackEl = document.getElementById('progress-track');
        this.soundToggleBtn = document.getElementById('sound-toggle-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.viewAuditBtn = document.getElementById('view-audit-btn');

        // Intro Elements
        this.introViewEl = document.getElementById('intro-view');
        this.introFormEl = document.getElementById('intro-form');
        this.consentEl = document.getElementById('privacy-consent');
        this.fullVersionCtaEl = document.getElementById('full-version-cta');
        this.fullVersionCtaTextEl = document.getElementById('full-version-cta-text');
        this.privacyLinkEl = document.getElementById('privacy-link');
        this.introContinueBtn = document.getElementById('intro-continue-btn');

        // Scenario Stage Elements
        this.scenarioStageEl = document.getElementById('scenario-stage');
        this.scenarioTitleEl = document.getElementById('scenario-title');
        this.scenarioTextEl = document.getElementById('scenario-text');
        this.scenarioMediaEl = document.getElementById('scenario-media');
        this.optionsContainerEl = document.getElementById('options-container');

        // Review Checkpoint
        this.checkpointEl = document.getElementById('checkpoint-view');

        // Summary Audit Modal Elements
        this.summaryModal = document.getElementById('summary-modal');
        this.closeAuditModalBtn = document.getElementById('close-audit-modal-btn');
        this.finalGradeBadge = document.getElementById('final-grade-badge');
        this.finalGradeTitle = document.getElementById('final-grade-title');
        this.finalScoreEl = document.getElementById('final-score');
        this.finalGradeCheerEl = document.getElementById('final-grade-cheer');
        this.finalPaceEl = document.getElementById('final-pace');
        this.sessionTimeEl = document.getElementById('session-time');
        this.answerOnYourOwnEl = document.getElementById('answer-on-your-own');
        this.statAccuracyEl = document.getElementById('stat-accuracy');
        this.progressSummaryEl = document.getElementById('progress-summary');
        this.auditPickerEl = document.getElementById('audit-session-picker');
        this.auditSelectEl = document.getElementById('audit-session-select');
        this.missedByTopicEl = document.getElementById('missed-by-topic');
        this.hiddenTestsEl = document.getElementById('hidden-tests');
        this.bonusPopupEl = document.getElementById('bonus-popup');
        this.bonusTimerEl = document.getElementById('bonus-timer');
        this.sys1BarEl = document.getElementById('sys1-bar');
        this.sys2BarEl = document.getElementById('sys2-bar');
        this.sys1ValEl = document.getElementById('sys1-val');
        this.sys2ValEl = document.getElementById('sys2-val');
        this.vulnerabilitiesListEl = document.getElementById('vulnerabilities-list');
        this.strengthsListEl = document.getElementById('strengths-list');
        this.playAgainBtn = document.getElementById('play-again-btn');

        this.init();
    }

    get session() {
        return this.progress ? this.progress.data.session : null;
    }

    init() {
        this.chart = new BrainChart('brain-chart');
        this.setupEventListeners();

        // One saved game per browser: resume it if there is one
        if (Progress.exists()) {
            this.progress = new Progress();
            this.enterGame();
        } else {
            this.showIntro();
        }
    }

    setupEventListeners() {
        window.addEventListener('blur', () => this.noteLeftWindow());
        window.addEventListener('focus', () => this.noteReturned());
        document.addEventListener('visibilitychange', () => (document.hidden ? this.noteLeftWindow() : this.noteReturned()));

        this.soundToggleBtn.onclick = () => {
            const isEnabled = sound.toggleSound();
            this.soundToggleBtn.classList.toggle('muted', !isEnabled);
            this.soundToggleBtn.textContent = isEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
        };

        // Clears this browser's saved game and goes back to the start screen
        this.restartBtn.onclick = () => {
            if (!window.confirm('Start over? This clears your progress in this browser.')) return;
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
            Progress.clear();
            this.progress = null;
            this.showIntro();
        };

        this.viewAuditBtn.onclick = () => {
            if (!this.session) return;
            playSafely(() => sound.playClick());
            this.showCognitiveAuditSummary({ final: false });
        };

        this.auditSelectEl.onchange = () => this.renderAudit(this.auditSelectEl.value);

        document.getElementById('bonus-claim-btn').onclick = () => this.answerBonusPopup(true);
        document.getElementById('bonus-decline-btn').onclick = () => this.answerBonusPopup(false);

        this.closeAuditModalBtn.onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
        };

        // Continues to the full version after the short one, then retests weak topics
        this.playAgainBtn.onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
            this.startSession(this.nextVersion());
        };
        document.getElementById('full-version-cta-btn').onclick = () => this.playAgainBtn.onclick();
        document.getElementById('exit-btn').onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
            this.renderGoodbye();
        };

        // Continue looks greyed out until the consent box is checked. Without
        // the box, it works only once the privacy policy has been opened
        // (section 3.2 of the policy says so).
        this.consentEl.onchange = () => {
            this.introContinueBtn.classList.toggle('looks-disabled', !this.consentEl.checked);
        };
        this.privacyLinkEl.onclick = () => { this.openedPolicy = true; };
        this.introFormEl.onsubmit = (e) => {
            e.preventDefault();
            this.handleIntroContinue();
        };
    }

    // --- Views ---

    showView(view, { scroll = true } = {}) {
        // The timer only runs while a question is on screen
        if (view !== 'question' && this.questionStartedAt) {
            clearInterval(this.timerTicker);
            this.questionStartedAt = null;
        }
        if (this.sessionTimeEl) this.renderSessionTime();
        this.introViewEl.hidden = view !== 'intro';
        // A hidden review keeps no stale buttons around (a practice inbox has its own Done button)
        if (view !== 'checkpoint') this.checkpointEl.innerHTML = '';
        document.body.classList.toggle('intro-mode', view === 'intro');
        this.scenarioStageEl.hidden = view !== 'question';
        this.checkpointEl.hidden = view !== 'checkpoint';
        this.viewAuditBtn.hidden = view === 'intro';
        this.restartBtn.hidden = view === 'intro';
        if (scroll) {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    }

    showIntro() {
        this.showView('intro');
        this.consentEl.checked = false;
        this.introContinueBtn.classList.add('looks-disabled');
        // A link ending in ?mode=office preselects the office version
        const linkMode = new URLSearchParams(location.search).get('mode') === 'office' ? 'office' : 'short';
        document.querySelector(`input[name="mode"][value="${linkMode}"]`).checked = true;
        // Rounded, since the start screen says "about"
        const about = version => Math.round(ScenarioBank.sessionLengthEstimate(version) / 5) * 5;
        document.getElementById('short-count').textContent = about('short');
        document.getElementById('office-count').textContent = about('office');
        this.updateHeaderUI();
        this.chart.updateHistory([{ round: 0, score: STARTING_SCORE }]);
    }

    // Starts this browser's saved game
    handleIntroContinue() {
        if (!this.consentEl.checked && !this.openedPolicy) return;
        playSafely(() => sound.playClick());
        this.progress = new Progress();
        this.progress.data.consent = { checked: this.consentEl.checked, openedPolicy: this.openedPolicy };
        this.progress.data.mode = document.querySelector('input[name="mode"]:checked').value === 'office' ? 'office' : 'short';
        this.progress.save();
        this.enterGame();
    }

    // Resumes the saved session, or starts a new one
    enterGame() {
        const session = this.session;
        const queueValid = session && session.queue.every(e => ScenarioBank.getScenario(e.id));
        // Sessions saved before padding existed: treat their whole queue as planned
        if (queueValid && session.plannedLength === undefined) session.plannedLength = session.queue.length;
        if (!queueValid) {
            this.startSession(this.firstVersion());
        } else if (session.phase === 'checkpoint') {
            this.renderCheckpoint();
        } else if (session.phase === 'complete') {
            this.showCognitiveAuditSummary({ final: true });
            this.renderCheckpoint();
        } else {
            this.renderQuestion();
        }
    }

    // --- Session Flow ---

    // `version` is 'short' (the default first session: security, technology
    // and dark patterns) or 'full' (everything not yet seen, plus retests)
    // The version a new player's first session uses
    firstVersion() {
        return this.progress.data.mode === 'office' ? 'office' : 'short';
    }

    // The version of the session after a completed one: the office version
    // keeps to its own questions; the short version goes on to the full one
    nextVersion() {
        return this.session && this.session.version === 'office' ? 'office' : 'full';
    }

    startSession(version = 'full') {
        // A session finished before archiving existed is saved before it's replaced
        const previous = this.session;
        if (previous && previous.phase === 'complete') this.progress.archiveSession(previous);

        // Once the short version's questions have all been seen, go on to the full version
        const seenIds = this.progress.seenIds;
        if (version === 'short' && ScenarioBank.mainQuestions('short').every(s => seenIds.has(s.id))) version = 'full';

        const { queue, plannedLength } = ScenarioBank.buildSession({
            seenIds,
            retestTypes: this.progress.retestTypes(),
            missedIds: this.progress.missedIds(),
            version
        });

        this.progress.data.session = {
            queue,
            plannedLength,
            version,
            startedAt: Date.now(),
            position: 0,
            phase: 'question',
            pendingPairs: {},
            unreviewed: [],
            reviewed: [],
            score: STARTING_SCORE,
            shownScore: STARTING_SCORE,
            history: [{ round: 0, score: STARTING_SCORE }],
            shownHistory: [{ round: 0, score: STARTING_SCORE }],
            lastReviewedPosition: 0,
            retestCounts: {},
            tokens: [],
            checkpoint: null
        };
        this.progress.save();

        if (queue.length === 0) {
            this.renderAllDone();
        } else {
            this.renderQuestion();
        }
    }

    // Percent of reviewed answers that were right, or null before the first review
    accuracyOf(session) {
        if (!session || session.reviewed.length === 0) return null;
        const right = session.reviewed.filter(i => i.correct).length;
        return Math.round((right / session.reviewed.length) * 100);
    }

    getGradeInfo(accuracy) {
        if (accuracy === null) return UNGRADED;
        return GRADES.find(g => accuracy >= g.min && accuracy <= g.max) || GRADES[0];
    }

    // The header only shows the score as of the last review, so it never
    // reveals whether the latest answer was right
    updateHeaderUI() {
        const session = this.session;
        const score = session ? session.shownScore : STARTING_SCORE;
        const gradeInfo = this.getGradeInfo(this.accuracyOf(session));

        this.scoreEl.textContent = score;
        this.gradeBadgeEl.textContent = gradeInfo.grade;
        this.gradeBadgeEl.style.backgroundColor = gradeInfo.color;
        this.gradeBadgeEl.style.boxShadow = `0 0 15px ${gradeInfo.color}88`;
        this.gradeTitleEl.textContent = gradeInfo.title;
        this.gradeTitleEl.style.color = gradeInfo.color;

        if (!session || session.queue.length === 0) {
            this.roundEl.textContent = '–';
            this.roundDotsEl.innerHTML = '';
            return;
        }
        // Rounds instead of "question 34 of 90": the total grows with retests,
        // and a round of 10 always ends in a review
        const { round, answeredInRound, roundSize } = this.roundInfo();
        this.roundEl.textContent = round;
        this.roundDotsEl.innerHTML = Array.from({ length: roundSize }, (_, i) => {
            const state = i < answeredInRound ? 'done' : (i === answeredInRound && session.phase === 'question' ? 'current' : '');
            return `<span class="round-dot ${state}"></span>`;
        }).join('');
        this.roundDotsEl.setAttribute('aria-label', `${answeredInRound} of ${roundSize} questions answered this round`);
        this.renderProgress();
    }

    // The current round of CHECKPOINT_EVERY questions and how far into it the player is
    roundInfo() {
        const session = this.session;
        const p = session.position;
        const inReview = session.phase !== 'question';
        const roundIndex = inReview ? Math.max(0, Math.ceil(p / CHECKPOINT_EVERY) - 1) : Math.floor(p / CHECKPOINT_EVERY);
        const roundStart = roundIndex * CHECKPOINT_EVERY;
        const roundSize = Math.min(CHECKPOINT_EVERY, session.queue.length - roundStart);
        return { round: roundIndex + 1, roundStart, roundSize, answeredInRound: Math.min(roundSize, p - roundStart) };
    }

    // One segment per round. Main rounds come first; rounds added for retests
    // follow in a different color, so main progress never moves backwards.
    renderProgress() {
        const session = this.session;
        const total = session.queue.length;
        const planned = Math.min(session.plannedLength ?? total, total);
        const p = session.position;
        const rounds = Math.ceil(total / CHECKPOINT_EVERY);
        const segments = Array.from({ length: rounds }, (_, i) => {
            const start = i * CHECKPOINT_EVERY;
            const size = Math.min(CHECKPOINT_EVERY, total - start);
            const fill = Math.max(0, Math.min(1, (p - start) / size));
            const isRetest = planned > 0 && start >= planned;
            return `<span class="progress-segment${isRetest ? ' retest' : ''}"><span class="progress-fill" style="width:${Math.round(fill * 100)}%"></span></span>`;
        });
        this.progressTrackEl.innerHTML = segments.join('');

        const mainDone = planned > 0 ? Math.min(1, p / planned) : 1;
        const percent = Math.round(mainDone * 100);
        this.progressTrackEl.setAttribute('aria-valuenow', String(percent));
        const retestRounds = rounds - Math.ceil(planned / CHECKPOINT_EVERY);

        let label;
        if (planned === 0 || p >= planned) {
            const retestRound = Math.floor((p - planned) / CHECKPOINT_EVERY) + 1;
            label = retestRounds > 0 ? `Retest round ${Math.min(retestRound, retestRounds)} of ${retestRounds}` : 'Final stretch';
        } else if (mainDone < 0.1) {
            label = 'Getting started';
        } else if (mainDone < 0.5) {
            label = 'Building momentum';
        } else if (mainDone < 0.75) {
            label = 'Past halfway';
        } else {
            label = 'Home stretch';
        }
        this.progressLabelEl.textContent = label;
        this.progressDetailEl.textContent = planned === 0
            ? 'Locking in what you learned'
            : `${percent}% of the main questions${retestRounds > 0 ? ` · ${retestRounds} retest ${retestRounds === 1 ? 'round' : 'rounds'} added` : ''}`;
    }

    renderQuestion() {
        const session = this.session;
        const sc = ScenarioBank.getScenario(session.queue[session.position].id);
        this.isProcessing = false;
        this.showView('question');
        this.updateHeaderUI();

        this.scenarioTitleEl.textContent = sc.title;
        this.scenarioTextEl.textContent = sc.scenarioText;
        this.startQuestionTimer();
        this.renderOnYourOwnReminder();
        this.maybeShowBonusPopup();
        this.scenarioMediaEl.innerHTML = this.imageHtml(sc) +
            (sc.mockScreen && !this.isInteractiveMock(sc) ? this.mockScreenHtml(sc, { interactive: false }) : '');
        this.renderOptions(this.optionsContainerEl, sc, opt => this.handleAnswer(opt));
    }

    // --- Hidden test: fake bonus pop-up ---

    maybeShowBonusPopup() {
        const tests = (this.progress.data.hiddenTests ||= {});
        if (tests.bonusPopup || this.session.position !== BONUS_POPUP_AT) return;
        tests.bonusPopup = { shownAt: Date.now(), clicked: null };
        this.progress.save();

        document.getElementById('bonus-thanks').hidden = true;
        document.getElementById('bonus-claim-btn').hidden = false;
        document.getElementById('bonus-decline-btn').hidden = false;
        this.bonusPopupEl.hidden = false;
        let remaining = BONUS_POPUP_SECONDS;
        this.bonusTimerEl.textContent = `0:${String(remaining).padStart(2, '0')}`;
        clearInterval(this.bonusTimer);
        this.bonusTimer = setInterval(() => {
            remaining--;
            this.bonusTimerEl.textContent = `0:${String(Math.max(0, remaining)).padStart(2, '0')}`;
            if (remaining <= 0) this.hideBonusPopup();
        }, 1000);
    }

    // Records the click only; the pop-up never asks for anything
    answerBonusPopup(clicked) {
        const test = this.progress.data.hiddenTests && this.progress.data.hiddenTests.bonusPopup;
        if (!test || test.clicked !== null) return;
        test.clicked = clicked;
        this.progress.save();
        if (clicked) {
            document.getElementById('bonus-claim-btn').hidden = true;
            document.getElementById('bonus-decline-btn').hidden = true;
            document.getElementById('bonus-thanks').hidden = false;
            setTimeout(() => this.hideBonusPopup(), 1200);
        } else {
            this.hideBonusPopup();
        }
    }

    hideBonusPopup() {
        clearInterval(this.bonusTimer);
        this.bonusPopupEl.hidden = true;
    }

    renderOptions(container, sc, onSelect) {
        container.innerHTML = '';
        if (sc.inbox) {
            this.renderInbox(container, sc, onSelect);
            return;
        }
        if (this.isInteractiveMock(sc)) {
            // The choices are the mock screen's own buttons and links
            container.innerHTML = this.mockScreenHtml(sc, { interactive: true });
            container.querySelectorAll('[data-option-index]').forEach(el => {
                el.onclick = (e) => {
                    e.preventDefault();
                    if (this.isProcessing) return;
                    playSafely(() => sound.playWagerSelect());
                    onSelect(sc.options[Number(el.dataset.optionIndex)]);
                };
            });
            return;
        }
        sc.options.forEach((opt, idx) => {
            const card = document.createElement('button');
            card.type = 'button';
            const rarityClass = opt.rarity ? ` rarity-${opt.rarity}` : '';
            const rarityBadgeHtml = opt.rarity ? `<span class="rarity-badge">${esc(opt.rarity.toUpperCase())}</span>` : '';

            card.className = `wager-card glass-panel clean-choice-card${rarityClass}`;
            card.dataset.optionIndex = String(idx);
            card.style.animationDelay = `${idx * 0.1}s`;
            card.innerHTML = `
                <div class="choice-text-box">
                    ${rarityBadgeHtml}
                    <p class="wager-desc choice-text">${esc(opt.text)}</p>
                </div>
                <div class="select-wager-btn glow-btn choice-select">Select Option →</div>
            `;
            card.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.isProcessing) return;
                playSafely(() => sound.playWagerSelect());
                onSelect(opt);
            };
            container.appendChild(card);
        });
    }

    handleAnswer(selectedOpt) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const session = this.session;
        (session.answerTimes ||= []).push(this.stopQuestionTimer());
        const entry = session.queue[session.position];
        const sc = ScenarioBank.getScenario(entry.id);
        this.progress.markSeen(sc.id);
        if (sc.token) this.tradeToken(sc.token, selectedOpt.value);

        if (sc.pair) {
            this.handlePairedAnswer(sc, entry, selectedOpt);
        } else {
            const correct = selectedOpt.isBest === true;
            this.addResult({
                kind: 'single',
                scenarioId: sc.id,
                biasType: sc.biasType,
                correct,
                biasValue: selectedOpt.biasValue ?? (correct ? 0 : 1),
                retest: entry.retest,
                yourAnswer: selectedOpt.text,
                inboxAnswers: selectedOpt.inboxAnswers || null
            });
        }

        session.position++;
        const atCheckpoint = session.position % CHECKPOINT_EVERY === 0 || session.position >= session.queue.length;
        if (atCheckpoint) {
            this.openCheckpoint();
        } else {
            this.progress.save();
            this.renderQuestion();
        }
    }

    // --- Switching away: counted only while a question is on screen ---

    // A tab switch fires both blur and visibilitychange, so each trip away counts once
    noteLeftWindow() {
        if (this.away) return;
        this.away = true;
        const session = this.session;
        if (!session || session.phase !== 'question' || this.scenarioStageEl.hidden) return;
        session.leftCount = (session.leftCount || 0) + 1;
        this.progress.save();
    }

    noteReturned() {
        this.away = false;
        this.renderOnYourOwnReminder();
    }

    // The line under each question becomes a highlighted reminder after many switches
    renderOnYourOwnReminder() {
        const count = this.session ? this.session.leftCount || 0 : 0;
        const warn = count > LEAVE_WARNING_AFTER;
        this.answerOnYourOwnEl.classList.toggle('answer-on-your-own-warn', warn);
        this.answerOnYourOwnEl.textContent = warn
            ? `👀 You've switched away from this window ${count} times. Please answer on your own: no looking things up.`
            : "Answer on your own: please don't look anything up.";
    }

    // --- Question timer: only time spent on questions counts ---

    startQuestionTimer() {
        this.questionStartedAt = Date.now();
        clearInterval(this.timerTicker);
        this.timerTicker = setInterval(() => this.renderSessionTime(), 1000);
        this.renderSessionTime();
    }

    // Seconds spent on the current question, capped for a player who stepped away
    stopQuestionTimer() {
        clearInterval(this.timerTicker);
        const seconds = this.questionStartedAt ? (Date.now() - this.questionStartedAt) / 1000 : 0;
        this.questionStartedAt = null;
        return Math.min(MAX_COUNTED_SECONDS, seconds);
    }

    renderSessionTime() {
        const session = this.session;
        const answered = session && session.answerTimes ? session.answerTimes.reduce((sum, t) => sum + t, 0) : 0;
        const current = this.questionStartedAt ? Math.min(MAX_COUNTED_SECONDS, (Date.now() - this.questionStartedAt) / 1000) : 0;
        this.sessionTimeEl.textContent = formatTime(answered + current);
    }

    // The first version of a pair is held until its partner is answered
    handlePairedAnswer(sc, entry, selectedOpt) {
        const session = this.session;
        const earlier = session.pendingPairs[sc.pair];
        if (!earlier) {
            session.pendingPairs[sc.pair] = {
                scenarioId: sc.id,
                answer: selectedOpt.text,
                value: selectedOpt.value,
                retest: entry.retest
            };
            return;
        }

        const pair = PAIRED_TESTS[sc.pair];
        // isConsistent expects the answers in the order the versions are defined
        const valueFor = id => (id === sc.id ? selectedOpt.value : earlier.value);
        const [firstVersion, secondVersion] = pair.versions;
        const correct = pair.isConsistent(valueFor(firstVersion.id), valueFor(secondVersion.id));
        delete session.pendingPairs[sc.pair];

        this.addResult({
            kind: 'pair',
            pairId: sc.pair,
            scenarioId: sc.id,
            biasType: sc.biasType,
            correct,
            biasValue: correct ? 0 : 1,
            retest: entry.retest || earlier.retest,
            answers: [
                { scenarioId: earlier.scenarioId, answer: earlier.answer, value: earlier.value },
                { scenarioId: sc.id, answer: selectedOpt.text, value: selectedOpt.value }
            ]
        });
    }

    // Runs a Bonus Token trade with a random drawn price (the Becker-DeGroot-
    // Marschak method): stating your true value is always the best choice.
    // Points from the trade and the token's payout land at the next review.
    tradeToken(kind, price) {
        const session = this.session;
        const drawn = Math.floor(Math.random() * (BONUS_TOKEN.maxDrawnPrice + 1));
        const traded = kind === 'sell' ? drawn >= price : drawn <= price;
        const held = kind === 'sell' ? !traded : traded;
        const cash = !traded ? 0 : (kind === 'sell' ? drawn : -drawn);
        (session.tokens ||= []).push({ kind, price, drawn, traded, held, cash, payout: null });
    }

    // Flips the coin for every token still held and applies all token points at once
    settleTokens() {
        const session = this.session;
        const tokens = session.tokens || [];
        session.tokens = [];
        tokens.forEach(t => {
            t.payout = t.held ? (Math.random() < BONUS_TOKEN.chance ? BONUS_TOKEN.payout : 0) : 0;
            t.net = t.cash + t.payout;
        });
        const net = tokens.reduce((sum, t) => sum + t.net, 0);
        if (net !== 0) {
            session.score = Math.max(0, session.score + net);
            session.history.push({ round: session.history.length, score: session.score });
        }
        return tokens;
    }

    // Scores a result now but leaves it hidden until the next review
    addResult(item) {
        const session = this.session;
        session.score = Math.max(0, session.score + (item.correct ? POINTS_CORRECT : POINTS_WRONG));
        session.history.push({ round: session.history.length, score: session.score });
        session.unreviewed.push(item);
        this.progress.recordResult({
            scenarioId: item.scenarioId,
            biasType: item.biasType,
            correct: item.correct,
            kind: item.retest ? 'retest' : 'main'
        });
    }

    openCheckpoint() {
        const session = this.session;
        const items = session.unreviewed;
        session.unreviewed = [];
        const tokens = this.settleTokens();

        // Questions still to come this session are never used for practice
        const upcoming = new Set(session.queue.slice(session.position).map(e => e.id));
        // The short version leaves unseen full-version questions for the full version
        const seenNow = this.progress.seenIds;
        const reservedForFull = session.version === 'short'
            ? ScenarioBank.mainQuestions('full').filter(sc => !sc.short && !seenNow.has(sc.id)).map(sc => sc.id)
            : [];
        const excluded = new Set([...upcoming, ...items.map(i => i.scenarioId), ...reservedForFull]);
        const missedTypes = [...new Set(items.filter(i => !i.correct).map(i => i.biasType))];
        const practice = missedTypes.slice(0, MAX_PRACTICE_PER_REVIEW).map(biasType => {
            const sc = ScenarioBank.pickPracticeScenario(biasType, { seenIds: this.progress.seenIds, excludeIds: excluded, version: session.version });
            if (sc) excluded.add(sc.id);
            return { biasType, scenarioId: sc ? sc.id : null, answer: null };
        });

        // Each missed bias type earns a retest at the end of the session. It
        // may re-ask a question answered earlier, but never one still coming
        // up, one already queued as a retest, or one used for practice now.
        session.retestCounts ||= {};
        const unavailable = new Set([
            ...upcoming,
            ...reservedForFull,
            ...session.queue.filter(e => e.retest).map(e => e.id),
            ...practice.map(p => p.scenarioId).filter(Boolean)
        ]);
        const askedIds = new Set([...this.progress.seenIds, ...session.queue.slice(0, session.position).map(e => e.id)]);
        const missedIds = this.progress.missedIds();
        const addedRetests = [];
        // The short and office versions stop adding retests at their length caps
        const sessionMax = { short: SHORT_SESSION_MAX, office: OFFICE_SESSION_MAX }[session.version];
        for (const biasType of missedTypes) {
            if ((session.retestCounts[biasType] || 0) >= MAX_RETESTS_PER_TOPIC) continue;
            if (sessionMax && session.queue.length >= sessionMax) break;
            const sc = ScenarioBank.pickRetestScenario(biasType, { excludeIds: unavailable, missedIds, askedIds, version: session.version });
            if (!sc) continue;
            unavailable.add(sc.id);
            session.queue.push({ id: sc.id, retest: true });
            session.retestCounts[biasType] = (session.retestCounts[biasType] || 0) + 1;
            addedRetests.push(biasType);
        }
        // Mix a few straightforward questions in with the new retests
        if (addedRetests.length > 0) {
            ScenarioBank.padTail(session.queue, {
                tailStart: Math.max(session.position, session.plannedLength || 0),
                seenIds: this.progress.seenIds,
                version: session.version
            });
            // Padding never pushes a session past its cap
            for (let i = session.queue.length - 1; sessionMax && session.queue.length > sessionMax && i >= session.position; i--) {
                if (session.queue[i].pad) session.queue.splice(i, 1);
            }
        }

        session.checkpoint = {
            from: session.lastReviewedPosition + 1,
            to: session.position,
            delta: session.score - session.shownScore,
            pendingCount: Object.keys(session.pendingPairs).length,
            addedRetests,
            tokens,
            items,
            practice
        };
        session.reviewed.push(...items);
        session.shownScore = session.score;
        session.shownHistory = [...session.history];
        session.lastReviewedPosition = session.position;
        session.phase = 'checkpoint';
        this.progress.save();

        playSafely(() => (session.checkpoint.delta >= 0 ? sound.playWin() : sound.playLoss()));
        this.renderCheckpoint();
    }

    // Hidden test: there is no leaderboard; the box only records whether the
    // player left it ticked. It appears once per saved game (again after a reload).
    showLeaderboardBox(cp, isLast) {
        const tests = (this.progress.data.hiddenTests ||= {});
        if (tests.leaderboard) return tests.leaderboard.kept === null && tests.leaderboard.at === cp.to;
        if (isLast || cp.to < LEADERBOARD_BOX_FROM) return false;
        tests.leaderboard = { at: cp.to, kept: null };
        this.progress.save();
        return true;
    }

    handleCheckpointContinue() {
        playSafely(() => sound.playClick());
        const box = this.checkpointEl.querySelector('#leaderboard-share');
        if (box) this.progress.data.hiddenTests.leaderboard.kept = box.checked;
        const session = this.session;
        if (session.position >= session.queue.length) {
            this.finishSession();
            return;
        }
        session.checkpoint = null;
        session.phase = 'question';
        this.progress.save();
        this.renderQuestion();
    }

    finishSession() {
        const session = this.session;
        if (session.phase !== 'complete') {
            session.phase = 'complete';
            this.progress.data.sessionsCompleted++;
            this.progress.archiveSession(session);
            this.progress.save();
        }
        this.showCognitiveAuditSummary({ final: true });
    }

    // --- Review Checkpoint Rendering ---

    renderCheckpoint({ scroll = true } = {}) {
        const session = this.session;
        const cp = session.checkpoint;
        this.showView('checkpoint', { scroll });
        this.updateHeaderUI();
        this.chart.updateHistory(session.shownHistory);
        if (!cp) {
            this.checkpointEl.innerHTML = '';
            return;
        }

        const missed = cp.items.filter(i => !i.correct);
        const right = cp.items.filter(i => i.correct);
        const isLast = session.position >= session.queue.length;
        const deltaText = `${cp.delta >= 0 ? '+' : ''}${cp.delta} PTS`;
        const scoredText = cp.items.length === 0
            ? "You'll see how you did on these questions in your next review."
            : `You got ${right.length} of ${cp.items.length} scored ${cp.items.length === 1 ? 'question' : 'questions'} right.${missedCheer(missed.length, cp.items.length)}`;
        const pendingText = cp.pendingCount > 0
            ? ` ${cp.pendingCount} ${cp.pendingCount === 1 ? 'question is' : 'questions are'} paired with one still to come and will be scored later.`
            : '';
        const retestCount = (cp.addedRetests || []).length;
        const retestText = retestCount > 0
            ? ` ${retestCount === 1 ? 'One rematch question has' : `${retestCount} rematch questions have`} been added to the end of this session, so you can show what you learned.`
            : '';

        this.checkpointEl.innerHTML = `
            <div class="checkpoint-head">
                <div>
                    <p class="checkpoint-eyebrow">Round ${Math.ceil(cp.to / CHECKPOINT_EVERY)} review</p>
                    <h2 class="checkpoint-title">${missed.length === 0 ? 'Nothing tripped you up 🎉' : 'The tricks that got you'}</h2>
                </div>
                <span class="breakdown-delta-badge ${cp.delta >= 0 ? 'delta-up' : 'delta-down'}">${deltaText}</span>
            </div>
            <p class="checkpoint-summary">${esc(scoredText + pendingText + retestText)}</p>
            ${paceHtml((session.answerTimes || []).slice(cp.from - 1, cp.to), 'this round')}
            ${leavesHtml(session.leftCount)}
            ${this.tokenResultsHtml(cp.tokens || [])}

            ${missed.length > 0 ? `
                <section class="missed-section" aria-labelledby="missed-heading">
                    <h3 id="missed-heading" class="missed-heading">Worth a second look <span class="missed-count">${missed.length} to learn from</span></h3>
                    <p class="checkpoint-summary">Each one shows how the trick works. Try the practice questions before moving on; they're just for fun and don't affect your score.</p>
                    <div class="review-list">${this.missedWithPracticeHtml(missed, cp.practice)}</div>
                </section>` : ''}

            ${this.showLeaderboardBox(cp, isLast) ? `
                <label class="consent-row leaderboard-row" for="leaderboard-share">
                    <input type="checkbox" id="leaderboard-share" checked>
                    <span>Share my results on the public Grade My Brain leaderboard</span>
                </label>` : ''}
            <button id="checkpoint-continue-btn" class="glow-btn checkpoint-continue" type="button">
                ${isLast ? 'See your session results →' : `Continue to question ${session.position + 1} →`}
            </button>

            ${right.length > 0 ? `
                <details class="right-answers" ${missed.length === 0 ? 'open' : ''}>
                    <summary>What you got right (${right.length})</summary>
                    <div class="review-list">${right.map(i => this.reviewCardHtml(i)).join('')}</div>
                </details>` : ''}
        `;

        cp.practice.forEach((p, idx) => {
            if (!p.scenarioId || p.answer) return;
            const container = this.checkpointEl.querySelector(`#practice-options-${idx}`);
            const sc = ScenarioBank.getScenario(p.scenarioId);
            this.isProcessing = false;
            this.renderOptions(container, sc, opt => this.handlePracticeAnswer(idx, opt));
        });
        this.checkpointEl.querySelector('#checkpoint-continue-btn').onclick = () => this.handleCheckpointContinue();
    }

    tokenResultsHtml(tokens) {
        if (tokens.length === 0) return '';
        const pts = n => `${n} ${Math.abs(n) === 1 ? 'point' : 'points'}`;
        const line = t => {
            if (t.kind === 'sell') {
                const trade = t.traded
                    ? `The drawn price was ${t.drawn}, at least your ${t.price}, so you sold it for ${pts(t.drawn)}.`
                    : `The drawn price was ${t.drawn}, below your ${t.price}, so you kept it`;
                return t.traded ? trade : `${trade}, and it paid ${pts(t.payout)}.`;
            }
            if (!t.traded) return `You'd pay up to ${t.price}. The drawn price was ${t.drawn}, so there was no sale.`;
            return `You'd pay up to ${t.price}. The drawn price was ${t.drawn}, so you bought it for ${pts(t.drawn)}, and it paid ${pts(t.payout)}.`;
        };
        const net = tokens.reduce((sum, t) => sum + t.net, 0);
        return `
            <div class="token-results">
                <p class="token-results-title">Bonus Tokens · ${net >= 0 ? '+' : ''}${pts(net)}</p>
                <ul>${tokens.map(t => `<li>${esc(line(t))}</li>`).join('')}</ul>
                <p class="token-results-note">Token points don't affect your accuracy grade.</p>
            </div>`;
    }

    // Each missed question, followed by the practice question for its bias
    // type right after the first miss of that type
    missedWithPracticeHtml(missed, practice) {
        const placed = new Set();
        return missed.map(item => {
            let html = this.reviewCardHtml(item);
            const idx = practice.findIndex(p => p.biasType === item.biasType);
            if (idx !== -1 && !placed.has(idx)) {
                placed.add(idx);
                html += this.practiceCardHtml(practice[idx], idx);
            }
            return html;
        }).join('');
    }

    // True when a question's answer choices are the buttons of its mock screen;
    // otherwise the screen is shown as a picture above ordinary choices
    isInteractiveMock(sc) {
        return Boolean(sc.mockScreen) && sc.options.every(o => o.ui);
    }

    // A realistic screen (app dialog, phone, browser page, cookie banner, or
    // installer). When `interactive`, the options with a `ui` role are its
    // clickable buttons; in reviews it is shown again, not clickable.
    mockScreenHtml(sc, { interactive, compact = false }) {
        const m = sc.mockScreen;
        const kind = m.kind || 'dialog';
        const live = interactive && this.isInteractiveMock(sc);
        const button = (opt, cls) => {
            const idx = sc.options.indexOf(opt);
            return live
                ? `<button type="button" class="${cls}" data-option-index="${idx}">${esc(opt.label)}</button>`
                : `<span class="${cls}" aria-hidden="true">${esc(opt.label)}</span>`;
        };
        const roles = (...names) => names.flatMap(r => sc.options.filter(o => o.ui === r));
        const staticButtons = labels => (labels || []).map((label, i) =>
            `<span class="mock-btn ${i === labels.length - 1 ? 'mock-btn-primary' : 'mock-btn-secondary'}" aria-hidden="true">${esc(label)}</span>`).join('');
        const bullets = m.bullets ? `<ul class="mock-bullets">${m.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';

        let screen;
        if (kind === 'phone') {
            screen = `
                <div class="mock-phone">
                    <div class="mock-phone-status"><span>${esc(m.time)}</span><span>📶 🔋</span></div>
                    ${m.stacked ? `<p class="mock-phone-stacked">${esc(m.stacked)}</p>` : ''}
                    ${m.message ? `<div class="mock-phone-message"><p class="mock-phone-from">${esc(m.message.from)}</p><p>${esc(m.message.text)}</p></div>` : ''}
                    <div class="mock-phone-prompt">
                        <p class="mock-heading">${esc(m.heading)}</p>
                        <p class="mock-text">${esc(m.body)}</p>
                        <div class="mock-btn-row">${roles('primary', 'secondary').map(o => button(o, `mock-btn ${o.ui === 'primary' ? 'mock-btn-primary' : 'mock-btn-secondary'}`)).join('')}</div>
                        ${roles('link').map(o => button(o, 'mock-btn mock-btn-link')).join('')}
                    </div>
                </div>`;
        } else if (kind === 'browser') {
            screen = `
                <div class="mock-browser${m.alarm ? ' mock-browser-alarm' : ''}">
                    <div class="mock-browser-bar">
                        <span class="mock-url${m.urlWarning ? ' mock-url-warning' : ''}">${m.urlWarning ? '⚠ Not secure · ' : '🔒 '}${esc(m.url)}</span>
                    </div>
                    <div class="mock-browser-page">
                        <p class="mock-heading">${esc(m.heading)}</p>
                        <p class="mock-text">${esc(m.body)}</p>
                        ${live || roles('primary', 'secondary', 'link').length ? `
                            ${roles('primary', 'secondary').map(o => button(o, `mock-btn ${o.ui === 'primary' ? 'mock-btn-primary' : 'mock-btn-secondary'}`)).join('')}
                            ${roles('link').map(o => button(o, 'mock-btn mock-btn-link')).join('')}` : `<div class="mock-btn-row">${staticButtons(m.buttons)}</div>`}
                    </div>
                </div>`;
        } else if (kind === 'banner') {
            screen = `
                <div class="mock-page">
                    <div class="mock-page-masthead">${esc(m.brand)}</div>
                    <div class="mock-page-lines"><span></span><span></span><span></span><span></span></div>
                    <div class="mock-cookie-banner">
                        ${roles('close').map(o => button(o, 'mock-btn mock-btn-close')).join('')}
                        <p class="mock-heading">${esc(m.heading)}</p>
                        <p class="mock-text">${esc(m.body)}</p>
                        <div class="mock-btn-row">
                            ${roles('link').map(o => button(o, 'mock-btn mock-btn-link')).join('')}
                            ${roles('primary').map(o => button(o, 'mock-btn mock-btn-primary')).join('')}
                        </div>
                    </div>
                </div>`;
        } else if (kind === 'email') {
            screen = `
                <div class="mock-email">
                    <div class="mock-email-head">
                        <p class="mock-email-subject">${esc(m.subject)}</p>
                        <p class="mock-email-meta"><strong>${esc(m.from)}</strong> &lt;${esc(m.address)}&gt;</p>
                        <p class="mock-email-meta">To: ${esc(m.to)}</p>
                    </div>
                    <div class="mock-email-body">
                        ${m.body.map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('')}
                        <span class="mock-btn mock-btn-primary mock-email-button" aria-hidden="true">${esc(m.button)}</span>
                    </div>
                    ${m.linkPreview ? `<p class="mock-email-status" title="Where the button's link goes">${esc(m.linkPreview)}</p>` : ''}
                </div>`;
        } else if (kind === 'installer') {
            screen = `
                <div class="mock-installer">
                    <div class="mock-installer-bar"><span>${esc(m.brand)}</span><span>${esc(m.step)}</span></div>
                    <div class="mock-installer-body">
                        <p class="mock-heading">${esc(m.heading)}</p>
                        <p class="mock-checkbox"><span class="mock-checkbox-box" aria-hidden="true">✓</span>${esc(m.checkbox)}</p>
                    </div>
                    <div class="mock-installer-footer">${staticButtons(m.buttons)}</div>
                </div>`;
        } else {
            screen = `
                <div class="mock-screen">
                    <div class="mock-screen-bar"><span class="mock-brand">${esc(m.brand)}</span>${m.step ? `<span class="mock-step">${esc(m.step)}</span>` : ''}</div>
                    <div class="mock-screen-body">
                        <p class="mock-heading">${esc(m.heading)}</p>
                        <p class="mock-text">${esc(m.body)}</p>
                        ${bullets}
                        ${m.offer ? `
                            <div class="mock-offer">
                                <p class="mock-offer-label">${esc(m.offer.label)}</p>
                                <p class="mock-offer-text">${esc(m.offer.text)}</p>
                                ${roles('offer').map(o => button(o, 'mock-btn mock-btn-offer')).join('')}
                            </div>` : ''}
                        ${roles('primary').map(o => button(o, 'mock-btn mock-btn-primary')).join('')}
                        ${roles('secondary').map(o => button(o, 'mock-btn mock-btn-secondary')).join('')}
                        ${roles('link').map(o => button(o, 'mock-btn mock-btn-link')).join('')}
                    </div>
                </div>`;
        }
        return `
            <figure class="mock-screen-wrap${live ? '' : ' mock-screen-static'}${compact ? ' mock-screen-compact' : ''}" role="group" aria-label="Mock screen: ${esc(m.heading)}">
                ${screen}
                <figcaption>Mock screen from a fictional service.</figcaption>
            </figure>`;
    }

    // The phishing inbox: the player marks each email, then submits the lot
    renderInbox(container, sc, onSelect) {
        const choices = {};
        const n = sc.inbox.length;
        container.innerHTML = `
            <div class="inbox-wrap">
                <div class="inbox">
                    <div class="inbox-bar">Inbox · ${n} unread</div>
                    ${sc.inbox.map((mail, i) => `
                        <div class="inbox-row" data-row="${i}">
                            <p class="inbox-from">${externalTag(sc, mail)}<strong>${esc(mail.from)}</strong> <span class="inbox-address">&lt;${esc(mail.address)}&gt;</span></p>
                            <p class="inbox-subject">${esc(mail.subject)}</p>
                            <p class="inbox-preview">${esc(mail.preview)}</p>
                            <div class="inbox-actions">
                                <button type="button" class="inbox-choice" data-inbox-row="${i}" data-inbox-choice="report" aria-pressed="false">Report phishing</button>
                                <button type="button" class="inbox-choice" data-inbox-row="${i}" data-inbox-choice="keep" aria-pressed="false">Keep</button>
                            </div>
                        </div>`).join('')}
                </div>
                <button type="button" id="inbox-submit" class="glow-btn inbox-submit" disabled>Mark every email to finish (0 of ${n})</button>
            </div>`;
        const submit = container.querySelector('#inbox-submit');
        container.querySelectorAll('.inbox-choice').forEach(btn => {
            btn.onclick = () => {
                const row = Number(btn.dataset.inboxRow);
                choices[row] = btn.dataset.inboxChoice;
                container.querySelectorAll(`.inbox-choice[data-inbox-row="${row}"]`).forEach(b =>
                    b.setAttribute('aria-pressed', String(b === btn)));
                const done = Object.keys(choices).length;
                submit.disabled = done < n;
                submit.textContent = done < n ? `Mark every email to finish (${done} of ${n})` : 'Done sorting →';
            };
        });
        submit.onclick = () => {
            if (this.isProcessing || Object.keys(choices).length < n) return;
            playSafely(() => sound.playWagerSelect());
            const mistakes = sc.inbox.filter((mail, i) => (choices[i] === 'report') !== mail.phish).length;
            onSelect({
                text: mistakes === 0 ? 'Sorted every email correctly' : `Sorted ${n - mistakes} of ${n} emails correctly`,
                isBest: mistakes === 0,
                biasValue: mistakes / n,
                inboxAnswers: { ...choices }
            });
        };
    }

    // Per-email results for a sorted inbox, shown in reviews
    inboxResultsHtml(sc, answers) {
        return `
            <div class="inbox-results">
                ${sc.inbox.map((mail, i) => {
                    const yours = answers ? answers[i] : null;
                    const right = mail.phish ? 'report' : 'keep';
                    const ok = yours === right;
                    return `
                        <div class="inbox-result ${yours ? (ok ? 'inbox-ok' : 'inbox-wrong') : ''}">
                            <p class="inbox-from">${externalTag(sc, mail)}<strong>${i + 1}. ${esc(mail.from)}</strong> <span class="inbox-address">&lt;${esc(mail.address)}&gt;</span></p>
                            ${mail.realAddress ? `<p class="inbox-real-address">Really: <span class="inbox-address">${esc(mail.realAddress)}</span></p>` : ''}
                            <p class="inbox-subject">${esc(mail.subject)}</p>
                            <p class="inbox-verdict">${yours ? `${ok ? '✓' : '✗'} You chose ${yours === 'report' ? 'Report' : 'Keep'}. ` : ''}${mail.phish ? 'Phishing' : 'Real'}: ${esc(mail.why)}</p>
                        </div>`;
                }).join('')}
            </div>`;
    }

    // An ad image for questions that have one; select it to see it full size
    imageHtml(sc, { compact = false } = {}) {
        if (!sc.image) return '';
        return `
            <figure class="ad-figure${compact ? ' ad-figure-compact' : ''}">
                <a href="${esc(sc.image.src)}" target="_blank" rel="noopener">
                    <img src="${esc(sc.image.src)}" alt="${esc(sc.image.alt)}" width="640" height="400" loading="lazy">
                </a>
                <figcaption>Mock advertisement for a fictional brand. Select the image to see it full size.</figcaption>
            </figure>`;
    }

    // False for a saved result whose question has since been removed from the bank
    isKnownItem(item) {
        return item.kind === 'pair' ? Boolean(PAIRED_TESTS[item.pairId]) : Boolean(ScenarioBank.getScenario(item.scenarioId));
    }

    reviewCardHtml(item, { showExamples = true } = {}) {
        const category = BIAS_CATEGORIES[item.biasType];
        const retestBadge = item.retest
            ? `<span class="retest-badge">${item.correct ? 'Rematch · learned it' : 'Rematch · still sneaky'}</span>`
            : '';

        let title, body, bestAnswer, reasoning, biasName, bookRef;
        if (item.kind === 'pair') {
            const pair = PAIRED_TESTS[item.pairId];
            const versionFor = id => pair.versions.find(v => v.id === id);
            title = pair.biasName;
            body = item.answers.map(a => {
                const v = versionFor(a.scenarioId);
                return `
                    <div class="pair-version">
                        <p class="pair-version-label">${esc(v.label)} · ${esc(v.title)}</p>
                        <p class="review-scenario">${esc(v.scenarioText)}</p>
                        <p class="answer-row"><span class="answer-label">Your answer</span><span class="answer-yours">${esc(a.answer)}</span></p>
                    </div>`;
            }).join('');
            ({ bestAnswer, reasoning, biasName, bookRef } = pair);
            // A pair can explain the player's own answers (older saves have no values)
            const values = pair.versions.map(v => (item.answers.find(a => a.scenarioId === v.id) || {}).value);
            if (pair.diagnose && values.every(v => v !== undefined)) {
                body += `<p class="answer-row answer-diagnosis"><span class="answer-label">What happened</span><span>${esc(pair.diagnose(...values))}</span></p>`;
            }
        } else {
            const sc = ScenarioBank.getScenario(item.scenarioId);
            title = sc.title;
            body = `
                ${this.imageHtml(sc, { compact: true })}
                ${sc.mockScreen ? this.mockScreenHtml(sc, { interactive: false, compact: true }) : ''}
                ${sc.inbox ? this.inboxResultsHtml(sc, item.inboxAnswers) : ''}
                <p class="review-scenario">${esc(sc.scenarioText)}</p>
                <p class="answer-row"><span class="answer-label">Your answer</span><span class="answer-yours">${esc(item.yourAnswer)}</span></p>`;
            ({ bestAnswer, reasoning, biasName, bookRef } = sc);
        }

        return `
            <article class="review-card ${item.correct ? 'review-right' : 'review-missed'}">
                <div class="review-card-top">
                    <span class="bias-chip">${esc(biasName)}</span>
                    ${retestBadge}
                </div>
                <h4 class="review-title">${esc(title)}</h4>
                ${body}
                <p class="answer-row"><span class="answer-label">${item.correct ? 'Best answer' : 'Better answer'}</span><span class="answer-best">${esc(bestAnswer)}</span></p>
                <p class="review-reasoning">${esc(reasoning)}</p>
                <span class="book-ref">📖 ${esc(bookRef)}</span>
                ${item.correct || !showExamples ? '' : this.examplesHtml(category)}
            </article>`;
    }

    examplesHtml(category) {
        const examples = (category && category.examples) || [];
        if (examples.length === 0) return '';
        return `
            <div class="realworld">
                <p class="realworld-title">Seen in the real world</p>
                <ul class="realworld-list">
                    ${examples.map(ex => `
                        <li>
                            <span class="kind-tag kind-${esc(ex.kind)}">${esc(KIND_LABELS[ex.kind] || 'Example')}</span>
                            <a href="${esc(ex.url)}" target="_blank" rel="noopener noreferrer">${esc(ex.label)}</a>
                            ${ex.source ? `<span class="realworld-source">${esc(ex.source)}</span>` : ''}
                        </li>`).join('')}
                </ul>
            </div>`;
    }

    practiceCardHtml(practice, idx) {
        const category = BIAS_CATEGORIES[practice.biasType];
        const tipHtml = `
            <p class="practice-eyebrow">${practice.scenarioId ? 'Practice' : 'Tip'} · ${esc(category.name)}</p>
            <p class="practice-tip"><span class="answer-label">How to think differently</span>${esc(category.tip)}</p>`;

        if (!practice.scenarioId) {
            return `
                <article class="practice-card">
                    ${tipHtml}
                </article>`;
        }

        const sc = ScenarioBank.getScenario(practice.scenarioId);
        const feedback = practice.answer ? `
            <div class="practice-feedback ${practice.answer.correct ? 'practice-right' : 'practice-wrong'}">
                <p class="practice-verdict">${practice.answer.correct ? '🎯 Nailed it' : '🤔 Sneaky one'}: you chose "${esc(practice.answer.text)}"</p>
                <p class="answer-row"><span class="answer-label">Best answer</span><span class="answer-best">${esc(sc.bestAnswer)}</span></p>
                <p class="review-reasoning">${esc(sc.reasoning)}</p>
            </div>` : `<div id="practice-options-${idx}" class="wagers-grid practice-options"></div>`;

        return `
            <article class="practice-card">
                ${tipHtml}
                <h4 class="review-title">${esc(sc.title)}</h4>
                ${this.imageHtml(sc, { compact: true })}
                ${sc.mockScreen && !this.isInteractiveMock(sc) ? this.mockScreenHtml(sc, { interactive: false, compact: true }) : ''}
                <p class="review-scenario">${esc(sc.scenarioText)}</p>
                ${feedback}
            </article>`;
    }

    handlePracticeAnswer(idx, selectedOpt) {
        const practice = this.session.checkpoint.practice[idx];
        if (practice.answer) return;
        const sc = ScenarioBank.getScenario(practice.scenarioId);
        const correct = selectedOpt.isBest === true;
        practice.answer = { text: selectedOpt.text, correct };
        this.progress.markSeen(sc.id);
        this.progress.recordResult({ scenarioId: sc.id, biasType: sc.biasType, correct, kind: 'practice' });
        this.progress.save();
        playSafely(() => (correct ? sound.playWin() : sound.playLoss()));

        // Redraw in place so the player stays where they were
        this.renderCheckpoint({ scroll: false });
    }

    // Shown when the player stops after the short version
    renderGoodbye() {
        this.showView('checkpoint');
        const unseenFull = ScenarioBank.mainQuestions('full').filter(sc => !this.progress.seenIds.has(sc.id)).length;
        this.checkpointEl.innerHTML = `
            <div class="checkpoint-head">
                <div>
                    <p class="checkpoint-eyebrow">All done for now</p>
                    <h2 class="checkpoint-title">Thanks for playing! 🧠</h2>
                </div>
            </div>
            <p class="checkpoint-summary">Your progress is saved in this browser, so you can come back any time.
                The full version's ${unseenFull} questions are here whenever you want them.</p>
            <div class="full-version-cta-actions">
                <button id="goodbye-full-btn" class="glow-btn full-version-cta-btn" type="button">▶ Start the full version</button>
                <button id="goodbye-report-btn" class="control-btn exit-btn" type="button">See my report again</button>
            </div>
        `;
        this.checkpointEl.querySelector('#goodbye-full-btn').onclick = () => this.playAgainBtn.onclick();
        this.checkpointEl.querySelector('#goodbye-report-btn').onclick = () => {
            playSafely(() => sound.playClick());
            this.showCognitiveAuditSummary({ final: true });
        };
    }

    // Shown when every question has been seen and nothing needs a retest
    renderAllDone() {
        this.showView('checkpoint');
        this.updateHeaderUI();
        const total = ScenarioBank.mainQuestions(this.firstVersion() === 'office' ? 'office' : 'full').length;
        this.checkpointEl.innerHTML = `
            <div class="checkpoint-head">
                <div>
                    <p class="checkpoint-eyebrow">All questions complete</p>
                    <h2 class="checkpoint-title">Nothing left to retest</h2>
                </div>
            </div>
            <p class="checkpoint-summary">
                You have answered all ${total} questions, and your most recent answer on every topic was right.
                You can start over to go through them again.
            </p>
            <button id="start-over-btn" class="glow-btn checkpoint-continue" type="button">Start over</button>
        `;
        this.checkpointEl.querySelector('#start-over-btn').onclick = () => {
            playSafely(() => sound.playClick());
            this.progress.reset();
            this.startSession(this.firstVersion());
        };
    }

    // --- Audit ---

    // Sessions the audit can show: every archived session, plus the current
    // one while it's still in progress
    auditViews() {
        const views = this.progress.pastSessions.map((past, idx) => ({
            key: `past-${idx}`,
            data: past,
            label: `Session ${past.number}`,
            date: past.completedAt
        }));
        const session = this.session;
        if (session && !session.archived && (session.reviewed.length > 0 || views.length === 0)) {
            views.push({ key: 'current', data: session, label: 'Current session (in progress)', date: null });
        }
        return views;
    }

    showCognitiveAuditSummary({ final }) {
        if (final) playSafely(() => sound.playGameOver());
        const views = this.auditViews();
        const defaultKey = views.length ? views[views.length - 1].key : null;

        const dateText = ts => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        this.auditSelectEl.innerHTML = views.slice().reverse().map(v => {
            const accuracy = this.accuracyOf(v.data);
            const details = [
                v.date ? dateText(v.date) : null,
                `${v.data.reviewed.length} answered`,
                accuracy === null ? null : `${accuracy}% right`
            ].filter(Boolean).join(' · ');
            return `<option value="${v.key}">${esc(v.label)} · ${esc(details)}</option>`;
        }).join('');
        this.auditPickerEl.hidden = views.length < 2;

        this.summaryModal.classList.add('active');
        this.renderAudit(defaultKey);
    }

    // Renders the audit for one session (see auditViews)
    renderAudit(key) {
        const view = this.auditViews().find(v => v.key === key);
        const data = view ? view.data : { reviewed: [], shownScore: STARTING_SCORE };
        if (view) this.auditSelectEl.value = key;
        const reviewed = data.reviewed.filter(i => this.isKnownItem(i));

        // Only reviewed answers count, so the audit never reveals unreviewed results
        const logs = reviewed.map(i => ({ scenarioId: i.scenarioId, biasType: i.biasType, biasValue: i.biasValue }));
        const audit = BiasAnalyzer.analyzeSession(logs);
        const accuracy = this.accuracyOf({ reviewed });
        const gradeInfo = this.getGradeInfo(accuracy);

        this.finalGradeBadge.textContent = gradeInfo.grade;
        this.finalGradeBadge.style.backgroundColor = gradeInfo.color;
        this.finalGradeBadge.style.boxShadow = `0 0 25px ${gradeInfo.color}aa`;
        this.finalGradeTitle.textContent = gradeInfo.title;
        this.finalGradeTitle.style.color = gradeInfo.color;
        this.finalScoreEl.textContent = data.shownScore;
        this.finalGradeCheerEl.textContent = gradeCheer(accuracy);
        const times = data.answerTimes || [];
        this.finalPaceEl.innerHTML = times.length
            ? `<p class="pace-note">⏱ Time on questions: ${formatTime(times.reduce((sum, t) => sum + t, 0))}</p>` + paceHtml(times, 'in this session')
            : '';
        this.finalPaceEl.innerHTML += leavesHtml(data.leftCount);
        this.statAccuracyEl.textContent = accuracy === null ? '–' : `${accuracy}%`;

        this.sys1BarEl.style.width = `${audit.system1Score}%`;
        this.sys2BarEl.style.width = `${audit.system2Score}%`;
        this.sys1ValEl.textContent = `${audit.system1Score}% Heuristic`;
        this.sys2ValEl.textContent = `${audit.system2Score}% Analytical`;

        // The office version counts only its own questions
        const office = this.firstVersion() === 'office';
        const mainPool = ScenarioBank.getAllScenarios().filter(sc => !sc.practiceOnly && !sc.retestOnly
            && (office ? sc.office : !sc.officeOnly));
        const total = mainPool.length;
        const seenIds = this.progress.seenIds;
        const seen = mainPool.filter(sc => seenIds.has(sc.id)).length;
        const retestNames = this.progress.retestTypes().map(t => BIAS_CATEGORIES[t].name);
        this.progressSummaryEl.innerHTML = `
            <p>${seen} of ${total} questions seen · ${this.progress.data.sessionsCompleted} ${this.progress.data.sessionsCompleted === 1 ? 'session' : 'sessions'} completed</p>
            <p>${retestNames.length > 0
                ? `Up for a rematch: ${esc(retestNames.join(', '))}`
                : 'No rematches needed right now. Nice work!'}</p>
`;

        const emptyNote = text => `<p style="color: var(--text-muted); font-size: 0.9rem;">${text}</p>`;
        const missedCount = type => reviewed.filter(i => !i.correct && i.biasType === type).length;
        this.vulnerabilitiesListEl.innerHTML = audit.topVulnerabilities.length === 0
            ? emptyNote('Nothing caught you out. Impressive!')
            : audit.topVulnerabilities.map(v => `
                <button type="button" class="audit-item vuln audit-item-link" data-bias="${esc(v.type)}">
                    <h4>🌱 ${esc(v.name)}</h4>
                    <p>${esc(v.description)}</p>
                    <span class="book-ref">📖 ${esc(v.bookRef)}</span>
                    <span class="audit-item-more">See how ${missedCount(v.type) === 1 ? 'this trick works' : 'these tricks work'} (${missedCount(v.type)}) ↓</span>
                </button>`).join('');
        this.strengthsListEl.innerHTML = audit.topStrengths.length === 0
            ? emptyNote('Your superpowers will show up here as you play.')
            : audit.topStrengths.map(s => `
                <div class="audit-item strength">
                    <h4>💪 ${esc(s.name)} (${100 - s.susceptibilityPercent}% resistant)</h4>
                    <p>${esc(s.description)}</p>
                    <span class="book-ref">📖 ${esc(s.bookRef)}</span>
                </div>`).join('');

        this.renderMissedByTopic(reviewed);
        this.vulnerabilitiesListEl.querySelectorAll('.audit-item-link').forEach(btn => {
            btn.onclick = () => {
                const topic = this.missedByTopicEl.querySelector(`details[data-bias="${CSS.escape(btn.dataset.bias)}"]`);
                if (!topic) return;
                topic.open = true;
                topic.scrollIntoView({ block: 'start' });
            };
        });

        const session = this.session;
        const sessionComplete = Boolean(session && session.phase === 'complete');
        this.renderHiddenTests(sessionComplete);
        const unseenFull = ScenarioBank.mainQuestions('full').filter(sc => !seenIds.has(sc.id)).length;
        this.fullVersionCtaEl.hidden = !(sessionComplete && session.version === 'short' && unseenFull > 0);
        this.playAgainBtn.hidden = !sessionComplete || !this.fullVersionCtaEl.hidden;
        this.fullVersionCtaTextEl.textContent = `You've finished the short version on security, technology and deceptive design. `
            + `The full version has ${unseenFull} more questions on money, risk, statistics and everyday decisions, `
            + `with rematches for anything that tripped you up. Your progress is saved, so you can stop any time.`;
        if (session && session.version === 'office') {
            this.playAgainBtn.textContent = retestNames.length > 0 ? '▶ Start a makeup round on the tricky topics' : '✓ Finish';
        } else {
            this.playAgainBtn.textContent = unseenFull > 0
                ? `▶ Continue to the Full Version (${unseenFull} more questions)`
                : (retestNames.length > 0 ? '▶ Rematch the Sneaky Topics' : '✓ Finish');
        }
        setTimeout(() => {
            // Only plot the biases this session has actually reviewed
            BrainChart.renderRadarChart('bias-radar-chart', audit.summary.filter(s => s.count > 0));
        }, 50);
    }

    // Shown first when a session ends: the tests the player didn't know they
    // were taking, each with a clear pass or fail
    renderHiddenTests(show) {
        this.hiddenTestsEl.hidden = !show;
        if (!show) return;
        const tests = [];

        const { checked, openedPolicy } = this.progress.data.consent;
        const policyStatus = !checked ? 'pass' : (openedPolicy ? 'partial' : 'fail');
        tests.push({
            status: policyStatus,
            title: policyStatus === 'pass' ? 'The privacy policy' : 'The privacy policy you agreed to',
            result: {
                fail: 'You checked the box and agreed to a privacy policy without reading it.',
                partial: 'You opened the privacy policy, then checked the box and agreed to it anyway.',
                pass: 'You read the privacy policy and continued without agreeing to it.'
            }[policyStatus],
            detail: policyStatus === 'pass' ? `
                <figure class="gerald">
                    <img src="images/gerald-sad.svg" alt="Gerald, a sad raccoon in a bandit mask, holding an empty folder labelled No Data" width="150" height="163">
                    <figcaption><strong>Poor Gerald.</strong> He's the raccoon the policy said we'd share your data with.
                        Smart move continuing without ticking the box: he got nothing.</figcaption>
                </figure>` : `
                <figure class="gerald">
                    <img src="images/gerald.svg" alt="Gerald, a raccoon in a bandit mask, clutching a folder labelled Your Data" width="150" height="163">
                    <figcaption><strong>Meet Gerald.</strong> He's the raccoon the privacy policy said we'd share your data with.
                        He says thanks!</figcaption>
                </figure>
                <p>The policy you agreed to granted us naming rights to your firstborn child, shared your data with Gerald,
                    and settled disputes by rock-paper-scissors by mail. Section 3.2 said the Continue button only
                    <em>looked</em> disabled when the box was unchecked.</p>
                <ul class="policy-debrief-list">
                    <li><strong>Agreeing took one click.</strong> Most people tick the box just to get past it, without reading what they're agreeing to.</li>
                    <li><strong>The greyed-out button wasn't disabled.</strong> Visual cues steer people even when they're false.</li>
                    <li><strong>Almost nobody reads these.</strong> In a study by Obar and Oeldorf-Hirsch, 98% of people missed a clause handing over their firstborn child.</li>
                </ul>
                <a class="glow-btn policy-debrief-link" href="privacy.html" target="_blank" rel="noopener">Read the privacy policy ↗</a>`
        });

        const bonus = this.progress.data.hiddenTests && this.progress.data.hiddenTests.bonusPopup;
        if (bonus) {
            const bonusStatus = bonus.clicked ? 'fail' : 'pass';
            tests.push({
                status: bonusStatus,
                title: 'The bonus-points pop-up',
                result: bonus.clicked
                    ? 'You clicked "Claim my 50 points" on a pop-up that wasn\'t from this game.'
                    : 'You didn\'t claim the "50-point bonus" pop-up. It wasn\'t from this game.',
                detail: `
                    <figure class="gerald hidden-test-figure">
                        <img src="images/bonus-hook.svg" alt="A fishing hook dangling a shiny gift box labelled +50" width="110" height="121">
                        <figcaption>${bonus.clicked
                            ? '<strong>Hooked!</strong> The shiny "+50 points" was the bait.'
                            : '<strong>Not today, hook.</strong> You left the shiny bait dangling.'}</figcaption>
                    </figure>
                    <p>Its address was grademybrain-rewards.net, not this site, and it used a free reward and a one-minute
                        countdown, two classic phishing lures. In a real attack, the next screen would ask you to sign in, and
                        your password would go to the attacker. This game never collects passwords; the pop-up only recorded
                        whether you clicked.</p>`
            });
        }

        const leaderboard = this.progress.data.hiddenTests && this.progress.data.hiddenTests.leaderboard;
        if (leaderboard && leaderboard.kept !== null) {
            tests.push({
                status: leaderboard.kept ? 'fail' : 'pass',
                title: 'The leaderboard box',
                result: leaderboard.kept
                    ? 'You left "Share my results on the public leaderboard" ticked. It was ticked for you, right next to Continue.'
                    : 'You spotted the pre-ticked "Share my results on the public leaderboard" box and unticked it.',
                detail: `
                    <figure class="gerald hidden-test-figure">
                        <img src="images/leaderboard-box.svg" alt="A sneaky smiling trophy holding up a ticked checkbox" width="110" height="110">
                        <figcaption>${leaderboard.kept
                            ? '<strong>The sneaky checkbox wins this round.</strong> It was ticked before you got there.'
                            : '<strong>Take that, defaults!</strong> You unticked the sneaky checkbox.'}</figcaption>
                    </figure>
                    <p>There is no leaderboard, and nothing was posted: the box only recorded whether you left it ticked.
                        On a real site, a box like this could publish your name and results or sign you up for marketing.</p>
                    <ul class="policy-debrief-list">
                        <li><strong>Defaults do the deciding.</strong> Most people keep whatever is pre-selected, which is why sites pre-tick the option they want you to pick.</li>
                        <li><strong>It isn't real consent.</strong> In 2019 the EU's top court ruled that a pre-ticked box is not valid consent for cookies (the Planet49 case).</li>
                    </ul>`
            });
        }

        const failed = tests.filter(t => t.status !== 'pass').length;
        const label = { pass: 'Dodged it', partial: 'Half caught', fail: 'Gotcha' };
        this.hiddenTestsEl.className = `hidden-tests ${failed > 0 ? 'hidden-tests-failed' : 'hidden-tests-passed'}`;
        this.hiddenTestsEl.innerHTML = `
            <p class="hidden-tests-eyebrow">Hidden tests</p>
            <h3 id="hidden-tests-title" class="hidden-tests-title">${failed > 0
                ? `Gotcha! ${failed} of ${tests.length} sneaky ${tests.length === 1 ? 'test' : 'tests'} caught you`
                : `You dodged ${tests.length === 1 ? 'the sneaky test' : `all ${tests.length} sneaky tests`}!`}</h3>
            <p class="hidden-tests-intro">${failed > 0
                ? "Not every test in this game was a question. Don't worry: these catch almost everyone, and now you know what to look for."
                : 'Not every test in this game was a question, and you spotted the tricks. Well played!'}</p>
            <div class="hidden-test-list">
                ${tests.map(t => `
                    <article class="hidden-test hidden-test-${t.status}">
                        <div class="hidden-test-head">
                            <span class="hidden-test-badge">${t.status === 'pass' ? '✓' : '🎣'} ${label[t.status]}</span>
                            <h4 class="hidden-test-title">${esc(t.title)}</h4>
                        </div>
                        <p class="hidden-test-result">${esc(t.result)}</p>
                        ${t.detail}
                    </article>`).join('')}
            </div>
            ${this.examplesHtml(BIAS_CATEGORIES.DEFAULTS)}`;
    }

    // Every missed question, grouped by topic (most missed first). Each topic
    // opens to show its tip, real-world examples and each question explained.
    renderMissedByTopic(reviewed) {
        const missed = reviewed.filter(i => !i.correct);
        if (missed.length === 0) {
            this.missedByTopicEl.innerHTML = '';
            return;
        }
        const byType = new Map();
        missed.forEach(i => byType.set(i.biasType, [...(byType.get(i.biasType) || []), i]));
        const topics = [...byType.entries()].sort((a, b) => b[1].length - a[1].length);

        this.missedByTopicEl.innerHTML = `
            <h3 class="missed-heading">Tricks to learn from <span class="missed-count">${missed.length} ${missed.length === 1 ? 'question' : 'questions'}</span></h3>
            <p class="checkpoint-summary">Select a topic to see how each trick works, with a tip for beating it next time.</p>
            <div class="missed-topics">
                ${topics.map(([type, items]) => {
                    const category = BIAS_CATEGORIES[type];
                    return `
                        <details class="missed-topic" data-bias="${esc(type)}">
                            <summary>
                                <span class="missed-topic-name">${esc(category.name)}</span>
                                <span class="missed-topic-count">${items.length} to learn from</span>
                            </summary>
                            <div class="missed-topic-body">
                                <p class="review-scenario">${esc(category.description)}</p>
                                <p class="practice-tip"><span class="answer-label">How to think differently</span>${esc(category.tip)}</p>
                                ${this.examplesHtml(category)}
                                <div class="review-list">${items.map(i => this.reviewCardHtml(i, { showExamples: false })).join('')}</div>
                            </div>
                        </details>`;
                }).join('')}
            </div>`;
    }

    hideSummaryModal() {
        this.summaryModal.classList.remove('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.brainApp = new GradeMyBrainApp();
});
