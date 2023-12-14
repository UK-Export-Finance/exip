import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import getCountryByName from '../../../../../helpers/get-country-by-name';
import { objectHasProperty } from '../../../../../helpers/object';
import { Country, RequestBody } from '../../../../../../types';

const {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * Map About goods or services fields
 * if FINAL_DESTINATION is provided, map as the country ISO code.
 * if FINAL_DESTINATION_KNOWN is false, delete FINAL_DESTINATIN
 * @param {Express.Request.body} formBody
 * @param {Array} countries
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody, countries?: Array<Country>): object => {
  const populatedData = formBody;

  const hasFinalDestination = objectHasProperty(formBody, FINAL_DESTINATION);

  if (countries && hasFinalDestination) {
    const submittedCountryName = formBody[FINAL_DESTINATION];

    const country = getCountryByName(countries, submittedCountryName);

    populatedData[FINAL_DESTINATION] = country?.isoCode;
  }

  if (!objectHasProperty(formBody, FINAL_DESTINATION_KNOWN)) {
    delete populatedData[FINAL_DESTINATION_KNOWN];
    delete populatedData[FINAL_DESTINATION];
  }

  if (formBody[FINAL_DESTINATION_KNOWN] === 'false') {
    populatedData[FINAL_DESTINATION] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
