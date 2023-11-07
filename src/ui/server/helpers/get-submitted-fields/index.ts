import { isPopulatedArray } from '../array';
import { ApplicationFlat } from '../../../types';
import isFieldFalseOrZero from '../is-field-false-or-zero';

/**
 * hasSubmittedField
 * Note: this assumes that any data in submitted fields is a valid answer
 * E.g, A false boolean or zero is a valid answer.
 * @param {Object} submittedData Submitted application data
 * @param {String} field ID of the field to get
 * @returns {Boolean} True if the field is in submittedData.
 */
export const hasSubmittedField = (submittedData: ApplicationFlat, fieldId: string) => {
  const fieldValue = submittedData[fieldId];

  // if array, check it is not empty array
  if (isPopulatedArray(fieldValue)) {
    return true;
  }

  const hasFieldValue = fieldValue || isFieldFalseOrZero(fieldValue);
  const isArray = Array.isArray(fieldValue);

  if (hasFieldValue && !isArray) {
    return true;
  }

  return false;
};

/**
 * getSubmittedFields
 * @param {Array} fields Array of field ids
 * @param {Object} submittedData Submitted application data
 * @returns {Array} array of submitted field ids.
 */
export const getSubmittedFields = (fields: Array<string>, submittedData: ApplicationFlat): Array<string> => {
  const submittedFields = [] as Array<string>;

  fields.forEach((fieldId) => {
    if (hasSubmittedField(submittedData, fieldId)) {
      submittedFields.push(fieldId);
    }
  });

  return submittedFields;
};
