import { FIELD_IDS } from '../../../constants';
import { XLSX } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapTotalContractField from '../helpers/map-total-contract-field';
import mapCoverPeriodField from '../helpers/map-cover-period-field';
import { Application } from '../../../types';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    VALID_EXPORTER_LOCATION,
    COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE,
    COVER_PERIOD,
    COMPANIES_HOUSE_NUMBER,
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapEligibility
 * Map an application's eligibility fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapEligibility = (application: Application) => {
  const { eligibility } = application;

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.ELIGIBILITY, ''),
    xlsxRow(CONTENT_STRINGS[BUYER_COUNTRY].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY].name),
    xlsxRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),
    xlsxRow(CONTENT_STRINGS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
    xlsxRow(CONTENT_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE, mapTotalContractField(eligibility[TOTAL_CONTRACT_VALUE].valueId)),
    xlsxRow(CONTENT_STRINGS[COVER_PERIOD].SUMMARY?.TITLE, mapCoverPeriodField(eligibility[COVER_PERIOD_ELIGIBILITY].valueId)),
    xlsxRow(CONTENT_STRINGS[COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[COMPANIES_HOUSE_NUMBER])),
  ];

  return mapped;
};

export default mapEligibility;
