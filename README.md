# React Testing with Jest and Enzyme

## Types of Tests

### Unit tests

- Tests one piece of code (usually one function or one React component) -> very isolated and narrow

### Integration tests

- How multiple units work together

### Acceptance / End-to-end (E2E) Tests

- Uses actual brower and connections to server (tools like: Selenium to simulate the brower experience)

### Functional Tests

- Can be any of the above; The distiguishing factor for functional tests is that they focus on user flow (an actual fuction of the app). They are easier to diagnose because we know exactly which part of the code caused the test to fail
- Code-based tests == testing implementation

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

#### What does Enzyme Do?

- Create virtual DOM for testing
- Allow testimg without a browser

#### Enzyme vs React Testing Library

- Both libraries create virtual DOM
- Mostly philosophical differences
- Enzyme supports isolated testing (support testing componets in insolation from its children such as shallow rendering)
- React Testing Library strongly prefers functional testing: Interacting as a user would (make the test less isolated)

#### Why to choose Enzyme?

- More traditional testing style: Test tightly coupled with code; Unit tests are very isolated; Tests are easy to dignose
- Functional user flow tests (with Testing Library): more resilient to refactors (if the code changes in the behavior doesn't, then we don'tneed to update the tests. However, it is difficult to diagnose)
- Note: code-based testing is possible with Testing Library: but not recommended ("opinionated")
- Enzyme for projects with legacy test code

#### Shallow Rendering

- Render components only one level deep
- Render parent, but use placeholders for children
  exp:

```js
<div id="word-input-form>
    <p>Enter word here</p>
    <InputComponent />
    <SubmitComponent />
</div>
```

--> Here InputComponent and SubmitComponent are children components but we dont actually see the internals of those.
While with Mount:

```js
<div id="word-input-form>
    <div>
        <span>Enter some text</span>
        <input type="text" />
    </div>
    <button type="submit">Submit</button>
</div>
```

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

### Enzyme

#### Enzyme Installation

- `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17` (where @wojtekmaj/enzyme-adapter-react-17 is an unofficial react adapter for enzyme)

- In the test file said App.test.js:

```js
import React from "react";
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

// configure Enzyme (move out later)
Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders learn react link", () => {});
```

- Shallow: takes JSX and return the so-called shallow wrapper:
  `const wrapper = shallow(<App />)` after `import Enzyme, { shallow } from "enzyme";`
