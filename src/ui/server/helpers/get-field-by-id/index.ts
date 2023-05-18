import { objectHasProperty } from '../object';

/**
 * getFieldById
 * Get a field from an object by the field ID
 * if field has optional prefix, then add to the id
 * @param {Object} fields
 * @param {String} fieldId ID
 * @param {String} fieldIdPrefix optional field if prefix
 * @returns {Object} Field or an object with the provided field ID.
 */
const getFieldById = (fields: object, fieldId: string, fieldIdPrefix?: string) => {
  if (objectHasProperty(fields, fieldId)) {
    return {
      // if prefix, then add prefix before fieldId, else set id as fieldId
      id: fieldIdPrefix ? `${fieldIdPrefix}-${fieldId}` : fieldId,
      ...fields[fieldId],
    };
  }

  return { id: fieldIdPrefix ? `${fieldIdPrefix}-${fieldId}` : fieldId };
};

export default getFieldById;
