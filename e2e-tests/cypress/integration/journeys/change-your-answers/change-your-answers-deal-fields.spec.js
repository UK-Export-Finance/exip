import {
  tellUsAboutYourDealPage,
  checkYourAnswersPage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  ROUTES,
} = CONSTANTS;

const {
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
} = FIELD_IDS;

const submissionData = {
  [CURRENCY]: 'GBP',
  [AMOUNT]: '100',
  [PRE_CREDIT_PERIOD]: '1',
  [CREDIT_PERIOD]: '2',
};

context('Change your answers after checking answers - Deal fields', () => {
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
    let row = checkYourAnswersPage.summaryLists.deal[AMOUNT];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${AMOUNT}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().should('have.attr', 'href', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[AMOUNT];
      tellUsAboutYourDealPage[AMOUNT].input().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourDealPage[AMOUNT].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourDealPage[AMOUNT].input().clear().type('200');
      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.deal[AMOUNT];

      row.value().invoke('text').then((text) => {
        const expected = '£200.00';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Currency`', () => {
    let row = checkYourAnswersPage.summaryLists.deal[CURRENCY];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${CURRENCY}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().should('have.attr', 'href', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[CURRENCY];
      tellUsAboutYourDealPage[CURRENCY].inputOptionSelected().contains(expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourDealPage[CURRENCY].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourDealPage[CURRENCY].input().select('EUR');
      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.deal[CURRENCY];

      row.value().invoke('text').then((text) => {
        const expected = 'Euros (EUR)';
        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Pre-credit period`', () => {
    let row = checkYourAnswersPage.summaryLists.deal[PRE_CREDIT_PERIOD];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${PRE_CREDIT_PERIOD}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().should('have.attr', 'href', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[PRE_CREDIT_PERIOD];
      tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().clear().type('2');
      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.deal[PRE_CREDIT_PERIOD];

      row.value().invoke('text').then((text) => {
        const expected = '2 days';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Credit period`', () => {
    let row = checkYourAnswersPage.summaryLists.deal[CREDIT_PERIOD];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${CREDIT_PERIOD}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().should('have.attr', 'href', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('has originally submitted answer', () => {
      const expectedValue = submissionData[CREDIT_PERIOD];
      tellUsAboutYourDealPage[CREDIT_PERIOD].input().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourDealPage[CREDIT_PERIOD].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourDealPage[CREDIT_PERIOD].input().clear().type('3');
      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.deal[CREDIT_PERIOD];

      row.value().invoke('text').then((text) => {
        const expected = '3 days';

        expect(text.trim()).equal(expected);
      });
    });
  });
});
