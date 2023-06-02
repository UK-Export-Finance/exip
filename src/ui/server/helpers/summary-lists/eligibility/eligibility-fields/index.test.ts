import generateEligibilityFields from '.';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { ELIGIBILITY: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

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
      mapYesNoField(mockAnswers[WANT_COVER_OVER_MAX_AMOUNT]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, WANT_COVER_OVER_MAX_PERIOD),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[WANT_COVER_OVER_MAX_PERIOD]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, OTHER_PARTIES_INVOLVED),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[OTHER_PARTIES_INVOLVED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, LETTER_OF_CREDIT),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[LETTER_OF_CREDIT]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, PRE_CREDIT_PERIOD),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[PRE_CREDIT_PERIOD]),
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
