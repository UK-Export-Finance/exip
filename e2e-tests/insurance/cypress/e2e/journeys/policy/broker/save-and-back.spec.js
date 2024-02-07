import { brokerPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import { field } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../fixtures/application';

const {
  BROKER: { USING_BROKER },
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    FULL_ADDRESS,
  },
} = POLICY_FIELD_IDS;

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
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});

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

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkText(task.status(), IN_PROGRESS);
    });
  });

  describe('save and back on a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      brokerPage[USING_BROKER].yesRadioInput().click();

      cy.keyboardInput(field(NAME).input(), application.EXPORTER_BROKER[NAME]);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkText(task.status(), IN_PROGRESS);
    });

    it(`should retain the ${NAME} input on the page and the other fields should be empty`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 5 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 5 });

      // TODO: once EMS-2586 is complete, this can be replaced with clickSubmitButtonMultipleTimes.
      cy.completeAndSubmitAnotherCompanyForm({});

      cy.assertRadioOptionIsChecked(brokerPage[USING_BROKER].yesRadioInput());
      cy.checkValue(field(NAME), application.EXPORTER_BROKER[NAME]);
      cy.checkValue(field(EMAIL), '');
      cy.checkValue(field(FULL_ADDRESS), '');
    });
  });

  describe('when all fields are provided', () => {
    describe(`when selecting yes for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status as "completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].yesRadioInput().click();

        cy.keyboardInput(field(NAME).input(), application.EXPORTER_BROKER[NAME]);
        cy.keyboardInput(field(EMAIL).input(), application.EXPORTER_BROKER[EMAIL]);
        cy.keyboardInput(field(FULL_ADDRESS).input(), application.EXPORTER_BROKER[FULL_ADDRESS]);

        cy.clickSaveAndBackButton();

        cy.assertUrl(allSectionsUrl);

        cy.checkTaskStatus(task, COMPLETED);
      });

      it('should retain all the fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsurancePolicySection({});

        // go through 5 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        // TODO: once EMS-2586 is complete, this can be replaced with clickSubmitButtonMultipleTimes.
        cy.completeAndSubmitAnotherCompanyForm({});

        cy.assertRadioOptionIsChecked(brokerPage[USING_BROKER].yesRadioInput());
        cy.checkValue(field(NAME), application.EXPORTER_BROKER[NAME]);
        cy.checkValue(field(EMAIL), application.EXPORTER_BROKER[EMAIL]);
        cy.checkValue(field(FULL_ADDRESS), application.EXPORTER_BROKER[FULL_ADDRESS]);
      });
    });

    describe(`when selecting no for ${USING_BROKER}`, () => {
      it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status as "Completed"`, () => {
        cy.navigateToUrl(url);

        brokerPage[USING_BROKER].noRadioInput().click();

        cy.clickSaveAndBackButton();

        cy.assertUrl(allSectionsUrl);

        cy.checkTaskStatus(task, COMPLETED);
      });

      it('should retain all the relevant fields on the page', () => {
        cy.navigateToUrl(allSectionsUrl);

        cy.startInsurancePolicySection({});

        // go through 5 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        // TODO: once EMS-2586 is complete, this can be replaced with clickSubmitButtonMultipleTimes.
        cy.completeAndSubmitAnotherCompanyForm({});

        cy.assertRadioOptionIsChecked(brokerPage[USING_BROKER].noRadioInput());
      });
    });
  });
});
