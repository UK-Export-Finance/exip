import { field, submitButton, summaryList } from '../../../../../../pages/shared';
import { QUOTE_TITLES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { EUR_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CURRENCY,
  },
  QUOTE,
} = FIELD_IDS;

const { QUOTE: { YOUR_QUOTE } } = ROUTES;

const {
  INSURED_FOR,
  ESTIMATED_COST,
} = QUOTE;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote/your quote page (non GBP currency) - as an exporter, I want to get an Export insurance quote', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy({});

    // change currency to non-GBP
    summaryList.field(CONTRACT_VALUE).changeLink().click();

    field(CURRENCY).input().select(EUR_CURRENCY_CODE);
    submitButton().click();

    submitButton().click();

    const expectedUrl = `${url}#${CONTRACT_VALUE}-label`;

    cy.assertUrl(expectedUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  context('panel/quote', () => {
    context('summary list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders `insured for` key and value with decimal points (no change link)', () => {
        const row = summaryList.field(INSURED_FOR);
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '€135,000.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList.field(ESTIMATED_COST);
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '€1,740.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });
    });
  });
});
