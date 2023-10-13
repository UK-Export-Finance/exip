# Export Insurance Policies (EXIP) :briefcase:
Welcome to the Export Insurance Policies repository! This repository houses the code for the UK Export Finance (UKEF) EXIP service, a public-facing application that offers various features to exporters:

- Obtain a quote for Export Insurance Policies (EXIP) from UKEF.
- Create and log in to an EXIP account.
- Create an application for Export Insurance Policies (EXIP) and submit it to UKEF.

The repository is based on the [template-typescript-package](https://github.com/UK-Export-Finance/template-typescript-package).

:warning: Currently, only the "Get a quote" tool, available in the `main` branch, is live. The full application/MVP is developed in the `main-application` branch.

## Prerequisites :gear:

Before getting started with this repository, ensure that you meet the following prerequisites:

- Node.js version 16 or higher, along with the corresponding `npm` package manager.
- An `.env` file with the required environment variables. Some sensitive variables may need to be provided by the team.
- Run `npm install` in the root directory.
- Additionally, in the `src/ui` directory, run `npm install --legacy-peer-deps`.

:warning: Due to certain issues, the `--legacy-peer-deps` flag is required for the installation in the `src/ui` directory.

## Tech Stack :computer:

This project utilizes various technologies and tools, including:

- Node.js and NPM
- TypeScript
- [Keystone (GraphQL API, database)](keystonejs.com)
- [Cypress (E2E tests)](https://www.cypress.io)
- [GovUK design systems](design-system.service.gov.uk)
- [Nunjucks (UI templates)](https://mozilla.github.io/nunjucks/templating.html)
- [Webpack](https://webpack.js.org)
- [Jest](https://jestjs.io/)
- [ESlint](https://eslint.org), [Prettier](https://prettier.io)
- [Husky](https://typicode.github.io/husky), [commitlint](https://commitlint.js.org), [lint-staged](https://github.com/okonet/lint-staged)
- [release-please-action](https://github.com/google-github-actions/release-please-action)
- [GitHub Actions](https://github.com/features/actions)

## Running Locally :computer:

To run the project locally, follow these steps:

1. Execute `docker-compose up` from the root directory. Use `--build` for the first-time usage.
2. Visit [https://localhost:5000](https://localhost:5000) in your web browser.
3. If presented with the certificate not trusted error, then please accept and proceed with certificate is self-signed for domain `localhost`.

Alternatively, you can run each microservice via npm:

- In one terminal, navigate to `src/ui`:
  1. `cd src/ui`
  2. `npm start`
  3. For hot reloading: `npm run dev`

- In another terminal, navigate to `src/api`:
  1. `cd src/api`
  2. `npm start`
  3. For hot reloading: `npm run dev`

To run the full application flow without Docker, set up a MySQL database, update the `DATABASE_URL`, `MYSQL_DATABASE`, and `MYSQL_ROOT_PASSWORD` environment variables, and import the [MySQL dump](https://github.com/UK-Export-Finance/exip/blob/main-application/database/exip.sql) to populate the database.

## Testing :microscope:

### Run the Unit Tests

To run unit tests for the UI, navigate to the `src/ui` directory and execute:

```shell
npm run test
```

To run unit tests for the API, navigate to the `src/api` directory and execute:

```shell
npm run test
```

### Run the E2E Tests

E2E tests are located in the `/e2e-tests` directory. To run the entire E2E test suite, execute:

```shell
npx cypress run
```

To run a specific E2E test, use the following command, replacing the path with the test file you want to run:

```shell
npx cypress run --spec "cypress/e2e/journeys/example.spec.js"
```

For live debugging, open the Cypress GUI and select the test:

```shell
npx cypress open .
```

### Linting :wrench:

Linting can be run from the root of the repository or in specific directories such as `ui`, `api`, or `e2e-tests`.

To run ESLint and Prettier:

```shell
npm run lint
```

To automatically fix lint and Prettier issues:

```shell
npm run lint:fix
```

## What is Keystone? :key:

Keystone is a powerful headless CMS that simplifies data management and GraphQL API development. With Keystone, you can define a schema that automatically generates a GraphQL schema, resolvers, and database tables based on your schema configuration. For instance, if you define a `Currencies` schema:

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

Keystone will generate GraphQL resolvers for common CRUD operations like `createCurrency`, `updateCurrency`, and `deleteCurrency`, as well as corresponding database tables and queries.

Keystone also supports hooks, allowing you to perform actions before or after data operations. For example, the `resolveInput` hook can modify data before saving it to the database, and the `afterOperation` hook can trigger actions after data is saved.

Learn more about Keystone hooks in the [official documentation](https://keystonejs.com/docs/guides/hooks).

## Why We Use Keystone :rocket:

The choice to use Keystone was driven by its ability to provide extensive functionality out of the box. Instead of building a CRUD API from scratch, Keystone allows us to define schemas and effortlessly generate GraphQL APIs, complete with features like pagination.

Keystone also offers an admin UI for managing data, which, although not extensively used, can be valuable for non-technical users.

### Requirements for Submitting a Form :clipboard:

In most pages, there are two submit buttons, each with different requirements:

#### "Save and Continue"

- These primary buttons check for validation errors. If errors are found, the page is reloaded with validation errors.
- If no validation errors exist, the user is redirected to the next page in the user flow.

#### "Save and Go Back"

- These secondary buttons check for validation errors. If errors are found, invalid fields are removed and only valid fields are saved.
- Regardless of validation errors, users are redirected to the main home page of an application.

## How and When the UI Calls the API :calling:

### When an Application Page Is Loaded :page_facing_up:

Middleware fetches the application from the API when a page is loaded. This middleware uses Apollo to make a GraphQL query to the API. The API automatically handles the request and returns the application data, which is then assigned to `res.locals` for use by the subsequent controller.

### When a User Submits a Form in the Application Flow :computer:

When a user submits a form, the following process occurs:

1. The UI's POST controller checks for validation errors.

2. If no errors are found, a "map and save" function is called. This function maps the submitted form data to a suitable data structure and sends it to the save function.

3. The save data function filters out invalid fields (if error messages are provided), sanitizes other fields, and calls the API. The actual API call is made using Apollo to run a GraphQL mutation.

4. The API automatically handles the request, updating the specified application's database columns based on the GraphQL mutation.

## Core Principles :star:

As a development team, certain core principles guide our work:

- Keep code DRY (Don't Repeat Yourself) and consistent.
- Ensure that the codebase is easy to read and maintain.
- Build the codebase well from the start; avoid cutting corners or introducing workarounds.
- Strive for 100% test coverage.
- Add documentation for clarity.
- Aim to have at least one technical improvement ticket in each sprint.

## Bug Fixing :bug:

In an agile team, the goal is to move tickets across the sprint board efficiently. As new features are tested by QA, bugs may surface. Instead of blocking the sprint ticket, we create separate bug tickets. These bugs are typically prioritized and fixed in the next sprint, or they are brought into the current sprint if the team's preference aligns.

When fixing a bug, it's recommended to write an E2E test first to ensure the bug doesn't reoccur.

## Keeping Page and Fields Separated :bookmark_tabs:

Each page and field has content specific to its purpose. To avoid hardcoding content in templates, referencing field IDs or values through hardcoding, and to maintain a single source of truth, we keep content in separate files. This approach simplifies content updates and allows for easier content management.

Content files include:

- [Global content strings](https://github.com/UK-Export-Finance/exip/tree/main-application/src/ui/server/content-strings) for buttons, links, etc.
- [Page content strings](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/content-strings/pages/index.ts).
- [Field content strings](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/content-strings/fields/index.ts).

Field IDs are stored in [constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/constants) rather than content strings because an ID is not a content string.

## DRY UI Controllers and Rendering :repeat:

To maintain consistency and avoid repetition, a common pattern is followed for controllers. Page variables and templates are defined separately. Additionally, page variable functions are used to achieve DRY (Don't Repeat Yourself) code and facilitate testing.

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

Here's a simplified example of how it works:

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

A more complete example with validation handling and a POST request can be found [here](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/controllers/insurance/policy/type-of-policy/index.ts).

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

## Git Workflow :octocat:

The project follows a Git workflow for collaborative development:

1. Create a branch and a pull request (PR) that clearly describes the change and includes the associated Jira ticket number.
2. The PR runs tests for the affected services.
3. Once the PR tests pass, another engineer reviews and approves the PR.
4. Finally, the PR is merged into either the `main` or `main-application` branch.

GitHub Actions automates the build and deployment process, pushing container images to Azure, where they are automatically deployed to the Development environment.

E2E tests for GitHub Actions run in parallel, and instances are numbered for reference.

## Eligibility :chart_with_upwards_trend:

The EXIP product defines eligibility rules and questions that determine whether an exporter is eligible to apply for coverage. Eligibility questions are part of the user flow and exist in two areas:

1. In the "Get a quote" flow: `/quote/*`
2. At the beginning of the application flow, before an application can be created: `/insurance/eligibility/*`

Key points and differences:

- Exporters must pass eligibility before obtaining a quote or starting an application.
- Application/insurance eligibility is more comprehensive than quote eligibility, covering a wider range of questions.
- Most eligibility questions have binary "yes or no" answers.

### "Maximum" Definitions :triangular_ruler:

The application/insurance eligibility includes questions about whether

 the exporter's desired cover period and cover amount exceed certain limits ("maximums"). If an exporter's request exceeds these maximums, they cannot proceed with the online application and must apply offline or contact UKEF directly.

These maximum definitions are dynamic and can change. They are stored and rendered dynamically in the UI. You can find these definitions in the [eligibility constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/ui/server/constants/eligibility.ts).

The maximum cover period URL references the maximum cover period, and the route is created dynamically by referencing the cover period definition.

Field IDs for these questions are generic and do not directly reference the actual maximum value. For example, we use `wantCoverOverMaxPeriod` instead of `wantCoverOver2Years`.

## Application Versioning :bookmark:

As the EXIP product evolves, the support it offers to exporters may change. Application versions are used to track what support the product provided at the time of creation or submission. This helps when viewing historical applications or when determining the available support for a specific application.

Application versions are defined in [version constants](https://github.com/UK-Export-Finance/exip/blob/main-application/src/api/constants/application/versions/index.ts) and [latest version definitions](https://github.com/UK-Export-Finance/exip/blob/main-application/src/api/constants/application/versions/latest.ts). New applications automatically use the latest version number.

For example, different versions could include:

- Version 1: MVP with support for applications under £100.
- Version 2: Added support for applications over £100.
- Version 3: Integration with payment processing.

When entering a new phase where the application will change, a new application version number should be added.

This approach simplifies the handling of different versions of the application and avoids complex logic in the codebase or other internal systems.

These are the key aspects of the UK Export Finance EXIP service codebase and development process. If you have specific questions or need more details about any particular aspect, feel free to ask!

---
