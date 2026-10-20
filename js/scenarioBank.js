/**
 * Grade My Brain - Scenario Bank
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

    ADAPTIVE_ADVERSARY: {
        name: "Assuming the Past Predicts Attacks",
        shortName: "Adaptive foes",
        description: "Treating historical incident data as a forecast when attackers adapt to your defenses and change tactics.",
        bookReference: "Thinking, Fast and Slow - Chapter 22 (statistics and intuition need a regular environment)",
        tip: "Use your history as a starting point, then ask what has changed: what attackers are doing to others like you now, and what your defenses would never have seen. Past data predicts best when nobody is trying to beat it."
    },
    PHISHING: {
        name: "Spotting Phishing",
        shortName: "Phishing",
        description: "Telling real messages from phishing by checking who sent them, whether you expected them, and what they ask, without flagging everything.",
        bookReference: "Security awareness research (sender, expectation, and request checks)",
        tip: "Check the real sender address, not just the name; ask whether you expected the message; and look at what it wants you to do. Report what fails those checks and keep what passes. Flagging everything is a mistake too."
    },
    AUTHORITY_PRESSURE: {
        name: "Authority & Impersonation",
        shortName: "Authority",
        description: "Skipping checks because a request seems to come from someone important, especially when it's urgent or secret.",
        bookReference: "Influence research (Cialdini 1984)",
        tip: "The more important, urgent, or secret a request is, the more it deserves verifying. Confirm through a channel you already trust, never through the message or call that made the request."
    },
    LOOKALIKES: {
        name: "Lookalikes & Hidden Links",
        shortName: "Lookalikes",
        description: "Trusting a web address, package name, or code that looks familiar at a glance, or one whose destination you can't see.",
        bookReference: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        tip: "Read the exact domain right before the first single slash, letter by letter. Type addresses yourself, and avoid links and codes whose destination you can't check."
    },
    HABITUATION: {
        name: "Warning & Prompt Fatigue",
        shortName: "Fatigue",
        description: "Clicking through warnings and approval prompts out of habit, or just to make them stop.",
        bookReference: "Usable security research (Akhawe & Felt 2013)",
        tip: "Treat a warning or prompt you didn't expect as news, not noise. If you didn't start a sign-in, don't approve it; if a site you use every week suddenly warns you, stop."
    },
    BAIT: {
        name: "Fear & Curiosity Bait",
        shortName: "Bait",
        description: "Acting on alarm or curiosity, such as virus warnings, threats, or tempting found items, before checking whether the story holds up.",
        bookReference: "Social engineering research (fear appeals; Tischer et al. 2016)",
        tip: "Strong fear or curiosity is a signal to slow down. Ask what evidence you actually have, and route anything suspicious to IT instead of investigating it yourself."
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
        bestAnswer: "Decline to invest at $135M",
        reasoning: "The $150M figure was an arbitrary anchor with no fundamental backing. Even in the best case (60% chance of $90M success), the expected asset value is far below $135M. The anchor pulled the offer price far above any reasonable fundamental valuation.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Invest at the $135M valuation", biasValue: 1, isBest: false },
            { text: "Decline to invest at $135M", biasValue: 0, isBest: true }
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
            { text: "Reject Settlement (Proceed to Trial)", biasValue: 0, isBest: true },
            { text: "Accept Settlement (Pay $200,000)", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "anchoring-3",
        biasType: "ANCHORING",
        title: "Commercial Real Estate Purchase",
        scenarioText: "A commercial office building has been listed for an asking price of $4.5 Million. An independent professional appraisal values the building at $2.8 Million. The seller offers a discounted price of $3.1 Million.",
        bestAnswer: "Don't buy at $3.1M",
        reasoning: "The $4.5M asking price anchors buyer perception of value. The independent appraisal values the property at $2.8M, so the discounted $3.1M price is still $300,000 above fair market value.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Buy at $3.1M", biasValue: 1, isBest: false },
            { text: "Don't buy at $3.1M", biasValue: 0, isBest: true }
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
        // Retired: preferring the sure 200 lives is a defensible moral choice, so it
        // shouldn't be scored. The "lives saved" vs "deaths" framing pair covers the idea.
        retired: true,
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
            { text: "Mark is a software engineer", biasValue: 0, isBest: true },
            { text: "Mark is a software engineer who founded an AI startup with $10M VC funding", biasValue: 1, isBest: false }
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
            { text: "Prioritize patching file storage servers", biasValue: 0, isBest: true },
            { text: "Prioritize hardening the database servers", biasValue: 1, isBest: false }
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
            { text: "Sell and buy the alternative stock", biasValue: 0, isBest: true },
            { text: "Keep your current shares", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // DECOY EFFECT (Asymmetric Dominance)
    // -------------------------------------------------------------
    {
        id: "decoy-1",
        biasType: "DECOY",
        title: "Team Cloud Storage Subscription",
        scenarioText: "Your small team needs 15 GB of cloud storage per month for document backups, and that amount has been steady for years. The provider offers: Plan A (15 GB for $15/mo), Plan B (40 GB for $45/mo), and Plan C (50 GB for $48/mo). Which plan do you purchase?",
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
        bestAnswer: "Option A [Common]: 90% chance of 80 gold",
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
        bestAnswer: "Budget $700,000",
        reasoning: "Ignoring historical overrun probabilities leads to mid-project budget failure. Budgeting $700,000 aligns with empirical reference class forecasting.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "Budget $700,000", biasValue: 0, isBest: true },
            { text: "Budget $500,000", biasValue: 1, isBest: false }
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
            { text: "Suicide, by roughly 2 to 1", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false },
            { text: "Homicide, by roughly 2 to 1", biasValue: 1, isBest: false }
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
            { text: "Extreme heat", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false },
            { text: "Tornadoes", biasValue: 1, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // LAW OF SMALL NUMBERS (Ch 10)
    // -------------------------------------------------------------
    {
        id: "smalln-kidney-cancer",
        biasType: "SMALL_NUMBERS",
        title: "County Health Statistics",
        scenarioText: "A study of kidney cancer rates across all 3,141 U.S. counties finds that the counties with the lowest rates are mostly small farming counties with few residents. The counties with the highest rates are also mostly small farming counties with few residents. What is the most likely explanation?",
        bestAnswer: "Small populations produce extreme rates by chance",
        reasoning: "This is Kahneman's own example. A cause like clean air or less pollution can't explain why the same kind of county has both the lowest and the highest rates. Small counties have few residents, so a handful of cases swings their rate a long way up or down. Both extremes are produced by small samples, not by lifestyle.",
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
        scenarioText: "You are choosing between two similar wireless headsets at the same price. Headset A has a 5.0-star average from 6 reviews. Headset B has a 4.6-star average from 3,400 reviews. Which is the safer bet to satisfy you?",
        bestAnswer: "Headset B (4.6 stars, 3,400 reviews)",
        reasoning: "Six reviews is a tiny sample. A few enthusiastic early buyers (or the seller's friends) can produce a perfect average by chance. With 3,400 reviews, Headset B's 4.6 is a reliable estimate. Headset A's true rating is likely to fall a long way once more people review it.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Headset A (5.0 stars, 6 reviews)", biasValue: 1, isBest: false },
            { text: "Headset B (4.6 stars, 3,400 reviews)", biasValue: 0, isBest: true }
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
            { text: "The bonus group was distracted by spending their bonuses", biasValue: 1, isBest: false },
            { text: "Extreme results tend to move back toward average", biasValue: 0, isBest: true }
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
        bestAnswer: "Very little",
        reasoning: "The ad shows six success stories out of thousands of students, and you have no information about the rest. Studies of retail day traders find that most lose money. System 1 builds a confident story from the evidence it is shown and does not ask what is missing: \"What You See Is All There Is.\"",
        biasName: "What You See Is All There Is (Survivorship)",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Most students earn substantial profits", biasValue: 1, isBest: false },
            { text: "At least a good fraction of students succeed", biasValue: 0.5, isBest: false },
            { text: "Very little", biasValue: 0, isBest: true }
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
        bestAnswer: "A sound decision",
        reasoning: "A good decision can turn out badly, and a reckless one can turn out well. Judging the decision by the outcome punishes decision makers for bad luck and rewards them for good luck. Kahneman calls this outcome bias and links it to hindsight bias: after the fact, the failure feels as if it should have been foreseen.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "A sound decision", biasValue: 0, isBest: true },
            { text: "A poor decision", biasValue: 1, isBest: false }
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
        bestAnswer: "Candidate A",
        reasoning: "Paul Meehl's research, summarized in Chapter 21, found that simple consistent scoring rules beat expert intuition in most fields. A lunch impression is a small, noisy sample that is easily swayed by charm and similarity. Kahneman's advice is to trust the structured score.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "Candidate A", biasValue: 0, isBest: true },
            { text: "Candidate B", biasValue: 1, isBest: false }
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
            { text: "Decline the bet", biasValue: 1, isBest: false },
            { text: "Take the bet", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "narrow-division-managers",
        biasType: "NARROW_FRAMING",
        title: "Division Project Portfolio",
        scenarioText: "You are CEO of a company with 20 divisions. Each division manager has an independent project with a 50% chance of earning $2 Million and a 50% chance of losing $1 Million. Each manager, worried about a loss on their record, plans to decline their project. What policy should you set?",
        bestAnswer: "Approve all 20 projects",
        reasoning: "Each project alone looks risky to the manager who owns it, but together the 20 projects are very likely to make money: the company loses overall only if 6 or fewer of the 20 succeed, about a 6% chance. Kahneman tells this story about Richard Thaler and a CEO to illustrate narrow framing. The cure is to judge risks as a portfolio.",
        biasName: "Narrow Framing",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        options: [
            { text: "Approve all 20 projects", biasValue: 0, isBest: true },
            { text: "Approve 5 of the projects", biasValue: 0.5, isBest: false },
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
        scenarioText: "Your company can afford to replace one vehicle this year, and each vehicle is driven 10,000 miles (16,000 km) a year. Option 1 replaces a pickup truck that gets 12 miles per gallon (5.1 km per litre) with one that gets 14 (6.0 km/L). Option 2 replaces a sedan that gets 30 miles per gallon (12.8 km/L) with one that gets 40 (17.0 km/L). Which saves more fuel?",
        bestAnswer: "Replacing the truck (12 to 14 mpg; 5.1 to 6.0 km/L)",
        reasoning: "Over 10,000 miles, the truck goes from about 833 gallons to 714, saving 119 gallons (450 litres). The sedan goes from 333 gallons to 250, saving 83 (315 litres). Miles per gallon and km per litre hide this; fuel per distance shows it. In litres per 100 km, the truck improves from 19.6 to 16.8 (2.8 less) and the sedan from 7.8 to 5.9 (1.9 less). Kahneman uses this \"MPG illusion\" (Larrick & Soll) to show how the choice of frame distorts judgment.",
        biasName: "Framing Effect (MPG Illusion)",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Replacing the sedan (30 to 40 mpg; 12.8 to 17.0 km/L)", biasValue: 1, isBest: false },
            { text: "Replacing the truck (12 to 14 mpg; 5.1 to 6.0 km/L)", biasValue: 0, isBest: true },
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
            { text: "Version B", biasValue: 1, isBest: false },
            { text: "Version A", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // DECEPTIVE ADVERTISING & DARK PATTERNS
    // -------------------------------------------------------------
    {
        id: "ads-drip-pricing",
        short: true,
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
        scenarioText: "Your usual cereal costs $4.49 for an 18 oz (510 g) box. Next to it is a new box of the same cereal labeled \"NEW Bigger Value Size!\" at $5.29 for 20.5 oz (581 g). Which is the better price per ounce (or per gram)?",
        bestAnswer: "Your usual 18 oz (510 g) box",
        reasoning: "The usual box costs about 24.9¢ per ounce (88¢ per 100 g); the \"Value Size\" costs about 25.8¢ per ounce (91¢ per 100 g). Bigger packages are often but not always cheaper per unit, and labels like \"value\" lean on that expectation. The shelf tag's unit price is the honest comparison.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "The new Value Size", biasValue: 1, isBest: false },
            { text: "Your usual 18 oz (510 g) box", biasValue: 0, isBest: true },
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
        short: true,
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
        short: true,
        biasType: "ROACH_MOTEL",
        title: "Streaming Cancellation Flow",
        scenarioText: "You signed up for StreamNook's free trial with one click, and you've decided to cancel because you don't use it. After two \"Are you sure?\" screens and a survey, you reach the screen below. What do you click?",
        // Rendered as an interactive mock screen; each option's `ui` says where it appears
        mockScreen: {
            brand: "StreamNook",
            step: "Step 4 of 4",
            heading: "Wait! Are you sure you want to lose everything?",
            body: "If you cancel, you'll lose your watch history, all 3 of your profiles, and the recommendations we've built just for you.",
            offer: { label: "Special offer, just for you", text: "Stay for 50% off your next 3 months" }
        },
        bestAnswer: "Continue to cancel",
        reasoning: "You came to cancel, and nothing on this screen changes the fact that you don't use the service. The screen is built to stop you anyway. The option you came for is the smallest, palest thing on it, and it's worded to make you feel careless, a dark pattern called confirmshaming. The loss-framed warning, the bright \"Pause\" button, and the \"special offer\" pull your attention elsewhere. In 2025 Amazon paid $2.5 billion to settle FTC charges that included a cancellation flow like this, which the FTC said Amazon internally called \"Iliad.\"",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Claim my 50% off", ui: "offer", label: "Claim my 50% off", biasValue: 1, isBest: false },
            { text: "Pause instead", ui: "primary", label: "Pause instead (keep my stuff)", biasValue: 0.5, isBest: false },
            { text: "Continue to cancel", ui: "link", label: "No thanks, I don't care about my watch history. Continue to cancel", biasValue: 0, isBest: true }
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
        short: true,
        biasType: "ZERO_PRICE",
        title: "Streaming Free Trial Ad",
        image: {
            src: "images/ads/streaming-trial.svg",
            alt: "Ad for StreamNook: Thousands of shows. Zero commitment. FREE with an asterisk, for 30 days. Fine print: Then $15.99 per month, billed annually as $191.88 on day 31. Cancel at least 24 hours before your trial ends to avoid being charged. Annual plans are non-refundable, including partial years. One trial per household. Payment method required."
        },
        scenarioText: "You sign up for this free trial and forget to cancel. What happens on day 31?",
        bestAnswer: "You're charged $191.88",
        reasoning: "The fine print says the \"$15.99/mo\" is billed as one annual charge of $191.88, and annual plans are non-refundable. \"Free\" and \"zero commitment\" in large type sit on top of a full-year commitment that starts automatically. Free trials that roll into paid plans rely on people forgetting to cancel.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        options: [
            { text: "You're charged $15.99 for the first month", biasValue: 1, isBest: false },
            { text: "You're charged $191.88", biasValue: 0, isBest: true },
            { text: "Nothing until you confirm", biasValue: 1, isBest: false }
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
        bestAnswer: "Very little",
        reasoning: "Twelve people for two weeks, paid for by the seller, can produce a big-looking number by chance, especially when \"energy\" is self-reported. The fine print also says the results are not typical and the FDA hasn't evaluated the claim. \"Clinically proven\" is not a regulated phrase.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Strong evidence it boosts energy by about 40%", biasValue: 1, isBest: false },
            { text: "Some evidence it probably works for most people", biasValue: 0.5, isBest: false },
            { text: "Very little", biasValue: 0, isBest: true }
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
            { text: "Nothing extra is owed", biasValue: 1, isBest: false },
            { text: "Interest is charged on the full $2,400, back to the purchase date", biasValue: 0, isBest: true }
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

    // -------------------------------------------------------------
    // COMPUTER SECURITY (all in the short version)
    // -------------------------------------------------------------
    {
        id: "sec-ids-alert",
        short: true,
        biasType: "BASE_RATE",
        title: "Intrusion Detection Alert",
        scenarioText: "Your intrusion detection system watches about 1,000,000 network connections a day. Roughly 1 in every 10,000 connections is actually malicious. The system flags 99% of malicious connections, and it wrongly flags 1% of harmless ones. An alert fires on a connection. About how likely is it that this connection is actually malicious?",
        bestAnswer: "About 1%",
        reasoning: "The detector's errors run both ways: it misses 1% of attacks and wrongly flags 1% of harmless traffic. Picture 1,000,000 connections: 100 are malicious and about 99 of those get flagged. Of the 999,900 harmless ones, about 10,000 get flagged too. So about 10,100 alerts, and only 99 are real: about 1%. Because attacks are rare, false alarms swamp the true ones. Stefan Axelsson called this the base-rate fallacy of intrusion detection (2000), and it's why security teams drown in alerts. The 1-in-10,000 figure comes from history and attackers can change it, but even a several-fold rise would leave most alerts false.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16; Axelsson (2000)",
        options: [
            { text: "About 99%", biasValue: 1, isBest: false },
            { text: "About 50%", biasValue: 0.5, isBest: false },
            { text: "About 10%", biasValue: 0.5, isBest: false },
            { text: "About 1%", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-headline-zero-day",
        short: true,
        biasType: "AVAILABILITY",
        title: "Headline Zero-Day",
        scenarioText: "A zero-day vulnerability in a rival company's VPN appliance is all over the tech news. You don't use that product. Your own incident records for the past two years show that most of your incidents started with phishing emails and reused passwords, and those attacks are still arriving every week. Where should next quarter's security effort go first?",
        bestAnswer: "Phishing-resistant sign-in and password protections",
        reasoning: "The headline is vivid, but it's about a product you don't run. Your records show what is actually getting through, and those attacks are still happening, so that's where effort pays off. History isn't a perfect forecast, because attackers move to whatever works next, so revisit the plan as threats shift. But news coverage is a worse guide than your own current data.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "An emergency review of VPN-style zero-days", biasValue: 1, isBest: false },
            { text: "Phishing-resistant sign-in and password protections", biasValue: 0, isBest: true },
            { text: "Split effort evenly across every threat in the news", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "sec-never-had-ransomware",
        short: true,
        biasType: "ADAPTIVE_ADVERSARY",
        title: "Ransomware Budget Debate",
        scenarioText: "Your company's incident records for the last five years show no ransomware attacks. Over the same period, ransomware attacks on companies of your size and industry have risen sharply. A colleague argues that ransomware defenses aren't worth funding because \"it's never happened to us.\" What's the best response?",
        bestAnswer: "Fund some ransomware defenses",
        reasoning: "Your own history is useful, but it only shows attacks that were tried against you in the past. Attackers pick new targets and methods, especially when a tactic is paying off elsewhere. Rising attacks on companies like yours are the better guide to next year. Throwing the whole budget at ransomware would overcorrect; adding it to the plan in proportion to the current threat is the balanced move.",
        biasName: "Assuming the Past Predicts Attacks",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "Agree and skip ransomware defenses", biasValue: 1, isBest: false },
            { text: "Fund some ransomware defenses", biasValue: 0, isBest: true },
            { text: "Move the entire security budget to ransomware", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "sec-firewall-record",
        biasType: "ADAPTIVE_ADVERSARY",
        title: "Firewall's Perfect Year",
        scenarioText: "Last year, your web application firewall's rules blocked every attack recorded in your logs. This month, attackers have started probing your site with payloads designed to slip past rules like yours. How much should last year's perfect record reassure you about next year?",
        bestAnswer: "Not much",
        reasoning: "The record covers the attacks the rules were built to catch, and your logs only show the attacks that were detected. Attackers who keep failing change their approach, and new probing payloads suggest they already are. In an adversarial setting, past success measures yesterday's attacks, not tomorrow's. That doesn't make the firewall useless; it means the rules need updating and testing against new techniques.",
        biasName: "Assuming the Past Predicts Attacks",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "A lot", biasValue: 1, isBest: false },
            { text: "Not much", biasValue: 0, isBest: true },
            { text: "Not at all", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "sec-cve-counts",
        biasType: "WYSIATI",
        title: "Comparing Library CVE Counts",
        scenarioText: "Library A had 120 published vulnerabilities (CVEs) last year. Library B, which does the same job, had 3. Library A is very widely used, has a dedicated security team, and pays bug bounties. Library B is maintained by one volunteer and has never had a security audit. What do the CVE counts tell you about which is safer to use?",
        bestAnswer: "Not much on their own",
        reasoning: "A CVE count measures how many flaws were found and reported, which depends heavily on how hard people are looking. A heavily used, audited, bug-bounty-backed library gets intense scrutiny; an unaudited one-person project may have many flaws no one has found yet. Past vulnerability counts also don't predict where attackers will strike next. The number in front of you feels like the whole story, but the missing information, how much each library has been examined, matters more.",
        biasName: "What You See Is All There Is",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Library B is safer", biasValue: 1, isBest: false },
            { text: "Library A is safer", biasValue: 0.5, isBest: false },
            { text: "Not much on their own", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-dashboard-blocked",
        short: true,
        biasType: "WYSIATI",
        title: "Security Dashboard Report",
        scenarioText: "Your security dashboard reports: \"100% of detected attacks last month were blocked.\" Based on this report, could any attacks have gotten through last month?",
        bestAnswer: "Yes, possibly",
        reasoning: "The dashboard can only count attacks it noticed. An attack that slipped past detection doesn't appear anywhere, so it can't lower the percentage. A perfect score is consistent with excellent defenses and with an undetected breach. Treating the visible number as the whole picture is exactly what Kahneman means by \"What You See Is All There Is.\"",
        biasName: "What You See Is All There Is",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Yes, possibly", biasValue: 0, isBest: true },
            { text: "No", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-cvss-priority",
        short: true,
        biasType: "ANCHORING",
        title: "Vulnerability Patch Order",
        scenarioText: "Your scanner lists two vulnerabilities. The first has a CVSS severity score of 9.8 but is in a tool on an isolated internal test server. That server only builds throwaway versions that your QA team runs on separate, isolated test hardware. Nothing built on it ever ships to customers, and no outside system can reach it. The second scores 6.5, is on your internet-facing login page, and appears on CISA's list of vulnerabilities known to be actively exploited. Which do you fix first?",
        bestAnswer: "The 6.5 on the login page",
        reasoning: "A CVSS score rates how bad a flaw could be in general, not how much risk it poses to you. The 6.5 is reachable from the internet and attackers are already using it; the 9.8 is on an isolated test machine that attackers can't reach and that produces nothing customers ever run. A big number is a powerful anchor, but exposure and real-world exploitation matter more for deciding what to fix first.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "The 9.8 on the test server", biasValue: 1, isBest: false },
            { text: "The 6.5 on the login page", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-patch-rollout-plan",
        short: true,
        biasType: "PLANNING",
        title: "Fleet Patch Rollout",
        scenarioText: "Your team estimates a critical patch can be rolled out to all 5,000 company laptops in 2 weeks. Your last four fleet-wide patches took 6, 7, 8, and 6 weeks. What should you tell leadership?",
        bestAnswer: "About 6 to 8 weeks",
        reasoning: "Four similar rollouts are your reference class, and they all took three to four times the estimate. The inside view, \"this one will go smoothly,\" is the planning fallacy. Planning on the realistic timeline also tells you how long you need extra protections, such as blocking the vulnerable feature, while the rollout finishes.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "About 2 weeks", biasValue: 1, isBest: false },
            { text: "About 3 weeks", biasValue: 0.5, isBest: false },
            { text: "About 6 to 8 weeks", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-homegrown-crypto",
        short: true,
        biasType: "SUNK_COST",
        title: "Homegrown Encryption Library",
        scenarioText: "Your team has spent 18 months building its own encryption library. An outside audit found serious design flaws, and fixing them would take about another year. A widely used, independently audited open-source library already does everything you need. What do you do?",
        bestAnswer: "Switch to the audited library",
        reasoning: "The 18 months are spent whichever way you choose. Looking only forward, another year to fix a flawed design loses to an audited library you can adopt now. \"Don't roll your own crypto\" is standard security advice for exactly this reason, and the effort already spent is the sunk cost talking.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Switch to the audited library", biasValue: 0, isBest: true },
            { text: "Keep building your own library", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-default-passwords",
        biasType: "DEFAULTS",
        title: "Camera Password Design",
        scenarioText: "You're designing a home security camera. Option A ships every camera with the same default password and a note telling customers to change it. Option B gives each camera its own unique password and asks customers to set their own during setup. Which do you choose?",
        bestAnswer: "Option B",
        reasoning: "Most people keep whatever the default is, so a shared default password stays in place on huge numbers of devices. In 2016 the Mirai botnet took over hundreds of thousands of cameras and routers simply by trying factory default passwords. California (since 2020) and the U.K. (since 2024) now require connected devices to avoid universal default passwords. Good security design makes the safe choice the default.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Option A", biasValue: 1, isBest: false },
            { text: "Option B", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-phishing-deadline",
        office: true,
        short: true,
        biasType: "FAKE_URGENCY",
        title: "Password Expiry Email",
        scenarioText: "Larkwood makes everyone change their password every 90 days, and yours is due this week. This email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Larkwood IT",
            address: "it-notifications@larkwood.com",
            to: "you@larkwood.com",
            subject: "Your password expires in 24 hours",
            body: [
                "Hello,",
                "Your Larkwood password will expire in 24 hours. To avoid losing access to email and shared drives, confirm your current password or choose a new one.",
                "Thank you,\nLarkwood IT Service Desk"
            ],
            button: "Keep my current password",
            linkPreview: "https://larkwood.com.sso-verify.net/password/keep?u=you"
        },
        bestAnswer: "Open the IT portal from your bookmarks and change it there",
        reasoning: "The email is plausible: you really are due, and the sender's name and address look right (addresses are easy to fake). The tell is where the button goes: larkwood.com.sso-verify.net belongs to sso-verify.net, not Larkwood. Urgency (\"24 hours\", \"losing access\") pushes you to click before you check. Going to the portal you already know is safe whether the email is real or not. Replying doesn't help, since a reply can reach the attacker.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Open the IT portal from your bookmarks and change it there", biasValue: 0, isBest: true },
            { text: "Click \"Keep my current password\" and sign in", biasValue: 1, isBest: false },
            { text: "Reply to the email to ask whether it's real", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "sec-vendor-halo",
        short: true,
        biasType: "HALO",
        title: "Security Vendor Pitch",
        scenarioText: "A security vendor gives a polished demo, lists famous customers, and its founders recently spoke at a major conference. An independent penetration test of their product, which you paid for, found two critical flaws that the vendor hasn't fixed. What should your decision rest on?",
        bestAnswer: "Mostly on the penetration test",
        reasoning: "The demo, customer list, and conference talk say a lot about marketing and reputation and little about this product's security. The penetration test is direct evidence about exactly what you're buying. The halo effect lets impressive surface traits color judgments of unrelated qualities.",
        biasName: "Halo Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Mostly on the penetration test", biasValue: 0, isBest: true },
            { text: "Equally", biasValue: 0.5, isBest: false },
            { text: "Mostly on the vendor's reputation", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-phishing-sim-sample",
        short: true,
        biasType: "SMALL_NUMBERS",
        title: "Phishing Simulation Results",
        scenarioText: "In a phishing simulation, 0 of the 8 people on the legal team clicked the test link. In engineering, 12 of 200 people clicked (6%). What can you conclude about the legal team?",
        bestAnswer: "There isn't enough data to tell",
        reasoning: "Even if the legal team were exactly as likely to click as engineering (6% each), all 8 would avoid the link about 61% of the time (0.94 multiplied by itself 8 times). A perfect score from 8 people is what you'd expect by chance. Small groups produce extreme results, good and bad.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "There isn't enough data to tell", biasValue: 0, isBest: true },
            { text: "Legal is better at spotting phishing than engineering", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-training-regression",
        short: true,
        biasType: "REGRESSION",
        title: "Phishing Training Results",
        scenarioText: "The five teams with the worst phishing-simulation click rates last quarter were sent to mandatory training. This quarter, all five teams' click rates improved. What can you conclude about the training?",
        bestAnswer: "There isn't enough evidence yet",
        reasoning: "Teams picked because they did worst in one quarter partly had a bad quarter by chance, so they tend to look better the next quarter whatever you do. That's regression to the mean. To know whether training worked, compare against similar teams that weren't trained, or measure over several quarters.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 17",
        options: [
            { text: "The training worked", biasValue: 1, isBest: false },
            { text: "There isn't enough evidence yet", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "sec-patch-outcome",
        short: true,
        biasType: "OUTCOME_BIAS",
        title: "Two Patching Decisions",
        scenarioText: "Admin A delayed a critical security patch on an internet-facing server for six months, and nothing happened. Admin B installed the patch within a day, as policy requires, but the server was later breached through a vulnerability nobody knew about yet. Who made the better decision?",
        bestAnswer: "Admin B",
        reasoning: "Admin A took a serious, known risk and got lucky; Admin B did the right thing and was hit by something no one could have patched. Judging them by what happened would reward luck and punish good practice. Outcome bias is especially dangerous in security, where most risky decisions don't immediately go wrong.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "Admin B", biasValue: 0, isBest: true },
            { text: "Admin A", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-exploit-prediction",
        short: true,
        biasType: "INTUITION_VS_FORMULA",
        title: "Prioritizing 400 Vulnerabilities",
        scenarioText: "You have 400 open vulnerabilities to work through. You can order them using a scoring model that combines each one's chance of being exploited soon (from current exploit activity, updated daily and checked against real attacks) with how exposed and important the affected system is in your network. Or you can use a senior engineer's gut ranking. Which should set the order?",
        bestAnswer: "The scoring model",
        reasoning: "Consistent models that combine current exploit data, like FIRST's Exploit Prediction Scoring System (EPSS), with your own systems' exposure tend to beat unaided judgment across hundreds of items, where intuition gets tired and inconsistent. Because it's updated daily from current exploit activity, it tracks attackers as they change rather than relying only on history. Expert review is still valuable on top, as Kahneman suggests in Chapter 21: score first, then use judgment.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "The scoring model", biasValue: 0, isBest: true },
            { text: "The engineer's ranking", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "sec-takeover-rates",
        biasType: "DENOMINATOR",
        title: "Account Takeover Rates",
        scenarioText: "Last year, Service A had 30 account-takeover incidents among its 3,000,000 users. Service B had 3 incidents among its 10,000 users. Which service had the higher rate of account takeovers?",
        bestAnswer: "Service B",
        reasoning: "Service A's rate is 1 in 100,000 users; Service B's is 3 in 10,000, which is 30 times higher. Thirty incidents sounds worse than three, but the count means little without the number of users behind it.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        options: [
            { text: "Service A", biasValue: 1, isBest: false },
            { text: "Service B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },

    // -------------------------------------------------------------
    // SOCIAL ENGINEERING AND DECEPTIVE INTERFACES (all in the short
    // version). Brands and people are fictional; mock screens are
    // rendered by the game.
    // -------------------------------------------------------------
    {
        id: "se-phishing-inbox",
        office: true,
        short: true,
        biasType: "PHISHING",
        title: "Sort Your Inbox",
        // Mail from any other domain gets the inbox's "External" tag
        internalDomain: "larkwood.com",
        scenarioText: "You work at Larkwood, whose email addresses all end in @larkwood.com. A few minutes ago you asked for a password reset on Larkwood's sign-in page. Sort these six emails: report the phishing ones, and keep the real ones.",
        inbox: [
            // The "а" in this address is Cyrillic (U+0430), so the domain only looks like larkwood.com
            { from: "Larkwood IT Service Desk", address: "it-support@l\u0430rkwood.com", realAddress: "it-support@xn--lrkwood-2fg.com", subject: "Action required: your mailbox is full", preview: "Your mailbox has exceeded its limit. Sign in within 24 hours to avoid losing incoming mail.", phish: true, why: "The address looks exactly like larkwood.com, but its \"а\" is the Cyrillic letter, not the Latin one, so it's a different domain that anyone could register. You can't see that by eye, but your inbox tagged it External, which a real larkwood.com address never would be. If you clicked through, your browser would show the domain as xn--lrkwood-2fg.com." },
            { from: "Priya Nair", address: "priya.nair@larkwood.com", subject: "Invitation: Q3 planning, Thursday 10:00", preview: "Priya Nair has invited you to Q3 planning in Conference Room B.", phish: false, why: "A routine meeting invitation from a colleague's real larkwood.com address, asking nothing unusual." },
            { from: "SignFlow", address: "no-reply@signflow-secure.co", subject: "Please review and sign: updated salary agreement", preview: "A document is waiting for your signature. Review it now.", phish: true, why: "An unexpected \"salary\" document from an unfamiliar service: curiosity bait with a sign-in link." },
            { from: "Larkwood Accounts", address: "accounts@larkwood.com", subject: "Your password reset request", preview: "You asked to reset your password a few minutes ago. Use this link within 15 minutes.", phish: false, why: "You asked for this reset minutes ago, and it comes from the real larkwood.com domain." },
            { from: "Jordan Lee", address: "jordan.lee.ceo.office@gmail.com", subject: "Quick favor: are you at your desk?", preview: "I need you to take care of something for me before my next meeting. Reply ASAP.", phish: true, why: "The CEO's name on a personal Gmail address, asking for a vague, urgent favor: classic business email compromise." },
            { from: "Larkwood HR", address: "hr@larkwood.com", subject: "Reminder: open enrollment ends Friday", preview: "Review your benefits choices on the HR portal before Friday at 5 p.m.", phish: false, why: "A routine HR reminder from the real domain that points you to a portal you already use." }
        ],
        bestAnswer: "Report emails 1, 3 and 5; keep emails 2, 4 and 6",
        reasoning: "The phishing emails each fail a basic check: the real sender address (not just the display name), whether you expected the message, and what it asks you to do. The real ones pass: they come from larkwood.com, you expected them or they're routine, and they ask nothing risky. Email 1 shows that even a perfect-looking address can be fake: one of its letters is Cyrillic. The External tag gave it away, since mail from your own company never gets one. Reporting everything isn't the goal either; a filter that flags real mail trains people to ignore it.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Every email sorted correctly", biasValue: 0, isBest: true },
            { text: "Some emails sorted incorrectly", biasValue: 1, isBest: false }
        ]
    },
    {
        // Only used as a retest, so a player who missed the first inbox gets a fresh one
        id: "se-phishing-inbox-home",
        office: true,
        retestOnly: true,
        // Preferred as the retest when the player missed this question
        retestFor: "se-phishing-inbox",
        biasType: "PHISHING",
        title: "Sort Your Home Inbox",
        scenarioText: "You bank with Northbridge Bank (northbridgebank.com), subscribe to StreamBox (streambox.com), and yesterday ordered a lamp from Hearthline (hearthline.com). Your friend Sam said they'd email you the photos from Saturday's hike. Sort these six emails: report the phishing ones, and keep the real ones.",
        inbox: [
            { from: "Northbridge Bank", address: "alerts@northbridgebank.com", subject: "Your October statement is ready", preview: "Your statement is available. Sign in to online banking to view it.", phish: false, why: "A routine notice from your bank's real domain that asks nothing unusual." },
            { from: "Parcelwise Delivery", address: "tracking@parcelwise-redelivery.info", subject: "We couldn't deliver your package", preview: "A $1.99 redelivery fee is due. Pay within 48 hours or your package will be returned.", phish: true, why: "A small \"fee\" from an unfamiliar courier's odd domain, timed to look like your order. It's after your card details." },
            { from: "Hearthline", address: "orders@hearthline.com", subject: "Your order has shipped", preview: "Your Arlo table lamp is on its way. Track it on hearthline.com.", phish: false, why: "You ordered the lamp yesterday, and this comes from the real hearthline.com." },
            { from: "Northbridge Security", address: "security@northbridge-bank-alerts.com", subject: "Unusual sign-in blocked", preview: "We blocked a sign-in from a new device. Confirm your identity within 12 hours to keep your account open.", phish: true, why: "Your bank's name on a different domain, northbridge-bank-alerts.com, with a deadline and a threat." },
            { from: "Sam Rivera", address: "sam.rivera@gmail.com", subject: "Photos from Saturday", preview: "Here are the hiking photos! Album link below.", phish: false, why: "Sam said they'd send these, and it's from Sam's usual address." },
            { from: "StreamBox", address: "billing@streambox.com.account-update.net", subject: "Payment declined: update your card", preview: "We couldn't process your payment. Update your card today to keep watching.", phish: true, why: "The address ends in account-update.net, not streambox.com; the real name at the start is the disguise." }
        ],
        bestAnswer: "Report emails 2, 4 and 6; keep emails 1, 3 and 5",
        reasoning: "The phishing emails each fail a basic check: the real sender domain (not just the name), whether you expected the message, and what it asks you to do. The real ones pass: they come from the right domains, you expected them or they're routine, and they ask nothing risky. When in doubt, go to the company's site or app yourself instead of using the email's link.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Every email sorted correctly", biasValue: 0, isBest: true },
            { text: "Some emails sorted incorrectly", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-ceo-wire",
        office: true,
        short: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "CEO Wire Request",
        scenarioText: "You work in finance at Larkwood (email domain larkwood.com). An email from \"Jordan Lee, CEO\" at jordan.lee@larkwood-corp.com says: \"I'm boarding a flight and can't talk. Please wire $48,500 to our new vendor today; details attached. Keep this between us until the deal is announced.\" What do you do?",
        bestAnswer: "Call the CEO or the finance lead on a number you already have",
        reasoning: "This is business email compromise, which the FBI's Internet Crime Complaint Center reports costs businesses billions of dollars a year. Every detail pushes you to skip checks: authority, urgency, secrecy, and a reason the boss can't be reached. The domain is also wrong (larkwood-corp.com). Replying to the email just reaches the attacker; verifying through a channel you already trust is what stops it.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984); FBI IC3 reports",
        options: [
            { text: "Send the wire", biasValue: 1, isBest: false },
            { text: "Reply to the email to confirm first", biasValue: 0.5, isBest: false },
            { text: "Call the CEO or the finance lead on a number you already have", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-help-desk-call",
        biasType: "AUTHORITY_PRESSURE",
        title: "Urgent Help Desk Call",
        scenarioText: "You work on Larkwood's IT help desk. A caller says she's Dana Ortiz, VP of Sales, stuck at an airport before a board presentation and locked out after getting a new phone. She knows her employee ID and her manager's name, and she's getting angry. She wants her multi-factor authentication reset right now. What do you do?",
        bestAnswer: "Call her back on the number in the company directory before resetting anything",
        reasoning: "Employee IDs and managers' names are easy to find or guess, and seniority plus anger plus a deadline are exactly what social engineers use to rush help desks. The 2023 MGM Resorts breach reportedly began with a call like this. A security question isn't much better, since answers like a mother's maiden name are often public. Calling back on a number you already have checks who is really asking.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Call her back on the number in the company directory before resetting anything", biasValue: 0, isBest: true },
            { text: "Reset it; she knows her employee ID", biasValue: 1, isBest: false },
            { text: "Ask her security question first", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "se-deepfake-call",
        office: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "Video Call Transfer",
        scenarioText: "On a video call, your CFO and two colleagues you recognize ask you to make 15 urgent transfers totaling $25 million for a confidential acquisition. Their faces and voices look and sound right. What do you do?",
        bestAnswer: "Verify through a separate channel you already trust before moving any money",
        reasoning: "In 2024 an employee of the engineering firm Arup transferred about $25 million after a video call in which the CFO and colleagues were deepfakes. Seeing and hearing someone is no longer proof it's them. An unusual, secret, urgent request for money calls for verification through a channel the requester doesn't control.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Make the transfers", biasValue: 1, isBest: false },
            { text: "Verify through a separate channel you already trust before moving any money", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-mfa-fatigue",
        office: true,
        short: true,
        biasType: "HABITUATION",
        title: "Late-Night Sign-In Prompts",
        scenarioText: "It's 1 a.m. and you aren't signing in to anything. Your phone has buzzed with sign-in approval requests for your work account four times in ten minutes, and then this text arrives. What do you tap?",
        mockScreen: {
            kind: "phone",
            time: "1:12 AM",
            stacked: "4 earlier sign-in requests",
            message: { from: "+1 (555) 014-2263", text: "Larkwood IT: we're fixing a sync error on your account. Approve the prompt and the alerts will stop." },
            heading: "Approve sign-in to Larkwood?",
            body: "Location: unknown · Device: Windows · Just now"
        },
        bestAnswer: "Report suspicious sign-in",
        reasoning: "Repeated prompts you didn't trigger mean someone already has your password and is trying to wear you down. This is called MFA fatigue or push bombing, and it's how attackers got into Uber in 2022, combined with a message pretending to be IT. Approving lets them in. Denying stops this attempt but leaves them with your password; reporting it gets the password reset and the attacker locked out.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (MFA fatigue)",
        options: [
            { text: "Approve", ui: "primary", label: "Approve", biasValue: 1, isBest: false },
            { text: "Deny", ui: "secondary", label: "Deny", biasValue: 0.5, isBest: false },
            { text: "Report suspicious sign-in", ui: "link", label: "Report suspicious sign-in", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-cert-warning",
        office: true,
        biasType: "HABITUATION",
        title: "Café Wi-Fi Warning",
        scenarioText: "You're on a café's Wi-Fi and open your bank's website, which you use every week. Instead of the sign-in page, you see this. You've clicked past warnings like it before and nothing bad happened. What do you do?",
        mockScreen: {
            kind: "browser",
            url: "https://www.northbridgebank.com",
            urlWarning: true,
            heading: "Your connection isn't private",
            body: "Someone may be trying to intercept your connection to www.northbridgebank.com and steal information like passwords, messages, or card numbers."
        },
        bestAnswer: "Back to safety",
        reasoning: "On public Wi-Fi, a certificate warning for a site you use every week is exactly what an interception attack looks like. Clicking past warnings before without consequences is outcome bias plus habituation: in Akhawe and Felt's 2013 study, users clicked through a large share of browser security warnings. Go back, and use your bank's app or a trusted network instead.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (Akhawe & Felt 2013)",
        options: [
            { text: "Back to safety", ui: "primary", label: "Back to safety", biasValue: 0, isBest: true },
            { text: "Advanced: proceed anyway", ui: "link", label: "Advanced: Proceed to www.northbridgebank.com (unsafe)", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-lookalike-url",
        office: true,
        short: true,
        biasType: "LOOKALIKES",
        title: "Which Address Is Real?",
        scenarioText: "Your bank is Northbridge Bank, at northbridgebank.com. An email asks you to sign in and review a payment. Which of these addresses actually belongs to your bank?",
        bestAnswer: "northbridgebank.com/login",
        reasoning: "What matters is the domain right before the first single slash. northbridgebank.com.account-review.net belongs to account-review.net. secure-northbridgebank.com is a different domain anyone could register. northbrídgebank.com uses an accented í that's easy to miss. System 1 reads familiar shapes, not exact letters, which is why lookalikes work. The safest habit is to type your bank's address yourself instead of following email links.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "northbridgebank.com.account-review.net/login", biasValue: 1, isBest: false },
            { text: "northbridgebank.com/login", biasValue: 0, isBest: true },
            { text: "secure-northbridgebank.com/login", biasValue: 1, isBest: false },
            { text: "northbrídgebank.com/login", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-typosquat-package",
        biasType: "LOOKALIKES",
        title: "Setup Script Package",
        scenarioText: "A teammate's setup script runs \"pip install requets\". The popular Python HTTP library everyone uses is \"requests\". What do you do?",
        bestAnswer: "Install \"requests\" instead and tell your teammate",
        reasoning: "Attackers regularly publish malicious packages on PyPI and npm with names one letter off popular ones, waiting for typos. Installing a package runs its code on your machine. A name that looks almost right is the warning sign, so fix the typo rather than trusting it.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Run the script as written", biasValue: 1, isBest: false },
            { text: "Install \"requests\" instead and tell your teammate", biasValue: 0, isBest: true },
            { text: "Install \"requets\" and check whether it works", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-parking-qr",
        office: true,
        biasType: "LOOKALIKES",
        title: "Parking Meter QR Code",
        scenarioText: "A city parking meter has a card reader and printed instructions for the city's parking app. Someone has stuck a sticker over part of the instructions with a QR code: \"Pay faster by phone: scan here.\" What do you do?",
        bestAnswer: "Pay with the city's official app or the payment method built into the meter",
        reasoning: "A QR code hides its destination until you've already opened it, and anyone can put a sticker on a meter. Fake parking QR codes leading to payment-stealing sites have been reported in many cities. Using the official app or the meter itself avoids the question of where the code goes.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Scan it and pay", biasValue: 1, isBest: false },
            { text: "Pay with the city's official app or the payment method built into the meter", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-cookie-banner",
        short: true,
        biasType: "DEFAULTS",
        title: "News Site Cookie Banner",
        scenarioText: "You're reading a news site and don't want advertisers tracking you. This banner covers the bottom of the page. What do you click?",
        mockScreen: {
            kind: "banner",
            brand: "DailyByte News",
            heading: "We value your privacy",
            body: "We and our 847 partners use cookies to personalize content and ads. By continuing to browse, you agree to our use of cookies."
        },
        bestAnswer: "Settings",
        reasoning: "There's no \"Reject\" button, and the small print says continuing to browse counts as agreeing, so closing the banner doesn't refuse anything. The only way to refuse is buried in Settings. Making refusal harder than acceptance is a dark pattern: in 2022 France's privacy regulator fined Google and Facebook a combined 210 million euros for it.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Accept all", ui: "primary", label: "Accept all", biasValue: 1, isBest: false },
            { text: "Settings", ui: "link", label: "Settings", biasValue: 0, isBest: true },
            { text: "Close the banner (×)", ui: "close", label: "×", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-oauth-consent",
        short: true,
        biasType: "FINE_PRINT",
        title: "Document Viewer Permissions",
        scenarioText: "A colleague's email links to a shared document. When you open it, you're asked to sign in with your work account, and then this appears. What do you click?",
        mockScreen: {
            kind: "dialog",
            brand: "Larkwood Sign-In",
            heading: "DocViewer Pro wants to access your Larkwood account",
            body: "This will allow DocViewer Pro to:",
            bullets: ["Read, compose, and send email from your account", "Permanently delete all your email", "See and download all your files"]
        },
        bestAnswer: "Cancel",
        reasoning: "Viewing one document never requires sending and deleting your email. This is consent phishing: instead of stealing your password, the attacker gets you to grant their app access, which survives a password change. In 2017 a fake \"Google Docs\" app spread this way to about a million Gmail users. Read what an app is asking for before you click Allow.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "Allow", ui: "primary", label: "Allow", biasValue: 1, isBest: false },
            { text: "Cancel", ui: "secondary", label: "Cancel", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-bundled-installer",
        biasType: "DEFAULTS",
        title: "Photo Editor Installer",
        scenarioText: "You're installing PhotoTool, a free photo editor you want. Partway through, the installer shows the screen below. What do you do?",
        mockScreen: {
            kind: "installer",
            brand: "PhotoTool Setup",
            step: "Step 2 of 3",
            heading: "Recommended: speed up your browsing",
            checkbox: "Install SpeedyBar and make SpeedySearch my homepage and default search engine (recommended)",
            buttons: ["Back", "Next"]
        },
        bestAnswer: "Don't install SpeedyBar: uncheck the box, or cancel the installation",
        reasoning: "The extra software is pre-selected and labeled \"recommended\" so that clicking Next, which most people do, installs it. Bundled toolbars and search hijackers spread largely through boxes like this one. Unchecking it gets you what you came for without the add-on. Cancelling is just as reasonable: an installer that tries to sneak in extras is a reason to distrust it, and you can look for the program from a source that doesn't bundle anything.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Click Next", biasValue: 1, isBest: false },
            { text: "Uncheck the SpeedyBar box, then click Next", biasValue: 0, isBest: true },
            { text: "Cancel the whole installation", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-scareware",
        office: true,
        short: true,
        biasType: "BAIT",
        title: "Virus Warning Pop-Up",
        scenarioText: "While browsing, a full-screen page appears with a loud alarm sound. What do you do?",
        mockScreen: {
            kind: "browser",
            url: "http://windows-security-alert.support-center.live",
            urlWarning: true,
            alarm: true,
            heading: "WARNING: Your computer is infected with 5 viruses!",
            body: "Your files and passwords are at risk. Do not close this window. Call Microsoft Certified Support immediately: 1-888-555-0147",
            buttons: ["Scan & Remove", "Call Support"]
        },
        bestAnswer: "Close the tab, or quit the browser if it won't close",
        reasoning: "A web page can't scan your computer, and Microsoft doesn't put phone numbers in pop-ups. This is a tech-support scam: fear and urgency get you to call, and the \"technician\" asks for remote access or payment. Closing the tab (or force-quitting the browser) ends it; the page itself is the only thing wrong.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals)",
        options: [
            { text: "Call the support number", biasValue: 1, isBest: false },
            { text: "Click Scan & Remove", biasValue: 1, isBest: false },
            { text: "Close the tab, or quit the browser if it won't close", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "se-sextortion",
        office: true,
        biasType: "BAIT",
        title: "Threatening Email",
        scenarioText: "An email says: \"I hacked your computer and recorded you through your webcam. Your password is Summer2019, proof I'm serious. Pay $1,200 in Bitcoin within 48 hours or I send the video to your contacts.\" Summer2019 is an old password you used years ago. What's most likely going on?",
        bestAnswer: "The password came from an old data breach, and the threat is a bluff",
        reasoning: "Waves of emails like this have used passwords leaked in old data breaches to seem convincing. The real password makes the whole story feel true, but it's the only evidence offered, and it doesn't show anyone was ever on your computer. Don't pay; change that password anywhere you still use it, and report the email.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Thinking, Fast and Slow - Chapter 7 (What You See Is All There Is)",
        options: [
            { text: "The password came from an old data breach, and the threat is a bluff", biasValue: 0, isBest: true },
            { text: "They hacked your computer and have a video", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "se-found-usb",
        office: true,
        biasType: "BAIT",
        title: "Parking Lot USB Drive",
        scenarioText: "In your office parking lot, you find a USB drive labeled \"Salaries 2026: CONFIDENTIAL.\" What do you do?",
        bestAnswer: "Hand it to IT or security without plugging it in",
        reasoning: "A dropped drive with a tempting label is a classic attack: plugging it in can run malicious code, and some devices pose as keyboards and type commands. In a 2016 study at the University of Illinois, people opened files on nearly half of the drives researchers scattered around campus. A personal computer isn't safe either; IT can examine it safely.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (Tischer et al. 2016)",
        options: [
            { text: "Hand it to IT or security without plugging it in", biasValue: 0, isBest: true },
            { text: "Plug it into your work laptop to find the owner", biasValue: 1, isBest: false },
            { text: "Plug it into a personal computer instead", biasValue: 1, isBest: false }
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
        bestAnswer: "Average",
        reasoning: "Charm and confidence are real strengths, but they say little about analytical quality. The halo effect lets one impressive trait raise your rating of unrelated ones. The blind-scored work sample is the direct evidence about the skill you are hiring for.",
        biasName: "Halo Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Excellent", biasValue: 1, isBest: false },
            { text: "Above average", biasValue: 0.5, isBest: false },
            { text: "Average", biasValue: 0, isBest: true }
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
            { text: "Skip the promotion", biasValue: 1, isBest: false },
            { text: "Run the promotion", biasValue: 0, isBest: true }
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
            { text: "Skip the protection on every package", biasValue: 0, isBest: true },
            { text: "Decide package by package", biasValue: 0.5, isBest: false },
            { text: "Buy the protection on every package", biasValue: 1, isBest: false }
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
        office: true,
        practiceOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Resetting Countdown",
        scenarioText: "An online course page says \"Price goes up in 15:00!\" with a ticking timer. You reload the page and the timer starts again at 15:00. What does this most likely tell you?",
        bestAnswer: "The timer probably isn't real",
        reasoning: "A real deadline does not reset when you reload. Timers that restart for each visitor exist only to create pressure. Researchers have found many like this on shopping sites.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "The timer probably isn't real", biasValue: 0, isBest: true },
            { text: "The price really will go up soon", biasValue: 1, isBest: false }
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
        scenarioText: "A \"Family Size\" 32 fl oz (946 mL) bottle of dish soap costs $6.40. Next to it, a 16 fl oz (473 mL) bottle of the same soap costs $2.99. Which is cheaper per ounce (or per millilitre)?",
        bestAnswer: "The 16 fl oz (473 mL) bottle",
        reasoning: "The small bottle costs about 18.7¢ per ounce (63¢ per 100 mL); the Family Size costs 20¢ per ounce (68¢ per 100 mL). Two small bottles ($5.98) beat one big one ($6.40) for the same amount of soap.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "The 32 fl oz (946 mL) Family Size", biasValue: 1, isBest: false },
            { text: "The 16 fl oz (473 mL) bottle", biasValue: 0, isBest: true },
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
        scenarioText: "A gym offers a $10 first month and lets you join online in two minutes. The contract says canceling requires a certified letter or an in-person visit during weekday business hours, when you're at work. Other nearby gyms with similar prices let you cancel online. You expect to stop going within a few months. What's the best move?",
        bestAnswer: "Look for a gym you can cancel online",
        reasoning: "The cheap first month is the bait; the hard cancellation is where the gym makes its money, because many people keep paying rather than deal with it. California now requires businesses to let customers cancel online if they signed up online, and the FTC has pursued companies over hard-to-cancel subscriptions.",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Look for a gym you can cancel online", biasValue: 0, isBest: true },
            { text: "Join this gym", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-anchor-pentest-quote",
        practiceOnly: true,
        biasType: "ANCHORING",
        title: "Penetration Test Quote",
        scenarioText: "A penetration-testing firm's first quote is $90,000. Three other reputable firms quote $28,000 to $35,000 for exactly the same scope. After you push back, the first firm offers $70,000, \"a huge discount.\" Is $70,000 a good deal?",
        bestAnswer: "No",
        reasoning: "The $90,000 opening quote is an anchor that makes $70,000 feel like a bargain. The independent quotes are the real benchmark, and $70,000 is about double them. Compare against the market, not against the first number you heard.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "Yes", biasValue: 1, isBest: false },
            { text: "No", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-base-malware-flag",
        practiceOnly: true,
        biasType: "BASE_RATE",
        title: "Malware Scanner Flag",
        scenarioText: "On your network, about 1 in every 1,000 files is malware. Your scanner catches 99% of malware, and it wrongly flags 2% of clean files. A file gets flagged. About how likely is it that it's actually malware?",
        bestAnswer: "About 5%",
        reasoning: "Errors run both ways: the scanner misses 1% of malware and wrongly flags 2% of clean files. Picture 1,000 files: 1 is malware and gets flagged. Of the 999 clean files, about 20 get flagged too. So about 21 flags, and only 1 is real: about 5%. With rare malware, false alarms outnumber true detections.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "About 99%", biasValue: 1, isBest: false },
            { text: "About 50%", biasValue: 0.5, isBest: false },
            { text: "About 5%", biasValue: 0, isBest: true },
            { text: "About 0.1%", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-avail-stolen-laptop",
        practiceOnly: true,
        biasType: "AVAILABILITY",
        title: "Stolen Laptop Scare",
        scenarioText: "Last week a colleague's laptop was stolen from their car, and everyone is talking about it. Your records show 1 stolen laptop in the past three years, but 40 incidents that started with phishing, and phishing attempts are still rising. Where should most of this year's extra security budget go?",
        bestAnswer: "Phishing defenses",
        reasoning: "A recent, vivid theft feels like the big risk, but your records show phishing causes far more incidents and is still growing. Laptops should still be encrypted, but the budget should follow where harm actually comes from.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Phishing defenses", biasValue: 0, isBest: true },
            { text: "Laptop locks and theft prevention", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-plan-auth-migration",
        practiceOnly: true,
        biasType: "PLANNING",
        title: "Sign-In System Migration",
        scenarioText: "Your team estimates that moving 30 internal services to a new sign-in system will take 3 months. Your last three migrations of similar size took 7, 9, and 8 months. What timeline should you plan for?",
        bestAnswer: "About 8 months",
        reasoning: "Three comparable migrations averaged about 8 months, so that's the outside view. The 3-month estimate assumes nothing goes wrong, which past projects show is unlikely.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "About 3 months", biasValue: 1, isBest: false },
            { text: "About 4 months", biasValue: 0.5, isBest: false },
            { text: "About 8 months", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-sunk-security-tool",
        practiceOnly: true,
        biasType: "SUNK_COST",
        title: "Unused Monitoring License",
        scenarioText: "Your company paid $250,000, nonrefundable, for a three-year license to a security monitoring tool. A year in, the team finds it so hard to use that most alerts are ignored. A different tool costs $60,000 a year, catches more threats in your trial, and the team prefers it. What do you do?",
        bestAnswer: "Switch to the better tool",
        reasoning: "The $250,000 is gone either way. Going forward, the choice is between a tool that mostly goes unused and one that catches more threats for $60,000 a year. Sticking with the first to \"get your money's worth\" is the sunk cost fallacy.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Keep using the tool you paid for", biasValue: 1, isBest: false },
            { text: "Switch to the better tool", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-small-tester-record",
        practiceOnly: true,
        biasType: "SMALL_NUMBERS",
        title: "Choosing a Penetration Tester",
        scenarioText: "Tester A found a critical vulnerability in their only engagement so far: a 100% success rate. Tester B found critical vulnerabilities in 40 of their 60 engagements: 67%. Who has the stronger track record?",
        bestAnswer: "Tester B",
        reasoning: "One engagement tells you very little; Tester A could easily have been lucky. Tester B's 67% comes from 60 engagements, which is solid evidence. A perfect record from a tiny sample is exactly the kind of extreme result small numbers produce.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Tester B", biasValue: 0, isBest: true },
            { text: "Tester A", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-regress-incident-month",
        practiceOnly: true,
        biasType: "REGRESSION",
        title: "After the Worst Month",
        scenarioText: "After the month with the most production incidents in two years, your team added a new code-review rule. The next month, incidents dropped back to their usual level. Does this show the rule worked?",
        bestAnswer: "Not yet",
        reasoning: "An unusually bad month is often partly bad luck, so the next month tends to look more ordinary no matter what you change. That's regression to the mean. Judge the rule over several months, ideally against teams or periods without it.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 17",
        options: [
            { text: "Yes", biasValue: 1, isBest: false },
            { text: "Not yet", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-fineprint-cloud-storage",
        practiceOnly: true,
        biasType: "FINE_PRINT",
        title: "Cloud Storage Offer",
        scenarioText: "An ad says: \"1 TB of cloud storage for $1/month*.\" The fine print says: \"*First year only. Then $9.99/month, billed annually.\" About how much will two years cost?",
        bestAnswer: "About $132",
        reasoning: "The first year costs $12. The second year costs $119.88, charged all at once. Two years come to about $132, more than five times what \"$1/month\" suggests.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "About $24", biasValue: 1, isBest: false },
            { text: "About $132", biasValue: 0, isBest: true },
            { text: "About $240", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "practice-adaptive-phishing-filter",
        practiceOnly: true,
        biasType: "ADAPTIVE_ADVERSARY",
        title: "Email Filter Forecast",
        scenarioText: "Last year your email filter caught 99.5% of phishing messages. Phishers have now started using AI-written emails that avoid the patterns your filter learned from. Should you expect the filter to catch 99.5% again next year?",
        bestAnswer: "No, expect it to catch less",
        reasoning: "The 99.5% describes how the filter did against last year's attacks. Attackers have changed their methods specifically to get past filters like yours, so the old success rate no longer applies. Plan for more phishing getting through, and retrain or update the filter.",
        biasName: "Assuming the Past Predicts Attacks",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "No, expect it to catch less", biasValue: 0, isBest: true },
            { text: "Yes", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-phishing-shared-file",
        office: true,
        practiceOnly: true,
        biasType: "PHISHING",
        title: "Expected Shared File",
        scenarioText: "Your colleague Priya told you this morning that she'd share the budget spreadsheet. An hour later an email arrives from priya.nair@larkwood.com (your company's real domain) saying she shared \"Q3 budget\" with you, with a link to your company's usual file-sharing site. Is this email safe to open?",
        bestAnswer: "Yes; it's expected and from the real domain",
        reasoning: "It passes every check: you were told it was coming, it's from a colleague's real larkwood.com address, and the link goes to the file-sharing site you already use. Spotting phishing means checking, not treating every email as an attack.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Yes; it's expected and from the real domain", biasValue: 0, isBest: true },
            { text: "No; report it as phishing", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-authority-bank-change",
        office: true,
        practiceOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "Supplier Bank Change",
        scenarioText: "An email from your long-time supplier's usual address says their bank has changed, and asks you to send this month's $36,000 payment to a new account number, today if possible. What do you do?",
        bestAnswer: "Call the supplier on a number you already have before paying",
        reasoning: "Changed bank details are one of the most common payment-fraud tricks, and the real supplier's mailbox may have been taken over, so the right address proves nothing. Confirming by phone on a number from your own records is the standard check.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Pay the new account", biasValue: 1, isBest: false },
            { text: "Call the supplier on a number you already have before paying", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-lookalike-sender",
        office: true,
        practiceOnly: true,
        biasType: "LOOKALIKES",
        title: "Payment Service Sender",
        scenarioText: "You pay your bills through PayStream (paystream.com). This email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "PayStream Support",
            address: "support@paystream-help.com",
            to: "you@example.com",
            subject: "Your account is on hold",
            body: [
                "Hi,",
                "We noticed unusual activity on your PayStream account, so we've placed it on hold. Please review your account to restore access.",
                "PayStream Support"
            ],
            button: "Review my account",
            linkPreview: "https://paystream-help.com/account/review"
        },
        bestAnswer: "Check your account in the PayStream app or at paystream.com",
        reasoning: "The email comes from paystream-help.com, not paystream.com. Those are different domains, and anyone can register the first one. A familiar name inside an address is exactly what lookalike domains rely on. Checking through the app or a site you type yourself is safe whether the email is real or not.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Click \"Review my account\" to restore access", biasValue: 1, isBest: false },
            { text: "Check your account in the PayStream app or at paystream.com", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "practice-habituation-admin-prompt",
        office: true,
        practiceOnly: true,
        biasType: "HABITUATION",
        title: "Unexpected Permission Prompt",
        scenarioText: "While you're reading email, your laptop asks: \"Allow UpdateHelper to make changes to your device?\" You didn't open or install anything called UpdateHelper. What do you click?",
        bestAnswer: "No",
        reasoning: "Permission prompts appear so often that people click Yes by reflex. A prompt for software you didn't start is the one to stop on: saying yes would give it full control of the laptop. Click No and tell IT.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (Akhawe & Felt 2013)",
        options: [
            { text: "No", biasValue: 0, isBest: true },
            { text: "Yes", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "practice-bait-prize-text",
        office: true,
        practiceOnly: true,
        biasType: "BAIT",
        title: "Gift Card Text",
        scenarioText: "A text message says: \"Congratulations! Your phone carrier has selected you for a $500 gift card. Claim within 24 hours: [link].\" What do you do?",
        bestAnswer: "Delete it, or report it as spam",
        reasoning: "A surprise prize with a deadline is bait: excitement and urgency get you to tap before you check. Carriers don't hand out gift cards through random texts, and the link usually leads to a page that collects personal or card details.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals; Tischer et al. 2016)",
        options: [
            { text: "Tap the link to claim it", biasValue: 1, isBest: false },
            { text: "Delete it, or report it as spam", biasValue: 0, isBest: true }
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
        office: true,
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
        office: true,
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
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Used Car Listing",
        scenarioText: "A used car is listed at $12,000. Three independent pricing guides value that model, mileage, and condition at $11,500 to $12,500, and your mechanic found nothing wrong with it. Is the listing price reasonable?",
        bestAnswer: "Yes",
        reasoning: "An anchor is a problem when it's arbitrary or inflated. This listing price is backed by three independent valuations and an inspection, so it's real information. Treating every asking price as a trick would have you lowball a fair deal.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 11 & 22",
        options: [
            { text: "Yes", biasValue: 0, isBest: true },
            { text: "No; offer about $8,000", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-finish-course",
        office: true,
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
            { text: "Quit the course", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-cars-sharks",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Road Versus Ocean Risk",
        scenarioText: "Which kills more people in the United States in a typical year: car crashes or shark attacks?",
        bestAnswer: "Car crashes",
        reasoning: "Car crashes kill around 40,000 Americans a year; shark attacks kill about one. Vivid news can make rare risks feel common, but that doesn't mean the common-sense answer is always wrong. Here it's right.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 13 & 22",
        options: [
            { text: "Car crashes", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 1, isBest: false },
            { text: "Shark attacks", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-big-sample-reviews",
        office: true,
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
        // The id is kept so saved sessions still load
        filler: true,
        short: true,
        biasType: "STRAIGHTFORWARD",
        title: "Penetration Test Timeline",
        scenarioText: "Leadership wants a date for the annual penetration test of your payment system. Your team's estimate is 8 weeks, which they got by looking at the last five tests with the same firm and the same scope: those took 7, 8, 9, 8, and 8 weeks. What timeline do you give?",
        bestAnswer: "About 8 weeks",
        reasoning: "The planning fallacy comes from estimating with the inside view, picturing how this project should go. This estimate already uses the outside view: five nearly identical past tests that averaged 8 weeks with little variation. Adding a big buffer on top would correct for a mistake the team didn't make. Padding every estimate isn't the lesson; checking where the estimate came from is.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 23",
        options: [
            { text: "About 6 weeks", biasValue: 1, isBest: false },
            { text: "About 8 weeks", biasValue: 0, isBest: true },
            { text: "About 12 weeks", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-coffee-size",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Morning Coffee Order",
        scenarioText: "A café sells a 12 oz (355 mL) coffee for $3.00 and a 24 oz (710 mL) coffee for $3.50. You want a lot of coffee and will drink all of it. Which is the better value for you?",
        bestAnswer: "The 24 oz (710 mL) coffee",
        reasoning: "Twice the coffee for 50 cents more, and you want it all. Upselling is only a trap when you're paying for more than you need; here the bigger size is simply the better deal.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "The 12 oz (355 mL) coffee", biasValue: 1, isBest: false },
            { text: "The 24 oz (710 mL) coffee", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-big-risk-cut",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Treatment Risk Reduction",
        scenarioText: "A treatment's ad says it \"cuts the risk of complications in half.\" In the trial, complications fell from 40 in every 100 patients to 20 in every 100. Is that a large benefit?",
        bestAnswer: "Yes",
        reasoning: "Relative-risk claims are misleading when the starting risk is tiny. Here it isn't: the risk fell by 20 percentage points, so about 1 in every 5 patients avoids a complication. That's a big absolute benefit.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "Yes", biasValue: 0, isBest: true },
            { text: "No", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-real-scarcity",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Last-Minute Flight",
        scenarioText: "You need to fly tomorrow. You've watched this route for two weeks and today's fare is the lowest you've seen. The airline's seat map shows only 2 seats left. Do you book now?",
        bestAnswer: "Book now",
        reasoning: "You've already compared prices for two weeks, the flight is tomorrow, and the seat map is the airline's own inventory, not a marketing banner. Real scarcity exists. Waiting here risks missing the flight or paying more.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "Wait and compare more", biasValue: 1, isBest: false },
            { text: "Book now", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-family-size",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Pasta Sauce Sizes",
        scenarioText: "A 40 oz (1.13 kg) \"family size\" jar of pasta sauce costs $6.00. A 20 oz (567 g) jar of the same sauce costs $4.00. Which is cheaper per ounce (or per gram)?",
        bestAnswer: "The 40 oz (1.13 kg) family size",
        reasoning: "The family size costs 15¢ per ounce (53¢ per 100 g) and the small jar 20¢ per ounce (71¢ per 100 g). Bigger packages aren't always cheaper per unit, but this one is. Checking the unit price is the habit; it doesn't mean the big size is always a trick.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Consumer protection research (unit pricing)",
        options: [
            { text: "The 20 oz (567 g) jar", biasValue: 1, isBest: false },
            { text: "The 40 oz (1.13 kg) family size", biasValue: 0, isBest: true },
            { text: "They're the same", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-ruinous-bet",
        office: true,
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
            { text: "Take the bet", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-surgeon-record",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Choosing a Surgeon",
        scenarioText: "Surgeon A has the lowest complication rate in the hospital over 10 years and more than 1,000 procedures, and is also warm and easy to talk to. Surgeon B's complication rate is above the hospital average. Which surgeon do you choose?",
        bestAnswer: "Surgeon A",
        reasoning: "The decision rests on the track record, which strongly favors Surgeon A. Being likable doesn't make A's record less real. The halo effect is when a pleasant trait stands in for evidence, not when the evidence and the pleasant trait happen to agree.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 7 & 22",
        options: [
            { text: "Surgeon B", biasValue: 1, isBest: false },
            { text: "Surgeon A", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-reckless-driving",
        office: true,
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
            { text: "Can't say", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-honest-chart",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Battery Bar Chart",
        scenarioText: "A bar chart's vertical axis starts at 0 hours. Phone A's battery bar is twice as tall as Phone B's. The labels say Phone A lasts 20 hours and Phone B lasts 10. Does Phone A last about twice as long?",
        bestAnswer: "Yes",
        reasoning: "With the axis starting at zero, bar heights are proportional to the values, and the labels confirm it: 20 hours is twice 10. Charts mislead when the axis is cut off; this one isn't.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "No", biasValue: 1, isBest: false },
            { text: "Yes", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-clear-urns",
        office: true,
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
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Home Fire Insurance",
        scenarioText: "Your home is most of your wealth. Standard fire insurance costs about 0.3% of its value per year, and losing the house uninsured would wipe you out financially. Do you buy the insurance?",
        bestAnswer: "Buy the insurance",
        reasoning: "Insurance loses money on average, which is why small warranties are usually a bad deal. But protecting against a loss you couldn't recover from is exactly what insurance is for. The certainty effect is overpaying to remove small, affordable risks; this one is neither small nor affordable.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 29",
        options: [
            { text: "Skip the insurance", biasValue: 1, isBest: false },
            { text: "Buy the insurance", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-license-conjunction",
        // Now a conjunction-fallacy question (the id is kept so saved sessions still load)
        biasType: "REPRESENTATIVENESS",
        title: "Neighbor's Driving Record",
        scenarioText: "Your neighbor Dana loves driving fast, owns a Ferrari, and gets speeding tickets every few months. Which is more probable?",
        bestAnswer: "Dana has a driver's license",
        reasoning: "Every person who has a license and owns a red car also has a license, so the second statement can never be more probable than the first. The Ferrari and the speeding tickets make \"owns a red car\" feel likely, since so many Ferraris are red, but adding a detail can only lower the probability. This is the same conjunction fallacy as the Linda problem.",
        biasName: "Representativeness & Conjunction Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 15",
        options: [
            { text: "Dana has a driver's license", biasValue: 0, isBest: true },
            { text: "Dana has a driver's license and owns a red car", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-good-default",
        office: true,
        filler: true,
        biasType: "STRAIGHTFORWARD",
        title: "Automatic Savings Enrollment",
        scenarioText: "Your employer automatically enrolled you in its retirement plan at 5% of your salary, with a 50% match. You have an emergency fund and no high-interest debt. What do you do?",
        bestAnswer: "Stay enrolled",
        reasoning: "Defaults can be designed for the company's benefit or for yours. This one is in your interest: the match is free money and your finances can support saving. Questioning defaults is wise; rejecting a good one on principle isn't.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapters 22 & 34",
        options: [
            { text: "Opt out", biasValue: 1, isBest: false },
            { text: "Stay enrolled", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "straight-chess-skill",
        office: true,
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
            { text: "Close to an average player", biasValue: 1, isBest: false },
            { text: "Much worse than this year", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-drive-failures",
        filler: true,
        short: true,
        biasType: "STRAIGHTFORWARD",
        title: "Data Center Drive Spares",
        scenarioText: "For six years, about 1.5% of the hard drives in your data center have failed each year, with little change from year to year. You run 4,000 drives. Roughly how many replacement drives should you plan for next year?",
        bestAnswer: "About 60",
        reasoning: "Here history is a good forecast: 1.5% of 4,000 is 60. Drive failures come from wear and manufacturing variation, not from an opponent changing tactics to beat your plan. That's the difference from attack data, where adversaries adapt. Past rates predict best in stable environments like this one.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "About 60", biasValue: 0, isBest: true },
            { text: "About 400", biasValue: 1, isBest: false },
            { text: "None until drives actually start failing", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-exploited-patch",
        filler: true,
        short: true,
        biasType: "STRAIGHTFORWARD",
        title: "Actively Exploited Flaw",
        scenarioText: "Your vendor has released a patch for a vulnerability that attackers are actively exploiting. Your systems are affected, and the patch installed cleanly on your test machines. Should you apply it promptly?",
        bestAnswer: "Yes, apply it promptly",
        reasoning: "Every signal points the same way: the threat is real and current, you're exposed, and the fix has tested cleanly. Not every security decision is a trap; when the evidence is this clear, the obvious answer is right.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "Yes, apply it promptly", biasValue: 0, isBest: true },
            { text: "Wait a few months to see if problems turn up", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "straight-requested-reset",
        office: true,
        filler: true,
        short: true,
        biasType: "STRAIGHTFORWARD",
        title: "Expected Reset Email",
        scenarioText: "You just asked for a password reset on your bank's website, which you typed into the browser yourself. Thirty seconds later an email arrives from the bank's usual address, with a reset link to the bank's own domain. Should you use it?",
        bestAnswer: "Yes, use it",
        reasoning: "You started this yourself moments ago, the sender is the bank's usual address, and the link goes to the bank's real domain. Suspicion is the right default for unexpected messages; an expected one that passes every check is fine to use.",
        biasName: "Second-Guessing the Obvious",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "No, report it as phishing", biasValue: 1, isBest: false },
            { text: "Yes, use it", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // RETEST-ONLY QUESTIONS: never planned or used for practice, so a
    // topic the player missed gets a question they haven't seen
    // -------------------------------------------------------------
    {
        id: "retest-phishing-1",
        office: true,
        retestOnly: true,
        biasType: "PHISHING",
        title: "Manager's Org Chart Email",
        scenarioText: "You work at Larkwood, whose email addresses all end in @larkwood.com. Your manager is Mara Chen. You weren't expecting anything from her today, and this email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Mara Chen",
            address: "mara.chen.larkwood@outlook.com",
            to: "you@larkwood.com",
            subject: "Updated org chart (please review before Friday)",
            body: [
                "Hi,",
                "I've shared the updated org chart with a few people on the team. Please sign in to view it and let me know if anything looks wrong before it goes out on Friday.",
                "Thanks,\nMara"
            ],
            button: "View document",
            linkPreview: "https://docshare-viewer.net/larkwood/orgchart"
        },
        bestAnswer: "Report it as phishing",
        reasoning: "The email fails two of the three basic checks: it comes from a personal outlook.com address rather than larkwood.com, and it wasn't expected. What it asks, signing in on an unfamiliar document site, is how passwords get stolen. Replying goes to whoever controls that outlook.com address, so it can't tell you whether Mara sent it. Reporting it lets your security team warn the others who probably got the same message.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Click \"View document\" and sign in", biasValue: 1, isBest: false },
            { text: "Reply and ask Mara whether she sent it", biasValue: 0.5, isBest: false },
            { text: "Report it as phishing", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-authority-pressure-1",
        retestOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "Security Chief Chat Request",
        scenarioText: "A direct message arrives in Larkwood's team chat from an account named \"Rafael Ortiz, Chief Security Officer.\" It says: \"We're in the middle of a compliance audit and I need your API token for the billing service in the next 10 minutes. Don't mention this in public channels.\" You've never talked with Rafael before. What do you do?",
        bestAnswer: "Contact the security team through the channel listed on the intranet",
        reasoning: "A senior title, a short deadline, and a request for secrecy are the classic levers for getting someone to skip checks. Anyone can set a chat display name, and a compromised or guest account can look like an internal one. Asking the account to prove itself just lets the person behind it answer. Checking through a channel you already trust confirms who is asking, and a real audit will survive the delay.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Contact the security team through the channel listed on the intranet", biasValue: 0, isBest: true },
            { text: "Ask him in the chat to confirm who he is, then send it", biasValue: 0.5, isBest: false },
            { text: "Send the token", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-authority-pressure-2",
        office: true,
        retestOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "General Counsel Data Request",
        scenarioText: "You manage Larkwood's customer database. An email from the general counsel's usual larkwood.com address says: \"We're facing urgent litigation. Export the full customer list with emails and phone numbers and send it to our outside lawyer at k.marsh.legal@gmail.com by end of day. This is privileged; don't discuss it with anyone.\" What do you do?",
        bestAnswer: "Call the general counsel on a number you already have before sending anything",
        reasoning: "The right sender address doesn't prove much, since mailboxes get taken over. Everything else here, the authority, the deadline, the secrecy, and an outside personal address for sensitive data, is what an impersonator would write. Protecting the file with a password still hands the data to whoever is asking. A short call on a number from your own records settles it, and a real lawyer will understand.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Send the export as asked", biasValue: 1, isBest: false },
            { text: "Call the general counsel on a number you already have before sending anything", biasValue: 0, isBest: true },
            { text: "Send the export as a password-protected file", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-lookalikes-1",
        office: true,
        retestOnly: true,
        biasType: "LOOKALIKES",
        title: "VPN Guide Link in Chat",
        scenarioText: "In a busy team chat channel, someone you don't know posts: \"New VPN setup steps for everyone: https://docs.larkwood.com/vpn-setup\". When you hover over the link, your browser's status bar shows https://larkwood-docs.pages-share.net/vpn-setup. What do you do?",
        bestAnswer: "Open docs.larkwood.com yourself and look for the VPN guide",
        reasoning: "The text of a link and where it goes are separate, and only the destination counts. larkwood-docs.pages-share.net belongs to pages-share.net, not Larkwood, even though the visible text names the real site. System 1 reads the familiar words and moves on. Going to the documentation site yourself gets you the real guide if it exists, without trusting the link at all.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Open docs.larkwood.com yourself and look for the VPN guide", biasValue: 0, isBest: true },
            { text: "Click the link", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-lookalikes-2",
        retestOnly: true,
        biasType: "LOOKALIKES",
        title: "Dependency Source Change",
        scenarioText: "You're reviewing a pull request titled \"Bump auth library to 2.4.1.\" Besides the version number, the diff changes the library's source from github.com/larkwood/auth-lib to github.com/1arkwood/auth-lib. All the automated tests pass. What do you do?",
        bestAnswer: "Hold the pull request and ask the author about the source",
        reasoning: "1arkwood starts with the digit one, not the letter l, so it's a different account that anyone could create. A copy of the library there could pass every test and still contain a backdoor. Passing tests show the code works, not who wrote it. Cognitive ease makes a familiar-looking name feel checked when it hasn't been; reading it letter by letter is the check.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Approve it, since the tests pass", biasValue: 1, isBest: false },
            { text: "Hold the pull request and ask the author about the source", biasValue: 0, isBest: true },
            { text: "Approve it and review the library's code next sprint", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-habituation-1",
        office: true,
        retestOnly: true,
        biasType: "HABITUATION",
        title: "Password Manager Won't Fill",
        scenarioText: "Your password manager normally fills in your Larkwood sign-in automatically. Every few weeks it glitches, and you copy and paste the password by hand. Today you click a link in an email about a benefits survey. The sign-in page looks exactly like Larkwood's, but the password manager doesn't offer your saved login. What do you do?",
        bestAnswer: "Close the page and find the survey through the HR portal",
        reasoning: "Password managers match logins to the exact domain, so a manager that stays quiet on a familiar-looking page is often a sign the page isn't the real site. Because the glitch has happened before, pasting the password feels routine, and that habit is what turns the warning into noise. Going to the HR portal yourself works whether the survey is real or not.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (Akhawe & Felt 2013)",
        options: [
            { text: "Copy the password from the manager and paste it in", biasValue: 1, isBest: false },
            { text: "Close the page and find the survey through the HR portal", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-habituation-2",
        retestOnly: true,
        biasType: "HABITUATION",
        title: "Changed Server Fingerprint",
        scenarioText: "Your team rebuilds its test servers often, so you've seen SSH's warning that a server's host key has changed many times. Usually you delete the old key and reconnect. Today you're on hotel Wi-Fi, connecting to the production database server, and you get the same warning. Nobody has announced any work on that server. What do you do?",
        bestAnswer: "Disconnect and check with the team that runs the server",
        reasoning: "A changed host key means the machine answering isn't the one you connected to before. On test servers that's usually a rebuild, which is why the warning has become background noise. On a production server with no announced work, over a network you don't control, it's exactly what an interception attack looks like. Connecting and then changing your password would already have handed over your credentials.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (Akhawe & Felt 2013)",
        options: [
            { text: "Disconnect and check with the team that runs the server", biasValue: 0, isBest: true },
            { text: "Delete the old key and reconnect", biasValue: 1, isBest: false },
            { text: "Connect, then change your password afterward", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-bait-1",
        office: true,
        retestOnly: true,
        biasType: "BAIT",
        title: "Copyright Complaint Attachment",
        scenarioText: "Larkwood's general contact inbox, which you monitor, receives an email from a photographer: \"Your website uses my photos without a license. I will file a lawsuit within 72 hours unless this is resolved. The images and proof of ownership are in the attached file, Evidence_Photos.zip.\" What do you do?",
        bestAnswer: "Forward it to IT or security without opening the attachment",
        reasoning: "Fake legal threats with an evidence file attached are a common way to deliver malware: fear of a lawsuit makes people open the file to see what they did wrong. Nothing in the email is evidence until someone checks it safely. Replying confirms the inbox is watched and starts a conversation on the sender's terms. IT can examine the attachment safely, and legal can handle any real complaint.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals; Tischer et al. 2016)",
        options: [
            { text: "Open the file to see which photos they mean", biasValue: 1, isBest: false },
            { text: "Reply and ask which photos they mean", biasValue: 0.5, isBest: false },
            { text: "Forward it to IT or security without opening the attachment", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-bait-2",
        retestOnly: true,
        biasType: "BAIT",
        title: "Take-Home Coding Test",
        scenarioText: "A recruiter from a company you've never heard of messages you about a remote job paying far more than you make now. The next step is a take-home test: clone their repository, then run npm install and npm start, and send them the output today. You only have your work laptop and your personal laptop with you. What do you do?",
        bestAnswer: "Don't run their code on either laptop",
        reasoning: "Fake job offers with a coding test are a known way to get developers to run malicious code: installing a project's packages can run whatever scripts it contains. A tempting salary and a same-day deadline are there to make you skip that thought. A personal laptop isn't a safe place either, since it holds your own passwords and accounts. A real employer can offer a test that doesn't require running their code on your machine.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals; Tischer et al. 2016)",
        options: [
            { text: "Run it on your work laptop", biasValue: 1, isBest: false },
            { text: "Run it on your personal laptop", biasValue: 1, isBest: false },
            { text: "Don't run their code on either laptop", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-adaptive-adversary-1",
        retestOnly: true,
        biasType: "ADAPTIVE_ADVERSARY",
        title: "Attack Origin Allowlist",
        scenarioText: "Over the past year, every automated password-guessing attack on your login page came from IP addresses in three countries. A colleague proposes blocking those three countries and turning off rate limiting and bot detection for traffic from everywhere else. Is that a good plan?",
        bestAnswer: "No",
        reasoning: "The history shows where attackers came from while those routes worked. Attackers can rent servers and home internet connections in almost any country, and once three are blocked they will simply move. Turning off the other checks would leave nothing in place when they do. Past data is a fine baseline for something like server load, which isn't trying to beat you; for attacks it describes yesterday's tactics, not tomorrow's.",
        biasName: "Assuming the Past Predicts Attacks",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "No", biasValue: 0, isBest: true },
            { text: "Yes", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-adaptive-adversary-2",
        retestOnly: true,
        biasType: "ADAPTIVE_ADVERSARY",
        title: "Which Forecast to Trust",
        scenarioText: "You have last year's numbers for two things in your company's data center, and nothing major about either has changed: the share of hard drives that failed (same drive models, similar ages), and the share of phishing emails that got past your email filter. Which is last year's number more likely to predict well for next year?",
        bestAnswer: "The hard drive failure rate",
        reasoning: "Hard drives fail through wear, and wear doesn't study your defenses, so a stable fleet's past failure rate is a good forecast. Phishers do study filters: they watch what gets blocked and change their messages until they get through, so last year's pass-through rate is a baseline, not a forecast. Kahneman's point is that past experience predicts well only in a regular environment, and an opponent who adapts makes the environment irregular.",
        biasName: "Assuming the Past Predicts Attacks",
        bookRef: "Thinking, Fast and Slow - Chapter 22",
        options: [
            { text: "The hard drive failure rate", biasValue: 0, isBest: true },
            { text: "The phishing pass-through rate", biasValue: 1, isBest: false },
            { text: "Both about equally", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-roach-motel-1",
        retestOnly: true,
        biasType: "ROACH_MOTEL",
        title: "Cloud Storage Exit Chat",
        scenarioText: "You've moved all your files from CloudVault, which costs $12 a month, to another service and want to close the account. CloudVault has no cancel button; you have to chat with an agent. After 20 minutes, the agent offers 40% off if you sign up for another year, and warns that closing deletes your files permanently. What do you do?",
        bestAnswer: "Tell the agent to close the account now",
        reasoning: "Your files are already somewhere else, so the warning about deletion changes nothing. The discount would still cost about $86 for a year of a service you won't use. Forcing a long chat, then offering a deal and a scary warning, is designed to wear you down until staying feels easier. Once you've decided, the retention offer is an obstacle, not new information.",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Accept the 40% off for another year", biasValue: 1, isBest: false },
            { text: "Tell the agent to close the account now", biasValue: 0, isBest: true },
            { text: "Leave the chat and cancel another day", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-roach-motel-2",
        retestOnly: true,
        biasType: "ROACH_MOTEL",
        title: "Domain Transfer Phone Call",
        scenarioText: "Your company keeps 10 domains at a registrar that charges $40 per domain each year. Another reputable registrar charges $12. To move them, you need transfer codes, which your current registrar gives out only by phone. After a 40-minute hold, the agent offers to lower your price to $30 per domain if you stay. What do you do?",
        bestAnswer: "Get the transfer codes and move the domains",
        reasoning: "Staying at $30 costs $300 a year; moving costs $120, so you save $180 every year after the one-time hassle. The phone-only codes and long hold are there to make leaving feel harder than it is, and the discount is timed for the moment you're most tired of waiting. A price cut that still leaves you paying more than twice as much isn't a reason to stay.",
        biasName: "Hard-to-Cancel Subscriptions",
        bookRef: "Dark patterns research (Brignull; FTC v. Amazon 2023)",
        options: [
            { text: "Accept the $30 price and stay", biasValue: 1, isBest: false },
            { text: "Get the transfer codes and move the domains", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-defaults-1",
        retestOnly: true,
        biasType: "DEFAULTS",
        title: "Laptop Update Policy",
        scenarioText: "You manage 2,000 company laptops and must pick an update policy. Policy A installs security updates automatically overnight; users can postpone one if they choose. Policy B shows a notice when an update is ready, and users install it when they choose. Everything else is the same. Under which policy will more laptops have the latest security update a month later?",
        bestAnswer: "Policy A",
        reasoning: "Both policies let users do either thing; they differ only in what happens if a user does nothing, and most users do nothing. Under Policy A doing nothing means patched, and under Policy B it means unpatched until someone gets around to it. Kahneman describes the same effect with organ donation: an opt-out default produces far higher participation than an opt-in one.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Policy A", biasValue: 0, isBest: true },
            { text: "Policy B", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-defaults-2",
        retestOnly: true,
        biasType: "DEFAULTS",
        title: "Crash Reporter Settings",
        scenarioText: "You're adding a crash-reporting library to your company's mobile app. You only need crash reports. The library's standard configuration, which the setup guide tells you to copy, also sends each user's device ID and location to the library maker's advertising partners. Your app's privacy policy says you don't share data with advertisers. What do you do?",
        bestAnswer: "Turn off the partner sharing in the configuration before shipping",
        reasoning: "The standard configuration reflects what the library maker wants, not what your app needs. Shipping it unchanged would share users' data with advertisers and break your own privacy policy, and rewriting the policy to match would only disclose the sharing, not stop it. Defaults get copied as-is far more often than they get read, which is why it pays to check what they turn on.",
        biasName: "Default Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Ship with the standard configuration", biasValue: 1, isBest: false },
            { text: "Ship with the standard configuration and update the privacy policy", biasValue: 0.5, isBest: false },
            { text: "Turn off the partner sharing in the configuration before shipping", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-fake-urgency-1",
        office: true,
        retestOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Password Manager Checkout",
        scenarioText: "You're choosing a password manager for your family and found one with good reviews. Its checkout page shows \"68% off ends in 09:57\" with a ticking timer, and \"Only 4 discounted plans left today.\" You haven't compared it with any other password manager yet. What do you do?",
        bestAnswer: "Compare it with other password managers first",
        reasoning: "You can't check the timer or the count, and studies of shopping sites have found many such timers and stock claims were fake. A password manager is something you'll use for years, so a few minutes of comparison matters more than a discount that may well still be there tomorrow. The countdown exists to make you decide before you think it through.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Buy it before the timer runs out", biasValue: 1, isBest: false },
            { text: "Compare it with other password managers first", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-fake-urgency-2",
        retestOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Code Host Suspension Notice",
        scenarioText: "You keep your open-source projects on CodeHarbor (codeharbor.com). This email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "CodeHarbor Trust & Safety",
            address: "trust@codeharbor.com",
            to: "you@example.com",
            subject: "Your account will be suspended in 2 hours",
            body: [
                "Hello,",
                "A repository on your account was reported for a policy violation. Unless you file an appeal within 2 hours, your account and all its repositories will be suspended.",
                "CodeHarbor Trust & Safety"
            ],
            button: "File an appeal",
            linkPreview: "https://codeharbor-appeals.com/case/88214"
        },
        bestAnswer: "Sign in to CodeHarbor yourself and check for notices",
        reasoning: "The two-hour deadline and the threat to everything you've built are there to make you click before you look. Sender addresses are easy to fake, and the button goes to codeharbor-appeals.com, not codeharbor.com. A real violation will show up when you sign in to the site yourself, so checking there costs a minute and is safe whether the email is real or not. Replying could reach the attacker.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Click \"File an appeal\" right away", biasValue: 1, isBest: false },
            { text: "Reply to the email asking for details", biasValue: 0.5, isBest: false },
            { text: "Sign in to CodeHarbor yourself and check for notices", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-base-rate-1",
        retestOnly: true,
        biasType: "BASE_RATE",
        title: "Sign-In Risk Flag",
        scenarioText: "Your sign-in risk system scores every login. About 1 in 100 sign-ins comes from an attacker using a stolen password. The system flags 90% of attacker sign-ins, and it wrongly flags 8% of legitimate ones. A sign-in has just been flagged. About how likely is it that an attacker is behind it?",
        bestAnswer: "About 10%",
        reasoning: "The system errs both ways: it misses 1 in 10 attackers and flags 8% of real users. Picture 1,000 sign-ins: 10 are attackers, and 9 of them get flagged while 1 slips through. Of the 990 legitimate sign-ins, about 79 get flagged too. That's about 88 flags, and only 9 are attackers: about 10%. The 1-in-100 rate is a baseline from history, and attackers can push it up, but even doubling it would leave most flags false.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "About 10%", biasValue: 0, isBest: true },
            { text: "About 50%", biasValue: 0.5, isBest: false },
            { text: "About 90%", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-base-rate-2",
        retestOnly: true,
        biasType: "BASE_RATE",
        title: "Reported Phishing Email",
        scenarioText: "Employees can click a Report Phishing button on any email. About 2% of the email reaching inboxes is phishing. Employees report about 70% of the phishing emails they get, and they mistakenly report about 5% of legitimate emails. An email has just been reported. About how likely is it that it's actually phishing?",
        bestAnswer: "About 20%",
        reasoning: "Reporting errs both ways: people miss some phishing and flag some real mail. Picture 1,000 emails: 20 are phishing, and 14 of those get reported while 6 are missed. Of the 980 legitimate emails, about 49 get reported by mistake. That's about 63 reports, and only 14 are phishing: roughly 20%. The 2% phishing rate is a baseline that attackers can change, but even doubling it would leave most reports harmless.",
        biasName: "Base Rate Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 16",
        options: [
            { text: "About 5%", biasValue: 0.5, isBest: false },
            { text: "About 20%", biasValue: 0, isBest: true },
            { text: "About 70%", biasValue: 1, isBest: false },
            { text: "About 95%", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-small-numbers-1",
        retestOnly: true,
        biasType: "SMALL_NUMBERS",
        title: "Alert Sample Review",
        scenarioText: "A new detection rule fired 4,000 times last month. To check it, an analyst reviewed 5 of those alerts, picked at random. All 5 were false alarms. A manager says the rule is pure noise and wants it deleted today. What's the best next step?",
        bestAnswer: "Review a larger random sample of its alerts",
        reasoning: "Five alerts out of 4,000 is a tiny sample. Even if 1 in 4 of the rule's alerts were real, you'd see five false alarms in a row about a quarter of the time, so this can't show the rule is pure noise. Reviewing a few dozen more alerts is cheap and would pin down how noisy the rule really is before you throw away something that may be catching attacks.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "Delete the rule", biasValue: 1, isBest: false },
            { text: "Keep the rule unchanged", biasValue: 0.5, isBest: false },
            { text: "Turn the rule off for a month", biasValue: 1, isBest: false },
            { text: "Review a larger random sample of its alerts", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-small-numbers-2",
        retestOnly: true,
        biasType: "SMALL_NUMBERS",
        title: "Two Support Queues",
        scenarioText: "Your company has two support queues. The main queue handles about 400 tickets a day, and the regional queue handles about 40. In both, about 10% of tickets are marked urgent, and urgent tickets arrive at random. Over a year, which queue will log more days on which over 20% of its tickets were urgent?",
        bestAnswer: "The regional queue",
        reasoning: "Small samples swing more. For the regional queue, a day over 20% urgent means 9 or more urgent tickets when about 4 are typical, which happens by chance on a handful of days a year. For the main queue, it means over 80 urgent tickets when about 40 are typical, which essentially never happens. The underlying rate is the same; only the sample size differs.",
        biasName: "Law of Small Numbers",
        bookRef: "Thinking, Fast and Slow - Chapter 10",
        options: [
            { text: "The main queue", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 1, isBest: false },
            { text: "The regional queue", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-regression-1",
        retestOnly: true,
        biasType: "REGRESSION",
        title: "Best Team Next Quarter",
        scenarioText: "Of your company's 30 teams, the Payments team had the lowest phishing-simulation click rate last quarter: 2%. The company average was 8%. Nothing about the teams or the simulations is changing. What is the best prediction for the Payments team's click rate next quarter?",
        bestAnswer: "Between 2% and 8%",
        reasoning: "The lowest score out of 30 teams is partly skill and partly luck, and the luck part won't repeat on schedule. So the best forecast moves toward the average: probably still better than typical, but not as extreme as 2%. Predicting another 2% assumes last quarter was all skill.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 18",
        options: [
            { text: "About 2%", biasValue: 1, isBest: false },
            { text: "Between 2% and 8%", biasValue: 0, isBest: true },
            { text: "About 8%", biasValue: 0.5, isBest: false },
            { text: "Above 8%", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-regression-2",
        retestOnly: true,
        biasType: "REGRESSION",
        title: "Worst Services Review",
        scenarioText: "Each week, the three services with the most errors out of your 50 get a mandatory engineering review. Services almost always have fewer errors the week after their review. A director wants to expand the program on the strength of this. What would best show whether the reviews actually help?",
        bestAnswer: "Compare them with services that had similar bad weeks but no review",
        reasoning: "A service picked for its worst week will usually look better the next week anyway, because unusually bad weeks are partly bad luck. So the improvement after a review is expected even if the review does nothing. Only a comparison with similar bad-week services that weren't reviewed separates the review's effect from regression to the mean.",
        biasName: "Regression to the Mean",
        bookRef: "Thinking, Fast and Slow - Chapter 17",
        options: [
            { text: "Measure how much the reviewed services improve", biasValue: 1, isBest: false },
            { text: "Ask the reviewed teams whether the review helped", biasValue: 1, isBest: false },
            { text: "Compare them with services that had similar bad weeks but no review", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-wysiati-1",
        retestOnly: true,
        biasType: "WYSIATI",
        title: "Two-App Pen Test",
        scenarioText: "An outside penetration test of two of your company's web apps found no critical issues. The company runs 14 internet-facing apps, and the testers only had access to those two. The CEO is drafting a slide for the board. Which statement does the evidence support?",
        bestAnswer: "The two tested apps had no critical findings",
        reasoning: "The test says nothing about the 12 apps nobody looked at, and even for the two it covered, no findings is not proof of no flaws. A clean report feels like a verdict on everything, but it only covers what was in scope. The board should hear exactly what was tested and what wasn't.",
        biasName: "What You See Is All There Is",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Our internet-facing apps are secure", biasValue: 1, isBest: false },
            { text: "Most of our apps are probably secure", biasValue: 0.5, isBest: false },
            { text: "The two tested apps had no critical findings", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-wysiati-2",
        retestOnly: true,
        biasType: "WYSIATI",
        title: "Training Feedback Survey",
        scenarioText: "After this year's security awareness training, an optional feedback survey went to all 1,200 employees. 60 people replied, and 94% of them rated the training useful. What does this tell you about how employees overall rate the training?",
        bestAnswer: "Very little",
        reasoning: "Only 5% of employees answered, and they chose themselves. People who liked the training are often the most willing to say so, while people who found it a waste of time may simply ignore the survey. The 94% describes those 60 people, not the 1,140 you didn't hear from.",
        biasName: "What You See Is All There Is",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Nearly all of them find it useful", biasValue: 1, isBest: false },
            { text: "Very little", biasValue: 0, isBest: true },
            { text: "Most of them find it useful", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-availability-1",
        retestOnly: true,
        biasType: "AVAILABILITY",
        title: "Database Failover Scare",
        scenarioText: "Last week a database failover went badly at 3 a.m., paging half the team, and it's all anyone talks about. Your postmortems from the past year list 31 outages caused by bad configuration changes and 2 caused by database failures, with outages of similar length either way. Configuration-change outages are still happening most weeks. Where should next quarter's reliability work go first?",
        bestAnswer: "Safer configuration changes",
        reasoning: "The failover is fresh and dramatic, so it feels like the big risk. The records say configuration changes cause about 15 times as many outages of similar size, and they're still happening. System failures like these aren't an adversary changing tactics, so last year's pattern is a fair guide to next quarter.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Database failover", biasValue: 1, isBest: false },
            { text: "Split evenly between the two", biasValue: 0.5, isBest: false },
            { text: "Safer configuration changes", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-availability-2",
        retestOnly: true,
        biasType: "AVAILABILITY",
        title: "Conference Attack Demo",
        scenarioText: "At a conference, your team watched a dramatic live demo: the speaker froze a laptop's memory chips and read its encryption keys. The attack needs physical access to a running laptop. In the past three years your company had no physical attacks on laptops, and 27 incidents that began with stolen passwords on cloud apps that don't require multi-factor authentication. Those break-ins are still arriving. Where should most of next year's effort go?",
        bestAnswer: "Requiring multi-factor authentication on cloud apps",
        reasoning: "A live demo is vivid and memorable, which makes the attack feel likely. Your own records show where attackers are actually getting in, and they still are. Attackers do adapt, so history is a baseline rather than a forecast, but an attack that needs hands on a running laptop is unlikely to overtake one that works from anywhere.",
        biasName: "Availability Heuristic",
        bookRef: "Thinking, Fast and Slow - Chapters 12 & 13",
        options: [
            { text: "Requiring multi-factor authentication on cloud apps", biasValue: 0, isBest: true },
            { text: "Defenses against the memory attack", biasValue: 1, isBest: false },
            { text: "Split evenly between the two", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-halo-1",
        retestOnly: true,
        biasType: "HALO",
        title: "Star Engineer Pull Request",
        scenarioText: "Priya is your team's star engineer: she built the company's most popular feature, and the CEO praises her at every all-hands. She opens a pull request that changes how the login service checks passwords. Changes to authentication code are a common source of serious security bugs. How should her pull request be reviewed?",
        bestAnswer: "The usual full review",
        reasoning: "Priya's success on features says little about whether this particular change to password checking is correct. Skilled engineers still write security bugs, and authentication mistakes are costly. Letting her reputation lighten the review is the halo effect: one impressive trait coloring the judgment of everything else.",
        biasName: "Halo Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "A lighter review than usual", biasValue: 1, isBest: false },
            { text: "The usual full review", biasValue: 0, isBest: true },
            { text: "Let her merge it without review", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-halo-2",
        retestOnly: true,
        biasType: "HALO",
        title: "Analyst Annual Review",
        scenarioText: "Marcus, a security analyst, handled one high-profile incident brilliantly last spring, explaining it calmly to the CEO in a crisis meeting. At review time, the two leads who read his incident write-ups from the rest of the year both rated them below average. How would you rate his documentation?",
        bestAnswer: "Below average",
        reasoning: "One memorable success in front of the CEO creates a glow that spreads to everything else. But his documentation was judged directly, by two people, across the year. Rate each skill on its own evidence: he may be excellent under pressure and still need to improve his write-ups.",
        biasName: "Halo Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 7",
        options: [
            { text: "Below average", biasValue: 0, isBest: true },
            { text: "Average", biasValue: 0.5, isBest: false },
            { text: "Above average", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-anchoring-1",
        retestOnly: true,
        biasType: "ANCHORING",
        title: "Bug Bounty Haggle",
        scenarioText: "Your bug bounty program publishes its payouts: $500 to $2,000 for medium-severity bugs, about what similar programs pay. A researcher reports a bug your team confirms is medium severity. They ask for $40,000, pointing to a famous payout elsewhere for a critical bug. When you decline, they offer to settle at $15,000. What do you pay?",
        bestAnswer: "An amount in your published range",
        reasoning: "The $40,000 opening is tied to a different, critical bug, so it carries no information about this one. The $15,000 only looks reasonable next to it. Your published range and what similar programs pay are the real reference points, and paying far outside them would also be unfair to every other researcher.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "An amount in your published range", biasValue: 0, isBest: true },
            { text: "$5,000", biasValue: 0.5, isBest: false },
            { text: "$15,000", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-anchoring-2",
        retestOnly: true,
        biasType: "ANCHORING",
        title: "Security Review Timeline",
        scenarioText: "Your sales team told a client that the security review of their integration would take about 3 days. Your team's last eight reviews of similar scope took 16, 17, 18, 19, 20, 21, 22, and 24 days, and nothing about this one is different. What timeline should you give the client?",
        bestAnswer: "About 3 weeks",
        reasoning: "The 3-day figure came from sales, not from any look at the work, so it carries no information. Starting from it and adjusting upward still lands too low. Your own track record on eight similar reviews, averaging about 20 days, is the real evidence, and a realistic estimate now beats a missed deadline later.",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        options: [
            { text: "3 days", biasValue: 1, isBest: false },
            { text: "About 1 week", biasValue: 1, isBest: false },
            { text: "About 2 weeks", biasValue: 0.5, isBest: false },
            { text: "About 3 weeks", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-misleading-charts-1",
        retestOnly: true,
        biasType: "MISLEADING_CHARTS",
        title: "Total Users Chart",
        scenarioText: "A password manager startup's investor update shows a chart of total users ever registered. The line climbs every quarter under the heading Strong Growth. A footnote lists new sign-ups for the last four quarters: 40,000, then 31,000, then 22,000, then 14,000. How are new sign-ups trending?",
        bestAnswer: "Falling",
        reasoning: "A running total can only go up, so a cumulative chart climbs even when the business is slowing. The footnote shows new sign-ups falling every quarter, to about a third of where they started. The rising line hides that; the quarterly numbers reveal it.",
        biasName: "Misleading Charts",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "Falling", biasValue: 0, isBest: true },
            { text: "Roughly flat", biasValue: 0.5, isBest: false },
            { text: "Rising", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-misleading-charts-2",
        retestOnly: true,
        biasType: "MISLEADING_CHARTS",
        title: "Response Time Chart",
        scenarioText: "A vendor's bar chart compares response times for two services. The vertical axis has gridlines at 1, 10, 100, and 1,000 milliseconds, evenly spaced. Service A's bar reaches the 10 line and Service B's bar reaches the 1,000 line, so B's bar looks about three times as tall. How many times slower is Service B?",
        bestAnswer: "About 100 times",
        reasoning: "Evenly spaced gridlines that jump by a factor of 10 mean a logarithmic axis: each step up is ten times more, not a fixed amount more. Service B takes 1,000 milliseconds and Service A takes 10, so B is about 100 times slower. On this kind of axis, bar heights hide the size of the gap.",
        biasName: "Misleading Charts",
        bookRef: "Statistics literacy (Huff, How to Lie with Statistics 1954)",
        options: [
            { text: "About 3 times", biasValue: 1, isBest: false },
            { text: "About 10 times", biasValue: 0.5, isBest: false },
            { text: "About 30 times", biasValue: 0.5, isBest: false },
            { text: "About 100 times", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-fine-print-1",
        retestOnly: true,
        biasType: "FINE_PRINT",
        title: "VPN Subscription Offer",
        scenarioText: "An ad reads: \"Shieldway VPN, just $2.49/mo!*\" The fine print says: \"*$89.64 billed for the first 36 months. Renews at $119.99 per year.\" About how much would four years of Shieldway cost?",
        bestAnswer: "About $210",
        reasoning: "The $2.49 only holds if you pay three years upfront: $89.64 on day one. In year four the plan renews at $119.99, so four years cost about $89.64 plus $119.99, or roughly $210. The headline number suggests about $120 for four years and hides both the upfront bill and the renewal price.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "About $120", biasValue: 1, isBest: false },
            { text: "About $210", biasValue: 0, isBest: true },
            { text: "About $480", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-fine-print-2",
        retestOnly: true,
        biasType: "FINE_PRINT",
        title: "Backup App Free Trial",
        scenarioText: "A backup app's sign-up page says: \"Try CloudKeep free for 30 days!*\" The fine print says: \"*Card required. Plan renews at $14.99/month unless cancelled at least 7 days before the trial ends.\" You start the trial on June 1 and cancel on June 28. What happens?",
        bestAnswer: "You're charged $14.99",
        reasoning: "The trial ends on June 30, but the fine print moves the real cancellation deadline to June 23. Cancelling on June 28 is too late, so the card on file is charged for the first month. The headline promises 30 free days; the conditions give you only 23 to decide.",
        biasName: "Hidden Fine Print",
        bookRef: "Consumer protection guidance (FTC, clear and conspicuous disclosures)",
        options: [
            { text: "Nothing; the trial was free", biasValue: 1, isBest: false },
            { text: "You pay for part of a month", biasValue: 0.5, isBest: false },
            { text: "You're charged $14.99", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-drip-pricing-1",
        retestOnly: true,
        biasType: "DRIP_PRICING",
        title: "Web Hosting Checkout",
        scenarioText: "A web host advertises: \"Hosting from $4/month!\" After you create an account and enter your card, checkout adds a required $40 setup fee and a required SSL security add-on at $4/month. Another host of similar quality advertises: \"$9/month, SSL included, no setup fee.\" For one year, which is cheaper?",
        bestAnswer: "The $9 host",
        reasoning: "Add up every required charge. The first host costs $48 for hosting, plus $40 setup, plus $48 for SSL: $136 for the year. The second costs $108. The low headline price and the effort already spent signing up make the first host feel cheaper, but it costs about 25% more.",
        biasName: "Drip Pricing",
        bookRef: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        options: [
            { text: "The $4 host", biasValue: 1, isBest: false },
            { text: "They cost about the same", biasValue: 0.5, isBest: false },
            { text: "The $9 host", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-drip-pricing-2",
        retestOnly: true,
        biasType: "DRIP_PRICING",
        title: "Exam Voucher Checkout",
        scenarioText: "You're buying a cloud certification exam voucher. Provider A lists it at \"$399.\" At the last checkout step, after you've entered your details, it adds a $29 booking fee, a $59 proctoring fee, and a $35 digital certificate fee, all required. Provider B, also authorized, sells the same voucher for \"$460, all fees included.\" What do you do?",
        bestAnswer: "Buy from Provider B",
        reasoning: "Provider A's real price is $399 plus $123 in fees: $522, or $62 more than Provider B. Fees revealed at the last step work because you're already committed to the first price and the time spent on checkout. That time is gone either way; only the totals matter.",
        biasName: "Drip Pricing",
        bookRef: "Marketing research (Santana, Dallas & Morwitz 2020; FTC)",
        options: [
            { text: "Finish buying from Provider A", biasValue: 1, isBest: false },
            { text: "Buy from Provider B", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-outcome-bias-1",
        retestOnly: true,
        biasType: "OUTCOME_BIAS",
        title: "Middle-of-the-Night Rollback",
        scenarioText: "Your runbook says to roll back a release if login errors stay above 5% for five minutes. At 2 a.m., the on-call engineer saw login errors at 12% for eight minutes, and a second dashboard agreed, so she rolled back. That took the app offline for 20 minutes. The next day, the team found the release was fine: a faulty monitoring agent had reported errors that weren't happening. Was her rollback a good decision?",
        bestAnswer: "Yes",
        reasoning: "With what she could see, errors well above the threshold on two dashboards, the runbook called for a rollback, and she followed it. The faulty agent was only found afterward. Judging her by the needless downtime is outcome bias, and punishing it teaches on-call engineers to hesitate the next time the alarm is real. The fix belongs in the monitoring, not in her review.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "Yes", biasValue: 0, isBest: true },
            { text: "No", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-outcome-bias-2",
        retestOnly: true,
        biasType: "OUTCOME_BIAS",
        title: "Unreviewed Sign-In Fix",
        scenarioText: "Policy requires a second reviewer for any change to your sign-in code. A developer found a bug that showed the wrong time zone on the sign-in page. A reviewer was free within the hour, but she pushed her fix straight to production without review. It worked, and nothing broke. How should the team lead respond?",
        bestAnswer: "Remind her that the change needed a review",
        reasoning: "The bug was cosmetic and a reviewer was an hour away, so skipping review on security-critical code took on real risk for almost no benefit. That nothing broke is luck, not evidence the call was sound. Rewarding a risky choice because it turned out well is outcome bias, and in security it teaches people that shortcuts are fine until the one that isn't.",
        biasName: "Outcome Bias",
        bookRef: "Thinking, Fast and Slow - Chapter 19",
        options: [
            { text: "Praise her for the quick fix", biasValue: 1, isBest: false },
            { text: "Let developers skip review for sign-in fixes like this", biasValue: 1, isBest: false },
            { text: "Remind her that the change needed a review", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-intuition-vs-formula-1",
        retestOnly: true,
        biasType: "INTUITION_VS_FORMULA",
        title: "Replacing Drives Before They Fail",
        scenarioText: "Your data center has 2,000 hard drives, and this quarter's budget covers replacing 50 before they fail. A simple model ranks every drive by its own health counters (bad sectors, read errors, age), and it has matched which of your drives actually failed over the past four years. Your senior technicians would rather pick the 50 that seem off to them from their noise and how they behaved during maintenance. Which list should you use?",
        bestAnswer: "The model's ranking",
        reasoning: "Drive failure is a stable problem with plenty of feedback and no one trying to fool you, which is exactly where a consistent formula does best. The model weighs the same evidence the same way for all 2,000 drives; people can only listen to a few and are swayed by whatever they noticed last. Chapter 21's lesson is to let the score set the list and treat the technicians' observations as extra input, not a veto.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "The technicians' picks", biasValue: 1, isBest: false },
            { text: "The model's ranking", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-intuition-vs-formula-2",
        retestOnly: true,
        biasType: "INTUITION_VS_FORMULA",
        title: "Choosing Vendors to Audit",
        scenarioText: "Your company uses 120 software vendors and has time to audit 15 this year. A checklist scores every vendor the same way on six factors, such as what data it can reach, whether it requires multifactor sign-in, and how quickly it patches. Most of your past vendor incidents involved vendors the checklist would have ranked high. The procurement lead would rather audit the vendors that seemed least solid on sales calls. Which should pick the 15?",
        bestAnswer: "The checklist score",
        reasoning: "A checklist applied the same way to all 120 vendors beats impressions from sales calls, which mostly measure how polished the salesperson was. Past incidents are a baseline, not a forecast: attackers shift to whichever vendors are weakest now, so the scores should be refreshed regularly. Within that, Chapter 21's advice holds: score first, then add judgment.",
        biasName: "Intuition vs. Formulas",
        bookRef: "Thinking, Fast and Slow - Chapter 21",
        options: [
            { text: "The checklist score", biasValue: 0, isBest: true },
            { text: "The procurement lead's impressions", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-planning-1",
        retestOnly: true,
        biasType: "PLANNING",
        title: "Data Retention Feature Estimate",
        scenarioText: "Your team estimates a new data-retention feature will take 3 sprints. You look up the team's last ten features: on average they took about 1.8 times their estimate, and only one finished on time. The product manager asks how many sprints to plan for. What do you say?",
        bestAnswer: "5 to 6 sprints",
        reasoning: "The team's own history is the reference class: 3 sprints times 1.8 is about 5.4. The 3-sprint estimate is the inside view, which pictures the work going smoothly, and nine of the last ten features show it rarely does. Start from the outside view and adjust only for real differences in this project.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "3 sprints", biasValue: 1, isBest: false },
            { text: "4 sprints", biasValue: 0.5, isBest: false },
            { text: "5 to 6 sprints", biasValue: 0, isBest: true },
            { text: "10 sprints", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-planning-2",
        retestOnly: true,
        biasType: "PLANNING",
        title: "Badge Reader Upgrade Budget",
        scenarioText: "Facilities quotes $40,000 to replace the office badge readers with ones that accept phone badges. Your last three security hardware projects: cameras were estimated at $50,000 and cost $85,000; alarm panels were estimated at $30,000 and cost $52,000; door locks were estimated at $60,000 and cost $100,000. How much should you budget?",
        bestAnswer: "About $70,000",
        reasoning: "Every comparable project ran about 70% over its estimate, so the outside view puts this one near $68,000. The $40,000 quote is the inside view, which assumes nothing goes wrong. Budgeting from the reference class leaves room for the surprises that past projects show keep coming.",
        biasName: "Planning Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 23",
        options: [
            { text: "About $40,000", biasValue: 1, isBest: false },
            { text: "About $50,000", biasValue: 0.5, isBest: false },
            { text: "About $70,000", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-sunk-cost-1",
        retestOnly: true,
        biasType: "SUNK_COST",
        title: "Flawed Hardware Sign-In Keys",
        scenarioText: "Your company spent $8,000, nonrefundable, on 200 hardware sign-in keys for staff. Before rollout, security testing found that this model can be copied by anyone who holds a key for a few minutes. A different model without the flaw would cost $9,000 for everyone. The keys will protect access to your payment systems. What do you do?",
        bestAnswer: "Buy the keys without the flaw",
        reasoning: "The $8,000 is gone whichever way you choose. Looking only forward, the choice is between keys that can be copied and keys that can't, guarding your payment systems, for $9,000. Rolling out the flawed keys to avoid wasting the first purchase is the sunk cost talking.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Roll out the keys you already bought", biasValue: 1, isBest: false },
            { text: "Buy the keys without the flaw", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-sunk-cost-2",
        retestOnly: true,
        biasType: "SUNK_COST",
        title: "Stuck in the Build Queue",
        scenarioText: "Your build has been waiting 45 minutes in the shared build queue. The queue estimates another 30 minutes before it starts, then 10 minutes to run. A teammate points out that a faster build machine just freed up, but moving there means starting over: about 15 minutes in total. You need the build as soon as possible. What do you do?",
        bestAnswer: "Move to the faster machine",
        reasoning: "From here, staying takes about 40 more minutes and moving takes about 15. The 45 minutes already spent are gone either way and don't make the queue any faster. Giving up your place feels like wasting that wait, which is the sunk cost talking.",
        biasName: "Sunk Cost Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 32",
        options: [
            { text: "Stay in the queue", biasValue: 1, isBest: false },
            { text: "Wait 10 more minutes, then decide", biasValue: 0.5, isBest: false },
            { text: "Move to the faster machine", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-framing-1",
        retestOnly: true,
        biasType: "FRAMING",
        title: "Hosting Uptime Promises",
        scenarioText: "You're choosing a hosting provider for a customer-facing app. Larkwood Cloud advertises \"99% uptime, guaranteed.\" Fernhill Hosting's contract promises no more than 2 hours of downtime per month. Prices and features are otherwise the same. Which provider promises less downtime?",
        bestAnswer: "Fernhill Hosting",
        reasoning: "99% uptime allows 1% downtime: about 7 hours in a 30-day month, more than three times Fernhill's 2 hours. A high percentage framed as success sounds close to perfect, so the missing 1% feels like nothing. Restating it as hours of downtime shows the real gap.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Larkwood Cloud", biasValue: 1, isBest: false },
            { text: "Fernhill Hosting", biasValue: 0, isBest: true },
            { text: "They promise about the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-framing-2",
        retestOnly: true,
        biasType: "FRAMING",
        title: "Two Account-Security Upgrades",
        scenarioText: "You can fund one of two upgrades for your 10,000 customer accounts, and both cost the same. Upgrade A cuts password-reuse takeovers by a third. Upgrade B cuts SIM-swap takeovers in half. Last year you had about 90 password-reuse takeovers and about 20 SIM-swap takeovers. Which upgrade would likely prevent more takeovers?",
        bestAnswer: "Upgrade A",
        reasoning: "A third of about 90 is about 30 takeovers prevented; half of about 20 is about 10. Cutting something in half sounds bigger than cutting it by a third, but a percentage of a small number is still small, so turn relative claims into counts before comparing. Last year's numbers are a baseline, not a forecast, since attackers shift tactics, but a gap this wide is unlikely to flip.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        options: [
            { text: "Upgrade A", biasValue: 0, isBest: true },
            { text: "Upgrade B", biasValue: 1, isBest: false },
            { text: "They would prevent about the same number", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-zero-price-1",
        retestOnly: true,
        biasType: "ZERO_PRICE",
        title: "Free VPN for Cafe Wi-Fi",
        scenarioText: "You want a VPN so that people on cafe Wi-Fi can't see which sites you visit. VPN A is free; its privacy policy says it records the sites you visit and shares them with advertising partners. VPN B costs $4 a month and keeps no browsing records, which an independent audit confirmed. Which better protects what you're trying to keep private?",
        bestAnswer: "VPN B",
        reasoning: "Your goal is keeping your browsing private, and VPN A hands exactly that information to advertisers; you'd trade the cafe's view for the VPN company's and its partners'. A price of zero feels like it removes all downside, so the cost buried in the privacy policy gets ignored. When a product is free, ask what it's paid for with.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        options: [
            { text: "VPN A", biasValue: 1, isBest: false },
            { text: "VPN B", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-zero-price-2",
        retestOnly: true,
        biasType: "ZERO_PRICE",
        title: "Zero-Down Laptop Plan",
        scenarioText: "You need a new laptop for work, and you can afford either payment option. Plan A: pay $0 today, then $49 a month for 24 months. Plan B: pay $950 today. It's the same laptop with the same warranty. Which costs less overall?",
        bestAnswer: "Plan B",
        reasoning: "Plan A adds up to $1,176, about $226 more than paying $950 up front. \"$0 today\" draws attention to the one moment that costs nothing and away from the 24 payments that follow. Add up the full cost before letting a zero decide.",
        biasName: "Zero-Price Effect",
        bookRef: "Behavioral Economics (Shampanier, Mazar & Ariely 2007)",
        options: [
            { text: "Plan A", biasValue: 1, isBest: false },
            { text: "Plan B", biasValue: 0, isBest: true },
            { text: "They cost about the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-representativeness-1",
        retestOnly: true,
        biasType: "REPRESENTATIVENESS",
        title: "Who Took Over the Mailbox",
        scenarioText: "An attacker signed in to an employee's email at 3 a.m. with her correct password and quietly set a rule forwarding invoices to an outside address. Your team hasn't yet found out who did it or how they got the password. Which is most probable?",
        bestAnswer: "The attacker is part of an organized fraud group",
        reasoning: "Every organized fraud group that phished the password, and every one of those based overseas, is still an organized fraud group, so the shortest statement can never be less probable than the longer ones. The extra details fit the familiar story of invoice fraud, which makes them feel likelier, but each added condition can only lower the probability. This is the same conjunction fallacy as the Linda problem.",
        biasName: "Representativeness & Conjunction Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 15",
        options: [
            { text: "The attacker is part of an organized fraud group and got the password from a phishing email", biasValue: 1, isBest: false },
            { text: "The attacker is part of an organized fraud group, got the password from a phishing email, and is based overseas", biasValue: 1, isBest: false },
            { text: "The attacker is part of an organized fraud group", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-representativeness-2",
        retestOnly: true,
        biasType: "REPRESENTATIVENESS",
        title: "Esports Final Prediction",
        scenarioText: "Team Vireo, the heavy favorite, plays a much weaker team in a best-of-five esports final. Which is more probable?",
        bestAnswer: "Vireo loses the first game",
        reasoning: "Every way Vireo can lose the first game and still win the final is also a way of losing the first game, so the longer statement can never be more probable. The comeback fits the story of a strong favorite, which makes it feel likelier, but adding a detail can only lower the probability. This is the conjunction fallacy from the Linda problem.",
        biasName: "Representativeness & Conjunction Fallacy",
        bookRef: "Thinking, Fast and Slow - Chapter 15",
        options: [
            { text: "Vireo loses the first game but wins the final", biasValue: 1, isBest: false },
            { text: "They are equally probable", biasValue: 0.5, isBest: false },
            { text: "Vireo loses the first game", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-less-is-more-1",
        retestOnly: true,
        biasType: "LESS_IS_MORE",
        title: "Two Test Reports",
        scenarioText: "Two teams test the same payment service. Team A ran 200 tests, and every one passed. Team B ran those same 200 tests, which all passed, plus 50 new tests of refund handling, 8 of which failed. Which team's testing tells you more about whether the service works?",
        bestAnswer: "Team B's",
        reasoning: "Team B's results include everything Team A's do, plus 50 more checks that found 8 refund bugs, which are there whether or not anyone tests for them. A 100% pass rate looks better than 96%, but the average hides that Team B simply looked further. Compare what each set contains in full, not its pass rate.",
        biasName: "Less Is More (Separate Evaluation)",
        bookRef: "Thinking, Fast and Slow - Chapters 15 & 33",
        options: [
            { text: "Team A's", biasValue: 1, isBest: false },
            { text: "Team B's", biasValue: 0, isBest: true },
            { text: "They tell you about the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-less-is-more-2",
        retestOnly: true,
        biasType: "LESS_IS_MORE",
        title: "Two Security Engineer Applicants",
        scenarioText: "Two people apply for a security engineer role. Applicant A led a company-wide move to hardware sign-in keys, built an incident-response runbook, and kept the team's internal wiki up to date for two years. Applicant B led a company-wide move to hardware sign-in keys and built an incident-response runbook. Judging only on experience, who has more?",
        bestAnswer: "Applicant A",
        reasoning: "Applicant A has done everything Applicant B has, plus two years of extra work, so A's experience can't be smaller. Judged as a whole, B's shorter list can feel stronger because every item is impressive, while the routine wiki work drags down the average impression of A. Compare what each record contains, not how impressive it feels on average.",
        biasName: "Less Is More (Separate Evaluation)",
        bookRef: "Thinking, Fast and Slow - Chapters 15 & 33",
        options: [
            { text: "Applicant A", biasValue: 0, isBest: true },
            { text: "Applicant B", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-loss-aversion-1",
        retestOnly: true,
        biasType: "LOSS_AVERSION",
        title: "Consulting Bake-Off Bid",
        scenarioText: "A client invites your consulting firm to a two-week bake-off against one rival firm that you judge to be evenly matched with yours. Preparing will cost about $10,000 in staff time. The winner gets a contract worth $25,000 in profit. Your firm enters several bids like this a year and can easily absorb the $10,000. Do you enter?",
        bestAnswer: "Enter the bake-off",
        reasoning: "Half the time you net about $15,000 and half the time you lose $10,000, so on average a bid like this earns about $2,500. The firm can afford the loss and makes many such bids, so over a year the wins more than cover the losses. Turning it down because a $10,000 loss feels worse than a $15,000 gain feels good is loss aversion.",
        biasName: "Loss Aversion",
        bookRef: "Thinking, Fast and Slow - Chapters 26 & 31",
        options: [
            { text: "Enter the bake-off", biasValue: 0, isBest: true },
            { text: "Skip it", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-loss-aversion-2",
        retestOnly: true,
        biasType: "LOSS_AVERSION",
        title: "Freelance Fee Offer",
        scenarioText: "You're a freelance designer who takes on about 20 projects a year and has comfortable savings. A regular client offers to change your fee from a flat $5,000 per project to $4,000 plus a $3,000 bonus whenever the project's launch hits its sales goal. This client's launches have hit their goals about half the time, and your work doesn't change that. Which do you choose?",
        bestAnswer: "Take the base plus bonus",
        reasoning: "Compared with the flat fee, each project either pays $2,000 more or $1,000 less at roughly even odds, so on average the new deal pays about $5,500 per project. Over 20 projects a year the good and bad outcomes even out, and your savings cover any dry spell. The $1,000 shortfall looming larger than the $2,000 bonus is loss aversion.",
        biasName: "Loss Aversion",
        bookRef: "Thinking, Fast and Slow - Chapters 26 & 31",
        options: [
            { text: "Take the base plus bonus", biasValue: 0, isBest: true },
            { text: "Keep the flat $5,000", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-endowment-1",
        retestOnly: true,
        biasType: "ENDOWMENT",
        title: "Bonus Token Buyback",
        scenarioText: "Imagine you hold a Bonus Token. At your next review it pays 40 Brain Points with a 50% chance, and nothing otherwise. Before the review, you're offered a sure 28 Brain Points for it. Do you sell?",
        bestAnswer: "Sell it for 28 points",
        reasoning: "On average the token is worth 20 points (a 50% chance of 40), so 28 sure points beats keeping it. If you wouldn't pay 28 points to buy this token, you shouldn't refuse 28 points to give it up. Holding on means valuing the token more simply because it is already yours.",
        biasName: "Endowment Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 27",
        options: [
            { text: "Keep the token", biasValue: 1, isBest: false },
            { text: "Sell it for 28 points", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-endowment-2",
        retestOnly: true,
        biasType: "ENDOWMENT",
        title: "Abandoned Domain Offer",
        scenarioText: "Years ago you registered a domain name for a side project you have since abandoned, and you pay $15 a year to renew it. You have no plans to use it. Similar names sell for about $200 on domain marketplaces. A startup emails offering you $900 for it. Do you sell?",
        bestAnswer: "Sell it for $900",
        reasoning: "Ask what you would pay for this domain if you didn't own it: with no plans for it, probably nothing, and certainly not $900 when similar names go for about $200. Turning the offer down means valuing the name far more than you ever would as a buyer, only because it is yours. That gap between selling and buying prices is the endowment effect.",
        biasName: "Endowment Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 27",
        options: [
            { text: "Sell it for $900", biasValue: 0, isBest: true },
            { text: "Keep it", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-endowment-3",
        retestOnly: true,
        biasType: "ENDOWMENT",
        title: "Unused Diagramming Seat",
        scenarioText: "Six months ago your company gave you a seat for a premium diagramming tool that costs $40 a month. You have opened it twice; the free tool you use every day covers everything you need. Finance announces that each seat given back adds $40 a month to that team's own budget, to spend however the team likes. What do you do?",
        bestAnswer: "Give the seat back",
        reasoning: "If you were offered this seat today for $40 a month out of your team's budget, you wouldn't buy it: you've barely used it in six months. Keeping it costs exactly that $40 a month. Holding on, or putting off the decision, treats the seat as worth more just because it was given to you.",
        biasName: "Endowment Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 27",
        options: [
            { text: "Keep the seat", biasValue: 1, isBest: false },
            { text: "Keep it one more quarter, then decide", biasValue: 0.5, isBest: false },
            { text: "Give the seat back", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-fourfold-1",
        retestOnly: true,
        biasType: "FOURFOLD",
        title: "Disputed Invoice Buyout",
        scenarioText: "A client owes your company $100,000 and is disputing the invoice. Your lawyer estimates a 95% chance of collecting the full amount within three months, at about $3,000 in legal fees. A collections firm offers to buy the debt from you today for $70,000. Your company has plenty of cash and handles many invoices like this. What do you do?",
        bestAnswer: "Pursue the full amount",
        reasoning: "Pursuing the debt is worth about $92,000 on average (95% of $100,000, minus $3,000 in fees), far more than the $70,000 offer. With plenty of cash and many similar invoices, the company can easily absorb the occasional loss. Giving up $22,000 to remove a 5% risk is the certainty effect: a sure thing gets extra weight when the odds are already high.",
        biasName: "Certainty Effect (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        options: [
            { text: "Sell the debt for $70,000", biasValue: 1, isBest: false },
            { text: "Pursue the full amount", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-fourfold-2",
        retestOnly: true,
        biasType: "FOURFOLD",
        title: "Over-Budget Migration Finish",
        scenarioText: "A data migration is already $40,000 over budget, and you must choose how to finish it. Plan A: bring in a contractor for a fixed $20,000. Plan B: have the team try an untested shortcut. It has a 25% chance of finishing at no extra cost and a 75% chance of failing, after which you'd still need the contractor plus $40,000 of cleanup. Which do you choose?",
        bestAnswer: "Plan A: the $20,000 contractor",
        reasoning: "Plan B's failure costs $60,000 (the contractor plus cleanup), so on average it adds about $45,000, more than twice Plan A's $20,000. When you are already behind, a sure loss feels unbearable and a gamble that might erase it feels attractive. That is risk seeking in losses, the fourfold pattern's most expensive corner.",
        biasName: "Risk Seeking in Losses (Fourfold Pattern)",
        bookRef: "Thinking, Fast and Slow - Chapter 29",
        options: [
            { text: "Plan A: the $20,000 contractor", biasValue: 0, isBest: true },
            { text: "Plan B: the untested shortcut", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-denominator-1",
        retestOnly: true,
        biasType: "DENOMINATOR",
        title: "Drive Failure Reports",
        scenarioText: "Two vendors report yearly failure rates for comparable hard drives. Vendor A: 312 of every 10,000 drives fail each year. Vendor B: 4% of drives fail each year. Which vendor's drives are more reliable?",
        bestAnswer: "Vendor A's drives",
        reasoning: "312 of every 10,000 is 3.12%, lower than Vendor B's 4%. A count of failed drives is easy to picture and feels worse than an abstract percentage, so Vendor A can seem riskier. Converting both to the same rate shows Vendor A's drives fail less often.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        options: [
            { text: "Vendor A's drives", biasValue: 0, isBest: true },
            { text: "Vendor B's drives", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-denominator-2",
        retestOnly: true,
        biasType: "DENOMINATOR",
        title: "Flaky Test Runners",
        scenarioText: "A flaky test sometimes fails on your two CI runners. On Runner A, it failed 6 of its last 40 runs. On Runner B, it failed 30 of its last 200 runs. Which runner has the higher failure rate for this test?",
        bestAnswer: "They fail at the same rate",
        reasoning: "6 of 40 and 30 of 200 are both 15%. Runner B's 30 failures stand out, but it also ran five times as often. Comparing counts instead of rates would send you chasing a problem on Runner B that isn't there.",
        biasName: "Denominator Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 30",
        options: [
            { text: "Runner A", biasValue: 0.5, isBest: false },
            { text: "Runner B", biasValue: 1, isBest: false },
            { text: "They fail at the same rate", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-narrow-framing-1",
        retestOnly: true,
        biasType: "NARROW_FRAMING",
        title: "Pricing Experiment Program",
        scenarioText: "Your growth team runs about 30 small pricing experiments a year. Each costs $5,000. Three years of results show about 4 in 10 succeed and add around $20,000 in profit; the rest add nothing. Nobody can tell in advance which will work, and results are independent. The last two experiments failed, and a manager proposes pausing the program. What policy do you set?",
        bestAnswer: "Keep running every experiment",
        reasoning: "Each experiment returns about $8,000 on average for a $5,000 cost, so 30 a year add roughly $90,000. Two failures in a row are expected often in a program where most experiments fail, and they say nothing about the next one. Judging each experiment by itself makes every likely loss sting; judging the program as a portfolio shows it clearly pays.",
        biasName: "Narrow Framing",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        options: [
            { text: "Pause the program", biasValue: 1, isBest: false },
            { text: "Keep running every experiment", biasValue: 0, isBest: true },
            { text: "Run a few more as a trial, then decide", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-narrow-framing-2",
        retestOnly: true,
        biasType: "NARROW_FRAMING",
        title: "Laptop Insurance Deductible",
        scenarioText: "Your company insures its 40 laptops. Each year about 1 in 10 needs a repair, which typically costs $400. You can choose a $500 deductible or a $100 deductible; the $100 deductible costs $70 more per laptop per year. The company can easily absorb repair costs. Which do you choose?",
        bestAnswer: "The $500 deductible for every laptop",
        reasoning: "The lower deductible saves $300 on a repaired laptop ($400 versus $100 out of pocket), but only about 1 in 10 laptops needs one, so it saves about $30 per laptop a year for $70 extra. Across 40 laptops that is roughly $2,800 a year in extra premiums to save about $1,200 in repairs. Seen one laptop at a time, a $400 bill feels worth avoiding; seen as a fleet, the low deductible clearly loses money.",
        biasName: "Narrow Framing",
        bookRef: "Thinking, Fast and Slow - Chapter 31",
        options: [
            { text: "The $100 deductible for every laptop", biasValue: 1, isBest: false },
            { text: "Decide each year based on last year's repairs", biasValue: 0.5, isBest: false },
            { text: "The $500 deductible for every laptop", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-peak-end-1",
        retestOnly: true,
        biasType: "PEAK_END",
        title: "On-Call Week Comparison",
        scenarioText: "Your manager asks which of your last two on-call weeks was heavier, to decide where to add a second responder. Week A: four quiet nights, then two 1-hour pages, then a 3-hour outage on the final night. Week B: a 2-hour incident on the first night, then a 1-hour page on each of the next five nights, and a quiet last night. Which week was heavier?",
        bestAnswer: "Week B",
        reasoning: "Week A took 5 hours of pages; Week B took 7 hours and interrupted six nights instead of three. Week A feels worse in memory because its worst moment came at the very end. Memory leans on the peak and the ending and largely ignores duration, so a staffing decision should use the totals.",
        biasName: "Peak-End Rule & Duration Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 35",
        options: [
            { text: "Week A", biasValue: 1, isBest: false },
            { text: "Week B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-peak-end-2",
        retestOnly: true,
        biasType: "PEAK_END",
        title: "Checkout Flow Frustration",
        scenarioText: "In a usability test, people tried two checkout flows. Flow A: 3 minutes of confusing steps, then done. Flow B: the same 3 minutes of confusing steps, followed by 1 more minute of a slightly less confusing confirmation step. Afterward, more people said they'd rather use Flow B again. Which flow put people through more total frustration?",
        bestAnswer: "Flow B",
        reasoning: "Flow B contains everything in Flow A plus another minute of mild frustration, so its total is larger. People still remember it more fondly because it ends on a less unpleasant note. This is the same pattern as Kahneman's cold-water experiment: an extra, milder stretch at the end improves the memory while adding to the actual discomfort.",
        biasName: "Peak-End Rule & Duration Neglect",
        bookRef: "Thinking, Fast and Slow - Chapter 35",
        options: [
            { text: "Flow B", biasValue: 0, isBest: true },
            { text: "Flow A", biasValue: 1, isBest: false },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-compromise-1",
        retestOnly: true,
        biasType: "COMPROMISE",
        title: "Office Wi-Fi Plan",
        scenarioText: "Your office is choosing a managed Wi-Fi plan. You have 140 staff, each with a laptop, a phone and a tablet on the network, plus about 150 printers, cameras and sensors. Small supports up to 200 devices ($40/mo). Medium supports up to 500 devices ($95/mo). Large supports up to 2,000 devices ($260/mo). Which plan fits your needs?",
        bestAnswer: "Large: up to 2,000 devices ($260/mo)",
        reasoning: "140 staff with three devices each is 420, plus about 150 other devices makes roughly 570, which is more than Medium supports. Large is the only plan that covers the office. The middle option feels like the safe, sensible choice, but sensible means meeting the actual need, wherever that option sits in the lineup.",
        biasName: "Compromise Effect",
        bookRef: "Behavioral Economics (Simonson 1989)",
        options: [
            { text: "Small: up to 200 devices ($40/mo)", biasValue: 0.5, isBest: false },
            { text: "Medium: up to 500 devices ($95/mo)", biasValue: 1, isBest: false },
            { text: "Large: up to 2,000 devices ($260/mo)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-compromise-2",
        retestOnly: true,
        biasType: "COMPROMISE",
        title: "Team Password Manager Plan",
        scenarioText: "Your 6-person team needs a password manager with shared vaults. You don't use single sign-on and don't need admin reports or dedicated support. Plans, per user per month: Starter ($3) has shared vaults for up to 10 users. Business ($6) adds single sign-on and admin reports. Enterprise ($12) adds dedicated support and audit logs. Which plan do you choose?",
        bestAnswer: "Starter ($3 per user)",
        reasoning: "Starter covers everything the team needs: shared vaults for up to 10 users. Business costs twice as much for features you've said you don't use. With an expensive top tier in the lineup, the middle plan looks like the balanced choice, but the right plan is the cheapest one that meets your needs.",
        biasName: "Compromise Effect",
        bookRef: "Behavioral Economics (Simonson 1989)",
        options: [
            { text: "Starter ($3 per user)", biasValue: 0, isBest: true },
            { text: "Business ($6 per user)", biasValue: 1, isBest: false },
            { text: "Enterprise ($12 per user)", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-decoy-1",
        retestOnly: true,
        biasType: "DECOY",
        title: "Consultant Laptop Purchase",
        scenarioText: "A consultant who carries her laptop all day needs a new one. Her apps never use more than 12 GB of memory, and weight matters most to her. Model 1: 32 GB, 2.0 kg, $1,500. Model 2: 16 GB, 1.1 kg, $1,300. Model 3: 32 GB, 2.1 kg, $1,650. Which should she buy?",
        bestAnswer: "Model 2: 16 GB, 1.1 kg ($1,300)",
        reasoning: "Model 2 has more memory than she needs, weighs about half as much as the others, and costs the least. Model 3 is worse than Model 1 in every way, and that makes Model 1 look like a smart buy. Remove Model 3 and the comparison is clear: the extra memory she will never use doesn't justify nearly a kilogram more to carry and $200 more.",
        biasName: "Decoy Effect",
        bookRef: "Behavioral Economics (Huber et al. 1982)",
        options: [
            { text: "Model 1: 32 GB, 2.0 kg ($1,500)", biasValue: 1, isBest: false },
            { text: "Model 2: 16 GB, 1.1 kg ($1,300)", biasValue: 0, isBest: true },
            { text: "Model 3: 32 GB, 2.1 kg ($1,650)", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-decoy-2",
        retestOnly: true,
        biasType: "DECOY",
        title: "Conference Pass Choice",
        scenarioText: "You can only get away for the first day of a three-day conference, and the day-one talks are what you want to see. The workshops don't interest you. Passes: three-day pass with workshops, $900; three-day pass without workshops, $880; day-one pass, $300. Which do you buy?",
        bestAnswer: "Day-one pass ($300)",
        reasoning: "You can attend only day one, so the day-one pass gives you everything you'll use for a third of the price. The $880 pass exists mainly to make the $900 pass look like a bargain: workshops for just $20 more. A small extra that seems nearly free is still worthless if you can't or won't use it.",
        biasName: "Decoy Effect",
        bookRef: "Behavioral Economics (Huber et al. 1982)",
        options: [
            { text: "Three-day pass with workshops ($900)", biasValue: 1, isBest: false },
            { text: "Three-day pass without workshops ($880)", biasValue: 0.5, isBest: false },
            { text: "Day-one pass ($300)", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-salience-rarity-1",
        retestOnly: true,
        biasType: "SALIENCE_RARITY",
        title: "Sales Lead Tiers",
        scenarioText: "Your sales team can work through one batch of 100 leads this quarter, all from a single tier, and each tier takes the same effort. Past results: Platinum leads close 5% of the time at $40,000 each. Gold leads close 20% of the time at $12,000. Standard leads close 50% of the time at $6,000. Which batch should bring in the most revenue?",
        bestAnswer: "Standard batch",
        reasoning: "From 100 leads, Platinum brings about 5 deals worth $200,000, Gold about 20 deals worth $240,000, and Standard about 50 deals worth $300,000. The Platinum label and the big deal size draw attention, but the close rate matters just as much. Multiply the chance by the payoff before trusting a tier name.",
        biasName: "Salience & Rarity Bias",
        bookRef: "Behavioral Economics (Salience & Heuristic Valuation)",
        options: [
            { text: "Platinum batch", biasValue: 1, isBest: false },
            { text: "Gold batch", biasValue: 0.5, isBest: false },
            { text: "Standard batch", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-salience-rarity-2",
        retestOnly: true,
        biasType: "SALIENCE_RARITY",
        title: "Wellness Points Draw",
        scenarioText: "Your company's wellness app lets you spend 500 points on one prize draw. Gold Draw: a 25% chance of a $150 gift card. Bronze Draw: an 80% chance of a $60 gift card. Diamond Draw: a 2% chance of a $1,500 laptop. Which draw gives you the most value on average?",
        bestAnswer: "Bronze Draw",
        reasoning: "On average the Bronze Draw is worth $48 (80% of $60), the Gold Draw $37.50, and the Diamond Draw only $30 (2% of $1,500). The laptop and the Diamond name are vivid, while the plain Bronze label sounds like the consolation prize. The numbers, not the label, tell you what each draw is worth.",
        biasName: "Salience & Rarity Bias",
        bookRef: "Behavioral Economics (Salience & Heuristic Valuation)",
        options: [
            { text: "Gold Draw", biasValue: 0.5, isBest: false },
            { text: "Bronze Draw", biasValue: 0, isBest: true },
            { text: "Diamond Draw", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-relative-risk-1",
        retestOnly: true,
        biasType: "RELATIVE_RISK",
        title: "Ransomware Filter Claim",
        scenarioText: "A vendor says its email filter cuts your chance of a successful ransomware attack by 60%. For companies your size, the yearly chance of one is about 5 in 1,000. Out of 1,000 companies like yours using the filter for a year, about how many fewer would be hit?",
        bestAnswer: "About 3",
        reasoning: "60% of 5 in 1,000 is 3 in 1,000: about 5 companies would be hit without the filter and about 2 with it. \"Cuts the chance by 60%\" sounds dramatic, but the absolute change is 3 companies per 1,000 per year, which is what to weigh against the filter's price. Past attack rates are also only a baseline, since attackers adapt to popular defenses.",
        biasName: "Relative vs. Absolute Risk",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "About 3", biasValue: 0, isBest: true },
            { text: "About 30", biasValue: 0.5, isBest: false },
            { text: "About 60", biasValue: 1, isBest: false },
            { text: "About 600", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-relative-risk-2",
        retestOnly: true,
        biasType: "RELATIVE_RISK",
        title: "Painkiller Side Effect Risk",
        scenarioText: "You need a painkiller for a few months, and two work equally well. For people like you, the yearly risk of a stomach bleed is about 2 in 1,000 without either drug. Drug A adds about 4 extra cases per 1,000 users. Drug B raises the risk by 50%. Which drug carries the lower risk of a stomach bleed?",
        bestAnswer: "Drug B",
        reasoning: "A 50% rise from 2 in 1,000 is 1 extra case, for a total of 3 in 1,000. Drug A adds 4 extra cases, for 6 in 1,000, twice Drug B's risk. \"50%\" sounds alarming next to a plain count of 4, but only the absolute numbers can be compared directly.",
        biasName: "Relative vs. Absolute Risk",
        bookRef: "Risk communication (Gigerenzer, Risk Savvy 2014)",
        options: [
            { text: "Drug A", biasValue: 1, isBest: false },
            { text: "Drug B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-price-framing-1",
        retestOnly: true,
        biasType: "PRICE_FRAMING",
        title: "Hourly Server Pricing",
        scenarioText: "You need a server running around the clock. Host A charges $0.15 an hour. Host B charges $95 a month for the same server. Which costs less?",
        bestAnswer: "Host B",
        reasoning: "A month has about 720 hours, so Host A costs about $108 a month, roughly $13 more than Host B. Fifteen cents sounds trivial because it's compared with tiny everyday amounts, not with the monthly bill. Convert both prices to the same period before comparing.",
        biasName: "Price Framing",
        bookRef: "Marketing research (Gourville 1998, \"pennies-a-day\")",
        options: [
            { text: "Host A", biasValue: 1, isBest: false },
            { text: "Host B", biasValue: 0, isBest: true },
            { text: "About the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-price-framing-2",
        retestOnly: true,
        biasType: "PRICE_FRAMING",
        title: "Stacked Monitor Discount",
        scenarioText: "You want a monitor that lists for $200 at two stores. Store A offers 50% off. Store B offers 30% off, plus an extra 20% off the sale price at checkout. Which store is cheaper?",
        bestAnswer: "Store A",
        reasoning: "Store A's price is $100. Store B takes 30% off to reach $140, then 20% off $140 to reach $112. Stacked discounts feel like they add up to 50%, but the second one applies to a smaller price, so together they come to 44%.",
        biasName: "Price Framing",
        bookRef: "Marketing research (price promotion framing)",
        options: [
            { text: "Store A", biasValue: 0, isBest: true },
            { text: "Store B", biasValue: 1, isBest: false },
            { text: "Same price", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-unit-price-1",
        retestOnly: true,
        biasType: "UNIT_PRICE",
        title: "Battery Value Pack",
        scenarioText: "A 4-pack of AA batteries costs $5.49. Next to it, a 24-pack of the same batteries labeled \"Value Pack\" costs $36.99. Which is cheaper per battery?",
        bestAnswer: "The 4-pack",
        reasoning: "The 4-pack works out to about $1.37 per battery; the Value Pack is about $1.54. Bigger packages are usually assumed to be cheaper per unit, and a label like Value Pack reinforces that, but neither is guaranteed. The unit price is the only fair comparison.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "The 4-pack", biasValue: 0, isBest: true },
            { text: "The 24-pack Value Pack", biasValue: 1, isBest: false },
            { text: "They're the same", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-unit-price-2",
        retestOnly: true,
        biasType: "UNIT_PRICE",
        title: "Redesigned Coffee Bag",
        scenarioText: "Your usual coffee was $8.99 for a 12 oz (340 g) bag. The redesigned bag, labeled \"New look, same great taste,\" is $8.49 for 10.5 oz (298 g). Compared with before, the price per ounce (or per gram) has:",
        bestAnswer: "Gone up",
        reasoning: "The old bag cost about 75 cents an ounce; the new one costs about 81 cents. The lower shelf price draws attention away from the smaller bag. When a package is redesigned, check the size and the unit price, not just the sticker.",
        biasName: "Size & Unit Price Illusions",
        bookRef: "Consumer protection research (unit pricing & shrinkflation)",
        options: [
            { text: "Gone down", biasValue: 1, isBest: false },
            { text: "Stayed about the same", biasValue: 0.5, isBest: false },
            { text: "Gone up", biasValue: 0, isBest: true }
        ]
    },

    // -------------------------------------------------------------
    // OFFICE-ONLY QUESTIONS: plain-language phishing and social
    // engineering for non-technical staff (office version only)
    // -------------------------------------------------------------
    {
        id: "office-phishing-1",
        office: true,
        officeOnly: true,
        biasType: "PHISHING",
        title: "Shared Invoice From a Stranger",
        scenarioText: "You handle supplier payments at Larkwood, where work email addresses end in @larkwood.com. Larkwood has never bought anything from a company called Brightline Supplies. This email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Brightline Supplies Accounts",
            address: "accounts@brightline-supplies.com",
            to: "you@larkwood.com",
            subject: "Invoice INV-20817 has been shared with you",
            body: [
                "Hello,",
                "A secure document has been shared with you. To protect its contents, please sign in with your work email and password to view the invoice.",
                "Payment is due within 7 days.\nBrightline Supplies"
            ],
            button: "View invoice",
            linkPreview: "https://secure-docview.co/larkwood/inv-20817"
        },
        bestAnswer: "Report it with the Report Phishing button",
        reasoning: "The email fails the basic checks: it's from a company Larkwood doesn't deal with, you weren't expecting it, and it asks for your Larkwood password on a site that isn't Larkwood's. A real invoice doesn't need your work password to open. Signing in just to see what it is hands your password to the sender. Forwarding it to the payments team spreads the same trap to more people. Reporting it lets security warn everyone else who got it.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Click \"View invoice\" and sign in to see what it's for", biasValue: 1, isBest: false },
            { text: "Forward it to the payments team to check against open orders", biasValue: 0.5, isBest: false },
            { text: "Report it with the Report Phishing button", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "office-phishing-2",
        office: true,
        officeOnly: true,
        biasType: "PHISHING",
        title: "New Voicemail Email",
        scenarioText: "You have a desk phone at Larkwood but rarely get voicemail on it. You're between meetings and this email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Voicemail Service",
            address: "no-reply@vm-notify.net",
            to: "you@larkwood.com",
            subject: "New voicemail (0:42) from +1 (555) 013-8870",
            body: [
                "You have received a new voicemail message.",
                "Length: 0:42\nCaller: +1 (555) 013-8870\nReceived: Today, 10:14 AM",
                "Sign in with your Larkwood account to listen."
            ],
            button: "Listen to message",
            linkPreview: "https://vm-notify.net/play?user=you@larkwood.com"
        },
        bestAnswer: "Check your voicemail on your desk phone or your usual phone app",
        reasoning: "Fake voicemail alerts are popular because everyone gets voicemail and a short message feels harmless to check. This one comes from an outside address, not larkwood.com, and wants your work sign-in on a site that isn't Larkwood's. If someone really left a message, it's waiting on your phone, so checking there is safe whether the email is real or not. Replying only reaches the sender, who will happily say it's real.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Click \"Listen to message\" and sign in", biasValue: 1, isBest: false },
            { text: "Check your voicemail on your desk phone or your usual phone app", biasValue: 0, isBest: true },
            { text: "Reply to the email to ask who called", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "office-authority-pressure-1",
        office: true,
        officeOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "Director's Gift Card Text",
        scenarioText: "You're an office manager at Larkwood. A text from a number you don't recognize says: \"Hi, it's Dana Whitfield. New phone. I'm in client meetings all afternoon and can't talk. I need eight $100 gift cards for client thank-yous before 3pm. Buy them, scratch off the backs and text me photos of the codes. Keep it quiet, it's a surprise.\" Dana is your director. What do you do?",
        bestAnswer: "Contact Dana on her usual number or in team chat before buying anything",
        reasoning: "A boss who suddenly has a new number, can't talk, needs gift cards fast, and wants it kept quiet is one of the most common scams there is. Gift card codes work like cash: once you send a photo, the money is gone and can't be traced or refunded. Replying to the new number just asks the scammer to vouch for themselves. Checking with Dana through a number or chat you already had settles it in a minute, and a real director won't mind.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Contact Dana on her usual number or in team chat before buying anything", biasValue: 0, isBest: true },
            { text: "Reply to the text and ask her to confirm it's really her", biasValue: 0.5, isBest: false },
            { text: "Buy the cards and send photos of the codes", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "office-fake-urgency-1",
        office: true,
        officeOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Account Lock Text",
        scenarioText: "At 3:40 p.m., a text from an unknown number says: \"Larkwood IT: your email account failed a security check and will be LOCKED at 5:00 PM today. Confirm your login now to keep access: larkwood-account-check.com\". You have a report due tomorrow and need your email. What do you do?",
        bestAnswer: "Contact the IT help desk using the number or page you already know",
        reasoning: "A deadline a couple of hours away is there to make you act before you think. The link doesn't go to larkwood.com; it goes to a separate web address anyone could set up, and \"confirm your login\" means typing your password into it. Texting back reaches the sender, not IT. If something really is wrong with your account, the help desk can tell you, and you lose nothing by asking them first.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Tap the link and confirm your login before 5pm", biasValue: 1, isBest: false },
            { text: "Text back to ask whether the message is real", biasValue: 0.5, isBest: false },
            { text: "Contact the IT help desk using the number or page you already know", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "office-lookalikes-1",
        office: true,
        officeOnly: true,
        biasType: "LOOKALIKES",
        title: "Payroll Details Email",
        scenarioText: "Rosa Delgado really does run payroll at Larkwood, and you've emailed with her before. Larkwood's email addresses end in @larkwood.com. This email arrives on Monday. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Rosa Delgado",
            address: "rosa.delgado@larkwod.com",
            to: "you@larkwood.com",
            subject: "Action needed: confirm your bank details before Thursday",
            body: [
                "Hi,",
                "We're moving to a new payroll system and need everyone to confirm their bank details before Thursday's pay run, or your pay may be delayed. It only takes two minutes.",
                "Thanks,\nRosa"
            ],
            button: "Confirm my details",
            linkPreview: "https://larkwod.com/payroll/confirm"
        },
        bestAnswer: "Report it as phishing, then check with payroll through the HR portal",
        reasoning: "The name is right, but the address is larkwod.com, with one letter missing. That's a different web address anyone could register. Your eyes see a familiar name and fill in the rest, which is exactly what lookalike addresses count on. Replying would go to larkwod.com, so the impostor would answer. Reporting it protects your coworkers, and the HR portal or a call to payroll tells you whether any change is really happening.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Click \"Confirm my details\" so your pay isn't delayed", biasValue: 1, isBest: false },
            { text: "Report it as phishing, then check with payroll through the HR portal", biasValue: 0, isBest: true },
            { text: "Reply to Rosa to ask whether the new system is real", biasValue: 0.5, isBest: false }
        ]
    },

    // Office retest-only questions: one focused habit per topic
    {
        id: "retest-office-authority-pressure-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "IT Caller Wants Your Code",
        scenarioText: "Your desk phone rings. The caller says he's Sam from Larkwood IT and your account was flagged in a security sweep. \"I'm sending a verification code to your mobile now. Just read it back to me so I can confirm it's you.\" A moment later a text arrives: \"Your Larkwood sign-in code is 482913.\" What do you do?",
        bestAnswer: "Hang up and call the IT help desk on the number you already have",
        reasoning: "That code is the second lock on your account. The caller most likely already has your password and is signing in as you right now; the code is the last thing he needs. Real IT staff never need you to read them a sign-in code. Asking for his name or employee ID doesn't help, since anyone can make one up. Hanging up and calling the help desk yourself reaches the real IT team, who can lock out whoever has your password.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Hang up and call the IT help desk on the number you already have", biasValue: 0, isBest: true },
            { text: "Ask for his employee ID first, then read him the code", biasValue: 0.5, isBest: false },
            { text: "Read him the code so he can finish the check", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-office-authority-pressure-2",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "AUTHORITY_PRESSURE",
        title: "Supplier's New Bank Letter",
        scenarioText: "Halvorsen Packaging has supplied Larkwood for years, and you pay their invoices. This email comes from their usual address, the same one you've always dealt with. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Halvorsen Packaging Accounts",
            address: "accounts@halvorsenpack.com",
            to: "you@larkwood.com",
            subject: "Updated bank details for all future payments",
            body: [
                "Hello,",
                "Following a recent audit, our bank details have changed. Please use the account in the attached letter for all future payments, including invoice HP-5531 ($28,400) due Friday.",
                "If you have any questions, call our accounts team on +1 (555) 017-4420.\nKind regards,\nHalvorsen Packaging"
            ],
            button: "Download bank letter (PDF)",
            linkPreview: "https://halvorsenpack.com/files/bank-letter.pdf"
        },
        bestAnswer: "Call Halvorsen on the phone number in your own records",
        reasoning: "The right address doesn't prove the email is from the right person: if a supplier's mailbox is broken into, the criminal sends from the real address. A change of bank details is the moment to check. The phone number in the email could ring the criminal, who will happily confirm. Calling the number you already had for Halvorsen, from past invoices or your supplier records, reaches the real company.",
        biasName: "Authority & Impersonation",
        bookRef: "Influence research (Cialdini 1984)",
        options: [
            { text: "Update the account details and pay on Friday", biasValue: 1, isBest: false },
            { text: "Call the phone number in the email to confirm", biasValue: 0.5, isBest: false },
            { text: "Call Halvorsen on the phone number in your own records", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-office-habituation-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "HABITUATION",
        title: "CEO Email Marked External",
        scenarioText: "Larkwood adds an External warning to the top of every email from outside the company. Most of your email comes from customers, so you see it dozens of times a day and have stopped reading it. This email is from Larkwood's CEO, Jordan Lee. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Jordan Lee",
            address: "jordan.lee.ceo@inboxmail.com",
            to: "you@larkwood.com",
            subject: "Confidential: please review before our 2pm",
            body: [
                "EXTERNAL: This email came from outside Larkwood. Be careful with links and attachments.",
                "Hi,",
                "Please look over the attached acquisition summary before our call at 2pm. Don't share it with anyone yet.",
                "Jordan"
            ],
            button: "Open Acquisition_Summary",
            linkPreview: "https://filedrop-share.com/d/acq-summary"
        },
        bestAnswer: "Report it as phishing",
        reasoning: "An email from your own CEO should never carry the External warning, because Larkwood's leaders write from larkwood.com. Here the warning is the most useful thing on the screen, but seeing it all day has trained you to look past it. The address confirms it: a personal inbox, not Larkwood's. Opening the file just to look can install harmful software or lead to a fake sign-in page. Reporting it lets security warn others.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (Akhawe & Felt 2013)",
        options: [
            { text: "Open the summary, since it's from the CEO", biasValue: 1, isBest: false },
            { text: "Report it as phishing", biasValue: 0, isBest: true },
            { text: "Open it, but close it if it asks for a password", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-office-habituation-2",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "HABITUATION",
        title: "Prompt During a Meeting",
        scenarioText: "You approve sign-in prompts like this a few times a week when you open email on your laptop, usually without reading them. Right now it's mid-afternoon, you're in a meeting taking notes on paper, and you haven't tried to sign in to anything. This appears on your phone. What do you tap?",
        mockScreen: {
            kind: "phone",
            time: "2:47 PM",
            heading: "Approve sign-in to Larkwood?",
            body: "Location: Ohio, US · Device: Mac · Just now"
        },
        bestAnswer: "Report suspicious sign-in",
        reasoning: "A sign-in prompt only appears when someone has typed your password. If it isn't you, someone else has it. Because you tap Approve so often, it's easy to do it on reflex, which is what attackers count on. Approving lets them straight in. Denying stops this attempt but leaves them holding your password; reporting it gets your password changed and the attempt looked into.",
        biasName: "Warning & Prompt Fatigue",
        bookRef: "Usable security research (MFA fatigue)",
        options: [
            { text: "Approve", ui: "primary", label: "Approve", biasValue: 1, isBest: false },
            { text: "Report suspicious sign-in", ui: "link", label: "Report suspicious sign-in", biasValue: 0, isBest: true },
            { text: "Deny", ui: "secondary", label: "Deny", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-office-lookalikes-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "LOOKALIKES",
        title: "Benefits Link Hover",
        scenarioText: "It's benefits enrollment season at Larkwood. This email reminds you to pick your health plan. The button shows Larkwood's benefits site, but when you rest your mouse on it, the bar at the bottom of the email shows where it really goes. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Larkwood HR",
            address: "hr@larkwood.com",
            to: "you@larkwood.com",
            subject: "Reminder: benefits enrollment closes Friday",
            body: [
                "Hi,",
                "Open enrollment closes this Friday. If you don't choose a plan, you'll be moved to the basic plan for next year.",
                "Larkwood HR"
            ],
            button: "benefits.larkwood.com/enroll",
            linkPreview: "https://larkwood-benefits.enroll-portal.co/login"
        },
        bestAnswer: "Go to the benefits site yourself from the intranet",
        reasoning: "The words on a button and where it goes are two separate things, and only the destination counts. This one goes to enroll-portal.co, not larkwood.com, even though the button says Larkwood's site. The sender's name and address can be faked, so they don't settle it, and a fake page can copy Larkwood's look exactly. Reaching the benefits site through the intranet or a bookmark works whether the email is real or not.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Go to the benefits site yourself from the intranet", biasValue: 0, isBest: true },
            { text: "Click it, since it's from HR's usual address", biasValue: 1, isBest: false },
            { text: "Click it and check that the page looks like Larkwood's", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-office-lookalikes-2",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "LOOKALIKES",
        title: "Parking Permit QR Code",
        scenarioText: "An email from \"Larkwood Facilities\" says the office is switching to new parking permits. It shows a large QR code and says: \"Scan with your phone and sign in with your Larkwood account to keep your parking space. Unregistered cars will be towed from Monday.\" You drive to work every day. What do you do?",
        bestAnswer: "Find parking registration on the intranet, or ask facilities directly",
        reasoning: "A QR code is a link you can't read until you've already opened it, and a phone screen shows only a sliver of the web address, so a fake sign-in page is hard to spot. Scammers like QR codes in emails because they slip past the checks your work computer does on links. A fake page can look exactly like Larkwood's. If the permit change is real, it will be on the intranet, and facilities can confirm it.",
        biasName: "Lookalikes & Hidden Links",
        bookRef: "Thinking, Fast and Slow - Chapter 5 (cognitive ease)",
        options: [
            { text: "Scan it and sign in so your car isn't towed", biasValue: 1, isBest: false },
            { text: "Scan it, and sign in only if the page looks like Larkwood's", biasValue: 1, isBest: false },
            { text: "Find parking registration on the intranet, or ask facilities directly", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-office-bait-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "BAIT",
        title: "Salary and Layoffs File",
        scenarioText: "Rumors about layoffs have been going around Larkwood for weeks. This email arrives late on a Friday afternoon. What do you do?",
        mockScreen: {
            kind: "email",
            from: "People Team",
            address: "people-team@larkwood-hr.net",
            to: "you@larkwood.com",
            subject: "Confidential: 2027 salary changes and role reductions",
            body: [
                "Hello,",
                "Attached is the approved list of salary changes and planned role reductions for 2027. Please review your entry before it is announced on Monday.",
                "Do not forward.\nPeople Team"
            ],
            button: "Open Salary_Changes_2027.xlsx"
        },
        bestAnswer: "Report it as phishing without opening the file",
        reasoning: "Pay and job security are about the strongest bait there is: worry and curiosity make people open the file before thinking. The sender is larkwood-hr.net, not larkwood.com, and real HR news about your job wouldn't arrive as a spreadsheet of everyone's fate. Opening it can install harmful software. Forwarding it to a coworker spreads the same risk. Reporting it lets security check the file safely, and HR can answer any real questions.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals; Tischer et al. 2016)",
        options: [
            { text: "Open the file to check your entry", biasValue: 1, isBest: false },
            { text: "Report it as phishing without opening the file", biasValue: 0, isBest: true },
            { text: "Forward it to a coworker to ask if they got it too", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-office-bait-2",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "BAIT",
        title: "Missed Delivery Text",
        scenarioText: "You're expecting two online orders this week. A text from an unknown number says: \"ParcelDash: we couldn't deliver your package because the address is incomplete. Update your details within 12 hours or it will be returned to sender: parceldash-redelivery.com/x7k2\". What do you do?",
        bestAnswer: "Check your orders on the store's website or app yourself",
        reasoning: "Fake delivery texts work because so many of us are waiting on a package at any moment. The short deadline pushes you to tap before you check, and the page usually asks for a small redelivery fee to collect your card details. Replying tells the sender your number is real and starts a conversation on their terms. The store's own site or app shows where your orders really are.",
        biasName: "Fear & Curiosity Bait",
        bookRef: "Social engineering research (fear appeals; Tischer et al. 2016)",
        options: [
            { text: "Check your orders on the store's website or app yourself", biasValue: 0, isBest: true },
            { text: "Tap the link and update your address", biasValue: 1, isBest: false },
            { text: "Reply and ask which package it is", biasValue: 0.5, isBest: false }
        ]
    },
    {
        id: "retest-office-fake-urgency-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Mailbox Deletion Notice",
        scenarioText: "You get a lot of email with attachments, and last month your email program warned you that your mailbox was nearly full. At 3:00 p.m. this email arrives. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Mail Administrator",
            address: "admin@mailbox-quota-center.com",
            to: "you@larkwood.com",
            subject: "FINAL NOTICE: your mailbox will be deleted in 1 hour",
            body: [
                "Your mailbox has gone over its storage limit and has been flagged for deletion.",
                "All emails and contacts will be permanently erased at 4:00 PM today unless you validate your account.",
                "Mail Administrator"
            ],
            button: "Validate mailbox now",
            linkPreview: "https://mailbox-quota-center.com/larkwood/validate"
        },
        bestAnswer: "Report it, then ask IT about your mailbox if you're worried",
        reasoning: "The earlier real warning makes this feel believable, but the one-hour countdown is the giveaway: it's built to make you click before you look. It comes from an outside address, not larkwood.com, and \"validate your account\" means typing your password into a stranger's page. No company deletes a full mailbox in an hour. Clearing out old email is harmless, but leaves the trap waiting for your coworkers; reporting it lets security warn them.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Click \"Validate mailbox now\" before 4pm", biasValue: 1, isBest: false },
            { text: "Delete old emails to get under the limit, and ignore the link", biasValue: 0.5, isBest: false },
            { text: "Report it, then ask IT about your mailbox if you're worried", biasValue: 0, isBest: true }
        ]
    },
    {
        id: "retest-office-fake-urgency-2",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "FAKE_URGENCY",
        title: "Bank Fraud Phone Call",
        scenarioText: "Your mobile rings, and the screen says Fernvale Bank, your bank. A calm caller says your card is being used for purchases overseas right now. To stop it, she needs you to confirm your PIN, then move your savings into a safe account she'll set up. \"Every minute we wait, more money goes.\" What do you do?",
        bestAnswer: "Hang up and call the number on the back of your card",
        reasoning: "The name on your screen can be faked, so it doesn't prove the bank is calling. Real banks never ask for your PIN and never ask you to move money to a safe account; both are the scam itself. The ticking-clock pressure is there to stop you from thinking. Giving only the PIN still hands over the key to your card. Calling the number on your card reaches the real bank, which can freeze the card in minutes if there really is fraud.",
        biasName: "Manufactured Urgency",
        bookRef: "Dark patterns research (Mathur et al. 2019)",
        options: [
            { text: "Confirm your PIN, but refuse to move any money", biasValue: 1, isBest: false },
            { text: "Hang up and call the number on the back of your card", biasValue: 0, isBest: true },
            { text: "Do what she says to stop the fraud quickly", biasValue: 1, isBest: false }
        ]
    },
    {
        id: "retest-office-phishing-1",
        office: true,
        officeOnly: true,
        retestOnly: true,
        biasType: "PHISHING",
        title: "Reset You Didn't Ask For",
        scenarioText: "You haven't forgotten your Larkwood password or asked to change it. This email arrives in the middle of the morning. What do you do?",
        mockScreen: {
            kind: "email",
            from: "Larkwood IT",
            address: "it-support@larkwood.com",
            to: "you@larkwood.com",
            subject: "Password reset requested",
            body: [
                "Hello,",
                "We received a request to reset your Larkwood password.",
                "If this wasn't you, use the button below to cancel the request and secure your account."
            ],
            button: "Cancel this request",
            linkPreview: "https://larkwood-sso.account-help.net/cancel"
        },
        bestAnswer: "Report it with the Report Phishing button and tell IT you didn't ask for it",
        reasoning: "A reset you didn't ask for is unexpected, and that alone is reason to stop. The cancel button is the trap: it plays on the worry that someone is after your account, and it leads to account-help.net, not larkwood.com, where you'd be asked for your password. The sender's address can be faked. Ignoring it is better than clicking, but if someone really is trying to get in, IT needs to know. Reporting covers both cases.",
        biasName: "Spotting Phishing",
        bookRef: "Security awareness research (sender, expectation, and request checks)",
        options: [
            { text: "Report it with the Report Phishing button and tell IT you didn't ask for it", biasValue: 0, isBest: true },
            { text: "Click \"Cancel this request\" to secure your account", biasValue: 1, isBest: false },
            { text: "Ignore it, since you didn't ask for a reset", biasValue: 0.5, isBest: false }
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

// Explains a player's own Bonus Token prices in the review
function diagnoseTokenPrices(sell, buy) {
    const average = BONUS_TOKEN.payout * BONUS_TOKEN.chance;
    const gap = sell - buy;
    if (gap > 5) {
        return `You'd sell your token for no less than ${sell} points, but you'd pay no more than ${buy} points for the same token: a gap of ${gap} points. `
            + `The token pays the same either way, ${average} points on average. Once it was yours, giving it up felt like a loss, so you asked more for it. `
            + `For any drawn price between ${buy} and ${sell}, you'd have refused to sell your token and also refused to buy one at that same price.`;
    }
    if (gap < -5) {
        return `You'd pay up to ${buy} points for a token but sell yours for ${sell}. Owning it didn't make you value it more, so this isn't the endowment effect.`;
    }
    return `Your selling price (${sell}) and buying price (${buy}) were within 5 points of each other: owning the token didn't change what it was worth to you.`;
}

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
    patchFraming: {
        short: true,
        biasType: "FRAMING",
        bestAnswer: "The same decision in both versions",
        reasoning: "\"98% of machines restarted normally\" and \"2% failed to restart\" describe exactly the same test results. If you deployed in one version and waited in the other, the wording made the decision. Failure framing makes the same risk feel larger, which matters when you're weighing an urgent fix against breaking machines.",
        biasName: "Framing Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 34",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "framing-patch-success",
                label: "98% success version",
                title: "Emergency Patch Rollout",
                scenarioText: "An emergency patch fixes an actively exploited vulnerability. In testing, 98% of machines installed it and restarted normally. Do you deploy it to every machine tonight?",
                options: [
                    { text: "Deploy tonight", value: "deploy" },
                    { text: "Wait for more testing", value: "wait" }
                ]
            },
            {
                id: "framing-patch-failure",
                label: "2% failure version",
                title: "Overnight Fix Deployment",
                scenarioText: "An urgent security update closes a vulnerability that attackers are using right now. In testing, 2% of machines failed to restart after installing it. Do you push it to every machine tonight?",
                options: [
                    { text: "Deploy tonight", value: "deploy" },
                    { text: "Wait for more testing", value: "wait" }
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
        bestAnswer: "The same estimate in both versions (and the tallest is about 380 feet, or 116 metres)",
        reasoning: "The 1,200-foot and 180-foot figures in the questions were arbitrary, yet in the study Kahneman describes, people given the high number estimated 844 feet (257 m) on average and people given the low number estimated 282 feet (86 m). If your two estimates differed, the anchor moved you. The tallest known redwood, Hyperion, is about 380 feet (116 m).",
        biasName: "Anchoring Effect",
        bookRef: "Thinking, Fast and Slow - Chapter 11",
        isConsistent: sameAnswer,
        versions: [
            {
                id: "anchor-redwood-high",
                label: "1,200-foot (366 m) version",
                title: "Tallest Tree Estimate",
                scenarioText: "Is the tallest living redwood tree taller or shorter than 1,200 feet (366 metres)? Pick your best estimate of its actual height.",
                options: [
                    { text: "Under 180 feet (under 55 m)", value: 1 },
                    { text: "180 to 299 feet (55 to 91 m)", value: 2 },
                    { text: "300 to 449 feet (91 to 137 m)", value: 3 },
                    { text: "450 to 749 feet (137 to 228 m)", value: 4 },
                    { text: "750 to 1,199 feet (228 to 366 m)", value: 5 },
                    { text: "1,200 feet or more (366 m or more)", value: 6 }
                ]
            },
            {
                id: "anchor-redwood-low",
                label: "180-foot (55 m) version",
                title: "Coast Redwood Height",
                scenarioText: "A park ranger asks whether the world's tallest redwood is taller or shorter than 180 feet (55 metres). What is your best estimate of its height?",
                options: [
                    { text: "Under 180 feet (under 55 m)", value: 1 },
                    { text: "180 to 299 feet (55 to 91 m)", value: 2 },
                    { text: "300 to 449 feet (91 to 137 m)", value: 3 },
                    { text: "450 to 749 feet (137 to 228 m)", value: 4 },
                    { text: "750 to 1,199 feet (228 to 366 m)", value: 5 },
                    { text: "1,200 feet or more (366 m or more)", value: 6 }
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
        // Gets the answers' values in version order, like isConsistent
        diagnose: diagnoseTokenPrices,
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
        reasoning: "The second version is the first with every probability divided by four. Under consistent preferences, if you prefer the sure $3,000 to an 80% chance of $4,000, you should also prefer 25% of $3,000 to 20% of $4,000. Most people take the sure thing in the first version and the bigger prize in the second: certainty gets extra weight. Kahneman discusses this pattern, first described by Maurice Allais, in Chapter 29. Some economists argue that valuing certainty this way is a reasonable preference rather than a mistake; what this pair shows is whether a sure thing pulled your choice in one version but not in the other.",
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
        pair.versions.map(v => ({ ...v, biasType: pair.biasType, pair: pairId, short: Boolean(pair.short) }))
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
// The short version (planned questions plus retests) never runs longer than this
export const SHORT_SESSION_MAX = 40;
// The office version is shorter still, including its makeup questions
export const OFFICE_SESSION_MAX = 30;

// Which questions a version may use. The office version, for people who
// don't work in tech or security, uses only questions marked office; the
// other versions skip questions written only for it (officeOnly).
function fitsVersion(s, version) {
    return version === 'office' ? Boolean(s.office) : !s.officeOnly;
}
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
     * `version` 'short' limits the planned part to the short version's
     * questions (tech, security, and dark patterns); 'office' uses only the
     * office questions (phishing resistance for non-technical staff); 'full'
     * uses every question except office-only ones.
     * Returns { queue: [{ id, retest, pad }], plannedLength }.
     */
    static buildSession({ seenIds = new Set(), retestTypes = [], missedIds = new Set(), version = 'full' } = {}) {
        const regular = ScenarioBank.mainQuestions(version).filter(s => !seenIds.has(s.id));
        const scatterCount = Math.ceil(regular.length / QUESTIONS_PER_SCATTERED_FILLER);
        const scattered = ScenarioBank.pickFillers(scatterCount, { seenIds, version });
        const planned = layoutWithPairs([...regular, ...scattered]);

        const used = new Set(planned.map(s => s.id));
        const tail = [];
        for (const type of retestTypes) {
            const sc = ScenarioBank.pickRetestScenario(type, { excludeIds: used, missedIds, askedIds: seenIds, version });
            if (!sc) continue;
            used.add(sc.id);
            tail.push({ id: sc.id, retest: true, pad: false });
        }

        const queue = [...planned.map(s => ({ id: s.id, retest: false, pad: false })), ...tail];
        ScenarioBank.padTail(queue, { tailStart: planned.length, seenIds, version });
        return { queue, plannedLength: planned.length };
    }

    // The regular (scored, non-filler) questions in a version
    static mainQuestions(version = 'full') {
        return MASTER_SCENARIOS.filter(s => !s.practiceOnly && !s.retestOnly && !s.filler && !s.retired
            && fitsVersion(s, version) && (version !== 'short' || s.short));
    }

    // About how many questions a fresh session of this version has
    static sessionLengthEstimate(version = 'full') {
        const regular = ScenarioBank.mainQuestions(version).length;
        const withFillers = regular + Math.ceil(regular / QUESTIONS_PER_SCATTERED_FILLER);
        return Math.ceil(withFillers / REVIEW_BLOCK) * REVIEW_BLOCK;
    }

    /**
     * Up to `count` straightforward questions not in `excludeIds`, preferring
     * ones the player hasn't seen. If that's not enough, falls back to ones in
     * `reusableIds` (already answered earlier in this session).
     */
    static pickFillers(count, { excludeIds = new Set(), seenIds = new Set(), reusableIds = new Set(), version = 'full' } = {}) {
        // In the short version, the tech and security contrast questions come first
        let fillers = shuffle(STANDALONE_SCENARIOS.filter(s => s.filler && fitsVersion(s, version)));
        if (version === 'short') fillers = [...fillers.filter(s => s.short), ...fillers.filter(s => !s.short)];
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
    static padTail(queue, { tailStart, seenIds = new Set(), version = 'full' }) {
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
                ScenarioBank.pickFillers(needed, { excludeIds: inQueue, seenIds, reusableIds: played, version })
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
    static pickRetestScenario(biasType, { excludeIds = new Set(), missedIds = new Set(), askedIds = new Set(), version = 'full' } = {}) {
        const candidates = shuffle(STANDALONE_SCENARIOS.filter(s =>
            s.biasType === biasType && !s.retired && !excludeIds.has(s.id) && fitsVersion(s, version)
        ));
        // A retest-only question is used first while it's unseen, preferring
        // one written as the follow-up to a question the player missed
        return candidates.find(s => s.retestOnly && !askedIds.has(s.id) && missedIds.has(s.retestFor))
            || candidates.find(s => s.retestOnly && !askedIds.has(s.id))
            || candidates.find(s => !askedIds.has(s.id) && !missedIds.has(s.id))
            || candidates.find(s => !askedIds.has(s.id))
            || candidates.find(s => !missedIds.has(s.id))
            || candidates[0]
            || null;
    }

    /**
     * A standalone scenario of `biasType` to practice on during a review,
     * preferring an unseen practice-only question, then one the player has
     * already seen, and only as a last resort an unseen regular question
     * (practice uses it up, so it would never be asked for points). Never returns one in
     * `excludeIds` (e.g. questions still coming up this session). Null if
     * the bias type has no standalone scenarios left to use.
     */
    static pickPracticeScenario(biasType, { seenIds = new Set(), excludeIds = new Set(), version = 'full' } = {}) {
        const candidates = shuffle(STANDALONE_SCENARIOS.filter(s =>
            s.biasType === biasType && !s.retired && !excludeIds.has(s.id) && fitsVersion(s, version)
            // An unseen retest-only backup is kept for the retest
            && !(s.retestOnly && !seenIds.has(s.id))
        ));
        return candidates.find(s => s.practiceOnly && !seenIds.has(s.id))
            || candidates.find(s => seenIds.has(s.id))
            || candidates[0]
            || null;
    }
}
