<h1 align="center">Photoroom web assignment</h1>

This assignment has been designed to be completed in **under 3 hours**. You are allowed, even encouraged, to use an AI assistant.

**Carefully read all the instructions first**. We ask a lot on purpose and you may not have time to complete the test:

- The goal is not to complete the tasks but to ship something stable in production with the best value for the user.
- Define the priorities: do the tasks/subtasks in the order you want.
- Take trade-offs. If something is too complex, break it down and find a way to ship it.

We'll discuss your code and decisions during a review call.

⚠️ If you think something is wrong with the test (doesn't run as expected, missing instructions, ...), please contact us.

## 🚀 Objectives

The goal of this front-end test is to assess your skills on:

- autonomy and priorities.
- adapting to an existing codebase;
- writing new features with MobX & React;
- writing React components;
- writing e2e tests with Playwright;

## 🎓 Instructions

The app is a basic image gallery: when the user uploads images, they are sent to the Photoroom API to remove their background. You are asked to add the following features:

- [Nested folders](./specs/nested-folders.md)
- [Persistence](./specs/persistence.md)
- [Range selection](./specs/range-selection.md)

We let you choose in which order to prioritize the tasks.

## 📦 Installing the project

Instructions written for NPM, but you are free to use any package manager you want.

```sh
# use the right node.js version
nvm use

# install monorepo dependencies
npm install && npm install -ws

# install Playwright dependencies
(cd packages/app && npx playwright install)

# run the app
npm run dev -w=app

# run Storybook
npm run dev -w=@repo/ui

# run e2e tests
npm run e2e -w=app
npm run e2e:ui -w=app
```

## 📪 Once you're done

Reply to the assignment email with a **zip file** containing your project, including your `.git` folder. **Our technical tests are reviewed anonymously**, please avoid adding your name in the repository code or documentation.
