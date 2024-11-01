/**
 * checkDateFieldValues
 * Check an date field's day, month and year input values
 * @param {Function} selector: Cypress selector
 * @param {String} day: Expected day value
 * @param {String} month: Expected month value
 * @param {String} year: Expected year value
 */
const checkDateFieldValues = ({ selector, day = '', month = '', year = '' }) => {
  selector.dayInput().should('have.value', day);
  selector.monthInput().should('have.value', month);
  selector.yearInput().should('have.value', year);
};

export default checkDateFieldValues;
