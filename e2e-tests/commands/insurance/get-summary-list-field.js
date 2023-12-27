/**
 * getSummaryListField
 * Get a summary list field.
 * If a summary list field has a FORM_TITLE, append this to the expected change link text.
 * Some application sections are using the latest GOV design, with multiple summary lists.
 * When the latest design is in place, change links include a form title.
 * @param {String} fieldId: Field ID
 * @param {Object} FIELDS: Summary list fields
 * @returns {Object} Object with expected key and change link text
 */
const getSummaryListField = (fieldId, FIELDS) => {
  const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;

  let expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;
  const formTitle = FIELDS[fieldId].SUMMARY.FORM_TITLE;

  if (formTitle) {
    expectedChangeLinkText += ` (${formTitle})`;
  }

  return { expectedKey, expectedChangeLinkText };
};

export default getSummaryListField;
