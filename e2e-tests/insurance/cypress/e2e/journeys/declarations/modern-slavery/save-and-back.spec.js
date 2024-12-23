import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';
import application from '../../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });
      cy.completeAndSubmitCheckYourAnswers();

      // go to the page we want to test.
      cy.clickTaskDeclarationsAndSubmit();

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

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `declarations and submit` as `not started yet`', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsNotStartedYet();
    });
  });

  describe('when fields are partially completed', () => {
    it('should update the status of task `declarations and submit` to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeModernSlaveryForm({
        willAdhereToAllRequirements: true,
        hasNoOffensesOrInvestigations: null,
        isNotAwareOfExistingSlavery: null,
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: null,
          hasNoOffensesOrInvestigations: true,
          isNotAwareOfExistingSlavery: null,
        });

        cy.assertYesRadioOptionIsChecked(1);
      });
    });
  });

  describe('when all fields are submitted with `yes` radios', () => {
    it('should update the status of task `declarations and submit` to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeModernSlaveryForm({
        willAdhereToAllRequirements: true,
        hasNoOffensesOrInvestigations: true,
        isNotAwareOfExistingSlavery: true,
      });

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        // TODO: EMS-4041
        // go through the first 4 declaration forms.
        // cy.clickSubmitButtonMultipleTimes({ count: 4 });
        cy.navigateToUrl(url);

        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: true,
          hasNoOffensesOrInvestigations: true,
          isNotAwareOfExistingSlavery: true,
        });

        cy.assertYesRadioOptionIsChecked(0);
        cy.assertYesRadioOptionIsChecked(1);
        cy.assertYesRadioOptionIsChecked(2);
      });
    });
  });

  describe('when all fields are submitted with `no` radios', () => {
    it('should update the status of task `declarations and submit` to `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeModernSlaveryForm({
        willAdhereToAllRequirements: false,
        hasNoOffensesOrInvestigations: false,
        isNotAwareOfExistingSlavery: false,
      });

      cy.completeModernSlaveryFormConditionalFields({});

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskDeclarationsAndSubmitStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render the submitted radio values', () => {
        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements: false,
          hasNoOffensesOrInvestigations: false,
          isNotAwareOfExistingSlavery: false,
        });

        cy.completeModernSlaveryFormConditionalFields({});

        cy.clickSaveAndBackButton();

        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.navigateToUrl(url);

        cy.assertNoRadioOptionIsChecked(0);
        cy.assertNoRadioOptionIsChecked(1);
        cy.assertNoRadioOptionIsChecked(2);
      });

      it(`should have the submitted "${CANNOT_ADHERE_TO_ALL_REQUIREMENTS}" textarea value`, () => {
        const fieldId = CANNOT_ADHERE_TO_ALL_REQUIREMENTS;

        cy.checkTextareaValue({
          fieldId,
          expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
        });
      });

      it(`should have the submitted "${OFFENSES_OR_INVESTIGATIONS}" textarea value`, () => {
        const fieldId = OFFENSES_OR_INVESTIGATIONS;

        cy.checkTextareaValue({
          fieldId,
          expectedValue: application.DECLARATION.MODERN_SLAVERY[fieldId],
        });
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
