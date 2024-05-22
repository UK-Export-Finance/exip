import { submitButton, summaryList } from '../../../../../../pages/shared';
import { LINKS, QUOTE_TITLES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';

const {
  ELIGIBILITY: { BUYER_COUNTRY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER },
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const { INSURED_FOR, PREMIUM_RATE_PERCENTAGE, ESTIMATED_COST, BUYER_LOCATION } = QUOTE;

const {
  QUOTE: { YOUR_QUOTE, TELL_US_ABOUT_YOUR_POLICY_CHANGE, BUYER_COUNTRY_CHANGE },
} = ROUTES;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
};

const baseUrl = Cypress.config('baseUrl');

context('Get a quote/your quote page (multiple policy) - as an exporter, I want to get an Export insurance quote', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  context('panel/quote', () => {
    context('summary list', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders `max amount owed` key, value with no decimal points and change link', () => {
        const row = summaryList.field(MAX_AMOUNT_OWED);
        const expectedKeyText = QUOTE_TITLES[MAX_AMOUNT_OWED];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = '£150,000';
        cy.checkText(row.value(), expectedValue);

        const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(row.changeLink(), expectedChangeHref, expectedChangeText);
      });

      it('renders `percentage of cover` key, value and change link', () => {
        const row = summaryList.field(PERCENTAGE_OF_COVER);
        const expectedKeyText = QUOTE_TITLES[PERCENTAGE_OF_COVER];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = '90%';
        cy.checkText(row.value(), expectedValue);

        const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(row.changeLink(), expectedChangeHref, expectedChangeText);
      });

      it('renders `insured for` key and value with decimal points (no change link)', () => {
        const row = summaryList.field(INSURED_FOR);
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_MULTIPLE_POLICY`];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '£135,000.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `premium rate` key and value (no change link)', () => {
        const row = summaryList.field(PREMIUM_RATE_PERCENTAGE);
        const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '1.11%';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList.field(ESTIMATED_COST);
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '£1,665.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `policy length` key, value and no change link (multiple policy)', () => {
        const row = summaryList.field(POLICY_LENGTH);
        const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

        cy.checkText(row.key(), expectedKeyText);

        const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `buyer location` key, value and change link', () => {
        const row = summaryList.field(BUYER_LOCATION);
        const expectedKeyText = QUOTE_TITLES[BUYER_LOCATION];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = submissionData[BUYER_COUNTRY];
        cy.checkText(row.value(), expectedValue);

        const expectedChangeHref = `${BUYER_COUNTRY_CHANGE}#heading`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(row.changeLink(), expectedChangeHref, expectedChangeText);
      });
    });
  });
});
