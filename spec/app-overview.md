# App #2 – A Kanban Maybe (Updated)

This app manages content items through a 6-column Kanban workflow:

- New
- Planning
- Active
- Revising
- Overdue
- Closure

## Features

### Add New Content
- Input field to enter new content ideas
- New items automatically start in "New" status
- Enter key or "Add Content" button to submit
- Input validation: title cannot be empty

### Status Management
- Items progress through workflow: New → Planning → Active → Revising → Closure
- Overdue items can be moved back to Active
- "Go Back" functionality for completed items to return to previous status
- Status-specific action buttons (Plan, Start, Review, Complete, Resume)
- Items automatically move to Overdue after 7 days in Active status

### Display
- Six column layout showing current workflow status
- Item count displayed in each column header
- Real-time updates when items are added or moved
- Clean, modern UI with soft color palette
- Responsive design for mobile and desktop

### New Capabilities
- Reverse status movement via "Go Back" button
- Flexible workflow management
- Visual status tracking across complete content lifecycle

Out of scope (for now):
- Drag and drop
- User accounts
- Permissions
- Deployment
- Edit existing items
- Delete items
- Data persistence beyond browser session
