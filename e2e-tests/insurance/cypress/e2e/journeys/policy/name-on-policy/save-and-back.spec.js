import { field } from '../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const { POLICY_CONTACT } = application;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const {
  NAME_ON_POLICY: { POSITION, SAME_NAME, OTHER_NAME },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Name on policy - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'totalContractValue' });

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

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe('when submitting other name via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false, submit: false });
      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertRadioOptionIsChecked(field(OTHER_NAME).input());
    });
  });

  describe('when submitting same name but no position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      field(SAME_NAME).label().click();

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertRadioOptionIsChecked(field(SAME_NAME).input());

      cy.checkValue(field(POSITION), '');
    });
  });

  describe('when submitting same name and position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeNameOnPolicyForm({ sameName: true });

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.assertRadioOptionIsChecked(field(SAME_NAME).input());

      cy.checkValue(field(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
