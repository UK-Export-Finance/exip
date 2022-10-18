const applyOfflinePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  downloadFormCopy: () => cy.get('[data-cy="download-form-copy"]'),
  downloadFormLink: () => cy.get('[data-cy="download-form-link"]'),
  contactCopy: () => cy.get('[data-cy="contact-copy"]'),
  contactLink: () => cy.get('[data-cy="contact-link"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default applyOfflinePage;
