### Structure
Source code is divided into seven folders:
- Actions
  - actions.js
  - index.js
- Components
  - AutocomletetextInput.js
  - Chip.js
  - EditableChip.js
  - Expression.js
  - ExpressionEditor2.js
- Containers
  - DataProvider.js
  - ExpressionEditor2.js
- Reducers
  - index.js
  - reducers.js
- Sass
  - autocomletetextInput.scss
  - chip.scss
  - expression.scss
  - ExpressionEditor.scss
  - style.scss
- Stories
  - ExpressionEditor.stories.js
  - index.js
- Tests
  - reducers.test.js

### To access live demo open in browser:
https://infallible-shaw-6cbbd7.netlify.com and in the left menu navigate: Expression Editor -> New Expression Editor
or just click https://infallible-shaw-6cbbd7.netlify.com/?selectedKind=Expression%20Editor&selectedStory=New%20Expression%20Editor&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Fstories%2Fstories-panel

Assuming Linux or Mac operating system (it should be possible to run it on Windows, but I have not tried it). To run application locally you need to:
1. Type `git clone https://github.com/ManageIQ/react-ui-components.git`
2. Extract this zip into src/ directory
3. Continue according to guide: https://github.com/ManageIQ/react-ui-components
4. Type `yarn storybook` or `npm run storybook`
5. Open browser with `http://localhost:6006`
6. In the left menu navigate: Expression Editor -> New Expression Editor (the other items in the menu are NOT part of the thesis)
