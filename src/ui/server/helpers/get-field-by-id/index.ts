import { objectHasProperty } from '../object';

/**
 * getFieldById
 * Get a field from an object by the field ID
 * @param {Object} Fields
 * @param {String} Field ID
 * @returns {Object} Field or an object with the provided field ID.
 */
const getFieldById = (fields: object, fieldId: string) => {
  if (objectHasProperty(fields, fieldId)) {
    return {
      id: fieldId,
      ...fields[fieldId],
    };
  }

  return { id: fieldId };
};

export default getFieldById;
