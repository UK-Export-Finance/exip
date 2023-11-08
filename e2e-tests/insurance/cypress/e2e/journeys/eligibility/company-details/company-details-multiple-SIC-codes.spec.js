import { summaryList } from '../../../../../../pages/shared';
import { COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES } from '../../../../../../constants/examples';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import sicCodes from '../../../../../../fixtures/sic-codes';

const {
  START,
  ELIGIBILITY: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: {
    COMPANY_SIC, INDUSTRY_SECTOR_NAME,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies details page - company with multiple SIC codes - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${COMPANY_DETAILS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES });

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render multiple SIC codes in the summary list', () => {
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
