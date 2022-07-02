import {
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  ROUTES,
} = CONSTANTS;

const {
  AMOUNT,
  CREDIT_PERIOD,
} = FIELD_IDS;

const submissionData = {
  [AMOUNT]: '100',
  [CREDIT_PERIOD]: '2',
};

context('Change your answers after checking answers - Policy fields', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Amount`', () => {
    let row = checkYourAnswersPage.summaryLists.policy[AMOUNT];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[AMOUNT];
      tellUsAboutYourPolicyPage[AMOUNT].input().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourPolicyPage[AMOUNT].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[AMOUNT].input().clear().type('200');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.policy[AMOUNT];

      row.value().invoke('text').then((text) => {
        const expected = '£200.00';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Credit period`', () => {
    let row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[CREDIT_PERIOD];
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().clear().type('3');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

      row.value().invoke('text').then((text) => {
        const expected = '3 days';

        expect(text.trim()).equal(expected);
      });
    });
  });
});
