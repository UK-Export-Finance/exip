import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../constants/field-ids/insurance/declarations';

const {
  ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const numberString = '1';

context('Insurance - Declarations - Textarea fields - Textarea fields should be able to submit after entering a pure number', () => {
  let referenceNumber;
  let modernSlaveryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      modernSlaveryUrl = `${baseUrl}${ROOT}/${referenceNumber}${MODERN_SLAVERY}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CANNOT_ADHERE_TO_ALL_REQUIREMENTS, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: numberString,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(OFFENSES_OR_INVESTIGATIONS, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          hasNoOffensesOrInvestigations: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: numberString,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: OFFENSES_OR_INVESTIGATIONS,
          expectedValue: numberString,
        });
      });
    });
  });

  describe(AWARE_OF_EXISTING_SLAVERY, () => {
    describe('when submitting the textarea field with a pure number and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          isNotAwareOfExistingSlavery: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: numberString,
        });

        cy.clickBackLink();
      });

      it('should render the pure number exactly as it was submitted', () => {
        cy.checkTextareaValue({
          fieldId: AWARE_OF_EXISTING_SLAVERY,
          expectedValue: numberString,
        });
      });
    });
  });
});
