import { submitButton } from '../../../pages/shared';
import { yourQuotePage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  LINKS,
  QUOTE_TITLES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
  },
  MULTIPLE_POLICY_LENGTH,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
};

const startRoute = ROUTES.QUOTE.START;

context('Get a quote/your quote page (multiple policy) - as an exporter, I want to get an Export insurance quote', () => {
  const url = ROUTES.QUOTE.YOUR_QUOTE;

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

      const { summaryList } = yourQuotePage.panel;

      it('should render a header with href to quote start', () => {
        partials.header.serviceName().should('have.attr', 'href', startRoute);
      });

      it('renders `max amount owed` key, value with no decimal points and change link', () => {
        const row = summaryList[MAX_AMOUNT_OWED];
        const expectedKeyText = QUOTE_TITLES[MAX_AMOUNT_OWED];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = '£150,000';
        cy.checkText(row.value(), expectedValue);

        const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
        cy.checkText(row.changeLink(), expectedChangeLink);

        const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `percentage of cover` key, value and change link', () => {
        const row = summaryList[PERCENTAGE_OF_COVER];
        const expectedKeyText = QUOTE_TITLES[PERCENTAGE_OF_COVER];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = '90%';
        cy.checkText(row.value(), expectedValue);

        const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
        cy.checkText(row.changeLink(), expectedChangeLink);

        const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `insured for` key and value with decimal points (no change link)', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_MULTIPLE_POLICY`];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '£135,000.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `premium rate` key and value (no change link)', () => {
        const row = summaryList[PREMIUM_RATE_PERCENTAGE];
        const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '1.13%';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `estimated cost` key and value (no change link)', () => {
        const row = summaryList[ESTIMATED_COST];
        const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

        cy.checkText(row.key(), expectedKeyText);

        const expected = '£1,695.00';
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `policy length` key, value and no change link (multiple policy)', () => {
        const row = summaryList[MULTIPLE_POLICY_LENGTH];
        const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

        cy.checkText(row.key(), expectedKeyText);

        const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
        cy.checkText(row.value(), expected);

        row.changeLink().should('not.exist');
      });

      it('renders `buyer location` key, value and change link', () => {
        const row = summaryList[BUYER_LOCATION];
        const expectedKeyText = QUOTE_TITLES[BUYER_LOCATION];

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = submissionData[BUYER_COUNTRY];
        cy.checkText(row.value(), expectedValue);

        const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
        cy.checkText(row.changeLink(), expectedChangeLink);

        const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });
    });
  });
});
