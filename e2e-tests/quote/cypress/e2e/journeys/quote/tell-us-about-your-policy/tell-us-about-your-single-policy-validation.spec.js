import { field as fieldSelector } from '../../../../../../pages/shared';
import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  POLICY_LENGTH,
  ELIGIBILITY: { CURRENCY, CONTRACT_VALUE, PERCENTAGE_OF_COVER },
} = FIELD_IDS;

context('Tell us about the policy you need page - form validation', () => {
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
      cy.completeAndSubmitPolicyTypeSingleForm();
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSubmitButton();
    });

    it('should render validation errors for all required fields', () => {
      cy.checkErrorSummaryListHeading();

      const TOTAL_REQUIRED_FIELDS = 4;
      cy.assertErrorSummaryListLength(TOTAL_REQUIRED_FIELDS);

      // policy length
      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY);

      cy.checkText(fieldSelector(POLICY_LENGTH).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY}`);

      // currency
      cy.checkText(errorSummaryListItems().eq(1), ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY);

      cy.checkText(fieldSelector(CURRENCY).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY}`);

      // contract value
      cy.checkText(errorSummaryListItems().eq(2), ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY);

      cy.checkText(fieldSelector(CONTRACT_VALUE).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY}`);

      // percentage of cover
      cy.checkText(errorSummaryListItems().eq(3), ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY);

      cy.checkText(fieldSelector(PERCENTAGE_OF_COVER).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY}`);
    });

    it('should focus on inputs when clicking summary error message', () => {
      // policy length
      errorSummaryListItemLinks().eq(0).click();
      fieldSelector(POLICY_LENGTH).input().should('have.focus');

      // currency
      errorSummaryListItemLinks().eq(1).click();
      fieldSelector(CURRENCY).input().should('have.focus');

      // contract value
      errorSummaryListItemLinks().eq(2).click();
      fieldSelector(CONTRACT_VALUE).input().should('have.focus');

      // perecentage of cover
      errorSummaryListItemLinks().eq(3).click();
      fieldSelector(PERCENTAGE_OF_COVER).input().should('have.focus');
    });
  });

  describe('when `policy length` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), 'a');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER);

      cy.checkText(fieldSelector(POLICY_LENGTH).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER}`);
    });
  });

  describe('when `policy length` contains a decimal', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), '1.2');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER);

      cy.checkText(fieldSelector(POLICY_LENGTH).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`);
    });
  });

  describe('when `policy length` is less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), '0');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM);

      cy.checkText(fieldSelector(POLICY_LENGTH).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM}`);
    });
  });

  describe('when `policy length` is greater than the maximum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), '23');
      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(0), ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM);

      cy.checkText(fieldSelector(POLICY_LENGTH).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM}`);
    });
  });

  describe('when `contract value` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), 'a');

      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(2), ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER);

      cy.checkText(fieldSelector(CONTRACT_VALUE).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER}`);
    });
  });

  describe('when `contract value` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), '1234.56');

      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(2), ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER);

      cy.checkText(fieldSelector(CONTRACT_VALUE).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`);
    });
  });

  describe('when `contract value` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), '0');

      cy.clickSubmitButton();

      cy.checkText(errorSummaryListItems().eq(2), ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM);

      cy.checkText(fieldSelector(CONTRACT_VALUE).errorMessage(), `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM}`);
    });
  });

  describe('with the `percentage of cover` field has been submitted and other fields are not provided', () => {
    it('should render the submitted values for the `percentage of cover` field', () => {
      cy.navigateToUrl(url);

      fieldSelector(CONTRACT_VALUE).input().clear();

      const field = fieldSelector(PERCENTAGE_OF_COVER);

      field.input().select('90');
      cy.clickSubmitButton();

      field.inputOptionSelected().contains('90');
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      cy.navigateToUrl(url);

      const policyLengthField = fieldSelector(POLICY_LENGTH);
      const currencyField = fieldSelector(CURRENCY);
      const contractValueField = fieldSelector(CONTRACT_VALUE);

      cy.keyboardInput(policyLengthField.input(), 1);

      currencyField.input().select(GBP_CURRENCY_CODE);

      cy.keyboardInput(contractValueField.input(), '10');

      cy.clickSubmitButton();

      cy.checkValue(policyLengthField, '1');

      currencyField.inputOptionSelected().contains(GBP_CURRENCY_CODE);

      cy.checkValue(contractValueField, '10');
    });
  });
});
