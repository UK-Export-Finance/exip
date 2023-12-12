import { RequestBody } from '../../../../../../types';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS },
} = BUSINESS_FIELD_IDS;

/**
 * mapSubmittedData company details
 * Check form data and map any fields that need to be sent to the API in a different format or structure.
 * if HAS_DIFFERENT_TRADING_NAME is false, then set DIFFERENT_TRADING_NAME to be an empty string
 * If HAS_DIFFERENT_TRADING_NAME or TRADING_ADDRESS are empty, then delete from populatedData
 * @param {Express.Request.body} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (populatedData[HAS_DIFFERENT_TRADING_NAME] === 'false') {
    populatedData[DIFFERENT_TRADING_NAME] = '';
  }

  if (!objectHasProperty(populatedData, HAS_DIFFERENT_TRADING_NAME)) {
    delete populatedData[HAS_DIFFERENT_TRADING_NAME];
  }

  if (!objectHasProperty(populatedData, TRADING_ADDRESS)) {
    delete populatedData[TRADING_ADDRESS];
  }

  return populatedData;
};

export default mapSubmittedData;
