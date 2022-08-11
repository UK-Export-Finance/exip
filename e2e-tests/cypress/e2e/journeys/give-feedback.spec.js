import partials from '../partials';

context('Give feedback link', () => {
  before(() => {
    cy.login();

    partials.phaseBanner.feedbackLink().click();
  });

  it('redirects to a microsoft forms page', () => {
    // microsoft forms generates a new URL from the short URL we provide.
    cy.url().should('include', 'https://forms.office.com');
  });
});
