# Changelog

All notable changes to **Five Star Trivia** will be documented in this file.

## [Unreleased]

### Added
- Custom graphic header (replacing ASCII/Emoji title).
- High Score Arcade-style page.
- Credits.

### Planned
- Playtest feedback implementation.
- Sound effects (8-bit "Correct/Incorrect" chirps).
- Music (ON/OFF toggle).

---

## [0.0.3] - 2026-04-03

### Added in 0.0.3
- Linter integration.
- Git Hook for Changelog reminders.

### Changed in 0.0.3
- Modified the `Arrange` sub-program in `trivia_wrangler.js` to output a tighter JSON format.

## [0.0.2] - 2026-04-03

### Added in 0.0.2
- Created `trivia_wrangler.js` tool for JSON validation and sorting.
- Light/Dark mode toggle.
- Test Suite using Playwright (Smoke, Regression, and E2E).
- Official project Changelog.

### Changed in 0.0.2
- Refactored `script.js` to use `fetch()` for externalized `questions.json`.
- Updated `style.css` with media queries for mobile-friendly play.
- Updated README with official game manual styling and emojis.

### Fixed
- Fixed "Start" button inactivity by implementing `async/await` for data loading.
- Resolved file path issues by moving `questions.json` to the project root.
- Fixed Playwright test file path issues.
