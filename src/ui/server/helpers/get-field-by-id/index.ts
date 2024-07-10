import { objectHasProperty } from '../object';

/**
 * getFieldById
 * Get a field from an object by the field ID
 * if field has optional prefix, then add to the id
 * @param {Object} fields
 * @param {String} fieldId ID
 * @param {String} fieldIdPrefix optional fieldId prefix
 * @returns {Object} Field or an object with the provided field ID.
 */
const getFieldById = (fields: object, fieldId: string, fieldIdPrefix?: string) => {
  /**
   * If prefix,
   * add prefix before fieldId.
   * Otherwise, set the id as fieldId
   */
  const id = fieldIdPrefix ? `${fieldIdPrefix}-${fieldId}` : fieldId;

  if (objectHasProperty(fields, fieldId)) {
    return {
      id,
      ...fields[fieldId],
    };
  }

  return { id };
};

export default getFieldById;
