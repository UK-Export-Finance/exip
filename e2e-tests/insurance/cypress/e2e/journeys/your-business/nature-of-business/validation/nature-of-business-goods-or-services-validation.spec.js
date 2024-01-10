import partials from '../../../../../../../partials';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/business';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { MAXIMUM } = FIELDS.NATURE_OF_YOUR_BUSINESS[GOODS_OR_SERVICES];

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - goods or services input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`;

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

  const fieldId = GOODS_OR_SERVICES;
  const field = fieldSelector(fieldId);
  const textareaField = { ...field, input: field.textarea };

  const expectedErrorsCount = 3;

  describe(`when ${GOODS_OR_SERVICES} is left empty`, () => {
    it('should display validation errors', () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].IS_EMPTY;

      cy.submitAndAssertFieldErrors(
        textareaField,
        null,
        0,
        expectedErrorsCount,
        errorMessage,
        true,
      );
    });

    it(`should focus to the ${GOODS_OR_SERVICES} section when clicking the error`, () => {
      cy.clickSubmitButton();

      partials.errorSummaryListItemLinks().first().click();
      field.textarea().should('have.focus');
    });
  });

  describe(`when ${GOODS_OR_SERVICES} has over ${MAXIMUM} characters`, () => {
    beforeEach(() => {
      cy.keyboardInput(field.textarea(), 'a'.repeat(MAXIMUM + 1));
      cy.clickSubmitButton();
    });

    const errorMessage = NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].ABOVE_MAXIMUM;

    it(`should display validation errors if ${GOODS_OR_SERVICES} left empty`, () => {
      const submittedValue = 'a'.repeat(MAXIMUM + 1);

      cy.submitAndAssertFieldErrors(
        textareaField,
        submittedValue,
        0,
        expectedErrorsCount,
        errorMessage,
        true,
      );
    });
  });

  describe(`when ${GOODS_OR_SERVICES} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.textarea(), 'test');
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 2);
    });
  });
});
