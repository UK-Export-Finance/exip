import { companyDetails } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

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

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Company details page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`,
      backLink: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      lightHouseThresholds: {
        'best-practices': 93,
      },
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStart);
  });

  it('renders a heading caption', () => {
    cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
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

  it('should display save and go back button', () => {
    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
