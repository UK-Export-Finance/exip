import generateEligibilityFields from '.';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { ELIGIBILITY: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
  TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ELIGIBILITY,
  WANT_COVER_OVER_MAX_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

const { MORE_THAN_2_YEARS } = COVER_PERIOD;
const { MORE_THAN_500K } = TOTAL_CONTRACT_VALUE;

describe('server/helpers/summary-lists/eligibility/eligibility-fields', () => {
  const mockAnswers = mockApplication.eligibility;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, BUYER_COUNTRY),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mockAnswers[BUYER_COUNTRY].name,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, VALID_EXPORTER_LOCATION),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[VALID_EXPORTER_LOCATION]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
        data: mockAnswers,
        renderChangeLink: false,
      },
      FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, WANT_COVER_OVER_MAX_AMOUNT),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[TOTAL_CONTRACT_VALUE_ELIGIBILITY].valueId === MORE_THAN_500K.DB_ID),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, WANT_COVER_OVER_MAX_PERIOD),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[COVER_PERIOD_ELIGIBILITY].valueId === MORE_THAN_2_YEARS.DB_ID),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANIES_HOUSE_NUMBER),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[COMPANIES_HOUSE_NUMBER]),
    ),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateEligibilityFields(mockAnswers);

    expect(result).toEqual(expectedBase);
  });
});
