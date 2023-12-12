import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import getCountryByName from '../../../../../helpers/get-country-by-name';
import { Country, RequestBody } from '../../../../../../types';

const {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * Map About goods or services fields
 * if FINAL_DESTINATION is provided, map as the country ISO code.
 * @param {Express.Request.body} formBody
 * @param {Array} countries
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody, countries?: Array<Country>): object => {
  const populatedData = formBody;

  if (countries && formBody[FINAL_DESTINATION]) {
    const submittedCountryName = formBody[FINAL_DESTINATION];

    const country = getCountryByName(countries, submittedCountryName);

    populatedData[FINAL_DESTINATION] = country?.isoCode;
  }

  return populatedData;
};

export default mapSubmittedData;
