import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { APPLICATION } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: { TOTAL_MONTHS_OF_COVER: MAXIMUM_MONTHS_OF_COVER },
  POLICY_TYPE,
} = APPLICATION;

const {
  POLICY: {
    CONTRACT_POLICY: {
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

const assertions = {
  field: fieldSelector(TOTAL_MONTHS_OF_COVER),
  errorIndex: 1,
  expectedErrorsCount: 3,
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - form validation - total months of cover', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({ policyType: POLICY_TYPE.MULTIPLE });

      url = `${baseUrl}${ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.visit(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when total months of cover is not provided', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        expectedErrorMessage: CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].IS_EMPTY,
      });
    });
  });

  describe('when total months of cover is not a number', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'one',
        expectedErrorMessage: CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].INCORRECT_FORMAT,
      });
    });
  });

  describe('when total months of cover contains a decimal', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: '7.5',
        expectedErrorMessage: CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].INCORRECT_FORMAT,
      });
    });
  });

  describe('when total months of cover is below the minimum', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: '0',
        expectedErrorMessage: CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].BELOW_MINIMUM,
      });
    });
  });

  describe('when total months of cover is above the maximum', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: MAXIMUM_MONTHS_OF_COVER + 1,
        expectedErrorMessage: CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].ABOVE_MAXIMUM,
      });
    });
  });
});
