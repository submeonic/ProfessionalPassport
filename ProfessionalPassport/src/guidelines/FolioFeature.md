# Recruiter Folio Feature

## Overview
The Recruiter Folio feature enables recruiters to create position-specific folios, browse candidate passports in an interactive carousel, and review/annotate candidates with tagging and notes. This feature is only available to users in the Recruiter role.

## Navigation Flow

### From Home Dashboard
1. **Folios Icon in Navigation Rail** → Opens FoliosOverview
2. **Create Folio Button in Quick Actions** → Opens FoliosOverview (ready to create)
3. **View Candidates Button in Quick Actions** → Opens CandidateCarousel with first active folio

## Components

### FoliosOverview (`/components/folio/FoliosOverview.tsx`)
Main workspace displaying all folios organized by status (Active, Draft, Archived).

**Features:**
- Grid layout of FolioCard components
- Create New Folio button
- Empty state for first-time users
- Separate sections for Active and Draft folios
- Quick navigation to candidate carousel

**Interactions:**
- Click any FolioCard → Opens CandidateCarousel for that folio
- Click Create Folio → Opens FolioForm modal

### FolioCard (`/components/folio/FolioCard.tsx`)
Individual folio display card showing:
- Role title and department
- Status badge (active/draft/archived)
- Required skills (first 4 + count)
- Candidate count
- Creation date
- Hover glow effect with emerald accent

### FolioForm (`/components/folio/FolioForm.tsx`)
Modal form for creating new folios with:
- **Role Title**: Text input (required)
- **Department**: Dropdown select (required)
- **Required Skills**: Multi-select chip interface with search (required)
- **Experience Range**: Dual-handle slider (0-15 years)

**Features:**
- Skill search/filter functionality
- Visual feedback when selecting/deselecting skills
- Form validation
- Emerald accent for recruiter branding

### CandidateCarousel (`/components/folio/CandidateCarousel.tsx`)
Interactive browsing interface for candidates in a folio.

**Desktop View:**
- 3-column card layout (previous, current, next)
- Center card enlarged and highlighted
- Arrow navigation buttons
- Quick tag buttons below carousel

**Mobile View:**
- Single card view
- Swipe gestures for navigation
- Snap scrolling

**Quick Tag Buttons:**
- ⭐ **Shortlist** (Emerald) - Mark as promising candidate
- ⚪ **Neutral** (Gray) - Mark as neutral/pending
- ❌ **Pass** (Red) - Mark as not a fit

**Features:**
- Current position indicator (e.g., "2 of 5")
- Click candidate card → Opens full CandidateReview
- Visual tag state (filled when active)
- "View Full Profile" link

### CandidateCard (`/components/folio/CandidateCard.tsx`)
Preview card for candidate with:
- Avatar with initials fallback
- Name and headline
- Top 3 key skills (+ count if more)
- Active state highlighting
- Hover effects

### CandidateReview (`/components/folio/CandidateReview.tsx`)
Full-screen detailed review of candidate passport with annotation panel.

**Layout (Desktop):**
- **Left Column (2/3)**: Read-only passport content
  - Candidate header with avatar
  - Personal summary
  - Key skills
  - Work experience
  - Education
  - Projects
  - Awards (if available)

- **Right Column (1/3)**: Annotation panel (sticky)
  - Quick action tag buttons
  - Notes editor with save functionality
  - Last reviewed date

**Tag Buttons:**
- ❌ **Pass** (Red/Vermilion)
- ✏️ **Annotate** (Cyan)
- ⭐ **Shortlist** (Emerald)

**Features:**
- Toggle tags on/off (multiple can be active)
- Expandable notes field with edit/save modes
- Auto-save timestamp on annotation changes
- Scrollable passport content
- Reuses passport preview layout for consistency

## Data Structure

### Folio Type
```typescript
interface Folio {
  id: string;
  roleTitle: string;
  department: string;
  requiredSkills: string[];
  experienceRange: [number, number]; // [min, max]
  status: "draft" | "active" | "archived";
  createdDate: string;
  candidateIds: string[];
}
```

### Candidate Type
```typescript
interface Candidate {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  keySkills: string[];
  passportData: PassportData; // References applicant passport structure
}
```

### CandidateAnnotation Type
```typescript
interface CandidateAnnotation {
  candidateId: string;
  folioId: string;
  tags: CandidateTag[]; // ["shortlist", "pass", "neutral", "annotated"]
  notes: string;
  reviewedDate?: string;
}
```

### Mock Data
Sample folios, candidates, and annotations provided in `/components/folio/mockData.ts` including:
- 3 sample folios (2 active, 1 draft)
- 4 sample candidates with diverse skill sets
- Pre-existing annotations demonstrating the feature

## Design Specifications

### Colors (Recruiter Theme)
- **Background**: Onyx Gradient (#1B1B1B → #232323)
- **Cards**: Graphite Brushed (#2A2A2A)
- **Text**: Soft Ivory (#ECEBE2)
- **Primary Accent**: Emerald (#00C48C) - Recruiter brand color
- **Secondary Accent**: Electric Cyan (#00B5D8)
- **Destructive**: Vermilion (#F85A40)
- **Meta Text**: Warm Nickel (#A6A6A0)

### Typography
- **Headings**: Overpass (700-800 weight)
- **Body**: Inter (400-500 weight)
- **Metadata**: Kode Mono (400 weight)

### Motion
- Card hover lift with emerald glow (vs cyan for applicants)
- Smooth carousel transitions
- Tag button state animations
- Modal scale + fade animations

### Layout
- 8pt base grid system
- 12px border radius on all cards
- Responsive breakpoints (mobile: <768px, desktop: ≥768px)
- 2-column grid for folio cards (desktop)
- 3-column carousel layout (desktop)

## Integration Points

### NavigationRail
- Folios icon exists in recruiter navigation
- Clicking "Folios" navigates to FoliosOverview
- Active state tracked and highlighted

### QuickActionsBar
- "Create Folio" button opens FoliosOverview
- "View Candidates" button opens carousel with latest active folio

### PassportData Reuse
- CandidateReview component reuses PassportData structure
- Displays applicant passport in read-only mode
- Maintains visual consistency with applicant CorePassportPreview

## User Flows

### Create New Folio
1. Navigate to Folios from sidebar OR click "Create Folio" in Quick Actions
2. Click "+ Create Folio" button
3. Fill out form:
   - Enter role title
   - Select department
   - Search and select required skills
   - Adjust experience range slider
4. Click "Create Folio"
5. New folio appears in Active Folios section
6. Success toast confirms creation

### Browse Candidates
1. Click on a FolioCard from FoliosOverview
2. View candidates in carousel interface
3. Navigate with arrow buttons or click adjacent cards
4. Current candidate highlighted in center
5. View candidate count indicator

### Quick Tag Candidate
1. From CandidateCarousel, view current candidate
2. Click one of the three quick tag buttons:
   - Shortlist (green star)
   - Neutral (gray circle)
   - Pass (red X)
3. Button fills with color to show active state
4. Success toast confirms tag
5. Navigate to next candidate
6. Tags persist when returning to same candidate

### Review & Annotate Candidate
1. From CandidateCarousel, click candidate card or "View Full Profile"
2. Left side shows full passport (scrollable)
3. Right panel shows annotation tools
4. Click tag buttons to mark candidate
5. Click "Edit" on notes section
6. Add detailed notes about candidate
7. Click "Save" to persist notes
8. Notes and tags auto-save with review date
9. Click "Back" to return to carousel

### Return to Home
1. Click "Back to Folios" from carousel
2. Returns to FoliosOverview
3. Click "Back to Home" from FoliosOverview
4. Returns to HomeDashboard

## View State Management
HomeDashboard manages four recruiter view states:
1. **home** - Default dashboard view
2. **folios** - FoliosOverview workspace
3. **carousel** - CandidateCarousel browsing interface
4. **review** - CandidateReview detailed view

State tracking:
- `activeFolioId` - Currently selected folio
- `activeCandidateId` - Currently reviewed candidate
- `foliosData` - All folios, candidates, and annotations

## Future Enhancements
- Bulk candidate import from job boards
- AI-powered candidate matching based on folio requirements
- Email integration for candidate outreach
- Interview scheduling
- Collaborative notes (multiple recruiters)
- Export folio report as PDF
- Advanced filtering and sorting in carousel
- Candidate comparison view (side-by-side)
- Analytics dashboard per folio (candidate funnel, time-to-hire, etc.)
- Integration with ATS (Applicant Tracking Systems)
