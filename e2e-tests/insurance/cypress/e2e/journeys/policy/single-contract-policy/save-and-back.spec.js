import { field as fieldSelector } from '../../../../../../pages/shared';
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

      cy.startInsurancePolicySection({});
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

      cy.clickSaveAndBackButton();
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
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;

      const yesterday = new Date(now.setDate(day - 1));

      cy.keyboardInput(field.dayInput(), yesterday.getDate());
      cy.keyboardInput(field.monthInput(), month);
      cy.keyboardInput(field.yearInput(), yesterday.getFullYear());

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should not have saved the submitted values when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButton();

      field.dayInput().should('have.value', '');
      field.monthInput().should('have.value', '');
      field.yearInput().should('have.value', '');
    });
  });

  describe('when entering a valid requested cover start date and submitting the form via `save and go back` button', () => {
    const field = fieldSelector(REQUESTED_START_DATE);
    const month = new Date(futureDate).getMonth() + 1;

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.dayInput(), '1');
      cy.keyboardInput(field.monthInput(), month);
      cy.keyboardInput(field.yearInput(), new Date(futureDate).getFullYear());

      cy.clickSaveAndBackButton();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(expected);
    });

    it('should retain the `type of policy` task status as `in progress`', () => {
      cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
    });

    it('should have the submitted values when going back to the page', () => {
      cy.startInsurancePolicySection({});
      cy.clickSubmitButton();

      field.dayInput().should('have.value', '1');
      field.monthInput().should('have.value', month);
      field.yearInput().should('have.value', new Date(futureDate).getFullYear());
    });
  });
});
