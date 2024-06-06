import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT as ACCOUNT_ROUTES } from '../../../../../../../constants/routes/insurance/account';
import mockAccount from '../../../../../../../fixtures/account';

const {
  CREATE: { YOUR_DETAILS },
} = ACCOUNT_ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Account - Create - Your details page - Account already exists - verified - invalid password - As an Exporter, I want the system to verify that the email address that I register against my UKEF digital service account is unique, So that I can be sure that the system does not have multiple digital service accounts with the same email address',
  () => {
    let url;

    before(() => {
      cy.deleteAccount();

      url = `${baseUrl}${YOUR_DETAILS}`;

      cy.navigateToUrl(url);

      // create an account
      cy.completeAndSubmitCreateAccountForm();

      // verify email
      cy.verifyAccountEmail();
    });

    beforeEach(() => {
      cy.saveSession();
    });

    describe('when trying to create an account with an email that already has an account and the provided password is correct', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitCreateAccountForm();
      });

      it(`should render an ${EMAIL} validation error`, () => {
        cy.submitAndAssertFieldErrors({
          field: fieldSelector(EMAIL),
          value: mockAccount[EMAIL],
          expectedErrorsCount: 2,
          expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS,
        });
      });

      it(`should render an ${PASSWORD} validation error`, () => {
        cy.submitAndAssertFieldErrors({
          field: fieldSelector(PASSWORD),
          value: mockAccount[PASSWORD],
          errorIndex: 1,
          expectedErrorsCount: 2,
          expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS,
        });
      });
    });
  },
);
