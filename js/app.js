/**
 * Grade My Brain - Stealth Cognitive Diagnostic App Controller
 * Compatible with Brave, Chrome, Safari, Firefox, and Edge.
 * Uses sessionStorage to persist game state across page navigations
 * (reasoning breakdown is shown on a separate page).
 */

import { sound } from './audio.js';
import { ScenarioBank } from './scenarioBank.js';
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
        this.maxRounds = 24;
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

        // Multi-part framing state
        this.multiPartState = null;

        this.init();
    }

    init() {
        this.chart = new BrainChart('brain-chart');
        this.setupEventListeners();

        // Check if returning from reasoning page
        if (sessionStorage.getItem('gmb_advance') === 'true') {
            sessionStorage.removeItem('gmb_advance');
            this.restoreState();
            this.advanceRound();
        } else if (sessionStorage.getItem('gmb_state')) {
            // Returning to page but not advancing (e.g. page refresh)
            this.restoreState();
            this.loadCurrentScenario();
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
            multiPartState: this.multiPartState
        };
        sessionStorage.setItem('gmb_state', JSON.stringify(state));
    }

    restoreState() {
        const raw = sessionStorage.getItem('gmb_state');
        if (!raw) return;
        const state = JSON.parse(raw);

        this.currentRound = state.currentRound;
        this.score = state.score;
        this.streak = state.streak;
        this.maxStreak = state.maxStreak;
        this.totalWagersMade = state.totalWagersMade;
        this.successfulWagers = state.successfulWagers;
        this.history = state.history;
        this.choiceLogs = state.choiceLogs;
        this.multiPartState = state.multiPartState || null;
        this.isProcessing = false;

        // Rebuild scenario queue from IDs
        const allScenarios = ScenarioBank.getAllScenarios();
        this.scenarioQueue = state.scenarioQueueIds.map(id =>
            allScenarios.find(s => s.id === id)
        ).filter(Boolean);

        // If queue is too short (shouldn't happen), pad it
        while (this.scenarioQueue.length < this.maxRounds) {
            this.scenarioQueue.push(allScenarios[Math.floor(Math.random() * allScenarios.length)]);
        }

        this.currentScenario = this.scenarioQueue[this.currentRound - 1] || null;
        this.chart.updateHistory(this.history);
        this.updateHeaderUI();
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
        this.multiPartState = null;

        this.scenarioQueue = ScenarioBank.getRandomizedSessionQueue(this.maxRounds);

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

        // Check if we're in a multi-part scenario mid-flow
        if (this.multiPartState && this.multiPartState.scenarioId === this.currentScenario.id) {
            this.renderMultiPartStep();
        } else if (this.currentScenario.isMultiPart) {
            // Starting a new multi-part scenario
            this.multiPartState = {
                scenarioId: this.currentScenario.id,
                currentStep: 0,
                responses: []
            };
            this.saveState();
            this.renderMultiPartStep();
        } else {
            this.renderScenarioCard();
        }

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
                this.handleOptionSelection(opt);
            };

            this.optionsContainerEl.appendChild(card);
        });
    }

    // --- Multi-Part (Framing) Scenario Rendering ---

    renderMultiPartStep() {
        if (!this.scenarioTitleEl || !this.scenarioTextEl || !this.optionsContainerEl) return;

        const sc = this.currentScenario;
        const step = this.multiPartState.currentStep;
        const part = sc.multiPart[step];

        this.scenarioTitleEl.textContent = sc.title;

        // Add part indicator before scenario text
        this.scenarioTextEl.innerHTML = '';
        const indicator = document.createElement('span');
        indicator.className = 'multi-part-indicator';
        indicator.textContent = part.partLabel;
        this.scenarioTextEl.appendChild(indicator);
        this.scenarioTextEl.appendChild(document.createElement('br'));
        this.scenarioTextEl.appendChild(document.createTextNode(part.scenarioText));

        this.optionsContainerEl.innerHTML = '';

        part.options.forEach((opt, idx) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'wager-card glass-panel clean-choice-card';
            card.style.animationDelay = `${idx * 0.1}s`;
            card.style.cursor = 'pointer';
            card.style.textAlign = 'left';
            card.style.userSelect = 'none';

            card.innerHTML = `
                <div class="choice-text-box" style="pointer-events: none;">
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
                this.handleMultiPartSelection(opt, part);
            };

            this.optionsContainerEl.appendChild(card);
        });
    }

    handleMultiPartSelection(selectedOpt, part) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            this.multiPartState.responses.push({
                partLabel: part.partLabel,
                answer: selectedOpt.text,
                value: selectedOpt.value
            });

            const sc = this.currentScenario;
            const nextStep = this.multiPartState.currentStep + 1;

            if (nextStep < sc.multiPart.length) {
                // More parts to show
                this.multiPartState.currentStep = nextStep;
                this.saveState();
                this.isProcessing = false;

                // Re-render for the next part
                this.renderMultiPartStep();

                if (this.scenarioStageEl) {
                    this.scenarioStageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // All parts completed — evaluate and navigate to reasoning page
                this.evaluateMultiPartScenario();
            }
        } catch (err) {
            console.error('Error handling multi-part selection:', err);
            this.isProcessing = false;
        }
    }

    evaluateMultiPartScenario() {
        const sc = this.currentScenario;
        const responses = this.multiPartState.responses;

        // For framing scenarios: check if responses to frame A and frame B are consistent
        // responses[0] = frame A answer, responses[1] = frame B answer, responses[2] = reflection
        const frameAValue = responses[0]?.value;
        const frameBValue = responses[1]?.value;
        const reflectionValue = responses[2]?.value;

        const isConsistent = frameAValue === frameBValue;
        const caughtByReflection = !isConsistent && reflectionValue === 'reconsider';

        // Scoring: consistent = optimal (+20), inconsistent but caught in reflection = partial (+5),
        // inconsistent and stood by = biased (-15)
        let isOptimal;
        let deltaScore;

        if (isConsistent) {
            isOptimal = true;
            deltaScore = 20;
            this.successfulWagers++;
            this.streak++;
            if (this.streak > this.maxStreak) this.maxStreak = this.streak;
        } else if (caughtByReflection) {
            isOptimal = false;
            deltaScore = 5;
            this.streak = 0;
        } else {
            isOptimal = false;
            deltaScore = -15;
            this.streak = 0;
        }

        this.totalWagersMade++;
        this.score = Math.max(0, this.score + deltaScore);
        this.history.push({ round: this.currentRound, score: this.score });
        this.chart.updateHistory(this.history);
        this.updateHeaderUI();

        // Log for bias analysis
        this.choiceLogs.push({
            scenarioId: sc.id,
            biasType: sc.biasType,
            selectedText: isConsistent ? 'Consistent across frames' : 'Inconsistent across frames',
            biasValue: isConsistent ? 0 : (caughtByReflection ? 0.5 : 1)
        });

        // Build enhanced reasoning
        let enhancedReasoning = sc.reasoning;
        if (isConsistent) {
            enhancedReasoning = `You answered consistently across both framings — well done! ${sc.reasoning}`;
        } else if (caughtByReflection) {
            enhancedReasoning = `You initially gave different answers to the two frames, but caught the inconsistency during reflection. ${sc.reasoning}`;
        } else {
            enhancedReasoning = `You gave different answers to the two frames and stood by them. ${sc.reasoning}`;
        }

        this.multiPartState = null;
        this.saveState();

        // Navigate to reasoning page
        const breakdownData = {
            isOptimal,
            deltaScore,
            bestAnswer: sc.bestAnswer,
            reasoning: enhancedReasoning,
            biasName: sc.biasName,
            bookRef: sc.bookRef,
            score: this.score,
            currentRound: this.currentRound,
            maxRounds: this.maxRounds,
            streak: this.streak,
            framingResponses: responses
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

            let deltaScore = 0;
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

            // Navigate to reasoning page instead of showing inline breakdown
            const breakdownData = {
                isOptimal,
                deltaScore,
                bestAnswer: sc.bestAnswer,
                reasoning: sc.reasoning,
                biasName: sc.biasName,
                bookRef: sc.bookRef,
                score: this.score,
                currentRound: this.currentRound,
                maxRounds: this.maxRounds,
                streak: this.streak,
                framingResponses: null
            };

            sessionStorage.setItem('gmb_breakdown', JSON.stringify(breakdownData));
            window.location.href = 'reasoning.html';

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

        if (this.vulnerabilitiesListEl) {
            this.vulnerabilitiesListEl.innerHTML = audit.topVulnerabilities.map(v => `
                <div class="audit-item vuln">
                    <h4>⚠️ ${v.name} (${v.susceptibilityPercent}% Vulnerability)</h4>
                    <p>${v.description}</p>
                    <span class="book-ref">📖 ${v.bookRef}</span>
                </div>
            `).join('');
        }

        if (this.strengthsListEl) {
            this.strengthsListEl.innerHTML = audit.topStrengths.map(s => `
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
                BrainChart.renderRadarChart('bias-radar-chart', audit.summary);
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
