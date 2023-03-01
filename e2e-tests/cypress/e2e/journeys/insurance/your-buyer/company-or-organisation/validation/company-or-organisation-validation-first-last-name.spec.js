import { submitButton } from '../../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../../pages/insurance/your-buyer';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    FIRST_NAME: FIRST_NAME_FIELD_ID,
    LAST_NAME: LAST_NAME_FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE_FIRST_NAME = COMPANY_OR_ORG_ERROR_MESSAGES[FIRST_NAME_FIELD_ID];
const ERROR_MESSAGE_LAST_NAME = COMPANY_OR_ORG_ERROR_MESSAGES[LAST_NAME_FIELD_ID];

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - form validation - first and last name', () => {
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

  describe(`${FIRST_NAME_FIELD_ID}`, () => {
    const ERROR_ASSERTIONS = {
      field: companyOrOrganisationPage[FIRST_NAME_FIELD_ID],
      numberOfExpectedErrors: 8,
      errorIndex: 3,
    };

    describe(`${FIRST_NAME_FIELD_ID} error`, () => {
      describe(`when ${FIRST_NAME_FIELD_ID} is not entered`, () => {
        const errorMessage = ERROR_MESSAGE_FIRST_NAME.IS_EMPTY;

        it('should display validation errors', () => {
          const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

          cy.submitAndAssertFieldErrors(field, null, errorIndex, numberOfExpectedErrors, errorMessage);
        });
      });
    });

    describe(`when ${FIRST_NAME_FIELD_ID} is correctly entered`, () => {
      it('should not display validation errors', () => {
        cy.keyboardInput(companyOrOrganisationPage[FIRST_NAME_FIELD_ID].input(), application.BUYER[FIRST_NAME_FIELD_ID]);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 7);
      });
    });
  });

  describe(`${LAST_NAME_FIELD_ID}`, () => {
    const ERROR_ASSERTIONS = {
      field: companyOrOrganisationPage[LAST_NAME_FIELD_ID],
      numberOfExpectedErrors: 7,
      errorIndex: 3,
    };

    describe(`${LAST_NAME_FIELD_ID} error`, () => {
      describe(`when ${LAST_NAME_FIELD_ID} is not entered`, () => {
        const errorMessage = ERROR_MESSAGE_LAST_NAME.IS_EMPTY;

        it('should display validation errors', () => {
          const { numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

          cy.submitAndAssertFieldErrors(companyOrOrganisationPage[LAST_NAME_FIELD_ID], null, errorIndex, numberOfExpectedErrors, errorMessage);
        });
      });
    });

    describe(`when ${LAST_NAME_FIELD_ID} is correctly entered`, () => {
      it('should not display validation errors', () => {
        cy.keyboardInput(companyOrOrganisationPage[LAST_NAME_FIELD_ID].input(), application.BUYER[LAST_NAME_FIELD_ID]);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 6);
      });
    });
  });
});
