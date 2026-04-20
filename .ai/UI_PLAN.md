# Servygo Admin Portal - UI/UX Build Plan

> Living checklist for the `servygo-admin-portal` Next.js app.
> Scope: internal/admin-facing web portal, mock-data only, no backend/API for now.
> Stack: Next.js 16 (App Router), React 19, Tailwind v4, TypeScript.
> Roles: `super-admin`, `operations-admin`, `finance-admin`, `compliance-admin`, `support-admin`, `read-only-admin`.

---

## Product Intent

This portal is the operational control center for ServyGo. It should feel:

- brand-aligned with the customer portal, but more structured, data-dense, and decision-oriented
- calm under pressure: clear hierarchy, rapid scanning, obvious actions, low visual noise
- trustworthy for a Canadian client handling user data, disputes, documents, payouts, and audit trails
- modular enough to grow into a real RBAC-driven admin system once APIs arrive

The customer portal language is warm and editorial. The admin portal should keep the same ServyGo DNA while shifting toward an operations-console tone: stronger information density, tighter spacing, clearer tables, stronger status semantics, and more restrained decoration.

---

## Compliance Notes

This plan supports Canadian compliance from a product and frontend perspective, but is not legal advice.

- Follow `PIPEDA` principles in UX: minimal data exposure, purpose clarity, access logging support, and privacy-aware defaults.
- Support `PCI-DSS` boundaries by never mocking raw card storage inside the admin UI; payment details should be represented as masked or tokenized views only.
- Build with `WCAG 2.1 AA` accessibility targets in mind for admin staff workflows.
- Treat privacy/legal copy, retention schedules, and final compliance interpretation as client/legal responsibilities.
- Prefer Canadian context in content and formatting:
  - addresses and phone formatting should support Canada
  - currency defaults to `CAD`
  - taxes should support `GST/HST` display patterns
  - dates should be unambiguous and ideally ISO-backed with human-friendly display

---

## Experience Direction

### Brand carry-over from customer portal

- Reuse the ServyGo core palette: forest, olive, cream, gold, sand, ink.
- Reuse the brand font pairing:
  - `Outfit` for UI/body
  - `Cormorant Garamond` for editorial headings and high-level dashboard moments
- Keep rounded geometry and elegant motion, but tone it down versus customer-facing surfaces.

### Admin-specific adaptation

- Use cream and warm neutrals for primary surfaces, with forest and ink for anchoring structure.
- Reserve gold for focus, confirmation, premium/high-importance metrics, and guided actions.
- Use semantic colors with discipline:
  - success: approved, paid, active, healthy SLA
  - warning: pending review, expiring docs, aging disputes
  - danger: fraud risk, failed payouts, suspended users, service pause states
  - info: audit events, timeline markers, guidance
- Favor readable dashboards over decorative hero sections.
- Tables, filters, sticky action rails, batch actions, and side drawers are first-class UI patterns.

### Layout principles

- Desktop-first, laptop-friendly admin shell.
- Left sidebar for global navigation.
- Sticky top bar for search, territory/context switcher, alerts, and admin profile.
- Right-side drawers for quick review and edit flows where possible.
- Mobile support should remain functional, but the primary design target is desktop/tablet operations.

---

## Legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[!]` Blocked / needs decision

When a page is finished, change its checkbox to `[x]` and add the route + the
mock-data source in the **Notes** column if not already present.

---

## Mock-First Rules

- All data is local mock data for Phase 1 UI work.
- No API assumptions should leak into page architecture.
- Use typed mock domain modules under `lib/mock/`.
- Build all list/detail flows so they can later swap to server data with minimal UI refactor.
- Include realistic empty, partial, loading, stale, and error states even with mock data.
- Simulate permissions using mock session roles and route guards.
- Simulate risky actions with confirmation dialogs and audit log events.

Suggested mock domains:

- `admins`
- `users`
- `providers`
- `franchises`
- `services`
- `bookings`
- `jobs`
- `payments`
- `payouts`
- `disputes`
- `documents`
- `reviews`
- `notifications`
- `reports`
- `audit-logs`
- `settings`

---

## 0. Foundation & Design System

These land first. Everything else depends on them.

| # | Task | Status | Notes |
|---|------|:------:|-------|
| 0.1 | Install fonts via `next/font` (`Outfit`, `Cormorant Garamond`) | `[x]` | `app/fonts.ts` + `app/layout.tsx` |
| 0.2 | Port ServyGo tokens into Tailwind v4 `@theme` | `[x]` | `app/globals.css` |
| 0.3 | Define admin-only semantic tokens | `[x]` | risk, pending, payout, compliance, live-ops tones in `app/globals.css` |
| 0.4 | Global CSS for restrained motion, focus states, dense data surfaces | `[x]` | compact type/table utilities + reduced-motion guards |
| 0.5 | Root layout with providers, toast region, keyboard skip links | `[x]` | `app/layout.tsx` + `components/providers.tsx` |
| 0.6 | Auth layout for admin login and recovery flows | `[x]` | `app/(auth)/layout.tsx` + compact auth surfaces |
| 0.7 | App shell layout with sidebar, topbar, content frame, command bar slot | `[x]` | `components/app/{shell,sidebar,top-bar}.tsx` |
| 0.8 | Mock auth + mock RBAC session provider | `[x]` | `components/providers.tsx` |
| 0.9 | Mock data layer for all admin domains | `[~]` | shell/dashboard seed started in `lib/mock/admin-shell.ts` |
| 0.10 | Mock delay/error/permission simulator | `[ ]` | useful for pending/error states |
| 0.11 | Route-level `loading.tsx`, `error.tsx`, `not-found.tsx` patterns | `[x]` | `app/{loading,error,not-found}.tsx` |
| 0.12 | Reduced motion, high contrast, and keyboard-first review | `[~]` | reduced-motion + skip link + focus states landed; full audit pending |
| 0.13 | Breadcrumb + page header system | `[x]` | `components/ui/page-header.tsx` |
| 0.14 | Filter-state URL conventions | `[ ]` | tables and reports should deep-link cleanly |

### UI Primitives (`components/ui/`)

| # | Component | Status | Notes |
|---|-----------|:------:|-------|
| 0.15 | `Button` | `[x]` | `components/ui/button.tsx` |
| 0.16 | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch` | `[x]` | `components/ui/{input,choice-controls}.tsx` |
| 0.17 | `Card`, `MetricCard`, `StatPill` | `[x]` | `components/ui/card.tsx` |
| 0.18 | `Badge`, `StatusBadge`, `RiskBadge` | `[x]` | `components/ui/{status-badge,risk-badge}.tsx` |
| 0.19 | `Table`, `DataGrid`, `ColumnVisibilityMenu` | `[x]` | `components/ui/data-grid.tsx` |
| 0.20 | `Tabs`, `Segmented`, `Pagination` | `[x]` | `components/ui/{tabs,pagination}.tsx` |
| 0.21 | `Modal`, `Drawer`, `Sheet`, `ConfirmDialog` | `[~]` | `Modal`, `Drawer`, `ConfirmDialog` shipped in `components/ui/overlay.tsx`; `Sheet` pending |
| 0.22 | `Toast` / notifier | `[x]` | `components/providers.tsx` |
| 0.23 | `Skeleton`, `EmptyState`, `ErrorState` | `[x]` | `components/ui/feedback.tsx` |
| 0.24 | `AuditTimeline` | `[ ]` | reusable across disputes, bookings, users |
| 0.25 | `FilterBar`, `SavedViewMenu`, `ActiveFilters` | `[x]` | `components/ui/filter-bar.tsx` |
| 0.26 | `DateRangePicker` | `[ ]` | reports + finance |
| 0.27 | `KpiTile`, `ChartCard` | `[ ]` | |
| 0.28 | `MapPanel` / live territory map shell | `[ ]` | mock map visualization |
| 0.29 | `FilePreview`, `DocumentCard`, `ExpiryTag` | `[ ]` | compliance flows |
| 0.30 | `EvidenceGallery` | `[ ]` | disputes and moderation |
| 0.31 | `CommandPalette` | `[ ]` | optional but high-value for admin speed |

### Shared App Chrome (`components/app/`)

| # | Component | Status | Notes |
|---|-----------|:------:|-------|
| 0.32 | `Sidebar` with permission-aware nav | `[x]` | role-aware nav in `components/app/sidebar.tsx` |
| 0.33 | `TopBar` with search, alerts, environment pill, profile menu | `[x]` | `components/app/{top-bar,profile-menu}.tsx` |
| 0.34 | `PageHeader` with actions and context chips | `[x]` | `components/ui/page-header.tsx` |
| 0.35 | `GlobalSearch` / command launcher | `[~]` | topbar search input shipped; command launcher pending |
| 0.36 | `AlertCenterPopover` | `[~]` | alert trigger/toast feedback in `components/app/top-bar.tsx`; popover pending |
| 0.37 | `ImpersonationBanner` | `[ ]` | optional admin support tool |
| 0.38 | `ReadonlyModeBanner` | `[~]` | read-only state messaging embedded in shell/sidebar; dedicated banner pending |

---

## 1. Authentication & Access Control

The first slice should establish confidence and permission boundaries, even with mock data.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 1.1 | Admin login | `/login` | `[x]` | compact auth UI with demo role switch |
| 1.2 | Forgot password | `/forgot-password` | `[x]` | |
| 1.3 | Reset password | `/reset-password` | `[x]` | |
| 1.4 | Optional OTP / 2FA verification | `/verify` | `[x]` | UI-only verification flow in `app/(auth)/verify/page.tsx` |
| 1.5 | Unauthorized / insufficient permission | `/forbidden` | `[x]` | `app/(auth)/forbidden/page.tsx` + client portal guard |
| 1.6 | Session timeout / re-auth modal | inline | `[x]` | `components/app/portal-access.tsx` |
| 1.7 | Profile menu and sign-out flow | inline | `[x]` | `components/app/profile-menu.tsx` |

---

## 2. Dashboard & Operational Overview

The home dashboard should answer: what is happening, what is broken, what needs action now.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 2.1 | Main dashboard | `/dashboard` | `[x]` | `app/(portal)/dashboard/page.tsx` + `components/dashboard/dashboard-page.tsx` |
| 2.2 | Role-based dashboard variants | `/dashboard` | `[x]` | role-based copy/actions via `roleDashboardCopy` in `lib/mock/admin-shell.ts` |
| 2.3 | Alert center full page | `/alerts` | `[x]` | `app/(portal)/alerts/page.tsx` |
| 2.4 | Task queue / work inbox | `/tasks` | `[x]` | `app/(portal)/tasks/page.tsx` |

Dashboard widget priorities:

- live bookings by status
- delayed jobs and SLA breaches
- pending document verifications
- open disputes by priority
- payout backlog
- fraud/review moderation flags
- user growth / revenue snapshots

---

## 3. User Management

This is a foundational admin area and should be designed for safe bulk operations.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 3.1 | All users list | `/users` | `[x]` | `app/(portal)/users/page.tsx` + mock domain in `lib/mock/users.ts` |
| 3.2 | User detail overview | `/users/[id]` | `[x]` | `app/(portal)/users/[id]/page.tsx` |
| 3.3 | User activity history | `/users/[id]/activity` | `[x]` | `app/(portal)/users/[id]/activity/page.tsx` |
| 3.4 | User documents view | `/users/[id]/documents` | `[x]` | `app/(portal)/users/[id]/documents/page.tsx` |
| 3.5 | User financial snapshot | `/users/[id]/financials` | `[x]` | `app/(portal)/users/[id]/financials/page.tsx` |
| 3.6 | Suspend / activate / reset password dialogs | inline | `[x]` | inline modal flows in `components/users/user-detail-shell.tsx` + `user-list-page.tsx` |
| 3.7 | Export users flow | inline | `[x]` | mock export action in `components/users/user-list-page.tsx` |

Key UI needs:

- powerful filters
- bulk selection
- safe destructive confirmations
- visible reason capture for suspension and manual overrides

---

## 4. Role Management & Internal Access

Even if permissions are mocked, the UI should anticipate future RBAC complexity.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 4.1 | Admin users list | `/admins` | `[x]` | `app/(portal)/admins/page.tsx` + mock RBAC domain in `lib/mock/admins.ts` |
| 4.2 | Admin detail and role assignment | `/admins/[id]` | `[x]` | `app/(portal)/admins/[id]/page.tsx` + shared detail shell in `components/admins/admin-detail-shell.tsx` |
| 4.3 | Roles and permission matrix | `/settings/roles` | `[x]` | `app/(portal)/settings/roles/page.tsx` |
| 4.4 | Audit view for admin actions | `/audit/admin-actions` | `[x]` | `app/(portal)/audit/admin-actions/page.tsx` |

---

## 5. Service Management

This area defines what customers can book and how services behave.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 5.1 | Service categories list | `/services` | `[x]` | `app/(portal)/services/page.tsx` + mock domain in `lib/mock/services.ts` |
| 5.2 | Service category detail | `/services/[id]` | `[x]` | `app/(portal)/services/[id]/page.tsx` |
| 5.3 | Create/edit service form | `/services/[id]/edit` | `[x]` | UI-only config in `app/(portal)/services/[id]/edit/page.tsx` |
| 5.4 | Pricing rules and add-ons | `/services/[id]/pricing` | `[x]` | `app/(portal)/services/[id]/pricing/page.tsx` |
| 5.5 | Service availability by location | `/services/[id]/coverage` | `[x]` | `app/(portal)/services/[id]/coverage/page.tsx` |
| 5.6 | Dynamic form fields builder | `/services/[id]/forms` | `[x]` | `app/(portal)/services/[id]/forms/page.tsx` |

UI considerations:

- support hierarchy: category -> segment -> package
- clearly distinguish fixed-price vs bid-enabled offerings
- show where a service is live, paused, or unavailable

---

## 6. Booking Management

Bookings are a high-frequency operational workflow and should be one of the first full modules.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 6.1 | Booking list | `/bookings` | `[ ]` | advanced filters, saved views |
| 6.2 | Booking detail | `/bookings/[id]` | `[ ]` | lifecycle, participants, notes, payments |
| 6.3 | Manual assignment flow | `/bookings/[id]/assign` | `[ ]` | provider selection drawer/modal |
| 6.4 | Reassignment flow | `/bookings/[id]/reassign` | `[ ]` | |
| 6.5 | Cancel booking flow | `/bookings/[id]/cancel` | `[ ]` | reason capture required |
| 6.6 | Reschedule booking flow | `/bookings/[id]/reschedule` | `[ ]` | |
| 6.7 | Booking timeline / audit page | `/bookings/[id]/timeline` | `[ ]` | |

Must-show details:

- customer, provider, franchise
- territory and service details
- current state and SLA risk
- timeline of changes
- linked payments, disputes, reviews, and documents

---

## 7. Live Operations Monitoring

This is where the portal differentiates itself from a CRUD dashboard.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 7.1 | Live jobs monitor | `/operations/live` | `[ ]` | map + list hybrid |
| 7.2 | Territory operations board | `/operations/territories` | `[ ]` | territory cards and alerts |
| 7.3 | SLA breach board | `/operations/sla` | `[ ]` | aging/delayed jobs |
| 7.4 | Emergency controls panel | `/operations/emergency` | `[ ]` | pause service, freeze accounts, banners |

UI direction:

- map/list split view
- incident-style visual language
- sticky filters for service, territory, status, priority

---

## 8. Financial Management

This module should look precise, sober, and audit-friendly.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 8.1 | Transactions list | `/finance/transactions` | `[ ]` | |
| 8.2 | Transaction detail | `/finance/transactions/[id]` | `[ ]` | |
| 8.3 | Refund management | `/finance/refunds` | `[ ]` | |
| 8.4 | Payout queue | `/finance/payouts` | `[ ]` | weekly payout flow |
| 8.5 | Payout detail | `/finance/payouts/[id]` | `[ ]` | |
| 8.6 | Commission breakdown | `/finance/commissions` | `[ ]` | |
| 8.7 | Revenue reports | `/finance/reports` | `[ ]` | |
| 8.8 | Export center | `/finance/exports` | `[ ]` | |

Financial UI constraints:

- never expose full payment instrument data
- prefer masked values and statuses
- show tax context in `CAD`
- make approval steps explicit

---

## 9. Dispute Resolution

This module should help admins make defensible decisions quickly.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 9.1 | Disputes list | `/disputes` | `[ ]` | filters for status, priority, aging |
| 9.2 | Dispute detail | `/disputes/[id]` | `[ ]` | evidence, chat excerpts, notes |
| 9.3 | Resolution decision flow | `/disputes/[id]/resolve` | `[ ]` | refund, partial refund, reject |
| 9.4 | Escalation flow | `/disputes/[id]/escalate` | `[ ]` | |
| 9.5 | Dispute analytics | `/disputes/insights` | `[ ]` | repeat reasons, risky providers |

Important UX details:

- side-by-side evidence review
- internal notes separate from customer-visible outcomes
- clear decision rationale capture
- strong auditability

---

## 10. Document Verification & Compliance

This is one of the most Canada-sensitive admin areas because it touches identity, licensing, and retention behaviors.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 10.1 | Pending verifications list | `/compliance/documents` | `[ ]` | |
| 10.2 | Verification detail | `/compliance/documents/[id]` | `[ ]` | doc viewer + metadata |
| 10.3 | Request more documents flow | inline | `[ ]` | |
| 10.4 | Expiry monitoring board | `/compliance/expiring` | `[ ]` | |
| 10.5 | Verification history | `/compliance/history` | `[ ]` | |
| 10.6 | Compliance dashboard | `/compliance` | `[ ]` | KPIs and backlog |

UX rules:

- minimize unnecessary PII exposure
- blur/truncate when possible in list contexts
- only reveal full detail in focused review screens
- always show who reviewed what and when

---

## 11. Review Moderation & Fraud Signals

This area should be lightweight to use and easy to triage.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 11.1 | Review moderation queue | `/reviews/moderation` | `[ ]` | |
| 11.2 | Review detail | `/reviews/moderation/[id]` | `[ ]` | |
| 11.3 | Fraud signals board | `/risk/reviews` | `[ ]` | suspicious patterns |
| 11.4 | Hidden/removed review archive | `/reviews/archive` | `[ ]` | |

---

## 12. Analytics & Reporting

These views should be executive-friendly without losing operator usefulness.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 12.1 | Analytics dashboard | `/analytics` | `[ ]` | |
| 12.2 | Revenue trends | `/analytics/revenue` | `[ ]` | |
| 12.3 | Booking volume trends | `/analytics/bookings` | `[ ]` | |
| 12.4 | User growth | `/analytics/users` | `[ ]` | |
| 12.5 | Provider performance | `/analytics/providers` | `[ ]` | |
| 12.6 | Service performance | `/analytics/services` | `[ ]` | |
| 12.7 | Scheduled reports | `/analytics/reports/scheduled` | `[ ]` | UI only |

Reporting UX:

- filter by date range, province, city, territory, service category
- allow mock export to CSV/PDF
- make chart data inspectable in table form

---

## 13. Notifications & Internal Communication

Internal awareness matters for admin throughput.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 13.1 | Notification center | `/notifications` | `[ ]` | |
| 13.2 | Notification preferences | `/settings/notifications` | `[ ]` | |
| 13.3 | Alert rule preview / templates | `/settings/alerts` | `[ ]` | thresholds defined later |

---

## 14. Platform Configuration

Only some roles should be able to access these areas. The UX must make that obvious.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 14.1 | General platform settings | `/settings` | `[ ]` | |
| 14.2 | Commission settings | `/settings/commissions` | `[ ]` | |
| 14.3 | Cancellation policy settings | `/settings/cancellations` | `[ ]` | |
| 14.4 | Notification templates | `/settings/templates` | `[ ]` | email/SMS/push copy UI |
| 14.5 | Loyalty settings | `/settings/loyalty` | `[ ]` | |
| 14.6 | Service pause / freeze controls | `/settings/emergency` | `[ ]` | |
| 14.7 | Audit logs | `/settings/audit-logs` | `[ ]` | |

---

## 15. Legal, Privacy & Audit Support

This is an internal portal, but legal and privacy support surfaces still matter.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 15.1 | Privacy handling support page | `/privacy` | `[ ]` | internal reference UI |
| 15.2 | Consent and DSAR support queue | `/privacy/requests` | `[ ]` | UI shell only |
| 15.3 | Data export / audit packet builder | `/privacy/exports` | `[ ]` | mock flow |

---

## 16. System & Utility Pages

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 16.1 | 404 not found | `not-found.tsx` | `[x]` | `app/not-found.tsx` |
| 16.2 | Error boundary / 500 | `error.tsx` | `[x]` | `app/error.tsx` |
| 16.3 | Maintenance page | `/maintenance` | `[ ]` | |
| 16.4 | Read-only system state page | `/readonly` | `[ ]` | |
| 16.5 | Offline / degraded mode page | `/offline` | `[ ]` | |

---

## 17. Cross-cutting Quality

| # | Task | Status | Notes |
|---|------|:------:|-------|
| 17.1 | Accessibility pass on all form, table, modal flows | `[~]` | baseline patterns landed; full module-by-module pass pending |
| 17.2 | Keyboard navigation for dense admin workflows | `[~]` | skip link + focusable shell controls landed; deeper audit pending |
| 17.3 | Focus-visible audit with brand-safe rings | `[~]` | global focus ring system landed in `app/globals.css`; audit pending |
| 17.4 | Responsive review for laptop/tablet | `[ ]` | desktop-first |
| 17.5 | Loading, empty, error, and permission-denied states for every module | `[~]` | shared loading/error/empty primitives landed; module coverage pending |
| 17.6 | Mock data realism review | `[ ]` | names, provinces, taxes, statuses |
| 17.7 | Date, currency, and number formatting review for Canada | `[ ]` | |
| 17.8 | Privacy-aware redaction pass | `[ ]` | list/table contexts especially |
| 17.9 | Audit trail visibility review | `[ ]` | risky actions should surface reason + actor |
| 17.10 | Design consistency pass vs customer portal brand system | `[ ]` | aligned but distinct |

---

## Suggested Delivery Order

Build in this order so we get a believable demo quickly:

1. Foundation, shell, tokens, auth, RBAC mock
2. Dashboard
3. Booking management
4. User management
5. Live operations
6. Disputes
7. Document verification
8. Financial management
9. Service management
10. Analytics, settings, and polish

This sequence gives us an early admin demo that already feels real, even without APIs.

---

## Initial MVP Slice

If we want to keep the first milestone focused, the minimum strong admin demo should include:

- login + mock role switching
- app shell + navigation
- dashboard
- users list + user detail
- bookings list + booking detail
- live operations board
- disputes list + dispute detail
- pending documents list + verification detail
- payouts list
- audit log page

That is enough to demonstrate:

- ServyGo brand translation into admin UX
- realistic operational workflows
- permission-aware information architecture
- Canadian/privacy-aware admin design posture

---

## Page Count Summary

| Section | Page count |
|---------|:----------:|
| 0. Foundation & primitives | n/a (infra) |
| 1. Authentication & access | 7 |
| 2. Dashboard & overview | 4 |
| 3. User management | 7 |
| 4. Role management | 4 |
| 5. Service management | 6 |
| 6. Booking management | 7 |
| 7. Live operations | 4 |
| 8. Financial management | 8 |
| 9. Disputes | 5 |
| 10. Document verification | 6 |
| 11. Reviews & fraud | 4 |
| 12. Analytics & reporting | 7 |
| 13. Notifications | 3 |
| 14. Platform configuration | 7 |
| 15. Legal / privacy support | 3 |
| 16. System pages | 5 |
| **Total admin-facing pages** | **87** |

---

## How to Update This File

1. When you start a page, switch its row to `[~]`.
2. When merged, switch to `[x]` and add the implemented route in the **Notes** column if needed.
3. If a page is intentionally cut from MVP, switch to `[!]` and add a one-line reason.
4. Update the page-count summary if rows are added or removed.
