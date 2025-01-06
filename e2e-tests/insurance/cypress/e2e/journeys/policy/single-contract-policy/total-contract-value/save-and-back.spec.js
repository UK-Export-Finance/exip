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
    SINGLE: { TOTAL_CONTRACT_VALUE, REQUESTED_CREDIT_LIMIT },
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
  });

  describe(`when only ${TOTAL_CONTRACT_VALUE} is provided`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeTotalContractValueForm({ requestedCreditLimit: '' });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.checkValue(fieldSelector(TOTAL_CONTRACT_VALUE), application.POLICY[TOTAL_CONTRACT_VALUE]);
      cy.checkValue(fieldSelector(REQUESTED_CREDIT_LIMIT), '');
    });
  });

  describe(`when only ${REQUESTED_CREDIT_LIMIT} is provided`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeTotalContractValueForm({ totalContractValue: '' });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.checkValue(fieldSelector(REQUESTED_CREDIT_LIMIT), application.POLICY[REQUESTED_CREDIT_LIMIT]);
    });
  });

  describe('when all fields are provided', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeTotalContractValueForm({});

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.checkValue(fieldSelector(TOTAL_CONTRACT_VALUE), application.POLICY[TOTAL_CONTRACT_VALUE]);
      cy.checkValue(fieldSelector(REQUESTED_CREDIT_LIMIT), application.POLICY[REQUESTED_CREDIT_LIMIT]);
    });
  });
});
