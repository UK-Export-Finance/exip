import header from '../../../../partials/header';
import { ROUTES } from '../../../../constants';

context('Insurance - header', () => {
  const url = ROUTES.INSURANCE.START;

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
    cy.checkHeaderServiceNameAndHref({ isInsurancePage: true });
  });

  it('should NOT render authenticated navigation links', () => {
    header.navigation.manageAccount().should('not.exist');
    header.navigation.applications().should('not.exist');
    header.navigation.signOut().should('not.exist');
  });
});
