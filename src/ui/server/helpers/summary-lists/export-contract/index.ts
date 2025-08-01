import generateAboutTheExportFields from './about-the-export-fields';
import generatePrivateMarketFields from './private-market-fields';
import generateAgentFields from './agent-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { SummaryListParamsExportContract, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the Insurance - "Export contract - about the export" govukSummaryList
 * @param {ApplicationExportContract} exportContract: All submitted export contract data
 * @param {boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Array<Currency>} currencies: Currencies
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} Fields and values in an object structure for GOVUK summary list structure
 */
export const generateFields = ({
  exportContract,
  totalContractValueOverThreshold,
  referenceNumber,
  countries,
  currencies,
  checkAndChange,
}: SummaryListParamsExportContract) => {
  const fields = [generateAboutTheExportFields(exportContract, referenceNumber, countries, checkAndChange)] as Array<SummaryListGroupData>;

  if (totalContractValueOverThreshold) {
    fields.push(generatePrivateMarketFields(exportContract.privateMarket, referenceNumber, checkAndChange));
  }

  fields.push(generateAgentFields(exportContract.agent, referenceNumber, countries, currencies, checkAndChange));

  return fields;
};

/**
 * exportContractSummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExportContract} exportContract: Export contract answers/submitted data in a simple object.text structure
 * @param {boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Array<Currency>} currencies: Currencies
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
export const exportContractSummaryLists = ({
  exportContract,
  totalContractValueOverThreshold,
  referenceNumber,
  countries,
  currencies,
  checkAndChange,
}: SummaryListParamsExportContract) => {
  const fields = generateFields({ exportContract, totalContractValueOverThreshold, referenceNumber, countries, currencies, checkAndChange });

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};
