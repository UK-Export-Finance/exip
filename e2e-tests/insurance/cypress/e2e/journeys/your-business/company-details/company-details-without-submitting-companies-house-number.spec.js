import { ROUTES } from '../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

context('Insurance - Your business - Company details page - Navigating to page without submitting companies house number', () => {
  let referenceNumber;
  let url;
  let companiesHouseNumberUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      companiesHouseNumberUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should redirect to companies house number page', () => {
    cy.assertUrl(companiesHouseNumberUrl);
  });
});
