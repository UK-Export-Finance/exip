import { tellUsAboutYourPolicyPage } from '../../pages';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import checkText from '../../helpers/check-text';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about the policy you need page - policy type & length validation', () => {
  before(() => {
    cy.visit(ROUTES.TELL_US_ABOUT_YOUR_POLICY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  context('with single policy type selected', () => {
    describe('when `single policy length` is not provided', () => {
      beforeEach(() => {
        tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].single.input().click();
      });

      it('should render a validation error', () => {
        tellUsAboutYourPolicyPage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(2),
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `single policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('a');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` contains a decimal', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('1.2');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('0');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `single policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('10');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });

  context('with multi policy type selected', () => {
    describe('when `multi policy length` is not provided', () => {
      beforeEach(() => {
        tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].multi.input().click();
      });

      it('should render a validation error', () => {
        tellUsAboutYourPolicyPage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(2),
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `multi policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('a');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `multi policy length` contains a decimal', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('1.2');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
          );
        });
      });

      describe('when `multi policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('0');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `multi policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('10');
          tellUsAboutYourPolicyPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(2),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });
});
