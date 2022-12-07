### Setup/Building the project

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
6. Building the project:
   1. Option 1: Parcel, after running `npm install`, use the above `npm start-server` script to create a local development server using Parcel.
   2. Option 2: Vscode Live Server, use vscode's live server extension to create a local development server, and navigate inside the `src` folder once a tab opens in your browser.
   3. Both options will host the website on [http://localhost:5500](http://localhost:5500) by default.

## Development Process Procedure

1. Create GitHub issue on fixes/changes
2. Pull latest changes and checkout issue -> create branch for issue
3. Do changes and whatever, create unit tests locally and run unit tests with npm test or vscode jest extension, whatever floats your boat.
4. Document your changes (Including unit tests), ex. new method headers, inline comments explaining your code if you decide to use weird syntax and your code ends up looking like it's running on black magic and people unfamiliar with that syntax have no idea what is going on.
5. Create pull request to merge into branch
   1. GitHub actions will rerun your unit/integration/e2e tests and generate documentation, please pull the generated documentation after GitHub actions is done running.
   2. Codeclimate will check if you uploaded any egregious spaghetti-like code.
   3. Documentation will be the `.html` files in the `./src/docs` folder in of the project root directory
   4. Ensure your files pass the linter.
   5. Ensure your branch is up to date with main, and resolve any potential merge conflicts. Reviewers who approve PR's without making sure they're up to date with main and work are equally responsible for bad code that gets pushed.
6. Assign 2+ other people review pull request.
7. After 2+ approvals, create a merge commit into main, do not squash commits.
8. GH Actions will deploy the update page to Github pages.
9. Prune PR branch
