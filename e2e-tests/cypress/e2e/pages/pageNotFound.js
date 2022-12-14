export const pageNotFoundPage = {
  typedAddress: () => cy.get('[data-cy="typed-address"]'),
  pastedAddress: () => cy.get('[data-cy="pasted-address"]'),
  contact1: () => cy.get('[data-cy="contact-1"]'),
  contact2: () => cy.get('[data-cy="contact-2"]'),
  contact3: () => cy.get('[data-cy="contact-3"]'),
  contactLink: () => cy.get('[data-cy="contact-link"]'),
};
