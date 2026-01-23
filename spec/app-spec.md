# A Kanban Maybe - Application Specification

## Overview
A Kanban-style content management board with 6 workflow columns for tracking content creation lifecycle.

## Business Rules

### Content Item Rules
- **Creation**: New items always start in "New" column
- **Title**: Required field, minimum 3 characters, maximum 100 characters
- **Unique ID**: Auto-generated for each item
- **Timestamps**: Created date and last modified date tracked

### Workflow Transition Rules
1. **New → Planning**: Manual move only
2. **Planning → Active**: Manual move only
3. **Active → Revising**: Manual move only
4. **Active → Overdue**: Auto-move after 7 days without update
5. **Revising → Active**: Manual move only
6. **Revising → Closure**: Manual move only
7. **Overdue → Active**: Manual move only
8. **Any Column → Closure**: Manual move allowed
9. **Closure → Previous Column**: "Go Back" function available for completed items

### Column Constraints
- **New**: No limit on items
- **Planning**: Maximum 5 items
- **Active**: Maximum 3 items
- **Revising**: No limit on items
- **Overdue**: No limit on items
- **Closure**: No limit on items

## Technical Constraints

### Data Storage
- Local storage only (no backend)
- Data persists across browser sessions
- Maximum 1000 total items

### User Interface
- Drag and drop between columns
- Click to edit item titles inline
- Double-click to delete items (with confirmation)
- "Go Back" button on completed items to return to previous column
- Responsive design for mobile and desktop

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
- Cannot move items to invalid columns based on workflow rules
- Cannot exceed column item limits
- Cannot delete items in "Active" status without confirmation

## Error Handling
- Display user-friendly error messages
- Graceful degradation if local storage unavailable
- Automatic recovery from invalid states