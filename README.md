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
