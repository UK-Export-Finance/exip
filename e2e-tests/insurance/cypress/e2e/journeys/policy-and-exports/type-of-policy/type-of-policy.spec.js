import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  ERROR_MESSAGES,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const { POLICY_AND_EXPORTS } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;

const singlePolicyField = insurance.policyAndExport.typeOfPolicyPage[FIELD_ID].single;
const multiplePolicyField = insurance.policyAndExport.typeOfPolicyPage[FIELD_ID].multiple;

const { taskList } = partials.insurancePartials;

const goToPageDirectly = (referenceNumber) => {
  cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`);
};

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Type of policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders an intro paragraph', () => {
      cy.checkText(insurance.policyAndExport.typeOfPolicyPage.intro(), CONTENT_STRINGS.INTRO);
    });

    it('renders `single` radio input with label and hint text list', () => {
      singlePolicyField.input().should('exist');
      cy.checkText(singlePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);

      cy.checkText(singlePolicyField.hintList.item1(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[0]);

      cy.checkText(singlePolicyField.hintList.item2(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[1]);

      cy.checkText(singlePolicyField.hintList.item3(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[2]);

      cy.checkText(singlePolicyField.hintList.item4(), FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[3]);
    });

    it('renders `multiple` radio input with label and hint text list', () => {
      multiplePolicyField.input().should('exist');
      cy.checkText(multiplePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.TEXT);

      cy.checkText(multiplePolicyField.hintList.item1(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[0]);

      cy.checkText(multiplePolicyField.hintList.item2(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[1]);

      cy.checkText(multiplePolicyField.hintList.item3(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT_LIST[2]);
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render a validation error', () => {
        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          singlePolicyField,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY[FIELD_ID].IS_EMPTY,
        );
      });
    });

    describe('when submitting the answer as `single`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, () => {
        singlePolicyField.input().click();

        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

        cy.assertUrl(expected);
      });

      it('should have the originally submitted answer selected when going back to the page', () => {
        goToPageDirectly(referenceNumber);

        singlePolicyField.input().should('be.checked');
      });
    });

    describe('when submitting the answer as `multiple`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, () => {
        cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

        cy.assertUrl(expected);
      });

      it('should have the originally submitted answer selected when going back to the page', () => {
        goToPageDirectly(referenceNumber);

        multiplePolicyField.input().should('be.checked');
      });
    });

    describe('after submitting an answer', () => {
      it('should update the status of task `type of policy and exports` to `in progress`', () => {
        cy.navigateToUrl(url);

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`);

        const expected = TASKS.STATUS.IN_PROGRESS;
        cy.checkText(task.status(), expected);
      });
    });
  });
});
