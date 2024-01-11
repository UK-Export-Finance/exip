import { brokerPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import { field, saveAndBackButton } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
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
  POLICY: {
    BROKER_ROOT,
  },
} = INSURANCE_ROUTES;

const { IN_PROGRESS, COMPLETED } = TASKS.STATUS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
    it(`should redirect to ${ALL_SECTIONS} retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      cy.checkText(task.status(), IN_PROGRESS);
    });
  });

  describe('save and back on a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      brokerPage[USING_BROKER].yesRadioInput().click();

      cy.keyboardInput(field(NAME).input(), application.EXPORTER_BROKER[NAME]);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      cy.checkText(task.status(), IN_PROGRESS);
    });

    it(`should retain the ${NAME} input on the page and the other fields should be empty`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 5 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 5 });

      brokerPage[USING_BROKER].yesRadioInput().should('be.checked');
      cy.checkValue(field(NAME), application.EXPORTER_BROKER[NAME]);
      cy.checkValue(field(ADDRESS_LINE_1), '');
      cy.checkValue(field(ADDRESS_LINE_2), '');
      cy.checkValue(field(TOWN), '');
      cy.checkValue(field(COUNTY), '');
      cy.checkValue(field(POSTCODE), '');
      cy.checkValue(field(EMAIL), '');
    });
  });

  describe('when all fields are provided', () => {
    describe(`when selecting yes for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status as "completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].yesRadioInput().click();

        cy.keyboardInput(field(NAME).input(), application.EXPORTER_BROKER[NAME]);
        cy.keyboardInput(field(ADDRESS_LINE_1).input(), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
        cy.keyboardInput(field(ADDRESS_LINE_2).input(), application.EXPORTER_BROKER[ADDRESS_LINE_2]);
        cy.keyboardInput(field(TOWN).input(), application.EXPORTER_BROKER[TOWN]);
        cy.keyboardInput(field(COUNTY).input(), application.EXPORTER_BROKER[COUNTY]);
        cy.keyboardInput(field(EMAIL).input(), application.EXPORTER_BROKER[EMAIL]);
        cy.keyboardInput(field(POSTCODE).input(), application.EXPORTER_BROKER[POSTCODE]);

        saveAndBackButton().click();

        cy.assertUrl(allSectionsUrl);

        cy.checkTaskStatus(task, COMPLETED);
      });

      it('should retain all the fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsurancePolicySection({});

        // go through 5 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        brokerPage[USING_BROKER].yesRadioInput().should('be.checked');
        cy.checkValue(field(NAME), application.EXPORTER_BROKER[NAME]);
        cy.checkValue(field(ADDRESS_LINE_1), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
        cy.checkValue(field(ADDRESS_LINE_2), application.EXPORTER_BROKER[ADDRESS_LINE_2]);
        cy.checkValue(field(TOWN), application.EXPORTER_BROKER[TOWN]);
        cy.checkValue(field(COUNTY), application.EXPORTER_BROKER[COUNTY]);
        cy.checkValue(field(POSTCODE), application.EXPORTER_BROKER[POSTCODE]);
        cy.checkValue(field(EMAIL), application.EXPORTER_BROKER[EMAIL]);
      });
    });

    describe(`when selecting no for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status as "Completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].noRadioInput().click();

        saveAndBackButton().click();

        cy.assertUrl(allSectionsUrl);

        cy.checkTaskStatus(task, COMPLETED);
      });

      it('should retain all the relevant fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsurancePolicySection({});

        // go through 5 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        brokerPage[USING_BROKER].noRadioInput().should('be.checked');
      });
    });
  });
});
