import {
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
  COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
  COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
} from '../constants/examples';
import { EXPORTER_BUSINESS as EXPORTER_BUSINESS_FIELD_IDS } from '../constants/field-ids/insurance/business';
import mockApplication from './application';
import mockSicCodes from './sic-codes';

const {
  COMPANY_HOUSE: { INDUSTRY_SECTOR_NAME, FINANCIAL_YEAR_END_DATE },
} = EXPORTER_BUSINESS_FIELD_IDS;

const baseCompany = mockApplication.EXPORTER_COMPANY;

const { financialYearEndDate, ...baseCompanyFields } = baseCompany;

const mockCompanies = {
  [COMPANIES_HOUSE_NUMBER]: {
    ...baseCompanyFields,
    companyNumber: COMPANIES_HOUSE_NUMBER,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
  },
  [COMPANIES_HOUSE_NUMBER_NO_SIC_CODE]: {
    ...baseCompanyFields,
    companyNumber: COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
    sicCodes: [],
  },
  [COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES]: {
    ...baseCompanyFields,
    companyNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
    sicCodes: [
      mockSicCodes[1].code,
      mockSicCodes[2].code,
      mockSicCodes[3].code,
      mockSicCodes[4].code,
    ],
    industrySectorNames: [
      mockSicCodes[1][INDUSTRY_SECTOR_NAME],
      mockSicCodes[2][INDUSTRY_SECTOR_NAME],
      mockSicCodes[3][INDUSTRY_SECTOR_NAME],
      mockSicCodes[4][INDUSTRY_SECTOR_NAME],
    ],
  },
  [COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE]: {
    ...baseCompanyFields,
    companyNumber: COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
  },
};

export default mockCompanies;
