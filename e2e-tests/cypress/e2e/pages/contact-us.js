export const contactUsPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  whoToContactText: () => cy.get('[data-cy="who-to-contact"]'),
  generalEnquiries: {
    heading: () => cy.get('[data-cy="general-enquiries-heading"]'),
    telephone: () => cy.get('[data-cy="general-enquiries-telephone"]'),
    email: () => cy.get('[data-cy="general-enquiries-email"]'),
    openingHours: () => cy.get('[data-cy="general-enquiries-opening-hours"]'),
    callChargesLink: () => cy.get('[data-cy="general-enquiries-call-charges"]'),
  },
  applicationEnquires: {
    heading: () => cy.get('[data-cy="application-enquiries-heading"]'),
    email: () => cy.get('[data-cy="application-enquiries-email"]'),
    quoteReferenceNumber: () => cy.get('[data-cy="application-enquiries-quote-reference-number"]'),
  },
};
