import api from '../../api';
import { CompaniesHouseResponse } from '../../../types';

/**
 * helper which takes a companies house number and makes api call to get data from companies house.
 * runs validation on response and returns companyResponse or validation errors or apiError
 * @param {Integer} Companies House number
 * @returns {object} Mapped company, with or without an apiError flag
 */
const search = async (companyNumber: string): Promise<CompaniesHouseResponse> => {
  let response = {} as CompaniesHouseResponse;

  /**
   * Call companies house API (via our own API)
   * With the provided company number
   */
  try {
    response = await api.keystone.getCompaniesHouseInformation(companyNumber);

    return response;
  } catch (err) {
    console.error('Error posting to companies house API %O', err);
    return {
      ...response,
      apiError: true,
    };
  }
};

const companiesHouse = { search };

export default companiesHouse;
