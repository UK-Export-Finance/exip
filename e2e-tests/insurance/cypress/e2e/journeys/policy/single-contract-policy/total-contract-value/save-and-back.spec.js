import { field as fieldSelector } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE, CREDIT_LIMIT },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - Total contract value page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ formToStopAt: 'singleContractPolicy' });

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

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

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when entering an invalid total contract value and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_CONTRACT_VALUE);
    const invalidValue = 'Not a number';

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), invalidValue);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(field.input(), invalidValue);

        cy.clickSaveAndBackButton();

        cy.startInsurancePolicySection({});

        // go through the first 2 single contract policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });
      });

      it('should NOT have saved the submitted value', () => {
        field.input().should('have.value', '');
      });
    });
  });

  describe('when entering a valid total contract value and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_CONTRACT_VALUE);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), application.POLICY[TOTAL_CONTRACT_VALUE]);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should have the submitted value', () => {
        fieldSelector(TOTAL_CONTRACT_VALUE).input().should('have.value', application.POLICY[TOTAL_CONTRACT_VALUE]);
        fieldSelector(CREDIT_LIMIT).input().should('have.value', application.POLICY[CREDIT_LIMIT]);
      });
    });
  });
});
