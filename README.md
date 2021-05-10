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

### Testing Tradeoffs

#### Test Behavior, not Implementation

- Ideally, do not want to re-write tests after a refactor
- Keep in mind when writing tests
- Test behavior (what the app should do) instead of implementation (how it works)
- Then, if implementation changes, tests remain the same: Testing implementation is brittle (easily broken when app still works)
- Example for feature to test: The app keeps counter of button click count -> onClick function for button calls incrementCounter function -> counter display increments by one
- Example for testing behavior: set initial state -> simulate button click -> check displayed count to see that it was incremented by one from the initial state
- Example for testing implementation: set initial state -> simulate button click -> check to see if particular function was called (whether the code is going through the right stages to cause that behavior)
- Why brittle? Testing implementation (function name can change) not behavior (display update)

#### Testing goal

1. Easy of maintenance for tests
2. Easy diagnosis of failing tests

#### Why not snapshot testing?

- Jest includes "snapshot testing" as a way to "free" a component or other output in time -> when we re-run the test, if test fails if there are any changes
- No TDD
- Brittle (any change to component will break the test)
- Difficult to diagnose: too easy to ignore failure and update the snapshot
- No test intention: if there is a failure, we dont know if the code still meet spec?
-

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

### Data-test attributes

- Data-test attribute to test rendering: top level element of component
- Not just any component rendered! but it's actually the component that we wanted.
- Why new attribute? Why not id or class? id and class have uses in production app; might get changed in the future, data-test is only for testing; conventional, but we could choose any name;
- Don't want in production? Many people don't want these data test attributes to be in their production apps, they want their production apps to be smaller and more streamlined.
- How to remove in production?

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

## Examples

### Clicking Counter

- Create a react app using create-react-app
- install enzyme: `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`
- data-test attributes: In a div, place a `data-test=""`
- Shallow anzyme selectors: `wrapper.find(selector)` => shallowWrapper (selector is CSS selector like: `input`, `button`, tag name, `.className`, `#id`, `[href="foo"]`, `[type="text"]` ...)
  Component

```js
function App() {
  return <div className="App" data-test="component-app"></div>;
}
```

Test

```js
test("renders without error", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});
```
