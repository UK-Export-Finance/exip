const lossPayeePage = {
  radioHint: (fieldId) => ({
    intro: () => cy.get(`[data-cy="${fieldId}-hint-intro"]`),
    outro: () => cy.get(`[data-cy="${fieldId}-hint-outro"]`),
  }),
};

export default lossPayeePage;
