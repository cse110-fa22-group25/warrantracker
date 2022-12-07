### Setup

1. Ensure you have Node.js installed on your machine.
2. Clone repository onto your machine with `git clone https://github.com/cse110-fa22-group25/warrantracker.git`
3. In the root directory of the repository, run `npm install` to install dependencies Jest, Eslint, and JSDocs.
4. If you take a look at our `package.json` file, there are three scripts defined.
   1. `npm run test` will run all unit tests in the project.
   2. `npm run doc` will generate documentation based on all `.js` files in the project. (Don't run this locally please)
   3. `npm run jslint` will lint all `.js` files within `src` and catch any egregious style violations.
   4. `npm run htmllint` will lint all `.html` files within `src`.
   5. `npm run csslint` will lint all `.css` files within `src`.
   6. `npm run start-server` will create a local server on port 5500 to view as dev version of the website on your working tree in Git. [http://localhost:5500](http://localhost:5500) Alternatively, you can use vscode's built-in live server, and navigate into the `src` folder to access the dev website, also port 5500 by default.
   7. Note: all scripts ignore the `./src/docs` folder.
5. Recommended extensions for Visual Studio Code
   1. Jest Orta.vscode-jest
   2. ESLint dbaeumer.vscode-eslint
   3. HTMLHint HTMLHint.vscode-htmlhint
   4. Stylelint stylelint.vscode-stylelint
   5. Live Server
