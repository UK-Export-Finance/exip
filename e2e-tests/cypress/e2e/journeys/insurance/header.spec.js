import partials from '../../partials';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - header', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);
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
    partials.header.serviceName().invoke('text').then((text) => {
      expect(text.trim()).equal(PRODUCT.DESCRIPTION.APPLICATION);
    });

    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });
});
