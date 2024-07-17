export const contactUsPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  quoteReferenceNumber: () => cy.get('[data-cy="general-enquiries-quote-reference-number"]'),
  generalEnquiries: {
    heading: () => cy.get('[data-cy="general-enquiries-heading"]'),
  },
  applicationEnquiries: {
    heading: () => cy.get('[data-cy="application-enquiries-heading"]'),
    emailPrefix: () => cy.get('[data-cy="application-enquiries-email-prefix"]'),
    emailLink: () => cy.get('[data-cy="application-enquiries-email-link"]'),
  },
};
