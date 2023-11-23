import generateEligibilityFields from '.';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';
import mapTotalContractValueField from '../../../mappings/map-total-contract-value';
import mapLengthOfPolicyField from '../../../mappings/map-length-of-policy';

const { ELIGIBILITY: FIELD_IDS, COMPANIES_HOUSE } = INSURANCE_FIELD_IDS;

const {
  COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
  COVER_PERIOD,
  HAS_COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  TOTAL_CONTRACT_VALUE,
  HAS_END_BUYER,
} = FIELD_IDS;

const { COMPANY_NUMBER, COMPANY_NAME } = COMPANIES_HOUSE;

describe('server/helpers/summary-lists/eligibility/eligibility-fields', () => {
  const mockAnswers = mockApplication.eligibility;
  const { company } = mockApplication;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, VALID_EXPORTER_LOCATION),
        data: mockApplication,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[VALID_EXPORTER_LOCATION]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_COMPANIES_HOUSE_NUMBER),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[HAS_COMPANIES_HOUSE_NUMBER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANY_NUMBER),
        data: mockAnswers,
        renderChangeLink: false,
      },
      company[COMPANY_NUMBER],
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANY_NAME),
        data: mockAnswers,
        renderChangeLink: false,
      },
      company[COMPANY_NAME],
    ),
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
        field: getFieldById(FIELDS_ELIGIBILITY, TOTAL_CONTRACT_VALUE),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapTotalContractValueField(mockAnswers[TOTAL_CONTRACT_VALUE]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COVER_PERIOD),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapLengthOfPolicyField(mockAnswers[COVER_PERIOD_ELIGIBILITY]),
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
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_END_BUYER),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapYesNoField(mockAnswers[HAS_END_BUYER]),
    ),
  ];

  it('should return fields and values from the submitted data/mockAnswers', () => {
    mockAnswers.company = mockApplication.company;

    const result = generateEligibilityFields(mockAnswers);

    expect(result).toEqual(expectedBase);
  });
});
