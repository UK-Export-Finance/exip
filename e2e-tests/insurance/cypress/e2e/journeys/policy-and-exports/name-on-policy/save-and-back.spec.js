import { input, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const { POLICY_CONTACT } = application;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY,
    },
    ALL_SECTIONS,
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: {
        POSITION, SAME_NAME, OTHER_NAME,
      },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Name on policy - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
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
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });
  });

  describe('when submitting other name via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitNameOnPolicyForm({ sameName: false, submit: false });
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      input.field(OTHER_NAME).input().should('be.checked');
    });
  });

  describe('when submitting same name but no position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      input.field(SAME_NAME).input().click();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      input.field(SAME_NAME).input().should('be.checked');

      cy.checkValue(input.field(POSITION), '');
    });
  });

  describe('when submitting same name and position via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitNameOnPolicyForm({ sameName: true, submit: false });
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      input.field(SAME_NAME).input().should('be.checked');

      cy.checkValue(input.field(POSITION), POLICY_CONTACT[POSITION]);
    });
  });
});
