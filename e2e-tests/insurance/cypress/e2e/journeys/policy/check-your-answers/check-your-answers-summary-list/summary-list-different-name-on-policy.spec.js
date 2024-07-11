import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY,
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
    NAME_ON_POLICY: { NAME },
    USING_BROKER,
    LOSS_PAYEE: { IS_APPOINTED: LOSS_PAYEE_IS_APPOINTED },
  },
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - Summary list - Single contract policy - Different name on policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ sameName: false });

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
    cy.assertGenericSinglePolicySummaryListRows();
  });

  it(`should render a ${NEED_PRE_CREDIT_PERIOD} summary list row`, () => {
    checkSummaryList[NEED_PRE_CREDIT_PERIOD]({});
  });

  it(`should NOT render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]({});
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({ sameName: false });
  });

  it(`should render a ${EMAIL} summary list row`, () => {
    checkSummaryList[EMAIL]({});
  });

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]({ usingBroker: false });
  });

  it(`should render a ${LOSS_PAYEE_IS_APPOINTED} summary list row`, () => {
    checkSummaryList[LOSS_PAYEE_IS_APPOINTED]({ isAppointingLossPayee: false });
  });
});
