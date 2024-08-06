import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import getCountryByIsoCode from '../../../../../helpers/get-country-by-iso-code';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';
import { EXPORT_CONTRACT_AWARD_METHOD } from '../../../../../constants';
import { Country, RequestBody } from '../../../../../../types';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
} = FIELD_IDS;

const { DB_ID: OTHER_DB_ID } = EXPORT_CONTRACT_AWARD_METHOD.OTHER;

/**
 * mapSubmittedData
 * Map "export contract" related data for the following forms:
 * - "How was the contract awarded"
 * - "About goods or services"
 * 1) if AWARD_METHOD is an empty string, delete the field.
 * 2) if AWARD_METHOD is provided, map as a KeystoneJS connect object with ID relationship.
 * 3) if FINAL_DESTINATION is provided, map as the country ISO code.
 * 4) if FINAL_DESTINATION_KNOWN is false, delete FINAL_DESTINATION.
 * @param {RequestBody} formBody
 * @param {Array<Country>} countries
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody, countries?: Array<Country>): object => {
  const populatedData = formBody;

  /**
   * If AWARD_METHOD is an empty string,
   * delete the field.
   */
  if (isEmptyString(formBody[AWARD_METHOD])) {
    delete populatedData[AWARD_METHOD];
  }

  if (objectHasProperty(populatedData, AWARD_METHOD)) {
    populatedData[AWARD_METHOD] = {
      connect: {
        id: formBody[AWARD_METHOD],
      },
    };
  }

  const hasFinalDestination = objectHasProperty(formBody, FINAL_DESTINATION);

  if (countries && hasFinalDestination) {
    const submittedCountryName = formBody[FINAL_DESTINATION];

    const country = getCountryByIsoCode(countries, submittedCountryName);

    populatedData[FINAL_DESTINATION] = country?.isoCode;
  }

  if (!objectHasProperty(formBody, FINAL_DESTINATION_KNOWN)) {
    delete populatedData[FINAL_DESTINATION_KNOWN];
    delete populatedData[FINAL_DESTINATION];
  }

  if (formBody[FINAL_DESTINATION_KNOWN] === 'false') {
    populatedData[FINAL_DESTINATION] = '';
  }

  /**
   * if AWARD_METHOD is not OTHER_AWARD_METHOD's database id and OTHER_AWARD_METHOD is populated,
   * then set data for OTHER_AWARD_METHOD to an empty string.
   */
  if (formBody[AWARD_METHOD]?.connect?.id !== OTHER_DB_ID && objectHasProperty(populatedData, OTHER_AWARD_METHOD)) {
    populatedData[OTHER_AWARD_METHOD] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
