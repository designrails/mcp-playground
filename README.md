# Issue Tracker - Design Rails MCP Playground

A basic Linear-style issue tracker ([demo](https://playground.designrails.com)) that serves as a playground for experimenting with [Design Rails](https://designrails.com). 

This intentionally minimal app comes with no design system or brand identity—just functional UI components and the MCP server already configured. Use it to experiment with creating a visual language from scratch, or jump straight into implementing features with AI-powered design specs and reviews.

## About

This playground application is designed for user testing of Design Rails—an MCP (Model Context Protocol) server that:

- Creates visual languages from scratch
- Generates detailed design specs from feature requests and product context
- Conducts design reviews for color contrast, layout issues, and more (requires Microsoft's [Playwright MCP](https://github.com/microsoft/playwright-mcp) - already configured)
- Works seamlessly with coding agents to improve design quality

## What's Included

- **Sample Data**: Pre-loaded issues with various statuses, priorities, and assignees
- **UI Components**: Shadcn/ui components styled with Tailwind CSS
- **Two Views**: List view (`/issues`) and Kanban board view (`/board`)
- **Rich Text Editor**: Tiptap integration for issue descriptions and comments
- **Drag & Drop**: Full drag-and-drop support in the board view
- **Design Context**: Basic product context files in `./design-context` folder

Note: All data is mock data stored in memory—changes reset on page refresh.

## Prerequisites

- **Node.js** 18+ and npm
- **AI Coding Agent**: Claude Code, Cursor, Codex, or VS Code with MCP support
- **Design Rails Account**: You'll be prompted to sign in or create one when connecting the MCP Server

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

4. Connect Design Rails to your AI coding agent:
   - The server is pre-configured in `.mcp.json` (Claude Desktop, Cursor, Windsurf) or `.vscode/settings.json` (VS Code)
   - Open your coding agent in this workspace—it should automatically detect it
   - You'll be prompted to sign in or create a Design Rails account
   - See [detailed setup instructions](https://designrails.com/#installation) if you need help

5. (Optional) Ask your agent to set up a design system and apply it to the codebase

6. Start experimenting with design improvements! Check out the [Ready-to-Use Feature Prompts](#ready-to-use-feature-prompts) section below.

## Ready-to-Use Feature Prompts

The prompts below are ready to copy and paste into your AI coding agent to implement features and test Design Rails. They're organized by the type of design work required:

### 1. UI Polish & Accessibility
Low-level refinements requiring specialized design expertise. These focus on making the existing app more polished, accessible, and responsive.

**Accessibility**
```
Improve accessibility:
- Enhanced keyboard navigation throughout the app
- Screen reader optimization with proper ARIA labels
- High contrast mode toggle
- Improved focus indicators
- Accessibility audit and fixes
```

**Animations**
```
Add polished animations:
- Micro-interactions for button clicks and hovers
- Smooth transition animations between views
- Enhanced loading states with spinners
- Skeleton screens for better perceived performance
- Animation preferences (reduce motion support)
```

**Mobile Responsive**
```
Optimize for mobile devices:
- Mobile-optimized views for all pages
- Touch gestures for drag-and-drop
- Bottom navigation bar for mobile
- Responsive tables that stack on mobile
- Touch-friendly button sizes and spacing
```

### 2. Simple Features
Isolated features typically contained within a single view or component. Good for testing straightforward design specs.

**Themes**
```
Implement theme customization:
- Multiple color scheme presets
- Custom theme builder with color pickers
- Theme preview before applying
- Save custom themes
- Theme switching in settings
```

**Keyboard Shortcuts**
```
Add comprehensive keyboard shortcuts:
- Command palette (Cmd/Ctrl + K) for quick actions
- Quick actions: C for create issue, / for search focus
- Navigation shortcuts for switching views
- Custom shortcut configuration in settings
- Keyboard shortcut help overlay (Cmd/Ctrl + ?)
```

**Bulk Operations**
```
Add bulk operations functionality to the issue tracker:
- Multi-select checkboxes for issues in the list view
- Bulk actions toolbar that appears when issues are selected
- Support for bulk status changes, priority updates, assignee changes, and label management
- Bulk delete with confirmation dialog
- Visual feedback showing how many issues are selected
```

**Issue Templates**
```
Implement issue templates:
- Pre-built templates: Bug report, Feature request
- Custom template creation with field placeholders
- Template selection when creating new issues
- Template variables that auto-fill based on context
- Template management UI
```

**Export/Import**
```
Add data export and import:
- Export issues to CSV and JSON formats
- Import from CSV/JSON with validation
- Bulk data operations interface
- Export templates for different use cases
- Import preview before applying changes
```

**Custom Fields**
```
Add custom fields functionality:
- Allow users to add custom properties to issues
- Support multiple field types: text, number, date, select dropdown
- Field validation rules
- Custom field management UI
- Display custom fields in issue cards and detail views
```

**Integration Mockups**
```
Design integration UI mockups:
- GitHub integration settings page
- Slack notification configuration
- Calendar sync interface
- Integration status indicators
- OAuth flow mockups
```

### 3. Complex Features
Multi-view features with sophisticated workflows and interactions. These require comprehensive design specs and careful UX consideration.

**Advanced Filtering**
```
Implement an advanced filtering system for the issue tracker with:
- Saved filter views that users can name and reuse
- Complex filter logic supporting AND/OR conditions between multiple filters
- Date range filtering for created/updated dates
- A custom filter builder UI that allows users to visually construct filter combinations
- Integration with the existing filter system in the issues list view
```

**Advanced Search**
```
Enhance search functionality:
- Search syntax with operators (status:done, priority:high, assignee:john)
- Search history dropdown
- Saved searches that can be reused
- Search result highlighting
- Search suggestions and autocomplete
```

**Sprint Planning**
```
Create a sprint planning feature:
- Create and manage sprints with start/end dates
- Add issues to sprints via drag-and-drop
- Sprint burndown charts showing progress over time
- Velocity tracking based on completed story points
- Sprint retrospective view for post-sprint analysis
```

**Timeline/Roadmap View**
```
Build a timeline and roadmap view:
- Gantt chart visualization showing issue timelines
- Milestone tracking with visual markers
- Release planning interface
- Drag-and-drop to adjust issue dates
- Zoom controls for different time scales (day/week/month)
```

**Issue Dependencies**
```
Implement issue dependency tracking:
- Ability to link issues as "blocks" or "blocked by" relationships
- Dependency graph visualization showing issue relationships
- Critical path highlighting for dependent issues
- UI indicators on issue cards showing dependency status
- Dependency management in the issue detail view
```

**Time Tracking**
```
Add time tracking features:
- Estimated time field for issues
- Time spent tracking with start/stop timer
- Time reports and charts showing time allocation
- Time tracking history per issue
- Team time tracking dashboard
```

**Analytics Dashboard**
```
Create an analytics dashboard:
- Issue metrics: created, completed, average resolution time
- Team performance charts and trends
- Custom report builder with drag-and-drop
- Export reports to PDF/image
- Dashboard customization and saved views
```

**Priority Matrix View**
```
Create an Eisenhower matrix view:
- Four-quadrant grid (urgent/important, urgent/not important, etc.)
- Drag issues between quadrants to reprioritize
- Visual prioritization with color coding
- Filter issues by quadrant
- Export priority matrix as image
```

**Automation Rules**
```
Build automation rules system:
- Auto-assign issues based on labels or other criteria
- Auto-transition statuses based on conditions
- Rule builder UI with visual condition editor
- Rule testing and preview
- Rule execution history
```

**Advanced Comments**
```
Enhance the comment system:
- Nested comment threads with reply functionality
- Comment reactions (emoji reactions)
- @mentions with user autocomplete
- Comment editing and deletion with history tracking
- Rich text formatting in comments
```

**Notifications**
```
Implement a notification system:
- In-app notification center with a bell icon
- Toast notifications for issue updates, comments, and assignments
- Email digest mockups showing what notifications would look like
- Notification preferences/settings
- Mark as read/unread functionality
```

**Real-Time Collaboration**
```
Add collaboration features:
- Real-time cursors (mock) showing other users' positions
- Live presence indicators showing who's viewing/editing
- Collaborative editing with conflict resolution
- Shared cursors in comments
- Presence status (online/away/busy)
```

## Use Design Rails in Your Own Project

Want to use Design Rails in your own project? Check out the [installation instructions](https://designrails.com/#installation) for detailed setup steps.

### Quick Setup

Use the CLI tool to set it up easily:

```bash
npx designrails@latest setup
```

## Contributing

This is a playground project for testing Design Rails. Feel free to experiment with new features and design patterns.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Drag & Drop**: @dnd-kit
- **Rich Text**: Tiptap
- **State Management**: React Context API
- **Icons**: Lucide React

## License

MIT
