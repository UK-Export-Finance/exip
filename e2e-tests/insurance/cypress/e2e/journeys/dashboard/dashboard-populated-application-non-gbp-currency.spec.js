import dashboardPage from '../../../../../pages/insurance/dashboard';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../constants';
import { POLICY as FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import application from '../../../../../fixtures/application';
import { NON_STANDARD_CURRENCY_CODE } from '../../../../../fixtures/currencies';
import formatCurrency from '../../../../../helpers/format-currency';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE },
  },
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

context('Insurance - Dashboard - populated application - alternative (non GBP) currency', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${DASHBOARD}`;

      cy.clickHeaderApplicationsLink();

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when completing the `policy - tell us about your policy` form - single policy type', () => {
    beforeEach(() => {
      const policyType = FIELD_VALUES.POLICY_TYPE.SINGLE;

      cy.navigateToUrl(url);

      // go to application
      table.body.row(referenceNumber).submittedLink().click();

      // go to the 'policy' section via task list
      cy.startInsurancePolicySection({});

      // complete the first form - single contract policy
      cy.completeAndSubmitPolicyTypeForm({ policyType });

      // complete and submit the next 2 forms
      cy.completeAndSubmitSingleContractPolicyForm({ alternativeCurrency: true, chooseCurrency: true });
      cy.completeAndSubmitTotalContractValueForm({});
    });

    it(`should render a formatted value of ${TOTAL_CONTRACT_VALUE} in the ${TABLE_HEADERS.VALUE} cell`, () => {
      cy.clickHeaderApplicationsLink();

      const cell = table.body.row(referenceNumber).value();

      const expected = formatCurrency(application.POLICY[TOTAL_CONTRACT_VALUE], NON_STANDARD_CURRENCY_CODE);

      cy.checkText(cell, expected);
    });
  });

  describe('when completing the `policy - tell us about your policy` form - multiple policy type', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

      // go to application
      table.body.row(referenceNumber).submittedLink().click();

      // go to the 'policy' section via task list
      cy.startInsurancePolicySection({});

      // complete the first form - single contract policy
      cy.completeAndSubmitPolicyTypeForm({ policyType });

      // complete and submit the next 2 forms
      cy.completeAndSubmitMultipleContractPolicyForm({ alternativeCurrency: true, chooseCurrency: true });
      cy.completeAndSubmitExportValueForm({});
    });

    it(`should render a formatted value of ${MAXIMUM_BUYER_WILL_OWE} in the ${TABLE_HEADERS.VALUE} cell`, () => {
      cy.clickHeaderApplicationsLink();

      const cell = table.body.row(referenceNumber).value();

      const expected = formatCurrency(application.POLICY[MAXIMUM_BUYER_WILL_OWE], NON_STANDARD_CURRENCY_CODE);

      cy.checkText(cell, expected);
    });
  });
});
