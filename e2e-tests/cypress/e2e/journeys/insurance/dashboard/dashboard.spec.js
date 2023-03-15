import dashboardPage from '../../../pages/insurance/dashboard';
import { DEFAULT, PAGES } from '../../../../../content-strings';
import { APPLICATION, ROUTES } from '../../../../../constants';
import { formatDate } from '../../../helpers/date';

const { table } = dashboardPage;

const {
  ROOT,
  DASHBOARD,
  ALL_SECTIONS,
} = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

context('Insurance - Dashboard - new application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      // TODO: when the authenticated header has been built, update this to click on the dashboard link.
      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
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

      it(`should render ${TABLE_HEADERS.REFERENCE_NUMBER} link to the application`, () => {
        const element = table.body.row(referenceNumber).referenceNumber();

        const expected = {
          href: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
          text: referenceNumber,
        };

        cy.checkLink(element, expected.href, expected.text);
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
  });
});
