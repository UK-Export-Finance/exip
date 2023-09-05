import dashboardPage from '../../../../../pages/insurance/dashboard';
import header from '../../../../../partials/header';
import { DEFAULT, PAGES, BUTTONS } from '../../../../../content-strings';
import { APPLICATION, ROUTES } from '../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import { formatDate } from '../../../../../helpers/date';
import application from '../../../../../fixtures/application';

const { table } = dashboardPage;

const {
  INSURANCE: {
    ROOT,
    DASHBOARD,
    ALL_SECTIONS,
    ELIGIBILITY,
  },
  QUOTE,
} = ROUTES;

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: {
      COUNTRY,
    },
  },
} = INSURANCE_FIELD_IDS;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

context('Insurance - Dashboard - new application - As an Exporter, I want to access my UKEF export insurance application from my dashboard, So that I can easily complete my application', () => {
  const baseUrl = Cypress.config('baseUrl');

  let referenceNumber;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      header.navigation.applications().click();

      cy.assertUrl(dashboardUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: DASHBOARD,
      assertSubmitButton: false,
      assertBackLink: false,
    });
  });

  describe('page tests', () => {
    describe('table headers', () => {
      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);
      });

      it(`should render ${TABLE_HEADERS.STATUS}`, () => {
        const expected = TABLE_HEADERS.STATUS;

        cy.checkText(table.headers.status(), expected);
      });

      it(`should render ${TABLE_HEADERS.LAST_UPDATED}`, () => {
        const expected = TABLE_HEADERS.LAST_UPDATED;

        cy.checkText(table.headers.lastUpdated(), expected);
      });

      it(`should render ${TABLE_HEADERS.REFERENCE_NUMBER} cell`, () => {
        const expected = TABLE_HEADERS.REFERENCE_NUMBER;

        cy.checkText(table.headers.referenceNumber(), expected);
      });

      it(`should render ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
        const expected = TABLE_HEADERS.BUYER_LOCATION;

        cy.checkText(table.headers.buyerLocation(), expected);
      });

      it(`should render ${TABLE_HEADERS.BUYER_NAME} cell`, () => {
        const expected = TABLE_HEADERS.BUYER_NAME;

        cy.checkText(table.headers.buyerName(), expected);
      });

      it(`should render ${TABLE_HEADERS.INSURED_FOR} cell`, () => {
        const expected = TABLE_HEADERS.INSURED_FOR;

        cy.checkText(table.headers.insuredFor(), expected);
      });
    });

    describe('table body cells', () => {
      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);
      });

      it(`should render 'status' cell with ${APPLICATION.STATUS.DRAFT}`, () => {
        const cell = table.body.row(referenceNumber).status();

        const expected = APPLICATION.STATUS.DRAFT;

        cy.checkText(cell, expected);
      });

      it(`should render formatted ${TABLE_HEADERS.LAST_UPDATED} cell with today's date`, () => {
        const cell = table.body.row(referenceNumber).lastUpdated();

        const now = new Date();

        const expected = formatDate(now);

        cy.checkText(cell, expected);
      });

      describe(`${TABLE_HEADERS.REFERENCE_NUMBER}`, () => {
        let expectedUrl;

        beforeEach(() => {
          cy.navigateToUrl(dashboardUrl);

          expectedUrl = `${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        });

        it('should render a link to the application', () => {
          const applicationLink = table.body.row(referenceNumber).referenceNumberLink();

          const expected = {
            href: expectedUrl,
            text: referenceNumber,
          };

          cy.checkLink(applicationLink, expected.href, expected.text);
        });

        it('should redirect to the application', () => {
          const applicationLink = table.body.row(referenceNumber).referenceNumberLink();

          applicationLink.click();

          const expected = `${baseUrl}${expectedUrl}`;

          cy.assertUrl(expected);
        });
      });

      it(`should render empty ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
        const cell = table.body.row(referenceNumber).buyerLocation();

        const expected = application.BUYER[COUNTRY];
        cy.checkText(cell, expected);
      });

      it(`should render empty ${TABLE_HEADERS.BUYER_NAME} cell`, () => {
        const cell = table.body.row(referenceNumber).buyerName();

        cy.checkText(cell, DEFAULT.EMPTY);
      });

      it(`should render empty ${TABLE_HEADERS.INSURED_FOR} cell`, () => {
        const cell = table.body.row(referenceNumber).insuredFor();

        cy.checkText(cell, DEFAULT.EMPTY);
      });
    });

    it('should NOT render pagination list items because there is only 1 application', () => {
      cy.assertPaginationDoesNotExist();
    });

    describe('`start new application` button', () => {
      const expectedUrl = ELIGIBILITY.BUYER_COUNTRY;

      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);
      });

      it('should render', () => {
        const element = dashboardPage.startNewApplicationButton();

        const expected = {
          href: expectedUrl,
          text: BUTTONS.START_A_NEW_APPLICATION,
        };

        cy.checkLink(element, expected.href, expected.text);
      });

      it(`should redirect to ${expectedUrl}`, () => {
        const element = dashboardPage.startNewApplicationButton();

        element.click();

        const expected = `${baseUrl}${expectedUrl}`;

        cy.assertUrl(expected);
      });
    });

    describe('`get a quote` button', () => {
      const expectedUrl = QUOTE.START;

      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);
      });

      it('should render', () => {
        const element = dashboardPage.getAQuoteButton();

        const expected = {
          href: expectedUrl,
          text: BUTTONS.GET_A_QUOTE_FOR_INSURANCE,
        };

        cy.checkLink(element, expected.href, expected.text);
      });

      it(`should redirect to ${QUOTE.BUYER_COUNTRY}`, () => {
        const element = dashboardPage.getAQuoteButton();

        element.click();

        const expected = `${baseUrl}${QUOTE.BUYER_COUNTRY}`;

        cy.assertUrl(expected);
      });
    });
  });
});
