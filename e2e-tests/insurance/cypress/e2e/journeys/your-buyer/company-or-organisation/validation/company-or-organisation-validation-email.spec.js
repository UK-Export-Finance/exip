import { submitButton } from '../../../../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../../../../pages/insurance/your-buyer';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, INVALID_EMAILS } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    EMAIL: FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE = COMPANY_OR_ORG_ERROR_MESSAGES[FIELD_ID];

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - form validation - email', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const ERROR_ASSERTIONS = {
    field: companyOrOrganisationPage[FIELD_ID],
    numberOfExpectedErrors: 7,
    errorIndex: 5,
  };

  const errorMessage = ERROR_MESSAGE.IS_EMPTY;

  it(`should display validation errors when ${FIELD_ID} is not entered`, () => {
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, null, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    const invalidEmail = INVALID_EMAILS.NO_AT_SYMBOL;
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    const invalidEmail = INVALID_EMAILS.NO_DOTS;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it('should display validation errors when email contains a space', () => {
    const invalidEmail = INVALID_EMAILS.WITH_SPACE;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    const invalidEmail = INVALID_EMAILS.NO_DOMAIN;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, invalidEmail, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should not display validation errors when ${FIELD_ID} is correctly entered`, () => {
    cy.keyboardInput(companyOrOrganisationPage[FIELD_ID].input(), application.BUYER[FIELD_ID]);

    submitButton().click();

    partials.errorSummaryListItems().should('have.length', 6);
  });
});
