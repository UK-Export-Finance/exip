import { companyDetails } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { heading } from '../../../../pages/shared';
import { PAGES, BUTTONS, LINKS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS;

const {
  COMPANY_HOUSE: {
    INPUT,
  },
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const insuranceStart = ROUTES.INSURANCE.START;

context('Your business - company details page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 93,
      seo: 70,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStart);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });
  });

  it('should display the headings correctly', () => {
    partials.headingCaption().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING_CAPTION);
    });
    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('should display the companies house search box', () => {
    companyDetails.companiesHouseSearch().should('exist');
    companyDetails.companiesHouseSearchLabel().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[INPUT].LABEL);
    });

    companyDetails.companiesHouseSearchHint().contains(FIELDS[INPUT].HINT);

    companyDetails.companiesHouseSearchButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SEARCH);
    });
  });

  it('should not display the companies house summary list', () => {
    companyDetails.yourBusinessSummaryList().should('not.exist');
  });

  it('should display the no companies house link', () => {
    companyDetails.companiesHouseNoNumber().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.NO_COMPANY_HOUSE_NUMER);
    });
  });

  it('should display the trading name radios', () => {
    companyDetails.tradingName().contains(FIELDS[TRADING_NAME].LABEL);
    companyDetails.tradingNameYesRadio().should('exist');
    companyDetails.tradingNameNoRadio().should('exist');
  });

  it('should display the trading address radios', () => {
    companyDetails.tradingAddress().contains(FIELDS[TRADING_ADDRESS].LABEL);
    companyDetails.tradingAddressYesRadio().should('exist');
    companyDetails.tradingAddressNoRadio().should('exist');
  });

  it('should display the company website text area', () => {
    companyDetails.companyWebsiteHeading().contains(FIELDS[WEBSITE].LABEL);
    companyDetails.companyWebsite().should('exist');
  });
});
