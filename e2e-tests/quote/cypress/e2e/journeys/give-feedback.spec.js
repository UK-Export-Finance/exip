import partials from '../../../../partials';

context('Give feedback link - As an exporter, I want to provide feedback about this service', () => {
  before(() => {
    cy.navigateToRootUrl();

    partials.phaseBanner.feedbackLink().click();
  });

  it('redirects to a microsoft forms page', () => {
    // microsoft forms generates a new URL from the short URL we provide.
    cy.url().should('include', 'https://forms.office.com');
  });
});
