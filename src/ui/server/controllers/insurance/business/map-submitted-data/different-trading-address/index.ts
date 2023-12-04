import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS, FULL_ADDRESS },
} = FIELD_IDS.INSURANCE;

/**
 * maps business formBody and returns fields in correct format
 * removes commas from numbers entered as commas are valid input
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, ALTERNATIVE_TRADING_ADDRESS)) {
    populatedData[FULL_ADDRESS] = populatedData[ALTERNATIVE_TRADING_ADDRESS];
  }

  delete populatedData[ALTERNATIVE_TRADING_ADDRESS];

  return populatedData;
};

export default mapSubmittedData;
