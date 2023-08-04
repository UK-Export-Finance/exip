import { buyerCountryPage, submitButton } from '../../../pages/shared';
import { yourQuotePage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  LINKS,
  PAGES,
  QUOTE_TITLES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.YOUR_QUOTE;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    CONTRACT_VALUE,
    CURRENCY,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
  },
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
  [CURRENCY]: GBP_CURRENCY_CODE,
  [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [SINGLE_POLICY_LENGTH]: '3',
  [CREDIT_PERIOD]: '1',
};

const startRoute = ROUTES.QUOTE.START;

context('Get a quote/your quote page (single policy) - as an exporter, I want to get an Export insurance quote', () => {
  const url = ROUTES.QUOTE.YOUR_QUOTE;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      assertSubmitButton: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to quote start', () => {
      cy.navigateToUrl(url);

      partials.header.serviceName().should('have.attr', 'href', startRoute);
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

        const { summaryList } = yourQuotePage.panel;

        it('renders `contract value` key, value with no decimal points and change link', () => {
          const row = summaryList[CONTRACT_VALUE];
          const expectedKeyText = QUOTE_TITLES[CONTRACT_VALUE];

          cy.checkText(row.key(), expectedKeyText);

          const expectedValue = '£150,000';
          cy.checkText(row.value(), expectedValue);

          const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
          cy.checkText(row.changeLink(), expectedChangeLink);

          const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
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
          const expectedKeyText = QUOTE_TITLES[`${INSURED_FOR}_SINGLE_POLICY`];

          cy.checkText(row.key(), expectedKeyText);

          const expectedValue = '£135,000.00';
          cy.checkText(row.value(), expectedValue);

          row.changeLink().should('not.exist');
        });

        it('renders `premium rate` key and value (no change link)', () => {
          const row = summaryList[PREMIUM_RATE_PERCENTAGE];
          const expectedKeyText = QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE];

          cy.checkText(row.key(), expectedKeyText);

          const expected = '1.16%';
          cy.checkText(row.value(), expected);

          row.changeLink().should('not.exist');
        });

        it('renders `estimated cost` key and value (no change link)', () => {
          const row = summaryList[ESTIMATED_COST];
          const expectedKeyText = QUOTE_TITLES[ESTIMATED_COST];

          cy.checkText(row.key(), expectedKeyText);

          const expected = '£1,740.00';
          cy.checkText(row.value(), expected);

          row.changeLink().should('not.exist');
        });

        it('renders `policy length` key, value and change link', () => {
          const row = summaryList[SINGLE_POLICY_LENGTH];
          const expectedKeyText = QUOTE_TITLES[POLICY_LENGTH];

          cy.checkText(row.key(), expectedKeyText);

          const expectedValue = `${submissionData[SINGLE_POLICY_LENGTH]} months`;
          cy.checkText(row.value(), expectedValue);

          const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
          cy.checkText(row.changeLink(), expectedChangeLink);

          const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
          row.changeLink().should('have.attr', 'href', expectedHref);
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
        cy.checkText(
          yourQuotePage.whatHappensNext.intro.youCan(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.CAN_NOW_SUBMIT,
        );

        cy.checkLink(
          yourQuotePage.whatHappensNext.intro.fullApplicationLink(),
          ROUTES.INSURANCE.START,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.FULL_APPLICATION.TEXT,
        );
      });

      it('renders `timeframe` and `can get help` copy', () => {
        cy.checkText(
          yourQuotePage.whatHappensNext.intro.timeframe(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.TIMEFRAME,
        );

        cy.checkText(
          yourQuotePage.whatHappensNext.intro.canGetHelp(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.INTRO.CAN_GET_HELP,
        );
      });

      it('renders `finance managers` heading and copy', () => {
        cy.checkText(
          yourQuotePage.whatHappensNext.financeManagers.heading(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.HEADING,
        );
      });

      it('renders `finance managers available` copy and link', () => {
        cy.checkText(
          yourQuotePage.whatHappensNext.financeManagers.available(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.AVAILABLE,
        );

        cy.checkLink(
          yourQuotePage.whatHappensNext.financeManagers.link(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.NEAREST_EFM.HREF,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.EXPORT_FINANCE_MANAGERS.NEAREST_EFM.TEXT,
        );
      });

      it('renders `brokers` heading and `act as` copy', () => {
        cy.checkText(
          yourQuotePage.whatHappensNext.brokers.heading(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.HEADING,
        );

        cy.checkText(
          yourQuotePage.whatHappensNext.brokers.actAs(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.ACT_AS,
        );
      });

      it('renders `brokers - they receive` copy and link', () => {
        cy.checkText(
          yourQuotePage.whatHappensNext.brokers.theyReceive.intro(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.INTRO,
        );

        cy.checkLink(
          yourQuotePage.whatHappensNext.brokers.theyReceive.link(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.LINK.HREF,
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.LINK.TEXT,
        );

        cy.checkText(
          yourQuotePage.whatHappensNext.brokers.theyReceive.outro(),
          CONTENT_STRINGS.WHAT_HAPPENS_NEXT.BROKERS.THEY_RECEIVE.OUTRO,
        );
      });
    });

    it('renders a `feedback` link', () => {
      yourQuotePage.links.feedback().should('exist');

      cy.checkText(yourQuotePage.links.feedback(), LINKS.GIVE_FEEDBACK);

      yourQuotePage.links.feedback().should('have.attr', 'href', LINKS.EXTERNAL.FEEDBACK);
    });

    it('renders `start again` link', () => {
      yourQuotePage.links.startAgain().should('exist');

      cy.checkText(yourQuotePage.links.startAgain(), LINKS.START_AGAIN.TEXT);

      yourQuotePage.links.startAgain().should('have.attr', 'href', ROUTES.ROOT);
    });

    context('clicking `start again`', () => {
      it('redirects to the first page of the flow', () => {
        yourQuotePage.links.startAgain().click();
        cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
      });

      it('clears the session', () => {
        // buyer country auto complete stores the selected value in the first list item of the 'results' list.
        // Therefore, if it's not defined, nothing has been selected/submitted.
        buyerCountryPage.results().should('not.exist');
      });
    });
  });
});
