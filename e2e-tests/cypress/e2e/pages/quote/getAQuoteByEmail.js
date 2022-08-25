const getAQuoteByEmailPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  reason: () => cy.get('[data-cy="reason"]'),
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
  action: {
    text: () => cy.get('[data-cy="details-1"]'),
    link1: () => cy.get('[data-cy="details-1"]  a').eq(0),
    link2: () => cy.get('[data-cy="details-1"]  a').eq(1),
  },
};

export default getAQuoteByEmailPage;
