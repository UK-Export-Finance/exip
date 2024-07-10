import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';
import { stripCommas } from '../../../../../helpers/string';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps business formBody and returns fields in correct format
 * removes commas from numbers entered as commas are valid input
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, YEARS_EXPORTING)) {
    populatedData[YEARS_EXPORTING] = stripCommas(populatedData[YEARS_EXPORTING]);
  }

  if (objectHasProperty(populatedData, EMPLOYEES_UK)) {
    populatedData[EMPLOYEES_UK] = stripCommas(populatedData[EMPLOYEES_UK]);
  }

  return populatedData;
};

export default mapSubmittedData;
