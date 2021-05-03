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

- Install Jest and Babel-jest: `npm install --save-dev jest babel-jest`
