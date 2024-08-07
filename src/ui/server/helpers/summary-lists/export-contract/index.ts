import generateAboutTheExportFields from './about-the-export-fields';
import generatePrivateMarketFields from './private-market-fields';
import generateAgentFields from './agent-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { ApplicationExportContract, Country, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the Insurance - "Export contract - about the export" govukSummaryList
 * @param {ApplicationExportContract} answers: All submitted export contract data
 * @param {Boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
export const generateFields = (
  answers: ApplicationExportContract,
  totalContractValueOverThreshold: boolean,
  migratedV1toV2: boolean,
  referenceNumber: number,
  countries: Array<Country>,
  checkAndChange: boolean,
) => {
  const fields = [generateAboutTheExportFields(answers, referenceNumber, countries, checkAndChange)] as Array<SummaryListGroupData>;

  if (totalContractValueOverThreshold || migratedV1toV2) {
    fields.push(generatePrivateMarketFields(answers.privateMarket, referenceNumber, checkAndChange));
  }

  fields.push(generateAgentFields(answers.agent, referenceNumber, countries, checkAndChange));

  return fields;
};

/**
 * exportContractSummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExportContract} answers: export contract answers/submitted data in a simple object.text structure
 * @param {Boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section. Defaults to false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
export const exportContractSummaryLists = (
  answers: ApplicationExportContract,
  totalContractValueOverThreshold: boolean,
  migratedV1toV2: boolean,
  referenceNumber: number,
  countries: Array<Country>,
  checkAndChange = false,
) => {
  const fields = generateFields(answers, totalContractValueOverThreshold, migratedV1toV2, referenceNumber, countries, checkAndChange);

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};
