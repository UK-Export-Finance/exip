import { field as fieldSelector, autoCompleteField } from '../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  POLICY: { OTHER_COMPANY_DETAILS, ANOTHER_COMPANY },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Policy - Other company details page - Changing ${REQUESTED} from 'yes' to 'no'`, () => {
  let referenceNumber;
  let url;
  let anotherCompanyUrl;

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
      cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;
      anotherCompanyUrl = `${baseUrl}${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when changing ${REQUESTED} from 'yes' to 'no'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitOtherCompanyDetailsForm();

      /**
       * Go back to the "other company"
       * So we can change "yes" to no"
       */
      cy.navigateToUrl(anotherCompanyUrl);

      cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: false });

      // Manually navigate to the "other company details" page
      cy.navigateToUrl(url);
    });

    it('should not have fields populated on different name on policy page', () => {
      cy.checkValue(fieldSelector(COMPANY_NAME), '');
      cy.checkValue(autoCompleteField(COUNTRY_CODE), '');
      cy.checkValue(fieldSelector(COMPANY_NUMBER), '');
    });
  });
});
