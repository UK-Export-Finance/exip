import {
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_COMPANY_WITH_SPECIAL_CHARACTER_NAME,
  COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
  COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
  COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
} from '../constants/examples';
import { INSURANCE_FIELD_IDS } from '../constants/field-ids/insurance';
import mockSicCodes from './sic-codes';

const {
  COMPANIES_HOUSE: {
    COMPANY_NUMBER,
    COMPANY_NAME,
    COMPANY_INCORPORATED,
    COMPANY_ADDRESS,
    COMPANY_SIC,
    INDUSTRY_SECTOR_NAME,
    INDUSTRY_SECTOR_NAMES,
    FINANCIAL_YEAR_END_DATE,
  },
} = INSURANCE_FIELD_IDS;

const baseCompany = {
  [COMPANY_NUMBER]: COMPANIES_HOUSE_NUMBER,
  [COMPANY_NAME]: 'DHG PROPERTY FINANCE LIMITED',
  [COMPANY_INCORPORATED]: '2014-04-10T00:00:00.000Z',
  [COMPANY_ADDRESS]: {
    addressLine1: '13 Clos Hector',
    careOf: '',
    locality: 'Cardiff',
    region: 'South Glamorgan',
    postalCode: 'CF24 2HL',
    country: '',
    premises: '',
  },
  [COMPANY_SIC]: [mockSicCodes[0].code],
  [INDUSTRY_SECTOR_NAMES]: [mockSicCodes[0][INDUSTRY_SECTOR_NAME]],
  [FINANCIAL_YEAR_END_DATE]: '2023-07-31T00:00:00.000Z',
};

const companyNameSpecialCharacter = {
  [COMPANY_NUMBER]: COMPANIES_HOUSE_NUMBER_COMPANY_WITH_SPECIAL_CHARACTER_NAME,
  [COMPANY_NAME]: 'STEVENS, FOX & CO. LIMITED',
};

const mockCompanies = {
  [COMPANIES_HOUSE_NUMBER]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
  },
  [COMPANIES_HOUSE_NUMBER_COMPANY_WITH_SPECIAL_CHARACTER_NAME]: companyNameSpecialCharacter,
  [COMPANIES_HOUSE_NUMBER_NO_SIC_CODE]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
    sicCodes: [],
  },
  [COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
    [FINANCIAL_YEAR_END_DATE]: baseCompany[FINANCIAL_YEAR_END_DATE],
    sicCodes: [mockSicCodes[1].code, mockSicCodes[2].code, mockSicCodes[3].code, mockSicCodes[4].code],
    industrySectorNames: [
      mockSicCodes[1][INDUSTRY_SECTOR_NAME],
      mockSicCodes[2][INDUSTRY_SECTOR_NAME],
      mockSicCodes[3][INDUSTRY_SECTOR_NAME],
      mockSicCodes[4][INDUSTRY_SECTOR_NAME],
    ],
  },
  [COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE]: {
    ...baseCompany,
    companyNumber: COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
    [COMPANY_NAME]: 'EP CAPITAL PARTNERS LLP NO 16',
  },
};

export default mockCompanies;
