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
    cy.completeAndSubmitCompaniesHouseSearchForm({
      companyNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
    });

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render multiple SIC codes in the summary list', () => {
    const expectedSicCodes = [
      `${sicCodes[5].code} - ${sicCodes[5][INDUSTRY_SECTOR_NAME]}`,
      `${sicCodes[6].code} - ${sicCodes[6][INDUSTRY_SECTOR_NAME]}`,
      `${sicCodes[7].code} - ${sicCodes[7][INDUSTRY_SECTOR_NAME]}`,
    ];

    summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[0]);
    summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[1]);
    summaryList.field(COMPANY_SIC).value().contains(expectedSicCodes[2]);
  });
});
