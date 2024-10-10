/**
 * completeDateFormFields
 * Complete day, month and year date fields.
 * For each date field, check that a null value is NOT provided.
 * In some tests, only 1x date fields is changed, for validation testing.
 * Therefore, only enter something into each field if the field is NOT provided as null.
 * @param {string} idPrefix: ID prefix of the date fields
 * @param {string} day: Optional day string
 * @param {string} month: Optional month string
 * @param {string} year: Optional year string
 */
const completeDateFormFields = ({ idPrefix, day, month, year }) => {
  if (day !== null) {
    cy.keyboardInput(cy.get(`[data-cy="${idPrefix}-day"]`), day);
  }

  if (month !== null) {
    cy.keyboardInput(cy.get(`[data-cy="${idPrefix}-month"]`), month);
  }

  if (year !== null) {
    cy.keyboardInput(cy.get(`[data-cy="${idPrefix}-year"]`), year);
  }
};

export default completeDateFormFields;
