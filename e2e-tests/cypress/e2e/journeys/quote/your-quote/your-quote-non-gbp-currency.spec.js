import {
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../../pages/quote';
import {
  LINKS,
  QUOTE_TITLES,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

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

    cy.submitAnswersHappyPathSinglePolicy();

    // change currency to non-GBP
    checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE].changeLink().click();

    tellUsAboutYourPolicyPage[CURRENCY].input().select('EUR');
    tellUsAboutYourPolicyPage.submitButton().click();

    checkYourAnswersPage.submitButton().click();

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

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '€135,000.00';
          expect(text.trim()).includes(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList[ESTIMATED_COST];
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '€1,770.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });
    });
  });
});
