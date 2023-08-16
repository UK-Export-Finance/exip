import { companyDetails } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const { ROOT } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS;

const {
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
    PHONE_NUMBER,
  },
  COMPANY_HOUSE: {
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    COMPANY_SIC,
    INDUSTRY_SECTOR_NAME,
    SUMMARY_LIST,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const SUMMARY_LIST_FIELDS = FIELDS[SUMMARY_LIST];

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Company details page - As an Exporter I want to enter my business\'s CRN So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeCompaniesHouseNumberForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

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
      backLink: `${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`,
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

    it('should display the companies house summary list', () => {
      companyDetails.yourBusinessSummaryList().should('exist');

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].key(), SUMMARY_LIST_FIELDS.COMPANY_NAME.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].value(), application.EXPORTER_COMPANY[COMPANY_NAME]);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_ADDRESS].key(), SUMMARY_LIST_FIELDS.COMPANY_ADDRESS.text);

      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].addressLine1);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].locality);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].region);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].postalCode);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].key(), SUMMARY_LIST_FIELDS.COMPANY_INCORPORATED.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].value(), application.EXPORTER_COMPANY[COMPANY_INCORPORATED]);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), `${application.EXPORTER_COMPANY[COMPANY_SIC][0]} - ${application.EXPORTER_COMPANY[INDUSTRY_SECTOR_NAME][0]}`);
    });

    it('should display the trading name radios', () => {
      cy.checkText(companyDetails[TRADING_NAME].label(), FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputYesAriaLabel(FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputNoAriaLabel(FIELDS[TRADING_NAME].LABEL);
    });

    it('should display the trading address radios', () => {
      cy.checkText(companyDetails[TRADING_ADDRESS].label(), FIELDS[TRADING_ADDRESS].LABEL);

      cy.checkAriaLabel(companyDetails[TRADING_ADDRESS].yesRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} Yes`);

      cy.checkAriaLabel(companyDetails[TRADING_ADDRESS].noRadioInput(), `${FIELDS[TRADING_ADDRESS].LABEL} No`);
    });

    it('should display the company website text area', () => {
      cy.checkText(companyDetails[WEBSITE].label(), FIELDS[WEBSITE].LABEL);

      companyDetails[WEBSITE].input().should('exist');
      cy.checkAriaLabel(companyDetails[WEBSITE].input(), FIELDS[WEBSITE].LABEL);
    });

    it('should display the phone number text area', () => {
      cy.checkText(companyDetails[PHONE_NUMBER].label(), FIELDS[PHONE_NUMBER].LABEL);

      cy.checkText(companyDetails[PHONE_NUMBER].hint(), FIELDS[PHONE_NUMBER].HINT);

      companyDetails[PHONE_NUMBER].input().should('exist');
      cy.checkAriaLabel(companyDetails[PHONE_NUMBER].input(), FIELDS[PHONE_NUMBER].LABEL);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });
});
