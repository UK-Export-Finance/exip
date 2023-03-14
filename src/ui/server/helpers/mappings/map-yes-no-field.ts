/**
 * mapYesNoField
 * maps true or false fields to Yes/No
 * @param {Boolean} answer
 * @returns {String} Yes/No or original provided answer
 */
const mapYesNoField = (answer?: boolean) => {
  if (answer === false) {
    return 'No';
  }

  if (answer === true) {
    return 'Yes';
  }

  return answer;
};

export default mapYesNoField;
