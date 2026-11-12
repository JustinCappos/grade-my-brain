# Grade My Brain

A browser game that tests how you make decisions, using the cognitive biases described in Daniel Kahneman's
*Thinking, Fast and Slow* plus the social engineering and deceptive design tricks that exploit them.

**Play it:** https://justincappos.github.io/grade-my-brain/

Players answer short scenarios about security, technology, money and risk. Every 10 questions a review
explains each answer, offers a tip for thinking differently, and gives a practice question on anything that
tripped the player up. Missed topics come back later as rematches, using questions the player hasn't seen.

## Versions

The start screen asks which describes the player best:

| Version | Who it's for | Length |
|---|---|---|
| Short version | People on their organization's security or IT team | About 30 questions on security, technology and deceptive design, with a full version (about 90 more questions on decision-making in general) offered afterwards |
| Office version | Everyone else | About 20 plain-language questions on spotting phishing and scams at work, with makeup rounds drawn only from office questions |

To send staff straight to the office version, share
https://justincappos.github.io/grade-my-brain/?mode=office, which preselects it.

## Features

- Grades by accuracy, in a positive and playful tone, with a final report of strengths and topics to work on.
- Interactive mock screens: email, phone prompts, browser warnings, installers and an inbox to sort.
- A question timer, with a nudge for anyone averaging under 5 seconds a question, and a reminder for players who
  keep switching away from the window while answering.
- A few surprises that aren't questions. The source explains them, if you don't mind spoilers.

## Privacy

The game collects no data. There are no accounts, analytics, cookies or trackers, and nothing a player does is
sent anywhere. Progress is saved only in the player's own browser (localStorage), and clearing the site's data
or choosing **Start over** deletes it. The [privacy policy](privacy.html) is mostly a joke, but the summary at the
end of it is accurate.

## Running it locally

It's a static site with no build step. Any static file server works; the included one needs Node.js:

```sh
npm start        # or ./start.sh; serves http://localhost:8080 (set PORT to change it)
```

## Reviewing the questions

[questions.html](questions.html) lists every question with its answers, explanation and source, with filters
by topic, kind and version, and Keep / Unsure / Cut marks for reviewers. The live copy is at
https://justincappos.github.io/grade-my-brain/questions.html.

## Tests

`test_brave.js` checks the question bank and session builder, then plays several full sessions in headless
[Brave](https://brave.com/) (with audio muted): the short version, the full version and the office version.

```sh
npm install
npm test
```

The test expects Brave at `/Applications/Brave Browser.app` (macOS). Change `BRAVE_PATH` at the top of
`test_brave.js` to use another Chromium-based browser.

## Project layout

| Path | What it holds |
|---|---|
| `index.html`, `css/main.css` | The game page and its styles |
| `js/app.js` | Game flow: sessions, reviews, practice, retests, the timer and the final report |
| `js/scenarioBank.js` | Every question, the bias topics, and the session builder |
| `js/realWorldExamples.js` | Real-world examples linked from each topic |
| `js/progress.js` | Progress saved in the browser |
| `js/biasAnalyzer.js`, `js/chart.js` | The report's analysis, score chart and radar chart |
| `privacy.html` | The (mostly joke) privacy policy |
| `questions.html` | The question review tool |
| `images/`, `tools/make_ads.py` | Mascots and mock ads for fictional brands (the script generates the ads) |
| `fonts/` | Bundled Inter and Outfit fonts (SIL Open Font License) |

## License

Apache License 2.0; see [LICENSE](LICENSE). To report a security issue, see [SECURITY.md](SECURITY.md).
