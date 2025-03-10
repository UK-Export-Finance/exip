import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';
import { status } from '../../../../../../../../pages/shared';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
  NAME_ON_POLICY: { NAME },
  USING_BROKER,
} = POLICY_FIELD_IDS;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Single contract policy - Different name - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ differentPolicyContact: true });

      cy.clickTaskCheckAnswers();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

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

  it('renders a `completed` status tag', () => {
    cy.checkTaskStatusCompleted(status);
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
});
