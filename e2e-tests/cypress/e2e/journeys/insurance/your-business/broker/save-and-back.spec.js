import { broker } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { saveAndBackButton, submitButton } from '../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/exporter-business';
import application from '../../../../../fixtures/application';

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Broker page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
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

      broker[USING_BROKER].yesRadioInput().click();

      broker[NAME].input().clear().type(application.EXPORTER_BROKER[NAME], { delay: 0 });

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${NAME} input on the page and the other fields should be empty`, () => {
      task.link().click();
      // submit company details form
      submitButton().click();
      // submit nature of business form
      submitButton().click();
      // submit turnover form
      submitButton().click();

      broker[USING_BROKER].yesRadioInput().should('be.checked');
      cy.checkValue(broker[NAME], application.EXPORTER_BROKER[NAME]);
      cy.checkValue(broker[ADDRESS_LINE_1], '');
      cy.checkValue(broker[ADDRESS_LINE_2], '');
      cy.checkValue(broker[TOWN], '');
      cy.checkValue(broker[COUNTY], '');
      cy.checkValue(broker[POSTCODE], '');
      cy.checkValue(broker[EMAIL], '');
    });
  });

  describe('When all fields are provided', () => {
    describe(`when selecting yes for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        broker[USING_BROKER].yesRadioInput().click();
        broker[NAME].input().clear().type(application.EXPORTER_BROKER[NAME], { delay: 0 });
        broker[ADDRESS_LINE_1].input().clear().type(application.EXPORTER_BROKER[ADDRESS_LINE_1], { delay: 0 });
        broker[ADDRESS_LINE_2].input().clear().type(application.EXPORTER_BROKER[ADDRESS_LINE_2], { delay: 0 });
        broker[TOWN].input().clear().type(application.EXPORTER_BROKER[TOWN], { delay: 0 });
        broker[COUNTY].input().clear().type(application.EXPORTER_BROKER[COUNTY], { delay: 0 });
        broker[EMAIL].input().clear().type(application.EXPORTER_BROKER[EMAIL], { delay: 0 });
        broker[POSTCODE].input().clear().type(application.EXPORTER_BROKER[POSTCODE], { delay: 0 });

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
        // submit turnover form
        submitButton().click();

        broker[USING_BROKER].yesRadioInput().should('be.checked');
        cy.checkValue(broker[NAME], application.EXPORTER_BROKER[NAME]);
        cy.checkValue(broker[ADDRESS_LINE_1], application.EXPORTER_BROKER[ADDRESS_LINE_1]);
        cy.checkValue(broker[ADDRESS_LINE_2], application.EXPORTER_BROKER[ADDRESS_LINE_2]);
        cy.checkValue(broker[TOWN], application.EXPORTER_BROKER[TOWN]);
        cy.checkValue(broker[COUNTY], application.EXPORTER_BROKER[COUNTY]);
        cy.checkValue(broker[POSTCODE], application.EXPORTER_BROKER[POSTCODE]);
        cy.checkValue(broker[EMAIL], application.EXPORTER_BROKER[EMAIL]);
      });
    });

    describe(`when selecting no for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        broker[USING_BROKER].noRadioInput().click();

        saveAndBackButton().click();

        cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      });

      it('should retain the `your business` task status as `in progress`', () => {
        const expected = TASKS.STATUS.IN_PROGRESS;
        cy.checkTaskStatus(task, expected);
      });

      it('should retain all the relevant fields on the page', () => {
        task.link().click();
        // submit company details form
        submitButton().click();
        // submit nature of business form
        submitButton().click();
        // submit turnover form
        submitButton().click();

        broker[USING_BROKER].noRadioInput().should('be.checked');
      });
    });
  });
});
