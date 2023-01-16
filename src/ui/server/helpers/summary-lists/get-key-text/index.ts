// TODO : can we align TITLE and title?

type FieldSummary = {
  TITLE: string;
};

type TheField = {
  title?: string;
  SUMMARY?: FieldSummary;
};

/**
 * getKeyText
 * Get the field name text/key to display in a title of a govukSummaryList row
 * @param {Object} All fields
 * @param {String} Field ID
 * @returns {String} Title of the field for a govukSummaryList row
 */
const getKeyText = (field: TheField) => {
  if (field.SUMMARY?.TITLE) {
    return field.SUMMARY.TITLE;
  }
  if (field.title) {
    return field.title;
  }

  return null;
};

export default getKeyText;
