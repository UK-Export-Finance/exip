import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const { ROOT: INSURANCE_ROOT, POLICY } = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Single contract policy - Need pre-credit-period', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ needPreCreditPeriod: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a ${NEED_PRE_CREDIT_PERIOD} summary list row`, () => {
    checkSummaryList[NEED_PRE_CREDIT_PERIOD]({ needPreCreditPeriod: true });
  });

  it(`should render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]({ shouldRender: true });
  });
});
