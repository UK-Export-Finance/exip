import { companyDetails } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
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

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Company details page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.assertUrl(url);
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
      currentHref: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`,
      backLink: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      lightHouseThresholds: {
        'best-practices': 93,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
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
      cy.checkText(companyDetails.companiesHouseNoNumber(), CONTENT_STRINGS.NO_COMPANIES_HOUSE_NUMBER);
    });

    it('should display the trading name radios', () => {
      cy.checkText(companyDetails.tradingNameLabel(), FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputYesAriaLabel(FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputNoAriaLabel(FIELDS[TRADING_NAME].LABEL);
    });

    it('should display the trading address radios', () => {
      cy.checkText(companyDetails.tradingAddressLabel(), FIELDS[TRADING_ADDRESS].LABEL);

      cy.checkAriaLabel(companyDetails.tradingAddressYesRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} Yes`);

      cy.checkAriaLabel(companyDetails.tradingAddressNoRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} No`);
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
});
