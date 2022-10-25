const applyOfflinePage = {
  downloadFormCopy: () => cy.get('[data-cy="download-form-copy"]'),
  downloadFormLink: () => cy.get('[data-cy="download-form-link"]'),
  contactCopy: () => cy.get('[data-cy="contact-copy"]'),
  contactLink: () => cy.get('[data-cy="contact-link"]'),
};

export default applyOfflinePage;
