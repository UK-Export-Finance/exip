import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE: { IS_APPOINTED: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss payee page - Save and back', () => {
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
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: false });

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;

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

  describe(`when selecting yes for ${FIELD_ID}`, () => {
    it('should redirect to `all sections` and change the `insurance policy` task status to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 7 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 7 });

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe(`when selecting no for ${FIELD_ID}`, () => {
    it('should redirect to `all sections` and change the `insurance policy` task status to `Completed`', () => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 7 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 7 });

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
