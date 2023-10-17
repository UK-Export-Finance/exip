import mapEligibility from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import { mockApplication } from '../../../test-mocks';

const {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.ELIGIBILITY;

describe('api/generate-xlsx/map-application-to-xlsx/map-eligibility', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapEligibility(mockApplication);

    const { eligibility } = mockApplication;

    const expected = [
      xlsxRow(XLSX.SECTION_TITLES.ELIGIBILITY, ''),
      xlsxRow(CONTENT_STRINGS[BUYER_COUNTRY].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY].name),
      xlsxRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),
      xlsxRow(CONTENT_STRINGS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
      xlsxRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_AMOUNT].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_AMOUNT])),
      xlsxRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_PERIOD].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_PERIOD])),
      xlsxRow(CONTENT_STRINGS[COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[COMPANIES_HOUSE_NUMBER])),
    ];

    expect(result).toEqual(expected);
  });
});
