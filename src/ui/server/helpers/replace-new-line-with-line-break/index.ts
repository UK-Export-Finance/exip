/**
 * replaces \r\n with <br /> so can be used as html by govuk components
 * enables new line to be displayed in the ui
 * @param {string} string
 * @returns {string}
 */
const replaceNewLineWithLineBreak = (string: string) => string.replaceAll('\r\n', '<br />');

export default replaceNewLineWithLineBreak;
