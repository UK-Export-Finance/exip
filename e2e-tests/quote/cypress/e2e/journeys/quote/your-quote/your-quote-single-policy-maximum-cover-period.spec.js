import { submitButton, summaryList } from '../../../../../../pages/shared';
import { LINKS, QUOTE_TITLES } from '../../../../../../content-strings';
import {
  ELIGIBILITY,
  ROUTES,
  FIELD_IDS,
  FIELD_VALUES,
} from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const { MAX_COVER_PERIOD_MONTHS } = ELIGIBILITY;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    CONTRACT_VALUE,
    CURRENCY,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
  },
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY_CHANGE, BUYER_COUNTRY_CHANGE, YOUR_QUOTE },
} = ROUTES;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
  [CONTRACT_VALUE]: '150000',
  [CURRENCY]: GBP_CURRENCY_CODE,
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: '3',
  [CREDIT_PERIOD]: '1',
};

const baseUrl = Cypress.config('baseUrl');

context('Get a quote/your quote page (single policy) - maximum cover period - as an exporter, I want to get an Export insurance quote', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy({ policyLength: MAX_COVER_PERIOD_MONTHS });
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
  });

  context('summary list', () => {
    it('renders `contract value` key, value with no decimal points and change link', () => {
      const row = summaryList.field(CONTRACT_VALUE);
      const expectedKeyText = QUOTE_TITLES[CONTRACT_VALUE];

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = '£150,000';
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
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
      const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`];

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = '£135,000.00';
      cy.checkText(row.value(), expectedValue);

      row.changeLink().should('not.exist');
    });

    it('renders `premium rate` key and value (no change link)', () => {
      const row = summaryList.field(PREMIUM_RATE_PERCENTAGE);
      const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

      cy.checkText(row.key(), expectedKeyText);

      const expected = '3.68%';
      cy.checkText(row.value(), expected);

      row.changeLink().should('not.exist');
    });

    it('renders `estimated cost` key and value (no change link)', () => {
      const row = summaryList.field(ESTIMATED_COST);
      const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

      cy.checkText(row.key(), expectedKeyText);

      const expected = '£5,520.00';
      cy.checkText(row.value(), expected);

      row.changeLink().should('not.exist');
    });

    it('renders `policy length` key, value and change link', () => {
      const row = summaryList.field(POLICY_LENGTH);
      const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${MAX_COVER_PERIOD_MONTHS} months`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${POLICY_LENGTH}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(row.changeLink(), expectedChangeHref, expectedChangeText);
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
