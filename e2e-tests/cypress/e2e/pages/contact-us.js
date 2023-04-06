export const contactUsPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  whoToContactText: () => cy.get('[data-cy="who-to-contact"]'),
  generalEnquiries: {
    heading: () => cy.get('[data-cy="heading-general-enquiries"]'),
    telephone: () => cy.get('[data-cy="telephone-general-enquiries"]'),
    email: () => cy.get('[data-cy="email-general-enquiries"]'),
    openingHours: () => cy.get('[data-cy="opening-hours"]'),
    callChargesLink: () => cy.get('[data-cy="call-charges"]'),
  },
  applicationEnquires: {
    heading: () => cy.get('[data-cy="heading-application-enquiries"]'),
    email: () => cy.get('[data-cy="email-application-enquiries"]'),
    quoteReferenceNumber: () => cy.get('[data-cy="quote-reference-number"]'),
  },
};
