/**
 * getKeyText
 * Get the field name text/key to display in a title of a govukSummaryList row
 * @param {Object} All fields
 * @param {String} Field ID
 * @returns {String} Title of the field for a govukSummaryList row
 */
const getKeyText = (fields: object, fieldId: string) => fields[fieldId]?.SUMMARY?.TITLE;

export default getKeyText;
