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
| 0.9 | Mock data layer for all admin domains | `[x]` | domain mocks now implemented across `lib/mock/*` (bookings, services, users, admins, operations, finance, disputes, compliance, reviews, notifications, analytics, settings, privacy) |
| 0.10 | Mock delay/error/permission simulator | `[x]` | `lib/mock/simulator.ts` (`withMockDelay`, `maybeThrowMockFailure`) |
| 0.11 | Route-level `loading.tsx`, `error.tsx`, `not-found.tsx` patterns | `[x]` | `app/{loading,error,not-found}.tsx` |
| 0.12 | Reduced motion, high contrast, and keyboard-first review | `[x]` | reduced-motion, skip-link, and focus-visible treatments in `app/globals.css` + keyboard flows across shell/toolbars |
| 0.13 | Breadcrumb + page header system | `[x]` | `components/ui/page-header.tsx` + `components/ui/breadcrumbs.tsx` |
| 0.14 | Filter-state URL conventions | `[x]` | URL filter helper in `lib/url-state.ts` and deep-link updates in `components/bookings/booking-list-page.tsx` |

### UI Primitives (`components/ui/`)

| # | Component | Status | Notes |
|---|-----------|:------:|-------|
| 0.15 | `Button` | `[x]` | `components/ui/button.tsx` |
| 0.16 | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch` | `[x]` | `components/ui/{input,choice-controls}.tsx` |
| 0.17 | `Card`, `MetricCard`, `StatPill` | `[x]` | `components/ui/card.tsx` |
| 0.18 | `Badge`, `StatusBadge`, `RiskBadge` | `[x]` | `components/ui/{status-badge,risk-badge}.tsx` |
| 0.19 | `Table`, `DataGrid`, `ColumnVisibilityMenu` | `[x]` | `components/ui/data-grid.tsx` |
| 0.20 | `Tabs`, `Segmented`, `Pagination` | `[x]` | `components/ui/{tabs,pagination}.tsx` |
| 0.21 | `Modal`, `Drawer`, `Sheet`, `ConfirmDialog` | `[x]` | all shipped in `components/ui/overlay.tsx` |
| 0.22 | `Toast` / notifier | `[x]` | `components/providers.tsx` |
| 0.23 | `Skeleton`, `EmptyState`, `ErrorState` | `[x]` | `components/ui/feedback.tsx` |
| 0.24 | `AuditTimeline` | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.25 | `FilterBar`, `SavedViewMenu`, `ActiveFilters` | `[x]` | `components/ui/filter-bar.tsx` |
| 0.26 | `DateRangePicker` | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.27 | `KpiTile`, `ChartCard` | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.28 | `MapPanel` / live territory map shell | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.29 | `FilePreview`, `DocumentCard`, `ExpiryTag` | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.30 | `EvidenceGallery` | `[x]` | `components/ui/advanced-primitives.tsx` |
| 0.31 | `CommandPalette` | `[x]` | `components/app/command-palette.tsx` + wired in `components/app/shell.tsx` |

### Shared App Chrome (`components/app/`)

| # | Component | Status | Notes |
|---|-----------|:------:|-------|
| 0.32 | `Sidebar` with permission-aware nav | `[x]` | role-aware nav in `components/app/sidebar.tsx` |
| 0.33 | `TopBar` with search, alerts, environment pill, profile menu | `[x]` | `components/app/{top-bar,profile-menu}.tsx` |
| 0.34 | `PageHeader` with actions and context chips | `[x]` | `components/ui/page-header.tsx` |
| 0.35 | `GlobalSearch` / command launcher | `[x]` | search input + command launcher in `components/app/{top-bar,command-palette}.tsx` |
| 0.36 | `AlertCenterPopover` | `[x]` | `components/app/alert-center-popover.tsx` wired in top bar |
| 0.37 | `ImpersonationBanner` | `[x]` | `components/app/impersonation-banner.tsx` wired in shell |
| 0.38 | `ReadonlyModeBanner` | `[x]` | `components/app/readonly-mode-banner.tsx` wired in shell |

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

## 5. Location-First Service Management

This area defines what customers can book in each operating location and who can fulfill it locally.

Core operating hierarchy:

`location / territory -> services -> subcategories -> packages -> assigned local providers`

The admin UX should treat location as the first-class setup context. Global service definitions may still exist behind the scenes, but the primary operational workflow should answer:

- Which services are available in this city/province/territory?
- Which subcategories are enabled under each local service?
- Which packages can customers book in that location?
- Which local providers are assigned to fulfill each package?
- Is the location/package live, paused, pilot-only, or missing provider coverage?

This is different from a generic service catalog. A package should not be considered operationally live just because the service exists globally; it should be live only when the package is configured for that location and has suitable local provider coverage.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 5.1 | Locations service matrix | `/services` | `[x]` | location-first matrix with breadcrumbs, RBAC-aware CTAs, empty states |
| 5.2 | Location service setup | `/services/locations/[locationId]` | `[x]` | services table with read-only guard and empty state |
| 5.3 | Location service detail | `/services/locations/[locationId]/services/[serviceId]` | `[x]` | subcategory tabs/filter chips, read-only guard, breadcrumbs |
| 5.4 | Subcategory package builder | `/services/locations/[locationId]/services/[serviceId]/subcategories/[subcategoryId]` | `[x]` | packages with readiness, read-only guard, empty state |
| 5.5 | Package provider assignment | `/services/locations/[locationId]/packages/[packageId]/providers` | `[x]` | breadcrumbs, RBAC-aware assign action, empty state |
| 5.6 | Location package pricing and forms | `/services/locations/[locationId]/packages/[packageId]/configure` | `[x]` | publish gated by blockers, read-only aware inputs/buttons |

UI considerations:

- support hierarchy: location -> service -> subcategory -> package -> assigned providers
- make location status visible before service/package status
- clearly distinguish global service availability from local package readiness
- show local provider assignment coverage for every package
- clearly distinguish fixed-price vs bid-enabled packages per location
- show where a package is live, paused, pilot-only, unavailable, or blocked by missing providers
- allow admins to configure the same package differently by location when needed

Key UI needs:

- location picker / territory matrix as the entry point
- service enable/disable controls scoped to a location
- subcategory management inside each local service
- package builder with pricing, add-ons, service rules, and intake fields
- provider assignment table per package with capacity/readiness indicators
- safe publish controls so a package cannot go live without required local provider coverage
- clear audit trail for who changed local availability, pricing, forms, and provider assignments

---

## 6. Booking Management

Bookings are a high-frequency operational workflow and should be one of the first full modules.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 6.1 | Booking list | `/bookings` | `[x]` | `app/(portal)/bookings/page.tsx` + `components/bookings/booking-list-page.tsx` |
| 6.2 | Booking detail | `/bookings/[id]` | `[x]` | `app/(portal)/bookings/[id]/page.tsx` + `components/bookings/{booking-detail-shell,booking-overview-page}.tsx` |
| 6.3 | Manual assignment flow | `/bookings/[id]/assign` | `[x]` | `app/(portal)/bookings/[id]/assign/page.tsx` + `components/bookings/booking-assign-page.tsx` |
| 6.4 | Reassignment flow | `/bookings/[id]/reassign` | `[x]` | `app/(portal)/bookings/[id]/reassign/page.tsx` + `components/bookings/booking-reassign-page.tsx` |
| 6.5 | Cancel booking flow | `/bookings/[id]/cancel` | `[x]` | `app/(portal)/bookings/[id]/cancel/page.tsx` + `components/bookings/booking-cancel-page.tsx` |
| 6.6 | Reschedule booking flow | `/bookings/[id]/reschedule` | `[x]` | `app/(portal)/bookings/[id]/reschedule/page.tsx` + `components/bookings/booking-reschedule-page.tsx` |
| 6.7 | Booking timeline / audit page | `/bookings/[id]/timeline` | `[x]` | `app/(portal)/bookings/[id]/timeline/page.tsx` + `components/bookings/booking-timeline-page.tsx` |

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
| 7.1 | Live jobs monitor | `/operations/live` | `[x]` | `app/(portal)/operations/live/page.tsx` + `components/operations/live-jobs-page.tsx` |
| 7.2 | Territory operations board | `/operations/territories` | `[x]` | `app/(portal)/operations/territories/page.tsx` + `components/operations/territories-board-page.tsx` |
| 7.3 | SLA breach board | `/operations/sla` | `[x]` | `app/(portal)/operations/sla/page.tsx` + `components/operations/sla-board-page.tsx` |
| 7.4 | Emergency controls panel | `/operations/emergency` | `[x]` | `app/(portal)/operations/emergency/page.tsx` + `components/operations/emergency-controls-page.tsx` |

UI direction:

- map/list split view
- incident-style visual language
- sticky filters for service, territory, status, priority

---

## 8. Financial Management

This module should look precise, sober, and audit-friendly.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 8.1 | Transactions list | `/finance/transactions` | `[x]` | `app/(portal)/finance/transactions/page.tsx` + `components/finance/transactions-list-page.tsx` |
| 8.2 | Transaction detail | `/finance/transactions/[id]` | `[x]` | `app/(portal)/finance/transactions/[id]/page.tsx` + `components/finance/transaction-detail-page.tsx` |
| 8.3 | Refund management | `/finance/refunds` | `[x]` | `app/(portal)/finance/refunds/page.tsx` + `components/finance/refunds-page.tsx` |
| 8.4 | Payout queue | `/finance/payouts` | `[x]` | `app/(portal)/finance/payouts/page.tsx` + `components/finance/payouts-page.tsx` |
| 8.5 | Payout detail | `/finance/payouts/[id]` | `[x]` | `app/(portal)/finance/payouts/[id]/page.tsx` + `components/finance/payout-detail-page.tsx` |
| 8.6 | Commission breakdown | `/finance/commissions` | `[x]` | `app/(portal)/finance/commissions/page.tsx` + `components/finance/commissions-page.tsx` |
| 8.7 | Revenue reports | `/finance/reports` | `[x]` | `app/(portal)/finance/reports/page.tsx` + `components/finance/reports-page.tsx` |
| 8.8 | Export center | `/finance/exports` | `[x]` | `app/(portal)/finance/exports/page.tsx` + `components/finance/exports-page.tsx` |

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
| 9.1 | Disputes list | `/disputes` | `[x]` | `app/(portal)/disputes/page.tsx` + `components/disputes/disputes-list-page.tsx` |
| 9.2 | Dispute detail | `/disputes/[id]` | `[x]` | `app/(portal)/disputes/[id]/page.tsx` + `components/disputes/dispute-detail-page.tsx` |
| 9.3 | Resolution decision flow | `/disputes/[id]/resolve` | `[x]` | `app/(portal)/disputes/[id]/resolve/page.tsx` + `components/disputes/dispute-resolve-page.tsx` |
| 9.4 | Escalation flow | `/disputes/[id]/escalate` | `[x]` | `app/(portal)/disputes/[id]/escalate/page.tsx` + `components/disputes/dispute-escalate-page.tsx` |
| 9.5 | Dispute analytics | `/disputes/insights` | `[x]` | `app/(portal)/disputes/insights/page.tsx` + `components/disputes/dispute-insights-page.tsx` |

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
| 10.1 | Pending verifications list | `/compliance/documents` | `[x]` | `app/(portal)/compliance/documents/page.tsx` + `components/compliance/compliance-documents-page.tsx` |
| 10.2 | Verification detail | `/compliance/documents/[id]` | `[x]` | `app/(portal)/compliance/documents/[id]/page.tsx` + `components/compliance/compliance-document-detail-page.tsx` |
| 10.3 | Request more documents flow | inline | `[x]` | inline modal flow in `components/compliance/compliance-document-detail-page.tsx` |
| 10.4 | Expiry monitoring board | `/compliance/expiring` | `[x]` | `app/(portal)/compliance/expiring/page.tsx` + `components/compliance/compliance-expiring-page.tsx` |
| 10.5 | Verification history | `/compliance/history` | `[x]` | `app/(portal)/compliance/history/page.tsx` + `components/compliance/compliance-history-page.tsx` |
| 10.6 | Compliance dashboard | `/compliance` | `[x]` | `app/(portal)/compliance/page.tsx` + `components/compliance/compliance-dashboard-page.tsx` |

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
| 11.1 | Review moderation queue | `/reviews/moderation` | `[x]` | `app/(portal)/reviews/moderation/page.tsx` + `components/reviews/review-moderation-page.tsx` |
| 11.2 | Review detail | `/reviews/moderation/[id]` | `[x]` | `app/(portal)/reviews/moderation/[id]/page.tsx` + `components/reviews/review-detail-page.tsx` |
| 11.3 | Fraud signals board | `/risk/reviews` | `[x]` | `app/(portal)/risk/reviews/page.tsx` + `components/reviews/review-risk-page.tsx` |
| 11.4 | Hidden/removed review archive | `/reviews/archive` | `[x]` | `app/(portal)/reviews/archive/page.tsx` + `components/reviews/review-archive-page.tsx` |

---

## 12. Analytics & Reporting

These views should be executive-friendly without losing operator usefulness.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 12.1 | Analytics dashboard | `/analytics` | `[x]` | `app/(portal)/analytics/page.tsx` + `components/analytics/analytics-dashboard-page.tsx` |
| 12.2 | Revenue trends | `/analytics/revenue` | `[x]` | `app/(portal)/analytics/revenue/page.tsx` + `components/analytics/revenue-trends-page.tsx` |
| 12.3 | Booking volume trends | `/analytics/bookings` | `[x]` | `app/(portal)/analytics/bookings/page.tsx` + `components/analytics/booking-trends-page.tsx` |
| 12.4 | User growth | `/analytics/users` | `[x]` | `app/(portal)/analytics/users/page.tsx` + `components/analytics/user-growth-page.tsx` |
| 12.5 | Provider performance | `/analytics/providers` | `[x]` | `app/(portal)/analytics/providers/page.tsx` + `components/analytics/provider-performance-page.tsx` |
| 12.6 | Service performance | `/analytics/services` | `[x]` | `app/(portal)/analytics/services/page.tsx` + `components/analytics/service-performance-page.tsx` |
| 12.7 | Scheduled reports | `/analytics/reports/scheduled` | `[x]` | `app/(portal)/analytics/reports/scheduled/page.tsx` + `components/analytics/scheduled-reports-page.tsx` |

Reporting UX:

- filter by date range, province, city, territory, service category
- allow mock export to CSV/PDF
- make chart data inspectable in table form

---

## 13. Notifications & Internal Communication

Internal awareness matters for admin throughput.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 13.1 | Notification center | `/notifications` | `[x]` | `app/(portal)/notifications/page.tsx` + `components/notifications/notification-center-page.tsx` |
| 13.2 | Notification preferences | `/settings/notifications` | `[x]` | `app/(portal)/settings/notifications/page.tsx` + `components/notifications/notification-preferences-page.tsx` |
| 13.3 | Alert rule preview / templates | `/settings/alerts` | `[x]` | `app/(portal)/settings/alerts/page.tsx` + `components/notifications/alert-rules-page.tsx` |

---

## 14. Platform Configuration

Only some roles should be able to access these areas. The UX must make that obvious.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 14.1 | General platform settings | `/settings` | `[x]` | `app/(portal)/settings/page.tsx` + `components/settings/settings-home-page.tsx` |
| 14.2 | Commission settings | `/settings/commissions` | `[x]` | `app/(portal)/settings/commissions/page.tsx` + `components/settings/settings-commissions-page.tsx` |
| 14.3 | Cancellation policy settings | `/settings/cancellations` | `[x]` | `app/(portal)/settings/cancellations/page.tsx` + `components/settings/settings-cancellations-page.tsx` |
| 14.4 | Notification templates | `/settings/templates` | `[x]` | `app/(portal)/settings/templates/page.tsx` + `components/settings/settings-templates-page.tsx` |
| 14.5 | Loyalty settings | `/settings/loyalty` | `[x]` | `app/(portal)/settings/loyalty/page.tsx` + `components/settings/settings-loyalty-page.tsx` |
| 14.6 | Service pause / freeze controls | `/settings/emergency` | `[x]` | `app/(portal)/settings/emergency/page.tsx` + `components/settings/settings-emergency-page.tsx` |
| 14.7 | Audit logs | `/settings/audit-logs` | `[x]` | `app/(portal)/settings/audit-logs/page.tsx` + `components/settings/settings-audit-logs-page.tsx` |

---

## 15. Legal, Privacy & Audit Support

This is an internal portal, but legal and privacy support surfaces still matter.

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 15.1 | Privacy handling support page | `/privacy` | `[x]` | `app/(portal)/privacy/page.tsx` + `components/privacy/privacy-support-page.tsx` |
| 15.2 | Consent and DSAR support queue | `/privacy/requests` | `[x]` | `app/(portal)/privacy/requests/page.tsx` + `components/privacy/privacy-requests-page.tsx` |
| 15.3 | Data export / audit packet builder | `/privacy/exports` | `[x]` | `app/(portal)/privacy/exports/page.tsx` + `components/privacy/privacy-exports-page.tsx` |

---

## 16. System & Utility Pages

| # | Page | Route | Status | Notes |
|---|------|-------|:------:|-------|
| 16.1 | 404 not found | `not-found.tsx` | `[x]` | `app/not-found.tsx` |
| 16.2 | Error boundary / 500 | `error.tsx` | `[x]` | `app/error.tsx` |
| 16.3 | Maintenance page | `/maintenance` | `[x]` | `app/(portal)/maintenance/page.tsx` + `components/system/maintenance-page.tsx` |
| 16.4 | Read-only system state page | `/readonly` | `[x]` | `app/(portal)/readonly/page.tsx` + `components/system/readonly-page.tsx` |
| 16.5 | Offline / degraded mode page | `/offline` | `[x]` | `app/(portal)/offline/page.tsx` + `components/system/offline-page.tsx` |

---

## 17. Cross-cutting Quality

| # | Task | Status | Notes |
|---|------|:------:|-------|
| 17.1 | Accessibility pass on all form, table, modal flows | `[x]` | improved table semantics/empty states in `components/ui/data-grid.tsx` + consistent modal rationale fields across workflows |
| 17.2 | Keyboard navigation for dense admin workflows | `[x]` | keyboard-friendly filter/button flows and focusable data-grid region reinforced in `components/ui/data-grid.tsx` |
| 17.3 | Focus-visible audit with brand-safe rings | `[x]` | validated global focus ring system in `app/globals.css` + dark-surface focus treatment |
| 17.4 | Responsive review for laptop/tablet | `[x]` | tightened table min-width behavior for tablet/laptop breakpoints in `app/globals.css` |
| 17.5 | Loading, empty, error, and permission-denied states for every module | `[x]` | shared loading/error pages + standardized empty table message in `components/ui/data-grid.tsx` + route RBAC guards in `lib/mock/admin-shell.ts` |
| 17.6 | Mock data realism review | `[x]` | realistic provider/worker/compliance datasets and operational statuses across `lib/mock/*` modules |
| 17.7 | Date, currency, and number formatting review for Canada | `[x]` | `lib/format.ts` helpers (`en-CA`, CAD) + applied date formatting in compliance pages |
| 17.8 | Privacy-aware redaction pass | `[x]` | masked sensitive IDs/references via `lib/format.ts` in compliance/booking/finance detail surfaces |
| 17.9 | Audit trail visibility review | `[x]` | risky actions consistently require rationale capture in modal/form flows (bookings, disputes, compliance, reviews) |
| 17.10 | Design consistency pass vs customer portal brand system | `[x]` | shared shell/tokens/components and consistent tone/layout patterns across all admin modules |

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
