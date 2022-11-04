import partials from '../../partials';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

context('Get a quote - header', () => {
  before(() => {
    cy.visit(ROUTES.ROOT, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders a GOV home link and SVG', () => {
    partials.header.govHomeLink().should('exist');
    partials.header.govCrownText().invoke('text').then((text) => {
      expect(text.trim()).equal('GOV.UK');
    });

    partials.header.govHomeLink().should('have.attr', 'href', 'https://www.gov.uk');

    partials.header.govCrownSvg().should('exist');
  });

  it('renders service name link', () => {
    partials.header.serviceName().invoke('text').then((text) => {
      expect(text.trim()).equal(PRODUCT.DESCRIPTION.QUOTE);
    });

    partials.header.serviceName().should('have.attr', 'href', '/');
  });
});
