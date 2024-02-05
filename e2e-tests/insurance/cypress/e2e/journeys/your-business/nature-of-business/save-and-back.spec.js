import partials from '../../../../../../partials';
import { field } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    NATURE_OF_BUSINESS_ROOT,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Nature of your business page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

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

      cy.clickSaveAndBackButton();
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

      cy.keyboardInput(field(GOODS_OR_SERVICES).textarea(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;

      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      cy.startYourBusinessSection({});

      // go through 2 business forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      field(GOODS_OR_SERVICES).textarea().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      field(YEARS_EXPORTING).input().should('have.value', '');
      field(EMPLOYEES_UK).input().should('have.value', '');
    });
  });

  describe('when all fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(GOODS_OR_SERVICES).textarea(), application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      cy.keyboardInput(field(YEARS_EXPORTING).input(), application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      cy.keyboardInput(field(EMPLOYEES_UK).input(), application.EXPORTER_BUSINESS[EMPLOYEES_UK]);

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      cy.startYourBusinessSection({});

      // company details submit
      cy.clickSubmitButton();

      field(GOODS_OR_SERVICES).textarea().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      field(YEARS_EXPORTING).input().should('have.value', application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      field(EMPLOYEES_UK).input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
    });
  });
});
