import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT,
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Check your answers - Summary list - no private insurance attempt, no agent', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should render a ${FINAL_DESTINATION} summary list row`, () => {
    checkSummaryList[FINAL_DESTINATION]();
  });

  it(`should render a ${PAYMENT_TERMS_DESCRIPTION} summary list row`, () => {
    checkSummaryList[PAYMENT_TERMS_DESCRIPTION]();
  });

  it(`should render an ${ATTEMPTED} summary list row`, () => {
    checkSummaryList[ATTEMPTED]({ isYes: false });
  });

  it(`should NOT render an ${DECLINED_DESCRIPTION} summary list row`, () => {
    checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: false });
  });

  it(`should render an ${USING_AGENT} summary list row`, () => {
    checkSummaryList[USING_AGENT]({ isYes: false });
  });

  it(`should NOT render an ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({ shouldRender: false });
  });

  it(`should NOT render an ${FULL_ADDRESS} summary list row`, () => {
    checkSummaryList[FULL_ADDRESS]({ shouldRender: false });
  });

  it(`should NOT render an ${COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[COUNTRY_CODE]({ shouldRender: false });
  });
});
