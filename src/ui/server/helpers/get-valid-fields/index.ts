import { isEmptyString } from '../string';
import { ObjectType } from '../../../types';

/**
 * getValidFields
 * Strip invalid fields from submitted form data
 * @param {ObjectType} Form data
 * @param {ObjectType} Errors list
 * @returns {object} Form data with invalid fields removed
 */
const getValidFields = (formData: ObjectType, errorList: ObjectType) => {
  const fieldsWithErrors = Object.keys(errorList);

  const validFields: ObjectType = {};

  Object.keys(formData).forEach((fieldName) => {
    const fieldValue = formData[fieldName];

    /**
     * Do not return fields that are in the errors,
     * but return fields that are empty - a user might have deleted an answer.
     */
    if (!fieldsWithErrors.includes(fieldName) || isEmptyString(fieldValue)) {
      validFields[fieldName] = fieldValue;
    }
  });

  return validFields;
};

export default getValidFields;
