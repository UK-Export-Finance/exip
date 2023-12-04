/**
 * radios
 * Radio cypress selectors
 * @param {String} Radio field ID
 * @param {String} Radio field/option value
 */
const radios = (fieldId, fieldValue) => ({
  option: {
    input: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-input"]`),
    label: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-label"]`),
  },
});

export default radios;
