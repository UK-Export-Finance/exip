import api from '../../api';
import companiesHouseValidation from './validation';
import { isPopulatedArray } from '../array';
import companyHouseResponseValidation from './validation/companies-house-response';
import { RequestBody, CompanyHouseResponse } from '../../../types';
import { FIELD_IDS } from '../../constants';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

/**
 * helper which takes formBody containing companies house number
 * runs validation and makes api call to keystone getCompaniesHouseInformation
 * runs validation on response and returns companyResponse or validation errors or apiError
 * @param {RequestBody} formBody
 * @returns {object} validationErrors, apiError flag, companiesHouseNumber and companyResponse
 */
const search = async (formBody: RequestBody) => {
  const { [COMPANIES_HOUSE_NUMBER]: companiesHouseNumber } = formBody;

  // checks input is correctly formatted
  const validationErrors = companiesHouseValidation(formBody);

  if (validationErrors) {
    return {
      validationErrors,
      companiesHouseNumber,
    };
  }

  let company = {} as CompanyHouseResponse;

  // if number provided, then sends to companies house API as keystone query
  if (companiesHouseNumber) {
    try {
      company = await api.keystone.getCompaniesHouseInformation(companiesHouseNumber);
    } catch (err) {
      console.error('Error posting to companies house API %O', err);
      return {
        apiError: true,
        companiesHouseNumber,
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
        companiesHouseNumber,
        validationErrors: {},
      };
    }

    // checks that success flag is not false
    const responseValidationErrors = companyHouseResponseValidation(company);

    if (responseValidationErrors) {
      return {
        validationErrors: responseValidationErrors,
        companiesHouseNumber,
      };
    }

    return {
      company,
      companiesHouseNumber,
      validationErrors: {},
    };
  }

  return {
    apiError: true,
    companiesHouseNumber,
    validationErrors: {},
  };
};

const companiesHouse = { search };

export default companiesHouse;
