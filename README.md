# Export Insurance Policies

Also known as EXIP, this is a public facing application that allows exporters to obtain a quote for export insurance cover with UKEF.

This repo is based on [template-typescript-package](https://github.com/UK-Export-Finance/template-typescript-package).

##  Prerequisite

- Node version 16 or highr with a corresponding `npm`.
- Make sure you have an `.env` Use `.env.sample` as a base. Some sensitive variables need to be shared from the team.
- Run `npm install` in the root directory
- Run `npm install` in the `src/ui`

## Tech stack

- Node, NPM
- Typescript
- Cypress (E2E tests)
- GovUK design systems
- Nunjucks (UI templates)
- Webpack
- Jest
- ESlint, Prettier
- Husky, commitlint, lint-staged
- release-please-action
- Github actions

## Running locally

1. Execute `docker-compose up` (requires `--build` for first time usage) from the root directory
2. Visit [http://localhost:5000](http://localhost:5000) in your browser

Alternatively, run via npm in the UI:

1. `cd src/ui`
2. `npm start`

## Testing

### Run the unit tests

```shell
cd src/ui
npm run test
```

### Run the E2E tests

Navigate to to the e2e tests directory `/e2e-tests` and execute any of the following commands to start Cypress.

#### **Run the entire E2E test suite**

```shell
npx cypress run --config video=false
```

#### **Run a single E2E test**

```shell
npx cypress run --spec "cypress/e2e/journeys/example.spec.js" --config video=false
```

#### **For live debugging, open the GUI and select the test**

```shell
npx cypress open .
```

### Linting

#### Run eslint & prettier

```shell
npm run lint
```

#### Automatically fix lint/prettier issues

```shell
npm run lint:fix
```

### Deployment

Currently, there is only a single staging environment.

A docker image needs to be built, tagged and pushed to docker hub. Then the azure app can be restarted to pick up the latest.

Contact the team for more information.

### Product definitions for eligibility

The EXIP product has a series of rules/questions that determine if an exporter can apply for cover.

These questions are asked in the eligibility sections of the user flow. The product has 2 eligibility sections:

- In the "Get a quote" flow: `/quote/*`
- In the beginning of the application flow, before an application can be created: `/insurance/eligibility/*`

Key points and differences:

- An Exporter must pass eligibility before they can obtain a quote or begin to create an application to apply for cover. 
- The application eligibility is a lot more comprehensive than the quote eligibility. Both eligibility flows share a few questions.
- The majority of the eligibility questions are "yes or no" answers.

#### "Maximum" definitions

The application eligibility has two questions asking if the exporter's desired cover period and cover amount is over X.

If an exporter would like a cover period or cover amount that exceeds the maximum, they cannot apply online and must either apply offline or speak to UKEF.

These maximum definitions could change in the future. Therefore, they are stored and rendered in the UI dynamically. These can be found in the [product constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/constants/product.ts).

If these definitions need to change, only the product constants need to be updated.

Note that the cover period URL references the maximum cover period. The route is created dynamically by referencing the cover period definition.

Also note that the field IDs that we use for the answers to these questions are generic and do not refer to the actual maximum. I.e, `wantCoverOverMaxPeriod` instead of `wantCoverOver2Years`.

