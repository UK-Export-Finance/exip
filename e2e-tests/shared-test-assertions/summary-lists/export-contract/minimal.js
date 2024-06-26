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
 * assertMinimalExportContractSummaryListRows
 * Assert minimal "export contract" summary list rows.
 * These rows should either not render or have an answer of "no".
 */
const assertMinimalExportContractSummaryListRows = () => {
  assertGenericExportContractSummaryListRows();

  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should NOT render a ${FINAL_DESTINATION} summary list row`, () => {
    checkSummaryList[FINAL_DESTINATION]({ shouldRender: false });
  });

  it(`should render a ${PAYMENT_TERMS_DESCRIPTION} summary list row`, () => {
    checkSummaryList[PAYMENT_TERMS_DESCRIPTION]();
  });

  it(`should NOT render an ${ATTEMPTED} summary list row`, () => {
    checkSummaryList[ATTEMPTED]({ shouldRender: false });
  });

  it(`should NOT render an ${DECLINED_DESCRIPTION} summary list row`, () => {
    checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: false });
  });

  it(`should render an ${USING_AGENT} summary list row`, () => {
    checkSummaryList[USING_AGENT]({ isYes: false });
  });

  it(`should NOT render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]({ shouldRender: false });
  });

  it(`should NOT render a ${FULL_ADDRESS} summary list row`, () => {
    checkSummaryList[FULL_ADDRESS]({ shouldRender: false });
  });

  it(`should NOT render a ${COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[COUNTRY_CODE]({ shouldRender: false });
  });

  it(`should render an ${IS_CHARGING} summary list row`, () => {
    checkSummaryList[IS_CHARGING]({ isYes: false });
  });

  it(`should NOT render a ${SERVICE_DESCRIPTION} summary list row`, () => {
    checkSummaryList[SERVICE_DESCRIPTION]({ shouldRender: false });
  });

  it(`should NOT render an ${IS_CHARGING} summary list row`, () => {
    checkSummaryList[IS_CHARGING]({ shouldRender: false });
  });

  it(`should NOT render a ${FIXED_SUM_AMOUNT} summary list row`, () => {
    checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
  });

  it(`should NOT render a ${PERCENTAGE_CHARGE} summary list row`, () => {
    checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
  });

  it(`should NOT render a ${PAYABLE_COUNTRY_CODE} summary list row`, () => {
    checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: false });
  });
};

export default assertMinimalExportContractSummaryListRows;
