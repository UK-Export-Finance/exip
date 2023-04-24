import mapEligibility from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { CSV } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/eligibility';
import csvRow from '../helpers/csv-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import { mockApplication } from '../../../test-mocks';

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

describe('api/generate-csv/map-application-to-csv/map-eligibility', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapEligibility(mockApplication);

    const { eligibility } = mockApplication;

    const expected = [
      csvRow(CSV.SECTION_TITLES.ELIGIBILITY, ''),
      csvRow(CONTENT_STRINGS[BUYER_COUNTRY].SUMMARY?.TITLE, eligibility[BUYER_COUNTRY].name),
      csvRow(CONTENT_STRINGS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE, mapYesNoField(eligibility[VALID_EXPORTER_LOCATION])),
      csvRow(CONTENT_STRINGS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY?.TITLE, mapYesNoField(eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES])),
      csvRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_AMOUNT].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_AMOUNT])),
      csvRow(CONTENT_STRINGS[WANT_COVER_OVER_MAX_PERIOD].SUMMARY?.TITLE, mapYesNoField(eligibility[WANT_COVER_OVER_MAX_PERIOD])),
      csvRow(CONTENT_STRINGS[OTHER_PARTIES_INVOLVED].SUMMARY?.TITLE, mapYesNoField(eligibility[OTHER_PARTIES_INVOLVED])),
      csvRow(CONTENT_STRINGS[LETTER_OF_CREDIT].SUMMARY?.TITLE, mapYesNoField(eligibility[LETTER_OF_CREDIT])),
      csvRow(CONTENT_STRINGS[PRE_CREDIT_PERIOD].SUMMARY?.TITLE, mapYesNoField(eligibility[PRE_CREDIT_PERIOD])),
      csvRow(CONTENT_STRINGS[COMPANIES_HOUSE_NUMBER].SUMMARY?.TITLE, mapYesNoField(eligibility[COMPANIES_HOUSE_NUMBER])),
    ];

    expect(result).toEqual(expected);
  });
});
