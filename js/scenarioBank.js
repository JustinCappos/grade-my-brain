/**
 * Grade My Brain - Stealth Scenario Bank
 * Grounded in "Thinking, Fast and Slow" (excluding Ch 3 & 4).
 * Each scenario provides clear operational requirements, best answers, reasoning, and book citations.
 */

export const BIAS_CATEGORIES = {
    ANCHORING: {
        name: "Anchoring Effect",
        description: "Disproportionate reliance on an initial arbitrary number when making estimates or bids.",
        bookReference: "Thinking, Fast and Slow - Chapter 11"
    },
    COMPROMISE: {
        name: "Compromise Effect",
        description: "Tendency to select intermediate options when presented with extreme alternatives.",
        bookReference: "Behavioral Economics (Simonson 1989)"
    },
    LOSS_AVERSION: {
        name: "Loss Aversion",
        description: "Feeling the pain of losses ~2x more intensely than the pleasure of equivalent gains.",
        bookReference: "Thinking, Fast and Slow - Chapter 26 (Prospect Theory)"
    },
    FRAMING: {
        name: "Framing Effect",
        description: "Shifting preferences based on positive vs negative wording of mathematically identical outcomes.",
        bookReference: "Thinking, Fast and Slow - Chapter 31"
    },
    REPRESENTATIVENESS: {
        name: "Representativeness Fallacy",
        description: "Judging probability by similarity to a stereotype while ignoring statistical set logic (Conjunction Fallacy).",
        bookReference: "Thinking, Fast and Slow - Chapter 15"
    },
    BASE_RATE: {
        name: "Base Rate Neglect",
        description: "Ignoring general statistical baseline frequencies in favor of specific anecdotes.",
        bookReference: "Thinking, Fast and Slow - Chapter 16"
    },
    AVAILABILITY: {
        name: "Availability Heuristic",
        description: "Overestimating the likelihood of events that are vivid or recent in memory.",
        bookReference: "Thinking, Fast and Slow - Chapters 12 & 13"
    },
    SUNK_COST: {
        name: "Sunk Cost Fallacy",
        description: "Throwing additional resources into a failing project to justify past unrecoverable expenses.",
        bookReference: "Thinking, Fast and Slow - Chapter 32"
    },
    DECOY: {
        name: "Decoy Effect",
        description: "Preference shifts caused by the presence of an asymmetric, inferior third option.",
        bookReference: "Behavioral Economics (Huber et al. 1982)"
    },
    PLANNING: {
        name: "Planning Fallacy",
        description: "Unrealistic optimism regarding time, costs, and risks of future projects.",
        bookReference: "Thinking, Fast and Slow - Chapter 23"
    },
    SALIENCE_RARITY: {
        name: "Salience & Rarity Bias",
        description: "Choosing cosmetically rare or prestigious items over options with strictly higher expected utility.",
        bookReference: "Behavioral Economics (Salience & Heuristic Valuation)"
    }
};

export const MASTER_SCENARIOS = [
    // -------------------------------------------------------------
    // ANCHORING EFFECT (Ch 11)
    // -------------------------------------------------------------
    {
        id: "anchoring-1",
        biasType: "ANCHORING",
        title: "Venture Valuation Bid",
        scenarioText: "A tech founder mentions in casual conversation that their startup is worth $150 Million. Independent financial auditors evaluate the company's current assets at $40 Million. If the company succeeds, auditors estimate the assets could grow to $90 Million, but they assign only a 60% probability of success. The founder offers you an investment stake based on a $135 Million valuation.",
        bestAnswer: "Reject Wager (Demand Fundamental Valuation)",
        reasoning: "The $150M figure was an arbitrary anchor with no fundamental backing. Even in the best case (60% chance of $90M success), the expected asset value is far below $135M. The anchor pulled the offer price far above any reasonable fundamental valuation.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Accept Wager ($135M Valuation)", biasValue: 1, isBest: false },
            { text: "Reject Wager (Demand Fundamental Valuation)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "anchoring-2",
        biasType: "ANCHORING",
        title: "Litigation Settlement Counter",
        scenarioText: "In a contract breach lawsuit, opposing counsel opens negotiations with an aggressive $5 Million demand. Your legal team estimates a 95% probability of winning at trial, with a likely verdict awarding you $800,000 in damages. Legal costs to go to trial would be $50,000. Opposing counsel offers to settle out-of-court for $3.5 Million paid by you.",
        bestAnswer: "Reject Settlement (Proceed to Trial)",
        reasoning: "Opposing counsel's $5M opening demand anchored expectations high. With a 95% win probability and an $800K verdict minus $50K legal costs, going to trial is overwhelmingly favorable compared to paying $3.5M to settle.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Accept Settlement (Pay $3.5 Million)", biasValue: 1, isBest: false },
            { text: "Reject Settlement (Proceed to Trial)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "anchoring-3",
        biasType: "ANCHORING",
        title: "Commercial Real Estate Purchase",
        scenarioText: "A commercial office building has been listed for an asking price of $4.5 Million. An independent professional appraisal estimates an 80% probability that fair market value is $2.8 Million. The seller offers a discounted price of $3.1 Million.",
        bestAnswer: "Reject Offer (Bid Near $2.8M Appraisal Value)",
        reasoning: "The $4.5M asking price anchors buyer perception of value. The objective appraisal confirms the property is likely worth $2.8M, making the $3.1M discount still above fair market value.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Accept Offer ($3.1M Price)", biasValue: 1, isBest: false },
            { text: "Reject Offer (Bid Near $2.8M Appraisal Value)", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // COMPROMISE EFFECT (Extremeness Aversion)
    // -------------------------------------------------------------
    {
        id: "compromise-1",
        biasType: "COMPROMISE",
        title: "Cloud Backup Storage Tier",
        scenarioText: "Your firm is setting up a cold storage archive accessed once a month. Internal analysis confirms that up to 36 hours of downtime per month is fully acceptable for this use case. Three plans are available: Option A ($10/mo) guarantees no more than 36 hours of downtime per month. Option B ($55/mo) guarantees no more than 7 hours of downtime per month. Option C ($350/mo) guarantees no more than 5 minutes of downtime per month.",
        bestAnswer: "Option A: Basic Tier ($10/mo)",
        reasoning: "Option A ($10/mo) fully satisfies the stated business requirement of no more than 36 hours downtime for cold storage. Choosing Option B ($55/mo) demonstrates the Compromise Effect — overpaying for a middle option when the low tier is objectively sufficient for this workload.",
        biasName: "Compromise Effect (Extremeness Aversion)",
        bookRef: "Behavioral Economics (Simonson 1989)",
        options: [
            { text: "Option A: Basic Tier ($10/mo)", biasValue: 0, isBest: true },
            { text: "Option B: Standard Tier ($55/mo)", biasValue: 1, isBest: false },
            { text: "Option C: Enterprise Tier ($350/mo)", biasValue: 0, isBest: false }
        ]
    },
    {
        id: "compromise-2",
        biasType: "COMPROMISE",
        title: "Laboratory Equipment Insurance",
        scenarioText: "You are insuring lab equipment worth $100,000. Historical data shows this type of equipment has a 0.05% annual probability of total loss. Your risk budget requires covering at least 50% of asset value. Basic Plan ($200/yr) covers 50% of value. Mid-Tier Plan ($800/yr) covers 80% of value. Premium Plan ($2,400/yr) covers 100% of value.",
        bestAnswer: "Select Basic Plan ($200/yr)",
        reasoning: "With a 0.05% loss probability, the expected annual loss is only $50. The Basic Plan ($200/yr) satisfies the 50% coverage requirement at the lowest cost. Overspending on higher tiers wastes budget relative to the actual risk level.",
        biasName: "Compromise Effect",
        bookRef: "Behavioral Economics (Simonson 1989)",
        options: [
            { text: "Select Basic Plan ($200/yr)", biasValue: 0, isBest: true },
            { text: "Select Mid-Tier Plan ($800/yr)", biasValue: 1, isBest: false },
            { text: "Select Premium Plan ($2,400/yr)", biasValue: 0, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // LOSS AVERSION & PROSPECT THEORY (Ch 26 & 29)
    // -------------------------------------------------------------
    {
        id: "loss-1",
        biasType: "LOSS_AVERSION",
        title: "Epidemic Treatment Intervention",
        scenarioText: "A disease outbreak threatens 600 patients. Program A guarantees saving exactly 200 lives. Program B has a 35% probability of saving all 600 lives, and a 65% probability of saving none.",
        bestAnswer: "Choose Program A (Guaranteed 200 lives saved)",
        reasoning: "Program A guarantees saving 200 lives. Program B has an expected value of 210 lives (0.35 × 600), which is slightly higher on paper — but carries a 65% chance of saving nobody. Under gain framing, the certainty of saving 200 real human lives is the risk-averse, rational choice when lives are at stake.",
        biasName: "Loss Aversion / Prospect Theory",
        bookRef: "Thinking, Fast and Slow - Chapter 26",
        options: [
            { text: "Choose Program A (Guaranteed 200 lives saved)", biasValue: 0, isBest: true },
            { text: "Choose Program B (35% chance of saving all 600)", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "loss-2",
        biasType: "LOSS_AVERSION",
        title: "Corporate Restructuring Risk",
        scenarioText: "A financial crisis threatens $600,000 in corporate assets. Plan X results in a certain loss of $350,000. Plan Y offers a 30% probability of losing nothing and a 70% probability of losing all $600,000.",
        bestAnswer: "Choose Plan X (Certain loss of $350,000)",
        reasoning: "Plan X loses $350,000 with certainty. Plan Y has an expected loss of $420,000 (0.70 × $600K). Choosing Plan Y demonstrates risk-seeking in the domain of losses — gambling on a worse expected outcome just to avoid accepting a certain loss.",
        biasName: "Loss Aversion & Loss Domain Risk Seeking",
        bookRef: "Thinking, Fast and Slow - Chapter 26 & 29",
        options: [
            { text: "Choose Plan X (Certain loss of $350,000)", biasValue: 0, isBest: true },
            { text: "Choose Plan Y (30% chance of losing nothing)", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // FRAMING EFFECT (Ch 31)
    // -------------------------------------------------------------
    {
        id: "framing-1",
        biasType: "FRAMING",
        title: "Surgical Procedure Approval",
        isMultiPart: true,
        multiPart: [
            {
                partLabel: "Part 1 of 3",
                scenarioText: "A patient requires a complex heart operation. Medical statistics indicate the procedure has a 90% one-month survival rate. Based on this information, would you approve the surgery?",
                options: [
                    { text: "Approve Surgical Procedure", value: "approve" },
                    { text: "Decline Surgical Procedure", value: "decline" }
                ]
            },
            {
                partLabel: "Part 2 of 3",
                scenarioText: "A different patient requires the same complex heart operation. Medical statistics indicate that out of every 100 patients who undergo this procedure, 10 die within the first month. Based on this information, would you approve the surgery?",
                options: [
                    { text: "Approve Surgical Procedure", value: "approve" },
                    { text: "Decline Surgical Procedure", value: "decline" }
                ]
            },
            {
                partLabel: "Part 3 of 3 — Reflection",
                scenarioText: "You've now considered two medical scenarios. Would you like to change either of your previous answers, or do you stand by both decisions?",
                options: [
                    { text: "I stand by both of my answers", value: "stand" },
                    { text: "I'd like to reconsider — my answers should be the same", value: "reconsider" }
                ]
            }
        ],
        bestAnswer: "Consistent answers across both frames (both approve or both decline)",
        reasoning: "A '90% survival rate' and '10 out of 100 die' are identical statistics. If you gave different answers to Part 1 and Part 2, you were influenced by the Framing Effect — positive framing (survival) makes the procedure seem safer than negative framing (mortality), even though the underlying numbers are exactly the same.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        scenarioText: "",
        options: []
    },
    {
        id: "framing-2",
        biasType: "FRAMING",
        title: "Semiconductor Batch Approval",
        isMultiPart: true,
        multiPart: [
            {
                partLabel: "Part 1 of 3",
                scenarioText: "A microchip manufacturing batch has completed testing. Quality control reports that 95% of the components in this batch meet specification and are defect-free. Do you accept or reject this batch?",
                options: [
                    { text: "Accept Batch", value: "accept" },
                    { text: "Reject Batch", value: "reject" }
                ]
            },
            {
                partLabel: "Part 2 of 3",
                scenarioText: "A different microchip manufacturing batch has completed testing. Quality control reports that 5% of the components in this batch are defective and failed specification. Do you accept or reject this batch?",
                options: [
                    { text: "Accept Batch", value: "accept" },
                    { text: "Reject Batch", value: "reject" }
                ]
            },
            {
                partLabel: "Part 3 of 3 — Reflection",
                scenarioText: "You've now evaluated two manufacturing batches. Would you like to change either of your previous answers, or do you stand by both decisions?",
                options: [
                    { text: "I stand by both of my answers", value: "stand" },
                    { text: "I'd like to reconsider — my answers should be the same", value: "reconsider" }
                ]
            }
        ],
        bestAnswer: "Consistent answers across both frames (both accept or both reject)",
        reasoning: "'95% defect-free' and '5% defective' describe exactly the same batch quality. If you accepted one but rejected the other, you were influenced by the Framing Effect — the way information is worded changed your decision despite the underlying facts being identical.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        scenarioText: "",
        options: []
    },

    // -------------------------------------------------------------
    // REPRESENTATIVENESS & CONJUNCTION FALLACY (Ch 15)
    // -------------------------------------------------------------
    {
        id: "represent-1",
        biasType: "REPRESENTATIVENESS",
        title: "Background Profile Assessment",
        scenarioText: "Linda is 31 years old, single, outspoken, and deeply concerned with social justice and anti-discrimination. Which statement is more probable?",
        bestAnswer: "Linda is a bank teller",
        reasoning: "By set logic, a single condition (Bank Teller) is always at least as probable as a conjunction of two conditions (Bank Teller AND Feminist). P(A) >= P(A and B). Choosing the conjunction is the Conjunction Fallacy.",
        biasName: "Representativeness & Conjunction Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 15",
        options: [
            { text: "Linda is a bank teller active in the feminist movement", biasValue: 1, isBest: false },
            { text: "Linda is a bank teller", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "represent-2",
        biasType: "REPRESENTATIVENESS",
        title: "Founder Background Likelihood",
        scenarioText: "Mark wears hoodies, dropped out of university, and spends 16 hours a day coding neural networks. Which statement is more likely?",
        bestAnswer: "Mark is a software engineer",
        reasoning: "The set of software engineers contains all software engineers who founded VC startups. Therefore, being just a software engineer is at least as probable as the specific subset.",
        biasName: "Conjunction Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 15",
        options: [
            { text: "Mark is a software engineer who founded an AI startup with $10M VC funding", biasValue: 1, isBest: false },
            { text: "Mark is a software engineer", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // BASE RATE NEGLECT (Ch 16)
    // -------------------------------------------------------------
    {
        id: "baserate-1",
        biasType: "BASE_RATE",
        title: "Hit-and-Run Witness Identification",
        scenarioText: "In a city where 85% of cabs are Green and 15% are Blue, a witness identifies a hit-and-run cab as Blue. Tests confirm the witness is 80% accurate under night lighting conditions. What is the estimated probability that the cab was Blue?",
        bestAnswer: "Estimate 41% Probability",
        reasoning: "Using Bayes' Theorem: P(Blue|Witness) = (0.80 × 0.15) / ((0.80 × 0.15) + (0.20 × 0.85)) = 0.12 / 0.29 = 41%. Estimating 80% ignores the strong 85% Green base rate.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "Estimate 80% Probability", biasValue: 1, isBest: false },
            { text: "Estimate 41% Probability", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "baserate-2",
        biasType: "BASE_RATE",
        title: "Medical Diagnostic Test",
        scenarioText: "A rare medical condition affects 0.1% of the population (1 in 1,000). A diagnostic screening test has an estimated 95% accuracy rate (5% false positive rate). A patient tests positive. What is the estimated probability that the patient actually has the disease?",
        bestAnswer: "Estimate 2% Probability of Illness",
        reasoning: "In 1,000 people, 1 has the disease (true positive = 0.95), while 999 do not (false positives = about 50). So P(Disease|Positive) = 0.95 / 50.95, which is approximately 1.9%. Claiming 95% ignores the 0.1% base rate.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "Estimate 95% Probability of Illness", biasValue: 1, isBest: false },
            { text: "Estimate 2% Probability of Illness", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // AVAILABILITY HEURISTIC (Ch 12 & 13)
    // -------------------------------------------------------------
    {
        id: "avail-1",
        biasType: "AVAILABILITY",
        title: "Logistics Safety Assessment",
        scenarioText: "Following heavy 24-hour news coverage of a commercial plane crash, executives want to change corporate travel policy. Statistical transportation safety databases show an estimated 99.999% flight safety record, making air travel 100x safer than highway driving per passenger mile.",
        bestAnswer: "Maintain standard commercial air travel",
        reasoning: "Focusing on vivid news headlines leads to irrational risk inflation. Statistical safety databases confirm commercial flights are 100x safer than driving.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Reallocate budget to long-distance car travel", biasValue: 1, isBest: false },
            { text: "Maintain standard commercial air travel", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "avail-2",
        biasType: "AVAILABILITY",
        title: "Data Center Breach Response",
        scenarioText: "A major competitor's cloud platform was breached via a SQL injection attack, generating widespread media coverage. Your company runs three server types in equal proportion: web servers, database servers, and file storage servers. An internal audit finds that your file storage servers have critical unpatched vulnerabilities, while your database servers are fully patched and up to date. Where should you prioritize your security budget?",
        bestAnswer: "Prioritize patching file storage servers",
        reasoning: "The competitor's headline-grabbing SQL injection attack makes database breaches feel more urgent (Availability Heuristic), but your own audit shows databases are already patched. The actual vulnerability is in file storage servers. Prioritizing based on vivid news rather than your own risk data is a classic availability bias.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Prioritize database server hardening (like the competitor breach)", biasValue: 1, isBest: false },
            { text: "Prioritize patching file storage servers", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // SUNK COST FALLACY (Ch 32)
    // -------------------------------------------------------------
    {
        id: "sunkcost-1",
        biasType: "SUNK_COST",
        title: "Software R&D Project Continuation",
        scenarioText: "Your firm has spent $800,000 developing a custom rendering engine. A competitor just released a free open-source rendering engine with superior benchmarks across every performance category. Finishing your engine requires $200,000 more, and even if completed, independent reviewers estimate it would perform 20% slower than the open-source alternative.",
        bestAnswer: "Cancel project and adopt open-source engine",
        reasoning: "The $800,000 already spent is an unrecoverable sunk cost. Even if completed, your engine would be inferior to the free alternative. Spending $200,000 more to deliver a slower product makes no business sense — the decision should be based solely on future outcomes, not past expenditures.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Invest $200,000 more to finish the project", biasValue: 1, isBest: false },
            { text: "Cancel project and adopt open-source engine", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sunkcost-2",
        biasType: "SUNK_COST",
        title: "Underperforming Investment Allocation",
        scenarioText: "You purchased stock at $100 per share. It has dropped to $62 due to deteriorating fundamentals, with analyst consensus giving it a 35% chance of recovering to $100 within two years. An alternative stock in a growing sector is priced at $62 with a 55% chance of reaching $100 in the same period.",
        bestAnswer: "Sell and reallocate capital to the alternative stock",
        reasoning: "Both stocks cost $62 right now. The alternative has a 55% chance of reaching $100 versus 35% for the current holding. Holding the original stock just to recover your purchase price is the Sunk Cost Fallacy — your original buy price is irrelevant to where the best future returns are.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Hold current stock until it recovers to $100", biasValue: 1, isBest: false },
            { text: "Sell and reallocate capital to the alternative stock", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // DECOY EFFECT (Asymmetric Dominance)
    // -------------------------------------------------------------
    {
        id: "decoy-1",
        biasType: "DECOY",
        title: "Team Cloud Storage Subscription",
        scenarioText: "Your small team needs 15 GB of cloud storage per month for document backups. The provider offers: Plan A (15 GB for $15/mo), Plan B (40 GB for $45/mo), and Plan C (50 GB for $48/mo). Which plan do you purchase?",
        bestAnswer: "Select Plan A: 15 GB ($15/mo)",
        reasoning: "Plan A ($15/mo) perfectly covers your team's 15 GB requirement at minimal expenditure. Plan B ($45) is an asymmetric decoy designed to make Plan C ($48) feel like an irresistible bargain, tricking teams into overpaying $33/month for 35 GB of excess capacity they will never use.",
        biasName: "Decoy Effect / Asymmetric Dominance",
        bookRef: "Behavioral Economics (Huber et al. 1982)",
        options: [
            { text: "Select Plan A: 15 GB ($15/mo)", biasValue: 0, isBest: true },
            { text: "Select Plan B: 40 GB ($45/mo)", biasValue: 0.5, isBest: false },
            { text: "Select Plan C: 50 GB ($48/mo)", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "decoy-2",
        biasType: "DECOY",
        title: "Office Workstation Procurement",
        scenarioText: "You are purchasing a desktop workstation for an office worker whose standard tasks require 16 processing cores. A hardware vendor offers: Model X (16-Core for $1,200), Model Y (32-Core without GPU for $2,100), and Model Z (32-Core with GPU for $2,150).",
        bestAnswer: "Select Model X: 16-Core ($1,200)",
        reasoning: "Model X ($1,200) delivers 100% of the worker's operational requirements. Model Y is a classic decoy: priced only $50 below Model Z to nudge buyers into spending $950 extra for computing power the employee will never tap.",
        biasName: "Decoy Effect",
        bookRef: "Behavioral Economics (Huber et al. 1982)",
        options: [
            { text: "Select Model X: 16-Core ($1,200)", biasValue: 0, isBest: true },
            { text: "Select Model Y: 32-Core without GPU ($2,100)", biasValue: 0.5, isBest: false },
            { text: "Select Model Z: 32-Core with GPU ($2,150)", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // SALIENCE & RARITY BIAS (Video Game Loot Rarity Framing)
    // -------------------------------------------------------------
    {
        id: "rarity-1",
        biasType: "SALIENCE_RARITY",
        title: "Bounty Reward Contract",
        scenarioText: "An adventure guild offers three contract bounty options. Which contract has the highest average payout?",
        bestAnswer: "Option A (Common): 90% chance of 80 gold (Average = 72 gold)",
        reasoning: "Option A yields an expected payoff of 72 gold (0.90 × 80). Option B yields 60 gold (0.50 × 120). Option C yields only 30 gold (0.10 × 300). Players who choose Option C are blinded by the 'Legendary' label and prestige cues over objective utility.",
        biasName: "Salience & Rarity Bias",
        bookRef: "Behavioral Economics (Salience & Heuristic Valuation)",
        options: [
            { text: "Option A [Common]: 90% chance of 80 gold", biasValue: 0, isBest: true, rarity: "common" },
            { text: "Option B [Rare]: 50% chance of 120 gold", biasValue: 0.5, isBest: false, rarity: "rare" },
            { text: "Option C [Legendary]: 10% chance of 300 gold", biasValue: 1, isBest: false, rarity: "legendary" }
        ]
    },
    {
        id: "rarity-2",
        biasType: "SALIENCE_RARITY",
        title: "Server Node Yield Package",
        scenarioText: "An algorithmic trading platform allows configuring a batch node cluster with different optimization algorithms. Which algorithm delivers the highest average compute throughput?",
        bestAnswer: "Standard Core [Common]: 85% chance of 100 TFLOPS",
        reasoning: "Standard Core [Common] gives an expected throughput of 85 TFLOPS (0.85 × 100). Overclocked [Rare] gives 70 TFLOPS (0.50 × 140). Mythic Quantum [Legendary] yields just 36 TFLOPS (0.15 × 240). Selecting the shiny 'Mythic' option sacrifices over half your compute performance for prestige framing.",
        biasName: "Salience & Rarity Bias",
        bookRef: "Behavioral Economics (Salience & Heuristic Valuation)",
        options: [
            { text: "Standard Core [Common]: 85% chance of 100 TFLOPS (15% 0)", biasValue: 0, isBest: true, rarity: "common" },
            { text: "Overclocked [Rare]: 50% chance of 140 TFLOPS (50% 0)", biasValue: 0.5, isBest: false, rarity: "rare" },
            { text: "Mythic Quantum [Legendary]: 15% chance of 240 TFLOPS (85% 0)", biasValue: 1, isBest: false, rarity: "legendary" }
        ]
    },

    // -------------------------------------------------------------
    // PLANNING FALLACY (Ch 23)
    // -------------------------------------------------------------
    {
        id: "planning-1",
        biasType: "PLANNING",
        title: "Project Schedule Commitment",
        scenarioText: "Developers estimate a core feature will take 4 weeks 'if everything goes smoothly'. Historical project data for similar builds shows an estimated 85% probability that real-world completion takes 9 weeks.",
        bestAnswer: "Commit to 9-week deadline",
        reasoning: "Relying on optimistic best-case forecasts (4 weeks) is the Planning Fallacy. Reference class forecasting (9 weeks based on historical data) yields 85% delivery reliability.",
        biasName: "Planning Fallacy & Reference Class Forecasting",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "Commit to 4-week deadline", biasValue: 1, isBest: false },
            { text: "Commit to 9-week deadline", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "planning-2",
        biasType: "PLANNING",
        title: "Renovation Budget Allocation",
        scenarioText: "Engineers estimate renovation costs at $500,000. Municipal records show an estimated 85% probability that comparable renovations experience a 40% cost overrun ($700,000 final cost).",
        bestAnswer: "Budget $700,000 with buffer",
        reasoning: "Ignoring historical overrun probabilities leads to mid-project budget failure. Budgeting $700,000 aligns with empirical reference class forecasting.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "Budget exactly $500,000 without buffer", biasValue: 1, isBest: false },
            { text: "Budget $700,000 with buffer", biasValue: 0, isBest: true }
        ]
    }
];

export class ScenarioBank {
    static getAllScenarios() {
        return MASTER_SCENARIOS;
    }

    static getRandomizedSessionQueue(numRounds = 24) {
        // Shuffle all unique scenarios first
        const shuffled = [...MASTER_SCENARIOS].sort(() => Math.random() - 0.5);

        if (shuffled.length >= numRounds) {
            // Enough unique scenarios — use each at most once
            return shuffled.slice(0, numRounds);
        }

        // Not enough unique scenarios — use all once, then fill remaining with
        // reshuffled copies, ensuring no immediate back-to-back repeats
        let pool = [...shuffled];
        while (pool.length < numRounds) {
            const extras = [...MASTER_SCENARIOS].sort(() => Math.random() - 0.5);
            for (const s of extras) {
                if (pool.length >= numRounds) break;
                // Avoid placing the same scenario back-to-back
                if (pool.length > 0 && pool[pool.length - 1].id === s.id) continue;
                pool.push(s);
            }
        }
        return pool.slice(0, numRounds);
    }
}
