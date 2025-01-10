import { OrdnanceSurveyVariables } from '../../../types';
import ordnanceSurvey from '../../../integrations/ordnance-survey';
import { isValidPostcode } from '../../../helpers/is-valid-postcode';
import mapAndFilterOrdnanceSurveyAddresses from '../../../helpers/map-and-filter-ordnance-survey-addresses';
import removeWhiteSpace from '../../../helpers/remove-white-space';

/**
 * getOrdnanceSurveyAddresses
 * Checks postcode is valid
 * Calls Ordnance Survey API with postcode
 * Finds address by house name/number
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the getOrdnanceSurveyAddresses mutation - postcode and houseNameOrNumber
 * @returns {Promise<Object>} Object with success flag and addresses in an array
 */
const getOrdnanceSurveyAddresses = async (root: any, variables: OrdnanceSurveyVariables) => {
  try {
    const { postcode, houseNameOrNumber } = variables;

    console.info('Getting Ordnance Survey addresses for postcode: %s, houseNameOrNumber: %s', postcode, houseNameOrNumber);

    const noWhitespacePostcode = removeWhiteSpace(postcode);

    /**
     * If the postcode is invalid,
     * return success=false and an additional flag
     */
    if (!isValidPostcode(noWhitespacePostcode)) {
      console.error('Invalid postcode: %s', postcode);

      return {
        success: false,
        invalidPostcode: true,
      };
    }

    const response = await ordnanceSurvey.get(postcode);

    /**
     * If there is no success response, or no data,
     * return success=false
     */
    if (!response.success || !response.data) {
      return {
        success: false,
      };
    }

    /**
     * The main Ordnance Survey data is in uppercase.
     * Therefore we need to search for the house number/name in uppercase.
     */
    const uppercaseHouseNameOrNumber = houseNameOrNumber.toUpperCase();

    // Map and filter addresses with the provided house name/number
    const mappedAddresses = mapAndFilterOrdnanceSurveyAddresses(response.data, uppercaseHouseNameOrNumber);

    /**
     * if no addresses are found,
     * return success=false and additional flag
     */
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
  } catch (error) {
    console.error('Error getting Ordnance Survey addresses results %o', error);

    return {
      apiError: true,
      success: false,
    };
  }
};

export default getOrdnanceSurveyAddresses;
