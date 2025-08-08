Resilience-17 — Wallet Ledger Dashboard (Assessment)
Live: https://resilience-17-venture-studio-assess.vercel.app/
Repo: https://github.com/Temi-Dire/Resilience-17-Venture-Studio-Assessment
Assessment deadline / notes: I am readily available to start on Monday, August 11, 2025.

Overview
This repository contains my implementation of the Wallet Ledger Dashboard assessment. The goal was to faithfully reproduce the provided Figma dashboard and implement a functional, well-typed, responsive frontend using React + TypeScript + Next.js, with attention to accessibility, component reusability, and production readiness.

I prioritized:

Matching the UI/UX (spacing, typography, colors) from the design

A component-first architecture (shadcn-style primitives used where appropriate)

Clear state management and typed interfaces

Responsiveness (mobile-first) and graceful handling of loading / empty states

Delivering a deployable app (Vercel/Netlify) with a public URL

What I implemented
✅ Header & Top Bar
FinTrack logo and avatar display.

Search input with autocomplete / suggestions (category search).

Menu + ellipsis menu with actions like Download PDF and Delete.

Category selector (Wallet Ledger, Bills & Utilities, Subscriptions, Others) with active badge and ability to change selection.

Responsive layout that folds properly under small viewports (min-w-0, flex-wrap, responsive paddings).

✅ Tabs
Overview / Transactions tabs implemented using shadcn Tabs primitives.

Tabs are keyboard-accessible and responsive.

✅ Summary Cards
Four summary cards: Total Balance, Total Credits, Total Debits, Transactions.

Cards are responsive and match the layout behavior in the design (grid changes by breakpoint).

Numbers are formatted with thousands separators.

✅ Transactions Table
Implemented a sortable, filterable table with columns: Date, Remark, Amount, Currency, Type.

Date and Amount can be sorted (asc/desc).

Remark filtering via dropdown (select a remark to filter).

Currency and Type filters (dropdowns).

Colored badges for Type (green for Credit, red for Debit).

Table supports loading state and empty-data fallback.

Horizontal scroll (overflow-x-auto) for small screens; column min-widths set so layout is usable on mobile.

✅ Overview page behavior
Loader state on mount (2s demo loader).

Summary cards + table in Overview layout.

Transactions list uses provided sample data structure.

✅ Transactions page behavior
Search (with debounce file separate) that looks for matching date / amount / remark and shows results; Enter triggers immediate search; clicking suggestion filters results.

Tab-based filters still work in combination with search.

✅ Settings & Forms
Basic Information form with Edit/Save toggle.

Input enabling/disabling on edit, inline validation, and toast feedback.

Validation powered by Zod:

Names: required, no numbers.

Email: required, proper format.

Phone: basic length check (or integrates with PhoneInput).

Security settings (Change Password): Zod schema validates current password equals test1234, new password min length 8, confirm matches.

Inline error messages using zod.safeParse().format().

✅ Accessibility & UX details
Focus-visible / focus-within states for inputs and search.

Buttons have disabled & hover states.

Dialogs and alerts use accessible shadcn primitives (AlertDialog, Dialog).

Proper use of aria- attributes via shadcn components where appropriate.

✅ Small-screen behavior & layout fixes
Key fixes applied to ensure layout doesn’t break on small screens:

Use min-w-0 on flex children to allow shrinking.

Replace fixed widths with responsive max-w/min-w values.

Wrap tables in overflow-x-auto.

Technical decisions & reasoning
Next.js (app router) — chosen because the assessment requires Next.js and to demonstrate a production-like structure.

TypeScript — required and used everywhere with explicit types for Transaction and DashboardSummary.

Zod — used for form validation (strong, declarative schemas; .safeParse() + .format() for field errors).

shadcn/ui — used for UI primitives (Tabs, Dialog, Table skeletons) to speed up consistent styling and accessibility.

Tailwind CSS — used for styling, utility-first approach gives rapid iteration and exact control to match the design.

Debounce — put in a separate util file so it can be reused across search inputs.

State — simple local useState + derived lists for the assessment.

Data & Types
Made use of these types in the codebase (/client/types):

export interface Transaction {
  id: string;
  date: string; // ISO or YYYY-MM-DD
  remark: string;
  amount: number;
  currency: string; // e.g., "USD"
  type: "Credit" | "Debit";
}

export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
}

How to run locally:
# Install
bun install

# Run development server
bun run dev

App should be reachable at http://localhost:6010.

Folder structure (important bits)
bash
Copy
Edit
/src
  /public              # images, icons, static assets
  /app                 # Next.js app routes (app router)
  /client
    /components        # Reusable UI components (cards, table, header, etc.)
    /pages             # Page-level composables
    /styles            # Tailwind + global styles
    /lib               # utils: formatters, debounce, cn, etc.
    /data              # sample data
    /types             # shared TypeScript interfaces
README.md

Known limitations / what I didn't implement (timebox)
Full backend / persistence: this is a frontend assessment — form saves are simulated (toasts / local state). Integrating with real APIs is straightforward (API hooks or swr/react-query).

End-to-end tests: Manual tested across breakpoints. If requested I can add unit tests for key components and Cypress for flows.

Contact / Notes
Start date requirement: I’m ready to start on Monday, August 11, 2025 as requested.

If you want a recorded walkthrough or a short video demo of the implemented flows, I can produce one.