import header from '../../../../partials/header';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

context('Insurance - header', () => {
  const url = ROUTES.INSURANCE.START;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('renders a GOV home link', () => {
    header.govHomeLink().should('exist');

    header.govHomeLink().should('have.attr', 'href', 'https://www.gov.uk');
  });

  it('renders service name link', () => {
    cy.checkText(header.serviceName(), PRODUCT.DESCRIPTION.APPLICATION);

    header.serviceName().should('have.attr', 'href', url);
  });

  it('should NOT render authenticated navigation links', () => {
    header.navigation.manageAccount().should('not.exist');
    header.navigation.applications().should('not.exist');
    header.navigation.signOut().should('not.exist');
  });
});
