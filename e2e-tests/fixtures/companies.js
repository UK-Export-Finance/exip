import {
  COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_NO_SIC_CODE, COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
} from '../constants/examples';
import { EXPORTER_BUSINESS as EXPORTER_BUSINESS_FIELD_IDS } from '../constants/field-ids/insurance/business';
import mockApplication from './application';
import mockSicCodes from './sic-codes';

const {
  COMPANY_HOUSE: { INDUSTRY_SECTOR_NAME },
} = EXPORTER_BUSINESS_FIELD_IDS;

const baseCompany = mockApplication.EXPORTER_COMPANY;

const mockCompanies = {
  [COMPANIES_HOUSE_NUMBER]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER,
  },
  [COMPANIES_HOUSE_NUMBER_NO_SIC_CODE]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
    sicCodes: [],
  },
  [COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
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
};

export default mockCompanies;
