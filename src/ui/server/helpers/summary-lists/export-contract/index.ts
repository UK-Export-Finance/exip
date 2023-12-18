import generateSummaryListRows from '../generate-summary-list-rows';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import { ApplicationExportContract, Country } from '../../../../types';

/**
 * exportContractSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationPolicy} answers policy answers/submitted data in a simple object.text structure
 * @param {ApplicationPolicyContact} answersPolicyContact policyContact answers/submitted data in a simple object.text structure
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section.  Default as false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const exportContractSummaryList = (answers: ApplicationExportContract, referenceNumber: number, countries: Array<Country>, checkAndChange = false) => {
  const fields = generateAboutGoodsOrServicesFields(answers, referenceNumber, countries, checkAndChange);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { exportContractSummaryList };
