export const contactUsPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  whoToContactText: () => cy.get('[data-cy="who-to-contact"]'),
  generalEnquiries: {
    heading: () => cy.get('[data-cy="general-enquiries-heading"]'),
    emailPrefix: () => cy.get('[data-cy="general-enquiries-email-prefix"]'),
    emailLink: () => cy.get('[data-cy="general-enquiries-email-link"]'),
    quoteReferenceNumber: () => cy.get('[data-cy="general-enquiries-quote-reference-number"]'),
  },
  applicationEnquiries: {
    heading: () => cy.get('[data-cy="application-enquiries-heading"]'),
    emailPrefix: () => cy.get('[data-cy="application-enquiries-email-prefix"]'),
    emailLink: () => cy.get('[data-cy="application-enquiries-email-link"]'),
    quoteReferenceNumber: () => cy.get('[data-cy="application-enquiries-quote-reference-number"]'),
  },
};
