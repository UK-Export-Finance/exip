import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';
import application from '../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - radios - Yes to no', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

      cy.navigateToUrl(url);
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting all radios as `yes` and submitting conditional fields', () => {
    before(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitModernSlaveryForm({
        willAdhereToAllRequirements: true,
        hasNoOffensesOrInvestigations: true,
        isNotAwareOfExistingSlavery: true,
      });
    });

    describe('after changing the answers from yes to no and going back to the page', () => {
      before(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitModernSlaveryForm({
          willAdhereToAllRequirements: false,
          hasNoOffensesOrInvestigations: false,
          isNotAwareOfExistingSlavery: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({});
      });

      describe(WILL_ADHERE_TO_ALL_REQUIREMENTS, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertNoRadioOptionIsChecked(0);
        });

        it(`should have the submitted "${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}" textarea value`, () => {
          const fieldId = CANNOT_ADHERE_TO_ALL_REQUIREMENTS;

          cy.checkTextareaValue({
            fieldId,
            expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
          });
        });
      });

      describe(HAS_NO_OFFENSES_OR_INVESTIGATIONS, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertNoRadioOptionIsChecked(1);
        });

        it(`should have the submitted "${OFFENSES_OR_INVESTIGATIONS}" textarea value`, () => {
          const fieldId = OFFENSES_OR_INVESTIGATIONS;

          cy.checkTextareaValue({
            fieldId,
            expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
          });
        });
      });

      describe(IS_NOT_AWARE_OF_EXISTING_SLAVERY, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertNoRadioOptionIsChecked(1);
        });

        it(`should have the submitted "${AWARE_OF_EXISTING_SLAVERY}" textarea value`, () => {
          const fieldId = AWARE_OF_EXISTING_SLAVERY;

          cy.checkTextareaValue({
            fieldId,
            expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
          });
        });
      });
    });
  });
});
