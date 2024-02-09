import { RequestBody } from '../../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;
const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

/**
 * maps connectionToTheBuyer formBody and returns fields in correct format
 * if radios do not have a value, then should be deleted from populatedData
 * if CONNECTION_WITH_BUYER is false, then sets CONNECTION_WITH_BUYER_DESCRIPTION to an empty string
 * if HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER is false, then sets PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER to an empty string
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (!objectHasProperty(populatedData, CONNECTION_WITH_BUYER)) {
    delete populatedData[CONNECTION_WITH_BUYER];
  }

  if (populatedData[CONNECTION_WITH_BUYER] === 'false') {
    populatedData[CONNECTION_WITH_BUYER_DESCRIPTION] = '';
  }

  if (!objectHasProperty(populatedData, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER)) {
    delete populatedData[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];
  }

  if (populatedData[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] === 'false') {
    populatedData[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
