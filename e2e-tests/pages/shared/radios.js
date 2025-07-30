/**
 * radios
 * Radio cypress selectors
 * @param {string} Radio field ID
 * @param {string} Radio field/option value
 */
const radios = (fieldId, fieldValue) => {
  if (fieldValue) {
    return {
      option: {
        input: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-input"]`),
        label: () => cy.get(`[data-cy="${fieldId}-${fieldValue}-label"]`),
      },
    };
  }

  return {
    option: {
      input: () => cy.get(`[data-cy="${fieldId}-input"]`),
      label: () => cy.get(`[data-cy="${fieldId}-label"]`),
    },
  };
};

export default radios;
