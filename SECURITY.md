# Security Policy

## Reporting a vulnerability

Please report security issues privately through GitHub's private vulnerability
reporting, not in a public issue or pull request:

1. Go to the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Describe the issue, how to reproduce it, and what an attacker could do with it.

Or open the form directly: [Report a vulnerability](../../security/advisories/new).

You can expect an acknowledgement within a few days. We'll keep you updated as we
investigate, and credit you in the published advisory unless you'd rather stay anonymous.

## Supported versions

Only the latest version on the `main` branch, which is what the live site runs,
receives security fixes.

## Scope

Grade My Brain is a static website: the game runs entirely in the browser, and
there is no server-side code or database. Player progress is stored only in the
browser's local storage. Reports that are especially useful include:

- Script injection (XSS) through question content, ID codes, or other inputs
- Ways for one site or user to read or change another player's saved progress
- Problems in the question review page's shared voting (`questions.html`)
- Vulnerabilities in the project's dependencies

The privacy policy (`privacy.html`) is intentionally absurd and part of the game's
lesson on deceptive design; its terms are not a security issue.
