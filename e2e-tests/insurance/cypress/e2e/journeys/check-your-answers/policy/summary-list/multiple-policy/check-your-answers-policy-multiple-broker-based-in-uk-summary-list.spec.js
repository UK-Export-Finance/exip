import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Multiple contract policy - Broker - based in UK - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ usingBroker: true, brokerIsBasedInUk: true });

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

  it('should render generic policy summary list rows', () => {
    cy.assertGenericMultiplePolicySummaryListRows();
  });

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]({ usingBroker: true });
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList.BROKER[NAME]({});
  });

  it(`should render a ${SELECT_THE_ADDRESS} summary list row`, () => {
    checkSummaryList.BROKER[SELECT_THE_ADDRESS]();
  });

  it(`should render a ${EMAIL} summary list row`, () => {
    checkSummaryList.BROKER[EMAIL]();
  });
});
