import assertGenericExportContractSummaryListRows from './generic';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../commands/insurance/check-export-contract-summary-list';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

/**
 * assertFullyPopulatedExportContractSummaryListRows
 * Assert fully populated "export contract" summary list rows.
 * This includes all possible optional answers.
 * @param {Boolean} agentChargeMethodFixedSum: Agent charge method is "fixed sum"
 * @param {String} agentChargeFixedSumAmount: Agent charge fixed sum amount
 * @param {Boolean} agentChargeMethodPercentage: Agent charge method is "percentage"
 */
const assertFullyPopulatedExportContractSummaryListRows = ({ agentChargeMethodFixedSum, agentChargeMethodPercentage, agentChargeFixedSumAmount }) => {
  assertGenericExportContractSummaryListRows();

  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should render a ${FINAL_DESTINATION} summary list row`, () => {
    checkSummaryList[FINAL_DESTINATION]({ isKnown: true });
  });

  it(`should render a ${PAYMENT_TERMS_DESCRIPTION} summary list row`, () => {
    checkSummaryList[PAYMENT_TERMS_DESCRIPTION]();
  });

  it(`should render an ${ATTEMPTED} summary list row`, () => {
    checkSummaryList[ATTEMPTED]({ shouldRender: true, isYes: true });
  });

  it(`should render a ${DECLINED_DESCRIPTION} summary list row`, () => {
    checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: true });
  });

  it(`should render an ${USING_AGENT} summary list row`, () => {
    checkSummaryList[USING_AGENT]({ isYes: true });
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({ shouldRender: true });
  });

  it(`should render a ${FULL_ADDRESS} summary list row`, () => {
    checkSummaryList[FULL_ADDRESS]({ shouldRender: true });
  });

  it(`should render a ${COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[COUNTRY_CODE]({ shouldRender: true });
  });

  it(`should render a ${SERVICE_DESCRIPTION} summary list row`, () => {
    checkSummaryList[SERVICE_DESCRIPTION]({ shouldRender: true });
  });

  it(`should render an ${IS_CHARGING} summary list row`, () => {
    checkSummaryList[IS_CHARGING]({ shouldRender: true, isYes: true });
  });

  if (agentChargeMethodFixedSum) {
    it(`should render a ${FIXED_SUM_AMOUNT} summary list row`, () => {
      checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: true, agentChargeFixedSumAmount });
    });

    it(`should NOT render a ${PERCENTAGE_CHARGE} summary list row`, () => {
      checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
    });
  }

  if (agentChargeMethodPercentage) {
    it(`should NOT render a ${FIXED_SUM_AMOUNT} summary list row`, () => {
      checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
    });

    it(`should render a ${PERCENTAGE_CHARGE} summary list row`, () => {
      checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: true });
    });
  }

  it(`should render a ${PAYABLE_COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
  });
};

export default assertFullyPopulatedExportContractSummaryListRows;
