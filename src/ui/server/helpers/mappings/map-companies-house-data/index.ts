import { RequestBody } from '../../../../types';
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
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapCompaniesHouseData = (formBody: RequestBody): object => {
  const { success, apiError, ...populatedData } = formBody;

  if (!populatedData[COMPANY_ADDRESS]) {
    // create empty companyAddress if not part of request
    populatedData[COMPANY_ADDRESS] = {};
  } else {
    const { registeredOfficeAddress } = populatedData;

    // populates companyAddress for db with value or empty string if null
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

  if (objectHasProperty(populatedData, COMPANY_NUMBER)) {
    populatedData[COMPANY_NUMBER] = populatedData[COMPANY_NUMBER].toString();
  }

  if (objectHasProperty(populatedData, COMPANY_INCORPORATED)) {
    // convert from string to timestamp
    populatedData[COMPANY_INCORPORATED] = new Date(populatedData[COMPANY_INCORPORATED]).toISOString();
  }

  return populatedData;
};

export default mapCompaniesHouseData;
