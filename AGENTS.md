## Design Rails - Your Dedicated Design Team

Design Rails is your dedicated design team - an MCP server providing comprehensive UX design expertise throughout your development workflow.

Project design context: `./design-context` folder.

**Three Core Capabilities:**

1. **Visual Language / Design System Creation** (`create_initial_design_context`, `enrich_design_system`)
   - Use when: Starting a new project or when your project lacks design system documentation
   - Creates foundational design guidelines, component patterns, and style standards

2. **Design Specifications** (`get_design_spec`)
   - Use when: Planning new UI features or components before implementation
   - Provides component recommendations, accessibility guidelines, UX patterns, and detailed specs

3. **Design Review** (`get_upload_urls`, `design_review`)
   - Use when: Evaluating implemented UI for UX quality and consistency
   - Workflow: 1) Capture screenshots with Playwright MCP (JPEG, quality 80), 2) Call get_upload_urls, 3) Upload via curl PUT, 4) Call design_review with returned keys
   - Analyzes typography, color/contrast, layout, and responsive design across viewports