import { noRadioInput } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    ANOTHER_COMPANY,
  },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Another company page - Save and back', () => {
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

      url = `${baseUrl}${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`;
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

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe(`when selecting yes for ${FIELD_ID}`, () => {
    it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status to "completed"`, () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      // TODO: EMS-2647 - re-enable
      // cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 5 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 5 });

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe(`when selecting no for ${FIELD_ID}`, () => {
    it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status to "Completed"`, () => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      // TODO: EMS-2647 - re-enable
      // cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 5 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 5 });

      cy.assertRadioOptionIsChecked(noRadioInput());
      cy.assertNoRadioOptionIsChecked();
    });
  });
});
