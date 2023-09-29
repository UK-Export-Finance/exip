import { input } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY_AND_EXPORTS: {
      CHECK_YOUR_ANSWERS,
      DIFFERENT_NAME_ON_POLICY,
      NAME_ON_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: {
        NAME, POSITION, SAME_NAME, OTHER_NAME,
      },
    },
  },
} = FIELD_IDS;

const NAME_ON_POLICY_ERRORS = ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS.NAME_ON_POLICY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Name on policy - Validation', () => {
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
        input.field(SAME_NAME),
        0,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });
  });

  describe(`${POSITION} not entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display validation error', () => {
      input.field(SAME_NAME).input().click();

      const expectedErrorsCount = 1;
      const expectedErrorMessage = NAME_ON_POLICY_ERRORS[POSITION].IS_EMPTY;

      cy.submitAndAssertFieldErrors(
        input.field(POSITION),
        null,
        0,
        expectedErrorsCount,
        expectedErrorMessage,
        false,
      );
    });
  });

  describe(`${POSITION} entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should not display validation error and redirect to the next page', () => {
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

      partials.errorSummaryListItems().should('not.exist');

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(expectedUrl);
    });
  });

  describe(`${OTHER_NAME} selected`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should not display validation error and redirect to the next page', () => {
      cy.completeAndSubmitNameOnPolicyForm({});

      partials.errorSummaryListItems().should('not.exist');

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });
  });
});
