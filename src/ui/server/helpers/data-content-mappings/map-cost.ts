import { FIELD_IDS } from '../../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../policy-type';
import formatCurrency from '../format-currency';
import { Quote, SubmittedData } from '../../../types';

const { CONTRACT_VALUE, CURRENCY, POLICY_TYPE, MAX_AMOUNT_OWED } = FIELD_IDS;

const mapCost = (answers: SubmittedData | Quote) => {
  let mapped;

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [CONTRACT_VALUE]: {
        text: formatCurrency(answers[CONTRACT_VALUE], answers[CURRENCY].isoCode),
      },
    };
  }

  if (isMultiPolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [MAX_AMOUNT_OWED]: {
        text: formatCurrency(answers[MAX_AMOUNT_OWED], answers[CURRENCY].isoCode),
      },
    };
  }

  return mapped;
};

export default mapCost;
