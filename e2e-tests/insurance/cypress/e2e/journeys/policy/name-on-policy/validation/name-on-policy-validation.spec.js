import { field } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import account from '../../../../../../../fixtures/account';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    BROKER_ROOT,
    DIFFERENT_NAME_ON_POLICY,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: {
      NAME, POSITION, SAME_NAME, OTHER_NAME,
    },
  },
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const NAME_ON_POLICY_ERRORS = ERROR_MESSAGES.INSURANCE.POLICY.NAME_ON_POLICY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Name on policy - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection();
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('No radios selected', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display validation error', () => {
      const expectedErrorsCount = 1;
      const expectedErrorMessage = NAME_ON_POLICY_ERRORS[NAME].IS_EMPTY;

      cy.submitAndAssertRadioErrors(
        field(SAME_NAME),
        0,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });
  });

  describe(`${POSITION} not entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      field(SAME_NAME).input().click();
    });

    it('should display validation error', () => {
      const expectedErrorsCount = 1;
      const expectedErrorMessage = NAME_ON_POLICY_ERRORS[POSITION].IS_EMPTY;

      cy.submitAndAssertFieldErrors(
        field(POSITION),
        null,
        0,
        expectedErrorsCount,
        expectedErrorMessage,
        false,
      );
    });

    it(`should render the ${SAME_NAME} radio text`, () => {
      const nameAndEmail = `${account[FIRST_NAME]} ${account[LAST_NAME]} (${account[EMAIL]})`;
      cy.checkText(field(SAME_NAME).label(), nameAndEmail);
    });

    it(`should render the ${OTHER_NAME} radio text`, () => {
      cy.checkText(field(OTHER_NAME).label(), FIELDS.NAME_ON_POLICY.OPTIONS.OTHER_NAME.TEXT);
    });
  });

  describe(`${POSITION} entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should not display validation error and redirect to the next page', () => {
      cy.completeAndSubmitNameOnPolicyForm({});

      partials.errorSummaryListItems().should('not.exist');

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`;
      cy.assertUrl(expectedUrl);
    });
  });

  describe(`${OTHER_NAME} selected`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should not display validation error and redirect to the next page', () => {
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      partials.errorSummaryListItems().should('not.exist');

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });
  });
});
