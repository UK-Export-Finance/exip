import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import { Application } from '../../../types';

const {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.ELIGIBILITY;

/**
 * mapEligibility
 * Map an application's eligibility fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapEligibility = (application: Application) => {
  const { eligibility, policy } = application;

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.ELIGIBILITY, ''),
    xlsxRow(CONTENT_STRINGS[BUYER_COUNTRY].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY].name),
    xlsxRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),
    xlsxRow(CONTENT_STRINGS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
    xlsxRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_AMOUNT].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_AMOUNT])),
    xlsxRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_PERIOD].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_PERIOD])),
    xlsxRow(CONTENT_STRINGS[OTHER_PARTIES_INVOLVED].SUMMARY?.TITLE, mapYesNoField(eligibility[OTHER_PARTIES_INVOLVED])),
    xlsxRow(CONTENT_STRINGS[LETTER_OF_CREDIT].SUMMARY?.TITLE, mapYesNoField(eligibility[LETTER_OF_CREDIT])),
    xlsxRow(CONTENT_STRINGS[PRE_CREDIT_PERIOD].SUMMARY?.TITLE, mapYesNoField(policy[PRE_CREDIT_PERIOD])),
    xlsxRow(CONTENT_STRINGS[COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[COMPANIES_HOUSE_NUMBER])),
  ];

  return mapped;
};

export default mapEligibility;
