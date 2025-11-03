# Professional Passport Feature

## Overview
The Applicant Passport feature extends the Home Dashboard with comprehensive passport creation, editing, and preview capabilities. This feature is only available to users in the Applicant role.

## Navigation Flow

### From Home Dashboard
1. **Passport Icon in Navigation Rail** → Opens PassportOverview
2. **Preview Button in Quick Actions** → Opens PreviewOptionsModal
   - Select "Core Passport" → Opens CorePassportPreview
   - Select "Role Focus" → Shows "coming soon" message

## Components

### PassportOverview (`/components/passport/PassportOverview.tsx`)
Main editing workspace with four collapsible sections:
- Education
- Work Experience
- Projects
- Awards & Recognition

**Features:**
- Add/Edit/Delete entries
- Collapsible section cards
- Responsive 2-column grid (desktop) / stacked (mobile)
- Delete confirmation dialog
- Success toasts for actions

### SectionCard (`/components/passport/SectionCard.tsx`)
Collapsible container for each passport section with:
- Section icon and title
- Entry count
- Add New button
- List of EntryCards or empty state
- Smooth expand/collapse animation

### EntryCard (`/components/passport/EntryCard.tsx`)
Individual entry display with:
- Title, subtitle, and date range
- Description preview (line-clamped)
- Edit and Delete buttons (visible on hover)
- Hover glow effect

### EntryForm (`/components/passport/EntryForm.tsx`)
Dynamic form that adapts to section type:
- **Education**: Institution, Degree, Field, Dates, Description
- **Experience**: Company, Position, Location, Dates, Description
- **Projects**: Title, Role, Technologies, Dates, URL, Description
- **Awards**: Title, Issuer, Date, Description

**Features:**
- Add or Edit mode
- Form validation
- Delete button (edit mode only)
- Modal overlay with backdrop dismiss

### PreviewOptionsModal (`/components/passport/PreviewOptionsModal.tsx`)
Modal for choosing preview type:
- **Core Passport**: Complete overview of all sections
- **Role Focus**: Coming soon (shows placeholder)

### CorePassportPreview (`/components/passport/CorePassportPreview.tsx`)
Read-only passport display with:
- Personal summary
- Key skills badges
- Focus areas
- All four sections (Education, Experience, Projects, Awards)
- Scrollable content with fade transitions
- Back button to return to home

## Data Structure

### PassportData Type
```typescript
interface PassportData {
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  awards: AwardEntry[];
  personalSummary?: string;
  keySkills?: string[];
  focusAreas?: string[];
}
```

### Mock Data
Sample passport data is provided in `/components/passport/mockData.ts` with realistic entries for all sections.

## Design Specifications

### Colors (Premium Passport Theme)
- **Background**: Onyx Gradient (#1B1B1B → #232323)
- **Cards**: Graphite Brushed (#2A2A2A)
- **Text**: Soft Ivory (#ECEBE2)
- **Accent**: Electric Cyan (#00B5D8)
- **Meta Text**: Warm Nickel (#A6A6A0)
- **Destructive**: Vermilion (#F85A40)

### Typography
- **Headings**: Overpass (700-800 weight)
- **Body**: Inter (400-500 weight)
- **Metadata**: Kode Mono (400 weight)

### Motion
- Card hover lift with cyan glow
- Smooth expand/collapse animations
- Fade transitions on entry/exit
- Modal scale + fade animations

### Layout
- 8pt base grid system
- 12px border radius on all cards
- Responsive breakpoints (mobile: <768px, desktop: ≥768px)

## Integration Points

### NavigationRail
- Passport icon already exists in applicant navigation
- Clicking "Passport" navigates to PassportOverview
- Active state tracked and highlighted

### QuickActionsBar
- "Preview" button opens PreviewOptionsModal
- Triggers view transition on selection

### View State Management
HomeDashboard manages three view states:
1. **home** - Default dashboard view
2. **passport** - PassportOverview editing workspace
3. **preview** - CorePassportPreview read-only view

## User Flows

### Add New Entry
1. Navigate to Passport from sidebar
2. Click "Add New" in desired section
3. Fill out form fields
4. Click "Save"
5. Entry appears in section card
6. Success toast confirms action

### Edit Entry
1. Hover over entry card
2. Click edit (pencil) icon
3. Modify form fields
4. Click "Save"
5. Changes reflected in card
6. Success toast confirms action

### Delete Entry
1. Hover over entry card and click delete (trash) icon, OR
2. Open entry in edit mode and click "Delete" button
3. Confirmation dialog appears
4. Click "Delete" to confirm
5. Entry removed from list
6. Success toast confirms action

### Preview Passport
1. Click "Preview" in Quick Actions
2. Select "Core Passport" from modal
3. View read-only formatted passport
4. Click "Back" to return home

## Future Enhancements
- Role Focus view (tailored passport for specific job roles)
- PDF export functionality
- Share passport functionality
- Rich text editor for descriptions
- Image/file uploads
- Custom sections
