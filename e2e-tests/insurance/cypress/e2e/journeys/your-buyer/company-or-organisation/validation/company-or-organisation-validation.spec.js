import { errorSummaryListItems } from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Company or organisation page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

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
    cy.clickSubmitButton();

    cy.checkErrorSummaryListHeading();

    const TOTAL_REQUIRED_FIELDS = 2;
    cy.assertErrorSummaryListLength(TOTAL_REQUIRED_FIELDS);

    cy.checkText(errorSummaryListItems().eq(0), COMPANY_OR_ORG_ERROR_MESSAGES[NAME].IS_EMPTY);

    cy.checkText(errorSummaryListItems().eq(1), COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].IS_EMPTY);
  });
});
