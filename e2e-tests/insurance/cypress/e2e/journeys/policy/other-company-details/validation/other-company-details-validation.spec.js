import { field as fieldSelector, autoCompleteField } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY.REQUESTED_JOINTLY_INSURED_PARTY;

const {
  ROOT,
  POLICY: { OTHER_COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [COMPANY_NAME]: { MAXIMUM: MAX_COMPANY_NAME_CHARACTERS },
    [COMPANY_NUMBER]: { MAXIMUM: MAX_COMPANY_NUMBER_CHARACTERS },
  },
} = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Other company details page - Validation', () => {
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
      cy.completeAndSubmitAnotherCompanyForm({ otherCompanyInvolved: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANY_NAME, () => {
    const FIELD_ID = COMPANY_NAME;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: fieldSelector(FIELD_ID),
      expectedErrorsCount: 2,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_COMPANY_NAME_CHARACTERS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAX_COMPANY_NAME_CHARACTERS + 1),
        expectedErrorMessage: ERROR.ABOVE_MAXIMUM,
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    const FIELD_ID = COUNTRY_CODE;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: autoCompleteField(FIELD_ID),
      errorIndex: 1,
      expectedErrorsCount: 2,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });
  });

  describe(COMPANY_NUMBER, () => {
    const FIELD_ID = COMPANY_NUMBER;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: fieldSelector(FIELD_ID),
      errorIndex: 2,
      expectedErrorsCount: 3,
    };

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_COMPANY_NUMBER_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_COMPANY_NUMBER_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.ABOVE_MAXIMUM });
    });
  });
});
