import { companiesHouseNumber, companyDetails } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { ROUTES, COMPANIES_HOUSE_NUMBER } from '../../../../../../constants';
import { saveAndBackButton } from '../../../../../../pages/shared';

const { ROOT } = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Companies house number page validation', () => {
  let referenceNumber;
  let url;
  let companyDetailsUrl;

  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
      companyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('When no details are entered', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      saveAndBackButton().click();

      cy.navigateToUrl(url);
    });

    it('should have an empty companies house number input', () => {
      companiesHouseNumber.input().should('be.empty');
    });
  });

  describe('When an incorrect companies house number is entered', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companiesHouseNumber.input(), '123');
      saveAndBackButton().click();

      cy.navigateToUrl(url);
    });

    it('should have an empty companies house number input', () => {
      companiesHouseNumber.input().should('be.empty');
    });
  });

  describe('When a correct companies house number is entered', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companiesHouseNumber.input(), COMPANIES_HOUSE_NUMBER);
      saveAndBackButton().click();

      cy.navigateToUrl(url);
    });

    it('should have the companies house value populated and a summary list on company details page', () => {
      cy.checkValue(companiesHouseNumber, COMPANIES_HOUSE_NUMBER);

      cy.navigateToUrl(companyDetailsUrl);

      companyDetails.yourBusinessSummaryList().should('exist');
    });
  });
});
