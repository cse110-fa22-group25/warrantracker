# warrantracker

[![Maintainability](https://api.codeclimate.com/v1/badges/a9822f1d8f989e320345/maintainability)](https://codeclimate.com/github/cse110-fa22-group25/warrantracker/maintainability)

## Development: Getting Started

warrantracker uses npm packages as part of the development process, so ensure you have
node installed before continuing.

### Repository Overview

If you take a look at our root directory, there is a `github/workflows` folder containing the `.yml`
file(s) for our continuous integration pipeline.

The `docs` folder contains the `.html` versions of our in-code documentation, generated with jsdocs.

The `src` folder contains the source code, its internal layout is subject to change.
Jest will run on all files with the `.test.js` suffix regardless of location in the repository, so a `__test__` folder is not completely necessary.

`eslintrc.json` is the configuration file for Eslint, which ensures that everything is properly styled.

`.htmlrc` is the configuration file for HTML Hint, the linter for all `.html` files within the `src` folder.

`.stylelintrc.json` is the configuration file for stylelint, the linter for all `.css` files within the `src` folder.

`jsdoc.json` configures the input/output for Jsdoc, which will take the in-code documentation and spit it into `/docs`.

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
5. Recommended extensions for Visual Studio Code
   1. Jest Orta.vscode-jest
   2. ESLint dbaeumer.vscode-eslint
   3. HTMLHint HTMLHint.vscode-htmlhint
   4. Stylelint stylelint.vscode-stylelint

## Tentative Development Process Procedure

1. Create GitHub issue on fixes/changes
2. Pull latest changes and checkout issue -> create branch for issue
3. Do changes and whatever, create unit tests locally and run unit tests with npm test or vscode jest extension, whatever floats your boat.
4. Document your changes (Including unit tests), ex. new method headers, inline comments explaining your code if you decide to use weird syntax and your code ends up looking like it's running on black magic and people unfamiliar with that syntax have no idea what is going on.
5. Create pull request to merge into branch
   1. GitHub actions will rerun your unit tests and generate documentation, please pull the generated documentation after GitHub actions is done running.
   2. Documentation will be the .html files in the ./docs folder in of the project root directory
   3. Ensure your files pass the linter.
6. Assign someone else to review pull request
7. Resolve merge conflicts -> merge
   1. GitHub actions will rerun unit tests on merged main branch (Hasn't been implemented but it takes 5 minutes to add but I'm too tired right now)
8. Prune PR branch a few days after merge just to be safe.
9. Push to production branch manually when we got something stable going?

Throw integration testing somewhere in the above when we do it.
