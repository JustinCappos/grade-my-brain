/**
 * Grade My Brain - Stealth Cognitive Diagnostic App Controller
 * Compatible with Brave, Chrome, Safari, Firefox, and Edge.
 * Uses sessionStorage to persist game state across page navigations
 * (reasoning breakdown is shown on a separate page).
 */

import { sound } from './audio.js';
import { ScenarioBank, PAIRED_TESTS } from './scenarioBank.js';
import { BiasAnalyzer } from './biasAnalyzer.js';
import { BrainChart } from './chart.js';

export const GRADES = [
    { min: 0, max: 79, grade: 'F', title: 'Cognitive Casualty', color: '#ef4444' },
    { min: 80, max: 110, grade: 'D', title: 'Novice Risk-Taker', color: '#f97316' },
    { min: 111, max: 155, grade: 'C', title: 'Calculated Analyst', color: '#eab308' },
    { min: 156, max: 215, grade: 'B', title: 'Tactical Mind', color: '#3b82f6' },
    { min: 216, max: 295, grade: 'A', title: 'Grandmaster Strategist', color: '#8b5cf6' },
    { min: 296, max: 395, grade: 'S', title: 'Elite Mastermind', color: '#ec4899' },
    { min: 396, max: 9999, grade: 'S+', title: 'Transcendent Genius', color: '#06b6d4' }
];

class GradeMyBrainApp {
    constructor() {
        this.maxRounds = 0;
        this.chart = null;

        // Header Elements
        this.scoreEl = document.getElementById('current-score');
        this.gradeBadgeEl = document.getElementById('grade-badge');
        this.gradeTitleEl = document.getElementById('grade-title');
        this.roundEl = document.getElementById('current-round');
        this.streakEl = document.getElementById('current-streak');
        this.soundToggleBtn = document.getElementById('sound-toggle-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.viewAuditBtn = document.getElementById('view-audit-btn');

        // Scenario Stage Elements
        this.scenarioStageEl = document.getElementById('scenario-stage');
        this.scenarioTitleEl = document.getElementById('scenario-title');
        this.scenarioTextEl = document.getElementById('scenario-text');
        this.choicePhaseEl = document.getElementById('choice-phase');
        this.optionsContainerEl = document.getElementById('options-container');

        // Summary Audit Modal Elements
        this.summaryModal = document.getElementById('summary-modal');
        this.closeAuditModalBtn = document.getElementById('close-audit-modal-btn');
        this.finalGradeBadge = document.getElementById('final-grade-badge');
        this.finalGradeTitle = document.getElementById('final-grade-title');
        this.finalScoreEl = document.getElementById('final-score');
        this.statAccuracyEl = document.getElementById('stat-accuracy');
        this.sys1BarEl = document.getElementById('sys1-bar');
        this.sys2BarEl = document.getElementById('sys2-bar');
        this.sys1ValEl = document.getElementById('sys1-val');
        this.sys2ValEl = document.getElementById('sys2-val');
        this.vulnerabilitiesListEl = document.getElementById('vulnerabilities-list');
        this.strengthsListEl = document.getElementById('strengths-list');
        this.playAgainBtn = document.getElementById('play-again-btn');

        this.init();
    }

    init() {
        this.chart = new BrainChart('brain-chart');
        this.setupEventListeners();

        // Check if returning from reasoning page
        const advance = sessionStorage.getItem('gmb_advance') === 'true';
        sessionStorage.removeItem('gmb_advance');
        if (this.restoreState()) {
            // Returning from the reasoning page advances; a plain refresh does not
            if (advance) {
                this.advanceRound();
            } else {
                this.loadCurrentScenario();
            }
        } else {
            this.startNewGame();
        }
    }

    setupEventListeners() {
        if (this.soundToggleBtn) {
            this.soundToggleBtn.onclick = () => {
                const isEnabled = sound.toggleSound();
                this.soundToggleBtn.classList.toggle('muted', !isEnabled);
                this.soundToggleBtn.textContent = isEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
            };
        }

        if (this.restartBtn) {
            this.restartBtn.onclick = () => {
                sound.playClick();
                this.startNewGame();
            };
        }

        if (this.viewAuditBtn) {
            this.viewAuditBtn.onclick = () => {
                sound.playClick();
                this.showCognitiveAuditSummary();
            };
        }

        if (this.closeAuditModalBtn) {
            this.closeAuditModalBtn.onclick = () => {
                sound.playClick();
                this.hideSummaryModal();
            };
        }

        if (this.playAgainBtn) {
            this.playAgainBtn.onclick = () => {
                sound.playClick();
                this.hideSummaryModal();
                this.startNewGame();
            };
        }
    }

    // --- State Persistence ---

    saveState() {
        const state = {
            currentRound: this.currentRound,
            score: this.score,
            streak: this.streak,
            maxStreak: this.maxStreak,
            totalWagersMade: this.totalWagersMade,
            successfulWagers: this.successfulWagers,
            history: this.history,
            choiceLogs: this.choiceLogs,
            scenarioQueueIds: this.scenarioQueue.map(s => s.id),
            pairAnswers: this.pairAnswers
        };
        sessionStorage.setItem('gmb_state', JSON.stringify(state));
    }

    // Returns false if there is no usable saved state (e.g. the scenario bank changed)
    restoreState() {
        const raw = sessionStorage.getItem('gmb_state');
        if (!raw) return false;
        const state = JSON.parse(raw);

        const allScenarios = ScenarioBank.getAllScenarios();
        const queue = (state.scenarioQueueIds || []).map(id =>
            allScenarios.find(s => s.id === id)
        );
        if (queue.length === 0 || queue.some(s => !s)) return false;
        this.scenarioQueue = queue;
        this.maxRounds = queue.length;

        this.currentRound = state.currentRound;
        this.score = state.score;
        this.streak = state.streak;
        this.maxStreak = state.maxStreak;
        this.totalWagersMade = state.totalWagersMade;
        this.successfulWagers = state.successfulWagers;
        this.history = state.history;
        this.choiceLogs = state.choiceLogs;
        this.pairAnswers = state.pairAnswers || {};
        this.isProcessing = false;

        this.currentScenario = this.scenarioQueue[this.currentRound - 1] || null;
        this.chart.updateHistory(this.history);
        this.updateHeaderUI();
        return true;
    }

    // --- Game Flow ---

    startNewGame() {
        this.currentRound = 1;
        this.score = 100;
        this.streak = 0;
        this.maxStreak = 0;
        this.totalWagersMade = 0;
        this.successfulWagers = 0;
        this.history = [{ round: 0, score: 100 }];
        this.choiceLogs = [];
        this.isProcessing = false;
        this.pairAnswers = {};

        this.scenarioQueue = ScenarioBank.getRandomizedSessionQueue();
        this.maxRounds = this.scenarioQueue.length;

        this.updateHeaderUI();
        this.chart.updateHistory(this.history);
        this.saveState();
        this.loadCurrentScenario();
    }

    getGradeInfo(score) {
        return GRADES.find(g => score >= g.min && score <= g.max) || GRADES[GRADES.length - 1];
    }

    updateHeaderUI() {
        const gradeInfo = this.getGradeInfo(this.score);

        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.gradeBadgeEl) {
            this.gradeBadgeEl.textContent = gradeInfo.grade;
            this.gradeBadgeEl.style.backgroundColor = gradeInfo.color;
            this.gradeBadgeEl.style.boxShadow = `0 0 15px ${gradeInfo.color}88`;
        }
        if (this.gradeTitleEl) {
            this.gradeTitleEl.textContent = gradeInfo.title;
            this.gradeTitleEl.style.color = gradeInfo.color;
        }
        if (this.roundEl) this.roundEl.textContent = `${this.currentRound} / ${this.maxRounds}`;
        if (this.streakEl) this.streakEl.textContent = `${this.streak}🔥`;
    }

    loadCurrentScenario() {
        if (this.currentRound > this.maxRounds) {
            this.showCognitiveAuditSummary();
            return;
        }

        this.updateHeaderUI();
        this.currentScenario = this.scenarioQueue[this.currentRound - 1];

        if (this.choicePhaseEl) this.choicePhaseEl.style.display = 'block';
        this.renderScenarioCard();

        if (this.scenarioStageEl) {
            this.scenarioStageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // --- Standard Scenario Rendering ---

    renderScenarioCard() {
        if (!this.scenarioTitleEl || !this.scenarioTextEl || !this.optionsContainerEl) return;

        const sc = this.currentScenario;
        this.scenarioTitleEl.textContent = sc.title;
        this.scenarioTextEl.textContent = sc.scenarioText;
        this.optionsContainerEl.innerHTML = '';

        sc.options.forEach((opt, idx) => {
            const card = document.createElement('button');
            card.type = 'button';
            let rarityClass = '';
            let rarityBadgeHtml = '';

            if (opt.rarity) {
                rarityClass = ` rarity-${opt.rarity}`;
                const rarityLabel = opt.rarity.toUpperCase();
                rarityBadgeHtml = `<span class="rarity-badge">${rarityLabel}</span>`;
            }

            card.className = `wager-card glass-panel clean-choice-card${rarityClass}`;
            card.style.animationDelay = `${idx * 0.1}s`;
            card.style.cursor = 'pointer';
            card.style.textAlign = 'left';
            card.style.userSelect = 'none';

            card.innerHTML = `
                <div class="choice-text-box" style="pointer-events: none;">
                    ${rarityBadgeHtml}
                    <p class="wager-desc" style="font-size: 1.05rem; font-weight: 600; color: #ffffff; margin-bottom: 0; pointer-events: none;">${opt.text}</p>
                </div>
                <div class="select-wager-btn glow-btn" style="margin-top: 16px; pointer-events: none; text-align: center;">
                    Select Option →
                </div>
            `;

            card.onclick = (e) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (this.isProcessing) return;
                try { sound.playWagerSelect(); } catch(err){}
                if (this.currentScenario.pair) {
                    this.handlePairedSelection(opt);
                } else {
                    this.handleOptionSelection(opt);
                }
            };

            this.optionsContainerEl.appendChild(card);
        });
    }

    // --- Paired Test Selection ---

    // The first scenario of a pair is recorded without scoring; the second one
    // scores the pair on whether the two answers are consistent with each other.
    handlePairedSelection(selectedOpt) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            const sc = this.currentScenario;
            const pair = PAIRED_TESTS[sc.pair];
            const earlier = this.pairAnswers[sc.pair];

            if (!earlier) {
                this.pairAnswers[sc.pair] = {
                    scenarioId: sc.id,
                    answer: selectedOpt.text,
                    value: selectedOpt.value
                };
                this.history.push({ round: this.currentRound, score: this.score });
                this.chart.updateHistory(this.history);
                this.saveState();

                this.goToReasoningPage({ deferred: true, deltaScore: 0 });
                return;
            }

            // isConsistent expects the answers in the order the versions are defined
            const valueFor = id => (id === sc.id ? selectedOpt.value : earlier.value);
            const [firstVersion, secondVersion] = pair.versions;
            const isConsistent = pair.isConsistent(valueFor(firstVersion.id), valueFor(secondVersion.id));
            const labelFor = id => pair.versions.find(v => v.id === id).label;
            this.totalWagersMade++;
            this.choiceLogs.push({
                scenarioId: sc.id,
                biasType: sc.biasType,
                selectedText: isConsistent ? 'Consistent across versions' : 'Inconsistent across versions',
                biasValue: isConsistent ? 0 : 1
            });
            const deltaScore = this.applyScore(isConsistent);

            const reasoning = isConsistent
                ? `Your two answers were consistent with each other. ${pair.reasoning}`
                : `Your two answers were inconsistent with each other. ${pair.reasoning}`;

            this.goToReasoningPage({
                isOptimal: isConsistent,
                deltaScore,
                bestAnswer: pair.bestAnswer,
                reasoning,
                biasName: pair.biasName,
                bookRef: pair.bookRef,
                framingResponses: [
                    { partLabel: labelFor(earlier.scenarioId), answer: earlier.answer },
                    { partLabel: labelFor(sc.id), answer: selectedOpt.text }
                ]
            });
        } catch (err) {
            console.error('Error handling paired selection:', err);
            this.isProcessing = false;
        }
    }

    // Updates score, streak and chart for a scored decision; returns the score change
    applyScore(isOptimal) {
        let deltaScore;
        if (isOptimal) {
            this.successfulWagers++;
            this.streak++;
            if (this.streak > this.maxStreak) this.maxStreak = this.streak;
            deltaScore = 20;
        } else {
            this.streak = 0;
            deltaScore = -15;
        }

        this.score = Math.max(0, this.score + deltaScore);
        this.history.push({ round: this.currentRound, score: this.score });
        this.chart.updateHistory(this.history);
        this.updateHeaderUI();
        this.saveState();
        return deltaScore;
    }

    goToReasoningPage(details) {
        const breakdownData = {
            framingResponses: null,
            ...details,
            score: this.score,
            currentRound: this.currentRound,
            maxRounds: this.maxRounds,
            streak: this.streak
        };
        sessionStorage.setItem('gmb_breakdown', JSON.stringify(breakdownData));
        window.location.href = 'reasoning.html';
    }

    // --- Standard Option Selection ---

    handleOptionSelection(selectedOpt) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            const sc = this.currentScenario;

            // Log choice for stealth audit analysis
            this.choiceLogs.push({
                scenarioId: sc.id,
                biasType: sc.biasType,
                selectedText: selectedOpt.text,
                biasValue: selectedOpt.biasValue
            });

            this.totalWagersMade++;
            const isOptimal = selectedOpt.isBest === true || selectedOpt.biasValue === 0;

            const deltaScore = this.applyScore(isOptimal);

            this.goToReasoningPage({
                isOptimal,
                deltaScore,
                bestAnswer: sc.bestAnswer,
                reasoning: sc.reasoning,
                biasName: sc.biasName,
                bookRef: sc.bookRef
            });

        } catch (err) {
            console.error('Error handling option selection:', err);
            this.isProcessing = false;
        }
    }

    advanceRound() {
        this.currentRound++;
        this.saveState();
        this.loadCurrentScenario();
    }

    showCognitiveAuditSummary() {
        try { sound.playGameOver(); } catch(err){}

        const audit = BiasAnalyzer.analyzeSession(this.choiceLogs);
        const gradeInfo = this.getGradeInfo(this.score);
        const accuracy = this.totalWagersMade > 0 ? Math.round((this.successfulWagers / this.totalWagersMade) * 100) : 0;

        if (this.finalGradeBadge) {
            this.finalGradeBadge.textContent = gradeInfo.grade;
            this.finalGradeBadge.style.backgroundColor = gradeInfo.color;
            this.finalGradeBadge.style.boxShadow = `0 0 25px ${gradeInfo.color}aa`;
        }
        if (this.finalGradeTitle) {
            this.finalGradeTitle.textContent = gradeInfo.title;
            this.finalGradeTitle.style.color = gradeInfo.color;
        }
        if (this.finalScoreEl) this.finalScoreEl.textContent = this.score;
        if (this.statAccuracyEl) this.statAccuracyEl.textContent = `${accuracy}%`;

        if (this.sys1BarEl) this.sys1BarEl.style.width = `${audit.system1Score}%`;
        if (this.sys2BarEl) this.sys2BarEl.style.width = `${audit.system2Score}%`;
        if (this.sys1ValEl) this.sys1ValEl.textContent = `${audit.system1Score}% Heuristic`;
        if (this.sys2ValEl) this.sys2ValEl.textContent = `${audit.system2Score}% Analytical`;

        const emptyNote = text => `<p style="color: var(--text-muted); font-size: 0.9rem;">${text}</p>`;

        if (this.vulnerabilitiesListEl) {
            this.vulnerabilitiesListEl.innerHTML = audit.topVulnerabilities.length === 0
                ? emptyNote('No vulnerabilities detected.')
                : audit.topVulnerabilities.map(v => `
                <div class="audit-item vuln">
                    <h4>⚠️ ${v.name} (${v.susceptibilityPercent}% Vulnerability)</h4>
                    <p>${v.description}</p>
                    <span class="book-ref">📖 ${v.bookRef}</span>
                </div>
            `).join('');
        }

        if (this.strengthsListEl) {
            this.strengthsListEl.innerHTML = audit.topStrengths.length === 0
                ? emptyNote('No strengths detected yet.')
                : audit.topStrengths.map(s => `
                <div class="audit-item strength">
                    <h4>🛡️ ${s.name} (${100 - s.susceptibilityPercent}% Resiliency)</h4>
                    <p>${s.description}</p>
                    <span class="book-ref">📖 ${s.bookRef}</span>
                </div>
            `).join('');
        }

        if (this.summaryModal) {
            this.summaryModal.classList.add('active');
            setTimeout(() => {
                // Only plot the biases this session has actually tested
                BrainChart.renderRadarChart('bias-radar-chart', audit.summary.filter(s => s.count > 0));
            }, 50);
        }
    }

    hideSummaryModal() {
        if (this.summaryModal) this.summaryModal.classList.remove('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.brainApp = new GradeMyBrainApp();
});
