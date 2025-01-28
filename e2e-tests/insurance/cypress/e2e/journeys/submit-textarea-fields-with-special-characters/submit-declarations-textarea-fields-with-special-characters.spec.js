import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../constants/field-ids/insurance/declarations';
import mockStringWithSpecialCharacters from '../../../../../fixtures/string-with-special-characters';

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

context('Insurance - Textarea fields - `Declarations` textarea fields should render special characters without character codes after submission', () => {
  let referenceNumber;
  let modernSlaveryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      cy.completeAndSubmitDeclarationsForms({ stopSubmittingAfter: 'exportingWithCodeOfConduct', referenceNumber });

      modernSlaveryUrl = `${baseUrl}${ROOT}/${referenceNumber}${MODERN_SLAVERY}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CANNOT_ADHERE_TO_ALL_REQUIREMENTS, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: mockStringWithSpecialCharacters,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });

  describe(OFFENSES_OR_INVESTIGATIONS, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          hasNoOffensesOrInvestigations: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: mockStringWithSpecialCharacters,
          awareOfExistingSlavery: null,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: OFFENSES_OR_INVESTIGATIONS,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });

  describe(AWARE_OF_EXISTING_SLAVERY, () => {
    describe('when submitting the textarea field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(modernSlaveryUrl);

        cy.completeModernSlaveryForm({
          isNotAwareOfExistingSlavery: false,
        });

        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          cannotAdhereToAllRequirements: null,
          offensesOrInvestigations: null,
          awareOfExistingSlavery: mockStringWithSpecialCharacters,
        });

        cy.clickBackLink();
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: AWARE_OF_EXISTING_SLAVERY,
          expectedValue: mockStringWithSpecialCharacters,
        });
      });
    });
  });
});
