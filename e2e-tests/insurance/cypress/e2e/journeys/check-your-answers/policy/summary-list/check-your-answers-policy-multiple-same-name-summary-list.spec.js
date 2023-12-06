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
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    NAME_ON_POLICY: { NAME, POSITION },
    USING_BROKER,
    BROKER,
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Policy - Multiple contract policy - Same name - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber, usingBroker: true });

      task.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

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
    checkSummaryList.multipleContractPolicy[POLICY_TYPE]();
  });

  it(`should render a ${REQUESTED_START_DATE} summary list row`, () => {
    checkSummaryList[REQUESTED_START_DATE]();
  });

  it(`should render a ${TOTAL_MONTHS_OF_COVER} summary list row`, () => {
    checkSummaryList.multipleContractPolicy[TOTAL_MONTHS_OF_COVER]();
  });

  it(`should render a ${TOTAL_SALES_TO_BUYER} summary list row`, () => {
    checkSummaryList.multipleContractPolicy[TOTAL_SALES_TO_BUYER]();
  });

  it(`should render a ${MAXIMUM_BUYER_WILL_OWE} summary list row`, () => {
    checkSummaryList.multipleContractPolicy[MAXIMUM_BUYER_WILL_OWE]();
  });

  it(`should render a ${POLICY_CURRENCY_CODE} summary list row`, () => {
    checkSummaryList[POLICY_CURRENCY_CODE]();
  });

  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should render a ${FINAL_DESTINATION} summary list row`, () => {
    checkSummaryList[FINAL_DESTINATION]();
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
