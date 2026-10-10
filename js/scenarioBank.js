/**
 * Grade My Brain - Stealth Scenario Bank
 * Grounded in "Thinking, Fast and Slow" (excluding Ch 3 & 4), plus behavioral
 * economics and deceptive-advertising research.
 * Each scenario provides clear operational requirements, best answers, reasoning, and book citations.
 */

import { REAL_WORLD_EXAMPLES } from './realWorldExamples.js';

export const BIAS_CATEGORIES = {
    // --- From Thinking, Fast and Slow ---
    HALO: {
        name: "Halo Effect",
        shortName: "Halo",
        description: "Letting the first or most salient trait color the judgment of everything else about a person or product.",
        bookReference: "Thinking, Fast and Slow - Chapter 7",
        tip: "Judge each trait separately before forming an overall impression. Ask: if I had heard these facts in the opposite order, would my rating change?"
    },
    WYSIATI: {
        name: "What You See Is All There Is",
        shortName: "WYSIATI",
        description: "Drawing confident conclusions from the evidence in front of you while ignoring the evidence you were not shown.",
        bookReference: "Thinking, Fast and Slow - Chapter 7",
        tip: "Before concluding, ask what evidence you are not being shown: who failed, who was left out, and who chose what to show you."
    },
    SMALL_NUMBERS: {
        name: "Law of Small Numbers",
        shortName: "Small N",
        description: "Treating results from small samples as if they were as reliable as results from large ones.",
        bookReference: "Thinking, Fast and Slow - Chapter 10",
        tip: "Check the sample size before the result. Extreme results (best and worst) come disproportionately from small groups."
    },
    ANCHORING: {
        name: "Anchoring Effect",
        shortName: "Anchoring",
        description: "Disproportionate reliance on an initial arbitrary number when making estimates or bids.",
        bookReference: "Thinking, Fast and Slow - Chapter 11",
        tip: "Notice the first number you saw and ask whether it carries real information. Form your own estimate from independent facts before looking at the offered number."
    },
    AVAILABILITY: {
        name: "Availability Heuristic",
        shortName: "Availability",
        description: "Overestimating the likelihood of events that are vivid or recent in memory.",
        bookReference: "Thinking, Fast and Slow - Chapters 12 & 13",
        tip: "When something feels common, ask whether it is actually frequent or just vivid, recent, or heavily covered. Look for base statistics before judging risk."
    },
    REPRESENTATIVENESS: {
        name: "Representativeness Fallacy",
        shortName: "Conjunction",
        description: "Judging probability by similarity to a stereotype while ignoring statistical set logic (Conjunction Fallacy).",
        bookReference: "Thinking, Fast and Slow - Chapter 15",
        tip: "Adding details makes a story more plausible but never more probable. Every extra condition can only lower the probability."
    },
    LESS_IS_MORE: {
        name: "Less Is More (Separate Evaluation)",
        shortName: "Less-is-more",
        description: "Valuing a smaller, flawless set above a larger set that contains it, when each is judged on its own.",
        bookReference: "Thinking, Fast and Slow - Chapters 15 & 33",
        tip: "Compare totals, not averages or impressions. Ask what each option contains in full, and whether one includes everything the other has."
    },
    BASE_RATE: {
        name: "Base Rate Neglect",
        shortName: "Base rate",
        description: "Ignoring general statistical baseline frequencies in favor of specific anecdotes.",
        bookReference: "Thinking, Fast and Slow - Chapter 16",
        tip: "Start with how common the thing is in the first place, then adjust for the new evidence. Picture 1,000 people and count the true and false positives."
    },
    REGRESSION: {
        name: "Regression to the Mean",
        shortName: "Regression",
        description: "Inventing causes for changes that are simply extreme results drifting back toward average.",
        bookReference: "Thinking, Fast and Slow - Chapters 17 & 18",
        tip: "Expect extreme results to be followed by less extreme ones. Before crediting a cause for a change, ask whether luck alone would have produced it."
    },
    OUTCOME_BIAS: {
        name: "Outcome Bias",
        shortName: "Outcome",
        description: "Judging the quality of a decision by how it turned out rather than by what was knowable when it was made.",
        bookReference: "Thinking, Fast and Slow - Chapter 19",
        tip: "Judge a decision by what was knowable when it was made, not by how it turned out. Ask: with the same information, would this be the right call again?"
    },
    INTUITION_VS_FORMULA: {
        name: "Intuition vs. Formulas",
        shortName: "Formulas",
        description: "Trusting a holistic gut impression over a simple, consistent scoring rule that predicts better.",
        bookReference: "Thinking, Fast and Slow - Chapter 21",
        tip: "Decide the criteria in advance, score them consistently, and trust the score. Use your gut as one more input, not as a veto."
    },
    PLANNING: {
        name: "Planning Fallacy",
        shortName: "Planning",
        description: "Unrealistic optimism regarding time, costs, and risks of future projects.",
        bookReference: "Thinking, Fast and Slow - Chapter 23",
        tip: "Take the outside view: look at how long and how much similar projects actually took, then adjust from there rather than from the best case."
    },
    LOSS_AVERSION: {
        name: "Loss Aversion",
        shortName: "Loss aversion",
        description: "Feeling the pain of losses ~2x more intensely than the pleasure of equivalent gains.",
        bookReference: "Thinking, Fast and Slow - Chapter 26 (Prospect Theory)",
        tip: "Ask whether you would accept this as one of many similar bets. For small stakes you can afford, a favorable bet is worth taking even though a loss stings."
    },
    ENDOWMENT: {
        name: "Endowment Effect",
        shortName: "Endowment",
        description: "Demanding more to give something up than you would pay to get it in the first place.",
        bookReference: "Thinking, Fast and Slow - Chapter 27",
        tip: "Ask what you would pay for this item if you did not already have it. That number, not your attachment, is what it is worth to you."
    },
    FOURFOLD: {
        name: "Certainty & Possibility Effects",
        shortName: "Fourfold",
        description: "Overpaying for certainty and for tiny chances of big wins, and gambling to avoid sure losses (the fourfold pattern).",
        bookReference: "Thinking, Fast and Slow - Chapter 29",
        tip: "Compare expected values, and be suspicious when a sure thing or a long shot feels especially attractive. Certainty and tiny chances both get extra weight."
    },
    DENOMINATOR: {
        name: "Denominator Neglect",
        shortName: "Denominator",
        description: "Reacting to the vivid count of cases (\"1,286 people\") instead of the actual rate.",
        bookReference: "Thinking, Fast and Slow - Chapter 30",
        tip: "Convert counts into rates before comparing them. \"8 out of 100\" and \"1 out of 10\" become 8% and 10%."
    },
    NARROW_FRAMING: {
        name: "Narrow Framing",
        shortName: "Narrow frame",
        description: "Evaluating each risky choice in isolation instead of as part of a portfolio of similar choices.",
        bookReference: "Thinking, Fast and Slow - Chapter 31",
        tip: "Evaluate repeated risky choices as a portfolio. Small losses on individual bets matter less than the total over many of them."
    },
    SUNK_COST: {
        name: "Sunk Cost Fallacy",
        shortName: "Sunk cost",
        description: "Throwing additional resources into a failing project to justify past unrecoverable expenses.",
        bookReference: "Thinking, Fast and Slow - Chapter 32",
        tip: "Ignore what is already spent; it is gone whatever you do. Compare only the future costs and benefits of each option from here."
    },
    FRAMING: {
        name: "Framing Effect",
        shortName: "Framing",
        description: "Shifting preferences based on positive vs negative wording of mathematically identical outcomes.",
        bookReference: "Thinking, Fast and Slow - Chapter 34",
        tip: "Restate the information the other way (survival as mortality, gains as losses) and check whether your choice still holds."
    },
    DEFAULTS: {
        name: "Default Effect",
        shortName: "Defaults",
        description: "Letting the pre-selected option make the decision for you.",
        bookReference: "Thinking, Fast and Slow - Chapter 34",
        tip: "Treat the pre-selected option as a suggestion from someone with their own interests. Ask what you would choose if nothing were selected."
    },
    PEAK_END: {
        name: "Peak-End Rule",
        shortName: "Peak-end",
        description: "Judging an experience by its worst moment and its ending, while ignoring how long it lasted.",
        bookReference: "Thinking, Fast and Slow - Chapter 35",
        tip: "Judge experiences by their total, not just the worst moment and the ending. More of something unpleasant is never better."
    },

    STRAIGHTFORWARD: {
        name: "Second-Guessing the Obvious",
        shortName: "Overthinking",
        description: "Rejecting a straightforward answer because you expect a trick, even when the facts plainly support it.",
        bookReference: "Thinking, Fast and Slow - Chapter 22 (when intuition can be trusted)",
        tip: "Not every question is a trap. Check the facts once; if the obvious answer still holds up, trust it. Kahneman's point is that intuition is reliable when the situation is regular and the evidence is clear."
    },

    // --- Behavioral economics (not in the book) ---
    COMPROMISE: {
        name: "Compromise Effect",
        shortName: "Compromise",
        description: "Tendency to select intermediate options when presented with extreme alternatives.",
        bookReference: "Behavioral Economics (Simonson 1989)",
        tip: "Ignore where an option sits in the lineup. Decide what you actually need first, then pick the cheapest option that meets it."
    },
    DECOY: {
        name: "Decoy Effect",
        shortName: "Decoy",
        description: "Preference shifts caused by the presence of an asymmetric, inferior third option.",
        bookReference: "Behavioral Economics (Huber et al. 1982)",
        tip: "Remove the option nobody would choose and see whether your preference changes. If it does, the extra option was steering you."
    },
    SALIENCE_RARITY: {
        name: "Salience & Rarity Bias",
        shortName: "Rarity",
        description: "Choosing cosmetically rare or prestigious items over options with strictly higher expected utility.",
        bookReference: "Behavioral Economics (Salience & Heuristic Valuation)",
        tip: "Ignore labels like \"Legendary\" or \"Premium\" and compare the numbers: probability times payoff."
    },

    // --- Deceptive advertising & dark patterns ---
    DRIP_PRICING: {
        name: "Drip Pricing",
        shortName: "Drip pricing",
        description: "Sticking with a low advertised price after mandatory fees are revealed late in checkout.",
        bookReference: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        tip: "Compare total prices including every mandatory fee. Time already spent on checkout is not a reason to pay more."
    },
    RELATIVE_RISK: {
        name: "Relative vs. Absolute Risk",
        shortName: "Relative risk",
        description: "Being impressed by a big relative change (\"cuts risk in half\") in a risk that was tiny to begin with.",
        bookReference: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        tip: "Ask for the absolute numbers: out of how many people, and how many fewer cases? \"Half\" of a tiny risk is still tiny."
    },
    FAKE_URGENCY: {
        name: "Manufactured Urgency",
        shortName: "Urgency",
        description: "Rushing a decision because of countdown timers and \"only 2 left\" claims that are often fabricated.",
        bookReference: "Dark patterns research (Mathur et al. 2019)",
        tip: "Assume timers and \"only 2 left\" banners may be fake. A real deal will usually survive the few minutes it takes to compare prices."
    },
    PRICE_FRAMING: {
        name: "Price Framing",
        shortName: "Price frame",
        description: "Judging the same price differently depending on how it is broken down or presented.",
        bookReference: "Marketing research (Gourville 1998, \"pennies-a-day\")",
        tip: "Convert every offer to the same terms (total price, or price per item) before comparing."
    },
    UNIT_PRICE: {
        name: "Size & Unit Price Illusions",
        shortName: "Unit price",
        description: "Trusting \"value size\" labels and package claims instead of comparing price per unit.",
        bookReference: "Consumer protection research (unit pricing & shrinkflation)",
        tip: "Compare price per ounce or per unit, not package size or labels. The shelf tag usually shows it."
    },
    ZERO_PRICE: {
        name: "Zero-Price Effect",
        shortName: "Free!",
        description: "Overreacting to the word \"free\", even when the paid option is the better deal.",
        bookReference: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        tip: "Treat \"free\" as a price of zero and compare it like any other price. Ask what the paid option gives you for the difference."
    },
    ROACH_MOTEL: {
        name: "Hard-to-Cancel Subscriptions",
        shortName: "Cancel maze",
        description: "Signing up takes one click, but canceling takes a maze of screens, offers and warnings designed to make you give up.",
        bookReference: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        tip: "Before you sign up, find out how to cancel. Once you've decided to leave, treat every \"Are you sure?\" screen and retention offer as an obstacle, not new information."
    },
    FINE_PRINT: {
        name: "Hidden Fine Print",
        shortName: "Fine print",
        description: "Judging a deal by the big headline number while the conditions that change it sit in the small print.",
        bookReference: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        tip: "Read every asterisk. Before comparing deals, recompute each one with all the conditions in its fine print: how long the price lasts, what's due upfront, and what happens if you slip up."
    },
    MISLEADING_CHARTS: {
        name: "Misleading Charts",
        shortName: "Charts",
        description: "Reading the size of a difference from how a chart looks rather than from the numbers on its axis.",
        bookReference: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        tip: "Read the axis labels before the bars. Check whether the axis starts at zero and compute the real difference from the numbers."
    }
};

export const STANDALONE_SCENARIOS = [
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
        scenarioText: "Your company is being sued for breach of contract. Opposing counsel opens negotiations with an aggressive $5 Million demand. Your legal team estimates a 95% probability that you win at trial and pay nothing. If you lose, the likely verdict is $900,000 in damages. Going to trial would cost $50,000 in legal fees. Opposing counsel now offers to settle out of court for $200,000.",
        bestAnswer: "Reject Settlement (Proceed to Trial)",
        reasoning: "The $5M opening demand is an anchor that makes $200,000 feel like a bargain. Going to trial has an expected cost of about $95,000 (a 5% chance of a $900,000 verdict is $45,000, plus $50,000 in legal fees), well below the $200,000 settlement.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Accept Settlement (Pay $200,000)", biasValue: 1, isBest: false },
            { text: "Reject Settlement (Proceed to Trial)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "anchoring-3",
        biasType: "ANCHORING",
        title: "Commercial Real Estate Purchase",
        scenarioText: "A commercial office building has been listed for an asking price of $4.5 Million. An independent professional appraisal values the building at $2.8 Million. The seller offers a discounted price of $3.1 Million.",
        bestAnswer: "Reject Offer (Bid Near $2.8M Appraisal Value)",
        reasoning: "The $4.5M asking price anchors buyer perception of value. The independent appraisal values the property at $2.8M, so the discounted $3.1M price is still $300,000 above fair market value.",
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
        scenarioText: "Your firm is setting up a cold storage archive accessed once a month. Internal analysis confirms that 95% monthly availability is fully sufficient for this use case. Three plans are available: Option A ($10/mo) guarantees no more than 30 hours of downtime per month. Option B ($55/mo) guarantees no more than 7 hours of downtime per month. Option C ($350/mo) guarantees no more than 5 minutes of downtime per month.",
        bestAnswer: "Option A: Basic Tier ($10/mo)",
        reasoning: "A 30-day month has 720 hours, so 95% availability allows up to 36 hours of downtime. Option A's 30-hour limit (about 95.8% availability) already meets the requirement. Choosing Option B ($55/mo) demonstrates the Compromise Effect — overpaying for a middle option when the low tier is objectively sufficient for this workload.",
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
    // FOURFOLD PATTERN (Ch 29)
    // -------------------------------------------------------------
    {
        id: "fourfold-epidemic",
        biasType: "FOURFOLD",
        title: "Epidemic Treatment Intervention",
        scenarioText: "A disease outbreak threatens 600 patients. Program A guarantees saving exactly 200 lives. Program B has a 40% probability of saving all 600 lives, and a 60% probability of saving none.",
        bestAnswer: "Choose Program B (40% chance of saving all 600)",
        reasoning: "Program B saves 240 lives on average (0.40 × 600), 40 more than Program A's guaranteed 200. When outcomes are framed as gains, people tend to grab the sure thing even when the gamble is worth more. Kahneman calls this risk aversion in the domain of gains.",
        biasName: "Certainty Effect (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        options: [
            { text: "Choose Program A (Guaranteed 200 lives saved)", biasValue: 1, isBest: false },
            { text: "Choose Program B (40% chance of saving all 600)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "fourfold-restructuring",
        biasType: "FOURFOLD",
        title: "Corporate Restructuring Risk",
        scenarioText: "A financial crisis threatens $600,000 in corporate assets. Plan X results in a certain loss of $350,000. Plan Y offers a 30% probability of losing nothing and a 70% probability of losing all $600,000.",
        bestAnswer: "Choose Plan X (Certain loss of $350,000)",
        reasoning: "Plan X loses $350,000 with certainty. Plan Y has an expected loss of $420,000 (0.70 × $600K). Choosing Plan Y demonstrates risk-seeking in the domain of losses — gambling on a worse expected outcome just to avoid accepting a certain loss.",
        biasName: "Risk Seeking in Losses (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        options: [
            { text: "Choose Plan X (Certain loss of $350,000)", biasValue: 0, isBest: true },
            { text: "Choose Plan Y (30% chance of losing nothing)", biasValue: 1, isBest: false }
        ]
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
        scenarioText: "In a city where 85% of cabs are Green and 15% are Blue, a witness identifies a hit-and-run cab as Blue. Tests under the same night lighting show the witness names a cab's color correctly 80% of the time, whether the cab is Blue or Green. What is the estimated probability that the cab was Blue?",
        bestAnswer: "Estimate 41% Probability",
        reasoning: "The witness's mistakes run both ways: 20% of Blue cabs get called Green, and 20% of Green cabs get called Blue. Picture 100 cabs: 85 Green and 15 Blue. Of the 15 Blue cabs, the witness correctly calls 12 Blue. But of the 85 Green cabs, the witness wrongly calls 17 Blue. So 29 cabs get called Blue, and only 12 of them really are: 12 out of 29 is about 41%. Because Green cabs are so common, the witness's mistakes about Green cabs outnumber their correct calls about Blue ones. Answering 80% uses the witness's accuracy and ignores how many cabs of each color there are.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "Estimate 80% Probability", biasValue: 1, isBest: false },
            { text: "Estimate 60% Probability", biasValue: 0.5, isBest: false },
            { text: "Estimate 41% Probability", biasValue: 0, isBest: true },
            { text: "Estimate 12% Probability", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "baserate-2",
        biasType: "BASE_RATE",
        title: "Medical Diagnostic Test",
        scenarioText: "A rare medical condition affects 0.1% of the population (1 in 1,000). A screening test detects 95% of people who have the condition, and gives a false positive for 5% of people who do not. A patient tests positive. What is the estimated probability that the patient actually has the disease?",
        bestAnswer: "Estimate 2% Probability of Illness",
        reasoning: "The test can be wrong in both directions: it misses 5% of people who have the condition, and it wrongly flags 5% of people who don't. Picture 1,000 people. One has the condition, and the test almost certainly catches them. Of the 999 who don't, about 50 (5%) test positive anyway. So about 51 people test positive, and only 1 of them is sick: about 2%. Because the condition is so rare, the false alarms among healthy people swamp the true positives. Answering 95% uses the test's accuracy and ignores how rare the condition is.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "Estimate 95% Probability of Illness", biasValue: 1, isBest: false },
            { text: "Estimate 50% Probability of Illness", biasValue: 0.5, isBest: false },
            { text: "Estimate 20% Probability of Illness", biasValue: 0.5, isBest: false },
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
        scenarioText: "You purchased stock at $100 per share. It has dropped to $62 due to deteriorating fundamentals, with analyst consensus giving it a 40% chance of recovering to $100 within two years. An alternative stock with a similar risk profile is also priced at $62, with a 48% chance of reaching $100 in the same period.",
        bestAnswer: "Sell and buy the alternative stock",
        reasoning: "Both stocks cost $62 right now and carry similar risk. The alternative has a 48% chance of reaching $100 versus 40% for the current holding. Holding the original stock just to recover your purchase price is the Sunk Cost Fallacy — your original buy price is irrelevant to where the best future returns are.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Keep your current shares", biasValue: 1, isBest: false },
            { text: "Sell and buy the alternative stock", biasValue: 0, isBest: true }
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
        scenarioText: "A cloud provider lets you configure a batch compute cluster with one of three optimization profiles. Each run either reaches its rated throughput or fails and produces nothing. Which profile delivers the highest average throughput?",
        bestAnswer: "Standard Core [Common]: 85% chance of 100 TFLOPS",
        reasoning: "Standard Core [Common] gives an expected throughput of 85 TFLOPS (0.85 × 100). Overclocked [Rare] gives 70 TFLOPS (0.50 × 140). Mythic Quantum [Legendary] yields just 36 TFLOPS (0.15 × 240). Selecting the shiny 'Mythic' option sacrifices over half your compute performance for prestige framing.",
        biasName: "Salience & Rarity Bias",
        bookRef: "Behavioral Economics (Salience & Heuristic Valuation)",
        options: [
            { text: "Standard Core [Common]: 85% chance of 100 TFLOPS", biasValue: 0, isBest: true, rarity: "common" },
            { text: "Overclocked [Rare]: 50% chance of 140 TFLOPS", biasValue: 0.5, isBest: false, rarity: "rare" },
            { text: "Mythic Quantum [Legendary]: 15% chance of 240 TFLOPS", biasValue: 1, isBest: false, rarity: "legendary" }
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
    },

    // =============================================================
    // NEW CANDIDATE QUESTIONS (added for review; whittle down later)
    // =============================================================

    // -------------------------------------------------------------
    // AVAILABILITY HEURISTIC (Ch 12 & 13) — no statistics given
    // -------------------------------------------------------------
    {
        id: "avail-homicide-suicide",
        biasType: "AVAILABILITY",
        title: "Public Safety Funding Priorities",
        scenarioText: "A city council is deciding how to split a violence-prevention budget. In the United States as a whole, which causes more deaths each year: homicide or suicide?",
        bestAnswer: "Suicide, by roughly 2 to 1",
        reasoning: "In recent CDC data the U.S. records roughly 49,000 suicides and 24,000 homicides a year. Homicides dominate the news, so they come to mind more easily and feel more common. Judging frequency by how easily examples come to mind is the Availability Heuristic.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Homicide, by roughly 2 to 1", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 0.5, isBest: false },
            { text: "Suicide, by roughly 2 to 1", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "avail-heat-tornado",
        biasType: "AVAILABILITY",
        title: "Severe Weather Preparedness",
        scenarioText: "A county emergency office has funding for one public awareness campaign. Across the United States, which kills more people in a typical year: tornadoes or extreme heat?",
        bestAnswer: "Extreme heat",
        reasoning: "Tornadoes kill about 70 Americans in a typical year. Extreme heat kills far more: well over a hundred a year even by the National Weather Service's narrow count, and over a thousand a year in CDC death-certificate data. Tornadoes are sudden and filmed; heat deaths are quiet and spread out, so they rarely come to mind.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Tornadoes", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 0.5, isBest: false },
            { text: "Extreme heat", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // LAW OF SMALL NUMBERS (Ch 10)
    // -------------------------------------------------------------
    {
        id: "smalln-kidney-cancer",
        biasType: "SMALL_NUMBERS",
        title: "County Health Statistics",
        scenarioText: "A study of kidney cancer rates across all 3,141 U.S. counties finds that the counties with the lowest rates are mostly small farming counties with few residents. What is the most likely explanation?",
        bestAnswer: "Small populations produce extreme rates by chance",
        reasoning: "This is Kahneman's own example. The counties with the highest kidney cancer rates are also mostly rural and sparsely populated. Small counties have few residents, so a handful of cases swings their rate a long way up or down. Both extremes are produced by small samples, not by lifestyle.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Rural lifestyles: clean air, fresh food, less stress", biasValue: 1, isBest: false },
            { text: "Less exposure to industrial pollution", biasValue: 1, isBest: false },
            { text: "Small populations produce extreme rates by chance", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "smalln-reviews",
        biasType: "SMALL_NUMBERS",
        title: "Online Product Reviews",
        scenarioText: "You are choosing between two similar wireless headsets at the same price. Headset A has a 4.9-star average from 12 reviews. Headset B has a 4.5-star average from 3,400 reviews. Which is more likely to satisfy you?",
        bestAnswer: "Headset B (4.5 stars, 3,400 reviews)",
        reasoning: "Twelve reviews is a tiny sample. A few enthusiastic early buyers (or the seller's friends) can produce a near-perfect average by chance. With 3,400 reviews, Headset B's 4.5 is a reliable estimate. Headset A's true rating is likely to fall a long way once more people review it.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Headset A (4.9 stars, 12 reviews)", biasValue: 1, isBest: false },
            { text: "Headset B (4.5 stars, 3,400 reviews)", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // REGRESSION TO THE MEAN (Ch 17 & 18)
    // -------------------------------------------------------------
    {
        id: "regression-sales",
        biasType: "REGRESSION",
        title: "Sales Team Incentives",
        scenarioText: "Last quarter, the five sales reps with the best results received bonuses, and the five with the worst results received warnings. This quarter, the bonus group's numbers fell and the warned group's numbers improved. The sales director concludes that warnings motivate people better than bonuses. What best explains the pattern?",
        bestAnswer: "Extreme results tend to move back toward average",
        reasoning: "Any quarter's results mix skill and luck. The best performers were partly lucky, and the worst partly unlucky, so both groups drift back toward average the next quarter whatever you do to them. Kahneman describes the same mistake by flight instructors who concluded that praise hurt and yelling helped.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 17",
        options: [
            { text: "Warnings motivate; bonuses make people complacent", biasValue: 1, isBest: false },
            { text: "Extreme results tend to move back toward average", biasValue: 0, isBest: true },
            { text: "The bonus group was distracted by spending their bonuses", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "regression-test-score",
        biasType: "REGRESSION",
        title: "Certification Exam Forecast",
        scenarioText: "An employee scored in the top 1% on the first of two equally difficult certification exams. What is the best prediction for their score on the second exam?",
        bestAnswer: "Well above average, but probably below the top 1%",
        reasoning: "A top-1% score usually reflects high ability plus some good luck on the day. The luck does not carry over, so the best prediction is still well above average but closer to the middle than the first score. Kahneman recommends exactly this adjustment in Chapter 18.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 18",
        options: [
            { text: "Top 1% again", biasValue: 1, isBest: false },
            { text: "Well above average, but probably below the top 1%", biasValue: 0, isBest: true },
            { text: "About average", biasValue: 0.5, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // WYSIATI / SURVIVORSHIP (Ch 7)
    // -------------------------------------------------------------
    {
        id: "wysiati-trading-course",
        biasType: "WYSIATI",
        title: "Day-Trading Course Advertisement",
        scenarioText: "An ad for a $2,000 day-trading course features six graduates, each saying they made over $100,000 in their first year. The ad says thousands of people have taken the course. What can you conclude about a typical student's results?",
        bestAnswer: "Almost nothing; the ad only shows the winners",
        reasoning: "The ad shows six success stories out of thousands of students, and you have no information about the rest. Studies of retail day traders find that most lose money. System 1 builds a confident story from the evidence it is shown and does not ask what is missing: \"What You See Is All There Is.\"",
        biasName: "What You See Is All There Is (Survivorship)",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Most students earn substantial profits", biasValue: 1, isBest: false },
            { text: "At least a good fraction of students succeed", biasValue: 0.5, isBest: false },
            { text: "Almost nothing; the ad only shows the winners", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // OUTCOME BIAS (Ch 19)
    // -------------------------------------------------------------
    {
        id: "outcome-acquisition",
        biasType: "OUTCOME_BIAS",
        title: "Acquisition Post-Mortem",
        scenarioText: "Two years ago, your CEO approved an acquisition after thorough due diligence. Independent advisors estimated a 75% chance it would pay off. It failed after a regulatory change that no one, including the regulator, had announced or discussed at the time. How should the board judge the decision?",
        bestAnswer: "A sound decision that had a bad outcome",
        reasoning: "A good decision can turn out badly, and a reckless one can turn out well. Judging the decision by the outcome punishes decision makers for bad luck and rewards them for good luck. Kahneman calls this outcome bias and links it to hindsight bias: after the fact, the failure feels as if it should have been foreseen.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "A poor decision; the acquisition failed", biasValue: 1, isBest: false },
            { text: "A sound decision that had a bad outcome", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // INTUITION VS FORMULAS (Ch 21)
    // -------------------------------------------------------------
    {
        id: "formula-hiring",
        biasType: "INTUITION_VS_FORMULA",
        title: "Final-Round Hiring Decision",
        scenarioText: "Your company scores candidates on six job-relevant traits using a structured interview, and those scores have predicted job performance well in the past. Candidate A scores higher than Candidate B. But after an informal lunch, your gut strongly prefers Candidate B. Which should you hire?",
        bestAnswer: "Candidate A (higher structured score)",
        reasoning: "Paul Meehl's research, summarized in Chapter 21, found that simple consistent scoring rules beat expert intuition in most fields. A lunch impression is a small, noisy sample that is easily swayed by charm and similarity. Kahneman's advice is to trust the structured score.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "Candidate A (higher structured score)", biasValue: 0, isBest: true },
            { text: "Candidate B (strong gut feeling)", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // LOSS AVERSION & NARROW FRAMING (Ch 26 & 31)
    // -------------------------------------------------------------
    {
        id: "loss-coin-flip",
        biasType: "LOSS_AVERSION",
        title: "Office Coin-Flip Bet",
        scenarioText: "A colleague offers you a single bet on a fair coin flip. Heads, you win $150. Tails, you lose $100. You can easily afford to lose $100. Do you take the bet?",
        bestAnswer: "Take the bet",
        reasoning: "This is Kahneman's own example. The bet is clearly in your favor, and losing $100 would not hurt you. Most people still refuse because a loss feels about twice as strong as an equal gain. Kahneman's advice is to accept small favorable bets like this as a policy.",
        biasName: "Loss Aversion",
        bookRef: "Thinking, Fast and Slow - Chapters 26 & 31",
        options: [
            { text: "Take the bet", biasValue: 0, isBest: true },
            { text: "Decline the bet", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "narrow-division-managers",
        biasType: "NARROW_FRAMING",
        title: "Division Project Portfolio",
        scenarioText: "You are CEO of a company with 20 divisions. Each division manager has an independent project with a 50% chance of earning $2 Million and a 50% chance of losing $1 Million. Each manager, worried about a loss on their record, plans to decline their project. What policy should you set?",
        bestAnswer: "Approve all 20 projects as a portfolio",
        reasoning: "Each project alone looks risky to the manager who owns it, but together the 20 projects are very likely to make money: the company loses overall only if 6 or fewer of the 20 succeed, about a 6% chance. Kahneman tells this story about Richard Thaler and a CEO to illustrate narrow framing. The cure is to judge risks as a portfolio.",
        biasName: "Narrow Framing",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        options: [
            { text: "Approve all 20 projects as a portfolio", biasValue: 0, isBest: true },
            { text: "Approve 5 projects to limit the risk", biasValue: 0.5, isBest: false },
            { text: "Let each manager decide individually", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // FOURFOLD PATTERN: CERTAINTY & POSSIBILITY (Ch 29 & 30)
    // -------------------------------------------------------------
    {
        id: "fourfold-warranty",
        biasType: "FOURFOLD",
        title: "Laptop Extended Warranty",
        scenarioText: "You are buying a $1,200 laptop. At checkout you are offered a 3-year extended warranty for $249. Repair data for this model shows about 1 in 12 units needs a repair within 3 years, and the typical repair costs $300. You could pay for a repair out of savings if needed. Do you buy the warranty?",
        bestAnswer: "Decline the warranty",
        reasoning: "The expected repair cost is about $25 (1 in 12 × $300), so the warranty charges $249 to cover a $25 risk. People overpay to turn a small chance of loss into certainty: this is the certainty effect. Extended warranties are among the most profitable products retailers sell for exactly this reason.",
        biasName: "Certainty Effect (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        options: [
            { text: "Buy the warranty", biasValue: 1, isBest: false },
            { text: "Decline the warranty", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "fourfold-lottery",
        biasType: "FOURFOLD",
        title: "Conference Prize Choice",
        scenarioText: "At a conference, you can collect either a $50 gift card or a raffle ticket with a 1 in 1,000 chance of winning $20,000. Which do you take?",
        bestAnswer: "The $50 gift card",
        reasoning: "The raffle ticket is worth $20 on average (1/1,000 × $20,000), less than half the gift card. A tiny chance of a big prize feels much larger than it is. Kahneman calls this the possibility effect, and it is why lotteries sell so well.",
        biasName: "Possibility Effect (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapters 29 & 30",
        options: [
            { text: "The $50 gift card", biasValue: 0, isBest: true },
            { text: "The raffle ticket", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // DENOMINATOR NEGLECT (Ch 30)
    // -------------------------------------------------------------
    {
        id: "denominator-urns",
        biasType: "DENOMINATOR",
        title: "Prize Draw Selection",
        scenarioText: "You win a prize if you draw a red marble. Urn A contains 10 marbles, of which 1 is red. Urn B contains 100 marbles, of which 8 are red. Which urn do you draw from?",
        bestAnswer: "Urn A (1 red out of 10)",
        reasoning: "Urn A gives a 10% chance and Urn B only 8%. In the experiment Kahneman describes, many people chose Urn B because 8 winning marbles is a more vivid picture than 1, even though the larger number of losers makes it worse.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        options: [
            { text: "Urn A (1 red out of 10)", biasValue: 0, isBest: true },
            { text: "Urn B (8 red out of 100)", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // FRAMING: THE MPG ILLUSION (Ch 34)
    // -------------------------------------------------------------
    {
        id: "framing-mpg",
        biasType: "FRAMING",
        title: "Fleet Vehicle Replacement",
        scenarioText: "Your company can afford to replace one vehicle this year, and each vehicle is driven 10,000 miles a year. Option 1 replaces a pickup truck that gets 12 miles per gallon with one that gets 14. Option 2 replaces a sedan that gets 30 miles per gallon with one that gets 40. Which saves more fuel?",
        bestAnswer: "Replacing the truck (12 to 14 mpg)",
        reasoning: "Over 10,000 miles, the truck goes from about 833 gallons to 714, saving 119 gallons. The sedan goes from 333 gallons to 250, saving 83. Miles per gallon hides this; gallons per mile shows it. Kahneman uses this \"MPG illusion\" (Larrick & Soll) to show how the choice of frame distorts judgment.",
        biasName: "Framing Effect (MPG Illusion)",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Replacing the truck (12 to 14 mpg)", biasValue: 0, isBest: true },
            { text: "Replacing the sedan (30 to 40 mpg)", biasValue: 1, isBest: false },
            { text: "They save about the same", biasValue: 0.5, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // PEAK-END RULE (Ch 35)
    // -------------------------------------------------------------
    {
        id: "peakend-procedure",
        biasType: "PEAK_END",
        title: "Repeat Medical Procedure",
        scenarioText: "You need a routine medical procedure again next year and can choose how it is done. Version A: 20 minutes of steady, moderate discomfort, and then it's over. Version B: the same 20 minutes of steady, moderate discomfort, followed by 5 more minutes of milder discomfort before it ends. Which version involves less discomfort overall?",
        bestAnswer: "Version A",
        reasoning: "Version B contains all of Version A's discomfort plus 5 more minutes of milder discomfort, so it involves more in total. Yet in Kahneman's cold-hand study (60 seconds in painfully cold water, versus the same 60 seconds plus 30 more as the water warmed slightly), most people remembered the longer trial as less unpleasant and chose to repeat it. Colonoscopy patients showed the same pattern. Memory keeps the peak and the ending and ignores duration, so a gentler ending makes more discomfort feel like less.",
        biasName: "Peak-End Rule & Duration Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 35",
        options: [
            { text: "Version A", biasValue: 0, isBest: true },
            { text: "Version B", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // DECEPTIVE ADVERTISING & DARK PATTERNS
    // -------------------------------------------------------------
    {
        id: "ads-drip-pricing",
        biasType: "DRIP_PRICING",
        title: "Hotel Checkout Fees",
        scenarioText: "You searched for a hotel and picked Hotel A at $129 per night. After entering your details and payment information, the final screen adds a $35 per night resort fee and an $18 per night service fee. Hotel B, of similar quality and location, advertised $169 per night with all fees included. What do you do?",
        bestAnswer: "Book Hotel B instead",
        reasoning: "Hotel A actually costs $182 per night ($129 + $35 + $18), $13 more than Hotel B. Drip pricing works because the low first price becomes an anchor and the effort already spent feels like an investment. The FTC banned hidden hotel and ticket fees in 2025 for this reason.",
        biasName: "Drip Pricing",
        bookRef: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        options: [
            { text: "Finish booking Hotel A", biasValue: 1, isBest: false },
            { text: "Book Hotel B instead", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ads-relative-risk",
        biasType: "RELATIVE_RISK",
        title: "Supplement Advertisement",
        scenarioText: "An ad for a $40-a-month supplement says it \"cuts heart attack risk in half!\" The study behind it found that over five years, heart attacks fell from 2 in every 1,000 people to 1 in every 1,000. About how many people would need to take the supplement for five years to prevent one heart attack?",
        bestAnswer: "About 1,000 people",
        reasoning: "The risk drops by 1 in 1,000, so about 1,000 people must take it for five years (about $2.4 million in total) to prevent one heart attack. \"Cuts risk in half\" is a relative change; the absolute change is 0.1 percentage points. Advertisers almost always quote the relative number because it sounds bigger.",
        biasName: "Relative vs. Absolute Risk",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "About 2 people", biasValue: 1, isBest: false },
            { text: "About 50 people", biasValue: 0.5, isBest: false },
            { text: "About 200 people", biasValue: 0.5, isBest: false },
            { text: "About 1,000 people", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ads-fake-urgency",
        biasType: "FAKE_URGENCY",
        title: "Travel Booking Countdown",
        scenarioText: "You are planning a trip three weeks from now. A booking site shows a hotel you like with the banners \"Only 2 rooms left at this price!\" and \"14 people are looking at this hotel right now,\" plus a timer: \"Deal expires in 09:59.\" You haven't checked any other sites yet. What do you do?",
        bestAnswer: "Compare prices on other sites first",
        reasoning: "You have no way to check the banners, and a 2019 Princeton study of 11,000 shopping sites found many countdown timers and scarcity messages were fake or reset on reload. With three weeks to go, a few minutes of comparison costs nothing. Manufactured urgency works by getting you to decide before System 2 has a chance to check.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Book now before the deal expires", biasValue: 1, isBest: false },
            { text: "Compare prices on other sites first", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ads-value-size",
        biasType: "UNIT_PRICE",
        title: "Grocery Value Size",
        scenarioText: "Your usual cereal costs $4.49 for an 18 oz box. Next to it is a new box of the same cereal labeled \"NEW Bigger Value Size!\" at $5.29 for 20.5 oz. Which is the better price per ounce?",
        bestAnswer: "Your usual 18 oz box",
        reasoning: "The usual box costs about 24.9¢ per ounce; the \"Value Size\" costs about 25.8¢. Bigger packages are often but not always cheaper per unit, and labels like \"value\" lean on that expectation. The shelf tag's unit price is the honest comparison.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "The new Value Size", biasValue: 1, isBest: false },
            { text: "Your usual 18 oz box", biasValue: 0, isBest: true },
            { text: "They're the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "ads-bundle-discount",
        biasType: "PRICE_FRAMING",
        title: "Clothing Store Promotion",
        scenarioText: "You plan to buy three $30 shirts. The store offers two promotions, and you can use only one: \"Buy 2, get the 3rd 50% off!\" or a coupon for 20% off your purchase. Which saves you more?",
        bestAnswer: "The 20% off coupon",
        reasoning: "\"Buy 2, get the 3rd 50% off\" costs $75 ($30 + $30 + $15), about 17% off. The 20% coupon costs $72. \"50% off\" sounds bigger because it applies to one item, but it is spread over three.",
        biasName: "Price Framing",
        bookRef: "Marketing research (price promotion framing)",
        options: [
            { text: "Buy 2, get the 3rd 50% off", biasValue: 1, isBest: false },
            { text: "The 20% off coupon", biasValue: 0, isBest: true },
            { text: "They save the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "ads-truncated-axis",
        biasType: "MISLEADING_CHARTS",
        title: "Battery Life Chart",
        scenarioText: "A phone ad shows a bar chart where its battery-life bar is more than twice as tall as the competitor's. In small print, the vertical axis runs from 9.5 to 10.5 hours. The ad's phone lasts 10.2 hours and the competitor's lasts 9.8. How much longer does the ad's phone last?",
        bestAnswer: "About 4% longer",
        reasoning: "10.2 hours versus 9.8 hours is a difference of 0.4 hours, about 4%. Because the axis starts at 9.5 instead of 0, the bars show only the top slice of each value (0.7 vs 0.3), which makes a small difference look more than twice as large.",
        biasName: "Misleading Charts",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "More than twice as long", biasValue: 1, isBest: false },
            { text: "About 40% longer", biasValue: 0.5, isBest: false },
            { text: "About 4% longer", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ads-cancel-maze",
        biasType: "ROACH_MOTEL",
        title: "Streaming Cancellation Flow",
        scenarioText: "You signed up for a streaming service's free trial with one click and no longer use it. To cancel, you click through four screens: \"Are you sure? You'll lose your watch history,\" then a survey, then an offer of 50% off for three months, then a final \"Pause instead?\" button in large type with \"Continue to cancel\" in small grey text. What do you do?",
        bestAnswer: "Click \"Continue to cancel\" and finish canceling",
        reasoning: "Nothing on those screens changed the fact that you don't use the service. Each step is there to make leaving feel like a loss or to wear you down. In 2025 Amazon paid $2.5 billion to settle FTC charges that included a cancellation flow like this, which the FTC said Amazon internally called \"Iliad.\"",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Take the 50% off offer", biasValue: 1, isBest: false },
            { text: "Choose \"Pause instead\"", biasValue: 0.5, isBest: false },
            { text: "Click \"Continue to cancel\" and finish canceling", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // ADVERTISEMENTS WITH FINE PRINT (mock ads for fictional brands,
    // images generated by tools/make_ads.py)
    // -------------------------------------------------------------
    {
        id: "ad-phone-plan",
        biasType: "FINE_PRINT",
        title: "Phone Plan Ad",
        image: {
            src: "images/ads/phone-plan.svg",
            alt: "Ad for Telvio Mobile: Unlimited talk, text and data, $25 per month with an asterisk. No credit check. Fine print: Price for first 3 months with AutoPay; $65 per month thereafter. Requires 24-month service agreement. $35 activation fee. Taxes and fees extra. Data may be slowed after 30GB. Offer for new lines only."
        },
        scenarioText: "You see this ad while looking for a new phone plan. Ignoring taxes, about how much would this plan cost you for the first year?",
        bestAnswer: "About $695",
        reasoning: "The $25 price lasts only 3 months ($75). The next 9 months cost $65 each ($585), and there's a $35 activation fee: about $695 in the first year, or about $58 a month. The big number is a teaser rate; the real price is in the fine print, along with a 24-month commitment at $65.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "About $300", biasValue: 1, isBest: false },
            { text: "About $335", biasValue: 1, isBest: false },
            { text: "About $695", biasValue: 0, isBest: true },
            { text: "About $780", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "ad-streaming-trial",
        biasType: "ZERO_PRICE",
        title: "Streaming Free Trial Ad",
        image: {
            src: "images/ads/streaming-trial.svg",
            alt: "Ad for StreamNook: Thousands of shows. Zero commitment. FREE with an asterisk, for 30 days. Fine print: Then $15.99 per month, billed annually as $191.88 on day 31. Cancel at least 24 hours before your trial ends to avoid being charged. Annual plans are non-refundable, including partial years. One trial per household. Payment method required."
        },
        scenarioText: "You sign up for this free trial and forget to cancel. What happens on day 31?",
        bestAnswer: "You're charged $191.88 for a full year, with no refund",
        reasoning: "The fine print says the \"$15.99/mo\" is billed as one annual charge of $191.88, and annual plans are non-refundable. \"Free\" and \"zero commitment\" in large type sit on top of a full-year commitment that starts automatically. Free trials that roll into paid plans rely on people forgetting to cancel.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        options: [
            { text: "You're charged $15.99 for the first month", biasValue: 1, isBest: false },
            { text: "You're charged $191.88 for a full year, with no refund", biasValue: 0, isBest: true },
            { text: "Nothing until you confirm you want to keep it", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "ad-mattress-sale",
        biasType: "ANCHORING",
        title: "Mattress Sale Ad",
        image: {
            src: "images/ads/mattress-sale.svg",
            alt: "Ad for Nimbusleep Cloud Hybrid Queen mattress: WAS $1,999, NOW $599, 70% OFF. Limited-time savings event. Fine print: Savings calculated from manufacturer's suggested retail price (MSRP) of $1,999. Average selling price of this model over the past 90 days: $649. While supplies last. Free shipping in the contiguous U.S."
        },
        scenarioText: "Compared with what this mattress has actually been selling for, how big is this discount?",
        bestAnswer: "About 8%",
        reasoning: "The fine print says the mattress has sold for $649 on average over the last 90 days, so $599 is about 8% off ($50). The \"$1,999\" is a suggested price it doesn't sell at, used as an anchor to make $599 look like a steal. Regulators in the U.S. and U.K. have acted against this kind of reference pricing.",
        biasName: "Anchoring Effect (Reference Prices)",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "About 70%", biasValue: 1, isBest: false },
            { text: "About 30%", biasValue: 0.5, isBest: false },
            { text: "About 8%", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ad-supplement-claim",
        biasType: "SMALL_NUMBERS",
        title: "Energy Supplement Ad",
        image: {
            src: "images/ads/supplement-claim.svg",
            alt: "Ad for ZenoVita Focus+ supplement: Clinically proven, with an asterisk, to boost energy by 40%. Feel the difference in days. Fine print: Based on a 2-week study of 12 adults funded by ZenoVita, Inc. Individual results vary; results not typical. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
        },
        scenarioText: "What does this ad's \"clinically proven\" claim actually tell you?",
        bestAnswer: "Very little: a tiny, short, company-funded study",
        reasoning: "Twelve people for two weeks, paid for by the seller, can produce a big-looking number by chance, especially when \"energy\" is self-reported. The fine print also says the results are not typical and the FDA hasn't evaluated the claim. \"Clinically proven\" is not a regulated phrase.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Strong evidence it boosts energy by about 40%", biasValue: 1, isBest: false },
            { text: "Some evidence it probably works for most people", biasValue: 0.5, isBest: false },
            { text: "Very little: a tiny, short, company-funded study", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "ad-car-lease",
        biasType: "FINE_PRINT",
        title: "Car Lease Ad",
        image: {
            src: "images/ads/car-lease.svg",
            alt: "Ad for Arcline Motors 2027 Volt S: Lease for just $199 per month, with an asterisk. Visit your Arcline dealer today. Fine print: 36-month lease. $3,999 due at signing. 10,000 miles per year; $0.25 per mile over. Excludes taxes, title, registration, and dealer fees. Subject to credit approval. Lessee responsible for excess wear. Offer ends 11/30."
        },
        scenarioText: "Counting the amount due at signing, and assuming you stay under the mileage limit, what does this lease really cost per month on average (before taxes and fees)?",
        bestAnswer: "About $310 a month",
        reasoning: "The $3,999 due at signing spread over 36 months adds about $111 a month, so the real average is about $310 ($199 + $111), before taxes and dealer fees. Lease ads put the monthly payment in large type and the money due upfront in the fine print.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "About $199 a month", biasValue: 1, isBest: false },
            { text: "About $310 a month", biasValue: 0, isBest: true },
            { text: "About $420 a month", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "ad-zero-interest",
        biasType: "FINE_PRINT",
        title: "Zero-Interest Card Ad",
        image: {
            src: "images/ads/zero-interest.svg",
            alt: "Ad for the Larkspur Rewards Card: Big purchase? Pay no interest, with an asterisk. 0% for 12 months on purchases of $299 or more. Fine print: Deferred interest: interest is charged to your account from the purchase date if the promotional balance is not paid in full within 12 months. Standard purchase APR 29.99%. Minimum payments required. Subject to credit approval."
        },
        scenarioText: "You put a $2,400 TV on this card and pay $190 a month. After 12 months, $120 is still unpaid. What happens?",
        bestAnswer: "Interest is charged on the full $2,400, back to the purchase date",
        reasoning: "This is deferred interest, not 0% interest. Because the balance wasn't fully paid in 12 months, interest at 29.99% is charged on the whole original purchase from day one, which comes to hundreds of dollars over a $120 shortfall. A true 0% offer would charge interest only on the remaining balance from then on.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (CFPB, deferred interest promotions)",
        options: [
            { text: "Interest starts on the remaining $120 from now on", biasValue: 1, isBest: false },
            { text: "Interest is charged on the full $2,400, back to the purchase date", biasValue: 0, isBest: true },
            { text: "Nothing extra; the 0% offer covered the year", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "ad-airfare-from",
        biasType: "DRIP_PRICING",
        title: "Airfare Sale Ad",
        image: {
            src: "images/ads/airfare-from.svg",
            alt: "Ad for Hopwing Air: New York to Miami, fares from $49, with an asterisk. Book by Sunday. Fine print: Fare is each way. Valid on select Tuesday and Wednesday departures; limited seats. Carry-on bag $45 each way. Checked bag $40 each way. Seat selection from $18. Taxes and government fees included in fare. Non-refundable."
        },
        scenarioText: "You want a round trip on the sale days with one carry-on bag, and you don't care where you sit. What's the least you'd pay?",
        bestAnswer: "$188",
        reasoning: "The $49 is each way ($98 round trip), and a carry-on costs $45 each way ($90), for $188 in total, almost four times the headline number. \"From\" prices are the cheapest seat on the least popular days, with the extras added later.",
        biasName: "Drip Pricing",
        bookRef: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        options: [
            { text: "$49", biasValue: 1, isBest: false },
            { text: "$98", biasValue: 1, isBest: false },
            { text: "$188", biasValue: 0, isBest: true },
            { text: "$224", biasValue: 0.5, isBest: false }
        ]
    },

    // =============================================================
    // PRACTICE-ONLY QUESTIONS
    // Used for practice during reviews and to fill retests, never in the
    // regular question draw. One for each bias type that otherwise has no
    // second standalone question to practice on.
    // =============================================================
    {
        id: "practice-halo-interview",
        practiceOnly: true,
        biasType: "HALO",
        title: "Charismatic Candidate",
        scenarioText: "A candidate for an analyst role is warm, confident, and impressively well spoken in the interview. Their take-home analysis, scored blind by two reviewers, came out average. How should you rate their likely analytical work?",
        bestAnswer: "Average, based on the blind-scored work sample",
        reasoning: "Charm and confidence are real strengths, but they say little about analytical quality. The halo effect lets one impressive trait raise your rating of unrelated ones. The blind-scored work sample is the direct evidence about the skill you are hiring for.",
        biasName: "Halo Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Excellent, given how impressive they were in person", biasValue: 1, isBest: false },
            { text: "Above average; the interview should lift the score", biasValue: 0.5, isBest: false },
            { text: "Average, based on the blind-scored work sample", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-wysiati-policy",
        practiceOnly: true,
        biasType: "WYSIATI",
        title: "Neighborhood Crime Report",
        scenarioText: "A news article says a city's new policing policy worked: crime fell 10% the next year in the five neighborhoods it reported on. The article does not mention the city's other 20 neighborhoods. What can you conclude about the policy citywide?",
        bestAnswer: "Very little without data from the other neighborhoods",
        reasoning: "Five chosen neighborhoods out of 25 might be the ones where crime fell for other reasons. The story feels complete because it is coherent, but the missing 20 neighborhoods could show anything. What you see is not all there is.",
        biasName: "What You See Is All There Is",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "The policy cut crime by about 10% citywide", biasValue: 1, isBest: false },
            { text: "The policy probably helped somewhat citywide", biasValue: 0.5, isBest: false },
            { text: "Very little without data from the other neighborhoods", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-lessmore-books",
        practiceOnly: true,
        biasType: "LESS_IS_MORE",
        title: "Used Textbook Bundles",
        scenarioText: "A student sells two textbook bundles. Bundle A: 10 books, all like new. Bundle B: the same 10 like-new books, plus 5 more books with worn covers but every page intact. Which bundle is worth more?",
        bestAnswer: "Bundle B",
        reasoning: "Bundle B contains everything in Bundle A plus five more usable books, so it cannot be worth less. Judged one at a time, people often value the smaller, flawless set more, because the worn books drag down the average impression.",
        biasName: "Less Is More (Separate Evaluation)",
        bookRef: "Thinking, Fast and Slow - Chapters 15 & 33",
        options: [
            { text: "Bundle A", biasValue: 1, isBest: false },
            { text: "Bundle B", biasValue: 0, isBest: true },
            { text: "They're worth the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-outcome-drivers",
        practiceOnly: true,
        biasType: "OUTCOME_BIAS",
        title: "Two Drives Home",
        scenarioText: "Two friends each had the same two drinks at a party and drove home on the same road. One got home without incident. The other hit a deer that jumped out in front of the car. Who made the worse decision?",
        bestAnswer: "They made the same decision",
        reasoning: "Both made the same choice with the same information and the same risk. The deer was luck. Judging the second driver more harshly because of the outcome is outcome bias.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "The driver who hit the deer", biasValue: 1, isBest: false },
            { text: "The driver who got home safely", biasValue: 1, isBest: false },
            { text: "They made the same decision", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-formula-loans",
        practiceOnly: true,
        biasType: "INTUITION_VS_FORMULA",
        title: "Loan Officer's Hunch",
        scenarioText: "A bank's lending model, checked against years of repayment records, rates an applicant as high risk. The loan officer met the applicant and found them sincere and trustworthy. Which is the better guide to whether the loan will be repaid?",
        bestAnswer: "The lending model",
        reasoning: "A validated model applies the same evidence the same way every time. A face-to-face impression is a small, noisy sample and is easily swayed by likability. Chapter 21 describes decades of evidence that simple formulas beat this kind of intuition.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "The lending model", biasValue: 0, isBest: true },
            { text: "The loan officer's impression", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-loss-promotion",
        practiceOnly: true,
        biasType: "LOSS_AVERSION",
        title: "Seasonal Promotion Bet",
        scenarioText: "Your store can run a seasonal promotion. There is a 50% chance it brings in $60,000 in extra profit and a 50% chance it loses $30,000 on unsold stock. The store runs several promotions like this a year and can easily absorb a $30,000 loss. Do you run it?",
        bestAnswer: "Run the promotion",
        reasoning: "The upside is twice the downside at even odds, and the store can afford the loss. Many people still hesitate because the possible loss looms larger than the equal-sized gain. Treating this as one of many similar bets makes the right answer clear.",
        biasName: "Loss Aversion",
        bookRef: "Thinking, Fast and Slow - Chapters 26 & 31",
        options: [
            { text: "Run the promotion", biasValue: 0, isBest: true },
            { text: "Skip the promotion", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-endowment-mug",
        practiceOnly: true,
        biasType: "ENDOWMENT",
        title: "Free Conference Mug",
        scenarioText: "You got a free mug at a conference. Identical mugs sell for $8 in the gift shop, and you don't especially need another mug. A colleague who forgot to pick one up offers you $10 for yours. Do you sell it?",
        bestAnswer: "Sell it for $10",
        reasoning: "You would not pay $10 for this mug, since the shop sells it for $8 and you don't need one. Refusing $10 for it means valuing it more just because it is yours. That is the endowment effect, first shown with exactly this kind of mug.",
        biasName: "Endowment Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 27",
        options: [
            { text: "Sell it for $10", biasValue: 0, isBest: true },
            { text: "Keep it", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-denominator-treatment",
        practiceOnly: true,
        biasType: "DENOMINATOR",
        title: "Treatment Success Rates",
        scenarioText: "Two treatments have the same cost and side effects. Treatment A helps 1 in every 20 patients. Treatment B helps 4 in every 100 patients. Which helps a larger share of patients?",
        bestAnswer: "Treatment A",
        reasoning: "1 in 20 is 5%; 4 in 100 is 4%. The bigger count of successes in Treatment B is more vivid, but it comes out of a bigger group. Convert both to rates before comparing.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        options: [
            { text: "Treatment A", biasValue: 0, isBest: true },
            { text: "Treatment B", biasValue: 1, isBest: false },
            { text: "They're the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-narrow-protection",
        practiceOnly: true,
        biasType: "NARROW_FRAMING",
        title: "Shipping Protection Policy",
        scenarioText: "Your small business ships about 50 packages a year. Each time, the carrier offers $30 protection against loss. Records show about 1 in 10 packages is lost, and a lost package costs you about $200 to replace. What policy should you adopt?",
        bestAnswer: "Skip the protection on every package",
        reasoning: "Each package has an expected loss of about $20 (1 in 10 × $200), less than the $30 protection. Over 50 packages, buying protection every time costs about $1,500 to avoid about $1,000 in losses. One package at a time, each $200 loss feels worth avoiding; as a policy, the protection clearly loses money.",
        biasName: "Narrow Framing",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        options: [
            { text: "Buy the protection on every package", biasValue: 1, isBest: false },
            { text: "Decide package by package", biasValue: 0.5, isBest: false },
            { text: "Skip the protection on every package", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-framing-yogurt",
        practiceOnly: true,
        biasType: "FRAMING",
        title: "Yogurt Label Comparison",
        scenarioText: "Two cups of yogurt are the same size and price. One is labeled \"90% fat-free.\" The other is labeled \"contains 10% fat.\" Which is lower in fat?",
        bestAnswer: "They have the same amount of fat",
        reasoning: "\"90% fat-free\" and \"10% fat\" describe exactly the same product. Positive wording makes the first sound healthier. Restating a claim the other way round is a quick check for framing.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "The \"90% fat-free\" yogurt", biasValue: 1, isBest: false },
            { text: "The \"10% fat\" yogurt", biasValue: 1, isBest: false },
            { text: "They have the same amount of fat", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-defaults-setup",
        practiceOnly: true,
        biasType: "DEFAULTS",
        title: "New Laptop Setup",
        scenarioText: "Setting up a new laptop, you see a large blue \"Use Recommended Settings\" button and a small grey \"Customize\" link. The recommended settings turn on ad personalization, location history, and sharing usage data with the manufacturer. You'd rather not share that data. What do you do?",
        bestAnswer: "Choose Customize and turn those settings off",
        reasoning: "The recommended settings are what the manufacturer prefers, not what you prefer. Large, bright buttons for the default and small links for the alternative are a common dark pattern. Most people accept defaults, which is why companies design them carefully.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Use Recommended Settings", biasValue: 1, isBest: false },
            { text: "Choose Customize and turn those settings off", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-peakend-cleaning",
        practiceOnly: true,
        biasType: "PEAK_END",
        title: "Dental Cleaning Options",
        scenarioText: "Cleaning A: 10 minutes of steady, mild discomfort, and then it's done. Cleaning B: the same 10 minutes of steady, mild discomfort, followed by 3 more minutes of gentle polishing that is only slightly uncomfortable. Which involves more total discomfort?",
        bestAnswer: "Cleaning B",
        reasoning: "Cleaning B includes all of Cleaning A plus three more slightly uncomfortable minutes, so it involves more in total. It will probably be remembered as less unpleasant because it ends on a gentler note, but memory's focus on the peak and the end hides the extra minutes.",
        biasName: "Peak-End Rule & Duration Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 35",
        options: [
            { text: "Cleaning A", biasValue: 1, isBest: false },
            { text: "Cleaning B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-drip-concert",
        practiceOnly: true,
        biasType: "DRIP_PRICING",
        title: "Concert Ticket Checkout",
        scenarioText: "Site A lists a concert ticket at $65. At checkout it adds an $18.50 service fee, a $6 facility fee, and a $4 order processing fee. Site B sells the same seat for $90 with all fees included. Which is cheaper?",
        bestAnswer: "Site B",
        reasoning: "Site A's real price is $93.50 ($65 + $18.50 + $6 + $4), $3.50 more than Site B. The low first number sticks in mind as the price even after the fees appear.",
        biasName: "Drip Pricing",
        bookRef: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        options: [
            { text: "Site A", biasValue: 1, isBest: false },
            { text: "Site B", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-relative-meat",
        practiceOnly: true,
        biasType: "RELATIVE_RISK",
        title: "Processed Meat Headline",
        scenarioText: "A headline says eating processed meat every day raises bowel cancer risk by 18%. Suppose a person's lifetime risk is about 6 in 100 without it. About what is their risk if they eat processed meat every day?",
        bestAnswer: "About 7 in 100",
        reasoning: "An 18% increase on 6 in 100 is about 1 more case per 100 people (6 × 1.18 ≈ 7). \"18%\" sounds like it adds 18 points, but it is a relative change to a fairly small starting risk.",
        biasName: "Relative vs. Absolute Risk",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "About 24 in 100", biasValue: 1, isBest: false },
            { text: "About 18 in 100", biasValue: 1, isBest: false },
            { text: "About 7 in 100", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-urgency-timer",
        practiceOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Resetting Countdown",
        scenarioText: "An online course page says \"Price goes up in 15:00!\" with a ticking timer. You reload the page and the timer starts again at 15:00. What does this most likely tell you?",
        bestAnswer: "The timer is fake and the price probably won't change",
        reasoning: "A real deadline does not reset when you reload. Timers that restart for each visitor exist only to create pressure. Researchers have found many like this on shopping sites.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "The deal is real; buy within 15 minutes", biasValue: 1, isBest: false },
            { text: "The timer is fake and the price probably won't change", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-price-gym",
        practiceOnly: true,
        biasType: "PRICE_FRAMING",
        title: "Gym Membership Pitch",
        scenarioText: "Gym A advertises membership for \"just $1.50 a day.\" Gym B, with the same facilities, charges $40 a month. Which is cheaper?",
        bestAnswer: "Gym B",
        reasoning: "$1.50 a day is about $45.60 a month (30.4 days on average), $5.60 more than Gym B. Daily prices feel small because they get compared with a coffee rather than with the monthly bill.",
        biasName: "Price Framing (Pennies-a-Day)",
        bookRef: "Marketing research (Gourville 1998, \"pennies-a-day\")",
        options: [
            { text: "Gym A", biasValue: 1, isBest: false },
            { text: "Gym B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-unit-detergent",
        practiceOnly: true,
        biasType: "UNIT_PRICE",
        title: "Family Size Detergent",
        scenarioText: "A \"Family Size\" 32 oz bottle of dish soap costs $6.40. Next to it, a 16 oz bottle of the same soap costs $2.99. Which is cheaper per ounce?",
        bestAnswer: "The 16 oz bottle",
        reasoning: "The 16 oz bottle costs about 18.7¢ per ounce; the Family Size costs 20¢. Two small bottles ($5.98) beat one big one ($6.40) for the same amount of soap.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "The 32 oz Family Size", biasValue: 1, isBest: false },
            { text: "The 16 oz bottle", biasValue: 0, isBest: true },
            { text: "They're the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-zero-shipping",
        practiceOnly: true,
        biasType: "ZERO_PRICE",
        title: "Free Shipping Offer",
        scenarioText: "Store A sells a shirt for $20 with free shipping. Store B sells the same shirt for $14 plus $4 shipping. Which is cheaper?",
        bestAnswer: "Store B",
        reasoning: "Store B costs $18 in total, $2 less than Store A. \"Free shipping\" feels like a gift, but the price of the shirt has simply absorbed it.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        options: [
            { text: "Store A (free shipping)", biasValue: 1, isBest: false },
            { text: "Store B", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-charts-unemployment",
        practiceOnly: true,
        biasType: "MISLEADING_CHARTS",
        title: "Unemployment Chart",
        scenarioText: "A news chart shows a line shooting from the bottom to the top of the graph. The vertical axis runs from 4.0% to 4.4%, and the unemployment rate went from 4.1% to 4.3%. How big was the change?",
        bestAnswer: "A rise of 0.2 percentage points",
        reasoning: "The rate rose from 4.1% to 4.3%, 0.2 percentage points. Because the axis covers only 0.4 points, a small change fills most of the chart's height and looks dramatic.",
        biasName: "Misleading Charts",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "Unemployment nearly tripled", biasValue: 1, isBest: false },
            { text: "Unemployment rose by about half", biasValue: 0.5, isBest: false },
            { text: "A rise of 0.2 percentage points", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-cancel-gym",
        practiceOnly: true,
        biasType: "ROACH_MOTEL",
        title: "Gym Contract Fine Print",
        scenarioText: "A gym offers a $10 first month and lets you join online in two minutes. The contract says canceling requires a certified letter or an in-person visit during weekday business hours. You expect to stop going within a few months. What's the best move?",
        bestAnswer: "Choose a gym that lets you cancel the same way you joined",
        reasoning: "The cheap first month is the bait; the hard cancellation is where the gym makes its money, because many people keep paying rather than deal with it. California now requires businesses to let customers cancel online if they signed up online, and the FTC has pursued companies over hard-to-cancel subscriptions.",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Join; you can deal with canceling later", biasValue: 1, isBest: false },
            { text: "Choose a gym that lets you cancel the same way you joined", biasValue: 0, isBest: true }
        ]
    },
    // =============================================================
    // STRAIGHTFORWARD QUESTIONS
    // The obvious answer is the right one, so players don't learn that the
    // counterintuitive answer always wins. Not part of the regular question
    // pool: a few are scattered through each session, and more are used to
    // round sessions out to full review blocks.
    // =============================================================
    {
        id: "straight-cab-even",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Even-Split Taxi Witness",
        scenarioText: "In a city where half the cabs are Blue and half are Green, a witness identifies a hit-and-run cab as Blue. Tests under the same lighting show the witness names a cab's color correctly 80% of the time, whether it is Blue or Green. What is the probability the cab was Blue?",
        bestAnswer: "80%",
        reasoning: "Here the witness's accuracy is the answer. The witness's mistakes still run both ways, but with equal numbers of each color they balance out. Picture 100 cabs: of the 50 Blue ones, 40 are called Blue; of the 50 Green ones, 10 are called Blue. 40 out of 50 is 80%. The base rate only pulls the answer away from 80% when one color is much more common, as in the 85% Green version.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 16 & 22",
        options: [
            { text: "80%", biasValue: 0, isBest: true },
            { text: "50%", biasValue: 1, isBest: false },
            { text: "41%", biasValue: 1, isBest: false },
            { text: "20%", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-clinic-test",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Specialist Clinic Screening",
        scenarioText: "At a specialist clinic, 30% of the patients referred there have a particular condition. A test detects 99% of people who have it and wrongly flags 1% of people who don't. A referred patient tests positive. About how likely is it that they have the condition?",
        bestAnswer: "About 98%",
        reasoning: "When the condition is common and the test is very accurate, a positive result really does mean the patient very likely has it. Picture 1,000 referred patients: 300 have the condition and about 297 test positive; of the 700 who don't, about 7 test positive. 297 out of 304 is about 98%. Base rates only overturn a positive test when the condition is rare compared with the false-positive rate.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 16 & 22",
        options: [
            { text: "About 98%", biasValue: 0, isBest: true },
            { text: "About 50%", biasValue: 1, isBest: false },
            { text: "About 30%", biasValue: 1, isBest: false },
            { text: "About 3%", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-listing-price",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Used Car Listing",
        scenarioText: "A used car is listed at $12,000. Three independent pricing guides value that model, mileage, and condition at $11,500 to $12,500, and your mechanic found nothing wrong with it. Is the listing price reasonable?",
        bestAnswer: "Yes; it matches the independent valuations",
        reasoning: "An anchor is a problem when it's arbitrary or inflated. This listing price is backed by three independent valuations and an inspection, so it's real information. Treating every asking price as a trick would have you lowball a fair deal.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 11 & 22",
        options: [
            { text: "Yes; it matches the independent valuations", biasValue: 0, isBest: true },
            { text: "No; the listing price is an anchor, so offer about $8,000", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-finish-course",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Paid Training Course",
        scenarioText: "You paid $2,000, nonrefundable, for a professional course. It's going well, the skills are already useful in your job, and the last four weeks cost nothing extra. Do you finish it?",
        bestAnswer: "Finish the course",
        reasoning: "The $2,000 is spent either way, so it shouldn't decide anything. But the future benefits clearly favor finishing: four more weeks of useful training at no extra cost. The sunk cost fallacy is continuing because of past spending; continuing because the future benefits are worth it is just a good decision.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 32",
        options: [
            { text: "Finish the course", biasValue: 0, isBest: true },
            { text: "Quit; continuing would be the sunk cost fallacy", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-cars-sharks",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Road Versus Ocean Risk",
        scenarioText: "Which kills more people in the United States in a typical year: car crashes or shark attacks?",
        bestAnswer: "Car crashes, by a huge margin",
        reasoning: "Car crashes kill around 40,000 Americans a year; shark attacks kill about one. Vivid news can make rare risks feel common, but that doesn't mean the common-sense answer is always wrong. Here it's right.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 13 & 22",
        options: [
            { text: "Car crashes, by a huge margin", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 1, isBest: false },
            { text: "Shark attacks", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-big-sample-reviews",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Blender Review Comparison",
        scenarioText: "Two blenders cost the same. Blender A has a 4.8-star average from 5,200 reviews. Blender B has a 3.9-star average from 4,700 reviews. Which is more likely to satisfy you?",
        bestAnswer: "Blender A",
        reasoning: "Both ratings come from thousands of reviews, so both averages are reliable, and A's is clearly higher. Small-sample worries apply when one rating rests on a handful of reviews, not here.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 10 & 22",
        options: [
            { text: "Blender A", biasValue: 0, isBest: true },
            { text: "Blender B", biasValue: 1, isBest: false },
            { text: "Can't tell from ratings", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-shop-fitout",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Twenty-First Bakery Shop",
        scenarioText: "A bakery chain has fitted out 20 identical shops with the same contractor, and every one took 6 to 7 weeks. The 21st shop is identical and uses the same contractor. How long should you plan for?",
        bestAnswer: "About 7 weeks",
        reasoning: "This is the outside view at work: 20 near-identical past projects all took 6 to 7 weeks, so that's the right plan. The planning fallacy is about ignoring track records like this, not about padding every estimate.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 23",
        options: [
            { text: "About 7 weeks", biasValue: 0, isBest: true },
            { text: "About 14 weeks, to be safe", biasValue: 1, isBest: false },
            { text: "About 4 weeks, since the team is experienced now", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-coffee-size",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Morning Coffee Order",
        scenarioText: "A café sells a 12 oz coffee for $3.00 and a 24 oz coffee for $3.50. You want a lot of coffee and will drink all of it. Which is the better value for you?",
        bestAnswer: "The 24 oz coffee",
        reasoning: "Twice the coffee for 50 cents more, and you want it all. Upselling is only a trap when you're paying for more than you need; here the bigger size is simply the better deal.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "The 24 oz coffee", biasValue: 0, isBest: true },
            { text: "The 12 oz coffee; the large is an upsell", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-big-risk-cut",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Treatment Risk Reduction",
        scenarioText: "A treatment's ad says it \"cuts the risk of complications in half.\" In the trial, complications fell from 40 in every 100 patients to 20 in every 100. Is that a large benefit?",
        bestAnswer: "Yes; 20 fewer patients in every 100",
        reasoning: "Relative-risk claims are misleading when the starting risk is tiny. Here it isn't: the risk fell by 20 percentage points, so about 1 in every 5 patients avoids a complication. That's a big absolute benefit.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "Yes; 20 fewer patients in every 100", biasValue: 0, isBest: true },
            { text: "No; \"cuts in half\" is always relative-risk spin", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-real-scarcity",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Last-Minute Flight",
        scenarioText: "You need to fly tomorrow. You've watched this route for two weeks and today's fare is the lowest you've seen. The airline's seat map shows only 2 seats left. Do you book now?",
        bestAnswer: "Book now",
        reasoning: "You've already compared prices for two weeks, the flight is tomorrow, and the seat map is the airline's own inventory, not a marketing banner. Real scarcity exists. Waiting here risks missing the flight or paying more.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "Book now", biasValue: 0, isBest: true },
            { text: "Wait and compare more; scarcity claims are a sales tactic", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-family-size",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Pasta Sauce Sizes",
        scenarioText: "A 40 oz \"family size\" jar of pasta sauce costs $6.00. A 20 oz jar of the same sauce costs $4.00. Which is cheaper per ounce?",
        bestAnswer: "The 40 oz family size",
        reasoning: "The family size costs 15¢ per ounce and the small jar 20¢. Bigger packages aren't always cheaper per unit, but this one is. Checking the unit price is the habit; it doesn't mean the big size is always a trick.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Consumer protection research (unit pricing)",
        options: [
            { text: "The 40 oz family size", biasValue: 0, isBest: true },
            { text: "The 20 oz jar", biasValue: 1, isBest: false },
            { text: "They're the same", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-ruinous-bet",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Rent-Money Coin Flip",
        scenarioText: "A friend offers you one coin flip. Heads, you win $500. Tails, you lose $5,000, which would mean missing your rent. Do you take the bet?",
        bestAnswer: "Decline the bet",
        reasoning: "This bet loses money on average ($2,250 per flip) and could ruin you. Loss aversion is a problem when it makes you refuse small, favorable bets you can afford; refusing an unfavorable, ruinous one is just sense.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 26",
        options: [
            { text: "Decline the bet", biasValue: 0, isBest: true },
            { text: "Take it; refusing would be loss aversion", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-surgeon-record",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Choosing a Surgeon",
        scenarioText: "Surgeon A has the lowest complication rate in the hospital over 10 years and more than 1,000 procedures, and is also warm and easy to talk to. Surgeon B's complication rate is above the hospital average. Which surgeon do you choose?",
        bestAnswer: "Surgeon A",
        reasoning: "The decision rests on the track record, which strongly favors Surgeon A. Being likable doesn't make A's record less real. The halo effect is when a pleasant trait stands in for evidence, not when the evidence and the pleasant trait happen to agree.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 7 & 22",
        options: [
            { text: "Surgeon A", biasValue: 0, isBest: true },
            { text: "Surgeon B; A's friendliness could be a halo effect", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-reckless-driving",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "School Zone Crash",
        scenarioText: "A driver was texting while speeding through a school zone and crashed into a parked car. Was driving that way a bad decision?",
        bestAnswer: "Yes, a bad decision",
        reasoning: "It was a bad decision because of what the driver knew at the time: texting while speeding past a school is dangerous whatever happens. Outcome bias is judging a decision by its result; here the decision was bad before the crash.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 19 & 22",
        options: [
            { text: "Yes, a bad decision", biasValue: 0, isBest: true },
            { text: "Can't say; judging it by the crash would be outcome bias", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-honest-chart",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Battery Bar Chart",
        scenarioText: "A bar chart's vertical axis starts at 0 hours. Phone A's battery bar is twice as tall as Phone B's. The labels say Phone A lasts 20 hours and Phone B lasts 10. Does Phone A last about twice as long?",
        bestAnswer: "Yes",
        reasoning: "With the axis starting at zero, bar heights are proportional to the values, and the labels confirm it: 20 hours is twice 10. Charts mislead when the axis is cut off; this one isn't.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "Yes", biasValue: 0, isBest: true },
            { text: "No; bar charts exaggerate differences", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-clear-urns",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Red Marble Draw",
        scenarioText: "You win a prize if you draw a red marble. Urn A has 10 marbles, 5 of them red. Urn B has 100 marbles, 10 of them red. Which urn do you draw from?",
        bestAnswer: "Urn A (5 red out of 10)",
        reasoning: "Urn A gives a 50% chance and Urn B 10%. Here the urn with fewer red marbles in total is also the better one by a wide margin, so there's no trap to fall into.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 30",
        options: [
            { text: "Urn A (5 red out of 10)", biasValue: 0, isBest: true },
            { text: "Urn B (10 red out of 100)", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-home-insurance",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Home Fire Insurance",
        scenarioText: "Your home is most of your wealth. Standard fire insurance costs about 0.3% of its value per year, and losing the house uninsured would wipe you out financially. Do you buy the insurance?",
        bestAnswer: "Buy the insurance",
        reasoning: "Insurance loses money on average, which is why small warranties are usually a bad deal. But protecting against a loss you couldn't recover from is exactly what insurance is for. The certainty effect is overpaying to remove small, affordable risks; this one is neither small nor affordable.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 29",
        options: [
            { text: "Buy the insurance", biasValue: 0, isBest: true },
            { text: "Skip it; insurance always loses money on average", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-license-conjunction",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Neighbor's Driving Record",
        scenarioText: "Your neighbor Dana drives to work every day. Which is more probable?",
        bestAnswer: "Dana has a driver's license",
        reasoning: "Adding a detail can only make a statement less probable, and here the intuitive answer and the logical one agree: \"has a license\" is more probable than \"has a license and owns a red car.\" Not every probability question hides a twist.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 15 & 22",
        options: [
            { text: "Dana has a driver's license", biasValue: 0, isBest: true },
            { text: "Dana has a driver's license and owns a red car", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-good-default",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Automatic Savings Enrollment",
        scenarioText: "Your employer automatically enrolled you in its retirement plan at 5% of your salary, with a 50% match. You have an emergency fund and no high-interest debt. What do you do?",
        bestAnswer: "Stay enrolled",
        reasoning: "Defaults can be designed for the company's benefit or for yours. This one is in your interest: the match is free money and your finances can support saving. Questioning defaults is wise; rejecting a good one on principle isn't.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 34",
        options: [
            { text: "Stay enrolled", biasValue: 0, isBest: true },
            { text: "Opt out; defaults are designed to manipulate you", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-chess-skill",
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Chess Champion Forecast",
        scenarioText: "A chess player has been ranked in the top 1% of players in the world for ten straight years, and this year won a major tournament. What is the best prediction for next year?",
        bestAnswer: "Still among the very best players",
        reasoning: "Regression to the mean pulls extreme results toward the player's own long-run level. Ten years in the top 1% shows that level is very high, so the best prediction is that they stay near the top, even if they don't win the tournament again.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 17 & 22",
        options: [
            { text: "Still among the very best players", biasValue: 0, isBest: true },
            { text: "Close to an average player, because of regression to the mean", biasValue: 1, isBest: false },
            { text: "Much worse than this year", biasValue: 1, isBest: false }
        ]
    }
];

Object.entries(REAL_WORLD_EXAMPLES).forEach(([type, examples]) => {
    if (BIAS_CATEGORIES[type]) BIAS_CATEGORIES[type].examples = examples;
});

// -----------------------------------------------------------------
// PAIRED TESTS
// Each pair is two standalone scenarios that a rational player should
// answer the same way (or in a predictable order). The two versions are
// spaced apart in the session and the pair is scored when the second one
// is answered. isConsistent receives the chosen option values in the order
// the versions are listed here, regardless of which was asked first.
// -----------------------------------------------------------------

const sameAnswer = (a, b) => a === b;
// The first version's answer (a numeric rank) should not be higher than the second's
const firstNotHigher = (a, b) => a <= b;
// Bonus Token: the selling price (first version) may exceed the buying
// price (second version) by at most one 5-point step
const sellNotAboveBuy = (sellPrice, buyPrice) => sellPrice <= buyPrice + 5;

// Bonus Token terms, used by the token questions and the game's payouts
export const BONUS_TOKEN = { payout: 40, chance: 0.5, maxDrawnPrice: 40 };

export const PAIRED_TESTS = {
    surgery: {
        biasType: "FRAMING",
        bestAnswer: "The same decision in both versions (approve both or decline both)",
        reasoning: "A '90% one-month survival rate' and a '10% mortality rate within the first month' are the same statistic. If you approved one and declined the other, the wording changed your decision: survival framing makes a procedure feel safer than mortality framing, even though the numbers are identical.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "framing-surgery-survival",
                label: "90% survival version",
                title: "Cardiac Surgery Consent",
                scenarioText: "A patient requires a complex heart operation. Medical statistics indicate the procedure has a 90% one-month survival rate. Would you approve the surgery?",
                options: [
                    { text: "Approve Surgical Procedure", value: "approve" },
                    { text: "Decline Surgical Procedure", value: "decline" }
                ]
            },
            {
                id: "framing-surgery-mortality",
                label: "10% mortality version",
                title: "Surgical Procedure Approval",
                scenarioText: "Your father's cardiologist recommends a complex heart operation. Medical statistics indicate the procedure has a 10% mortality rate within the first month. Would you approve the surgery?",
                options: [
                    { text: "Approve Surgical Procedure", value: "approve" },
                    { text: "Decline Surgical Procedure", value: "decline" }
                ]
            }
        ]
    },
    chips: {
        biasType: "FRAMING",
        bestAnswer: "The same decision in both versions (accept both or reject both)",
        reasoning: "'95% meet specification' and '5% failed specification' describe exactly the same batch quality. If you accepted one and rejected the other, the wording changed your decision even though the underlying facts were identical.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "framing-chips-pass",
                label: "95% pass version",
                title: "Semiconductor Batch Approval",
                scenarioText: "A microchip manufacturing batch has completed testing. Quality control reports that 95% of the components in this batch meet specification. Do you accept or reject this batch?",
                options: [
                    { text: "Accept Batch", value: "accept" },
                    { text: "Reject Batch", value: "reject" }
                ]
            },
            {
                id: "framing-chips-fail",
                label: "5% fail version",
                title: "Microchip Shipment Review",
                scenarioText: "A supplier's shipment of microchips has arrived at your plant. Your inspectors report that 5% of the components in the shipment failed specification. Do you accept or reject this shipment?",
                options: [
                    { text: "Accept Shipment", value: "accept" },
                    { text: "Reject Shipment", value: "reject" }
                ]
            }
        ]
    },
    epidemic: {
        biasType: "FRAMING",
        bestAnswer: "The same program in both versions",
        reasoning: "In both versions Program A means 200 people live and 400 die, and Program B means a 1/3 chance everyone lives and a 2/3 chance everyone dies. Only the wording differs. In Tversky and Kahneman's original study, most people chose the sure thing when it was described as lives saved and the gamble when it was described as deaths.",
        biasName: "Framing Effect (Gain vs. Loss Frame)",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "framing-epidemic-saved",
                label: "\"Lives saved\" version",
                title: "Outbreak Response Plan",
                scenarioText: "A health agency is preparing for an unusual disease outbreak expected to kill 600 people. If Program A is adopted, 200 people will be saved. If Program B is adopted, there is a 1/3 probability that 600 people will be saved and a 2/3 probability that no one will be saved. Which program do you choose?",
                options: [
                    { text: "Program A", value: "sure" },
                    { text: "Program B", value: "gamble" }
                ]
            },
            {
                id: "framing-epidemic-die",
                label: "\"Deaths\" version",
                title: "Pandemic Contingency Decision",
                scenarioText: "Officials are preparing for a disease outbreak expected to kill 600 people. If Program A is adopted, 400 people will die. If Program B is adopted, there is a 1/3 probability that nobody will die and a 2/3 probability that 600 people will die. Which program do you choose?",
                options: [
                    { text: "Program A", value: "sure" },
                    { text: "Program B", value: "gamble" }
                ]
            }
        ]
    },
    redwood: {
        biasType: "ANCHORING",
        bestAnswer: "The same estimate in both versions (and the tallest is about 380 feet)",
        reasoning: "The 1,200-foot and 180-foot figures in the questions were arbitrary, yet in the study Kahneman describes, people given the high number estimated 844 feet on average and people given the low number estimated 282. If your two estimates differed, the anchor moved you. The tallest known redwood, Hyperion, is about 380 feet.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "anchor-redwood-high",
                label: "1,200-foot version",
                title: "Tallest Tree Estimate",
                scenarioText: "Is the tallest living redwood tree taller or shorter than 1,200 feet? Pick your best estimate of its actual height.",
                options: [
                    { text: "Under 180 feet", value: 1 },
                    { text: "180 to 299 feet", value: 2 },
                    { text: "300 to 449 feet", value: 3 },
                    { text: "450 to 749 feet", value: 4 },
                    { text: "750 to 1,199 feet", value: 5 },
                    { text: "1,200 feet or more", value: 6 }
                ]
            },
            {
                id: "anchor-redwood-low",
                label: "180-foot version",
                title: "Coast Redwood Height",
                scenarioText: "A park ranger asks whether the world's tallest redwood is taller or shorter than 180 feet. What is your best estimate of its height?",
                options: [
                    { text: "Under 180 feet", value: 1 },
                    { text: "180 to 299 feet", value: 2 },
                    { text: "300 to 449 feet", value: 3 },
                    { text: "450 to 749 feet", value: 4 },
                    { text: "750 to 1,199 feet", value: 5 },
                    { text: "1,200 feet or more", value: 6 }
                ]
            }
        ]
    },
    soupLimit: {
        biasType: "ANCHORING",
        bestAnswer: "The same quantity in both versions",
        reasoning: "A purchase limit says nothing about how much soup you need, but it acts as an anchor. In the supermarket study Kahneman cites, shoppers bought about twice as many cans when the sign said \"limit of 12 per person\" as when there was no limit.",
        biasName: "Anchoring Effect (Purchase Limits)",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "anchor-soup-limit",
                label: "\"Limit 12\" version",
                title: "Grocery Soup Sale",
                scenarioText: "Your favorite canned soup is on sale for 10% off. The sign reads \"Limit 12 per customer.\" How many cans do you buy?",
                options: [
                    { text: "0 to 2", value: 1 },
                    { text: "3 to 5", value: 2 },
                    { text: "6 to 8", value: 3 },
                    { text: "10 or more", value: 4 }
                ]
            },
            {
                id: "anchor-soup-nolimit",
                label: "No-limit version",
                title: "Pantry Restock Discount",
                scenarioText: "The canned soup you usually buy is 10% off this week, with no limit on how many you can buy. How many cans do you buy?",
                options: [
                    { text: "0 to 2", value: 1 },
                    { text: "3 to 5", value: 2 },
                    { text: "6 to 8", value: 3 },
                    { text: "10 or more", value: 4 }
                ]
            }
        ]
    },
    wasPrice: {
        biasType: "ANCHORING",
        bestAnswer: "The same decision in both versions",
        reasoning: "The jacket, its price, and your situation were identical. Only the \"Was $240\" tag differed. Retailers often set a reference price that items rarely or never sold at, so the sale price looks like a bargain. If the crossed-out price changed your decision, it worked as an anchor.",
        biasName: "Anchoring Effect (Reference Prices)",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "anchor-jacket-wasprice",
                label: "\"Was $240\" version",
                title: "Winter Jacket Sale",
                scenarioText: "You are shopping for a winter jacket and have checked two stores so far. At a third store, a jacket you like has a tag reading \"Was $240, now $129!\" Do you buy it now or keep looking?",
                options: [
                    { text: "Buy it now", value: "buy" },
                    { text: "Keep looking", value: "look" }
                ]
            },
            {
                id: "anchor-jacket-plain",
                label: "Plain $129 version",
                title: "Outerwear Shopping Trip",
                scenarioText: "You need a new winter jacket and have looked in two stores. In a third, you find one you like priced at $129. Do you buy it now or keep looking?",
                options: [
                    { text: "Buy it now", value: "buy" },
                    { text: "Keep looking", value: "look" }
                ]
            }
        ]
    },
    candidateOrder: {
        biasType: "HALO",
        bestAnswer: "The same rating in both versions",
        reasoning: "Both candidates were described with exactly the same six traits, in opposite order. In Solomon Asch's classic study, which Kahneman uses to introduce the halo effect, people rated the person far more favorably when the positive traits came first. Early traits color how later ones are read.",
        biasName: "Halo Effect (Order of Information)",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "halo-positive-first",
                label: "Positive-traits-first version",
                title: "Team Lead Candidate: Alan",
                scenarioText: "References describe Alan, a candidate for a team lead role, as: intelligent, industrious, impulsive, critical, stubborn, envious. How would you rate him as a candidate?",
                options: [
                    { text: "Strong candidate", value: "strong" },
                    { text: "Mixed candidate", value: "mixed" },
                    { text: "Weak candidate", value: "weak" }
                ]
            },
            {
                id: "halo-negative-first",
                label: "Negative-traits-first version",
                title: "Team Lead Candidate: Ben",
                scenarioText: "References describe Ben, a candidate for a team lead role, as: envious, stubborn, critical, impulsive, industrious, intelligent. How would you rate him as a candidate?",
                options: [
                    { text: "Strong candidate", value: "strong" },
                    { text: "Mixed candidate", value: "mixed" },
                    { text: "Weak candidate", value: "weak" }
                ]
            }
        ]
    },
    bonusToken: {
        biasType: "ENDOWMENT",
        bestAnswer: "A selling price no more than 5 points above your buying price",
        reasoning: "A Bonus Token is worth 20 points on average (a 50% chance of 40). It is worth the same to you whether you are holding it or not, so the lowest price you'd sell it for should be about the most you'd pay for it. In experiments, owners typically demand about twice what buyers will pay for the same item, as in the Cornell mug studies in Chapter 27. If you asked noticeably more to give the token up than you'd pay to get it, owning it made giving it up feel like a loss.",
        biasName: "Endowment Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 27",
        isConsistent: sellNotAboveBuy,
        versions: [
            {
                id: "endowment-token-sell",
                token: "sell",
                label: "Selling version",
                title: "Bonus Token Offer",
                scenarioText: "You've just been given a Bonus Token. At your next review it pays 40 Brain Points with a 50% chance, and nothing otherwise. You can sell it now: pick the lowest price you'd accept. The game then draws a random price from 0 to 40 points. If the drawn price is at least your price, you sell the token for the drawn price; if not, you keep it. You're paid the drawn price, not yours, so picking the price that truly matches what the token is worth to you is your best move.",
                options: [
                    { text: "5 points", value: 5 },
                    { text: "10 points", value: 10 },
                    { text: "15 points", value: 15 },
                    { text: "20 points", value: 20 },
                    { text: "25 points", value: 25 },
                    { text: "30 points", value: 30 },
                    { text: "35 points", value: 35 }
                ]
            },
            {
                id: "endowment-token-buy",
                token: "buy",
                label: "Buying version",
                title: "Bonus Token for Sale",
                scenarioText: "You can buy a Bonus Token. At your next review it pays 40 Brain Points with a 50% chance, and nothing otherwise. Pick the most you'd pay. The game then draws a random price from 0 to 40 points. If the drawn price is at or below your price, you buy the token at the drawn price; if not, there's no sale. You pay the drawn price, not yours, so picking the price that truly matches what the token is worth to you is your best move.",
                options: [
                    { text: "5 points", value: 5 },
                    { text: "10 points", value: 10 },
                    { text: "15 points", value: 15 },
                    { text: "20 points", value: 20 },
                    { text: "25 points", value: 25 },
                    { text: "30 points", value: 30 },
                    { text: "35 points", value: 35 }
                ]
            }
        ]
    },
    allais: {
        biasType: "FOURFOLD",
        bestAnswer: "The same type of option (safer or riskier) in both versions",
        reasoning: "The second version is the first with every probability divided by four. Under consistent preferences, if you prefer the sure $3,000 to an 80% chance of $4,000, you should also prefer 25% of $3,000 to 20% of $4,000. Most people take the sure thing in the first version and the bigger prize in the second: certainty gets extra weight. Kahneman discusses this pattern, first described by Maurice Allais, in Chapter 29.",
        biasName: "Certainty Effect (Allais Paradox)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "allais-certain",
                label: "Sure-thing version",
                title: "Sales Bonus Structure",
                scenarioText: "Your employer lets you pick your annual bonus. Option A: $3,000 guaranteed. Option B: an 80% chance of $4,000 and a 20% chance of nothing. Which do you pick?",
                options: [
                    { text: "Option A: $3,000 guaranteed", value: "safer" },
                    { text: "Option B: 80% chance of $4,000", value: "riskier" }
                ]
            },
            {
                id: "allais-scaled",
                label: "Scaled-down version",
                title: "Customer Raffle Prize Pick",
                scenarioText: "A store raffle lets winners choose their prize draw. Option A: a 25% chance of $3,000. Option B: a 20% chance of $4,000. Which do you pick?",
                options: [
                    { text: "Option A: 25% chance of $3,000", value: "safer" },
                    { text: "Option B: 20% chance of $4,000", value: "riskier" }
                ]
            }
        ]
    },
    diseaseRate: {
        biasType: "DENOMINATOR",
        bestAnswer: "Rating the 24.14% disease at least as dangerous",
        reasoning: "\"1,286 out of 10,000\" is a 12.86% fatality rate, about half of 24.14%. Yet in Yamagishi's study, cited in Chapter 30, people rated the \"1,286 out of 10,000\" disease as more dangerous, because a count of deaths is easier to picture than a percentage. If you rated it higher, you showed denominator neglect.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        isConsistent: firstNotHigher,
        versions: [
            {
                id: "denominator-count",
                label: "\"1,286 out of 10,000\" version",
                title: "Emerging Disease Briefing",
                scenarioText: "A newly identified disease kills 1,286 out of every 10,000 people who catch it. How dangerous would you rate it?",
                options: [
                    { text: "Low danger", value: 1 },
                    { text: "Moderate danger", value: 2 },
                    { text: "High danger", value: 3 },
                    { text: "Extreme danger", value: 4 }
                ]
            },
            {
                id: "denominator-percent",
                label: "\"24.14%\" version",
                title: "Infectious Disease Risk Rating",
                scenarioText: "Health officials report a new infection with a fatality rate of 24.14%. How dangerous would you rate it?",
                options: [
                    { text: "Low danger", value: 1 },
                    { text: "Moderate danger", value: 2 },
                    { text: "High danger", value: 3 },
                    { text: "Extreme danger", value: 4 }
                ]
            }
        ]
    },
    dinnerware: {
        biasType: "LESS_IS_MORE",
        bestAnswer: "Paying at least as much for the 40-piece set",
        reasoning: "The 40-piece set contains all 24 perfect pieces of the smaller set plus 7 more intact pieces. It is worth at least as much. In Christopher Hsee's study, people judging one set at a time offered about $33 for the 24-piece set and only $23 for the 40-piece set, because the broken pieces lower the average impression. Kahneman discusses it as \"less is more.\"",
        biasName: "Less Is More (Separate Evaluation)",
        bookRef: "Thinking, Fast and Slow - Chapters 15 & 33",
        isConsistent: firstNotHigher,
        versions: [
            {
                id: "lessmore-24-set",
                label: "24-piece set",
                title: "Estate Sale Dinnerware",
                scenarioText: "At an estate sale, a dinnerware set has 8 dinner plates, 8 soup bowls, and 8 dessert plates, all in perfect condition. What is the most you would pay?",
                options: [
                    { text: "Under $20", value: 1 },
                    { text: "$20 to $29", value: 2 },
                    { text: "$30 to $39", value: 3 },
                    { text: "$40 or more", value: 4 }
                ]
            },
            {
                id: "lessmore-40-set",
                label: "40-piece set",
                title: "Clearance Sale Tableware",
                scenarioText: "A clearance sale has a dinnerware set with 8 dinner plates, 8 soup bowls, and 8 dessert plates, all in perfect condition, plus 8 cups and 8 saucers, of which 2 cups and 7 saucers are broken. What is the most you would pay?",
                options: [
                    { text: "Under $20", value: 1 },
                    { text: "$20 to $29", value: 2 },
                    { text: "$30 to $39", value: 3 },
                    { text: "$40 or more", value: 4 }
                ]
            }
        ]
    },
    retirementDefault: {
        biasType: "DEFAULTS",
        bestAnswer: "The same choice in both versions",
        reasoning: "The plan, the match, and your situation were the same; only the default differed. When companies switch from opt-in to automatic enrollment, participation among new employees has jumped from about half to over 85% (Madrian & Shea 2001). Kahneman uses the similar organ-donation example: countries with an opt-out default have far higher donation rates.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "default-optout",
                label: "Automatic enrollment version",
                title: "New Job Benefits Setup",
                scenarioText: "Your new employer's retirement plan matches 50% of what you contribute. You have been automatically enrolled at 5% of your salary; you can opt out with one click. What do you do?",
                options: [
                    { text: "Participate at 5%", value: "in" },
                    { text: "Do not participate", value: "out" }
                ]
            },
            {
                id: "default-optin",
                label: "Sign-up version",
                title: "Employee Savings Plan",
                scenarioText: "Your company offers a retirement plan that matches 50% of what you contribute. You are not enrolled, but you can sign up at 5% of your salary with one click. What do you do?",
                options: [
                    { text: "Participate at 5%", value: "in" },
                    { text: "Do not participate", value: "out" }
                ]
            }
        ]
    },
    penniesADay: {
        biasType: "PRICE_FRAMING",
        bestAnswer: "The same decision in both versions",
        reasoning: "$1 a day and $365 a year are the same price. Breaking a cost into a daily amount makes it feel trivial by comparing it with small everyday purchases. Gourville called this the \"pennies-a-day\" strategy, and it is common in subscriptions and charity appeals.",
        biasName: "Price Framing (Pennies-a-Day)",
        bookRef: "Marketing research (Gourville 1998, \"pennies-a-day\")",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "price-per-day",
                label: "\"$1 a day\" version",
                title: "Language App Subscription",
                scenarioText: "A language-learning app you have tried and liked offers a premium plan billed annually. The ad says: \"Fluency for just $1 a day!\" Do you subscribe?",
                options: [
                    { text: "Subscribe", value: "yes" },
                    { text: "Don't subscribe", value: "no" }
                ]
            },
            {
                id: "price-per-year",
                label: "\"$365 a year\" version",
                title: "Premium Learning Plan",
                scenarioText: "You have been using the free version of a language-learning app and like it. The premium plan costs $365, billed once a year. Do you subscribe?",
                options: [
                    { text: "Subscribe", value: "yes" },
                    { text: "Don't subscribe", value: "no" }
                ]
            }
        ]
    },
    freeChocolate: {
        biasType: "ZERO_PRICE",
        bestAnswer: "The same chocolate in both versions",
        reasoning: "Both prices dropped by exactly 1¢, so the difference between the two chocolates stayed at 14¢. In Shampanier, Mazar and Ariely's study, most people chose the truffle at 15¢ vs 1¢, but most switched to the plain chocolate once it was free. \"Free\" gets far more weight than a one-cent price cut deserves.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "zero-price-paid",
                label: "15¢ vs 1¢ version",
                title: "Cafeteria Chocolate Stand",
                scenarioText: "A stand in your office lobby sells one chocolate per person: a gourmet truffle for 15¢ or a plain chocolate kiss for 1¢. Which do you take?",
                options: [
                    { text: "The gourmet truffle", value: "truffle" },
                    { text: "The plain chocolate", value: "plain" }
                ]
            },
            {
                id: "zero-price-free",
                label: "14¢ vs free version",
                title: "Lobby Sweets Table",
                scenarioText: "A table at a conference offers one chocolate per person: a gourmet truffle for 14¢ or a plain chocolate kiss for free. Which do you take?",
                options: [
                    { text: "The gourmet truffle", value: "truffle" },
                    { text: "The plain chocolate", value: "plain" }
                ]
            }
        ]
    }
};

// Every scenario in the pool, with paired versions tagged by their pair id
export const MASTER_SCENARIOS = [
    ...STANDALONE_SCENARIOS,
    ...Object.entries(PAIRED_TESTS).flatMap(([pairId, pair]) =>
        pair.versions.map(v => ({ ...v, biasType: pair.biasType, pair: pairId }))
    )
];

// A session goes through every question the player hasn't seen, with a
// review after every block of this many questions
export const REVIEW_BLOCK = 10;
// Each full block holds up to two pairs, laid out crosswise: one pair in
// slots 1 and 9, the other in slots 2 and 10. Both versions are answered
// before the block's review, always exactly MIN_PAIR_GAP questions apart.
// A short final block holds no pairs.
const PAIRS_PER_BLOCK = 2;
export const MIN_PAIR_GAP = REVIEW_BLOCK - PAIRS_PER_BLOCK;
// About one straightforward question (where the obvious answer is right) is
// scattered into every this-many regular questions
const QUESTIONS_PER_SCATTERED_FILLER = 9;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const SCENARIOS_BY_ID = new Map(MASTER_SCENARIOS.map(s => [s.id, s]));

function countPairs(scenarios) {
    return new Set(scenarios.filter(s => s.pair).map(s => s.pair)).size;
}

const pairCapacity = length => PAIRS_PER_BLOCK * Math.floor(length / REVIEW_BLOCK);

// Orders scenarios so every pair sits inside one full review block (see
// PAIRS_PER_BLOCK) and everything else fills the remaining slots at random.
// Pairs that don't fit are left out; they stay unseen for a later session.
function layoutWithPairs(scenarios) {
    let kept = [...scenarios];
    while (countPairs(kept) > pairCapacity(kept.length)) {
        const pairIds = [...new Set(kept.filter(s => s.pair).map(s => s.pair))];
        const drop = pairIds[pairIds.length - 1];
        kept = kept.filter(s => s.pair !== drop);
    }

    const pairs = shuffle([...new Set(kept.filter(s => s.pair).map(s => s.pair))])
        .map(id => shuffle(kept.filter(s => s.pair === id)));
    const singles = shuffle(kept.filter(s => !s.pair));
    const queue = new Array(kept.length).fill(null);

    const blocks = shuffle([...Array(Math.floor(kept.length / REVIEW_BLOCK)).keys()]);
    const pairsInBlock = blocks.map((_, i) => pairs.filter((_, p) => p % blocks.length === i));
    blocks.forEach((block, i) => {
        const inBlock = pairsInBlock[i];
        // A lone pair takes the 1st/9th or the 2nd/10th slots at random
        const offsets = inBlock.length === 1 ? [Math.floor(Math.random() * PAIRS_PER_BLOCK)] : [0, 1];
        inBlock.forEach(([first, second], j) => {
            const start = block * REVIEW_BLOCK + offsets[j];
            queue[start] = first;
            queue[start + MIN_PAIR_GAP] = second;
        });
    });
    for (let i = 0; i < queue.length; i++) {
        if (!queue[i]) queue[i] = singles.shift();
    }
    return queue;
}

export class ScenarioBank {
    static getAllScenarios() {
        return MASTER_SCENARIOS;
    }

    static getScenario(id) {
        return SCENARIOS_BY_ID.get(id) || null;
    }

    /**
     * Builds the start of a session. The planned part holds every regular
     * question the player has not seen, with pairs laid out inside review
     * blocks and about one straightforward question per block scattered in.
     * The tail holds one retest for each of `retestTypes` (bias types whose
     * latest answer was wrong) plus padding questions, so the session length
     * is a multiple of REVIEW_BLOCK. The game adds retests to the tail as the
     * player misses questions and re-pads it (see padTail).
     * Returns { queue: [{ id, retest, pad }], plannedLength }.
     */
    static buildSession({ seenIds = new Set(), retestTypes = [], missedIds = new Set() } = {}) {
        const regular = MASTER_SCENARIOS.filter(s => !s.practiceOnly && !s.filler && !seenIds.has(s.id));
        const scatterCount = Math.ceil(regular.length / QUESTIONS_PER_SCATTERED_FILLER);
        const scattered = ScenarioBank.pickFillers(scatterCount, { seenIds });
        const planned = layoutWithPairs([...regular, ...scattered]);

        const used = new Set(planned.map(s => s.id));
        const tail = [];
        for (const type of retestTypes) {
            const sc = ScenarioBank.pickRetestScenario(type, { excludeIds: used, missedIds, askedIds: seenIds });
            if (!sc) continue;
            used.add(sc.id);
            tail.push({ id: sc.id, retest: true, pad: false });
        }

        const queue = [...planned.map(s => ({ id: s.id, retest: false, pad: false })), ...tail];
        ScenarioBank.padTail(queue, { tailStart: planned.length, seenIds });
        return { queue, plannedLength: planned.length };
    }

    /**
     * Up to `count` straightforward questions not in `excludeIds`, preferring
     * ones the player hasn't seen. If that's not enough, falls back to ones in
     * `reusableIds` (already answered earlier in this session).
     */
    static pickFillers(count, { excludeIds = new Set(), seenIds = new Set(), reusableIds = new Set() } = {}) {
        const fillers = shuffle(STANDALONE_SCENARIOS.filter(s => s.filler));
        const available = fillers.filter(s => !excludeIds.has(s.id));
        const unseen = available.filter(s => !seenIds.has(s.id));
        const seen = available.filter(s => seenIds.has(s.id));
        const reused = fillers.filter(s => excludeIds.has(s.id) && reusableIds.has(s.id));
        return [...unseen, ...seen, ...reused].slice(0, Math.max(0, count));
    }

    /**
     * Keeps a session a whole number of review blocks long by adding or
     * removing padding questions in its tail (entries from `tailStart` on,
     * which never include pairs), then shuffles the tail so padding and
     * retests mix. `removable` padding entries are dropped first when the
     * tail has grown. Changes `queue` in place.
     */
    static padTail(queue, { tailStart, seenIds = new Set() }) {
        const surplus = queue.length % REVIEW_BLOCK;
        if (surplus !== 0) {
            // Drop unplayed padding if that reaches a block boundary, else add more
            const pads = queue.map((e, i) => (e.pad && i >= tailStart ? i : -1)).filter(i => i !== -1);
            if (pads.length >= surplus && queue.length - surplus > tailStart) {
                pads.slice(-surplus).reverse().forEach(i => queue.splice(i, 1));
            } else {
                const inQueue = new Set(queue.map(e => e.id));
                const upcoming = new Set(queue.slice(tailStart).map(e => e.id));
                const played = new Set(queue.slice(0, tailStart).map(e => e.id).filter(id => !upcoming.has(id)));
                const needed = REVIEW_BLOCK - surplus;
                ScenarioBank.pickFillers(needed, { excludeIds: inQueue, seenIds, reusableIds: played })
                    .forEach(s => queue.push({ id: s.id, retest: false, pad: true }));
            }
        }
        const tail = shuffle(queue.slice(tailStart));
        queue.splice(tailStart, tail.length, ...tail);
        return queue;
    }

    /**
     * A standalone scenario that retests `biasType`, never one in
     * `excludeIds` (still coming up, already queued as a retest, or being
     * used for practice). Prefers, in order: a question the player hasn't
     * been asked (`askedIds`), one they answered right, and finally the one
     * they missed, which by then they have seen explained. Null if the bias
     * type has nothing left to retest with.
     */
    static pickRetestScenario(biasType, { excludeIds = new Set(), missedIds = new Set(), askedIds = new Set() } = {}) {
        const candidates = shuffle(STANDALONE_SCENARIOS.filter(s =>
            s.biasType === biasType && !excludeIds.has(s.id)
        ));
        return candidates.find(s => !askedIds.has(s.id) && !missedIds.has(s.id))
            || candidates.find(s => !askedIds.has(s.id))
            || candidates.find(s => !missedIds.has(s.id))
            || candidates[0]
            || null;
    }

    /**
     * A standalone scenario of `biasType` to practice on during a review,
     * preferring an unseen practice-only question, then any unseen question,
     * then one the player has already seen. Never returns one in
     * `excludeIds` (e.g. questions still coming up this session). Null if
     * the bias type has no standalone scenarios left to use.
     */
    static pickPracticeScenario(biasType, { seenIds = new Set(), excludeIds = new Set() } = {}) {
        const candidates = shuffle(STANDALONE_SCENARIOS.filter(s =>
            s.biasType === biasType && !excludeIds.has(s.id)
        ));
        return candidates.find(s => s.practiceOnly && !seenIds.has(s.id))
            || candidates.find(s => !seenIds.has(s.id))
            || candidates[0]
            || null;
    }
}
