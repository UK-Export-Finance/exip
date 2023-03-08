import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { workingWithBuyerPage } from '../../../../../pages/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      WORKING_WITH_BUYER: WORKING_WITH_BUYER_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE_CONNECTED_WITH_BUYER = WORKING_WITH_BUYER_ERROR_MESSAGES[CONNECTED_WITH_BUYER];
const ERROR_MESSAGE_TRADED_WITH_BUYER = WORKING_WITH_BUYER_ERROR_MESSAGES[TRADED_WITH_BUYER];

const { WORKING_WITH_BUYER } = ROUTES.INSURANCE.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Working with buyer page - form validation', () => {
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(CONNECTED_WITH_BUYER, () => {
    const fieldId = CONNECTED_WITH_BUYER;
    const field = workingWithBuyerPage[fieldId];

    describe(`when ${CONNECTED_WITH_BUYER} is not selected`, () => {
      it('should display validation errors', () => {
        const numberOfExpectedErrors = 2;
        const errorIndex = 0;
        const errorMessage = ERROR_MESSAGE_CONNECTED_WITH_BUYER.IS_EMPTY;

        cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage, errorIndex);
      });
    });

    describe(`when ${CONNECTED_WITH_BUYER} radios are selected`, () => {
      describe('yes radio', () => {
        it('should not display validation errors', () => {
          field.yesRadioInput().click();
          submitButton().click();
          partials.errorSummaryListItems().should('have.length', 1);
        });
      });

      describe('no radio', () => {
        it('should not display validation errors', () => {
          field.noRadioInput().click();
          submitButton().click();
          partials.errorSummaryListItems().should('have.length', 1);
        });
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;
    const field = workingWithBuyerPage[fieldId];

    describe(`when ${TRADED_WITH_BUYER} is not selected`, () => {
      it('should display validation errors', () => {
        const numberOfExpectedErrors = 1;
        const errorIndex = 0;
        const errorMessage = ERROR_MESSAGE_TRADED_WITH_BUYER.IS_EMPTY;

        cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage, errorIndex);
      });
    });

    describe(`when ${TRADED_WITH_BUYER} radios are selected`, () => {
      describe('yes radio', () => {
        it('should not display validation errors', () => {
          field.yesRadioInput().click();
          submitButton().click();
          partials.errorSummaryListItems().should('have.length', 0);
        });
      });

      describe('no radio', () => {
        it('should not display validation errors', () => {
          cy.navigateToUrl(url);

          field.noRadioInput().click();
          submitButton().click();
          partials.errorSummaryListItems().should('have.length', 0);
        });
      });
    });
  });
});
