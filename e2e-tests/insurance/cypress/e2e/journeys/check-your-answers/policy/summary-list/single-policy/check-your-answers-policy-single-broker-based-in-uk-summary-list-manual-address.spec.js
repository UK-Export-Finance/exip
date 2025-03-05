import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';
import { status } from '../../../../../../../../pages/shared';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Single contract policy - Broker - Not based in UK - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({
        usingBroker: true,
        brokerIsBasedInUk: true,
        provideBrokerAddressManually: true,
      });

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

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]({ usingBroker: true });
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList.BROKER[NAME]();
  });

  it(`should render a ${EMAIL} summary list row`, () => {
    checkSummaryList.BROKER[EMAIL]();
  });

  it(`should render a ${FULL_ADDRESS} summary list row`, () => {
    checkSummaryList.BROKER[FULL_ADDRESS]({});
  });

  it(`should NOT render a ${SELECT_THE_ADDRESS} summary list row`, () => {
    checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: false });
  });
});
