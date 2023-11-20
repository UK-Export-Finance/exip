import { RequestBody } from '../../../../../../types';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  YOUR_COMPANY: { TRADING_NAME, ALTERNATIVE_TRADING_NAME, TRADING_ADDRESS },
} = BUSINESS_FIELD_IDS;

/**
 * mapSubmittedData company details
 * Check form data and map any fields that need to be sent to the API in a different format or structure.
 * if TRADING_NAME is false, then set ALTERNATIVE_TRADING_NAME to be an empty string
 * If TRADING_NAME or TRADING_ADDRESS are empty, then delete from populatedData
 * @param {Express.Request.body} formBody
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (populatedData[TRADING_NAME] === 'false') {
    populatedData[ALTERNATIVE_TRADING_NAME] = '';
  }

  if (!objectHasProperty(populatedData, TRADING_NAME)) {
    delete populatedData[TRADING_NAME];
  }

  if (!objectHasProperty(populatedData, TRADING_ADDRESS)) {
    delete populatedData[TRADING_ADDRESS];
  }

  return populatedData;
};

export default mapSubmittedData;
