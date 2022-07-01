import {
  checkYourAnswersPage,
  tellUsAboutYourDealPage,
  yourQuotePage,
} from '../../pages';
import {
  LINKS,
  QUOTE_TITLES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

const {
  POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - multi policy type', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPath();

    // change policy type to multi
    checkYourAnswersPage.summaryLists.deal[SINGLE_POLICY_TYPE].changeLink().click();

    tellUsAboutYourDealPage[POLICY_TYPE].multi.input().click();
    tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().type('10');
    tellUsAboutYourDealPage.submitButton().click();
    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  context('panel/quote', () => {
    context('summary list', () => {
      const { summaryList } = yourQuotePage.panel;

      it('renders `policy length` key, value and change link (multi policy)', () => {
        const row = summaryList[MULTI_POLICY_LENGTH];
        const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '10 months';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${MULTI_POLICY_LENGTH}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });
    });
  });
});
