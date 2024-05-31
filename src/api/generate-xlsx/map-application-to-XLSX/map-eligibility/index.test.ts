import mapEligibility from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../constants/total-contract-value';
import { XLSX } from '../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import { mockApplication } from '../../../test-mocks';

const { MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    VALID_EXPORTER_LOCATION,
    COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID,
    COVER_PERIOD,
    HAS_COMPANIES_HOUSE_NUMBER,
    COMPANIES_HOUSE_NUMBER,
    HAS_END_BUYER,
  },
} = INSURANCE_FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-eligibility', () => {
  it('should return an array of mapped eligibility fields', () => {
    const result = mapEligibility(mockApplication);

    const { company, eligibility } = mockApplication;

    const expected = [
      xlsxRow(SECTION_TITLES.ELIGIBILITY, ''),
      xlsxRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),

      xlsxRow(CONTENT_STRINGS[HAS_COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_COMPANIES_HOUSE_NUMBER])),
      xlsxRow(FIELDS[COMPANIES_HOUSE_NUMBER], company[COMPANIES_HOUSE_NUMBER]),

      xlsxRow(FIELDS[BUYER_COUNTRY], eligibility[BUYER_COUNTRY].name),

      xlsxRow(FIELDS[MORE_THAN_250K.VALUE], mapYesNoField(eligibility[TOTAL_CONTRACT_VALUE_FIELD_ID].valueId === MORE_THAN_250K.DB_ID)),

      xlsxRow(FIELDS[COVER_PERIOD], eligibility[COVER_PERIOD_ELIGIBILITY].value),

      xlsxRow(FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES], mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
      xlsxRow(FIELDS[HAS_END_BUYER], mapYesNoField(eligibility[HAS_END_BUYER])),
    ];

    expect(result).toEqual(expected);
  });
});
