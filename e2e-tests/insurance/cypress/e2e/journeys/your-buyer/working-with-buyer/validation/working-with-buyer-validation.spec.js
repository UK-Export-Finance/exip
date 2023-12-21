import { submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { workingWithBuyerPage } from '../../../../../../../pages/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  WORKING_WITH_BUYER: {
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

const ERROR_MESSAGE_TRADED_WITH_BUYER = WORKING_WITH_BUYER_ERROR_MESSAGES[TRADED_WITH_BUYER];

const { WORKING_WITH_BUYER } = ROUTES.INSURANCE.YOUR_BUYER;

context('Insurance - Your Buyer - Working with buyer page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection();

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;
    const field = workingWithBuyerPage[fieldId];

    describe(`when ${TRADED_WITH_BUYER} is not selected`, () => {
      it('should display validation errors', () => {
        cy.navigateToUrl(url);

        const expectedErrorsCount = 1;
        const errorIndex = 0;
        const errorMessage = ERROR_MESSAGE_TRADED_WITH_BUYER.IS_EMPTY;

        const radioField = {
          ...field,
          input: field.yesRadioInput,
        };

        cy.submitAndAssertRadioErrors(radioField, errorIndex, expectedErrorsCount, errorMessage);
      });
    });

    describe(`when ${TRADED_WITH_BUYER} radios are selected`, () => {
      describe('yes radio', () => {
        it('should not display validation errors', () => {
          cy.navigateToUrl(url);

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
