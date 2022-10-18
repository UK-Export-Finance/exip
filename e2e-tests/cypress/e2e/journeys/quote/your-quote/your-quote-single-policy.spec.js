import {
  yourQuotePage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
import { buyerCountryPage } from '../../../pages/shared';
import {
  LINKS,
  PAGES,
  QUOTE_TITLES,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.YOUR_QUOTE;
const { ROUTES, FIELD_IDS, FIELD_VALUES } = CONSTANTS;

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CURRENCY,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  PERCENTAGE_OF_COVER,
  POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  QUOTE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

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
  [CURRENCY]: 'GBP',
  [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [SINGLE_POLICY_LENGTH]: '3',
  [CREDIT_PERIOD]: '1',
};

context('Get a quote/your quote page (single policy) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathSinglePolicy();
    tellUsAboutYourPolicyPage.submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

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

      it('renders `contract value` key, value with no decimal points and change link', () => {
        const row = summaryList[CONTRACT_VALUE];
        const expectedKeyText = QUOTE_TITLES[CONTRACT_VALUE];

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

        const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
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
        const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`];

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
          const expected = '1.18%';

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
          const expected = '£1,770.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().should('not.exist');
      });

      it('renders `policy length` key, value and change link', () => {
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

        const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
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

        const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
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

  // TODO
  // describe('what happens next', () => {
  //   it('renders intro heading and copy', () => {

  //   });
  //   it('renders finance managers heading and copy', () => {

  //   });

  //   it('renders brokers heading and copy', () => {

  //   });
  // });

  describe('links', () => {
    describe('feedback', () => {
      it('renders', () => {
        yourQuotePage.links.feedback().should('exist');

        yourQuotePage.links.feedback().invoke('text').then((text) => {
          expect(text.trim()).equal(LINKS.GIVE_FEEDBACK);
        });

        yourQuotePage.links.feedback().should('have.attr', 'href', LINKS.EXTERNAL.FEEDBACK);
      });
    });

    describe('start again', () => {
      it('renders', () => {
        yourQuotePage.links.startAgain().should('exist');

        yourQuotePage.links.startAgain().invoke('text').then((text) => {
          expect(text.trim()).equal(LINKS.START_AGAIN.TEXT);
        });

        yourQuotePage.links.startAgain().should('have.attr', 'href', ROUTES.ROOT);
      });

      context('clicking `start again`', () => {
        it('redirects to the first page of the flow', () => {
          yourQuotePage.links.startAgain().click();
          cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
        });

        it('clears the session', () => {
          buyerCountryPage.hiddenInput().should('have.attr', 'value', '');
        });
      });
    });
  });
});
