import { field, saveAndBackButton } from '../../../../../../pages/shared';
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
    NAME_ON_POLICY,
  },
  ALL_SECTIONS,
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: {
      POSITION, SAME_NAME, OTHER_NAME,
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Name on policy - Save and go back', () => {
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

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
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
  });

  describe('when submitting other name via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false, submit: false });
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      field(OTHER_NAME).input().should('be.checked');
    });
  });

  describe('when submitting same name but no position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      field(SAME_NAME).input().click();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      field(SAME_NAME).input().should('be.checked');

      cy.checkValue(field(POSITION), '');
    });
  });

  describe('when submitting same name and position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeNameOnPolicyForm({ sameName: true });
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      field(SAME_NAME).input().should('be.checked');

      cy.checkValue(field(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
