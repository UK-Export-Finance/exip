import { submitButton } from '../../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../../pages/insurance/your-buyer';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    CAN_CONTACT_BUYER: FIELD_ID,
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

context('Insurance - Your Buyer - Company or organisation page - form validation - can contact buyer', () => {
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      task.link().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  const ERROR_ASSERTIONS = {
    field: companyOrOrganisationPage[FIELD_ID],
    numberOfExpectedErrors: 8,
    errorIndex: 7,
  };

  describe(`${FIELD_ID} error`, () => {
    describe(`when ${FIELD_ID} radio buttons are not selected`, () => {
      const errorMessage = ERROR_MESSAGE.IS_EMPTY;

      it('should display validation errors', () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

        cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });
  });

  describe(`when ${FIELD_ID} radios are selected`, () => {
    const field = companyOrOrganisationPage[FIELD_ID];

    describe('yes radio', () => {
      it('should not display validation errors', () => {
        field.yesRadioInput().click();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 7);
      });
    });

    describe('no radio', () => {
      it('should not display validation errors', () => {
        field.noRadioInput().click();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 7);
      });
    });
  });
});
