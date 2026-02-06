# App #2 – A Kanban Maybe (Updated)

This app manages content items through a 6-column Kanban workflow:

- Frame
- Concept
- Prototype
- Market Test
- Commercialize
- Enhance

## Features

### Add New Content
- Input field to enter new content ideas
- New items automatically start in "Frame" status
- Enter key or "Add Content" button to submit
- Input validation: title cannot be empty

### Status Management
- Items progress through workflow: Frame → Concept → Prototype → Market Test → Commercialize → Enhance
- Status-specific action buttons (Conceptualize, Build, Test, Launch, Improve)
- Delete functionality available for all items with confirmation
- Timestamps automatically updated when status changes

### Display
- Six column layout showing current workflow status
- Item count displayed in each column header
- Real-time updates when items are added or moved
- Clean, modern UI with soft color palette
- Responsive design for mobile and desktop
- Project Status section below Kanban board showing overview cards for all items

### Project Status Overview
- Displays all projects in card format below the Kanban board
- Each card shows:
  - Project title
  - Current stage status
  - Created date (YYYY-MM-DD)
  - Last modified date (YYYY-MM-DD)
- Cards update in real-time when items change status

### New Capabilities
- Delete items from any column with confirmation
- Flexible workflow management
- Visual status tracking across complete content lifecycle

Out of scope (for now):
- Drag and drop
- User accounts
- Permissions
- Deployment
- Edit existing items
- Data persistence beyond browser session
