import { OrdnanceSurveyVariables } from '../../../types';
import ordnanceSurvey from '../../../integrations/ordnance-survey';
import { isValidPostcode } from '../../../helpers/is-valid-postcode';
import mapAndFilterAddress from '../../../helpers/map-and-filter-address';
import removeWhiteSpace from '../../../helpers/remove-white-space';

/**
 * getOrdnanceSurveyAddress
 * Checks postcode is valid
 * Calls Ordnance Survey API with postcode
 * Finds address by house name/number
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the getOrdnanceSurveyAddress mutation - postcode and houseNameOrNumber
 * @param {Object} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and addresses in an array
 */
const getOrdnanceSurveyAddress = async (root: any, variables: OrdnanceSurveyVariables) => {
  try {
    const { postcode, houseNameOrNumber } = variables;

    console.info('Getting Ordnance Survey address for postcode: %s, houseNameOrNumber: %s', postcode, houseNameOrNumber);

    const noWhitespacePostcode = removeWhiteSpace(postcode);

    // if not valid postcode then returns success false and additional flag
    if (!isValidPostcode(noWhitespacePostcode)) {
      console.error('Invalid postcode: %s', postcode);
      return {
        success: false,
        invalidPostcode: true,
      };
    }

    const response = await ordnanceSurvey.get(postcode);

    // if no data in response or status is not 200 then return blank object
    if (!response.success || !response.data) {
      return {
        success: false,
      };
    }

    // finds specific address by house name/number and returns array of mapped addresses
    const mappedAddresses = mapAndFilterAddress(houseNameOrNumber, response.data);

    // if no addresses found, then returns success false and additional flag
    if (!mappedAddresses.length) {
      return {
        success: false,
        noAddressesFound: true,
      };
    }

    return {
      addresses: mappedAddresses,
      success: true,
    };
  } catch (err) {
    console.error('Error getting Ordnance Survey address results %O', err);
    return {
      apiError: true,
      success: false,
    };
  }
};

export default getOrdnanceSurveyAddress;
