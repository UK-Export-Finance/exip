import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
    EXPORT_VALUE: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
    NAME_ON_POLICY: { NAME, POSITION },
    USING_BROKER,
    BROKER,
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy - Single contract policy - Same name - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, usingBroker: true });

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

  it(`should render a ${POLICY_TYPE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[POLICY_TYPE]();
  });

  it(`should render a ${REQUESTED_START_DATE} summary list row`, () => {
    checkSummaryList[REQUESTED_START_DATE]();
  });

  it(`should render a ${CONTRACT_COMPLETION_DATE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[CONTRACT_COMPLETION_DATE]();
  });

  it(`should render a ${TOTAL_CONTRACT_VALUE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[TOTAL_CONTRACT_VALUE]();
  });

  it(`should render a ${POLICY_CURRENCY_CODE} summary list row`, () => {
    checkSummaryList[POLICY_CURRENCY_CODE]();
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({});
  });

  it(`should render a ${POSITION} summary list row`, () => {
    checkSummaryList[POSITION]();
  });

  describe('`broker`', () => {
    it(`should render a ${USING_BROKER} summary list row`, () => {
      checkSummaryList[USING_BROKER]();
    });

    it(`should render a ${BROKER.NAME} summary list row`, () => {
      checkSummaryList.BROKER[BROKER.NAME]({});
    });

    it(`should render a ${BROKER.ADDRESS_LINE_1} summary list row`, () => {
      checkSummaryList.BROKER[BROKER.ADDRESS_LINE_1]();
    });

    it(`should render a ${BROKER.EMAIL} summary list row`, () => {
      checkSummaryList.BROKER[BROKER.EMAIL]();
    });
  });
});
