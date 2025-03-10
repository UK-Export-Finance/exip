import { field as fieldSelector } from '../../../../../../pages/shared';
import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ELIGIBILITY: { CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, CREDIT_PERIOD },
} = FIELD_IDS;

context('Tell us about the multiple policy you need - form validation', () => {
  const url = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when submitting an empty form', () => {
    before(() => {
      cy.navigateToRootUrl();

      cy.completeAndSubmitBuyerCountryForm({});
      cy.completeAndSubmitBuyerBodyForm();
      cy.completeAndSubmitExporterLocationForm();
      cy.completeAndSubmitUkContentForm();
      cy.completeAndSubmitPolicyTypeMultiForm();
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();
    });

    it('should render validation errors for all required fields', () => {
      cy.checkErrorSummaryListHeading();

      const TOTAL_REQUIRED_FIELDS = 4;
      cy.assertErrorSummaryListLength(TOTAL_REQUIRED_FIELDS);

      // currency
      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY);

      cy.checkText(fieldSelector(CURRENCY).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY}`);

      // max amount owed
      cy.checkText(errorSummaryListItems().eq(1), ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].IS_EMPTY);

      cy.checkText(fieldSelector(MAX_AMOUNT_OWED).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].IS_EMPTY}`);

      // percentage of cover
      cy.checkText(errorSummaryListItems().eq(2), ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY);

      cy.checkText(fieldSelector(PERCENTAGE_OF_COVER).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY}`);

      // credit period
      cy.checkText(errorSummaryListItems().eq(3), ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY);

      cy.checkText(fieldSelector(CREDIT_PERIOD).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY}`);
    });

    it('should focus on inputs when clicking summary error message', () => {
      // currency
      errorSummaryListItemLinks().eq(0).click();
      fieldSelector(CURRENCY).input().should('have.focus');

      // max amount owed
      errorSummaryListItemLinks().eq(1).click();
      fieldSelector(MAX_AMOUNT_OWED).input().should('have.focus');

      // perecentage of cover
      errorSummaryListItemLinks().eq(2).click();
      fieldSelector(PERCENTAGE_OF_COVER).input().should('have.focus');

      // credit period
      errorSummaryListItemLinks().eq(3).click();
      fieldSelector(CREDIT_PERIOD).input().should('have.focus');
    });
  });

  describe('when `max amount owed` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), 'a');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(1), ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER);

      cy.checkText(fieldSelector(MAX_AMOUNT_OWED).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER}`);
    });
  });

  describe('when `max amount owed` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), '1234.56');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(1), ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER);

      cy.checkText(fieldSelector(MAX_AMOUNT_OWED).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER}`);
    });
  });

  describe('when `max amount owed` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), '0');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(1), ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].BELOW_MINIMUM);

      cy.checkText(fieldSelector(MAX_AMOUNT_OWED).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].BELOW_MINIMUM}`);
    });
  });

  describe('when `credit period` is not selected', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(3), ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY);

      cy.checkText(fieldSelector(CREDIT_PERIOD).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY}`);
    });
  });

  describe('with `currency` and `max amount owed` fields have been submitted and `percentage of cover` is not provided', () => {
    it('should render the submitted values for the `currency` and `max amount owed` fields', () => {
      cy.navigateToUrl(url);

      fieldSelector(CURRENCY).input().select('GBP');
      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), '10');

      cy.clickSubmitButton();

      fieldSelector(CURRENCY).inputOptionSelected().contains('GBP');

      cy.checkValue(fieldSelector(MAX_AMOUNT_OWED), '10');
    });
  });

  describe('with the `percentage of cover` field has been submitted and other fields are not provided', () => {
    it('should render the submitted values for the `percentage of cover` field', () => {
      cy.navigateToUrl(url);

      fieldSelector(MAX_AMOUNT_OWED).input().clear();

      const field = fieldSelector(PERCENTAGE_OF_COVER);

      field.input().select('85');

      cy.clickSubmitButton();

      field.inputOptionSelected().contains('85');
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      cy.navigateToUrl(url);

      const currencyField = fieldSelector(CURRENCY);
      const maxAmountOwedField = fieldSelector(MAX_AMOUNT_OWED);

      currencyField.input().select(GBP_CURRENCY_CODE);
      cy.keyboardInput(maxAmountOwedField.input(), '10');

      cy.clickSubmitButton();

      currencyField.inputOptionSelected().contains(GBP_CURRENCY_CODE);

      cy.checkValue(maxAmountOwedField, '10');
    });
  });
});
