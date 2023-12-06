import { field as fieldSelector, submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: {
    SINGLE_CONTRACT_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      CREDIT_PERIOD_WITH_BUYER,
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  const date = new Date();
  const year = date.getFullYear();
  const futureDate = new Date(date.setFullYear(year + 1));

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

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
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });
  });

  describe('when entering an invalid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(REQUESTED_START_DATE);

    beforeEach(() => {
      cy.navigateToUrl(url);

      // enter an invalid date
      const day = new Date(date).getDate();

      const yesterday = new Date(date.setDate(day - 1));

      cy.keyboardInput(field.dayInput(), yesterday.getDate());
      cy.keyboardInput(field.monthInput(), yesterday.getMonth());
      cy.keyboardInput(field.yearInput(), yesterday.getFullYear());

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should not have saved the submitted values  going back to the page', () => {
      task.link().click();
      submitButton().click();

      field.dayInput().should('have.value', '');
      field.monthInput().should('have.value', '');
      field.yearInput().should('have.value', '');
    });
  });

  describe('when entering a valid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(REQUESTED_START_DATE);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.dayInput(), '1');
      cy.keyboardInput(field.monthInput(), new Date(futureDate).getMonth());
      cy.keyboardInput(field.yearInput(), new Date(futureDate).getFullYear());

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should have the submitted values when going back to the page', () => {
      task.link().click();
      submitButton().click();

      field.dayInput().should('have.value', '1');
      field.monthInput().should('have.value', new Date(futureDate).getMonth());
      field.yearInput().should('have.value', new Date(futureDate).getFullYear());
    });
  });

  describe('when removing a previously submitted `buyer credit period` value', () => {
    const field = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

    beforeEach(() => {
      cy.navigateToUrl(url);

      // submit a value
      cy.keyboardInput(field.input(), 'Test');
      saveAndBackButton().click();

      // go back to the page
      cy.clickBackLink();

      field.input().clear();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should have no value in `buyer credit period` when going back to the page', () => {
      task.link().click();
      submitButton().click();

      field.input().should('have.value', '');
    });
  });
});
