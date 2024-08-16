import generateAboutTheExportFields from './about-the-export-fields';
import generatePrivateMarketFields from './private-market-fields';
import generateAgentFields from './agent-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { SummaryListParamsExportContract, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the Insurance - "Export contract - about the export" govukSummaryList
 * @param {ApplicationExportContract} exportContract: All submitted export contract data
 * @param {Boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
export const generateFields = ({
  exportContract,
  totalContractValueOverThreshold,
  migratedV1toV2,
  referenceNumber,
  countries,
  checkAndChange,
}: SummaryListParamsExportContract) => {
  const fields = [generateAboutTheExportFields(exportContract, referenceNumber, countries, checkAndChange)] as Array<SummaryListGroupData>;

  if (totalContractValueOverThreshold || migratedV1toV2) {
    fields.push(generatePrivateMarketFields(exportContract.privateMarket, referenceNumber, checkAndChange));
  }

  fields.push(generateAgentFields(exportContract.agent, referenceNumber, countries, checkAndChange));

  return fields;
};

/**
 * exportContractSummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExportContract} exportContract: Export contract answers/submitted data in a simple object.text structure
 * @param {Boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
export const exportContractSummaryLists = ({
  exportContract,
  totalContractValueOverThreshold,
  migratedV1toV2,
  referenceNumber,
  countries,
  checkAndChange,
}: SummaryListParamsExportContract) => {
  const fields = generateFields({ exportContract, totalContractValueOverThreshold, migratedV1toV2, referenceNumber, countries, checkAndChange });

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};
