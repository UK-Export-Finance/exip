import partials from '../../partials';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

context('Insurance - header', () => {
  const url = ROUTES.INSURANCE.START;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('renders a GOV home link', () => {
    partials.header.govHomeLink().should('exist');

    partials.header.govHomeLink().should('have.attr', 'href', 'https://www.gov.uk');
  });

  it('renders service name link', () => {
    cy.checkText(partials.header.serviceName(), PRODUCT.DESCRIPTION.APPLICATION);

    partials.header.serviceName().should('have.attr', 'href', url);
  });
});
