const navigateToUrl = (url) => cy.visit(url, {
  auth: {
    username: Cypress.config('basicAuthKey'),
    password: Cypress.config('basicAuthSecret'),
  },
});

export default navigateToUrl;
