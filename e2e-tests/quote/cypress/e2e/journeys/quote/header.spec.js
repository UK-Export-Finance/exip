import header from '../../../../../partials/header';
import { PRODUCT } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

context('Get a quote - header', () => {
  const url = ROUTES.ROOT;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('renders a GOV home link', () => {
    const expectedHref = 'https://www.gov.uk';
    const expectedText = 'GOV.UK';

    cy.checkLink(
      header.govHomeLink(),
      expectedHref,
      expectedText,
    );
  });

  it('renders service name link', () => {
    const expectedHref = '/';
    const expectedText = PRODUCT.DESCRIPTION.QUOTE;

    cy.checkLink(
      header.serviceName(),
      expectedHref,
      expectedText,
    );
  });
});
