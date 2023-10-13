import { submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY: { ABOUT_GOODS_OR_SERVICES },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    },
  },
} = FIELD_IDS;

const { STATUS: { IN_PROGRESS } } = TASKS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - About goods or services page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      cy.completeAndSubmitSingleContractPolicyForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
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
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });
  });

  describe('when submitting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), application.EXPORT_CONTRACT[DESCRIPTION]);
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should update the status of task `type of policy`to `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should have the originally submitted answer selected when going back to the page after submission', () => {
      cy.navigateToUrl(url);

      // submit the form via 'save and go back' button
      cy.keyboardInput(aboutGoodsOrServicesPage[DESCRIPTION].textarea(), application.EXPORT_CONTRACT[DESCRIPTION]);
      saveAndBackButton().click();

      // go back to the page via the task list
      task.link().click();
      submitButton().click();
      submitButton().click();

      aboutGoodsOrServicesPage[DESCRIPTION].textarea().should('have.value', application.EXPORT_CONTRACT[DESCRIPTION]);
    });
  });

  describe('when removing a previously submitted `description` value', () => {
    const field = aboutGoodsOrServicesPage[DESCRIPTION];

    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit a value
      cy.keyboardInput(field.textarea(), 'Test');
      saveAndBackButton().click();

      // go back to the page
      cy.clickBackLink();

      field.textarea().clear();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should have no value in `description` when going back to the page', () => {
      // go back to the page via the task list
      task.link().click();
      submitButton().click();
      submitButton().click();

      field.textarea().should('have.value', '');
    });
  });
});
