import { RequestBody } from '../../../types';
import { isPopulatedArray } from '../array';

/**
 * constructPayload
 * constructs payload from requestBody
 * filters out anything which is not part of specified fieldIds
 * @param {RequestBody} requestBody
 * @param {Array<string>} fieldIds
 * @returns {object} constructed payload
 */
const constructPayload = (requestBody: RequestBody, fieldIds: Array<string>) => {
  const payload: RequestBody = {};

  if (!isPopulatedArray(fieldIds)) {
    return payload;
  }

  /**
   * loops through fieldsIds array
   * if requestBody contains the fieldId: add it to payload
   * else will add an empty string
   */
  fieldIds.forEach((fieldId) => {
    payload[fieldId] = requestBody[fieldId] ?? '';
  });

  return payload;
};

export default constructPayload;
