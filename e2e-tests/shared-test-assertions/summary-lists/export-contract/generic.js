import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../commands/insurance/check-export-contract-summary-list';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

/**
 * assertGenericExportContractSummaryListRows
 * Assert generic "export contract" summary list rows.
 * These rows should always be present in any "export contract" scenario
 */
const assertGenericExportContractSummaryListRows = () => {
  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should render a ${PAYMENT_TERMS_DESCRIPTION} summary list row`, () => {
    checkSummaryList[PAYMENT_TERMS_DESCRIPTION]();
  });
};

export default assertGenericExportContractSummaryListRows;
