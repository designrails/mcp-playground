# User Journeys

## Journey 1: Creating a New Issue

**Entry point**: User clicks the "New Issue" button in the navigation bar (available from any page)

**Key screens**:
1. Create Issue Dialog - modal overlay with form fields

**User actions**:
1. Click "New Issue" button in top navigation
2. Enter issue title (required field)
3. Optionally add rich text description using the editor toolbar
4. Select status from dropdown (defaults to Backlog)
5. Select priority level from dropdown (defaults to None)
6. Optionally assign to team member via user picker
7. Optionally add labels by selecting from existing or creating new ones
8. Click "Create Issue" button

**Success state**:
- Dialog closes
- User is redirected to the newly created issue detail page
- Issue appears in the issues list with unique identifier (e.g., ISS-123)

**Edge cases**:
- Empty title validation: "Title is required" error message
- Cancel button returns to previous view without creating issue
- Rich text editor supports markdown formatting and handles empty state

---

## Journey 2: Viewing and Filtering Issues List

**Entry point**:
- User navigates to `/issues` from home page (auto-redirects)
- User clicks "Issues" in sidebar navigation
- User lands on app after authentication

**Key screens**:
1. Issues List View - table layout with search and filter controls

**User actions**:
1. View paginated list of all issues in table format
2. Use search bar to filter by issue title or identifier
3. Click filter dropdowns to refine by:
   - Status (multi-select)
   - Priority (multi-select)
   - Assignee (multi-select)
   - Labels (multi-select)
4. Click "Clear filters" to reset all applied filters
5. Click column headers to sort by different attributes
6. Click on any issue row to navigate to detail view

**Success state**:
- Issues are displayed with key metadata visible: identifier, title, status badge, priority badge, assignee avatar, labels
- Filters update results in real-time
- Empty state shows when no issues match filters
- Clear indication of active filters

**Edge cases**:
- No issues exist: Shows "No issues found" empty state with "Create Issue" CTA
- No results after filtering: Shows "No issues match your filters" with option to clear
- Search with no matches displays empty results
- Loading state with skeleton loaders while data loads

---

## Journey 3: Managing Issues on Kanban Board

**Entry point**: User clicks "Board" in sidebar navigation

**Key screens**:
1. Kanban Board View - columns organized by status with draggable issue cards

**User actions**:
1. View issues organized into status columns (Backlog, To Do, In Progress, In Review, Done, Canceled)
2. Drag an issue card from one column to another to update status
3. Click on any issue card to open detail view
4. Use search and filters (same as list view) to refine visible issues
5. Scroll horizontally to see all status columns
6. View issue count in each column header

**Success state**:
- Smooth drag-and-drop animation as card moves between columns
- Issue status updates immediately on drop
- Card appears in new column at dropped position
- Visual feedback during drag (card elevation, drop zone highlighting)

**Edge cases**:
- Empty column shows "No issues" placeholder
- Drag cancelled on escape key or drop outside valid zone
- Cannot drag to same column (no-op)
- Filtered view maintains drag functionality for visible issues
- Loading state displays skeleton cards

---

## Journey 4: Viewing and Editing Issue Details

**Entry point**:
- User clicks issue row from list view
- User clicks issue card from board view
- User is redirected after creating new issue

**Key screens**:
1. Issue Detail Page - full-page view with inline editing

**User actions**:
1. View complete issue information including:
   - Full identifier and title
   - Rich text description
   - Status, priority, assignee, labels
   - Comments section
   - Creation and update timestamps
2. Click title to edit inline (auto-save on blur)
3. Click description to edit with rich text editor (save button)
4. Click status badge to open status dropdown and change
5. Click priority badge to open priority dropdown and change
6. Click assignee to open user picker and reassign
7. Click labels to add/remove via label selector
8. Scroll to comments section at bottom

**Success state**:
- All edits save successfully with visual confirmation
- Changes reflect immediately in UI
- Updated timestamp refreshes
- Breadcrumb navigation shows path back to issues list

**Edge cases**:
- Empty description shows placeholder "Add a description..."
- No assignee shows "Unassigned" with option to assign
- No labels shows empty state in labels section
- Cancel editing reverts to original value
- Validation errors prevent invalid saves (e.g., empty title)
- Back button returns to previous view (list or board)

---

## Journey 5: Collaborating via Comments

**Entry point**: User scrolls to comments section on issue detail page

**Key screens**:
1. Comments Section - bottom of issue detail page

**User actions**:
1. Read existing comments in chronological order (oldest first)
2. View comment metadata: author avatar, name, timestamp
3. Type new comment in rich text input field
4. Format comment using editor toolbar (bold, italic, lists, etc.)
5. Click "Add Comment" button to submit
6. View newly added comment appear at bottom of thread

**Success state**:
- Comment posts successfully and appears immediately
- Author's avatar and name display correctly
- Timestamp shows "just now" or relative time
- Comment text renders with formatting preserved
- Input field clears after successful post

**Edge cases**:
- Empty comment validation: "Comment cannot be empty" error
- Long comments expand with proper text wrapping
- Comments section shows "No comments yet" empty state if none exist
- Cancel button (if added) clears input without posting
- Multiple users' comments display with distinct avatars

---

## Journey 6: Switching User Context

**Entry point**: User clicks User Switcher component in app header

**Key screens**:
1. User Switcher Dropdown - appears on header click

**User actions**:
1. Click current user avatar/name in header
2. View dropdown list of available users
3. Click different user to switch context
4. Observe interface update to reflect new user perspective

**Success state**:
- User context switches immediately
- Header updates to show new user's avatar and name
- Issues assigned to new user are highlighted appropriately
- Create/edit actions now attributed to new user
- Dropdown closes after selection

**Edge cases**:
- Current user is visually indicated (checkmark or highlight)
- Clicking same user closes dropdown without change
- Click outside dropdown closes it without switching
- Demo mode disclaimer may appear indicating frictionless auth

---

## Journey 7: Searching and Quick Navigation

**Entry point**: User focuses on search input in header or issues list

**Key screens**:
1. Search Input - in navigation bar or list view controls

**User actions**:
1. Click or keyboard focus into search field
2. Type issue identifier (e.g., "ISS-123") or title keywords
3. View real-time filtered results in list/board
4. Clear search to return to full list view

**Success state**:
- Results filter as user types (debounced)
- Matching issues highlight search terms
- Search works across identifier and title fields
- Clear button (X) appears when text present
- Search persists when navigating between list/board views

**Edge cases**:
- No matches shows "No issues found" empty state
- Partial identifier matches (e.g., "ISS-1" matches ISS-10, ISS-11, etc.)
- Case-insensitive search
- Special characters handled gracefully
- Search combined with filters for advanced queries
- Empty search shows all issues
