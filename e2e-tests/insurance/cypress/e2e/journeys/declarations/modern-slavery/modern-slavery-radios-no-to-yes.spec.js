import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';

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

context('Insurance - Declarations - Modern slavery page - radios - No to yes', () => {
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

  describe('when submitting all radios as `no` and submitting conditional fields', () => {
    before(() => {
      cy.navigateToUrl(url);

      cy.completeModernSlaveryForm({
        willAdhereToAllRequirements: false,
        hasNoOffensesOrInvestigations: false,
        isNotAwareOfExistingSlavery: false,
      });

      cy.completeAndSubmitModernSlaveryFormConditionalFields({});
    });

    describe('after changing the answers from no to yes and going back to the page', () => {
      before(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitModernSlaveryForm({
          willAdhereToAllRequirements: true,
          hasNoOffensesOrInvestigations: true,
          isNotAwareOfExistingSlavery: true,
        });
      });

      describe(WILL_ADHERE_TO_ALL_REQUIREMENTS, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertYesRadioOptionIsChecked(0);
        });

        it('should have an empty textarea', () => {
          cy.clickNoRadioInput();

          cy.checkTextareaValue({
            fieldId: CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
            expectedValue: '',
          });
        });
      });

      describe(HAS_NO_OFFENSES_OR_INVESTIGATIONS, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertYesRadioOptionIsChecked(1);
        });

        it('should have an empty textarea', () => {
          cy.clickNoRadioInput();

          cy.checkTextareaValue({
            fieldId: OFFENSES_OR_INVESTIGATIONS,
            expectedValue: '',
          });
        });
      });

      describe(IS_NOT_AWARE_OF_EXISTING_SLAVERY, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should render the submitted radio value', () => {
          cy.assertYesRadioOptionIsChecked(1);
        });

        it('should have an empty textarea', () => {
          cy.clickNoRadioInput();

          cy.checkTextareaValue({
            fieldId: AWARE_OF_EXISTING_SLAVERY,
            expectedValue: '',
          });
        });
      });
    });
  });
});
