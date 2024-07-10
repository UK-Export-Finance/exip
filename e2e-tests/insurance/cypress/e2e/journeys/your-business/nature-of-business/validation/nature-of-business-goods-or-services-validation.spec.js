import partials from '../../../../../../../partials';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: FIELD_ID,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT },
} = INSURANCE_ROUTES;

const field = fieldSelector(FIELD_ID);
const textareaField = { ...field, input: field.textarea };

const assertions = {
  field: textareaField,
  expectedErrorsCount: 3,
};

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - goods or services input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

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

  describe(`when ${FIELD_ID} is left empty`, () => {
    it('should display validation errors', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].IS_EMPTY,
      });
    });

    it(`should focus to the ${FIELD_ID} section when clicking the error`, () => {
      cy.clickSubmitButton();

      partials.errorSummaryListItemLinks().first().click();
      field.textarea().should('have.focus');
    });
  });

  describe(`when ${FIELD_ID} has over the maximum`, () => {
    it('should display validation errors', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.BUSINESS.GOODS_OR_SERVICES_DESCRIPTION + 1),
        expectedErrorMessage: NATURE_OF_BUSINESS_ERRORS[FIELD_ID].ABOVE_MAXIMUM,
      });
    });
  });

  describe(`when ${FIELD_ID} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.textarea(), 'test');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      cy.assertErrorSummaryListLength(2);
    });
  });
});
