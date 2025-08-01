import sanitiseCompaniesHouseNumber from '../../../helpers/sanitise-companies-house-number';
import companiesHouse from '../../../integrations/companies-house';
import industrySectorNames from '../../../integrations/industry-sector';
import { mapCompaniesHouseFields } from '../../../helpers/map-companies-house-fields';
import { GetCompaniesHouseInformationVariables } from '../../../types';

/**
 * getCompaniesHouseInformation
 * Get companies house information
 * @param {object} root: GraphQL root variables
 * @param {object} variables: GraphQL variables for the GetCompaniesHouseInformation mutation
 * @returns {Promise<object>} Object with success flag and mapped companies house response
 */
const getCompaniesHouseInformation = async (root: any, variables: GetCompaniesHouseInformationVariables) => {
  try {
    const { companiesHouseNumber } = variables;

    console.info('Getting Companies House information for %s', companiesHouseNumber);

    const sanitisedNumber = sanitiseCompaniesHouseNumber(companiesHouseNumber);

    const response = await companiesHouse.get(sanitisedNumber);

    // if no data in response or status is not 200 then return an empty object
    if (!response.success || !response.data) {
      return {
        success: false,
        notFound: response.notFound,
      };
    }

    // gets all industry sectors
    const industrySectors = await industrySectorNames.get();

    if (!industrySectors.success || industrySectors.apiError) {
      return {
        apiError: true,
        success: false,
      };
    }

    // maps response to camelCase fields
    const mappedResponse = mapCompaniesHouseFields(response.data, industrySectors.data);

    return {
      ...mappedResponse,
      success: true,
    };
  } catch (error) {
    console.error('Error getting companies house information %o', error);

    return {
      apiError: true,
      success: false,
    };
  }
};

export default getCompaniesHouseInformation;
