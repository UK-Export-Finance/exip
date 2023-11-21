import api from '../../api';
import { isPopulatedArray } from '../array';
import { CompaniesHouseResponse } from '../../../types';

/**
 * helper which takes formBody containing companies house number
 * runs validation and makes api call to keystone getCompaniesHouseInformation
 * runs validation on response and returns companyResponse or validation errors or apiError
 * @param {CompaniesHouseResponse} Companies House response
 * @returns {object} apiError flag, mapped company
 */
const search = async (company: CompaniesHouseResponse) => {
  const { companyNumber } = company;

  let mappedCompany = {} as CompaniesHouseResponse;

  /**
   * if a company number is provided,
   * Call companies house API (via our own API)
   */
  if (companyNumber) {
    try {
      mappedCompany = await api.keystone.getCompaniesHouseInformation(companyNumber);
    } catch (err) {
      console.error('Error posting to companies house API %O', err);
      return {
        apiError: true,
        companyNumber,
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
      };
    }

    if (mappedCompany.notFound) {
      return {
        notFound: true,
      };
    }

    return {
      company: mappedCompany,
      companyNumber,
    };
  }

  return {
    apiError: true,
    companyNumber
  };
};

const companiesHouse = { search };

export default companiesHouse;
