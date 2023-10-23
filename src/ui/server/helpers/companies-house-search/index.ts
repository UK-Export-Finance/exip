import api from '../../api';
import { isPopulatedArray } from '../array';
import companyHouseResponseValidation from './validation/companies-house-response';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { RequestBody, CompanyHouseResponse } from '../../../types';

const {
  ELIGIBILITY: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

/**
 * helper which takes formBody containing companies house number
 * runs validation and makes api call to keystone getCompaniesHouseInformation
 * runs validation on response and returns companyResponse or validation errors or apiError
 * @param {RequestBody} formBody
 * @returns {object} validationErrors, apiError flag, companiesHouseNumber and companyResponse
 */
const search = async (formBody: RequestBody) => {
  const { [COMPANY_NUMBER]: companyNumber } = formBody;

  let company = {} as CompanyHouseResponse;

  /**
   * if a company number is provided,
   * Call companies house API (via our own API)
   */
  if (companyNumber) {
    try {
      company = await api.keystone.getCompaniesHouseInformation(companyNumber);
    } catch (err) {
      console.error('Error posting to companies house API %O', err);
      return {
        apiError: true,
        companyNumber,
        validationErrors: {},
      };
    }
  }

  // if company exists and has a value
  if (company && isPopulatedArray(Object.keys(company))) {
    // if apiError is set to true, return as redirects to error page
    if (company?.apiError) {
      return {
        apiError: true,
        companyNumber,
        validationErrors: {},
      };
    }

    // checks that success flag is not false
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return {
        validationErrors: responseValidationErrors,
        companyNumber,
      };
    }

    return {
      company,
      companyNumber,
      // validationErrors: {},
    };
  }

  return {
    apiError: true,
    companyNumber,
    validationErrors: {},
  };
};

const companiesHouse = { search };

export default companiesHouse;
