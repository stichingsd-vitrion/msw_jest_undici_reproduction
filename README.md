# My Jest Project

This is a simple Node.js project using TypeScript, Jest, and other dependencies like `axios` and `msw` for testing purposes.

## Prerequisites

Before you get started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or v22 recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Yarn](https://yarnpkg.com/) (for package management)

## Project Setup

1. **Clone the repository**

   If you haven't done so, clone the project repository.

   ```bash
   git clone <repository-url>
   cd my-jest-project
   ```

2. **Install dependencies**

   Run the following command to install all required dependencies:

   ```bash
   yarn install
   ```

## Running Tests

1. **Run the tests**

   To execute all the tests in the project, run the following command:

   ```bash
   yarn test
   ```

   Jest will run the tests and show the results in the terminal.

2. **Test coverage**

   To check the code coverage for your tests, you can run the following command:

   ```bash
   yarn test --coverage
   ```

   This will output coverage statistics for your code, including which files are covered and by how much.

## Known Issues

We tested this project with Node.js v20 and v22. When running `yarn test`, on the first or second test run, the following output will be displayed:

```
 ✓ msw (124 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.266 s, estimated 2 s
Ran all test suites.
```

However, on subsequent test runs, you may encounter the following error related to `undici` (the HTTP client that Node.js uses internally):

```
node:internal/deps/undici/undici:9037
        throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
        ^

RangeError: init["status"] must be in the range of 200 to 599, inclusive.
    at initializeResponse (node:internal/deps/undici/undici:9037:15)
    at new Response (node:internal/deps/undici/undici:8829:9)
    ...
```

This error is due to the MSW (Mock Service Worker) not handling a mocked response correctly or passing an invalid HTTP status code. 

### Workaround:

- Make sure to review any mocks you create in your tests to ensure the response status is valid (between `200` and `599`).
- Ensure that MSW is correctly set up and intercepting the network requests during tests.
  
We are investigating this issue, but as of now, re-running the tests after the error may still pass without further issues.

## Project Structure

The project has the following structure:

```
my-jest-project/
│
├── __tests__/           # Directory for Jest test files
│   └── <test-files>.ts  # Test files to test your code
├── src/                 # Directory for TypeScript source code
│   └── <source-files>.ts
├── jest.setup.ts        # Jest setup file for configuration and mocking
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project metadata and scripts
└── .gitignore           # Files and folders to be ignored by Git
```

## Notes

- **Jest Configuration**: Jest is configured in the `package.json` under the `"jest"` section, with `ts-jest` as the preset for TypeScript compatibility.
- **Mock Service Worker (MSW)**: This project uses MSW (`msw` package) for API mocking in tests. Make sure to configure it in the `jest.setup.ts` file if necessary.
- **Axios**: The `axios` library is included as a dependency, allowing you to test API calls in your project.

## Additional Information

- For more about [Jest](https://jestjs.io/), check the official documentation.
- For more about [TypeScript](https://www.typescriptlang.org/), check the official documentation.
- For more about [Mock Service Worker](https://mswjs.io/), check the official documentation.
```

### Key Updates:
- **Node.js versions**: Mentioned that the project has been tested with Node.js v20 and v22.
- **Known Issues**: Added the known issue about the `RangeError` caused by `undici` when running the tests multiple times, along with a workaround and a brief explanation.
- **Instructions**: Added details on how to install dependencies using Yarn and how to run the tests.