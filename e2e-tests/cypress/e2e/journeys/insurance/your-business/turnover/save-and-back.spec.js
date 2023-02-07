import { turnover } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  START,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    TURNOVER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Turnover page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('When no fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('save and back on a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      turnover[ESTIMATED_ANNUAL_TURNOVER].input().clear().type(application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${ESTIMATED_ANNUAL_TURNOVER} input on the page and the other fields should be empty`, () => {
      task.link().click();
      // submit company details form
      submitButton().click();
      // submit nature of business form
      submitButton().click();

      turnover[ESTIMATED_ANNUAL_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      turnover[PERCENTAGE_TURNOVER].input().should('have.value', '');
    });
  });

  describe('When all fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      turnover[ESTIMATED_ANNUAL_TURNOVER].input().clear().type(application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      turnover[PERCENTAGE_TURNOVER].input().clear().type(application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkTaskStatus(task, expected);
    });

    it('should retain all the fields on the page', () => {
      task.link().click();
      // submit company details form
      submitButton().click();
      // submit nature of business form
      submitButton().click();

      turnover[ESTIMATED_ANNUAL_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      turnover[PERCENTAGE_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
