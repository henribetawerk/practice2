# A Kanban Maybe - Application Specification

## Overview
A Kanban-style product development board with 6 workflow columns for tracking project lifecycle from ideation to enhancement.

## Business Rules

### Content Item Rules
- **Creation**: New items always start in "Frame" column
- **Title**: Required field, minimum 3 characters, maximum 100 characters
- **Unique ID**: Auto-generated for each item
- **Timestamps**: Created date (createdAt) and last modified date (updatedAt) tracked in YYYY-MM-DD format
- **Status Tracking**: Current workflow stage tracked and displayed
- **Auto-update**: updatedAt timestamp automatically updates on status change

### Workflow Transition Rules
1. **Frame → Concept**: Manual move only (Conceptualize button)
2. **Concept → Prototype**: Manual move only (Build button)
3. **Prototype → Market Test**: Manual move only (Test button)
4. **Market Test → Commercialize**: Manual move only (Launch button)
5. **Commercialize → Enhance**: Manual move only (Improve button)
6. **Enhance**: Final stage, no further progression
7. **Delete**: Items can be deleted from any column with confirmation

### Column Constraints
- **Frame**: No limit on items
- **Concept**: No limit on items
- **Prototype**: No limit on items
- **Market Test**: No limit on items
- **Commercialize**: No limit on items
- **Enhance**: No limit on items

## Technical Constraints

### Data Storage
- Local storage only (no backend)
- Data persists across browser sessions
- Maximum 1000 total items

### User Interface
- "Delete" button (X icon) on all items to remove them (with confirmation)
- Responsive design for mobile and desktop
- Project Status Overview section below Kanban board displaying all project cards
- Status-specific action buttons for workflow progression

### Project Status Display
- Overview cards section positioned below the main Kanban board
- Each card displays: project title, current stage, created date, last modified date
- Cards arranged in grid layout
- Real-time synchronization with Kanban board changes

### Performance
- Render maximum 50 items per column
- Lazy loading for additional items
- Auto-save changes within 2 seconds

## Validation Rules

### Input Validation
- Title cannot be empty or whitespace only
- Title must be unique within the board
- Special characters allowed: letters, numbers, spaces, hyphens, underscores

### State Validation
- Items follow sequential workflow progression
- Deletion requires user confirmation
- Timestamps automatically validated and updated

## Error Handling
- Display user-friendly error messages
- Graceful degradation if local storage unavailable
- Automatic recovery from invalid states