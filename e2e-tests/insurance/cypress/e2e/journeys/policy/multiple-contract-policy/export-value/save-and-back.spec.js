import { field as fieldSelector } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE },
} = INSURANCE_ROUTES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy Export value page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'multipleContractPolicy', policyType });

      url = `${baseUrl}${ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;

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

  describe('when entering an invalid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_SALES_TO_BUYER);
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

        // go through 2 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 2 });
      });

      it('should NOT have saved the submitted value', () => {
        cy.assertEmptyFieldValue(TOTAL_SALES_TO_BUYER);
      });
    });
  });

  describe('when entering a valid total sales to buyer and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(TOTAL_SALES_TO_BUYER);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

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
        cy.checkValue(fieldSelector(TOTAL_SALES_TO_BUYER), application.POLICY[TOTAL_SALES_TO_BUYER]);
      });
    });
  });

  describe('when all fields are provided and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeExportValueForm({});
      cy.clickSaveAndBackButton();
    });

    describe('when going back to the page', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render all submitted values', () => {
        cy.checkValue(fieldSelector(TOTAL_SALES_TO_BUYER), application.POLICY[TOTAL_SALES_TO_BUYER]);
        cy.checkValue(fieldSelector(MAXIMUM_BUYER_WILL_OWE), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
      });
    });
  });
});
