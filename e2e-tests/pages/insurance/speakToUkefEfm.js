const speakToUkefEfmPage = {
  reason: () => cy.get('[data-cy="reason"]'),
  description: () => cy.get('[data-cy="description"]'),
  action: {
    text: () => cy.get('[data-cy="details-1"]'),
    link: () => cy.get('[data-cy="details-1"]  a'),
  },
};

export default speakToUkefEfmPage;
