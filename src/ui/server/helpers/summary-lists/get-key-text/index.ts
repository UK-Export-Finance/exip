// TODO : can we align TITLE and title?

/**
 * getKeyText
 * Get the field name text/key to display in a title of a govukSummaryList row
 * @param {Object} All fields
 * @param {String} Field ID
 * @returns {String} Title of the field for a govukSummaryList row
 */
const getKeyText = (fields: object, fieldId: string) => {
  const field = fields[fieldId];

  if (field) {
    if (fields[fieldId].SUMMARY?.TITLE) {
      return fields[fieldId].SUMMARY.TITLE;
    }
    if (field.title) {
      return field.title;
    }
  }

  return null;
};

export default getKeyText;
