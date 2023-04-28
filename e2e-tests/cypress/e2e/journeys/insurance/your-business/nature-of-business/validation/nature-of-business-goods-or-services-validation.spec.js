import { natureOfBusiness } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { MAXIMUM } = FIELDS.NATURE_OF_YOUR_BUSINESS[GOODS_OR_SERVICES];

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - goods or services input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact();

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  const fieldId = GOODS_OR_SERVICES;
  const field = natureOfBusiness[fieldId];

  describe(`when ${GOODS_OR_SERVICES} is left empty`, () => {
    beforeEach(() => {
      field.input().clear();
      submitButton().click();
    });

    const errorMessage = NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].IS_EMPTY;

    it('should display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 4);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
    });

    it(`should focus to the ${GOODS_OR_SERVICES} section when clicking the error`, () => {
      partials.errorSummaryListItemLinks().first().click();
      field.input().should('have.focus');
    });

    it(`should display the validation error for ${GOODS_OR_SERVICES}`, () => {
      cy.checkText(field.error(), `Error: ${errorMessage}`);
    });
  });

  describe(`when ${GOODS_OR_SERVICES} has over ${MAXIMUM} characters`, () => {
    beforeEach(() => {
      cy.keyboardInput(field.input(), 'a'.repeat(MAXIMUM + 1));
      submitButton().click();
    });

    const errorMessage = NATURE_OF_BUSINESS_ERRORS[GOODS_OR_SERVICES].ABOVE_MAXIMUM;

    it(`should display validation errors if ${GOODS_OR_SERVICES} left empty`, () => {
      partials.errorSummaryListItems().should('have.length', 4);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
    });

    it(`should display the validation error for ${GOODS_OR_SERVICES}`, () => {
      cy.checkText(field.error(), `Error: ${errorMessage}`);
    });
  });

  describe(`when ${GOODS_OR_SERVICES} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), 'test');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 3);
    });
  });
});
