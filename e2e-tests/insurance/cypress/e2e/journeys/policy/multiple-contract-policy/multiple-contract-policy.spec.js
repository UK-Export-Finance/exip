import {
  field as fieldSelector,
  headingCaption,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  LINKS,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import checkPolicyCurrencyCodeInput from '../../../../../../commands/insurance/check-policy-currency-code-input';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: {
    TYPE_OF_POLICY,
    MULTIPLE_CONTRACT_POLICY,
    ABOUT_GOODS_OR_SERVICES,
  },
} = INSURANCE_ROUTES;

const { CONTRACT_POLICY } = FIELDS;

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), CONTRACT_POLICY[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    it('renders `total months of cover` label, hint and input', () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);
      cy.checkText(field.hint(), CONTRACT_POLICY.MULTIPLE[fieldId].HINT);
      field.input().should('exist');
    });

    it('renders `total sales to buyer` label, hint, prefix and input', () => {
      const fieldId = TOTAL_SALES_TO_BUYER;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.hint(), CONTRACT_POLICY.MULTIPLE[fieldId].HINT);

      cy.checkText(field.prefix(), '£');

      field.input().should('exist');
    });

    it('renders `maximum buyer will owe` label, hint, prefix, input', () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;
      const field = multipleContractPolicyPage[fieldId];
      const { HINT } = CONTRACT_POLICY.MULTIPLE[fieldId];

      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.label(), CONTRACT_POLICY.MULTIPLE[fieldId].LABEL);

      cy.checkText(field.hint.forExample(), HINT.FOR_EXAMPLE);

      const expected = `${HINT.NEED_MORE_COVER} ${HINT.FILL_IN_FORM.TEXT}`;
      cy.checkText(field.hint.needMoreCover(), expected);

      cy.checkLink(
        field.hint.fillInFormLink(),
        LINKS.EXTERNAL.PROPOSAL_FORM,
        HINT.FILL_IN_FORM.TEXT,
      );

      cy.checkText(field.hint.noDecimals(), HINT.NO_DECIMALS);

      field.input().should('exist');
    });

    it('renders `currency` label, hint and input with supported currencies ordered alphabetically', () => {
      checkPolicyCurrencyCodeInput();
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, () => {
      cy.completeAndSubmitMultipleContractPolicyForm({});

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
      cy.assertUrl(expectedUrl);
    });

    it('should retain the `type of policy` task status as `in progress` after submitting the form', () => {
      cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        fieldSelector(REQUESTED_START_DATE).dayInput().should('have.value', application.POLICY[REQUESTED_START_DATE].day);
        fieldSelector(REQUESTED_START_DATE).monthInput().should('have.value', application.POLICY[REQUESTED_START_DATE].month);
        fieldSelector(REQUESTED_START_DATE).yearInput().should('have.value', application.POLICY[REQUESTED_START_DATE].year);

        cy.checkText(fieldSelector(TOTAL_MONTHS_OF_COVER).inputOptionSelected(), `${application.POLICY[TOTAL_MONTHS_OF_COVER]} months`);

        fieldSelector(TOTAL_SALES_TO_BUYER).input().should('have.value', application.POLICY[TOTAL_SALES_TO_BUYER]);
        fieldSelector(MAXIMUM_BUYER_WILL_OWE).input().should('have.value', application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
        policyCurrencyCodeFormField.inputOptionSelected().contains(application.POLICY[POLICY_CURRENCY_CODE]);
      });
    });
  });
});
