import tellUsAboutYourDealPage from '../../pages/tellUsAboutYourDeal';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about your deal page - form validation', () => {
  beforeEach(() => {
    cy.visit(ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    it('should render validation errors for all required fields', () => {
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY;

        expect(text.trim()).includes(expectedMessage);
      });

      // amount
      partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY;

        expect(text.trim()).includes(expectedMessage);
      });

      // credit period
      partials.errorSummaryListItems().eq(2).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY;

        expect(text.trim()).includes(expectedMessage);
      });

      // policy type
      partials.errorSummaryListItems().eq(3).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE];

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE];

        expect(text.trim()).includes(expectedMessage);
      });
    });
  });

  describe('when `amount` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER;

        expect(text.trim()).includes(expectedMessage);
      });
    });
  });

  describe('when `amount` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('0');
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().eq(1).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM;

        expect(text.trim()).includes(expectedMessage);
      });
    });
  });

  describe('when `credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().eq(2).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER;

        expect(text.trim()).includes(expectedMessage);
      });
    });
  });

  describe('when (optional field) `pre-credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().eq(2).invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER;

        expect(text.trim()).equal(expectedMessage);
      });

      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].errorMessage().invoke('text').then((text) => {
        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER;

        expect(text.trim()).includes(expectedMessage);
      });
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].input().select('AED');
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('10');
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('1');
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('2');
      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().click();

      tellUsAboutYourDealPage.submitButton().click();

      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains('AED');

      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input()
        .should('have.attr', 'value', '10');

      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input()
        .should('have.attr', 'value', '1');

      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input()
        .should('have.attr', 'value', '2');

      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().should('be.checked');
    });
  });
});
