import { LINKS } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const { START } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - start URL', () => {
  const url = `${baseUrl}${START}`;

  before(() => {
    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it(`should redirect to ${LINKS.EXTERNAL.FULL_APPLICATION}`, () => {
    cy.assertUrl(LINKS.EXTERNAL.FULL_APPLICATION);
  });
});
