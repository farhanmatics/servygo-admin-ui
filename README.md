# ServyGo Admin Portal

**Operational Control Center for ServyGo Platform**  
*Version 0.1.0 | Last Updated: April 2026*

---

## What is This?

ServyGo Admin Portal is internal web application for ServyGo team to manage the service marketplace platform. It is built with Next.js and provides complete control over users, bookings, services, finances, disputes, and compliance across all Canadian territories.

This portal is part of bigger ServyGo ecosystem that includes customer app, provider app, franchise portal, and public website. All data stays in Canada (AWS Montreal) to follow PIPEDA privacy rules.

**Important**: Current version uses mock data only. No backend API connection yet. This is Phase 1 UI development.

---

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/servygo/servygo-admin-portal.git
cd servygo-admin-portal

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Default login will take you to dashboard.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Fonts**: Outfit (body text) + Cormorant Garamond (headings)
- **Icons**: Lucide React

### Architecture Pattern
- **Mock-data-first**: All data comes from `lib/mock/` folder, no API calls
- **Role-Based Access Control (RBAC)**: Interface changes based on admin role
- **Location-first service management**: Services configured per location/territory
- **Component-driven**: Reusable UI primitives in `components/ui/`

### Backend Context (Future Integration)
The admin portal will connect to 10 microservices:
- API Gateway (routing, auth)
- Auth Service (Clerk integration)
- User Service (profiles, RBAC)
- Booking Service (jobs, schedules)
- Payment Service (Stripe, payouts)
- Dispatch Service (worker matching)
- Reviews Service (ratings, moderation)
- Analytics Service (dashboards, reports)
- Notification Service (email, SMS, push)
- Metadata Service (config, themes)

All services run on AWS ca-central-1 (Montreal) for Canadian data residency.

---

## Key Features

### 1. Role-Based Access Control (RBAC)

System has 6 admin roles, each with different permissions and territory access:

| Role | Access Level | Territory | Main Focus |
|------|-------------|-----------|------------|
| **Super Admin** | Full control | National | Everything - users, finance, ops, compliance |
| **Operations Admin** | High | Central Canada | Bookings, live ops, service management |
| **Finance Admin** | High | National | Payments, payouts, refunds, commissions |
| **Compliance Admin** | Medium | National | Document verification, expiry monitoring |
| **Support Admin** | Medium | National | Disputes, reviews, customer escalations |
| **Read-only Admin** | View only | National | Audit, oversight, no edit actions |

Each role sees different navigation items, different dashboard content, and different action buttons. Read-only mode disables all destructive actions.

### 2. Authentication & Session Management

- Login page with demo role switcher (for testing)
- Mock session stored in localStorage
- Auto-timeout after inactivity (70s warning, 100s lock)
- Profile menu with sign-out
- Forbidden page for unauthorized access
- Password reset flows (UI only)

### 3. Operational Dashboard

Main dashboard shows what needs attention right now:
- Live booking metrics (active jobs, delays, SLA risks)
- Pending disputes count
- Documents expiring soon
- Payout queue status
- Critical watchlist items
- Role-specific highlights and actions

Dashboard adapts content based on your admin role.

### 4. User Management

Complete user lifecycle management:
- **User List**: Filter by type (customer, provider, franchise, worker), status, location
- **User Detail**: Overview tab with profile info
- **Activity History**: Timeline of user actions
- **Documents**: Uploaded verification documents
- **Financials**: Payment history, payout info (masked for PCI compliance)
- **Actions**: Suspend, activate, reset password, export data

All user actions are logged for audit trail.

### 5. Location-First Service Management

This is special feature of ServyGo. Instead of global service catalog, we manage services per location:

**Hierarchy**: Location → Service → Subcategory → Package → Assigned Providers

Example flow:
1. Choose location (e.g., "Saskatoon, SK")
2. See which services are available there (Cleaning, Moving, etc.)
3. Click service to see subcategories (Office Cleaning, Residential Cleaning)
4. Click subcategory to see packages (Basic Clean, Deep Clean, Move-in/out)
5. Configure package pricing, forms, policies
6. Assign local providers who can fulfill this package
7. Publish when ready (blocked if no providers assigned)

This ensures customers only see services that actually have provider coverage in their area.

### 6. Admin Management

- **Admin List**: View all internal admin users
- **Admin Detail**: See role assignments, recent actions
- **Role Matrix**: Visual permission grid showing what each role can do
- **Audit Log**: Complete history of admin actions (who did what, when)

Super Admin can create new admins and change roles.

### 7. Alerts & Tasks

- **Alert Center**: Real-time operational alerts (SLA breaches, payment failures, fraud signals)
- **Task Queue**: Work inbox with prioritized tasks (urgent today, awaiting compliance, ready to close)
- Both support filtering, saved views, and export

---

## Project Structure

```
servygo-admin-portal/
│
├── app/                        # Next.js App Router
│   ├── (auth)/                # Authentication pages
│   │   ├── login/             # Login page with role switcher
│   │   ├── forgot-password/   # Password recovery
│   │   ├── reset-password/    # Password reset
│   │   ├── verify/            # 2FA verification (UI only)
│   │   ├── forbidden/         # Access denied page
│   │   └── layout.tsx         # Auth layout (split screen)
│   │
│   ├── (portal)/              # Protected admin pages
│   │   ├── dashboard/         # Main operational dashboard
│   │   ├── alerts/            # Alert center
│   │   ├── tasks/             # Task queue
│   │   ├── users/             # User management
│   │   │   ├── [id]/          # User detail pages
│   │   │   │   ├── activity/  # User activity history
│   │   │   │   ├── documents/ # User documents
│   │   │   │   └── financials/# User financial snapshot
│   │   ├── admins/            # Admin user management
│   │   │   └── [id]/          # Admin detail
│   │   ├── services/          # Location-first service config
│   │   │   └── locations/[locationId]/
│   │   │       ├── services/[serviceId]/
│   │   │       └── packages/[packageId]/
│   │   ├── settings/roles/    # Permission matrix
│   │   ├── audit/admin-actions/# Audit log
│   │   └── layout.tsx         # Portal layout with shell
│   │
│   ├── layout.tsx             # Root layout (fonts, providers)
│   ├── page.tsx               # Redirects to /dashboard
│   ├── globals.css            # Tailwind + custom styles
│   ├── fonts.ts               # Font configuration
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Loading state
│   └── not-found.tsx          # 404 page
│
├── components/
│   ├── app/                   # Shell components
│   │   ├── shell.tsx          # Main app shell (sidebar + main)
│   │   ├── sidebar.tsx        # Left navigation (role-aware)
│   │   ├── top-bar.tsx        # Sticky header (search, alerts, profile)
│   │   ├── profile-menu.tsx   # User profile dropdown
│   │   └── portal-access.tsx  # Route guard component
│   │
│   ├── ui/                    # Reusable UI primitives (30+ components)
│   │   ├── button.tsx         # Button variants
│   │   ├── card.tsx           # Card, MetricCard, StatPill
│   │   ├── input.tsx          # Input, Textarea
│   │   ├── choice-controls.tsx# Select, Checkbox, Radio, Switch
│   │   ├── data-grid.tsx      # Table with column visibility
│   │   ├── filter-bar.tsx     # Filters, saved views, active filters
│   │   ├── status-badge.tsx   # Status indicators
│   │   ├── risk-badge.tsx     # Risk level badges
│   │   ├── tabs.tsx           # Tab navigation
│   │   ├── pagination.tsx     # Pagination controls
│   │   ├── overlay.tsx        # Modal, Drawer, ConfirmDialog
│   │   ├── feedback.tsx       # EmptyState, Skeleton, ErrorState
│   │   ├── breadcrumbs.tsx    # Breadcrumb navigation
│   │   └── page-header.tsx    # Page header with actions
│   │
│   ├── dashboard/             # Dashboard page
│   ├── users/                 # User management pages
│   ├── admins/                # Admin management pages
│   ├── services/              # Service configuration pages
│   └── providers.tsx          # Auth context + toast provider
│
├── lib/mock/                  # Mock data layer (no API yet)
│   ├── admin-shell.ts         # RBAC roles, nav, dashboard metrics
│   ├── users.ts               # User mock data
│   ├── admins.ts              # Admin mock data
│   └── services.ts            # Location/service/package hierarchy
│
├── public/                    # Static assets
│   └── logos/                 # ServyGo logo variants
│
├── knowledge/                 # Symlink to central knowledge base
│   ├── .ai/                   # AI memory (DESIGN.md, MEMORY.md)
│   ├── docs/                  # Full documentation
│   │   ├── 00-source-docs/    # Original SRS, TRD files
│   │   ├── 01-architecture/   # System architecture docs
│   │   ├── 02-requirements/   # Requirements summaries
│   │   └── ...                # More docs folders
│   └── scripts/               # Setup scripts
│
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── tailwind.config.*          # Tailwind config (v4)
└── README.md                  # This file
```

---

## Design System

### Colors

ServyGo uses warm, natural color palette inspired by forest and earth tones:

**Brand Colors:**
- Forest (`#1a2e0d`) - Primary brand color, headings
- Olive (`#2d4a15`) - Secondary brand
- Cream (`#fdfaf2`) - Background surfaces
- Gold (`#c8a44a`) - Accent, focus states, premium features
- Sand (`#d9ceb4`) - Neutral backgrounds

**Semantic Colors:**
- Success (`#2f8f47`) - Approved, paid, healthy
- Warning (`#b77a12`) - Pending review, expiring soon
- Danger (`#c43a3a`) - Fraud risk, failed, suspended
- Info (`#1f6aa5`) - Guidance, timeline markers

### Typography

Two-font system for professional but warm feel:

- **Outfit** (sans-serif): Body text, UI labels, tables, forms
- **Cormorant Garamond** (serif): Headings, dashboard metrics, editorial moments

Font sizes use custom scale from `text-2xs` (0.6875rem) to `text-3xl` (2rem).

### Layout Principles

- **Desktop-first**: Primary target is desktop/laptop for admin work
- **Left sidebar**: Global navigation, role info, read-only notice
- **Sticky top bar**: Search, territory switcher, alerts, profile
- **Right drawers**: Quick review/edit flows (planned)
- **Responsive**: Works on tablet, mobile is functional but not primary

### Accessibility

- WCAG 2.1 AA compliance target
- Keyboard navigation support (Tab, Enter, Escape)
- Focus-visible rings using gold color
- Skip-to-content link for screen readers
- Reduced motion support (`prefers-reduced-motion`)
- Semantic HTML structure
- ARIA labels where needed

### Privacy-Aware Design

Following PIPEDA principles:
- Minimal PII exposure in list views (names truncated, details in focused screens)
- Masked payment data (never show full card numbers)
- Clear consent indicators
- Audit trail for all data access
- Canadian formatting (CAD currency, GST/HST, date formats)

---

## How It Works

### Mock Data Architecture

Since there is no backend yet, all data comes from `lib/mock/` folder:

```typescript
// Example: Getting dashboard metrics
import { dashboardMetrics } from "@/lib/mock/admin-shell";

// Returns array of metric objects
[
  { label: "Active jobs", value: "186", delta: "+12 today", tone: "success" },
  { label: "Pending disputes", value: "18", delta: "4 critical", tone: "warning" },
  // ...
]
```

Mock domains include:
- `admin-shell.ts`: Roles, navigation, dashboard data, route permissions
- `users.ts`: User profiles, activity, documents, financials
- `admins.ts`: Admin users, roles, audit logs
- `services.ts`: Location/service/package/provider hierarchy

### Authentication Flow (Mock)

1. User visits `/login`
2. Selects demo role (Super Admin, Operations, etc.)
3. Clicks "Sign In"
4. Session stored in localStorage (`servygo-admin-auth`, `servygo-admin-role`)
5. Redirected to `/dashboard`
6. Sidebar shows role-appropriate navigation
7. Session expires after inactivity (shows warning at 70s, locks at 100s)
8. User can refresh session or sign out

**Note**: Real implementation will use Clerk for authentication.

### Route Protection

Portal layout wraps all protected routes with `PortalAccess` component:

```tsx
// app/(portal)/layout.tsx
export default function PortalLayout({ children }) {
  return (
    <AppShell>
      <PortalAccess>{children}</PortalAccess>
    </AppShell>
  );
}
```

`PortalAccess` checks:
- Is user authenticated?
- Does user's role allow this route?
- Is session locked due to timeout?

If check fails, redirects to login or shows forbidden page.

### Component Patterns

**UI Primitives** (`components/ui/`):
- Small, reusable, composable
- Accept props for customization
- Include all states (loading, error, empty, disabled)
- Accessible by default

**Page Components** (`components/dashboard/`, `components/users/`, etc.):
- Compose UI primitives
- Get data from mock layer
- Handle page-level state
- Export as default for route

**Shell Components** (`components/app/`):
- Sidebar: Navigation with role filtering
- TopBar: Search, alerts, profile
- AppShell: Grid layout combining sidebar + main

---

## Development Guidelines

### Adding New Page

1. Create route folder under `app/(portal)/your-feature/`
2. Add `page.tsx` that imports component
3. Create component in `components/your-feature/`
4. Add mock data in `lib/mock/` if needed
5. Update navigation in `lib/mock/admin-shell.ts` (navGroups array)
6. Add route permissions if role-restricted (routePermissions array)

### Adding New UI Component

1. Create file in `components/ui/your-component.tsx`
2. Use TypeScript interfaces for props
3. Support all relevant states (loading, error, disabled)
4. Follow existing patterns (rounded corners, proper spacing)
5. Add to this README when done

### Working with Mock Data

- Keep mock data realistic (Canadian names, provinces, CAD prices)
- Include edge cases (empty states, error states, partial data)
- Type everything with TypeScript interfaces
- Mock delay simulator planned for loading states

### Code Style

- Use TypeScript strictly (no `any`)
- Functional components with hooks
- Named exports for components, default for pages
- Absolute imports with `@/` alias
- Follow ESLint rules (`npm run lint`)

---

## Compliance & Security

### PIPEDA (Canadian Privacy Law)

- All data stays in AWS ca-central-1 (Montreal)
- Consent tracking for data processing
- Data access request (DSAR) workflows planned
- Data deletion request support planned
- Audit logging of all admin actions
- Minimal data exposure in UI

### PCI-DSS (Payment Security)

- Never store or display full card numbers
- Use masked values (•••• •••• •••• 4242)
- Payment data handled by Stripe (future)
- Admin UI shows only status and masked references

### Security Features

- Role-based route protection
- Session timeout with warning
- Read-only mode for audit users
- Confirmation dialogs for destructive actions
- Audit trail for all changes
- HTTPS/TLS 1.3 (production)

---

## Current Status

### ✅ Completed (Phase 1 - MVP UI)

- Foundation & design system (tokens, fonts, layout)
- Authentication flows (login, password reset, role switching)
- App shell (sidebar, topbar, profile menu)
- Dashboard with role-based variants
- User management (list, detail, activity, documents, financials)
- Admin management (list, detail, role matrix, audit log)
- Location-first service management (full hierarchy)
- Alert center and task queue
- 30+ reusable UI components
- Accessibility basics (focus, keyboard, reduced motion)

### ⏳ Planned (Next Phases)

- Booking management (list, detail, assignment, cancellation)
- Live operations monitoring (map view, territory board)
- Financial management (transactions, payouts, refunds, reports)
- Dispute resolution (evidence review, decision workflow)
- Document verification (compliance queue, expiry monitoring)
- Review moderation (fraud detection, approval queue)
- Analytics & reporting (revenue trends, performance metrics)
- Platform configuration (settings, templates, emergency controls)
- Real API integration (replace mock data)
- WebSocket for real-time updates

See full tracking in [UI Plan - Admin Portal](../servygo-knowledge/docs/ui-plan-admin-portal.md) with 87 planned pages.

---

## Related Documentation

This project is part of larger ServyGo platform. For more details:

### Knowledge Base

Full documentation lives in `knowledge/` folder (symlink to central repo at `../servygo-knowledge`). This is single source of truth for all ServyGo project knowledge:

- **Requirements**: [`knowledge/docs/02-requirements/srs-admin.md`](knowledge/docs/02-requirements/srs-admin.md) - Complete SRS for admin portal
- **Architecture**: [`knowledge/docs/01-architecture/system-overview.md`](knowledge/docs/01-architecture/system-overview.md) - System architecture and infrastructure
- **UI Plan**: [`knowledge/docs/ui-plan-admin-portal.md`](knowledge/docs/ui-plan-admin-portal.md) - Detailed UI build checklist (87 pages, living document)
- **Technical Design**: [`knowledge/.ai/DESIGN.md`](knowledge/.ai/DESIGN.md) - Architecture decisions summary (includes admin portal UI section)
- **Project Memory**: [`knowledge/.ai/MEMORY.md`](knowledge/.ai/MEMORY.md) - Active project context (includes admin portal status)

**Note**: The `.ai/` folder in knowledge repo contains AI memory system (MEMORY.md + DESIGN.md) that tracks active development context across all ServyGo projects. Admin portal UI status and architecture decisions are documented there.

### Other ServyGo Repositories

- `servygo-customer-web` - Customer-facing booking app
- `servygo-provider-web` - Provider portal for job management
- `servygo-franchise-portal` - Franchise operator dashboard
- `servygo-public-website` - Marketing site
- `servygo-api-gateway` - API routing and auth
- `servygo-auth-service` - Authentication microservice
- `servygo-user-service` - User management microservice
- `servygo-booking-service` - Booking microservice
- And 6 more backend services...

---

## Team & Contacts

- **Product Owner**: ServyGo Inc. (Saskatoon, SK, Canada)
- **Technical Architect**: Divergent Technologies Limited (Dhaka, Bangladesh)
- **Development Team**: Internal ServyGo engineering

---

## License

Private repository. All rights reserved by ServyGo Inc.

---

## Notes for Developers

### If You Are New to Project

1. Read this README first
2. Check `knowledge/docs/ui-plan-admin-portal.md` to see what is built and what is planned
3. Look at `lib/mock/admin-shell.ts` to understand RBAC system
4. Run `npm run dev` and explore the app with different roles
5. Check `knowledge/docs/09-onboarding/` for detailed setup guide

### Common Gotchas

- **Mock data only**: Do not try to call APIs, they do not exist yet
- **Role matters**: Some pages hide based on your selected role
- **Session timeout**: Demo session expires quickly (for testing security flows)
- **Knowledge symlink**: `knowledge/` folder is junction point to parent directory
- **Tailwind v4**: Uses new `@theme` syntax in `globals.css`, not old config file

### Testing

Currently no automated tests. Manual testing checklist:
- Try all 6 admin roles
- Test all navigation links
- Verify role-based permission hiding
- Check responsive layout (desktop, tablet, mobile)
- Test keyboard navigation
- Verify session timeout behavior

---

**Last Updated**: April 25, 2026  
**Maintained By**: ServyGo Engineering Team  
**Questions?**: Check knowledge base docs or contact technical architect
