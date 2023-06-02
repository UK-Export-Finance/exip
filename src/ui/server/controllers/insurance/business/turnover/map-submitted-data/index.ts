import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';
import { stripCommas } from '../../../../../helpers/string';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps turnover formBody and returns fields in correct format
 * removes commas from numbers entered as commas are valid input
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, ESTIMATED_ANNUAL_TURNOVER)) {
    populatedData[ESTIMATED_ANNUAL_TURNOVER] = stripCommas(populatedData[ESTIMATED_ANNUAL_TURNOVER]);
  }

  if (objectHasProperty(populatedData, PERCENTAGE_TURNOVER)) {
    populatedData[PERCENTAGE_TURNOVER] = stripCommas(populatedData[PERCENTAGE_TURNOVER]);
  }

  return populatedData;
};

export default mapSubmittedData;
