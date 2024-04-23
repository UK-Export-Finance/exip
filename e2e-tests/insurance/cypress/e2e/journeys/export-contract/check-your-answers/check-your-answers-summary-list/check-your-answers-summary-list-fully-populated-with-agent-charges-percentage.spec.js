import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT,
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Check your answers - Summary list - application over total contract value threshold, private insurance attempt, using an agent, agent is chraging - percentage method', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: true,
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodPercentage: true,
      });

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

  it(`should render an ${IS_CHARGING} summary list row`, () => {
    checkSummaryList[IS_CHARGING]({ shouldRender: true, isYes: true });
  });

  it(`should NOT render a ${FIXED_SUM_AMOUNT} summary list row`, () => {
    checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
  });

  it(`should render a ${PERCENTAGE_CHARGE} summary list row`, () => {
    checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: true });
  });

  it(`should render a ${PAYABLE_COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
  });
});
