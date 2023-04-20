import axios from 'axios';
import dotenv from 'dotenv';
import { mapCompaniesHouseFields } from '../../helpers/map-companies-house-fields';
import { GetCompaniesHouseInformationVariables } from '../../types';

dotenv.config();

const username: any = process.env.COMPANIES_HOUSE_API_KEY;
const companiesHouseURL: any = process.env.COMPANIES_HOUSE_API_URL;

/**
 * getCompaniesHouseInformation
 * Get companies house information
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the GetCompaniesHouseInformation mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and mapped companies house response
 */
const getCompaniesHouseInformation = async (root: any, variables: GetCompaniesHouseInformationVariables) => {
  try {
    const { companiesHouseNumber } = variables;

    console.info('Calling Companies House API for ', companiesHouseNumber);

    const sanitisedRegNo = companiesHouseNumber.toString().padStart(8, '0');

    const response = await axios({
      method: 'get',
      url: `${companiesHouseURL}/company/${sanitisedRegNo}`,
      auth: { username, password: '' },
      validateStatus(status) {
        const acceptableStatus = [200, 404];
        return acceptableStatus.includes(status);
      },
    });

    // if no data in response or status is not 200 then return blank object
    if (!response.data || response.status === 404) {
      return {
        success: false,
      };
    }

    // maps response to camelCase fields
    const mappedResponse = mapCompaniesHouseFields(response.data);

    return {
      ...mappedResponse,
      success: true,
    };
  } catch (err) {
    console.error('Error calling Companies House API', { err });
    return {
      apiError: true,
      success: false,
    };
  }
};

export default getCompaniesHouseInformation;
