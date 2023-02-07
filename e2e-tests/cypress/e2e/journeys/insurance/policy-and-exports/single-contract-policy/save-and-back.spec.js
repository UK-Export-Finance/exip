import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { singleContractPolicyPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: {
      SINGLE_CONTRACT_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Single contract policy page - Save and go back', () => {
  let referenceNumber;
  const date = new Date();
  const futureDate = add(date, { months: 3 });

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });
  });

  describe('when entering an invalid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = singleContractPolicyPage[REQUESTED_START_DATE];

    before(() => {
      // go back to the page via the task list
      task.link().click();
      submitButton().click();

      // enter an invalid date
      const yesterday = sub(date, { days: 1 });

      field.dayInput().type(getDate(yesterday));
      field.monthInput().type(getMonth(yesterday));
      field.yearInput().type(getYear(yesterday));
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      before(() => {
        task.link().click();
        submitButton().click();
      });

      it('should not have saved the submitted values', () => {
        field.dayInput().should('have.value', '');
        field.monthInput().should('have.value', '');
        field.yearInput().should('have.value', '');
      });
    });
  });

  describe('when entering a valid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = singleContractPolicyPage[REQUESTED_START_DATE];

    before(() => {
      field.dayInput().type('1');
      field.monthInput().type(getMonth(futureDate));
      field.yearInput().type(getYear(futureDate));

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      before(() => {
        task.link().click();
        submitButton().click();
      });

      it('should have the submitted values', () => {
        field.dayInput().should('have.value', '1');
        field.monthInput().should('have.value', getMonth(futureDate));
        field.yearInput().should('have.value', getYear(futureDate));
      });
    });
  });

  describe('when removing a previously submitted `buyer credit period` value', () => {
    const field = singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER];

    before(() => {
      // submit a value
      field.input().type('Test');
      saveAndBackButton().click();

      // go back to the page
      partials.backLink().click();

      field.input().clear();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    describe('when going back to the page', () => {
      before(() => {
        task.link().click();
        submitButton().click();
      });

      it('should have no value in `buyer credit period`', () => {
        field.input().should('have.value', '');
      });
    });
  });
});
