import partials from '../../../../../../../partials';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-and-exports-summary-list';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  POLICY_AND_EXPORTS,
} = INSURANCE_ROUTES;

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      CREDIT_PERIOD_WITH_BUYER,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy and exports - Check your answers - Summary list - single contract policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicyAndExportSection({ sameName: false });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`;
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

  it(`should render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]();
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
    checkSummaryList[NAME]({ sameName: false });
  });

  it(`should render a ${EMAIL} summary list row`, () => {
    checkSummaryList[EMAIL]();
  });

  it(`should render a ${POSITION} summary list row`, () => {
    checkSummaryList[POSITION]();
  });
});
