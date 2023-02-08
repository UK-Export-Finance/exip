import { submitButton } from '../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../pages/insurance/your-buyer';
import partials from '../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    ADDRESS,
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

context('Insurance - Your Buyer - Company or organisation page - form validation - address', () => {
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
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const field = companyOrOrganisationPage[ADDRESS];

  describe('when address is above the maximum', () => {
    const submittedValue = 'a'.repeat(301);

    before(() => {
      field.input().type(submittedValue, { delay: 0 });
      submitButton().click();
    });

    it('should render a validation error', () => {
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].ABOVE_MAXIMUM,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].ABOVE_MAXIMUM}`,
      );
    });

    it('should retain the submitted value', () => {
      field.input().should('have.value', submittedValue);
    });
  });
});
