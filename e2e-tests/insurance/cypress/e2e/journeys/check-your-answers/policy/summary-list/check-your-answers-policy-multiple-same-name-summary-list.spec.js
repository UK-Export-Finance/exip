import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
  NAME_ON_POLICY: { NAME },
  USING_BROKER,
  BROKER_DETAILS,
} = POLICY_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Multiple contract policy - Same name - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber, usingBroker: false });

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

  it(`should render a ${NEED_PRE_CREDIT_PERIOD} summary list row`, () => {
    checkSummaryList[NEED_PRE_CREDIT_PERIOD]({});
  });

  it(`should NOT render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]({});
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({});
  });

  describe('`broker`', () => {
    it(`should render a ${USING_BROKER} summary list row`, () => {
      checkSummaryList[USING_BROKER]({ usingBroker: false });
    });

    // TODO: EMS-2793 - re-enable

    it.skip(`should render a ${BROKER_DETAILS.NAME} summary list row`, () => {
      checkSummaryList.BROKER[BROKER_DETAILS.NAME]({});
    });
    it.skip(`should render a ${BROKER_DETAILS.FULL_ADDRESS} summary list row`, () => {
      checkSummaryList.BROKER[BROKER_DETAILS.FULL_ADDRESS]();
    });

    it.skip(`should render a ${BROKER_DETAILS.EMAIL} summary list row`, () => {
      checkSummaryList.BROKER[BROKER_DETAILS.EMAIL]();
    });
  });
});
