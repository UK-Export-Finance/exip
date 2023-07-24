import generateSummaryListRows from '../generate-summary-list-rows';
import { SummaryListItemData, InsuranceEligibility } from '../../../../types';
import generateEligibilityFields from './eligibility-fields';

/**
 * generateFields
 * Create all fields for the insurance - Eligibility govukSummaryList
 * @param {InsuranceEligibility} answersEligibility Application buyer object
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answersEligibility: InsuranceEligibility) => {
  const fields = [...generateEligibilityFields(answersEligibility)] as Array<SummaryListItemData>;

  return fields;
};

/**
 * eligibilitySummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {InsuranceEligibility} answersEligibility InsuranceEligibility object
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const eligibilitySummaryList = (answersEligibility: InsuranceEligibility) => {
  const fields = generateFields(answersEligibility);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, eligibilitySummaryList };
