# Staging security and build remediation

Baseline: staging `f48b0dd5bae971d6ae39f63aa9f134d142142168`; main `471624de2b20d297230f4b168f621e680f0e38ca`.

## Build failure

Numbered copies such as `.next/dev/types/routes.d 2.ts` and `cache-life.d 2.ts` were compiled alongside the canonical generated files. Next.js writes canonical filenames; no project generator creating numbered copies was found. The copying/synchronization process responsible cannot be established from repository evidence. The existing tsconfig include patterns are recommended Next.js paths and were retained; no errors are suppressed.

The old `.next` directory was moved intact to a temporary backup, preserving artifacts without touching application source. A fresh generation and sequential check succeeded. Keep `.next`, node_modules, and TypeScript caches out of external synchronization/restore operations. Stop the dev server before running the release check.

Use `npm run typecheck` to generate route types before TypeScript checking. Use `npm run check` to run lint, type checking, and the production build sequentially.

## Dependency changes

| Package | Before | After |
| --- | --- | --- |
| `next` | 16.3.5 | 16.3.8 |
| `eslint-config-next` | 16.3.5 | 16.3.8 |
| `@next/eslint-plugin-next` | 16.3.5 | 16.3.8 |
| `sharp` | 0.35.4 | 0.35.5 |
| `source-map-js` | 1.2.1 | 1.2.2 |
| `brace-expansion` | 1.1.18 | 1.1.21 |
| `@typescript-eslint/typescript-estree/node_modules/brace-expansion` | 5.0.9 | 5.0.12 |
| `react` | 19.2.8 | 19.2.8 |
| `react-dom` | 19.2.8 | 19.2.8 |

## Advisory inventory

Initial full audit: 1 critical and 8 high vulnerable packages. After remediation: 0 critical and 5 high. Production-only audit: 0 vulnerabilities. These are package counts, not distinct exploit counts.

### @next/eslint-plugin-next (high)

Paths: `node_modules/@next/eslint-plugin-next`.

- Inherits advisory through `fast-glob`.

Status: Remaining development-only finding; see risk assessment below.

### brace-expansion (high)

Paths: `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`, `node_modules/brace-expansion`.

- [brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr); affected: `<1.1.21`.
- [brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr); affected: `>=4.0.0 <5.0.12`.
- [brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion](https://github.com/advisories/GHSA-qhr7-859c-m2p7); affected: `<1.1.20`.
- [brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion](https://github.com/advisories/GHSA-qhr7-859c-m2p7); affected: `>=4.0.0 <5.0.11`.
- [brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p); affected: `<1.1.19`.
- [brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p); affected: `>=4.0.0 <5.0.10`.

Status: Resolved by the patched compatible dependency graph.

### braces (high)

Paths: `node_modules/braces`.

- [braces vulnerable to stack-exhaustion denial of service through deeply nested patterns](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); affected: `<=3.0.3`.

Status: Remaining development-only finding; see risk assessment below.

### eslint-config-next (high)

Paths: `node_modules/eslint-config-next`.

- Inherits advisory through `@next/eslint-plugin-next`.

Status: Remaining development-only finding; see risk assessment below.

### fast-glob (high)

Paths: `node_modules/fast-glob`.

- Inherits advisory through `micromatch`.

Status: Remaining development-only finding; see risk assessment below.

### micromatch (high)

Paths: `node_modules/micromatch`.

- Inherits advisory through `braces`.

Status: Remaining development-only finding; see risk assessment below.

### next (critical)

Paths: `node_modules/next`.

- [Next.js: Remote Code Execution in next/og ImageResponse](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j); affected: `>=16.2.0 <16.3.6`.
- [Next.js: Pending `use cache` fill can leak Draft Mode content into regular responses and persisted pages](https://github.com/advisories/GHSA-3w37-wq28-93x7); affected: `>=16.3.0 <16.3.8`.
- [Next.js has cache poisoning of SSG and ISR pages in self-hosted applications](https://github.com/advisories/GHSA-4jqv-mc3x-m676); affected: `>=16.0.0 <16.3.8`.
- [Next.js has information disclosure in development server's Model Context Protocol endpoint](https://github.com/advisories/GHSA-39w2-rjm5-chcv); affected: `>=16.0.0 <16.3.8`.
- [Next.js has information disclosure in App Router metadata image routes via dynamicParams bypass](https://github.com/advisories/GHSA-f87g-xv8r-7p7x); affected: `>=16.0.0 <16.3.8`.
- [Next.js has cache poisoning in SSG/ISR rendering that leads to cross-user content substitution and persistent denial of service](https://github.com/advisories/GHSA-mcj8-r9mp-w47p); affected: `>=16.0.0 <16.3.8`.
- [Next.js has Server-Side Request Forgery in Image Optimization](https://github.com/advisories/GHSA-cjq9-62q9-8jv4); affected: `>=16.0.0 <16.3.8`.

Status: Resolved by the patched compatible dependency graph.

### sharp (high)

Paths: `node_modules/sharp`.

- [sharp : Vulnerability in librsvg dependency CVE-2026-96889](https://github.com/advisories/GHSA-wq5f-xc86-pv6w); affected: `<0.35.5`.

Status: Resolved by the patched compatible dependency graph.

### source-map-js (high)

Paths: `node_modules/source-map-js`.

- [source-map-js allows event-loop denial of service through indexed source-map section offsets](https://github.com/advisories/GHSA-68fv-2mgg-jv7q); affected: `>=1.0.0 <1.2.2`.

Status: Resolved by the patched compatible dependency graph.

## Remaining development-only findings

`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces@3.0.3` accounts for all five remaining high reports. All are marked development-only in the lockfile and absent from `npm audit --omit=dev`. The underlying advisory is GHSA-vfj7-8cjw-p6xm (deeply nested attacker-controlled brace patterns can exhaust the stack). No patched braces release is published. npm suggests eslint-config-next 14.2.35, an incompatible major downgrade; it was not applied.

This remains a development/CI denial-of-service risk when processing untrusted glob patterns or repository configuration. It is not resolved or suppressed. The application runtime does not import this lint dependency chain. Do not lint untrusted contributions in a privileged environment. Recheck the advisory when a compatible upstream fix appears.

The Next.js patch to 16.3.8 covers GHSA-vcvr-r3jv-pc5j (fixed in 16.3.6), GHSA-cjq9-62q9-8jv4 (fixed in 16.3.8), and the other Next.js advisories reported by the baseline audit. The app has no next/og ImageResponse handler, but the vulnerable dependency was patched regardless.

No major dependency upgrade, force fix, vulnerability suppression, production variable change, or production deployment was used.

## Verification evidence

- `npm run check` passed after clean regeneration, and passed again after a development-server cycle: lint → route type generation → TypeScript → default Turbopack production build.
- No numbered duplicate TypeScript declarations appeared after regeneration. Both canonical development and production type directories coexist without errors; tsconfig was not relaxed.
- `npm ls --depth=0` reports compatible direct dependencies.
- Local browser: no horizontal overflow at 375, 430, 768, and 1440px; all in-page anchors resolve. Mobile menu opens and closes on navigation. Light and dark themes toggle and persist across reload. Footer developer email and configured WhatsApp/directions links are retained.
- The official Modinagar embed renders with native Google map controls. Google controls the precise embedded interface.
- Required-field form validation shows three useful errors and focuses the first invalid field.
- Seven isolated server-handler cases passed with a mocked Resend client: malformed JSON, invalid fields, honeypot, missing configuration, successful send, provider error, and thrown exception. No real email was sent.
- Local production-build smoke checks passed for page load, dark preference persistence, contact map URL, canonical URL, and overflow; no captured runtime errors.
- Title, description, Open Graph title, canonical URL, index/follow robots directive, and parseable WebSite JSON-LD were checked in the browser.
- No existing automated test suite or test command is present. The isolated handler checks are a one-off validation, not a repository test suite.
- Live delivery, live WhatsApp messaging, system-preference emulation, visual flash measurement, and authenticated deployed Preview browser testing remain unverified. Do not describe local checks as deployed Preview validation.
