/**
 * Grade My Brain - Real-World Examples
 * Links shown when a player misses a question, so each bias connects to a
 * real case. kind: "deceptive" = a company using the pattern against users;
 * "good" = a company or policy avoiding it or using it for users' benefit;
 * "example" = a neutral real-world illustration.
 *
 * Every URL was loaded and checked against its label in October 2026.
 * Re-check before publishing widely: news pages move and cases get resolved.
 */

export const REAL_WORLD_EXAMPLES = {
    "HALO": [
        {
            "label": "Halo effect overview: attractive defendants judged more leniently; iPod success lifted Apple's image",
            "url": "https://en.wikipedia.org/wiki/Halo_effect",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Same wine tasted better, and lit up pleasure areas more, when labeled $45 instead of $5",
            "url": "https://www.sciencedaily.com/releases/2008/01/080126101053.htm",
            "kind": "example",
            "source": "ScienceDaily (Caltech/Stanford study)"
        },
        {
            "label": "Snap judgments of competence from candidates' faces predicted about 70% of 2006 races",
            "url": "https://www.sciencedaily.com/releases/2007/10/071022171925.htm",
            "kind": "example",
            "source": "ScienceDaily (Princeton study)"
        }
    ],
    "WYSIATI": [
        {
            "label": "Google paid $391.5M to 40 states; users weren't told a second setting still collected location",
            "url": "https://ago.nebraska.gov/news/40-attorneys-general-announce-historic-google-settlement-over-location-tracking-practices",
            "kind": "deceptive",
            "source": "Nebraska Attorney General"
        },
        {
            "label": "Abraham Wald studied damage on bombers that made it back, not the ones lost",
            "url": "https://en.wikipedia.org/wiki/Survivorship_bias",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "1936 Literary Digest poll called a Landon landslide from a skewed sample; Roosevelt won big",
            "url": "https://en.wikipedia.org/wiki/The_Literary_Digest",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "SMALL_NUMBERS": [
        {
            "label": "UK regulator ruled Colgate's '80% of dentists recommend' ad misleading; dentists could pick several brands",
            "url": "https://marketinglaw.osborneclarke.com/retailing/colgates-80-of-dentists-recommend-claim-under-fire/",
            "kind": "deceptive",
            "source": "Osborne Clarke (on UK ASA ruling)"
        },
        {
            "label": "Lowest and highest kidney cancer rates both turn up in small rural counties: a small-sample effect",
            "url": "https://en.wikipedia.org/wiki/Insensitivity_to_sample_size",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "ANCHORING": [
        {
            "label": "Los Angeles sued JCPenney, Kohl's, Macy's, Sears over 'original' prices allegedly never charged",
            "url": "https://www.nbcnews.com/business/consumer/jcpenney-sears-macy-s-kohl-s-sued-fake-sale-pricing-n694101",
            "kind": "deceptive",
            "source": "NBC News"
        },
        {
            "label": "Emma Sleep admitted misleading countdown timers and discount claims to UK regulator in 2026",
            "url": "https://www.gov.uk/government/news/court-endorses-cma-action-as-emma-sleep-agrees-to-change-sales-practices",
            "kind": "deceptive",
            "source": "UK CMA"
        },
        {
            "label": "FTC pricing guides: a made-up 'former price' turns a discount into a false bargain",
            "url": "https://www.law.cornell.edu/cfr/text/16/233.1",
            "kind": "good",
            "source": "16 CFR 233.1 (Cornell LII)"
        }
    ],
    "AVAILABILITY": [
        {
            "label": "In most Gallup polls since 1993, most Americans said crime was rising while it fell",
            "url": "https://www.pewresearch.org/short-reads/2024/04/24/what-the-data-says-about-crime-in-the-us/",
            "kind": "example",
            "source": "Pew Research Center"
        },
        {
            "label": "Frequent consumers of local crime news are much more worried about crime affecting them",
            "url": "https://www.pewresearch.org/short-reads/2024/08/29/the-link-between-local-news-coverage-and-americans-perceptions-of-crime/",
            "kind": "example",
            "source": "Pew Research Center"
        },
        {
            "label": "Heavy shark-attack coverage makes sharks seem deadlier than falling airplane parts, which kill more",
            "url": "https://en.wikipedia.org/wiki/Availability_heuristic",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "REPRESENTATIVENESS": [
        {
            "label": "Linda problem, plus experts rating a detailed Soviet-Poland scenario likelier than a simpler one",
            "url": "https://en.wikipedia.org/wiki/Conjunction_fallacy",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Moneyball: A's used statistics where scouts relied on how players looked and felt",
            "url": "https://en.wikipedia.org/wiki/Moneyball_(book)",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "LESS_IS_MORE": [
        {
            "label": "Judged alone, 24 intact dishes beat 31 dishes with a few broken; 7 oz full cup beat 8 oz",
            "url": "https://en.wikipedia.org/wiki/Less-is-better_effect",
            "kind": "example",
            "source": "Wikipedia (Hsee studies)"
        }
    ],
    "BASE_RATE": [
        {
            "label": "About half of U.S. women screened yearly for 10 years get at least one false-positive mammogram",
            "url": "https://www.cancer.gov/types/breast/hp/breast-screening-pdq",
            "kind": "example",
            "source": "National Cancer Institute"
        },
        {
            "label": "NIST found face recognition false-match rates 10 to 100 times higher for some groups",
            "url": "https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software",
            "kind": "example",
            "source": "NIST"
        },
        {
            "label": "Detroit man wrongly arrested after facial recognition match; settlement bars match-only arrests",
            "url": "https://www.michiganpublic.org/criminal-justice-legal-system/2024-06-28/it-didnt-make-sense-at-all-wrongful-facial-recognition-arrest-leads-to-landmark-settlement",
            "kind": "example",
            "source": "Michigan Public"
        },
        {
            "label": "Sally Clark convicted partly on a flawed '1 in 73 million' statistic; conviction overturned 2003",
            "url": "https://en.wikipedia.org/wiki/Sally_Clark",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "REGRESSION": [
        {
            "label": "Sports Illustrated cover 'jinx': athletes appear after peak performances, then regress",
            "url": "https://en.wikipedia.org/wiki/Sports_Illustrated_cover_jinx",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Regression toward the mean explained, from Galton's heights to everyday examples",
            "url": "https://en.wikipedia.org/wiki/Regression_toward_the_mean",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "OUTCOME_BIAS": [
        {
            "label": "Seahawks' Super Bowl XLIX goal-line pass: judged almost entirely by its interception outcome",
            "url": "https://grantland.com/the-triangle/super-bowl-new-england-patriots-seattle-seahawks/",
            "kind": "example",
            "source": "Grantland"
        },
        {
            "label": "Outcome bias: judging a decision by its result instead of the information available then",
            "url": "https://en.wikipedia.org/wiki/Outcome_bias",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Hindsight bias: after the fact, events seem more predictable than they were",
            "url": "https://en.wikipedia.org/wiki/Hindsight_bias",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "INTUITION_VS_FORMULA": [
        {
            "label": "Apgar score: a simple 5-item, 0-10 checklist for rating newborns at 1 and 5 minutes",
            "url": "https://en.wikipedia.org/wiki/Apgar_score",
            "kind": "good",
            "source": "Wikipedia"
        },
        {
            "label": "WHO Surgical Safety Checklist linked to lower complications and deaths in multiple studies",
            "url": "https://en.wikipedia.org/wiki/WHO_Surgical_Safety_Checklist",
            "kind": "good",
            "source": "Wikipedia"
        },
        {
            "label": "Paul Meehl showed simple statistical rules tend to match or beat clinicians' judgment",
            "url": "https://en.wikipedia.org/wiki/Paul_E._Meehl",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Moneyball: Oakland A's used statistics over scouts' subjective evaluations",
            "url": "https://en.wikipedia.org/wiki/Moneyball_(book)",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "PLANNING": [
        {
            "label": "Sydney Opera House: planned for 1963 at about $7M; opened 1973 at A$102M",
            "url": "https://en.wikipedia.org/wiki/Sydney_Opera_House",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Boston's Big Dig: estimated $2.8B, finished in 2007 at $14.6B, about nine years late",
            "url": "https://en.wikipedia.org/wiki/Big_Dig",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Planning fallacy: why projects routinely run over time and budget",
            "url": "https://en.wikipedia.org/wiki/Planning_fallacy",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "LOSS_AVERSION": [
        {
            "label": "A 5-cent bag tax cut disposable bag use 40+ points; a 5-cent bonus did almost nothing",
            "url": "https://www.aeaweb.org/articles?id=10.1257/pol.20150261",
            "kind": "example",
            "source": "American Economic Journal"
        },
        {
            "label": "Chicago's 7-cent bag tax cut disposable bag use sharply, a result framed as loss aversion",
            "url": "https://wagner.nyu.edu/news/story/chicagos-disposable-bag-tax-working-study-finds",
            "kind": "example",
            "source": "NYU Wagner"
        },
        {
            "label": "Loss aversion: losses feel roughly twice as strong as equal-sized gains",
            "url": "https://en.wikipedia.org/wiki/Loss_aversion",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "ENDOWMENT": [
        {
            "label": "Classic mug experiment: owners asked far more to sell than buyers would pay",
            "url": "https://www.casact.org/abstract/experimental-tests-endowment-effect-and-coase-theorem",
            "kind": "example",
            "source": "Kahneman, Knetsch & Thaler (1990)"
        },
        {
            "label": "Endowment effect overview: we value things more once they're ours",
            "url": "https://en.wikipedia.org/wiki/Endowment_effect",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "FOURFOLD": [
        {
            "label": "Consumer Reports advises skipping most extended warranties, calling them a poor deal",
            "url": "https://www.nbcnews.com/id/wbna15704495",
            "kind": "example",
            "source": "NBC News / Consumer Reports"
        },
        {
            "label": "Official Powerball odds: 1 in 292,201,338 for the jackpot",
            "url": "https://www.powerball.com/powerball-prize-chart",
            "kind": "example",
            "source": "Powerball"
        },
        {
            "label": "Certainty effect: moving from 'probable' to 'certain' feels bigger than it is",
            "url": "https://en.wikipedia.org/wiki/Certainty_effect",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "DENOMINATOR": [
        {
            "label": "Raw counts of vaccinated COVID deaths mislead when most people are vaccinated; compare rates",
            "url": "https://www.factcheck.org/2021/11/scicheck-why-its-easy-to-misinterpret-numbers-of-deaths-among-the-vaccinated/",
            "kind": "example",
            "source": "FactCheck.org"
        },
        {
            "label": "How to compare vaccinated and unvaccinated deaths without falling for the base rate trap",
            "url": "https://www.scientificamerican.com/article/how-to-compare-covid-deaths-for-vaccinated-and-unvaccinated-people/",
            "kind": "example",
            "source": "Scientific American"
        },
        {
            "label": "People preferred 9-in-100 over 1-in-10 odds because there were more winning beans",
            "url": "https://en.wikipedia.org/wiki/Denominator_neglect",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "NARROW_FRAMING": [
        {
            "label": "Investors who check portfolios often feel more losses and shy away from stocks",
            "url": "https://www.nber.org/papers/w4369",
            "kind": "example",
            "source": "NBER (Benartzi & Thaler)"
        },
        {
            "label": "Mental accounting: treating money in separate mental buckets instead of as a whole",
            "url": "https://en.wikipedia.org/wiki/Mental_accounting",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "SUNK_COST": [
        {
            "label": "'Concorde fallacy': UK and France kept funding Concorde after it stopped making economic sense",
            "url": "https://en.wikipedia.org/wiki/Sunk_cost",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Concorde's history, from development costs to retirement in 2003",
            "url": "https://en.wikipedia.org/wiki/Concorde",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "FRAMING": [
        {
            "label": "Framing effect overview, including survival vs. mortality and gain vs. loss wording",
            "url": "https://en.wikipedia.org/wiki/Framing_effect_(psychology)",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Same 5 cents, opposite results: framed as a bag fee it worked; as a bonus it didn't",
            "url": "https://www.aeaweb.org/articles?id=10.1257/pol.20150261",
            "kind": "example",
            "source": "American Economic Journal"
        }
    ],
    "DEFAULTS": [
        {
            "label": "FTC: Facebook made some user info public by default in 2009 without warning or consent",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2011/11/facebook-settles-ftc-charges-it-deceived-consumers-failing-keep-privacy-promises",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "Fortnite had voice and text chat on by default for kids; FTC ordered it off",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "Deceived by Design: Facebook, Google, Windows 10 steered users to privacy-intrusive defaults",
            "url": "https://www.forbrukerradet.no/rapporter/deceived-by-design/",
            "kind": "deceptive",
            "source": "Norwegian Consumer Council"
        },
        {
            "label": "Apple requires apps to ask permission before tracking you across other apps",
            "url": "https://support.apple.com/en-us/102420",
            "kind": "good",
            "source": "Apple"
        },
        {
            "label": "Automatic 401(k) enrollment sharply raised participation at a large U.S. employer",
            "url": "https://www.nber.org/papers/w7682",
            "kind": "good",
            "source": "NBER (Madrian & Shea)"
        },
        {
            "label": "EU's top court ruled pre-ticked boxes are not valid consent for cookies (Planet49, 2019)",
            "url": "https://curia.europa.eu/site/upload/docs/application/pdf/2019-10/cp190125en.pdf",
            "kind": "good",
            "source": "Court of Justice of the EU"
        },
        {
            "label": "Firefox turned on tracking-cookie blocking by default for all users in 2019",
            "url": "https://blog.mozilla.org/blog/2019/09/03/todays-firefox-blocks-third-party-tracking-cookies-and-cryptomining-by-default/",
            "kind": "good",
            "source": "Mozilla"
        }
    ],
    "PEAK_END": [
        {
            "label": "Colonoscopy patients given a longer but gentler ending remembered it as less unpleasant",
            "url": "https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "682-patient trial: a milder ending changed memories and made return visits more likely",
            "url": "https://en.wikipedia.org/wiki/Duration_neglect",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "COMPROMISE": [
        {
            "label": "Williams-Sonoma added a $429 bread maker; sales of the $275 model nearly doubled",
            "url": "https://www.pon.harvard.edu/daily/the-value-of-the-contrast-effect-in-financial-negotiations",
            "kind": "example",
            "source": "Harvard Program on Negotiation"
        },
        {
            "label": "Simonson & Tversky: an option looks more attractive when it sits in the middle",
            "url": "https://www.gsb.stanford.edu/faculty-research/publications/choice-context-tradeoff-contrast-extremeness-aversion",
            "kind": "example",
            "source": "Stanford GSB"
        }
    ],
    "DECOY": [
        {
            "label": "The Economist's $125 print-only option made $125 print+web look like a steal",
            "url": "https://en.wikipedia.org/wiki/Decoy_effect",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "SALIENCE_RARITY": [
        {
            "label": "Genshin Impact maker paid $20M; FTC said loot box odds and real costs were obscured",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2025/01/genshin-impact-game-developer-will-be-banned-selling-lootboxes-teens-under-16-without-parental",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "Belgium's Gaming Commission ruled loot boxes in FIFA 18, Overwatch, CS:GO illegal gambling",
            "url": "https://www.gamedeveloper.com/business/belgian-gaming-commission-declares-loot-boxes-illegal",
            "kind": "good",
            "source": "Game Developer"
        },
        {
            "label": "UK found loot boxes linked to problem gambling but chose industry-led rules over a ban",
            "url": "https://www.gov.uk/government/calls-for-evidence/loot-boxes-in-video-games-call-for-evidence/outcome/government-response-to-the-call-for-evidence-on-loot-boxes-in-video-games",
            "kind": "example",
            "source": "UK Government (DCMS)"
        },
        {
            "label": "Loot boxes compared to slot machines' variable rewards; regulation around the world",
            "url": "https://en.wikipedia.org/wiki/Loot_box",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "DRIP_PRICING": [
        {
            "label": "FTC sued Ticketmaster in 2025, alleging fees up to 44% were added at checkout",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-sues-live-nation-ticketmaster-engaging-illegal-ticket-resale-tactics-deceiving-artists-consumers",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "FTC rule requires ticket and hotel sellers to show the full price, fees included, upfront",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2024/12/federal-trade-commission-announces-bipartisan-rule-banning-junk-ticket-hotel-fees",
            "kind": "good",
            "source": "FTC"
        },
        {
            "label": "Airbnb switched to showing total prices with fees by default worldwide in 2025",
            "url": "https://fortune.com/article/airbnb-full-price-junk-fees/",
            "kind": "good",
            "source": "Fortune"
        },
        {
            "label": "UK: booking sites agreed to include compulsory fees in headline prices after CMA probe",
            "url": "https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe",
            "kind": "good",
            "source": "UK CMA"
        }
    ],
    "RELATIVE_RISK": [
        {
            "label": "Harding Center 'fact boxes' show health benefits and harms as absolute risks",
            "url": "https://www.who.int/news-room/feature-stories/detail/scicom-compilation-factbox",
            "kind": "good",
            "source": "World Health Organization"
        },
        {
            "label": "Relative risk reduction: how it differs from the absolute change in risk",
            "url": "https://en.wikipedia.org/wiki/Relative_risk_reduction",
            "kind": "example",
            "source": "Wikipedia"
        },
        {
            "label": "Number needed to treat: how many people must take a treatment for one to benefit",
            "url": "https://en.wikipedia.org/wiki/Number_needed_to_treat",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "FAKE_URGENCY": [
        {
            "label": "Princeton crawl of ~11K shops found 393 countdown timers, some with fake deadlines",
            "url": "https://webtransparency.cs.princeton.edu/dark-patterns",
            "kind": "deceptive",
            "source": "Princeton (Mathur et al. 2019)"
        },
        {
            "label": "Emma Sleep admitted misleading countdown timers and false 'high demand' claims (UK, 2026)",
            "url": "https://www.gov.uk/government/news/court-endorses-cma-action-as-emma-sleep-agrees-to-change-sales-practices",
            "kind": "deceptive",
            "source": "UK CMA"
        },
        {
            "label": "Booking sites agreed to stop false scarcity and popularity claims after UK probe",
            "url": "https://www.gov.uk/government/news/hotel-booking-sites-to-make-major-changes-after-cma-probe",
            "kind": "good",
            "source": "UK CMA"
        }
    ],
    "PRICE_FRAMING": [
        {
            "label": "FTC: Adobe highlighted a monthly price while burying an annual plan's early-cancellation fee",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2024/06/ftc-takes-action-against-adobe-executives-hiding-fees-preventing-consumers-easily-cancelling",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "Study: restating a price as small daily amounts ('pennies a day') raises sign-ups",
            "url": "https://ideas.repec.org/a/oup/jconrs/v24y1998i4p395-408.html",
            "kind": "example",
            "source": "Journal of Consumer Research (Gourville)"
        }
    ],
    "UNIT_PRICE": [
        {
            "label": "Toblerone cut its UK bar from 170g to 150g by widening the gaps",
            "url": "https://en.wikipedia.org/wiki/Shrinkflation",
            "kind": "deceptive",
            "source": "Wikipedia"
        },
        {
            "label": "France requires large stores to post shelf signs on shrunken products and unit prices",
            "url": "https://www.freshplaza.com/europe/article/9626260/france-fights-shrinkflation-in-supermarkets/",
            "kind": "good",
            "source": "FreshPlaza"
        },
        {
            "label": "BLS counts a smaller package at the same price as a price increase",
            "url": "https://www.bls.gov/opub/btn/volume-12/measuring-shrinkflation-and-its-impact-on-inflation.htm",
            "kind": "example",
            "source": "U.S. Bureau of Labor Statistics"
        },
        {
            "label": "GAO: shrinkflation barely moved overall inflation but hit products like paper goods",
            "url": "https://files.gao.gov/reports/GAO-25-107451/index.html",
            "kind": "example",
            "source": "U.S. GAO"
        }
    ],
    "ZERO_PRICE": [
        {
            "label": "Making a chocolate free, not just a penny cheaper, sharply shifted people's choices",
            "url": "https://scholars.duke.edu/publication/859276",
            "kind": "example",
            "source": "Marketing Science (Shampanier, Mazar & Ariely)"
        },
        {
            "label": "Facebook quietly dropped 'It's free and always will be' from its sign-up page in 2019",
            "url": "https://www.buffalo.edu/news/ub-in-the-news/2019/08/012.html",
            "kind": "example",
            "source": "University at Buffalo"
        },
        {
            "label": "FTC warns that free trials usually turn into paid charges if you don't cancel in time",
            "url": "https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions",
            "kind": "example",
            "source": "FTC"
        }
    ],
    "MISLEADING_CHARTS": [
        {
            "label": "Planned Parenthood hearing chart used unlabeled dual axes to suggest a reversal not in the data",
            "url": "https://www.politifact.com/factchecks/2015/oct/01/jason-chaffetz/chart-shown-planned-parenthood-hearing-misleading/",
            "kind": "deceptive",
            "source": "PolitiFact"
        },
        {
            "label": "Truncated axis made 8% job growth in a state chart look like 2.7 times more",
            "url": "https://www.callingbullshit.org/tools/tools_proportional_ink.html",
            "kind": "example",
            "source": "Calling Bullshit (Univ. of Washington)"
        },
        {
            "label": "How truncated axes and other tricks distort graphs",
            "url": "https://en.wikipedia.org/wiki/Misleading_graph",
            "kind": "example",
            "source": "Wikipedia"
        }
    ],
    "ROACH_MOTEL": [
        {
            "label": "Amazon paid $2.5B over Prime sign-ups and its hard-to-cancel flow (FTC, 2025)",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-against-amazon",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "FTC alleges canceling Uber One could take up to 23 screens and 32 actions",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-takes-action-against-uber-deceptive-billing-cancellation-practices",
            "kind": "deceptive",
            "source": "FTC"
        },
        {
            "label": "California law requires online click-to-cancel when you signed up online (from July 2025)",
            "url": "https://www.gov.ca.gov/2024/09/24/governor-newsom-signs-consumer-protection-bills-targeting-medical-debt-overdraft-fees-and-unfair-subscription-practices/",
            "kind": "good",
            "source": "Governor of California"
        },
        {
            "label": "Federal court vacated the FTC's click-to-cancel rule on procedural grounds in July 2025",
            "url": "https://ecf.ca8.uscourts.gov/opndir/25/07/243137P.pdf",
            "kind": "example",
            "source": "U.S. Court of Appeals, 8th Circuit"
        }
    ]
};
