import { companyDetails } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_NO_SIC_CODE, COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
} from '../../../../../../constants';
import application from '../../../../../../fixtures/application';
import { DEFAULT } from '../../../../../../content-strings';

const { ROOT } = ROUTES.INSURANCE;

const {
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

context('Insurance - Your business - Companies house number page validation', () => {
  let referenceNumber;
  let url;
  let companyDetailsUrl;

  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
      companyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANIES_HOUSE_NUMBER, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompaniesHouseSearchForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });
    });

    it('should display the companies house details summary list', () => {
      cy.assertUrl(companyDetailsUrl);

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
  });

  describe('Companies house number with no sic code', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompaniesHouseSearchForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER_NO_SIC_CODE });
    });

    it(`should display the companies house details with a ${DEFAULT.EMPTY} for sic code`, () => {
      cy.assertUrl(companyDetailsUrl);

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), DEFAULT.EMPTY);
    });
  });

  describe('Companies house number with multiple sic codes', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompaniesHouseSearchForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES });
    });

    it('should display all the sic codes in the summary list', () => {
      cy.assertUrl(companyDetailsUrl);

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('01440 - Raising of camels and camelids');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('13100 - Preparation and spinning of textile fibres');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('55209 - Other holiday and other collective accommodation');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('56102 - Unlicensed restaurants and cafes');
    });
  });
});
