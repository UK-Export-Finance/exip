import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getCurrencyByCode from '../../../get-currency-by-code';
import { ApplicationPolicyAndExport, Currency, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
      },
    },
  },
} = FIELD_IDS;

/**
 * generateCreditPeriodAndCurrencyFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generateCreditPeriodAndCurrencyFields = (answers: ApplicationPolicyAndExport, currencies: Array<Currency>) => {
  const fields = [
    fieldGroupItem({
      field: { id: CREDIT_PERIOD_WITH_BUYER, ...FIELDS.CONTRACT_POLICY[CREDIT_PERIOD_WITH_BUYER] },
      data: answers,
    }),
    fieldGroupItem(
      { field: { id: POLICY_CURRENCY_CODE, ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE] } },
      answers[POLICY_CURRENCY_CODE] && `${answers[POLICY_CURRENCY_CODE]} ${getCurrencyByCode(currencies, answers[POLICY_CURRENCY_CODE]).name}`,
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateCreditPeriodAndCurrencyFields;
