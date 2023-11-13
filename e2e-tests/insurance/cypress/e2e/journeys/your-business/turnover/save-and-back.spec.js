import partials from '../../../../../../partials';
import { field, submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    TURNOVER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;

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
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('save and back on a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${ESTIMATED_ANNUAL_TURNOVER} input on the page and the other fields should be empty`, () => {
      task.link().click();
      // submit companies house number form
      submitButton().click();
      // submit company details form
      submitButton().click();
      // submit nature of business form
      submitButton().click();

      field(ESTIMATED_ANNUAL_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      field(PERCENTAGE_TURNOVER).input().should('have.value', '');
    });
  });

  describe('when all fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(ESTIMATED_ANNUAL_TURNOVER).input(), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      cy.keyboardInput(field(PERCENTAGE_TURNOVER).input(), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
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

      field(ESTIMATED_ANNUAL_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      field(PERCENTAGE_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
