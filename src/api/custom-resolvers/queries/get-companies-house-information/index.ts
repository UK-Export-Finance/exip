import { mapCompaniesHouseFields } from '../../../helpers/map-companies-house-fields';
import { GetCompaniesHouseInformationVariables } from '../../../types';
import getIndustrySectorNames from '../../../integrations/industry-sector';
import companiesHouse from '../../../integrations/companies-house';

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

    console.info('Getting Companies House information for ', companiesHouseNumber);

    const sanitisedRegNo = companiesHouseNumber.toString().padStart(8, '0');

    const response = await companiesHouse.get(sanitisedRegNo);

    // if no data in response or status is not 200 then return blank object
    if (!response.success || !response.data) {
      return {
        success: false,
      };
    }

    // gets all industry sectors
    const industrySectorNames = await getIndustrySectorNames.get();

    if (!industrySectorNames.success || industrySectorNames.apiError) {
      return {
        apiError: true,
        success: false,
      };
    }

    // maps response to camelCase fields
    const mappedResponse = mapCompaniesHouseFields(response.data, industrySectorNames.data);

    return {
      ...mappedResponse,
      success: true,
    };
  } catch (err) {
    console.error('Error getting companies house information', { err });
    return {
      apiError: true,
      success: false,
    };
  }
};

export default getCompaniesHouseInformation;
