import { RequestBody } from '../../../types';

/**
 * stripEmptyFormFields
 * Filters out form fields with empty values
 * @param {Express.Request.body} Form data
 * @param {Array<String>} nullOrEmptyStringFields strings that should not be removed from formData even if empty
 * @returns {Object} Form data without empty values
 */
const stripEmptyFormFields = (formBody: RequestBody, nullOrEmptyStringFields?: Array<string>) => {
  const fieldsWithValues = {};

  const keys = Object.keys(formBody);

  keys.forEach((key) => {
    const value = formBody[key];

    /**
     * Explicit value checks. The following values are valid:
     * - boolean (true or false)
     * - zero number.
     * Without this check, a valid "false" or "0" value would be stripped.
     */
    const hasValue = Boolean(value) || value === false || value === 0;

    /**
     * if array exists and if key is in array
     * then keeps the key and value pair in form data - even if empty
     */
    const shouldBeNullOrEmptyString = nullOrEmptyStringFields && nullOrEmptyStringFields.includes(key);

    if (hasValue || shouldBeNullOrEmptyString) {
      fieldsWithValues[key] = value;
    }
  });

  return fieldsWithValues;
};

export default stripEmptyFormFields;
