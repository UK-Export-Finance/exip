import { format } from 'date-fns';
import { companyDetails } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials/insurance';
import { summaryList } from '../../../../../../pages/shared';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import {
  ROUTES, COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_NO_SIC_CODE, COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES, DATE_FORMAT,
} from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import application from '../../../../../../fixtures/application';
import sicCodes from '../../../../../../fixtures/sic-codes';
import { DEFAULT } from '../../../../../../content-strings';

const { ROOT } = ROUTES.INSURANCE;

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NAME,
      COMPANY_ADDRESS,
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      COMPANY_SIC,
      INDUSTRY_SECTOR_NAME,
      INDUSTRY_SECTOR_NAMES,
      SUMMARY_LIST,
    },
    YOUR_COMPANY: { ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const SUMMARY_LIST_FIELDS = FIELDS[SUMMARY_LIST];

const { taskList } = partials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Companies house number page', () => {
  let referenceNumber;
  let companiesHouseNumberUrl;
  let companyDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      companiesHouseNumberUrl = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
      companyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.assertUrl(companiesHouseNumberUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`Companies house number with a single SIC code (${COMPANIES_HOUSE_NUMBER})`, () => {
    beforeEach(() => {
      cy.navigateToUrl(companiesHouseNumberUrl);

      const companyNumber = COMPANIES_HOUSE_NUMBER;

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber });
    });

    it('should display the companies house details summary list', () => {
      cy.assertUrl(companyDetailsUrl);

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(summaryList.field(COMPANY_NUMBER).key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(summaryList.field(COMPANY_NUMBER).value(), COMPANIES_HOUSE_NUMBER);

      cy.checkText(summaryList.field(COMPANY_NAME).key(), SUMMARY_LIST_FIELDS.COMPANY_NAME.text);

      cy.checkText(summaryList.field(COMPANY_NAME).value(), application.EXPORTER_COMPANY[COMPANY_NAME]);

      cy.checkText(summaryList.field(COMPANY_ADDRESS).key(), SUMMARY_LIST_FIELDS.COMPANY_ADDRESS.text);

      summaryList.field(COMPANY_ADDRESS).value().contains(application.EXPORTER_COMPANY[ADDRESS].addressLine1);
      summaryList.field(COMPANY_ADDRESS).value().contains(application.EXPORTER_COMPANY[ADDRESS].locality);
      summaryList.field(COMPANY_ADDRESS).value().contains(application.EXPORTER_COMPANY[ADDRESS].region);
      summaryList.field(COMPANY_ADDRESS).value().contains(application.EXPORTER_COMPANY[ADDRESS].postalCode);

      cy.checkText(summaryList.field(COMPANY_INCORPORATED).key(), SUMMARY_LIST_FIELDS.COMPANY_INCORPORATED.text);

      const timestamp = application.EXPORTER_COMPANY[COMPANY_INCORPORATED];
      const expectedDate = format(new Date(timestamp), DATE_FORMAT.DEFAULT);

      cy.checkText(summaryList.field(COMPANY_INCORPORATED).value(), expectedDate);

      cy.checkText(summaryList.field(COMPANY_SIC).key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      const expectedSicCodeText = `${application.EXPORTER_COMPANY[COMPANY_SIC][0]} - ${application.EXPORTER_COMPANY[INDUSTRY_SECTOR_NAMES][0]}`;
      cy.checkText(summaryList.field(COMPANY_SIC).value(), expectedSicCodeText);
    });
  });

  describe(`Companies house number with no SIC code (${COMPANIES_HOUSE_NUMBER_NO_SIC_CODE})`, () => {
    beforeEach(() => {
      cy.navigateToUrl(companiesHouseNumberUrl);

      const companyNumber = COMPANIES_HOUSE_NUMBER_NO_SIC_CODE;

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber });
    });

    it(`should display the companies house details with a "${DEFAULT.EMPTY}" for sic code`, () => {
      cy.assertUrl(companyDetailsUrl);

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(summaryList.field(COMPANY_NUMBER).key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(summaryList.field(COMPANY_NUMBER).value(), COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);

      cy.checkText(summaryList.field(COMPANY_SIC).key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(summaryList.field(COMPANY_SIC).value(), DEFAULT.EMPTY);
    });
  });

  describe(`Companies house number with multiple SIC codes (${COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES})`, () => {
    beforeEach(() => {
      cy.navigateToUrl(companiesHouseNumberUrl);

      const companyNumber = COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES;

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber });
    });

    it('should display all the sic codes in the summary list', () => {
      cy.assertUrl(companyDetailsUrl);

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      const expectedSicCodes = [
        `${sicCodes[1].code} - ${sicCodes[1][INDUSTRY_SECTOR_NAME]}`,
        `${sicCodes[2].code} - ${sicCodes[2][INDUSTRY_SECTOR_NAME]}`,
        `${sicCodes[3].code} - ${sicCodes[3][INDUSTRY_SECTOR_NAME]}`,
        `${sicCodes[4].code} - ${sicCodes[4][INDUSTRY_SECTOR_NAME]}`,
      ];

      summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[0]);
      summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[1]);
      summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[2]);
      summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[3]);
    });
  });
});
