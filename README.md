# Issue Tracker - Design Rails MCP Playground

A Linear-style issue tracker ([demo](https://playground.designrails.com)) built to serve as a testing playground for the [Design Rails MCP Server](https://designrails.com). This application provides a realistic, feature-rich environment for testing design iterations, visual language generation, and automated design reviews.

## About

This is a playground application designed for user testing of the Design Rails MCP server. Design Rails is an MCP (Model Context Protocol) server that:

- Creates visual languages from scratch
- Generates detailed design specs from feature requests and product context
- Conducts design reviews around color contrast, layout issues, and more
- Works seamlessly with coding agents to improve design quality

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

## Set it up on your own project

Want to use Design Rails in your own project? Check out our [installation instructions](https://designrails.com/#installation) for detailed setup steps.

### Quick Setup

Use the CLI tool to set it up easily:

```bash
npx designrails@latest setup
```

## Contributing

This is a playground project for testing Design Rails MCP server. Feel free to experiment with new features and design patterns.

## License

MIT
