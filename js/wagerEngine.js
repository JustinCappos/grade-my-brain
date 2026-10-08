/**
 * Grade My Brain - Wager Engine
 * Generates dynamic wagers with success probabilities, risk tiers, costs, and expected values.
 */

export const RISK_TIERS = {
    SAFE: { name: 'Safe Play', color: '#10b981', badgeClass: 'tier-safe' },
    BALANCED: { name: 'Balanced Risk', color: '#3b82f6', badgeClass: 'tier-balanced' },
    HIGH: { name: 'High Risk', color: '#f59e0b', badgeClass: 'tier-high' },
    MOONSHOT: { name: 'Moonshot', color: '#ec4899', badgeClass: 'tier-moonshot' }
};

const WAGER_TEMPLATES = [
    // Safe Tier
    {
        title: "Treasury Yield Hedge",
        tier: "SAFE",
        probRange: [85, 95],
        costFactor: 5,
        gainMult: [1.2, 1.5],
        lossMult: [0.3, 0.5],
        description: "Low volatility option with guaranteed high statistical stability.",
        tag: "Low Volatility"
    },
    {
        title: "Algorithm Backtest",
        tier: "SAFE",
        probRange: [80, 92],
        costFactor: 8,
        gainMult: [1.3, 1.7],
        lossMult: [0.4, 0.6],
        description: "Tested statistical pattern with high probability yield.",
        tag: "Steady Growth"
    },

    // Balanced Tier
    {
        title: "Statistical Arbitrage",
        tier: "BALANCED",
        probRange: [65, 75],
        costFactor: 12,
        gainMult: [2.0, 2.6],
        lossMult: [0.8, 1.2],
        description: "Favorable expected value exploit capitalizing on market mispricing.",
        tag: "Positive EV"
    },
    {
        title: "Neural Network Forecast",
        tier: "BALANCED",
        probRange: [60, 72],
        costFactor: 15,
        gainMult: [2.2, 3.0],
        lossMult: [1.0, 1.4],
        description: "AI-assisted signal trade offering solid risk-adjusted returns.",
        tag: "Calculated Edge"
    },

    // High Risk Tier
    {
        title: "Asymmetric Volatility Option",
        tier: "HIGH",
        probRange: [40, 52],
        costFactor: 20,
        gainMult: [3.5, 4.8],
        lossMult: [1.8, 2.4],
        description: "Moderate odds with explosive multiplier potential on success.",
        tag: "High Leverage"
    },
    {
        title: "Contrarian Liquidity Run",
        tier: "HIGH",
        probRange: [35, 48],
        costFactor: 25,
        gainMult: [4.0, 5.5],
        lossMult: [2.0, 2.8],
        description: "Betting against consensus sentiment for a heavy cognitive payout.",
        tag: "Contrarian"
    },

    // Moonshot Tier
    {
        title: "Black Swan Speculation",
        tier: "MOONSHOT",
        probRange: [15, 28],
        costFactor: 30,
        gainMult: [7.0, 10.0],
        lossMult: [3.0, 4.2],
        description: "Extreme tail-risk gamble. Huge score grade surge if odds hit!",
        tag: "Jackpot Chance"
    },
    {
        title: "Quantum Superposition Bet",
        tier: "MOONSHOT",
        probRange: [12, 22],
        costFactor: 35,
        gainMult: [8.5, 12.0],
        lossMult: [3.5, 5.0],
        description: "High variance binary gamble. Fortune favors the daring mind.",
        tag: "Maximum Risk"
    }
];

const SPECIAL_MODIFIERS = [
    { name: "Safety Cushion", effect: "Reduces loss by 40% on failure.", apply: (wager) => { wager.loss = Math.round(wager.loss * 0.6); } },
    { name: "Double Down", effect: "Doubles gain and doubles failure penalty.", apply: (wager) => { wager.gain *= 2; wager.loss *= 2; } },
    { name: "Zero Cost Entry", effect: "Waives the wager entry cost.", apply: (wager) => { wager.cost = 0; } },
    { name: "Bonus Multiplier", effect: "Adds +30% extra score on success.", apply: (wager) => { wager.gain = Math.round(wager.gain * 1.3); } }
];

export class WagerEngine {
    static generateWagersForRound(roundNumber, currentScore) {
        // Pick 3 diverse wagers (e.g. 1 Safe/Balanced, 1 Balanced/High, 1 High/Moonshot)
        const selected = [];
        const tiersToPick = ['SAFE', 'BALANCED', 'HIGH'];

        // At round 5+, introduce Moonshots more frequently
        if (roundNumber >= 4 && Math.random() > 0.4) {
            tiersToPick[2] = 'MOONSHOT';
        }

        tiersToPick.forEach(tierKey => {
            const templatesOfTier = WAGER_TEMPLATES.filter(t => t.tier === tierKey);
            const template = templatesOfTier[Math.floor(Math.random() * templatesOfTier.length)];
            
            const prob = Math.floor(
                template.probRange[0] + Math.random() * (template.probRange[1] - template.probRange[0])
            );

            const baseUnit = Math.max(10, Math.round(currentScore * 0.08));
            
            const cost = Math.max(5, Math.round(baseUnit * (template.costFactor / 10)));
            const gainMult = template.gainMult[0] + Math.random() * (template.gainMult[1] - template.gainMult[0]);
            const lossMult = template.lossMult[0] + Math.random() * (template.lossMult[1] - template.lossMult[0]);

            const gain = Math.round(baseUnit * gainMult * 2);
            const loss = Math.round(baseUnit * lossMult * 1.5);

            const wager = {
                id: `wager-${roundNumber}-${Math.random().toString(36).substr(2, 6)}`,
                title: template.title,
                tier: template.tier,
                tierMeta: RISK_TIERS[template.tier],
                probability: prob,
                cost: cost,
                gain: gain,
                loss: loss,
                description: template.description,
                tag: template.tag,
                modifier: null
            };

            // 35% chance to attach a special modifier
            if (Math.random() < 0.35) {
                const mod = SPECIAL_MODIFIERS[Math.floor(Math.random() * SPECIAL_MODIFIERS.length)];
                wager.modifier = { name: mod.name, effect: mod.effect };
                mod.apply(wager);
            }

            // Recalculate Expected Value (EV)
            // EV = (P_win * Gain) - ((1 - P_win) * Loss) - Cost
            const pWin = wager.probability / 100;
            const pLoss = 1 - pWin;
            wager.expectedValue = Math.round((pWin * wager.gain) - (pLoss * wager.loss) - wager.cost);

            selected.push(wager);
        });

        return selected;
    }

    static resolveWager(wager) {
        const roll = Math.random() * 100;
        const isSuccess = roll < wager.probability;
        const scoreChange = isSuccess ? wager.gain : -wager.loss;
        return {
            isSuccess,
            roll: Math.round(roll * 10) / 10,
            targetProb: wager.probability,
            netChange: scoreChange - wager.cost,
            grossChange: scoreChange,
            costPaid: wager.cost
        };
    }
}
