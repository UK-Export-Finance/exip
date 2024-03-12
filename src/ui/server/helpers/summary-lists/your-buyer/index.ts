import generateCompanyOrOrganisationFields from './company-or-organisation';
import connectionWithBuyerFields from './connection-with-buyer';
import tradingHistoryFields from './trading-history';
import creditInsuranceHistoryFields from './credit-insurance-history';
import financialAccountsFields from './financial-accounts';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { SummaryListGroupData, ApplicationBuyer } from '../../../../types';

/**
 * optionalFields
 * optional fields for the your buyer summary list
 * if totalContractValueOverThreshold is true,
 * then pushes fields and values for credit insurance history
 * if totalContractValueOverThreshold is false,
 * then returns an empty array
 * @param {ApplicationBuyer} answersBuyer: Buyer answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in application is above threshold
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListGroupData>} empty array or fields and values for credit insurance history
 */
const optionalFields = (
  answersBuyer: ApplicationBuyer,
  referenceNumber: number,
  totalContractValueOverThreshold?: boolean,
  checkAndChange?: boolean,
): Array<SummaryListGroupData> => {
  const fields = [] as Array<SummaryListGroupData>;

  if (totalContractValueOverThreshold) {
    fields.push(creditInsuranceHistoryFields(answersBuyer.relationship, referenceNumber, checkAndChange));
  }

  return fields;
};

/**
 * generateFields
 * Create all fields for the insurance - Your buyer govukSummaryList
 * @param {ApplicationBuyer} answers: Buyer answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in application is above threshold
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All your buyer values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  answers: ApplicationBuyer,
  referenceNumber: number,
  totalContractValueOverThreshold?: boolean,
  checkAndChange?: boolean,
): Array<SummaryListGroupData> => {
  const fields = [
    generateCompanyOrOrganisationFields(answers, referenceNumber, checkAndChange),
    connectionWithBuyerFields(answers.relationship, referenceNumber, checkAndChange),
    tradingHistoryFields(answers.buyerTradingHistory, referenceNumber, checkAndChange),
    ...optionalFields(answers, referenceNumber, totalContractValueOverThreshold, checkAndChange),
    financialAccountsFields(answers.relationship, referenceNumber, checkAndChange),
  ] as Array<SummaryListGroupData>;

  return fields;
};

/**
 * yourBuyerSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationBuyer} answers: Buyer answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in application is above threshold
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBuyerSummaryList = (answers: ApplicationBuyer, referenceNumber: number, totalContractValueOverThreshold?: boolean, checkAndChange = false) => {
  const fields = generateFields(answers, referenceNumber, totalContractValueOverThreshold, checkAndChange);

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};

export { optionalFields, generateFields, yourBuyerSummaryList };
