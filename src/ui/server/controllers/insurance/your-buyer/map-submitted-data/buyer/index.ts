import { RequestBody } from '../../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  COMPANY_OR_ORGANISATION: { CAN_CONTACT_BUYER },
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
  TRADED_WITH_BUYER,
} = YOUR_BUYER_FIELD_IDS;

/**
 * maps connectionToTheBuyer formBody and returns fields in correct format
 * if radios do not have a value, then should be deleted from populatedData
 * if CONNECTION_WITH_BUYER is false, then sets CONNECTION_WITH_BUYER_DESCRIPTION to an empty string
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (!objectHasProperty(populatedData, CAN_CONTACT_BUYER)) {
    delete populatedData[CAN_CONTACT_BUYER];
  }

  if (!objectHasProperty(populatedData, CONNECTION_WITH_BUYER)) {
    delete populatedData[CONNECTION_WITH_BUYER];
  }

  if (!objectHasProperty(populatedData, TRADED_WITH_BUYER)) {
    delete populatedData[TRADED_WITH_BUYER];
  }

  if (populatedData[CONNECTION_WITH_BUYER] === 'false') {
    populatedData[CONNECTION_WITH_BUYER_DESCRIPTION] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
