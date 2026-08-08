# BizMind Enterprise Dashboard — Sales Landing Page

Static sales landing page for **BizMind Enterprise Dashboard**, built to spec from
`BizMind_Enterprise_Dashboard_Sales_Landing_Page_Specification.docx`.

## Run it

Open `index.html` directly in a browser — no build step, no server, no dependencies.

## Structure

```
bizmind-sales/
├── index.html          # all sections, bilingual (data-th / data-en on every text node)
├── styles.css           # design system + responsive layout (mobile-first breakpoints)
├── app.js                # theme + language toggle, pipeline, demo, FAQ, reveal, tracking
├── assets/
│   ├── logo/             # drop real logo files here
│   ├── screenshots/       # drop real product screenshots here
│   ├── icons/
│   └── video/
└── README.md
```

## Things to wire up before launch

1. **Checkout URL** — open `app.js`, set `PRODUCT_CHECKOUT_URL` near the top to the
   real purchase link. Until it's set, the "ดู BizMind" CTA scrolls to the pricing
   section instead of navigating anywhere fake.
2. **Pricing** — no price has been supplied, so the Pricing section currently shows a
   "Get Product Information" placeholder instead of invented numbers, per the
   specification's anti-overclaim rule (§19). Replace `.pricing__notice` with real
   Starter / Professional / Industry Pack cards once pricing exists.
3. **Screenshots** — the Demo section and the "นี่คือระบบจริง ไม่ใช่ Concept" gallery both
   use explicit `SCREENSHOT PLACEHOLDER` tiles. Swap in real screenshots from
   `assets/screenshots/` as they become available — do not replace them with stock
   photos or mockups, per §11.
4. **Analytics** — `trackEvent()` in `app.js` is a no-op abstraction. Event names already
   fired: `hero_cta_click`, `demo_click`, `product_screenshot_view`, `pricing_view`,
   `faq_open`, `buy_click`, `contact_click`. Wire your provider inside that one function.
5. **Contact / Privacy / Terms** — footer links for Privacy and Terms currently point to
   `#`; add real pages/URLs when available.

## Design notes

- Default theme is dark ("instrumentation" console: ink background, brass/amber accent
  for decisions & CTAs, slate-blue accent for data/KPI), with a light mode toggle.
- Primary language is Thai; every text node carries `data-th` / `data-en` and the
  language toggle (top right, "TH/EN") swaps them without a page reload.
- No fabricated customers, testimonials, statistics, certifications, or pricing appear
  anywhere in the copy, per the specification's overclaim restrictions (§2, §25, §41).
