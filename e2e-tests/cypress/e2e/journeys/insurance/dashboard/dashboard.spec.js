import dashboardPage from '../../../pages/insurance/dashboard';
import header from '../../../partials/header';
import { DEFAULT, PAGES, BUTTONS } from '../../../../../content-strings';
import { APPLICATION, ROUTES } from '../../../../../constants';
import { formatDate } from '../../../helpers/date';

const { table } = dashboardPage;

const {
  ROOT,
  DASHBOARD,
  ALL_SECTIONS,
  ELIGIBILITY,
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

context('Insurance - Dashboard - new application - As an Exporter, I want to access my UKEF export insurance application from my dashboard, So that I can easily complete my application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      header.navigation.applications().click();

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
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
        cy.navigateToUrl(url);
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

        cy.checkText(table.headers.referenceNumberLink(), expected);
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
        cy.navigateToUrl(url);
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
          cy.navigateToUrl(url);

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

          const expected = `${Cypress.config('baseUrl')}${expectedUrl}`;
          cy.url().should('eq', expected);
        });
      });

      it(`should render empty ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
        const cell = table.body.row(referenceNumber).buyerLocation();

        cy.checkText(cell, DEFAULT.EMPTY);
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

    describe('start new application button', () => {
      const expectedUrl = ELIGIBILITY.BUYER_COUNTRY;

      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render', () => {
        const element = dashboardPage.startNewApplication();

        const expected = {
          href: expectedUrl,
          text: BUTTONS.START_A_NEW_APPLICATION,
        };

        cy.checkLink(element, expected.href, expected.text);
      });

      it(`should redirect to ${ROOT}${ELIGIBILITY.BUYER_COUNTRY}`, () => {
        const element = dashboardPage.startNewApplication();

        element.click();

        const expected = `${Cypress.config('baseUrl')}${expectedUrl}`;

        cy.url().should('eq', expected);
      });
    });
  });
});
