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
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policy and export values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  answers: ApplicationPolicyAndExport,
  referenceNumber: number,
  countries: Array<Country>,
  currencies: Array<Currency>,
  checkAndChange: boolean,
) => {
  let fields = generatePolicyAndDateFields(answers, referenceNumber, checkAndChange) as Array<SummaryListItemData>;

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateSingleContractPolicyFields(answers, referenceNumber, checkAndChange)];
  }

  if (isMultiPolicyType(answers[POLICY_TYPE])) {
    fields = [...fields, ...generateMultipleContractPolicyFields(answers, referenceNumber, checkAndChange)];
  }

  fields = [
    ...fields,
    ...generateCreditPeriodAndCurrencyFields(answers, referenceNumber, currencies, checkAndChange),
    ...generateAboutGoodsOrServicesFields(answers, referenceNumber, countries, checkAndChange),
  ];

  return fields;
};

/**
 * policyAndExportSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {Object} All answers/submitted data in a simple object.text structure
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section.  Default as false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const policyAndExportSummaryList = (
  answers: ApplicationPolicyAndExport,
  referenceNumber: number,
  countries: Array<Country>,
  currencies: Array<Currency>,
  checkAndChange = false,
) => {
  const fields = generateFields(answers, referenceNumber, countries, currencies, checkAndChange);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, policyAndExportSummaryList };
