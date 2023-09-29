import { natureOfBusiness } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    NATURE_OF_BUSINESS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Nature of your business page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;

      cy.checkText(task.status(), expected);
    });
  });

  describe('save and back on a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(natureOfBusiness[GOODS_OR_SERVICES].input(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;

      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      task.link().click();
      // submit companies house number form
      submitButton().click();
      // company details submit
      submitButton().click();

      natureOfBusiness[GOODS_OR_SERVICES].input().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().should('have.value', '');
      natureOfBusiness[EMPLOYEES_UK].input().should('have.value', '');
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().should('have.value', '');
    });
  });

  describe('when all fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(natureOfBusiness[GOODS_OR_SERVICES].input(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      cy.keyboardInput(natureOfBusiness[YEARS_EXPORTING].input(), application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      cy.keyboardInput(natureOfBusiness[EMPLOYEES_UK].input(), application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      cy.keyboardInput(natureOfBusiness[EMPLOYEES_INTERNATIONAL].input(), application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      task.link().click();
      // submit companies house number form
      submitButton().click();
      // company details submit
      submitButton().click();

      natureOfBusiness[GOODS_OR_SERVICES].input().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().should('have.value', application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      natureOfBusiness[EMPLOYEES_UK].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);
    });
  });
});
