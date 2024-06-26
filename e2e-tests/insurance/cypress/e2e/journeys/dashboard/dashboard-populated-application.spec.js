import dashboardPage from '../../../../../pages/insurance/dashboard';
import partials from '../../../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';
import application from '../../../../../fixtures/application';
import formatCurrency from '../../../../../helpers/format-currency';

const { table } = dashboardPage;

const { taskList } = partials.insurancePartials;

const { DASHBOARD } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.DASHBOARD;

const { TABLE_HEADERS } = CONTENT_STRINGS;

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: {
      COUNTRY,
      NAME,
    },
  },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

context('Insurance - Dashboard - populated application', () => {
  const baseUrl = Cypress.config('baseUrl');
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${DASHBOARD}`;

      partials.header.navigation.applications().click();

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when completing the `your buyer - company or organisation` form', () => {
    before(() => {
      cy.navigateToUrl(url);

      // go to application
      table.body.row(referenceNumber).submittedLink().click();

      // go to the 'your buyer' section via task list
      const task = taskList.prepareApplication.tasks.buyer;

      task.link().click();

      // complete and submit the form
      cy.completeAndSubmitCompanyOrOrganisationForm({});
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      partials.header.navigation.applications().click();
    });

    it(`should render a value in the ${TABLE_HEADERS.BUYER_LOCATION} cell`, () => {
      const cell = table.body.row(referenceNumber).buyerLocation();

      const expected = application.BUYER[COUNTRY];
      cy.checkText(cell, expected);
    });

    it(`should render a value in the ${TABLE_HEADERS.BUYER_NAME} cell`, () => {
      const cell = table.body.row(referenceNumber).buyerName();

      const expected = application.BUYER[NAME];
      cy.checkText(cell, expected);
    });
  });

  describe('when completing the `policy - tell us about your policy` form - single policy type', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // go to application
      table.body.row(referenceNumber).submittedLink().click();

      // go to the 'policy' section via task list
      const task = taskList.prepareApplication.tasks.policy;

      task.link().click();

      // complete the first form - single contract policy
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      // complete and submit the form
      cy.completeAndSubmitSingleContractPolicyForm({});
    });

    it(`should render a formatted value of ${TOTAL_CONTRACT_VALUE} in the ${TABLE_HEADERS.VALUE} cell`, () => {
      partials.header.navigation.applications().click();

      const cell = table.body.row(referenceNumber).value();

      const expected = formatCurrency(application.POLICY[TOTAL_CONTRACT_VALUE]);

      cy.checkText(cell, expected);
    });
  });

  describe('when completing the `policy - tell us about your policy` form - multiple policy type', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // go to application
      table.body.row(referenceNumber).submittedLink().click();

      // go to the 'policy' section via task list
      const task = taskList.prepareApplication.tasks.policy;

      task.link().click();

      // complete the first form - single contract policy
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      // complete and submit the form
      cy.completeAndSubmitMultipleContractPolicyForm({});
    });

    it(`should render a formatted value of ${MAXIMUM_BUYER_WILL_OWE} in the ${TABLE_HEADERS.VALUE} cell`, () => {
      partials.header.navigation.applications().click();

      const cell = table.body.row(referenceNumber).value();

      const expected = formatCurrency(application.POLICY[MAXIMUM_BUYER_WILL_OWE]);

      cy.checkText(cell, expected);
    });
  });
});
