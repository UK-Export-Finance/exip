/**
 * currencyRadios
 * Check currency radios
 * @param {String} Radio field ID
 * @param {String} Radio field/option value
 */
const currencyRadios = (fieldId, fieldValue) => ({
  option: {
    input: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-input"]`),
    label: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-label"]`),
  },
});

export default currencyRadios;
