import { companyDetails } from '../../../../pages/your-business';
import partials from '../../../../partials';
import {
  heading, submitButton, saveAndBackButton,
} from '../../../../pages/shared';
import {
  PAGES, BUTTONS, LINKS,
} from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS;

const {
  COMPANY_HOUSE: {
    INPUT,
  },
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
    PHONE_NUMBER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const insuranceStart = ROUTES.INSURANCE.START;

context('Insurance - Your business - Company details page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
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
    cy.checkText(partials.backLink(), LINKS.BACK);
  });

  it('should display the headings correctly', () => {
    cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('should display the companies house search box', () => {
    companyDetails.companiesHouseSearch().should('exist');

    cy.checkText(companyDetails.companiesHouseSearchLabel(), FIELDS[INPUT].LABEL);

    companyDetails.companiesHouseSearchHint().contains(FIELDS[INPUT].HINT);

    cy.checkText(companyDetails.companiesHouseSearchButton(), BUTTONS.SEARCH);
  });

  it('should not display the companies house summary list', () => {
    companyDetails.yourBusinessSummaryList().should('not.exist');
  });

  it('should display the no companies house link', () => {
    cy.checkText(companyDetails.companiesHouseNoNumber(), CONTENT_STRINGS.NO_COMPANY_HOUSE_NUMER);
  });

  it('should display the trading name radios', () => {
    cy.checkText(companyDetails.tradingNameLabel(), FIELDS[TRADING_NAME].LABEL);

    companyDetails.tradingNameYesRadioInput().should('exist');

    cy.checkAriaLabel(companyDetails.tradingNameYesRadioInput(), `${FIELDS[TRADING_NAME].LABEL} yes radio`);

    companyDetails.tradingNameNoRadioInput().should('exist');

    cy.checkAriaLabel(companyDetails.tradingNameNoRadioInput(), `${FIELDS[TRADING_NAME].LABEL} no radio`);
  });

  it('should display the trading address radios', () => {
    cy.checkText(companyDetails.tradingAddressLabel(), FIELDS[TRADING_ADDRESS].LABEL);

    companyDetails.tradingAddressYesRadioInput().should('exist');
    cy.checkAriaLabel(companyDetails.tradingAddressYesRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} yes radio`);

    companyDetails.tradingAddressNoRadioInput().should('exist');
    cy.checkAriaLabel(companyDetails.tradingAddressNoRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} no radio`);
  });

  it('should display the company website text area', () => {
    cy.checkText(companyDetails.companyWebsiteLabel(), FIELDS[WEBSITE].LABEL);

    companyDetails.companyWebsite().should('exist');
    cy.checkAriaLabel(companyDetails.companyWebsite(), FIELDS[WEBSITE].LABEL);
  });

  it('should display the phone number text area', () => {
    cy.checkText(companyDetails.phoneNumberLabel(), FIELDS[PHONE_NUMBER].LABEL);

    cy.checkText(companyDetails.phoneNumberHint(), FIELDS[PHONE_NUMBER].HINT);

    companyDetails.phoneNumber().should('exist');
    cy.checkAriaLabel(companyDetails.phoneNumber(), FIELDS[PHONE_NUMBER].LABEL);
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
