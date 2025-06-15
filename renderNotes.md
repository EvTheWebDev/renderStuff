# Render Notes

## Day 01 (6/11):

### What I Did:

- Vibe Coding Workshop
- Lunch
- Networking
- met GOOGLE (no way)

---

### Vibe Coding Workshop

- Goose is an AI agent, utilizes LLM's like ChatGPT to _do_ stuff on your computer.
- In order to use an LLM, you need an API key.
  - Many LLM's charge by the use for their API key, so look into free LLMs to use.

---

## Day 02 (6/12):

### What I Did:

- Expo Hall
- UI Workshop
- Privacy by Design Talk
- Front-End Project Talk
- JavaScript Testing Talk
- Dev Tools As Toys Talk
- Back To The Future (HTML & CSS) Talk

---

### UI Workshop

- Taught by Kathryn Nanz
  - kathryngrayson on LinkedIn
- Disconected Responses
  - MODALS
    - Should only appear after user makes an input (clicking a button, hitting enter, etc.)
- Clarity
  - Users want Human Centered Design
    - No vague icons, descriptions etc.
- Safe Exploration
  - Users like to experiment, and like to undo options. Let them do that.
- Mental Model
  - The understanding a user builds and assumptions they have from their previous technology experience that shape how they engage with software.
  - Using unlabeled icons, especially uncommon ones, is NOT a good idea.
- External Resources
  - If you want to help users with the program, provide useful resources.
  - This is useful for new users, as well as users who run into errors.

### Privacy By Design Talk

- Design influences the mood
  - Don't force people to do things, allow them to opt in if necessary.
  - Empower users, give them all the info up front.
    - Show fees & other surprises as early as possible.
- Bad Design
  - Leads to user backlash, negative impressions, or even regulatory _fines_.
- Privacy By Design
  - 7 Principles, including user-centric, proactive, and embedded.
  - Create designs with these _already_ in mind.
  - Default to hiding user info, or allow an easy opt.
- Dark Patterns
  - Vague Language, make sure users give informed concent.
  - Fake Scarcity, Hidden Options, etc.
  - Can cost your company millions (or even billions) of dollars.
    - Vonage was given a $100 million dollar fine for being very hard to cancel
    - Facebook was given a 1.2 Billion Euro fine for hiding their options.
- Avoiding Dark Patterns
  - You don't need to change the design, just remove the sketchy elements.
  - Design for symmetry, easy to join and easy to leave.
  - Data Grail is a great resource for avoiding dark patterns.

### JavaScript Testing Talk

- Taught by Yoni Goldberg
- Vitest Browser
  - Visual Tests (for features of the site) are required.
  - Runs Vitest (debugging software), BUT will show it in the browser and let you follow along.
  - This runs tests VERY fast, and quickly debugs your systems for you.
- Storybook
  - Testing / test browser
  - One big advantage of Storybook is that they have a timeline and let you go one action at a time.
  - As of the newest version of Storybook, you can use it like Vitest browser.
- Playwright
  - The most in depth testing, but the slowest of the three.
  - Works great for CI, but not for often testing.
- Which one do I choose?
  - If you're finishing a product, look at Playwright
  - If not, it's a toss up between Storybook and Vitest
- MCP's
  - Connects a LLM (Language Learning Model) to Playwright
    - It allows you to ask ChatGPT, or any other LLM, to debug your site live.
    - It can read the console errors, network requests, and other stuff without your help.
    - A rapidly growing field, expect to see a _SHIT_ ton of these in the next couple years.

### Back To The Future (HTML & CSS) Talk

---

## Day 03 (6/13):

### What I Did:

- Enhancing IDE Talk
- UglifyJS Recreating Talk

---

### Enhancing IDE Talk

- Taught by Max Kless
- Recorded himself writing the code and running the project in advance, SUPER smart.
- VS Code
  - Has MANY forks, and forks of forks. I had _no_ idea.
    - A popular one is Windsurf (both an IDE _and_ IDE extension)
  - Extensions are written in Typescript
  - You can render webviews, which are like iframes
- JetBrains
  - You can change the actual UI of the IDE
  - Plugins are created in Kletlin
- VS Code Plugins
  - There is a vscode object, accessed by using `vscode.[value]`
- Language Server Protocol
  - Microsoft has one, made on top of JSON RBC
  - Build methods in LSP, IDE's can read it and interpret the code itself.

### UglifyJS Recreating Talk

- Taught by Erick Wendel
  - ErickWendelAcademy on YT
- UglifyJS
  - JavaScript parser, minimizer, and beautifier
  - Used by VS Code for compiling and shrinking JS
- Why Minify Our Code?
  - It makes it considerably lighter to store
    - Shrinking code can make it around 60% smaller.
- How to Minify Code
  - Get Variable Declarations
  - Replace Them With Letters
  - Generate JS code from the abstraction (the letters)
- Source Maps
    - In order for the minified code to know what everything is, it will create a source map to reference.
- When To Use Minification?
    - Migrating codebases
    - Swapping Frameworks
