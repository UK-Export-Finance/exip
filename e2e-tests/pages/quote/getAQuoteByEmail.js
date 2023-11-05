const getAQuoteByEmailPage = {
  reason: () => cy.get('[data-cy="reason"]'),
  description: () => cy.get('[data-cy="description"]'),
  action: {
    text: () => cy.get('[data-cy="details-1"]'),
    link1: () => cy.get('[data-cy="details-1"]  a').eq(0),
    link2: () => cy.get('[data-cy="details-1"]  a').eq(1),
  },
};

export default getAQuoteByEmailPage;
