import {
  field,
  headingCaption,
  intro,
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
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const { POLICY } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.TYPE_OF_POLICY;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY.POLICY_TYPE;

const singlePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].single;
const multiplePolicyField = insurance.policy.typeOfPolicyPage[FIELD_ID].multiple;

const { taskList } = partials.insurancePartials;

const goToPageDirectly = (referenceNumber) => {
  cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY.TYPE_OF_POLICY}`);
};

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Type of policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY.TYPE_OF_POLICY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${POLICY.TYPE_OF_POLICY}`,
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
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
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

        const { errorMessage } = field(FIELD_ID);

        const radioField = {
          ...singlePolicyField,
          errorMessage,
        };
        cy.submitAndAssertRadioErrors(
          // singlePolicyField,
          radioField,
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.POLICY.TYPE_OF_POLICY[FIELD_ID].IS_EMPTY,
        );
      });
    });

    describe('when submitting the answer as `single`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${POLICY.SINGLE_CONTRACT_POLICY}`, () => {
        singlePolicyField.input().click();

        submitButton().click();

        const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY.SINGLE_CONTRACT_POLICY}`;

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

      it(`should redirect to ${POLICY.MULTIPLE_CONTRACT_POLICY}`, () => {
        cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        const expected = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY.MULTIPLE_CONTRACT_POLICY}`;

        cy.assertUrl(expected);
      });

      it('should have the originally submitted answer selected when going back to the page', () => {
        goToPageDirectly(referenceNumber);

        multiplePolicyField.input().should('be.checked');
      });
    });

    describe('after submitting an answer', () => {
      it('should update the status of task `type of policy` to `in progress`', () => {
        cy.navigateToUrl(url);

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`);

        const expected = TASKS.STATUS.IN_PROGRESS;
        cy.checkText(task.status(), expected);
      });
    });
  });
});
