import { policyTypePage } from '../../../pages/quote';
import partials from '../../../partials';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import checkText from '../../../helpers/check-text';
import { completeAndSubmitBuyerCountryForm, completeAndSubmitBuyerBodyForm, completeAndSubmitCompanyForm, completeAndSubmitUkContentForm } from '../../../../support/quote/forms';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Policy type page - policy type & length validation', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitCompanyForm();
    completeAndSubmitUkContentForm();

    cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  context('with single policy type selected', () => {
    describe('when `single policy length` is not provided', () => {
      beforeEach(() => {
        policyTypePage[FIELD_IDS.POLICY_TYPE].single.input().click();
      });

      it('should render a validation error', () => {
        policyTypePage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(0),
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `single policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('a');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` contains a decimal', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('1.2');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          );

          checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('0');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `single policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('23');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });

  context('with multi policy type selected', () => {
    describe('when `multi policy length` is not provided', () => {
      beforeEach(() => {
        policyTypePage[FIELD_IDS.POLICY_TYPE].multi.input().click();
      });

      it('should render a validation error', () => {
        policyTypePage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(0),
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `multi policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('a');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `multi policy length` contains a decimal', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('1.2');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          );

          checkText(
            policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
          );
        });
      });

      describe('when `multi policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('0');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `multi policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('13');
          policyTypePage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });
});
