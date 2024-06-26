import { format } from 'date-fns';
import { summaryList } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME, DATE_FORMAT } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { FIELDS } from '../../content-strings';
import mockCompanies from '../../fixtures/companies';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_NAME,
    COMPANY_INCORPORATED,
    COMPANY_SIC,
    INDUSTRY_SECTOR_NAMES,
  },
} = INSURANCE_FIELD_IDS;

const mockCompany = mockCompanies[COMPANIES_HOUSE_NUMBER];

/**
 * assertCompaniesHouseSummaryList
 * Object structured tests for a Companies House summary list.
 */
const assertCompaniesHouseSummaryList = {
  number: () => {
    cy.checkText(summaryList.field(COMPANY_NUMBER).key(), FIELDS[COMPANY_NUMBER].SUMMARY.TITLE);

    cy.checkText(summaryList.field(COMPANY_NUMBER).value(), mockCompany[COMPANY_NUMBER]);
  },
  name: ({ differentCompanyWithSpecialCharacters = false }) => {
    cy.checkText(summaryList.field(COMPANY_NAME).key(), FIELDS[COMPANY_NAME].SUMMARY.TITLE);

    if (differentCompanyWithSpecialCharacters) {
      cy.checkText(summaryList.field(COMPANY_NAME).value(), mockCompanies[COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME][COMPANY_NAME]);
    } else {
      cy.checkText(summaryList.field(COMPANY_NAME).value(), mockCompany[COMPANY_NAME]);
    }
  },
  address: () => {
    cy.checkText(summaryList.field(COMPANY_ADDRESS).key(), FIELDS[COMPANY_ADDRESS].SUMMARY.TITLE);

    summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].addressLine1);
    summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].locality);
    summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].region);
    summaryList.field(COMPANY_ADDRESS).value().contains(mockCompany[COMPANY_ADDRESS].postalCode);
  },
  incorporated: () => {
    cy.checkText(summaryList.field(COMPANY_INCORPORATED).key(), FIELDS[COMPANY_INCORPORATED].SUMMARY.TITLE);

    const timestamp = mockCompany[COMPANY_INCORPORATED];
    const expectedDate = format(new Date(timestamp), DATE_FORMAT.DEFAULT);

    cy.checkText(summaryList.field(COMPANY_INCORPORATED).value(), expectedDate);
  },
  sicCodes: () => {
    cy.checkText(summaryList.field(COMPANY_SIC).key(), FIELDS[COMPANY_SIC].SUMMARY.TITLE);

    const expectedSicCodeValue = `${mockCompany[COMPANY_SIC][0]} - ${mockCompany[INDUSTRY_SECTOR_NAMES][0]}`;

    cy.checkText(summaryList.field(COMPANY_SIC).value(), expectedSicCodeValue);
  },
};

export default assertCompaniesHouseSummaryList;
