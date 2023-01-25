import partials from '../../partials';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

context('Get a quote - header', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.ROOT);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders a GOV home link', () => {
    partials.header.govHomeLink().should('exist');

    partials.header.govHomeLink().should('have.attr', 'href', 'https://www.gov.uk');
  });

  it('renders service name link', () => {
    cy.checkText(partials.header.serviceName(), PRODUCT.DESCRIPTION.QUOTE);

    partials.header.serviceName().should('have.attr', 'href', '/');
  });
});
