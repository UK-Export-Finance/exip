import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
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
  const futureDate = add(date, { years: 1 });

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();
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
      const yesterday = sub(date, { days: 1 });

      cy.keyboardInput(field.dayInput(), getDate(yesterday));
      cy.keyboardInput(field.monthInput(), getMonth(yesterday));
      cy.keyboardInput(field.yearInput(), getYear(yesterday));

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
      cy.keyboardInput(field.monthInput(), getMonth(futureDate));
      cy.keyboardInput(field.yearInput(), getYear(futureDate));

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
      field.monthInput().should('have.value', getMonth(futureDate));
      field.yearInput().should('have.value', getYear(futureDate));
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
