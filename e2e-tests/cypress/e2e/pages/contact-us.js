export const contactUsPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  whoToContactText: () => cy.get('[data-cy="who-to-contact"]'),
  applicationEnquires: {
    heading: () => cy.get('[data-cy="application-enquiries-heading"]'),
    email: () => cy.get('[data-cy="application-enquiries-email"]'),
    quoteReferenceNumber: () => cy.get('[data-cy="application-enquiries-quote-reference-number"]'),
  },
};
