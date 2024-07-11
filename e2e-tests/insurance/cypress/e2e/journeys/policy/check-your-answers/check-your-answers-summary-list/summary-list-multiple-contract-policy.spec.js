import { FIELD_VALUES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  POLICY,
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
  NAME_ON_POLICY: { NAME },
  USING_BROKER,
  LOSS_PAYEE: { IS_APPOINTED: LOSS_PAYEE_IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Multiple contract policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE });

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

  it('should render generic policy summary list rows', () => {
    cy.assertGenericMultiplePolicySummaryListRows();
  });

  it(`should render a ${NEED_PRE_CREDIT_PERIOD} summary list row`, () => {
    checkSummaryList[NEED_PRE_CREDIT_PERIOD]({});
  });

  it(`should NOT render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]({});
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({});
  });

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]({ usingBroker: false });
  });

  it(`should render a ${LOSS_PAYEE_IS_APPOINTED} summary list row`, () => {
    checkSummaryList[LOSS_PAYEE_IS_APPOINTED]({ isAppointingLossPayee: false });
  });

  it(`should NOT render a ${LOSS_PAYEE_NAME} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[LOSS_PAYEE_NAME]({ shouldRender: false });
  });

  it(`should NOT render a ${FINANCIAL_ADDRESS} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[FINANCIAL_ADDRESS]({ shouldRender: false });
  });

  it(`should NOT render a ${SORT_CODE} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[SORT_CODE]({ shouldRender: false });
  });

  it(`should NOT render a ${ACCOUNT_NUMBER} summary list row`, () => {
    checkSummaryList.LOSS_PAYEE[ACCOUNT_NUMBER]({ shouldRender: false });
  });
});
