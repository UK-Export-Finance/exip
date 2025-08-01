import { DEFAULT } from '../../content-strings';
import { ObjectType } from '../../../types';

/**
 * generateMultipleFieldHtml
 * Handle objects with all fields present or where some are null as not present
 * maps through object and constructs an html string containing line breaks
 * skips fields where the field is null or is typename
 * @param {ObjectType} fieldValues
 * @returns {string} String of HTML or default empty string
 */
const generateMultipleFieldHtml = (fieldValues: ObjectType): string => {
  let fieldValuesString = '';

  Object.keys(fieldValues).forEach((field) => {
    /**
     * If the field exists,
     * is not a __typename or ID field,
     * include the field with a <br>.
     */
    if (fieldValues[field] && field !== '__typename' && field !== 'id') {
      fieldValuesString += `${fieldValues[field]}<br />`;
    }
  });

  if (fieldValuesString.length) {
    return fieldValuesString;
  }

  return DEFAULT.EMPTY;
};

export default generateMultipleFieldHtml;
