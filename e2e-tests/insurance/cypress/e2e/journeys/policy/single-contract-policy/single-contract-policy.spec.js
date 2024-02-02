import {
  radios,
  field as fieldSelector,
  headingCaption,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES, TASKS } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import application from '../../../../../../fixtures/application';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: {
    TYPE_OF_POLICY,
    SINGLE_CONTRACT_POLICY,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: {
        CONTRACT_COMPLETION_DATE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;
  let url;

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
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    it('renders `contract completion date` label, hint and inputs', () => {
      const fieldId = CONTRACT_COMPLETION_DATE;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT);

      field.dayInput().should('exist');
      field.monthInput().should('exist');
      field.yearInput().should('exist');
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitSingleContractPolicyForm({});
    });

    it(`should redirect to ${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, () => {
      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;
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

        cy.completeAndSubmitSingleContractPolicyForm({});

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`);

        fieldSelector(REQUESTED_START_DATE).dayInput().should('have.value', application.POLICY[REQUESTED_START_DATE].day);
        fieldSelector(REQUESTED_START_DATE).monthInput().should('have.value', application.POLICY[REQUESTED_START_DATE].month);
        fieldSelector(REQUESTED_START_DATE).yearInput().should('have.value', application.POLICY[REQUESTED_START_DATE].year);

        fieldSelector(CONTRACT_COMPLETION_DATE).dayInput().should('have.value', application.POLICY[CONTRACT_COMPLETION_DATE].day);
        fieldSelector(CONTRACT_COMPLETION_DATE).monthInput().should('have.value', application.POLICY[CONTRACT_COMPLETION_DATE].month);
        fieldSelector(CONTRACT_COMPLETION_DATE).yearInput().should('have.value', application.POLICY[CONTRACT_COMPLETION_DATE].year);

        const isoCode = application.POLICY[POLICY_CURRENCY_CODE];

        const field = radios(POLICY_CURRENCY_CODE, isoCode).option;

        cy.assertRadioOptionIsChecked(field.input());
      });
    });
  });
});
