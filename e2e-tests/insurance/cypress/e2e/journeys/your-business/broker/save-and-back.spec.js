import { brokerPage } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { saveAndBackButton, submitButton } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import application from '../../../../../../fixtures/application';

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
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Broker page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
      allSectionsUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
    it(`should redirect to ${ALL_SECTIONS} retain the "your business" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('save and back on a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "your business" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      brokerPage[USING_BROKER].yesRadioInput().click();

      cy.keyboardInput(brokerPage[NAME].input(), application.EXPORTER_BROKER[NAME]);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${NAME} input on the page and the other fields should be empty`, () => {
      cy.navigateToUrl(allSectionsUrl);

      task.link().click();

      // submit companies house number form
      submitButton().click();
      // submit company details form
      submitButton().click();
      // your contact page submit
      cy.completeAndSubmitYourContact({});
      // submit nature of business form
      submitButton().click();
      // submit turnover form
      submitButton().click();

      brokerPage[USING_BROKER].yesRadioInput().should('be.checked');
      cy.checkValue(brokerPage[NAME], application.EXPORTER_BROKER[NAME]);
      cy.checkValue(brokerPage[ADDRESS_LINE_1], '');
      cy.checkValue(brokerPage[ADDRESS_LINE_2], '');
      cy.checkValue(brokerPage[TOWN], '');
      cy.checkValue(brokerPage[COUNTY], '');
      cy.checkValue(brokerPage[POSTCODE], '');
      cy.checkValue(brokerPage[EMAIL], '');
    });
  });

  describe('when all fields are provided', () => {
    describe(`when selecting yes for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "your business" task status as "completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].yesRadioInput().click();

        cy.keyboardInput(brokerPage[NAME].input(), application.EXPORTER_BROKER[NAME]);
        cy.keyboardInput(brokerPage[ADDRESS_LINE_1].input(), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
        cy.keyboardInput(brokerPage[ADDRESS_LINE_2].input(), application.EXPORTER_BROKER[ADDRESS_LINE_2]);
        cy.keyboardInput(brokerPage[TOWN].input(), application.EXPORTER_BROKER[TOWN]);
        cy.keyboardInput(brokerPage[COUNTY].input(), application.EXPORTER_BROKER[COUNTY]);
        cy.keyboardInput(brokerPage[EMAIL].input(), application.EXPORTER_BROKER[EMAIL]);
        cy.keyboardInput(brokerPage[POSTCODE].input(), application.EXPORTER_BROKER[POSTCODE]);

        saveAndBackButton().click();

        cy.assertUrl(allSectionsUrl);

        const expected = TASKS.STATUS.COMPLETED;
        cy.checkTaskStatus(task, expected);
      });

      it('should retain all the fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        task.link().click();

        // submit companies house number form
        submitButton().click();
        // submit company details form
        submitButton().click();
        // your contact page submit
        cy.completeAndSubmitYourContact({});
        // submit nature of business form
        submitButton().click();
        // submit turnover form
        submitButton().click();

        brokerPage[USING_BROKER].yesRadioInput().should('be.checked');
        cy.checkValue(brokerPage[NAME], application.EXPORTER_BROKER[NAME]);
        cy.checkValue(brokerPage[ADDRESS_LINE_1], application.EXPORTER_BROKER[ADDRESS_LINE_1]);
        cy.checkValue(brokerPage[ADDRESS_LINE_2], application.EXPORTER_BROKER[ADDRESS_LINE_2]);
        cy.checkValue(brokerPage[TOWN], application.EXPORTER_BROKER[TOWN]);
        cy.checkValue(brokerPage[COUNTY], application.EXPORTER_BROKER[COUNTY]);
        cy.checkValue(brokerPage[POSTCODE], application.EXPORTER_BROKER[POSTCODE]);
        cy.checkValue(brokerPage[EMAIL], application.EXPORTER_BROKER[EMAIL]);
      });
    });

    describe(`when selecting no for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "your business" task status as "Completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].noRadioInput().click();

        saveAndBackButton().click();

        cy.assertUrl(allSectionsUrl);

        const expected = TASKS.STATUS.COMPLETED;
        cy.checkTaskStatus(task, expected);
      });

      it('should retain all the relevant fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        task.link().click();

        // submit companies house number form
        submitButton().click();
        // submit company details form
        submitButton().click();
        // your contact page submit
        cy.completeAndSubmitYourContact({});
        // submit nature of business form
        submitButton().click();
        // submit turnover form
        submitButton().click();

        brokerPage[USING_BROKER].noRadioInput().should('be.checked');
      });
    });
  });
});
