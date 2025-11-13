# Issue Tracker - Design Rails MCP Playground

A Linear-style issue tracker built to serve as a testing playground for the [Design Rails MCP Server](https://github.com/Design Rails/mcp). This application provides a realistic, feature-rich environment for testing design iterations, visual language generation, and automated design reviews.

## About

This is a playground application designed for user testing of the Design Rails MCP server. Design Rails is an MCP (Model Context Protocol) server that:

- Creates visual languages from scratch
- Generates detailed design specs from feature requests and product context
- Conducts design reviews around color contrast, layout issues, and more
- Works seamlessly with coding agents to improve design quality

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Drag & Drop**: @dnd-kit
- **Rich Text**: Tiptap
- **State Management**: React Context API
- **Icons**: Lucide React

## Features

### Current Implementation

- **Issue Management**
  - Create, read, update, and delete issues
  - Rich text descriptions with Tiptap editor
  - Status tracking (Backlog, To Do, In Progress, In Review, Done, Canceled)
  - Priority levels (None, Low, Medium, High, Urgent)
  - Labels with custom colors
  - Assignee management

- **Views**
  - List view with sortable table
  - Kanban board with drag-and-drop between columns
  - Detailed issue view with inline editing

- **Collaboration**
  - Comments on issues
  - User switching (frictionless mock authentication)
  - Activity timestamps

- **Filtering & Search**
  - Full-text search by title and ID
  - Filter by status, priority, assignee
  - Clear all filters

- **UI/UX**
  - Responsive design
  - Dark mode support
  - Empty states
  - Skeleton loaders
  - Smooth transitions and animations

### Data Persistence

All data is stored in-memory using React Context API. Changes persist during the session but reset on page refresh. This is intentional for playground testing purposes.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically redirect to `/issues` where you'll see sample issues loaded.

## Project Structure

```
├── app/
│   ├── issues/          # Issues list and detail pages
│   ├── board/           # Kanban board view
│   ├── layout.tsx       # Root layout with providers
│   └── globals.css      # Global styles and theme variables
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── issues/          # Issue-specific components
│   ├── app-layout.tsx   # Main app navigation layout
│   └── user-switcher.tsx
├── lib/
│   ├── context/         # React Context for state management
│   ├── data/            # Mock data generators
│   ├── constants.ts     # Status and priority configurations
│   └── utils.ts         # Utility functions
└── types/
    └── index.ts         # TypeScript type definitions
```

## Design Experiment Ideas

This issue tracker provides a rich foundation for testing design improvements. Here are potential features and experiments that could be implemented:

### High Priority Features
- **Advanced Filtering**
  - Saved filter views
  - Complex filter logic (AND/OR conditions)
  - Filter by date ranges
  - Custom filter builder UI

- **Bulk Operations**
  - Select multiple issues
  - Bulk status/priority/assignee changes
  - Bulk delete
  - Bulk label management

- **Issue Dependencies**
  - Link issues as blockers/blocked by
  - Dependency graph visualization
  - Critical path highlighting

- **Sprint Planning**
  - Create and manage sprints
  - Sprint burndown charts
  - Velocity tracking
  - Sprint retrospectives

### Medium Priority Features
- **Timeline/Roadmap View**
  - Gantt chart visualization
  - Milestone tracking
  - Release planning

- **Custom Fields**
  - Add custom properties to issues
  - Different field types (text, number, date, select)
  - Field validation

- **Notifications**
  - In-app notification center
  - Toast notifications for updates
  - Email digest mockups

- **Advanced Comments**
  - Nested comment threads
  - Comment reactions
  - @mentions
  - Comment editing/deletion history

- **Keyboard Shortcuts**
  - Command palette (Cmd/Ctrl + K)
  - Quick actions (C for create, / for search)
  - Navigation shortcuts
  - Custom shortcut configuration

### Low Priority Features
- **Priority Matrix View**
  - Eisenhower matrix (urgent/important grid)
  - Drag issues between quadrants
  - Visual prioritization

- **Issue Templates**
  - Bug report template
  - Feature request template
  - Custom templates

- **Time Tracking**
  - Estimated time
  - Time spent tracking
  - Time reports and charts

- **Advanced Search**
  - Search syntax with operators
  - Search history
  - Saved searches

- **Automation Rules**
  - Auto-assign based on labels
  - Auto-transition statuses
  - Rule builder UI

- **Export/Import**
  - Export to CSV/JSON
  - Import from other tools
  - Bulk data operations

### UI/UX Enhancements
- **Themes**
  - Multiple color schemes
  - Custom theme builder
  - Theme presets

- **Accessibility**
  - Keyboard navigation improvements
  - Screen reader optimization
  - High contrast mode
  - Focus indicators

- **Performance**
  - Virtual scrolling for large lists
  - Optimistic updates
  - Progressive loading

- **Animations**
  - Micro-interactions
  - Transition animations
  - Loading states
  - Skeleton screens

### Advanced Features
- **Analytics Dashboard**
  - Issue metrics and trends
  - Team performance charts
  - Custom report builder

- **Integration Mockups**
  - GitHub integration UI
  - Slack notifications
  - Calendar sync

- **Mobile Responsive**
  - Mobile-optimized views
  - Touch gestures
  - Bottom navigation

- **Collaboration**
  - Real-time cursors (mock)
  - Live presence indicators
  - Collaborative editing

## MCP Server Configuration

This project is configured to work with the shadcn MCP server for component discovery and installation. The configuration is in `.mcp.json`.

## Contributing

This is a playground project for testing Design Rails MCP server. Feel free to experiment with new features and design patterns.

## License

MIT
