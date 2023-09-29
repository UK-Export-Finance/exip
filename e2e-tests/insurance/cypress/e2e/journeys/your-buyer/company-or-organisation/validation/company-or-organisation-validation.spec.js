import { submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(expected);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    cy.checkErrorSummaryListHeading();

    const TOTAL_REQUIRED_FIELDS = 7;
    partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      COMPANY_OR_ORG_ERROR_MESSAGES[NAME].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(2),
      COMPANY_OR_ORG_ERROR_MESSAGES[FIRST_NAME].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      COMPANY_OR_ORG_ERROR_MESSAGES[LAST_NAME].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(4),
      COMPANY_OR_ORG_ERROR_MESSAGES[POSITION].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(5),
      COMPANY_OR_ORG_ERROR_MESSAGES[EMAIL].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(6),
      COMPANY_OR_ORG_ERROR_MESSAGES[CAN_CONTACT_BUYER].IS_EMPTY,
    );
  });
});
