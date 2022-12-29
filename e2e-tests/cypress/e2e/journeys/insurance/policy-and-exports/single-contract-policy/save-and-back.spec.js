import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { typeOfPolicyPage, singleContractPolicyPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const { taskList } = partials.insurancePartials;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

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
      },
    },
  },
} = FIELD_IDS;

context('Insurance - Policy and exports - Type of policy page - Save and go back', () => {
  let referenceNumber;
  const date = new Date();
  const futureDate = add(date, { months: 3 });

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    singlePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
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
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('when entering an invalid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = singleContractPolicyPage[REQUESTED_START_DATE];

    before(() => {
      // go back to the page via the task list
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
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
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });

    describe('when going back to the page', () => {
      before(() => {
        taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
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
      const task = taskList.prepareApplication.tasks.policyTypeAndExports;

      task.status().invoke('text').then((text) => {
        const expected = TASKS.STATUS.IN_PROGRESS;

        expect(text.trim()).equal(expected);
      });
    });

    describe('when going back to the page', () => {
      before(() => {
        taskList.prepareApplication.tasks.policyTypeAndExports.link().click();
        submitButton().click();
      });

      it('should have the submitted values', () => {
        field.dayInput().should('have.value', '1');
        field.monthInput().should('have.value', getMonth(futureDate));
        field.yearInput().should('have.value', getYear(futureDate));
      });
    });
  });
});
