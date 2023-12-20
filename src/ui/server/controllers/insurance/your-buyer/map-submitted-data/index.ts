import { RequestBody } from '../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';

const {
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, CONNECTION_TO_THE_BUYER_DESCRIPTION },
} = YOUR_BUYER_FIELD_IDS;

/**
 * maps connectionToTheBuyer formBody and returns fields in correct format
 * if CONNECTED_WITH_BUYER is false, then sets CONNECTION_TO_THE_BUYER_DESCRIPTION to an empty string
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (populatedData[CONNECTED_WITH_BUYER] === 'false') {
    populatedData[CONNECTION_TO_THE_BUYER_DESCRIPTION] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
