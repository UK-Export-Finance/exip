# Export Insurance Policies

This repository contains the code for the UK Export Finance EXIP service - a public facing application that allows exporters to:

- Get a quote for export insurance cover with UKEF.
- Create and login to an EXIP account.
- Create an application for export insurance cover and submit it to UKEF.

This repo is based on [template-typescript-package](https://github.com/UK-Export-Finance/template-typescript-package).

:warning: Currently, the only live part of this repository it the "Get a quote" tool which is in the main branch. The full application/MVP is built in the main-application branch.

##  Prerequisite

- Node version 16 or highr with a corresponding `npm`.
- Make sure you have an `.env` Use `.env.sample` as a base. Some sensitive variables need to be shared from the team.
- Run `npm install` in the root directory
- Run `npm install --legacy-peer-deps` in the `src/ui`

## Tech stack

- Node, NPM
- Typescript
- [Keystone (GraphQL API, database)](keystonejs.com)
- [Cypress (E2E tests)](https://www.cypress.io)
- [GovUK design systems](design-system.service.gov.uk)
- [Nunjucks (UI templates)](https://mozilla.github.io/nunjucks/templating.html)
- [Webpack](https://webpack.js.org)
- [Jest](https://jestjs.io/)
- [ESlint](https://eslint.org), [Prettier](https://prettier.io)
- [Husky](https://typicode.github.io/husky), [commitlint](https://commitlint.js.org), [lint-staged](https://github.com/okonet/lint-staged)
- [release-please-action](https://github.com/google-github-actions/release-please-action)
- [Github actions](https://github.com/features/actions)

## Running locally

1. Execute `docker-compose up` (requires `--build` for first time usage) from the root directory
2. Visit [http://localhost:5000](http://localhost:5000) in your browser

Alternatively, run via npm in each microservice.

In one terminal:

1. `cd src/ui`
2. `npm start`
3. Or for hot reloading: `npm run dev`

In another terminal:

1. `cd src/api`
2. `npm start`
3. Or for hot reloading: `npm run dev`

Note that we use [express-basic-auth](https://www.npmjs.com/package/express-basic-auth) in every environment except for production. This is because we do not want anyone to see work in progress before it is live. For example, some real-world users may obtain the password in a dev/test environment for user testing. We do not want this to then be shared.

To run the full application flow without docker, you'll need to spin up a MySQL database and update the `DATABASE_URL`, `MYSQL_DATABASE` and `MYSQL_ROOT_PASSWORD` environment variables. Once the database exists, [import the MySQL dump](https://github.com/UK-Export-Finance/exip/blob/main-application/database/exip.sql) to get everything working. Otherwise, the database will not have any tables or countries and therefore CRUD operations will fail.

## Testing

### Run the unit tests

```shell
cd src/ui
npm run test
```

### Run the E2E tests

Navigate to to the E2E tests directory `/e2e-tests` and execute any of the following commands to start Cypress.

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

### Run the API tests

Navigate to to the API directory `/src/api` and excute any of the following commands:

#### **Run the entire API test suite**

```shell
npm run test
```

#### **Run a single API test**

```shell
npm run test path/to/file.test.ts
```

### Run the UI tests

Navigate to to the UI directory `/src/ui` and excute any of the following commands:

#### **Run the entire UI test suite**

```shell
npm run test
```

#### **Run a single UI test**

```shell
npm run test path/to/file.test.ts
```

## Linting

Linting can be run from the root of the repo, or specifically in the ui/api/e2e-tests directories.

### Run eslint & prettier

```shell
npm run lint
```

### Automatically fix lint/prettier issues

```shell
npm run lint:fix
```

## What is Keystone?

Keystone is a very powerful headless CMS. After a very simple installation/configuration, Keystone allows you to define a [schema](https://github.com/UK-Export-Finance/exip/blob/main-application/src/api/schema.ts). The schema then automatically generates a graphQL schema, a graphQL resolver, and updates the database with the fields that have been defined in the schema. For example, if the schema has this `Currencies` definition:

```js
export const lists = {
  Currencies: {
    fields: {
      name: text(),
      isoCode: text(),
    },
  },
};
```

Keystone will automatically generate the following graphQL resolvers in the background:

### Mutations

- `createCountry`
- `createCountries`
- `updateCountry`
- `updateCountries`
- `deleteCountry`
- `deleteCountries`

### Queries

- `countries`
- `country`
- `countriesCount`

Keystone will also automatically create a countries table in the database with any fields listed in the keystone schema as columns in the said table.

### Keystone hooks

Keystone also has some functionality called hooks. Hooks allow you to perform "before and after" or side effects. For example, `resolveInput` allows you to modify or add some data before it is saved in the database, `afterOperation` allows you to trigger something after data is saved. 

You can learn more about hooks in the [official documentation](https://keystonejs.com/docs/guides/hooks)

We do not use hooks very extensively, we currently only use hooks when an application is created.

### Customising the schema / automatically generated GraphQL API

Whilst the automatically generated graphQL API and database is fantastic, there are use cases where we want to create our own graphQL resolver that has no interest in the database. For example, 3rd party API calls to companies house.

This can be easily achieved by creating a [custom schema](https://github.com/UK-Export-Finance/exip/blob/main-application/src/api/custom-schema.ts). We then import this in the [keystone config](https://github.com/UK-Export-Finance/exip/blob/main-application/src/api/keystone.ts#L19) and it magically merges our custom schema with the automatically generated schema.

## Why we use Keystone

We decided to use Keystone because it provides us with so much functionality out of the box. We do not want to setup and build another CRUD API from scratch. Whilst building an API manually gives us more control, there is overhead for building specific features and maintaining the API.

With Keystone, we get all of this (including things like pagination), by writing few lines of code in the Keystone schema.

Keystone also provides us with an admin UI for the database. Whilst we don't really use this, there are some potential opportunities for this to be used by non-technical people.

### Requirements for submitting a form

In the majority of pages, we have two submit buttons with different requirements.

#### "Save and continue"

- These primary buttons trigger a check for validation errors and if there are errors, reload the same page with validation errors.
- If there are no validation errors, we trigger a redirect to the next page of the user flow.

#### "Save and go back"

- These secondary buttons check for validation errors and if there are errors, we strip out the invalid fields and save only valid fields.
- Regardless of validation errors, a user is taken to the "main home page" of an application.

## How and when the UI calls the API

### When an application page is loaded

We have some middleware that fetches the application from the API. This middleware calls the API via [this file](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/middleware/insurance/get-application/index.ts#L63). We use apollo to run the GraphQL query.

The API automatically handles the request (thanks to Keystone) and returns the application.

The middleware assigns the application to `res.locals` so that it can be consumed by the proceeding controller.

### When a user submits a form in the application flow

The following happens:

1. The UI's POST contoller checks for validation errors.

2. If all is OK, call a ["map and save" function](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/controllers/insurance/policy-and-export/type-of-policy/index.ts#L83).

3. The map and save function maps the submitted form data into a better data structure (e.g day/month/year fields transform into a timestamp) and sends this data to the [save function](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/controllers/insurance/policy-and-export/map-and-save/index.ts).

4. The save data function then filters out any invalid fields (if an error list is provided), sanitises all other fields and finally calls the API. The actual call is made [here](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/api/keystone/application/index.ts#L91). We use apollo to run a GraphQL mutation.

5. The API automatically handles the request (thanks to Keystone) and updates the database columns provided in the GraphQL mutation, for the specified application.

## Core principles

As a development team, in order to build and maintain a product/service, we need to make sure that the codebase is clean, consistent and scalable. The EXIP codebase aims to define a new, standardised approach with patterns and techniques that can be applied to other digital UKEF services.

As part of UKEF, we do not want to be siloed - we want other developers to be aware of and feedback on certain approaches and structures we propose and put in place.

- Be DRY and consistent
- Make sure that the code is easy to read and maintain
- Build it well from the start - don't cut any corners or introduce "workarounds"
- It's ok to create a ticket to improve a part of the codebase, but we want to avoid this as much as possible
- Aim for 100% test coverage
- Always add documentation
- At least one technical improvement ticket in each sprint

## Bug fixing

As an agile team, we want to move tickets across the sprint board as much as possible. Inevitably, as we have new features tested by QA, bugs will be found. Instead of blocking the sprint ticket and then going back and forth, we create a separate bug ticket. Depending on the sprint status and developer/QA preference, the bug is usually prioritised and fixed in the next sprint, or we bring it into the current sprint.

When a new sprint starts - once an "in progress" ticket is ready for PR review, instead of picking up a new feature ticket, we prioritise bug fixes before picking up a new feature ticket. This is to ensure that everything works as expected and we don't end up with a large list of bugs in the backlog.

Recommened: When fixing a bug, write an E2E test first and then fix it. We need a test to make sure the bug doesn't happen again.

## Keeping page and fields separated

Each page and field has content specific to that page or field. We keep these in their own files, separated from the code itself for several reasons:

- To avoid having content is hard coded in the templates
- To avoid referencing a field ID or value by hard coding it in logic or tests
- Enforces a single source of truth
- Provides us with an easy way to change or rename content - change it one single place
- Provides us with an opportunity in the future to extract the content into Keystone and allow designers to edit the content themselves

We have the same approach for content that is used throughout, for example buttons, links, components that are used in multiple places etc.

The files can be found  here:

- [global content strings](https://github.com/UK-Export-Finance/exip/tree/main-application/src/ui/server/content-strings) (buttons, links etc)
- [page content strings](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/content-strings/pages/index.ts)
- [field content strings](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/content-strings/fields/index.ts)

Note: field IDs are in [constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/constants) because an ID is not a content string.

## DRY UI controllers and rendering

Every page/controller requires the same content and links in order to meet design. For example, every page has a header, footer, service name and a back link. To save repetition, we've introduced **page variables functions** that should be used in every single controller.

### Quote tool controllers

Use [quoteCorePageVariables](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/helpers/page-variables/core/quote/index.ts). Example usage:

```js
const get = (req: Request, res: Response) =>
  res.render('template.njk', {
    ...quoteCorePageVariables({ PAGE_CONTENT_STRINGS: PAGES.EXAMPLE, BACK_LINK: req.headers.referer }),
    EXIT_REASON,
  });
```

### Insurance controllers

Use [insuranceCorePageVariables](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/helpers/page-variables/core/insurance/index.ts). Example usage:

```js
const get = (req: Request, res: Response) =>
  res.render('template.njk', {
    ...insuranceCorePageVariables({ PAGE_CONTENT_STRINGS: PAGES.EXAMPLE, BACK_LINK: req.headers.referer }),
    EXIT_REASON,
  });
```

### Single input pages

In the eligibility flows, there are lot of "yes or no" question pages with single radio button selection. The main difference between each of these pages is the field itself - e.g the title, id and hint. Therefore we also have a special page variables function, [singleInputPageVariables](https://github.com/UK-Export-Finance/exip/tree/main-application/src/ui/server/helpers/page-variables/single-input) that is exactly the same as the others, except that it can consume a field ID and automatically adds any hints or labels defined for the field ID. Example usage:

```js
const get = (req: Request, res: Response) =>
  res.render(
    TEMPLATES.PROBLEM_WITH_SERVICE,
    ...singleInputPageVariables({
      {
        FIELD_ID: 'fieldA'
        PAGE_CONTENT_STRINGS: PAGES.EXAMPLE,
      },
      BACK_LINK: req.headers.referer,
    }),
  );
```

### Generic pages

For controllers/pages that are not part of the Quote tool or Insurance, e.g "problem with this service", use [corePageVariables](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/helpers/page-variables/core/index.ts). Example usage:

```js
const get = (req: Request, res: Response) =>
  res.render(
    TEMPLATES.PROBLEM_WITH_SERVICE,
    corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.EXAMPLE,
      BACK_LINK: req.headers.referer,
      PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      START_ROUTE: '/',
    }),
  );
```

Note: `corePageVariables` is actually consumed by all other page variable functions.

## Consistent UI controllers

As the codebase grows, we need to ensure that different areas of the code are following the same patterns/approach. Controllers are a great example - we follow this pattern where we define page variables, and the templates separately. Combined with page variables functions, this approach keeps things DRY and allows for easier testing.

```js
const { POLICY_LENGTH, POLICY_TYPE } = FIELD_IDS;

export const PAGE_VARIABLES = {
  FIELDS: {
    POLICY_TYPE: {
      ID: POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    POLICY_LENGTH: {
      ID: POLICY_LENGTH,
      ...FIELDS[POLICY_LENGTH],
    },
  },
};

export const TEMPLATE = TEMPLATES.EXAMPLE;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.EXAMPLE, BACK_LINK: req.headers.referer }),
    ...PAGE_VARIABLES,
    application: req.application,
  });
```

A complete example with validation handling and a POST can be found [here](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/controllers/insurance/policy-and-export/type-of-policy/index.ts).

Note: Pages with a single form field (for example eligibility pages) are a little simpler and use `FIELD_ID` instead of `FIELDS`. An example can be found [here](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/controllers/insurance/eligibility/exporter-location/index.ts).

## Git workflow

:warning: Currently, the only live part of this repository it the "Get a quote" tool which is in the main branch. The full application/MVP is built in the main-application branch.

1. Create a branch and PR clearly describing the change, along with Jira ticket number
2. PR will run tests for the affected services
3. PR tests will pass, another engineer reviews & approves the PR
4. PR is merged into main or main-application branch

Github actions will then run a build and push of container images to Azure, which will be picked up and deployed automatically by the Dev environment.

E2E tests for GHA have been setup to run in parallel. When these run you will see duplicates of each job with a number denoting the instance.

## Product definitions for eligibility

The EXIP product has a series of rules/questions that determine if an exporter can apply for cover.

These questions are asked in the eligibility sections of the user flow. The product has 2 eligibility sections:

- In the "Get a quote" flow: `/quote/*`
- In the beginning of the application flow, before an application can be created: `/insurance/eligibility/*`

Key points and differences:

- An Exporter must pass eligibility before they can obtain a quote or begin to create an application to apply for cover.
- The application eligibility is a lot more comprehensive than the quote eligibility. Both eligibility flows share a few questions.
- The majority of the eligibility questions are "yes or no" answers.

### "Maximum" definitions

The application eligibility has two questions asking if the exporter's desired cover period and cover amount is over X.

If an exporter would like a cover period or cover amount that exceeds the maximum, they cannot apply online and must either apply offline or speak to UKEF.

These maximum definitions could change in the future. Therefore, they are stored and rendered in the UI dynamically. These can be found in the [product constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/constants/product.ts).

If these definitions need to change, only the product constants need to be updated.

Note that the cover period URL references the maximum cover period. The route is created dynamically by referencing the cover period definition.

Also note that the field IDs that we use for the answers to these questions are generic and do not refer to the actual maximum. I.e, `wantCoverOverMaxPeriod` instead of `wantCoverOver2Years`.
