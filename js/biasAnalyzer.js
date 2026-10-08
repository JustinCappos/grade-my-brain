/**
 * Grade My Brain - Cognitive Bias Analyzer
 * Evaluates player choice telemetry to generate a stealth Cognitive Audit & Bias Profile.
 */

import { BIAS_CATEGORIES } from './scenarioBank.js';

export class BiasAnalyzer {
    static analyzeSession(choiceLogs) {
        // choiceLogs = [{ scenarioId, biasType, selectedOption, biasValue }, ...]

        const biasScores = {};
        Object.keys(BIAS_CATEGORIES).forEach(type => {
            biasScores[type] = {
                totalValue: 0,
                count: 0,
                meta: BIAS_CATEGORIES[type]
            };
        });

        choiceLogs.forEach(log => {
            if (biasScores[log.biasType]) {
                biasScores[log.biasType].totalValue += log.biasValue;
                biasScores[log.biasType].count++;
            }
        });

        // Compute percentage susceptibility per bias
        const summary = [];
        let totalBiasPoints = 0;
        let totalEvaluated = 0;

        Object.keys(biasScores).forEach(type => {
            const data = biasScores[type];
            const percent = data.count > 0 ? Math.round((data.totalValue / data.count) * 100) : 0;
            
            let status = 'Resilient';
            let color = '#10b981';

            if (percent > 65) {
                status = 'High Vulnerability';
                color = '#ef4444';
            } else if (percent > 35) {
                status = 'Moderate Bias';
                color = '#f59e0b';
            }

            summary.push({
                type,
                name: data.meta.name,
                shortName: data.meta.shortName,
                description: data.meta.description,
                bookRef: data.meta.bookReference,
                susceptibilityPercent: percent,
                status,
                color,
                count: data.count
            });

            if (data.count > 0) {
                totalBiasPoints += percent;
                totalEvaluated++;
            }
        });

        const overallBiasIndex = totalEvaluated > 0 ? Math.round(totalBiasPoints / totalEvaluated) : 50;
        const system2Score = Math.max(0, 100 - overallBiasIndex);
        const system1Score = overallBiasIndex;

        // Sort by vulnerability (highest susceptibility first)
        summary.sort((a, b) => b.susceptibilityPercent - a.susceptibilityPercent);

        // Only categories the player has actually been tested on; a 0% category
        // is never a vulnerability and a 100% category is never a strength
        const evaluated = summary.filter(s => s.count > 0);
        const topVulnerabilities = evaluated.filter(s => s.susceptibilityPercent > 0).slice(0, 2);
        const topStrengths = evaluated.filter(s => s.susceptibilityPercent < 100).reverse().slice(0, 2);

        return {
            overallBiasIndex,
            system1Score,
            system2Score,
            summary,
            topVulnerabilities,
            topStrengths
        };
    }
}
