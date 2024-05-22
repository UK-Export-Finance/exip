import { countryInput, submitButton, summaryList } from '../../../../../../pages/shared';
import { yourQuotePage } from '../../../../../../pages/quote';
import { LINKS, PAGES, QUOTE_TITLES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.YOUR_QUOTE;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY, CONTRACT_VALUE, CURRENCY, CREDIT_PERIOD, PERCENTAGE_OF_COVER,
  },
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

const {
  ROOT,
  QUOTE: {
    BUYER_COUNTRY: BUYER_COUNTRY_ROUTE, TELL_US_ABOUT_YOUR_POLICY_CHANGE, BUYER_COUNTRY_CHANGE, YOUR_QUOTE,
  },
} = ROUTES;

const {
  INSURED_FOR, PREMIUM_RATE_PERCENTAGE, ESTIMATED_COST, BUYER_LOCATION,
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

context('Get a quote/your quote page (single policy) - as an exporter, I want to get an Export insurance quote', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      hasAForm: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    context('panel/quote', () => {
      it('renders `your quote` heading', () => {
        cy.navigateToUrl(url);

        cy.checkText(yourQuotePage.panel.subHeading(), CONTENT_STRINGS.QUOTE.SUB_HEADING);
      });

      context('summary list', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

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

          const expected = '1.14%';
          cy.checkText(row.value(), expected);

          row.changeLink().should('not.exist');
        });

        it('renders `estimated cost` key and value (no change link)', () => {
          const row = summaryList.field(ESTIMATED_COST);
          const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

          cy.checkText(row.key(), expectedKeyText);

          const expected = '£1,710.00';
          cy.checkText(row.value(), expected);

          row.changeLink().should('not.exist');
        });

        it('renders `policy length` key, value and change link', () => {
          const row = summaryList.field(POLICY_LENGTH);
          const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

          cy.checkText(row.key(), expectedKeyText);

          const expectedValue = `${submissionData[POLICY_LENGTH]} months`;
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

    it('renders notice list items', () => {
      cy.checkText(yourQuotePage.noticeList.item1(), CONTENT_STRINGS.NOTICE_1);

      cy.checkText(yourQuotePage.noticeList.item2(), CONTENT_STRINGS.NOTICE_2);

      cy.checkText(yourQuotePage.noticeList.item3(), CONTENT_STRINGS.NOTICE_3);
    });

    describe('what happens next', () => {
      it('renders intro heading and copy', () => {
        cy.checkText(yourQuotePage.whatHappensNext.heading(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.HEADING);
      });

      it('renders `can start a new application` copy and link', () => {
        cy.checkText(yourQuotePage.whatHappensNext.intro.youCan(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.CAN_NOW_SUBMIT);

        cy.checkLink(
          yourQuotePage.whatHappensNext.intro.fullApplicationLink(),
          LINKS.EXTERNAL.FULL_APPLICATION,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.FULL_APPLICATION.TEXT,
        );
      });

      it('renders `timeframe` and `can get help` copy', () => {
        cy.checkText(yourQuotePage.whatHappensNext.intro.timeframe(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.TIMEFRAME);

        cy.checkText(yourQuotePage.whatHappensNext.intro.canGetHelp(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.CAN_GET_HELP);
      });

      it('renders `finance managers` heading and copy', () => {
        cy.checkText(yourQuotePage.whatHappensNext.financeManagers.heading(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.HEADING);
      });

      it('renders `finance managers available` copy and link', () => {
        cy.checkText(yourQuotePage.whatHappensNext.financeManagers.available(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.AVAILABLE);

        cy.checkLink(
          yourQuotePage.whatHappensNext.financeManagers.link(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.NEAREST_EFM.HREF,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.NEAREST_EFM.TEXT,
        );
      });

      it('renders `brokers` heading and `act as` copy', () => {
        cy.checkText(yourQuotePage.whatHappensNext.brokers.heading(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.HEADING);

        cy.checkText(yourQuotePage.whatHappensNext.brokers.actAs(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.ACT_AS);
      });

      it('renders `brokers - they receive` copy and link', () => {
        cy.checkText(yourQuotePage.whatHappensNext.brokers.theyReceive.intro(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.INTRO);

        cy.checkLink(
          yourQuotePage.whatHappensNext.brokers.theyReceive.link(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.LINK.HREF,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.LINK.TEXT,
        );

        cy.checkText(yourQuotePage.whatHappensNext.brokers.theyReceive.outro(), CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.OUTRO);
      });
    });

    it('renders a `feedback` link', () => {
      cy.checkLink(yourQuotePage.links.feedback(), LINKS.EXTERNAL.FEEDBACK, LINKS.GIVE_FEEDBACK);
    });

    it('renders `start again` link', () => {
      cy.checkLink(yourQuotePage.links.startAgain(), ROOT, LINKS.START_AGAIN.TEXT);
    });

    context('clicking `start again`', () => {
      it('redirects to the first page of the flow', () => {
        yourQuotePage.links.startAgain().click();
        const expectedUrl = `${baseUrl}${BUYER_COUNTRY_ROUTE}`;

        cy.assertUrl(expectedUrl);
      });

      it('clears the session', () => {
        // buyer country auto complete stores the selected value in the first list item of the 'results' list.
        // Therefore, if it's not defined, nothing has been selected/submitted.
        countryInput.field(BUYER_COUNTRY).results().should('not.exist');
      });
    });
  });
});
