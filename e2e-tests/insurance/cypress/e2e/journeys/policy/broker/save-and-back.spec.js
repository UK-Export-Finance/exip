import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    BROKER_ROOT,
  },
} = INSURANCE_ROUTES;

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
    it(`should redirect to ${ALL_SECTIONS} and retain the "insurance policy" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe(`when selecting yes for ${USING_BROKER}`, () => {
    it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status to "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.assertYesRadioOptionIsChecked();
    });
  });

  describe(`when selecting no for ${USING_BROKER}`, () => {
    it(`should redirect to ${ALL_SECTIONS} and change the "insurance policy" task status to "Completed"`, () => {
      cy.navigateToUrl(url);

      cy.clickNoRadioInput();

      cy.clickSaveAndBackButton();

      cy.assertUrl(allSectionsUrl);

      cy.checkTaskPolicyStatusIsComplete();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.assertNoRadioOptionIsChecked();
    });
  });
});
