import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../fixtures/application';

const { REQUESTED_JOINTLY_INSURED_PARTY: FIXTURES } = application;

const {
  ROOT,
  POLICY: { OTHER_COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Other company details page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'anotherCompany', otherCompanyInvolved: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;

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

  describe('when fields are partially completed', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(COMPANY_NAME).input(), FIXTURES[COMPANY_NAME]);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.checkValue(field(COMPANY_NAME), FIXTURES[COMPANY_NAME]);
    });
  });

  describe('when all fields are provided', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitOtherCompanyDetailsForm({});

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should retain all the relevant fields on the page', () => {
      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.startInsurancePolicySection({});

      // go through 6 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 6 });

      cy.assertOtherCompanyDetailsFieldValues({});
    });
  });
});
