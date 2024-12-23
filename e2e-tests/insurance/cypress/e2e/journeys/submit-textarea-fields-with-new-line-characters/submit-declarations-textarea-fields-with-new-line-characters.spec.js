import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../constants/field-ids/insurance/declarations';
import { MULTI_LINE_STRING, EXPECTED_MULTI_LINE_STRING } from '../../../../../constants';

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

context('Insurance - Textarea fields - `Declarations` textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let modernSlaveryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      modernSlaveryUrl = `${baseUrl}${ROOT}/${referenceNumber}${MODERN_SLAVERY}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CANNOT_ADHERE_TO_ALL_REQUIREMENTS, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: MULTI_LINE_STRING,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(OFFENSES_OR_INVESTIGATIONS, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          hasNoOffensesOrInvestigations: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: MULTI_LINE_STRING,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: OFFENSES_OR_INVESTIGATIONS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(AWARE_OF_EXISTING_SLAVERY, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          isNotAwareOfExistingSlavery: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: AWARE_OF_EXISTING_SLAVERY,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});
