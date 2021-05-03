# React Testing with Jest and Enzyme

## Introduction to Jest, Enzyme and Test-Driven Development (TDD)

### TDD

- Write tests before writing code
- "Red-green" testing: Tests fail before code is written

1. Write "shell" function
2. Write tests
3. Tests fail
4. Write code
5. Test pass!

#### Why TDD?

- More efficient: tests are re-ran "for free" after changes. If the tests are built after writing the actual code, there is no advantage of running the tests as the the code progresses.
- Better code: We have to plan to write the code (better organized); The code is more testable (no rewriting code for tests); The code will has fewer bugs (caught sooner, regression); We have great code coverage (testing is a part of coding)

### Setting up Jest without create-react-app

- Jest Documentation: https://jestjs.io/docs/getting-started
- Install Jest and Babel-jest: `npm install --save-dev jest babel-jest`
- Create jest.config.js (or add directly to package.js):

```js
module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
```

- Create **mocks** directory, then create a `fileMock.js` with content of `module.export = "test-file-stub";`
- For demo: install identity-obj-proxy: `npm install --save-dev identity-obj-proxy`;
- Then, change `"\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"`, to `"\\.(css|less)$": "identity-obj-proxy",` in the `jest.config.js` file
- Add test script to package.json: `"test": "jest --watch"`
- Create a test file said App.test.js:

```js
import React from "react";
import App from "./App";

test("renders without error", () => {});
```

### Setting up Jest with create-react-app

- Simply initiallize the the app with create-react-app and ready to go: `npx create-react-app app-name`
- Run the test with watch mode: npm test
