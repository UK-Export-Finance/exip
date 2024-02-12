import { field as fieldSelector, countryInput } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
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
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
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

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
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

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 2,
      errorIndex: 0,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.IS_EMPTY);
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_COMPANY_NAME_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_COMPANY_NAME_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.ABOVE_MAXIMUM);
    });
  });

  describe(COUNTRY, () => {
    const FIELD_ID = COUNTRY;
    const ERROR = ERRORS[FIELD_ID];

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: countryInput.field(FIELD_ID),
      numberOfExpectedErrors: 2,
      errorIndex: 1,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.IS_EMPTY);
    });
  });

  describe(COMPANY_NUMBER, () => {
    const FIELD_ID = COMPANY_NUMBER;
    const ERROR = ERRORS[FIELD_ID];

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 3,
      errorIndex: 2,
    };

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_COMPANY_NUMBER_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_COMPANY_NUMBER_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.ABOVE_MAXIMUM);
    });
  });
});
