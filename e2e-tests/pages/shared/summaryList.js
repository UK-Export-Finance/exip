const summaryList = {
  field: (fieldId) => ({
    key: () => cy.get(`.${fieldId}-key`),
    value: () => cy.get(`.${fieldId}-value`),
    valueHtmlLineBreak: () => cy.get(`.${fieldId}-value br`),
    changeLink: () => cy.get(`[data-cy="${fieldId}-change-link"]`),
  }),
};

export default summaryList;
