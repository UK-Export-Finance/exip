import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  LINKS,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import {
  APPLICATION,
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} from '../../../../../../constants';
import application from '../../../../../../fixtures/application';
import checkPolicyCurrencyCodeInput from '../../../../../../commands/insurance/check-policy-currency-code-input';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY,
      MULTIPLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

const { CONTRACT_POLICY } = FIELDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Multiple contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`,
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
      const field = multipleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), CONTRACT_POLICY[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    describe('total months of cover', () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;
      const field = multipleContractPolicyPage[fieldId];

      it('renders `total months of insurance` label, hint and input', () => {
        field.label().should('exist');
        cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

        cy.checkText(field.hint(), CONTRACT_POLICY.MULTIPLE[fieldId].HINT);

        field.input().should('exist');
      });

      it('renders correct amount of month options', () => {
        // Note: additional option is the default/empty option.
        const expected = APPLICATION.POLICY_AND_EXPORT.TOTAL_MONTHS_OF_COVER + 1;
        field.inputOption().should('have.length', expected);
      });
    });

    it('renders `total sales to buyer` label, hint, prefix and input', () => {
      const fieldId = TOTAL_SALES_TO_BUYER;
      const field = multipleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.hint(), CONTRACT_POLICY.MULTIPLE[fieldId].HINT);

      cy.checkText(field.prefix(), '£');

      field.input().should('exist');
    });

    it('renders `maximum buyer will owe` label, hint, prefix, input', () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;
      const field = multipleContractPolicyPage[fieldId];
      const { HINT } = CONTRACT_POLICY.MULTIPLE[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.hint.forExample(), HINT.FOR_EXAMPLE);

      const expected = `${HINT.NEED_MORE_COVER} ${HINT.FILL_IN_FORM.TEXT}`;
      cy.checkText(field.hint.needMoreCover(), expected);

      cy.checkText(field.hint.fillInFormLink(), HINT.FILL_IN_FORM.TEXT);

      field.hint.fillInFormLink().should('have.attr', 'href', LINKS.EXTERNAL.PROPOSAL_FORM);

      cy.checkText(field.hint.noDecimals(), HINT.NO_DECIMALS);

      field.input().should('exist');
    });

    it('renders `buyer credit period` label, hint and input', () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;
      const field = multipleContractPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), CONTRACT_POLICY[fieldId].HINT);

      field.input().should('exist');
    });

    it('renders `currency` label, hint and input with supported currencies ordered alphabetically', () => {
      checkPolicyCurrencyCodeInput();
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, () => {
      cy.completeAndSubmitMultipleContractPolicyForm({});

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

        multipleContractPolicyPage[REQUESTED_START_DATE].dayInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
        multipleContractPolicyPage[REQUESTED_START_DATE].monthInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
        multipleContractPolicyPage[REQUESTED_START_DATE].yearInput().should('have.value', application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

        cy.checkText(multipleContractPolicyPage[TOTAL_MONTHS_OF_COVER].inputOptionSelected(), `${application.POLICY_AND_EXPORTS[TOTAL_MONTHS_OF_COVER]} months`);

        multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().should('have.value', application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);
        multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().should('have.value', application.POLICY_AND_EXPORTS[MAXIMUM_BUYER_WILL_OWE]);
        multipleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().should('have.value', application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);
        policyCurrencyCodeFormField.inputOptionSelected().contains(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);
      });
    });

    describe('when the credit period with buyer field is a pure number and there are no other validation errors', () => {
      const creditPeriodField = multipleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER];
      const submittedValue = '1234';

      it('should retain the submitted value when going back to the page', () => {
        cy.navigateToUrl(url);

        cy.keyboardInput(creditPeriodField.input(), submittedValue);

        submitButton().click();

        cy.clickBackLink();

        creditPeriodField.input().should('have.value', submittedValue);
      });
    });
  });
});
