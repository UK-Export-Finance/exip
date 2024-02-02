import {
  radios,
  field as fieldSelector,
  headingCaption,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES, PAGES, TASKS } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
// import checkPolicyCurrencyCodeInput from '../../../../../../commands/insurance/check-policy-currency-code-input';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: {
    TYPE_OF_POLICY,
    MULTIPLE_CONTRACT_POLICY,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  },
} = INSURANCE_ROUTES;

const { CONTRACT_POLICY } = FIELDS;

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});

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

    // it('renders `currency` label, hint and radio inputs', () => {
    //   checkPolicyCurrencyCodeInput();
    // });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('currency form fields', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const { rendering, formSubmission } = assertCurrencyFormFields({
      legend: CONTRACT_POLICY[CURRENCY_CODE].LEGEND,
      errors: CONTRACT_ERROR_MESSAGES,
    });

    rendering();

    formSubmission().submitASupportedCurrency({
      url: MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
      completeNonCurrencyFields: cy.completeMultipleContractPolicyForm({ chooseCurrency: false }),
    });

    formSubmission().submitAlternativeCurrency({ url: MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, () => {
      cy.completeAndSubmitMultipleContractPolicyForm({});

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`;
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

        fieldSelector(TOTAL_MONTHS_OF_COVER).input().should('have.value', application.POLICY[TOTAL_MONTHS_OF_COVER]);

        const isoCode = application.POLICY[POLICY_CURRENCY_CODE];

        const field = radios(POLICY_CURRENCY_CODE, isoCode).option;

        cy.assertRadioOptionIsChecked(field.input());
      });
    });
  });
});
