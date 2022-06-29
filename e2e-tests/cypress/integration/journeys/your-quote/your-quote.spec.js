import { yourQuotePage } from '../../pages';
import {
  LINKS,
  PAGES,
  QUOTE_TITLES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.YOUR_QUOTE_PAGE;
const { ROUTES, FIELD_IDS, FIELD_VALUES } = CONSTANTS;

const {
  BUYER_COUNTRY,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const submissionData = {
  [BUYER_COUNTRY]: 'France',
  [UK_CONTENT_PERCENTAGE]: '50',
  [CURRENCY]: 'GBP',
  [AMOUNT]: '100',
  [PRE_CREDIT_PERIOD]: '1',
  [CREDIT_PERIOD]: '2',
  [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [SINGLE_POLICY_LENGTH]: '13',
};

context('Your quote page', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPathNew();
    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  // it('passes the audits', () => {
  //   cy.lighthouse({
  //     accessibility: 100,
  //     performance: 80,
  //     'best-practices': 100,
  //     seo: 75,
  //   });
  // });

  context('panel/quote', () => {
    it('renders `you can apply` heading', () => {
      yourQuotePage.panel.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.QUOTE.HEADING);
      });
    });

    it('renders `your quote` heading', () => {
      yourQuotePage.panel.subHeading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.QUOTE.SUB_HEADING);
      });
    });

    context('summary list', () => {
      const { summaryList } = yourQuotePage.panel;

      it('renders `insured for` key, value and change link', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[INSURED_FOR];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = `£${submissionData[AMOUNT]}.00`;

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${AMOUNT}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `percentage` key and value (no change link)', () => {
        const row = summaryList[PREMIUM_RATE_PERCENTAGE];
        const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '1.1% mock';

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
          const expected = '123 mock';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `policy length` key, value and change link (single policy)', () => {
        const row = summaryList[SINGLE_POLICY_LENGTH];
        const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = `${submissionData[SINGLE_POLICY_LENGTH]} months`;

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}#${SINGLE_POLICY_LENGTH}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
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

        const expectedHref = `${ROUTES.BUYER_BASED_CHANGE}#${BUYER_COUNTRY}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });
    });
  });

  context('notice', () => {
    it('renders notice list items', () => {
      yourQuotePage.noticeList.item1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.NOTICE_1);
      });

      yourQuotePage.noticeList.item2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.NOTICE_2);
      });

      yourQuotePage.noticeList.item3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.NOTICE_3);
      });
    });
  });
});
