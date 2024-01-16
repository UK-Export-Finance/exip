import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import changeLink from '../change-link';
import generateChangeLink from '../../../generate-change-link';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../policy-type';
import generatePreCreditPeriodFields from './pre-credit-period-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import getCurrencyByCode from '../../../get-currency-by-code';
import { ApplicationPolicy, Currency, SummaryListItemData } from '../../../../../types';

const {
  POLICY: { CONTRACT_POLICY: FORM_TITLE },
} = FORM_TITLES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: { REQUESTED_START_DATE, POLICY_CURRENCY_CODE },
} = POLICY_FIELD_IDS;

const {
  POLICY: { TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generatePolicyAndDateFields
 * Create all policy fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} answers: All submitted policy data
 * @param {Integer} referenceNumber: Application reference number
 * @param {Array} currencies: Array of currencies
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policy fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyAndDateFields = (answers: ApplicationPolicy, referenceNumber: number, currencies: Array<Currency>, checkAndChange: boolean) => {
  let fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, POLICY_TYPE),
      data: answers,
      href: generateChangeLink(TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE, '#heading', referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    ...generatePreCreditPeriodFields(answers, referenceNumber, checkAndChange),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
        ...changeLink(answers[POLICY_TYPE], referenceNumber, REQUESTED_START_DATE, checkAndChange),
      },
      formatDate(answers[REQUESTED_START_DATE]),
    ),
  ] as Array<SummaryListItemData>;

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateSingleContractPolicyFields(answers, referenceNumber, checkAndChange)];
  }

  if (isMultiplePolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateMultipleContractPolicyFields(answers, referenceNumber, checkAndChange)];
  }

  fields = [
    ...fields,
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, POLICY_CURRENCY_CODE),
        data: answers,
        ...changeLink(answers[POLICY_TYPE], referenceNumber, POLICY_CURRENCY_CODE, checkAndChange),
      },
      answers[POLICY_CURRENCY_CODE] && getCurrencyByCode(currencies, answers[POLICY_CURRENCY_CODE]).name,
    ),
  ];

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generatePolicyAndDateFields;
