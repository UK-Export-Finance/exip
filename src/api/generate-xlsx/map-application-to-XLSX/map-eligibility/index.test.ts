import mapEligibility from '.';
import { COVER_PERIOD, FIELD_IDS } from '../../../constants';
import { XLSX } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapTotalContractValueField from '../helpers/map-total-contract-value';
import { mockApplication } from '../../../test-mocks';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    VALID_EXPORTER_LOCATION,
    COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ELIGIBILITY,
    WANT_COVER_OVER_MAX_PERIOD,
    COMPANIES_HOUSE_NUMBER,
  },
} = FIELD_IDS.INSURANCE;

const { MORE_THAN_2_YEARS } = COVER_PERIOD;

describe('api/generate-xlsx/map-application-to-xlsx/map-eligibility', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapEligibility(mockApplication);

    const { eligibility } = mockApplication;

    const expected = [
      xlsxRow(XLSX.SECTION_TITLES.ELIGIBILITY, ''),
      xlsxRow(CONTENT_STRINGS[BUYER_COUNTRY].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY].name),
      xlsxRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),
      xlsxRow(CONTENT_STRINGS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
      xlsxRow(
        CONTENT_STRINGS[TOTAL_CONTRACT_VALUE_ELIGIBILITY].SUMMARY?.TITLE,
        mapTotalContractValueField(eligibility[TOTAL_CONTRACT_VALUE_ELIGIBILITY].valueId),
      ),
      xlsxRow(
        CONTENT_STRINGS[WANT_COVER_OVER_MAX_PERIOD].SUMMARY?.TITLE,
        mapYesNoField(eligibility[COVER_PERIOD_ELIGIBILITY].valueId === MORE_THAN_2_YEARS.DB_ID),
      ),
      xlsxRow(CONTENT_STRINGS[COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[COMPANIES_HOUSE_NUMBER])),
    ];

    expect(result).toEqual(expected);
  });
});
