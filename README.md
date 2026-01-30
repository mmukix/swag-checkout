# swag-checkout

This is a sample Playwright project demonstrating automated end-to-end testing of a web application. The project includes a basic test script, page objects, and utilities.

This project favors Playwright-specific locators, including accessibility-driven selectors, to align with best practices and remain stable as the UI evolves. 

## Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/mmukix/swag-checkout.git
cd playwright-ts-tests
```
2. **Install Dependencies**

```bash
npm install
```
3. **Install Playwright browsers**

```bash
npx playwright install
```
## Running Tests

1. **Run the E2E test script**

```bash
npx playwright test tests/purchase.spec.ts
```

2. **Generate HTML report after successful run (failures will trigger a report)**

```bash
npx playwright show-report
```
## Project Structure

```bash
playwright-ts-tests/
├── pages/               # Page objects
├── tests/               # Test files
├── utils/               # Helper functions
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies
└── README.md            # This file
```
## TODOs
* Store shipping information in a utility rather than directly in the script
* Create working regex and utility to calculate cost breakdown at checkout
* Expand UserData to include all users and add parameterization
* Add additional tests to cover different scenarios, depending on needs (smoke, regression)
* Implement tagging for better organization
* Implement CI/CD integration with Github Actions (.yaml included)
