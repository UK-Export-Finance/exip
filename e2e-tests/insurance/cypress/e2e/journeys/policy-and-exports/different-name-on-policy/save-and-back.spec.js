import { input, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const { POLICY_CONTACT } = application;

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY,
  },
  ALL_SECTIONS,
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Different name on policy - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
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

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the all inputs as empty when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(input.field(FIRST_NAME), '');
      cy.checkValue(input.field(LAST_NAME), '');
      cy.checkValue(input.field(EMAIL), '');
      cy.checkValue(input.field(POSITION), '');
    });
  });

  describe('when submitting a partially completed form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(input.field(FIRST_NAME).input(), POLICY_CONTACT[FIRST_NAME]);
      cy.keyboardInput(input.field(LAST_NAME).input(), POLICY_CONTACT[LAST_NAME]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the originally submitted answers populated when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(input.field(FIRST_NAME), POLICY_CONTACT[FIRST_NAME]);
      cy.checkValue(input.field(LAST_NAME), POLICY_CONTACT[LAST_NAME]);
      cy.checkValue(input.field(EMAIL), '');
      cy.checkValue(input.field(POSITION), '');
    });
  });

  describe('when submitting a fully submitted form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeDifferentNameOnPolicyForm({});
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the originally submitted answers populated when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      cy.checkValue(input.field(FIRST_NAME), POLICY_CONTACT[FIRST_NAME]);
      cy.checkValue(input.field(LAST_NAME), POLICY_CONTACT[LAST_NAME]);
      cy.checkValue(input.field(EMAIL), POLICY_CONTACT[EMAIL]);
      cy.checkValue(input.field(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
