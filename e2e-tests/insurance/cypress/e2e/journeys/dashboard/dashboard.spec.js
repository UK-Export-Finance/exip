import dashboardPage from '../../../../../pages/insurance/dashboard';
import header from '../../../../../partials/header';
import { DEFAULT, PAGES, BUTTONS } from '../../../../../content-strings';
import { APPLICATION, ROUTES } from '../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Dashboard - new application - As an Exporter, I want to access my UKEF credit insurance application from my dashboard, So that I can easily complete my application', () => {
  let referenceNumber;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
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
      hasAForm: false,
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

      it(`should render ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
        const expected = TABLE_HEADERS.BUYER_LOCATION;

        cy.checkText(table.headers.buyerLocation(), expected);
      });

      it(`should render ${TABLE_HEADERS.BUYER_NAME} cell`, () => {
        const expected = TABLE_HEADERS.BUYER_NAME;

        cy.checkText(table.headers.buyerName(), expected);
      });

      it(`should render ${TABLE_HEADERS.VALUE} cell`, () => {
        const expected = TABLE_HEADERS.VALUE;

        cy.checkText(table.headers.insuredFor(), expected);
      });

      it(`should render ${TABLE_HEADERS.REFERENCE_NUMBER} cell`, () => {
        const expected = TABLE_HEADERS.REFERENCE_NUMBER;

        cy.checkText(table.headers.referenceNumber(), expected);
      });

      it(`should render ${TABLE_HEADERS.SUBMITTED} cell`, () => {
        const expected = TABLE_HEADERS.SUBMITTED;

        cy.checkText(table.headers.submitted(), expected);
      });
    });

    describe('table body cells', () => {
      beforeEach(() => {
        cy.navigateToUrl(dashboardUrl);
      });

      it(`should render 'status' cell with ${APPLICATION.STATUS.IN_PROGRESS}`, () => {
        const cell = table.body.row(referenceNumber).status();

        const expected = APPLICATION.STATUS.IN_PROGRESS;

        cy.checkText(cell, expected);
      });

      it(`should render ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
        const cell = table.body.row(referenceNumber).buyerLocation();

        const expected = application.BUYER[COUNTRY];
        cy.checkText(cell, expected);
      });

      it(`should render empty ${TABLE_HEADERS.BUYER_NAME} cell`, () => {
        const cell = table.body.row(referenceNumber).buyerName();

        cy.checkText(cell, DEFAULT.EMPTY);
      });

      it(`should render empty ${TABLE_HEADERS.VALUE} cell`, () => {
        const cell = table.body.row(referenceNumber).value();

        cy.checkText(cell, DEFAULT.EMPTY);
      });

      it(`should render empty ${TABLE_HEADERS.REFERENCE_NUMBER} cell`, () => {
        const cell = table.body.row(referenceNumber).referenceNumber();

        const expectedReferenceNumber = String(referenceNumber);

        cy.checkText(cell, expectedReferenceNumber);
      });

      it(`should render ${TABLE_HEADERS.SUBMITTED} cell '${BUTTONS.CONTINUE}' link`, () => {
        const element = table.body.row(referenceNumber).submittedLink();

        const expected = {
          href: `${ROOT}/${referenceNumber}${ALL_SECTIONS}`,
          text: BUTTONS.CONTINUE,
        };

        cy.checkLink(element, expected.href, expected.text);
      });
    });

    it('should NOT render pagination list items because there is only 1 application', () => {
      cy.assertPaginationDoesNotExist();
    });

    describe('`start new application` button', () => {
      const expectedUrl = ELIGIBILITY.EXPORTER_LOCATION;

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
    });
  });
});
