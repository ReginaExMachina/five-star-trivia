# Changelog

All notable changes to **Five Star Trivia** will be documented in this file.

## [Unreleased]

### Planned
- High Score Arcade-style page.
- Credits.
- Clear game condition.
- Music (ON/OFF toggle).
- Special character handling for trivia_wrangler transform.

---

## [1.0.1] - 2026-04-21

## Added
- BETA links to README.

## [1.0.1] - 2026-04-15

## Changed
- CHANGELOG headings.

## Fixed
- Multiple duplicate and nonsensical questions.

## Removed
- Victory Music.

## [1.0.0] - 2026-04-13

### Added
- Sound effects for button presses, victory and fail music.

---

## [0.0.5] - 2026-04-09

### Added
- Custom icons for both themes.

## [0.0.4] - 2026-04-08

### Added
- All defaults for Difficulty and Region.
- Bug template.
- Reached 1000+ questions!

### Changed
- Transform options in trivia_wrangler use tighter format.
- Edits to README.
- Removed auto-linter.

## [0.0.3] - 2026-04-03

### Added
- Linter integration.
- Git Hook for Changelog reminders.

### Changed
- Modified the `Arrange` sub-program in `trivia_wrangler.js` to output a tighter JSON format.

## [0.0.2] - 2026-04-03

### Added
- Created `trivia_wrangler.js` tool for JSON validation and sorting.
- Light/Dark mode toggle.
- Test Suite using Playwright (Smoke, Regression, and E2E).
- Official project Changelog.

### Changed
- Refactored `script.js` to use `fetch()` for externalized `questions.json`.
- Updated `style.css` with media queries for mobile-friendly play.
- Updated README with official game manual styling and emojis.

### Fixed
- Fixed "Start" button inactivity by implementing `async/await` for data loading.
- Resolved file path issues by moving `questions.json` to the project root.
- Fixed Playwright test file path issues.
