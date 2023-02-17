import { submitButton } from '../../../pages/shared';
import {
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../../pages/quote';
import { QUOTE_TITLES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { EUR_CURRENCY_CODE } from '../../../../fixtures/currencies';

const {
  CONTRACT_VALUE,
  CURRENCY,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  ESTIMATED_COST,
} = QUOTE;

context('Get a quote/your quote page (non GBP currency) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy();

    // change currency to non-GBP
    checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE].changeLink().click();

    tellUsAboutYourPolicyPage[CURRENCY].input().select(EUR_CURRENCY_CODE);
    submitButton().click();

    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  context('panel/quote', () => {
    context('summary list', () => {
      const { summaryList } = yourQuotePage.panel;

      it('renders `insured for` key and value with decimal points (no change link)', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '€135,000.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList[ESTIMATED_COST];
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '€1,770.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });
    });
  });
});
