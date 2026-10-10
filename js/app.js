/**
 * Grade My Brain - Stealth Cognitive Diagnostic App Controller
 * Compatible with Brave, Chrome, Safari, Firefox, and Edge.
 *
 * Flow: the player enters an ID code, then works through every question
 * without feedback. Every CHECKPOINT_EVERY questions (and at the end) a
 * review explains what they missed, offers a "how to think differently"
 * tip, gives a practice question on each missed bias, and adds a retest of
 * each missed bias to the end of the session, so the session grows with the
 * number of misses. Progress is kept per ID code (see progress.js); after a
 * full pass, the next session retests the bias types still answered wrong.
 */

import { sound } from './audio.js';
import { ScenarioBank, PAIRED_TESTS, BIAS_CATEGORIES, REVIEW_BLOCK, BONUS_TOKEN } from './scenarioBank.js';
import { BiasAnalyzer } from './biasAnalyzer.js';
import { BrainChart } from './chart.js';
import { Progress, normalizeId } from './progress.js';

// Grades come from the share of reviewed answers that were right, so they
// mean the same thing however long the session runs
export const GRADES = [
    { min: 0, max: 49, grade: 'F', title: 'Cognitive Casualty', color: '#ef4444' },
    { min: 50, max: 59, grade: 'D', title: 'Novice Risk-Taker', color: '#f97316' },
    { min: 60, max: 69, grade: 'C', title: 'Calculated Analyst', color: '#eab308' },
    { min: 70, max: 79, grade: 'B', title: 'Tactical Mind', color: '#3b82f6' },
    { min: 80, max: 89, grade: 'A', title: 'Grandmaster Strategist', color: '#8b5cf6' },
    { min: 90, max: 94, grade: 'S', title: 'Elite Mastermind', color: '#ec4899' },
    { min: 95, max: 100, grade: 'S+', title: 'Transcendent Genius', color: '#06b6d4' }
];
const UNGRADED = { grade: '?', title: 'Not graded yet', color: '#64748b' };

export const CHECKPOINT_EVERY = REVIEW_BLOCK;
// At most this many missed bias types get a practice question per review
const MAX_PRACTICE_PER_REVIEW = 3;
// Each bias type is retested at most this many times in one session
const MAX_RETESTS_PER_TOPIC = 2;
const STARTING_SCORE = 100;
const POINTS_CORRECT = 20;
const POINTS_WRONG = -15;
const ACTIVE_ID_KEY = 'gmb_active_id';

const KIND_LABELS = { deceptive: 'Deceptive practice', good: 'Better practice', example: 'Real-world case' };

function esc(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function sessionStorageGet(key) {
    try { return sessionStorage.getItem(key); } catch (err) { return null; }
}

function sessionStorageSet(key, value) {
    try {
        if (value === null) sessionStorage.removeItem(key);
        else sessionStorage.setItem(key, value);
    } catch (err) { /* blocked; the player re-enters their ID after a reload */ }
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
        this.nextReviewEl = document.getElementById('next-review');
        this.soundToggleBtn = document.getElementById('sound-toggle-btn');
        this.switchIdBtn = document.getElementById('switch-id-btn');
        this.viewAuditBtn = document.getElementById('view-audit-btn');

        // Intro Elements
        this.introViewEl = document.getElementById('intro-view');
        this.introFormEl = document.getElementById('intro-form');
        this.idInputEl = document.getElementById('id-code-input');
        this.idErrorEl = document.getElementById('id-code-error');
        this.consentEl = document.getElementById('privacy-consent');
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
        this.statAccuracyEl = document.getElementById('stat-accuracy');
        this.progressSummaryEl = document.getElementById('progress-summary');
        this.auditPickerEl = document.getElementById('audit-session-picker');
        this.auditSelectEl = document.getElementById('audit-session-select');
        this.missedByTopicEl = document.getElementById('missed-by-topic');
        this.policyDebriefEl = document.getElementById('policy-debrief');
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

        const activeId = sessionStorageGet(ACTIVE_ID_KEY);
        if (activeId) {
            this.progress = new Progress(activeId);
            this.enterGame();
        } else {
            this.showIntro();
        }
    }

    setupEventListeners() {
        this.soundToggleBtn.onclick = () => {
            const isEnabled = sound.toggleSound();
            this.soundToggleBtn.classList.toggle('muted', !isEnabled);
            this.soundToggleBtn.textContent = isEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
        };

        this.switchIdBtn.onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
            sessionStorageSet(ACTIVE_ID_KEY, null);
            this.progress = null;
            this.showIntro();
        };

        this.viewAuditBtn.onclick = () => {
            if (!this.session) return;
            playSafely(() => sound.playClick());
            this.showCognitiveAuditSummary({ final: false });
        };

        this.auditSelectEl.onchange = () => this.renderAudit(this.auditSelectEl.value);

        this.closeAuditModalBtn.onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
        };

        this.playAgainBtn.onclick = () => {
            playSafely(() => sound.playClick());
            this.hideSummaryModal();
            this.startSession();
        };

        // The pre-checked consent box: unchecking it greys out Continue, but
        // the button keeps working (the privacy policy mentions this).
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
        this.introViewEl.hidden = view !== 'intro';
        document.body.classList.toggle('intro-mode', view === 'intro');
        this.scenarioStageEl.hidden = view !== 'question';
        this.checkpointEl.hidden = view !== 'checkpoint';
        this.viewAuditBtn.hidden = view === 'intro';
        this.switchIdBtn.hidden = view === 'intro';
        if (scroll) {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    }

    showIntro() {
        this.showView('intro');
        this.idInputEl.value = '';
        this.idErrorEl.hidden = true;
        this.consentEl.checked = true;
        this.introContinueBtn.classList.remove('looks-disabled');
        this.updateHeaderUI();
        this.chart.updateHistory([{ round: 0, score: STARTING_SCORE }]);
    }

    handleIntroContinue() {
        const id = normalizeId(this.idInputEl.value);
        if (!id) {
            this.idErrorEl.hidden = false;
            this.idInputEl.focus();
            return;
        }
        playSafely(() => sound.playClick());
        this.progress = new Progress(id);
        this.progress.data.consent = {
            checked: this.consentEl.checked,
            openedPolicy: this.openedPolicy || this.progress.data.consent.openedPolicy
        };
        this.progress.save();
        sessionStorageSet(ACTIVE_ID_KEY, id);
        this.enterGame();
    }

    // Resumes the saved session for this ID, or starts a new one
    enterGame() {
        const session = this.session;
        const queueValid = session && session.queue.every(e => ScenarioBank.getScenario(e.id));
        // Sessions saved before padding existed: treat their whole queue as planned
        if (queueValid && session.plannedLength === undefined) session.plannedLength = session.queue.length;
        if (!queueValid) {
            this.startSession();
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

    startSession() {
        // A session finished before archiving existed is saved before it's replaced
        const previous = this.session;
        if (previous && previous.phase === 'complete') this.progress.archiveSession(previous);

        const { queue, plannedLength } = ScenarioBank.buildSession({
            seenIds: this.progress.seenIds,
            retestTypes: this.progress.retestTypes(),
            missedIds: this.progress.missedIds()
        });

        this.progress.data.session = {
            queue,
            plannedLength,
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
            this.nextReviewEl.textContent = '–';
            return;
        }
        const total = session.queue.length;
        const questionNumber = Math.min(session.position + 1, total);
        this.roundEl.textContent = `${session.phase === 'question' ? questionNumber : session.position} / ${total}`;
        const untilCheckpoint = CHECKPOINT_EVERY - (session.position % CHECKPOINT_EVERY);
        const untilReview = Math.min(untilCheckpoint, total - session.position);
        this.nextReviewEl.textContent = session.phase === 'question' ? `in ${untilReview}` : 'now';
    }

    renderQuestion() {
        const session = this.session;
        const sc = ScenarioBank.getScenario(session.queue[session.position].id);
        this.isProcessing = false;
        this.showView('question');
        this.updateHeaderUI();

        this.scenarioTitleEl.textContent = sc.title;
        this.scenarioTextEl.textContent = sc.scenarioText;
        this.scenarioMediaEl.innerHTML = this.imageHtml(sc);
        this.renderOptions(this.optionsContainerEl, sc, opt => this.handleAnswer(opt));
    }

    renderOptions(container, sc, onSelect) {
        container.innerHTML = '';
        sc.options.forEach((opt, idx) => {
            const card = document.createElement('button');
            card.type = 'button';
            const rarityClass = opt.rarity ? ` rarity-${opt.rarity}` : '';
            const rarityBadgeHtml = opt.rarity ? `<span class="rarity-badge">${esc(opt.rarity.toUpperCase())}</span>` : '';

            card.className = `wager-card glass-panel clean-choice-card${rarityClass}`;
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
                yourAnswer: selectedOpt.text
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
                { scenarioId: earlier.scenarioId, answer: earlier.answer },
                { scenarioId: sc.id, answer: selectedOpt.text }
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
        const excluded = new Set([...upcoming, ...items.map(i => i.scenarioId)]);
        const missedTypes = [...new Set(items.filter(i => !i.correct).map(i => i.biasType))];
        const practice = missedTypes.slice(0, MAX_PRACTICE_PER_REVIEW).map(biasType => {
            const sc = ScenarioBank.pickPracticeScenario(biasType, { seenIds: this.progress.seenIds, excludeIds: excluded });
            if (sc) excluded.add(sc.id);
            return { biasType, scenarioId: sc ? sc.id : null, answer: null };
        });

        // Each missed bias type earns a retest at the end of the session. It
        // may re-ask a question answered earlier, but never one still coming
        // up, one already queued as a retest, or one used for practice now.
        session.retestCounts ||= {};
        const unavailable = new Set([
            ...upcoming,
            ...session.queue.filter(e => e.retest).map(e => e.id),
            ...practice.map(p => p.scenarioId).filter(Boolean)
        ]);
        const askedIds = new Set([...this.progress.seenIds, ...session.queue.slice(0, session.position).map(e => e.id)]);
        const missedIds = this.progress.missedIds();
        const addedRetests = [];
        for (const biasType of missedTypes) {
            if ((session.retestCounts[biasType] || 0) >= MAX_RETESTS_PER_TOPIC) continue;
            const sc = ScenarioBank.pickRetestScenario(biasType, { excludeIds: unavailable, missedIds, askedIds });
            if (!sc) continue;
            unavailable.add(sc.id);
            session.queue.push({ id: sc.id, retest: true });
            session.retestCounts[biasType] = (session.retestCounts[biasType] || 0) + 1;
            addedRetests.push(biasType);
        }
        // Keep the session a whole number of review blocks long
        if (addedRetests.length > 0) {
            ScenarioBank.padTail(session.queue, {
                tailStart: Math.max(session.position, session.plannedLength || 0),
                seenIds: this.progress.seenIds
            });
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

    handleCheckpointContinue() {
        playSafely(() => sound.playClick());
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
            ? 'None of these questions could be scored yet.'
            : `You got ${right.length} of ${cp.items.length} scored ${cp.items.length === 1 ? 'question' : 'questions'} right.`;
        const pendingText = cp.pendingCount > 0
            ? ` ${cp.pendingCount} ${cp.pendingCount === 1 ? 'question is' : 'questions are'} paired with one still to come and will be scored later.`
            : '';
        const retestCount = (cp.addedRetests || []).length;
        const retestText = retestCount > 0
            ? ` ${retestCount === 1 ? 'One retest question has' : `${retestCount} retest questions have`} been added to the end of this session to check what you learned.`
            : '';

        this.checkpointEl.innerHTML = `
            <div class="checkpoint-head">
                <div>
                    <p class="checkpoint-eyebrow">Review · questions ${cp.from}–${cp.to}</p>
                    <h2 class="checkpoint-title">${missed.length === 0 ? 'Nothing tripped you up' : 'What tripped you up'}</h2>
                </div>
                <span class="breakdown-delta-badge ${cp.delta >= 0 ? 'delta-up' : 'delta-down'}">${deltaText}</span>
            </div>
            <p class="checkpoint-summary">${esc(scoredText + pendingText + retestText)}</p>
            ${this.tokenResultsHtml(cp.tokens || [])}

            ${missed.length > 0 ? `
                <section class="missed-section" aria-labelledby="missed-heading">
                    <h3 id="missed-heading" class="missed-heading">Read these first <span class="missed-count">${missed.length} missed</span></h3>
                    <p class="checkpoint-summary">Each one explains the better answer. Where there's a practice question, try it before moving on; practice doesn't affect your score.</p>
                    <div class="review-list">${this.missedWithPracticeHtml(missed, cp.practice)}</div>
                </section>` : ''}

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
            ? `<span class="retest-badge">${item.correct ? 'Retest · learned it' : 'Retest · still tricky'}</span>`
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
        } else {
            const sc = ScenarioBank.getScenario(item.scenarioId);
            title = sc.title;
            body = `
                ${this.imageHtml(sc, { compact: true })}
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
            <p class="practice-eyebrow">Practice · ${esc(category.name)}</p>
            <p class="practice-tip"><span class="answer-label">How to think differently</span>${esc(category.tip)}</p>`;

        if (!practice.scenarioId) {
            return `
                <article class="practice-card">
                    ${tipHtml}
                    <p class="checkpoint-summary">There's no separate practice question for this one yet.</p>
                </article>`;
        }

        const sc = ScenarioBank.getScenario(practice.scenarioId);
        const feedback = practice.answer ? `
            <div class="practice-feedback ${practice.answer.correct ? 'practice-right' : 'practice-wrong'}">
                <p class="practice-verdict">${practice.answer.correct ? '🎯 Right' : '⚠️ Not quite'}: you chose "${esc(practice.answer.text)}"</p>
                <p class="answer-row"><span class="answer-label">Best answer</span><span class="answer-best">${esc(sc.bestAnswer)}</span></p>
                <p class="review-reasoning">${esc(sc.reasoning)}</p>
            </div>` : `<div id="practice-options-${idx}" class="wagers-grid practice-options"></div>`;

        return `
            <article class="practice-card">
                ${tipHtml}
                <h4 class="review-title">${esc(sc.title)}</h4>
                ${this.imageHtml(sc, { compact: true })}
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

    // Shown when every question has been seen and nothing needs a retest
    renderAllDone() {
        this.showView('checkpoint');
        this.updateHeaderUI();
        const total = ScenarioBank.getAllScenarios().filter(sc => !sc.practiceOnly).length;
        this.checkpointEl.innerHTML = `
            <div class="checkpoint-head">
                <div>
                    <p class="checkpoint-eyebrow">All questions complete</p>
                    <h2 class="checkpoint-title">Nothing left to retest</h2>
                </div>
            </div>
            <p class="checkpoint-summary">
                You have answered all ${total} questions, and your most recent answer on every topic was right.
                You can start over with this ID code to go through them again.
            </p>
            <button id="start-over-btn" class="glow-btn checkpoint-continue" type="button">Start over with this ID</button>
        `;
        this.checkpointEl.querySelector('#start-over-btn').onclick = () => {
            playSafely(() => sound.playClick());
            this.progress.reset();
            this.startSession();
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
        this.statAccuracyEl.textContent = accuracy === null ? '–' : `${accuracy}%`;

        this.sys1BarEl.style.width = `${audit.system1Score}%`;
        this.sys2BarEl.style.width = `${audit.system2Score}%`;
        this.sys1ValEl.textContent = `${audit.system1Score}% Heuristic`;
        this.sys2ValEl.textContent = `${audit.system2Score}% Analytical`;

        const mainPool = ScenarioBank.getAllScenarios().filter(sc => !sc.practiceOnly);
        const total = mainPool.length;
        const seenIds = this.progress.seenIds;
        const seen = mainPool.filter(sc => seenIds.has(sc.id)).length;
        const retestNames = this.progress.retestTypes().map(t => BIAS_CATEGORIES[t].name);
        this.progressSummaryEl.innerHTML = `
            <p><strong>${esc(this.progress.id.toUpperCase())}</strong> · ${seen} of ${total} questions seen · ${this.progress.data.sessionsCompleted} ${this.progress.data.sessionsCompleted === 1 ? 'session' : 'sessions'} completed</p>
            <p>${retestNames.length > 0
                ? `Topics to retest: ${esc(retestNames.join(', '))}`
                : 'No topics need a retest right now.'}</p>`;

        const emptyNote = text => `<p style="color: var(--text-muted); font-size: 0.9rem;">${text}</p>`;
        const missedCount = type => reviewed.filter(i => !i.correct && i.biasType === type).length;
        this.vulnerabilitiesListEl.innerHTML = audit.topVulnerabilities.length === 0
            ? emptyNote('No vulnerabilities detected.')
            : audit.topVulnerabilities.map(v => `
                <button type="button" class="audit-item vuln audit-item-link" data-bias="${esc(v.type)}">
                    <h4>⚠️ ${esc(v.name)} (${v.susceptibilityPercent}% Vulnerability)</h4>
                    <p>${esc(v.description)}</p>
                    <span class="book-ref">📖 ${esc(v.bookRef)}</span>
                    <span class="audit-item-more">See the ${missedCount(v.type)} missed ${missedCount(v.type) === 1 ? 'question' : 'questions'} explained ↓</span>
                </button>`).join('');
        this.strengthsListEl.innerHTML = audit.topStrengths.length === 0
            ? emptyNote('No strengths detected yet.')
            : audit.topStrengths.map(s => `
                <div class="audit-item strength">
                    <h4>🛡️ ${esc(s.name)} (${100 - s.susceptibilityPercent}% Resiliency)</h4>
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
        this.renderPolicyDebrief(sessionComplete);
        this.playAgainBtn.hidden = !sessionComplete;
        this.playAgainBtn.textContent = retestNames.length > 0 ? '▶ Retest Weak Topics' : '✓ Finish';
        setTimeout(() => {
            // Only plot the biases this session has actually reviewed
            BrainChart.renderRadarChart('bias-radar-chart', audit.summary.filter(s => s.count > 0));
        }, 50);
    }

    // Shown when a session ends, so nobody misses that the entry screen's
    // privacy policy was itself a lesson in deceptive design
    renderPolicyDebrief(show) {
        this.policyDebriefEl.hidden = !show;
        if (!show) return;
        const { checked, openedPolicy } = this.progress.data.consent;
        const youDid = checked
            ? (openedPolicy ? 'You opened the privacy policy, then agreed to it anyway.' : 'You agreed to the privacy policy without opening it.')
            : (openedPolicy
                ? 'You read the privacy policy, unchecked the box, and clicked the greyed-out button anyway. Well spotted.'
                : 'You unchecked the consent box and clicked the greyed-out button anyway.');

        this.policyDebriefEl.innerHTML = `
            <p class="policy-debrief-eyebrow">Before you go</p>
            <h3 id="policy-debrief-title" class="policy-debrief-title">Did you read the privacy policy?</h3>
            <p>${esc(youDid)} Go read it now: it grants us naming rights to your firstborn child, shares your data
                with a raccoon named Gerald, and settles disputes by rock-paper-scissors by mail. Section 3.2 also says
                the Continue button only <em>looked</em> disabled when the box was unchecked. It worked the whole time.</p>
            <a class="glow-btn policy-debrief-link" href="privacy.html" target="_blank" rel="noopener">Read the privacy policy ↗</a>
            <p class="policy-debrief-subtitle">What that screen was teaching</p>
            <ul class="policy-debrief-list">
                <li><strong>The box was checked for you.</strong> Pre-selected consent is a default effect: most people keep
                    whatever is chosen for them. In 2019 the EU's top court ruled that a pre-ticked box is not valid
                    consent for cookies.</li>
                <li><strong>The greyed-out button wasn't disabled.</strong> It only looked that way. Visual cues steer
                    people even when they're false, which is why dark patterns lean on them.</li>
                <li><strong>Almost nobody reads these.</strong> In a study by Obar and Oeldorf-Hirsch, most people
                    skipped a fake social network's privacy policy, and 98% missed a clause handing over their
                    firstborn child.</li>
            </ul>
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
            <h3 class="missed-heading">What you got wrong <span class="missed-count">${missed.length} missed</span></h3>
            <p class="checkpoint-summary">Select a topic to see each question you missed, explained, with a tip for next time.</p>
            <div class="missed-topics">
                ${topics.map(([type, items]) => {
                    const category = BIAS_CATEGORIES[type];
                    return `
                        <details class="missed-topic" data-bias="${esc(type)}">
                            <summary>
                                <span class="missed-topic-name">${esc(category.name)}</span>
                                <span class="missed-topic-count">${items.length} missed</span>
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
