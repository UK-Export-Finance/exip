import {
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../pages';
import {
  LINKS,
  QUOTE_TITLES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

const {
  CURRENCY,
  AMOUNT,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  ESTIMATED_COST,
} = QUOTE;

context('Your quote page - non GBP currency', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathSinglePolicy();

    // change currency to non-GBP
    checkYourAnswersPage.summaryLists.policy[AMOUNT].changeLink().click();

    tellUsAboutYourPolicyPage[CURRENCY].input().select('EUR');
    tellUsAboutYourPolicyPage.submitButton().click();

    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  context('panel/quote', () => {
    context('summary list', () => {
      const { summaryList } = yourQuotePage.panel;

      it('renders `insured for` key, value and change link with unconverted value and currency', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[INSURED_FOR];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '€150,000.00';
          expect(text.trim()).includes(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList[ESTIMATED_COST];
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '€1,710.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });
    });
  });
});
