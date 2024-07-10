import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe(`when selecting yes for ${USING_BROKER}`, () => {
    it('should redirect to `all sections` and change the `insurance policy` task status to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe(`when selecting no for ${USING_BROKER}`, () => {
    it('should redirect to `all sections` and retain the status of task `insurance policy` as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
