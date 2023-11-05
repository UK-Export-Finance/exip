import { DEFAULT } from '../../content-strings';

/**
 * generateMultipleFieldHtml
 * Handle objects with all fields present or where some are null as not present
 * maps through object and constructs an html string containing line breaks
 * skips fields where the field is null or is typename
 * @param {Object} fieldValues
 * @returns {String} String of HTML or default empty string
 */
const generateMultipleFieldHtml = (fieldValues: object): string => {
  let fieldValuesString = '';

  Object.keys(fieldValues).forEach((field) => {
    // if the field exists and not the typename part
    if (fieldValues[field] && field !== '__typename' && field !== 'id') {
      fieldValuesString += `${fieldValues[field]}<br>`;
    }
  });

  if (fieldValuesString.length) {
    return fieldValuesString;
  }

  return DEFAULT.EMPTY;
};

export default generateMultipleFieldHtml;
