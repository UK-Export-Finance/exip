import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import { singleContractPolicyPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import {
  BUTTONS,
  LINKS,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} from '../../../../../../constants';
import application from '../../../../../fixtures/application';
import checkPolicyCurrencyCodeInput from '../../../../../support/insurance/check-policy-currency-code-input';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY,
      SINGLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: {
          CONTRACT_COMPLETION_DATE,
          TOTAL_CONTRACT_VALUE,
        },
      },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Single contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', url);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `requested start date` label, hint and inputs', () => {
      const fieldId = REQUESTED_START_DATE;
      const field = singleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    it('renders `contract completion date` label, hint and inputs', () => {
      const fieldId = CONTRACT_COMPLETION_DATE;
      const field = singleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    it('renders `total contract value` label, hint, prefix and input', () => {
      const fieldId = TOTAL_CONTRACT_VALUE;
      const field = singleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].LABEL);

      const hintContent = FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT;

      cy.checkText(
        field.hint.needMoreCover(),
        hintContent.NEED_MORE_COVER,
      );

      cy.checkText(
        field.hint.link(),
        hintContent.FILL_IN_FORM.TEXT,
      );

      field.hint.link().should('have.attr', 'href', LINKS.EXTERNAL.PROPOSAL_FORM);

      cy.checkText(
        field.hint.noDecimals(),
        hintContent.NO_DECIMALS,
      );

      cy.checkText(field.prefix(), '£');

      field.input().should('exist');
    });

    it('renders `buyer credit period` label, hint and input', () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;
      const field = singleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY[fieldId].HINT);

      field.input().should('exist');
    });

    describe('currency', () => {
      it('renders `currency` label, hint and input with supported currencies ordered alphabetically', () => {
        checkPolicyCurrencyCodeInput();
      });
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitSingleContractPolicyForm({});
    });

    it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      cy.url().should('eq', expectedUrl);
    });

    it('should retain the `type of policy and exports` task status as `in progress` after submitting the form', () => {
      cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitSingleContractPolicyForm({});

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`);

        singleContractPolicyPage[REQUESTED_START_DATE].dayInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
        singleContractPolicyPage[REQUESTED_START_DATE].monthInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
        singleContractPolicyPage[REQUESTED_START_DATE].yearInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

        singleContractPolicyPage[CONTRACT_COMPLETION_DATE].dayInput().should('have.value', application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].day);
        singleContractPolicyPage[CONTRACT_COMPLETION_DATE].monthInput().should('have.value', application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].month);
        singleContractPolicyPage[CONTRACT_COMPLETION_DATE].yearInput().should('have.value', application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].year);

        singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input().should('have.value', application.POLICY_AND_EXPORTS[TOTAL_CONTRACT_VALUE]);
        singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().should('have.value', application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);
        policyCurrencyCodeFormField.inputOptionSelected().contains(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);
      });
    });

    describe('when the credit period with buyer field is a pure number and there are no other validation errors', () => {
      const creditPeriodField = singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER];
      const submittedValue = '1234';

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(creditPeriodField.input(), submittedValue);
        submitButton().click();
      });

      it('should retain the submitted value when going back to the page', () => {
        cy.clickBackLink();

        creditPeriodField.input().should('have.value', submittedValue);
      });
    });
  });
});
