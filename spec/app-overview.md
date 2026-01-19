# App #2 – Content Pipeline Board (Draft)

This app manages content items through three states:

- To Do
- In Progress
- Done

## Features

### Add New Content
- Input field to enter new content ideas
- New items automatically start in "To Do" status
- Enter key or "Add Content" button to submit
- Input validation: title cannot be empty

### Status Management
- Items can only move forward: To Do → In Progress → Done
- Click "Start" button to move from To Do to In Progress
- Click "Done" button to move from In Progress to Done
- Done items have no action buttons

### Display
- Three column layout showing current status
- Item count displayed in each column header
- Real-time updates when items are added or moved

Out of scope (for now):
- Drag and drop
- User accounts
- Permissions
- Deployment
- Edit existing items
- Delete items
- Reverse status movement
