import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { APPLICATION, FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: { TOTAL_MONTHS_OF_COVER: MAXIMUM_MONTHS_OF_COVER },
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

const baseUrl = Cypress.config('baseUrl');

const expectedErrors = 3;
const errorIndex = 1;

context('Insurance - Policy - Multiple contract policy page - form validation - total months of cover', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

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

  const field = fieldSelector(TOTAL_MONTHS_OF_COVER);

  describe('when total months of cover is not provided', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors(
        field,
        '',
        errorIndex,
        expectedErrors,
        CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].IS_EMPTY,
      );
    });
  });

  describe('when total months of cover is not a number', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors(
        field,
        'one',
        errorIndex,
        expectedErrors,
        CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].INCORRECT_FORMAT,
      );
    });
  });

  describe('when total months of cover is below the minimum', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors(
        field,
        '0',
        errorIndex,
        expectedErrors,
        CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].BELOW_MINIMUM,
      );
    });
  });

  describe('when total months of cover is above the maximum', () => {
    it('should render a validation error', () => {
      cy.submitAndAssertFieldErrors(
        field,
        MAXIMUM_MONTHS_OF_COVER + 1,
        errorIndex,
        expectedErrors,
        CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].ABOVE_MAXIMUM,
      );
    });
  });
});
