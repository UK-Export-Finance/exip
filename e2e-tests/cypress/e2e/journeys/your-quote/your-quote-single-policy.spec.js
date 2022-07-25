import {
  yourQuotePage,
  beforeYouStartPage,
  buyerCountryPage,
  tellUsAboutYourPolicyPage,
} from '../../pages';
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
  UK_GOODS_OR_SERVICES,
  CURRENCY,
  AMOUNT,
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
  [BUYER_COUNTRY]: 'Algeria',
  [UK_GOODS_OR_SERVICES]: '50',
  [AMOUNT]: '150000',
  [CURRENCY]: 'GBP',
  [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [SINGLE_POLICY_LENGTH]: '3',
  [CREDIT_PERIOD]: '1',
};

context('Your quote page (single policy)', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathSinglePolicy();
    tellUsAboutYourPolicyPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
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

      it('renders `insured for` key, value and change link', () => {
        const row = summaryList[INSURED_FOR];
        const expectedKeyText = QUOTE_TITLES[INSURED_FOR];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '£150,000.00';

          expect(text.trim()).equal(expected);
        });

        row.changeLink().invoke('text').then((text) => {
          const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
          expect(text.trim()).equal(expected);
        });

        const expectedHref = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}`;
        row.changeLink().should('have.attr', 'href', expectedHref);
      });

      it('renders `premium rate` key and value (no change link)', () => {
        const row = summaryList[PREMIUM_RATE_PERCENTAGE];
        const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

        row.key().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedKeyText);
        });

        row.value().invoke('text').then((text) => {
          const expected = '1.14%';

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
          const expected = '£1,710.00';

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

        const expectedHref = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}`;
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

        const expectedHref = `${ROUTES.BUYER_COUNTRY_CHANGE}#${BUYER_COUNTRY}`;
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
        yourQuotePage.links.feedback().should('have.attr', 'href', ROUTES.FEEDBACK);
      });
    });

    describe('start again', () => {
      it('renders', () => {
        yourQuotePage.links.startAgain().should('exist');
        yourQuotePage.links.startAgain().should('have.attr', 'href', ROUTES.BEFORE_YOU_START);
      });

      context('clicking `start again`', () => {
        it('redirects to the start page', () => {
          yourQuotePage.links.startAgain().click();
          cy.url().should('include', ROUTES.BEFORE_YOU_START);
        });

        it('clears the session', () => {
          beforeYouStartPage.submitButton().click();
          buyerCountryPage.hiddenInput().should('have.attr', 'value', '');
        });
      });
    });
  });
});
