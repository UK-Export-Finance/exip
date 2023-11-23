import { Company, CompaniesHouseResponse } from '../../../../types';
import { objectHasProperty } from '../../object';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
  },
} = INSURANCE_FIELD_IDS;

/**
 * maps companyDetails formBody and returns fields in correct format
 * @param {CompaniesHouseResponse} Companies House response
 * @returns {Object} populatedData
 */
const mapCompaniesHouseData = (apiResponse: CompaniesHouseResponse): Company => {
  const { __typename, success, isActive, registeredOfficeAddress, ...data } = apiResponse;

  const populatedData = data as Company;

  /**
   * If an address is unavailable, generate an empty object.
   * Otherwise, populate an object.
   */
  if (!registeredOfficeAddress) {
    populatedData[COMPANY_ADDRESS] = {};
  } else {
    populatedData[COMPANY_ADDRESS] = {
      [ADDRESS_LINE_1]: registeredOfficeAddress[ADDRESS_LINE_1] ?? '',
      [ADDRESS_LINE_2]: registeredOfficeAddress[ADDRESS_LINE_2] ?? '',
      [CARE_OF]: registeredOfficeAddress[CARE_OF] ?? '',
      [LOCALITY]: registeredOfficeAddress[LOCALITY] ?? '',
      [REGION]: registeredOfficeAddress[REGION] ?? '',
      [POSTAL_CODE]: registeredOfficeAddress[POSTAL_CODE] ?? '',
      [COUNTRY]: registeredOfficeAddress[COUNTRY] ?? '',
      [PREMISES]: registeredOfficeAddress[PREMISES] ?? '',
    };
  }

  /**
   * Convert the COMPANY_NUMBER to a string.
   */
  populatedData[COMPANY_NUMBER] = populatedData[COMPANY_NUMBER].toString();

  /**
   * if the company has COMPANY_INCORPORATED,
   * convert COMPANY_INCORPORATED into a string.
   */
  if (objectHasProperty(populatedData, COMPANY_INCORPORATED)) {
    populatedData[COMPANY_INCORPORATED] = new Date(populatedData[COMPANY_INCORPORATED]).toISOString();
  }

  return populatedData;
};

export default mapCompaniesHouseData;
