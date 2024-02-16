import { field } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const { POLICY_CONTACT } = application;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    DIFFERENT_NAME_ON_POLICY,
  },
  ALL_SECTIONS,
} = INSURANCE_ROUTES;

const {
  POLICY: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Different name on policy - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
      allSectionsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
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

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the all inputs as empty when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(field(FIRST_NAME), '');
      cy.checkValue(field(LAST_NAME), '');
      cy.checkValue(field(EMAIL), '');
      cy.checkValue(field(POSITION), '');
    });
  });

  describe('when submitting a partially completed form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(FIRST_NAME).input(), POLICY_CONTACT[FIRST_NAME]);
      cy.keyboardInput(field(LAST_NAME).input(), POLICY_CONTACT[LAST_NAME]);

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the originally submitted answers populated when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(field(FIRST_NAME), POLICY_CONTACT[FIRST_NAME]);
      cy.checkValue(field(LAST_NAME), POLICY_CONTACT[LAST_NAME]);
      cy.checkValue(field(EMAIL), '');
      cy.checkValue(field(POSITION), '');
    });
  });

  describe('when submitting a fully submitted form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeDifferentNameOnPolicyForm({});
      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the status of task `type of policy and exports` as `in progress`', () => {
      cy.checkTaskPolicyStatusIsInProgress();
    });

    it('should have the originally submitted answers populated when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(field(FIRST_NAME), POLICY_CONTACT[FIRST_NAME]);
      cy.checkValue(field(LAST_NAME), POLICY_CONTACT[LAST_NAME]);
      cy.checkValue(field(EMAIL), POLICY_CONTACT[EMAIL]);
      cy.checkValue(field(POSITION), POLICY_CONTACT[POSITION]);
    });

    it('should have the originally submitted answers populated when going back to the page through policy and exports flow', () => {
      cy.startInsurancePolicySection({});

      // go through 4 policy forms.
      cy.clickSubmitButtonMultipleTimes({ count: 4 });

      cy.checkValue(field(FIRST_NAME), POLICY_CONTACT[FIRST_NAME]);
      cy.checkValue(field(LAST_NAME), POLICY_CONTACT[LAST_NAME]);
      cy.checkValue(field(EMAIL), POLICY_CONTACT[EMAIL]);
      cy.checkValue(field(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
