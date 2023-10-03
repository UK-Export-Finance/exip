import { field as fieldSelector } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';

const { taskList } = partials.insurancePartials;

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS.DIFFERENT_NAME_ON_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Different name on Policy page - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(FIRST_NAME, () => {
      const FIELD_ID = FIRST_NAME;
      const ERROR = ERRORS[FIELD_ID];

      const ERROR_ASSERTIONS = {
        field: fieldSelector(FIELD_ID),
        numberOfExpectedErrors: 4,
        errorIndex: 0,
      };

      it(`should display validation errors when ${FIELD_ID} left empty`, () => {
        const errorMessage = ERROR.IS_EMPTY;

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(LAST_NAME, () => {
      const FIELD_ID = LAST_NAME;
      const ERROR = ERRORS[FIELD_ID];

      const ERROR_ASSERTIONS = {
        field: fieldSelector(FIELD_ID),
        numberOfExpectedErrors: 4,
        errorIndex: 1,
      };

      it(`should display validation errors when ${FIELD_ID} left empty`, () => {
        const errorMessage = ERROR.IS_EMPTY;

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(EMAIL, () => {
      const FIELD_ID = EMAIL;
      const ERROR = ERRORS[FIELD_ID];

      const ERROR_ASSERTIONS = {
        field: fieldSelector(FIELD_ID),
        numberOfExpectedErrors: 4,
        errorIndex: 2,
      };

      it(`should display validation errors when ${FIELD_ID} left empty`, () => {
        const errorMessage = ERROR.INCORRECT_FORMAT;

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });

      it(`should display validation errors when ${FIELD_ID} is incorrectly entered`, () => {
        const errorMessage = ERROR.INCORRECT_FORMAT;

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = 'test';

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe(POSITION, () => {
      const FIELD_ID = POSITION;
      const ERROR = ERRORS[FIELD_ID];

      const ERROR_ASSERTIONS = {
        field: fieldSelector(FIELD_ID),
        numberOfExpectedErrors: 4,
        errorIndex: 3,
      };

      it(`should display validation errors when ${FIELD_ID} left empty`, () => {
        const errorMessage = ERROR.IS_EMPTY;

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
        const value = null;

        cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    it(`should display ${FIRST_NAME} field and be prepopulated`, () => {
      const fieldId = FIRST_NAME;
      const field = fieldSelector(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });
  });
});
