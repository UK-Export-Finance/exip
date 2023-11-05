const requestNewCodePage = {
  intro: () => cy.get('[data-cy="intro"]'),
  doNotHaveAccessToEmail: {
    summary: () => cy.get('[data-cy="do-not-have-email-access"] summary'),
    details: () => cy.get('[data-cy="do-not-have-email-access"]'),
    cannotAccess: () => cy.get('[data-cy="do-not-have-email-access-cannot-access"]'),
    contactUsLink: () => cy.get('[data-cy="do-not-have-email-access-contact-link"]'),
    outro: () => cy.get('[data-cy="do-not-have-email-access-outro"]'),
  },
};

export default requestNewCodePage;
