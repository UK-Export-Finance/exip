import FIELD_IDS from '../../../constants/field-ids/insurance/policy-and-exports';
import generateSummaryListRows from '../generate-summary-list-rows';
import { isSinglePolicyType, isMultiPolicyType } from '../../policy-type';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generateCreditPeriodAndCurrencyFields from './credit-period-and-currency-fields';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import { ApplicationPolicyAndExport, Country, Currency, SummaryListItemData } from '../../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = FIELD_IDS;

/**
 * generateFields
 * Create all fields for the insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and export values in an object structure for GOVUK summary list structure
 */
const generateFields = (answers: ApplicationPolicyAndExport, referenceNumber: number, countries: Array<Country>, currencies: Array<Currency>) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = generatePolicyAndDateFields(answers, referenceNumber);

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateSingleContractPolicyFields(answers, referenceNumber)];
  }

  if (isMultiPolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateMultipleContractPolicyFields(answers, referenceNumber)];
  }

  fields = [
    ...fields,
    ...generateCreditPeriodAndCurrencyFields(answers, referenceNumber, currencies),
    ...generateAboutGoodsOrServicesFields(answers, referenceNumber, countries),
  ];

  return fields;
};

// TODO: rename answersContent param.

/**
 * policyAndExportSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {Object} All answers/submitted data in a simple object.text structure
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const policyAndExportSummaryList = (
  answersContent: ApplicationPolicyAndExport,
  referenceNumber: number,
  countries: Array<Country>,
  currencies: Array<Currency>,
) => {
  const fields = generateFields(answersContent, referenceNumber, countries, currencies);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, policyAndExportSummaryList };
