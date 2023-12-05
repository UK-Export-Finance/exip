import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS, FULL_ADDRESS },
} = FIELD_IDS.INSURANCE;

/**
 * maps differentTradingAddress formBody and returns fields in correct format
 * changes ALTERNATIVE_TRADING_ADDRESS to FULL_ADDRESS so can be handled by API
 * removes ALTERNATIVE_TRADING_ADDRESS value
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
