import {
  buyerCountryPage,
  checkYourAnswersPage,
  yourQuotePage,
} from '../../../pages';
import CONSTANTS from '../../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

const {
  BUYER_COUNTRY,
  QUOTE,
} = FIELD_IDS;

const {
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
} = QUOTE;

const COUNTRY_NAME = 'Bahrain';

context(`Your quote page - user testing scenarios - ${COUNTRY_NAME} mock quote`, () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPath();

    // change buyer country
    checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY].changeLink().click();

    buyerCountryPage.searchInput().type(COUNTRY_NAME);
    const results = buyerCountryPage.results();
    results.first().click();
    buyerCountryPage.submitButton().click();

    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  it('renders expected mock `premium rate` and `estimated cost`', () => {
    const { summaryList } = yourQuotePage.panel;

    const premiumRateRow = summaryList[PREMIUM_RATE_PERCENTAGE];

    premiumRateRow.value().invoke('text').then((text) => {
      const expected = '1.44%';

      expect(text.trim()).equal(expected);
    });

    const estimatedCostRow = summaryList[ESTIMATED_COST];

    estimatedCostRow.value().invoke('text').then((text) => {
      const expected = '£1,428.00';

      expect(text.trim()).equal(expected);
    });
  });
});
