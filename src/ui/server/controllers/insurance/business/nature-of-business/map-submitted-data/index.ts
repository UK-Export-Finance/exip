import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';
import removeCommasFromString from '../../../../../helpers/remove-commas-from-string';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps natureOfBusiness formBody and returns fields in correct format
 * removes commas from numbers entered as commas are valid input
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { __typename, _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, YEARS_EXPORTING)) {
    populatedData[YEARS_EXPORTING] = removeCommasFromString(populatedData[YEARS_EXPORTING]);
  }

  if (objectHasProperty(populatedData, EMPLOYEES_UK)) {
    populatedData[EMPLOYEES_UK] = removeCommasFromString(populatedData[EMPLOYEES_UK]);
  }

  if (objectHasProperty(populatedData, EMPLOYEES_INTERNATIONAL)) {
    populatedData[EMPLOYEES_INTERNATIONAL] = removeCommasFromString(populatedData[EMPLOYEES_INTERNATIONAL]);
  }

  return populatedData;
};

export default mapSubmittedData;
