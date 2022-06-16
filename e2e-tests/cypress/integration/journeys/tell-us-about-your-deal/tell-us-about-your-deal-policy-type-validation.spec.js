import tellUsAboutYourDealPage from '../../pages/tellUsAboutYourDeal';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import checkText from '../../helpers/check-text';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about your deal page - policy type & length validation', () => {
  before(() => {
    cy.visit(ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  context('with single policy type selected', () => {
    describe('when `single policy length` is not provided', () => {
      beforeEach(() => {
        tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().click();
      });

      it('should render a validation error', () => {
        tellUsAboutYourDealPage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(3),
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `single policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('a');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('0');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `single policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().clear().type('25');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });

  context('with single policy type selected', () => {
    describe('when `single policy length` is not provided', () => {
      beforeEach(() => {
        tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].multi.input().click();
      });

      it('should render a validation error', () => {
        tellUsAboutYourDealPage.submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(3),
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY,
        );

        checkText(
          tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `single policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('a');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('0');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `single policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].input().clear().type('13');
          tellUsAboutYourDealPage.submitButton().click();

          checkText(
            partials.errorSummaryListItems().eq(3),
            ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          checkText(
            tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });
});
