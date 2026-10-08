/**
 * Grade My Brain - Reasoning Page Controller
 * Reads breakdown data from sessionStorage and displays the post-choice analysis.
 */

import { sound } from './audio.js';

const GRADES = [
    { min: 0, max: 79, grade: 'F', title: 'Cognitive Casualty', color: '#ef4444' },
    { min: 80, max: 110, grade: 'D', title: 'Novice Risk-Taker', color: '#f97316' },
    { min: 111, max: 155, grade: 'C', title: 'Calculated Analyst', color: '#eab308' },
    { min: 156, max: 215, grade: 'B', title: 'Tactical Mind', color: '#3b82f6' },
    { min: 216, max: 295, grade: 'A', title: 'Grandmaster Strategist', color: '#8b5cf6' },
    { min: 296, max: 395, grade: 'S', title: 'Elite Mastermind', color: '#ec4899' },
    { min: 396, max: 9999, grade: 'S+', title: 'Transcendent Genius', color: '#06b6d4' }
];

function getGradeInfo(score) {
    return GRADES.find(g => score >= g.min && score <= g.max) || GRADES[GRADES.length - 1];
}

window.addEventListener('DOMContentLoaded', () => {
    const raw = sessionStorage.getItem('gmb_breakdown');
    if (!raw) {
        window.location.href = 'index.html';
        return;
    }

    const data = JSON.parse(raw);

    // Update header stats
    const gradeInfo = getGradeInfo(data.score);
    const scoreEl = document.getElementById('current-score');
    const gradeBadgeEl = document.getElementById('grade-badge');
    const gradeTitleEl = document.getElementById('grade-title');
    const roundEl = document.getElementById('current-round');
    const streakEl = document.getElementById('current-streak');

    if (scoreEl) scoreEl.textContent = data.score;
    if (gradeBadgeEl) {
        gradeBadgeEl.textContent = gradeInfo.grade;
        gradeBadgeEl.style.backgroundColor = gradeInfo.color;
        gradeBadgeEl.style.boxShadow = `0 0 15px ${gradeInfo.color}88`;
    }
    if (gradeTitleEl) {
        gradeTitleEl.textContent = gradeInfo.title;
        gradeTitleEl.style.color = gradeInfo.color;
    }
    if (roundEl) roundEl.textContent = `${data.currentRound} / ${data.maxRounds}`;
    if (streakEl) streakEl.textContent = `${data.streak}🔥`;

    // Populate breakdown
    const statusEl = document.getElementById('breakdown-choice-status');
    const deltaEl = document.getElementById('breakdown-score-delta');
    const bestAnswerEl = document.getElementById('breakdown-best-answer');
    const reasoningEl = document.getElementById('breakdown-reasoning');
    const biasNameEl = document.getElementById('breakdown-bias-name');
    const bookRefEl = document.getElementById('breakdown-book-ref');

    // First scenario of a framing pair: reveal nothing until the pair is scored
    if (data.deferred) {
        if (statusEl) {
            statusEl.textContent = '📝 DECISION RECORDED';
            statusEl.style.color = '#38bdf8';
        }
        if (deltaEl) {
            deltaEl.textContent = 'Scored later';
            deltaEl.style.color = '#94a3b8';
        }
        const gridEl = document.querySelector('.breakdown-grid');
        if (gridEl) {
            gridEl.innerHTML = '<p class="breakdown-desc">Your decision has been recorded. This scenario is scored later in the session.</p>';
        }
    } else {
        renderBreakdown();
    }

    function renderBreakdown() {
        if (statusEl) {
            statusEl.textContent = data.isOptimal ? '🎯 OPTIMAL DECISION' : '⚠️ SYSTEM 1 HEURISTIC TRIGGERED';
            statusEl.style.color = data.isOptimal ? '#34d399' : '#f87171';
        }

        if (deltaEl) {
            const delta = data.deltaScore;
            deltaEl.textContent = `${delta > 0 ? '+' : ''}${delta} PTS`;
            deltaEl.style.color = delta > 0 ? '#10b981' : '#ef4444';
        }

        if (bestAnswerEl) bestAnswerEl.textContent = data.bestAnswer;
        if (reasoningEl) reasoningEl.textContent = data.reasoning;
        if (biasNameEl) biasNameEl.textContent = data.biasName;
        if (bookRefEl) bookRefEl.textContent = `📖 ${data.bookRef}`;

        // Show both answers when a framing pair is scored
        if (data.framingResponses && data.framingResponses.length > 0) {
            const framingSectionEl = document.getElementById('framing-summary-section');
            const framingSummaryEl = document.getElementById('framing-summary');
            if (framingSectionEl && framingSummaryEl) {
                framingSectionEl.style.display = 'block';
                framingSummaryEl.innerHTML = data.framingResponses.map((r, i) => `
                    <div class="framing-response-row">
                        <span class="framing-part-label">${r.partLabel}:</span>
                        <span class="framing-part-answer">${r.answer}</span>
                    </div>
                `).join('');
            }
        }
    }

    // Play appropriate sound
    try {
        if (data.deferred) {
            sound.playClick();
        } else if (data.isOptimal) {
            sound.playWin();
        } else {
            sound.playLoss();
        }
    } catch (err) {}

    // Next scenario button
    const nextBtn = document.getElementById('next-scenario-btn');
    if (nextBtn) {
        nextBtn.onclick = () => {
            try { sound.playClick(); } catch (err) {}
            // Signal the main app to advance to the next round
            sessionStorage.setItem('gmb_advance', 'true');
            sessionStorage.removeItem('gmb_breakdown');
            window.location.href = 'index.html';
        };
    }
});
