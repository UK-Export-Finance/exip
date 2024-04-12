import partials from '../../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COUNTRY_CODE,
  },
} = POLICY_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Multiple contract policy - Other company Yes - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber, otherCompanyInvolved: true });

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render generic policy summary list rows', () => {
    cy.assertGenericMultiplePolicySummaryListRows();
  });

  it(`should render a ${REQUESTED} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[REQUESTED]({ requested: true });
  });

  it(`should render a ${COMPANY_NAME} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME]({ shouldRender: true });
  });

  it(`should render a ${COMPANY_NUMBER} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER]({ shouldRender: true });
  });

  it(`should render a ${COUNTRY_CODE} summary list row`, () => {
    checkSummaryList.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE]({ shouldRender: true });
  });
});
