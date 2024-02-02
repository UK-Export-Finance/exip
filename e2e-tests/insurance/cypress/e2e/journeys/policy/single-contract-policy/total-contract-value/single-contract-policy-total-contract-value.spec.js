import { field as fieldSelector, headingCaption } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { PAGES, TASKS } from '../../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import application from '../../../../../../../fixtures/application';
import { GBP, SYMBOLS } from '../../../../../../../fixtures/currencies';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE;

const {
  ROOT,
  ALL_SECTIONS,
  POLICY: {
    SINGLE_CONTRACT_POLICY,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy - Total contract value page - As an exporter, I want to provide the details of the single contract policy that I need cover for', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`;

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
      pageTitle: `${CONTENT_STRINGS.PAGE_TITLE} ${GBP.name}?`,
      currentHref: `${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`,
      backLink: `${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `total contract value` hint, prefix and input', () => {
      const fieldId = TOTAL_CONTRACT_VALUE;
      const field = fieldSelector(fieldId);

      cy.checkText(
        field.hint(),
        FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT,
      );

      cy.checkText(field.prefix(), SYMBOLS.GBP);

      field.input().should('exist');
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitTotalContractValueForm({});
    });

    it(`should redirect to ${NAME_ON_POLICY}`, () => {
      const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });

    it('should retain the `type of policy` task status as `in progress` after submitting the form', () => {
      cy.navigateToUrl(`${ROOT}/${referenceNumber}${ALL_SECTIONS}`);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        fieldSelector(TOTAL_CONTRACT_VALUE).input().should('have.value', application.POLICY[TOTAL_CONTRACT_VALUE]);
      });
    });
  });
});
