import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCurrencyByCode from '../../../get-currency-by-code';
import changeLink from '../change-link';
import { ApplicationPolicy, Currency, SummaryListItemData } from '../../../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: { CREDIT_PERIOD_WITH_BUYER, POLICY_CURRENCY_CODE },
} = FIELD_IDS;

/**
 * generateCreditPeriodAndCurrencyFields
 * Create all policy fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policy fields and values in an object structure for GOVUK summary list structure
 */
const generateCreditPeriodAndCurrencyFields = (answers: ApplicationPolicy, referenceNumber: number, currencies: Array<Currency>, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.CONTRACT_POLICY, CREDIT_PERIOD_WITH_BUYER),
      data: answers,
      ...changeLink(answers[POLICY_TYPE], referenceNumber, CREDIT_PERIOD_WITH_BUYER, checkAndChange),
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, POLICY_CURRENCY_CODE),
        data: answers,
        ...changeLink(answers[POLICY_TYPE], referenceNumber, POLICY_CURRENCY_CODE, checkAndChange),
      },
      answers[POLICY_CURRENCY_CODE] && getCurrencyByCode(currencies, answers[POLICY_CURRENCY_CODE]).name,
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateCreditPeriodAndCurrencyFields;
