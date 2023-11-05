export default (fieldId, FIELDS) => {
  const expectedKey = FIELDS[fieldId].SUMMARY.TITLE;

  const expectedChangeLinkText = FIELDS[fieldId].SUMMARY.TITLE;

  return { expectedKey, expectedChangeLinkText };
};
