import { submitButton } from '../../../pages/shared';
import { yourQuotePage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  LINKS,
  QUOTE_TITLES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';

const {
  BUYER_COUNTRY,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  PERCENTAGE_OF_COVER,
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

context('Get a quote/your quote page (multi policy) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathMultiPolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  context('panel/quote', () => {
    context('summary list', () => {
      const { summaryList } = yourQuotePage.panel;

      it('should render a header with href to quote start', () => {
        partials.header.serviceName().should('have.attr', 'href', startRoute);
      });

      it('renders `max amount owed` key, value with no decimal points and change link', () => {
        const row = summaryList[MAX_AMOUNT_OWED];
        const expectedKeyText = QUOTE_TITLES[MAX_AMOUNT_OWED];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '£150,000';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `percentage of cover` key, value and change link', () => {
        const row = summaryList[PERCENTAGE_OF_COVER];
        const expectedKeyText = QUOTE_TITLES[PERCENTAGE_OF_COVER];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '90%';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `insured for` key and value with decimal points (no change link)', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_MULTI_POLICY`];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '£135,000.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `premium rate` key and value (no change link)', () => {
        const row = summaryList[PREMIUM_RATE_PERCENTAGE];
        const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '1.15%';

          expect(text.trim()).equal(expected);
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
          const expected = '£1,725.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `policy length` key, value and no change link (multi policy)', () => {
        const row = summaryList[MULTI_POLICY_LENGTH];
        const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTI} months`;

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `buyer location` key, value and change link', () => {
        const row = summaryList[BUYER_LOCATION];
        const expectedKeyText = QUOTE_TITLES[BUYER_LOCATION];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = submissionData[BUYER_COUNTRY];

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });
    });
  });
});
