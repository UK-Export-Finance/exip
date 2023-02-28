import { submitButton } from '../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../pages/insurance/your-buyer';
import partials from '../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, WEBSITE_EXAMPLES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    WEBSITE: FIELD_ID,
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

context('Insurance - Your Buyer - Company or organisation page - form validation - website', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  // for error assertion - common fields
  const ERROR_ASSERTIONS = {
    field: companyOrOrganisationPage[FIELD_ID],
    numberOfExpectedErrors: 6,
    errorIndex: 3,
  };

  describe(`${FIELD_ID} error`, () => {
    describe(`when ${FIELD_ID} is the incorrect format`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      it(`should display validation errors if ${FIELD_ID} left empty`, () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = WEBSITE_EXAMPLES.INVALID;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(`when ${FIELD_ID} is above 191 characters`, () => {
      const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

      it(`should display validation errors if ${FIELD_ID} left empty`, () => {
        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });
  });

  describe(`when ${FIELD_ID} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.keyboardInput(companyOrOrganisationPage[FIELD_ID].input(), WEBSITE_EXAMPLES.VALID);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 5);
    });
  });
});
