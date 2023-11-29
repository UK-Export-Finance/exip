import generateEligibilityFields from '.';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';
import mapTotalContractValueField from '../../../mappings/map-total-contract-value';
import mapCoverPeriodField from '../../../mappings/map-cover-period';
import generateChangeLink from '../../../generate-change-link';

const { ELIGIBILITY: FIELD_IDS, COMPANIES_HOUSE } = INSURANCE_FIELD_IDS;

const {
  COVER_PERIOD,
  HAS_COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  TOTAL_CONTRACT_VALUE,
  HAS_END_BUYER,
} = FIELD_IDS;

const { COMPANY_NUMBER, COMPANY_NAME } = COMPANIES_HOUSE;

const {
  ELIGIBILITY: {
    EXPORTER_LOCATION_CHANGE,
    COMPANIES_HOUSE_NUMBER_CHANGE,
    ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
    BUYER_COUNTRY_CHANGE,
    TOTAL_VALUE_INSURED_CHANGE,
    COVER_PERIOD_CHANGE,
    UK_GOODS_OR_SERVICES_CHANGE,
    END_BUYER_CHANGE,
  },
} = INSURANCE_ROUTES;

const isCheckAndChange = false;
const referenceNumber = undefined;
const checkAndChangeLink = '';
const isEligibility = true;

describe('server/helpers/summary-lists/eligibility/eligibility-fields', () => {
  const mockAnswers = mockApplication.eligibility;
  const { company } = mockApplication;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, VALID_EXPORTER_LOCATION),
        data: mockApplication,
        href: generateChangeLink(
          EXPORTER_LOCATION_CHANGE,
          checkAndChangeLink,
          `#${VALID_EXPORTER_LOCATION}-label`,
          referenceNumber,
          isCheckAndChange,
          isEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[VALID_EXPORTER_LOCATION]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_COMPANIES_HOUSE_NUMBER),
        data: mockAnswers,
        href: generateChangeLink(
          COMPANIES_HOUSE_NUMBER_CHANGE,
          checkAndChangeLink,
          `#${HAS_COMPANIES_HOUSE_NUMBER}-label`,
          referenceNumber,
          isCheckAndChange,
          isEligibility,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[HAS_COMPANIES_HOUSE_NUMBER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COMPANY_NUMBER),
        data: mockAnswers,
        href: generateChangeLink(
          ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
          checkAndChangeLink,
          `#${COMPANY_NUMBER}-label`,
          referenceNumber,
          isCheckAndChange,
          isEligibility,
        ),
        renderChangeLink: true,
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
        href: generateChangeLink(BUYER_COUNTRY_CHANGE, checkAndChangeLink, `#${BUYER_COUNTRY}-label`, referenceNumber, isCheckAndChange, isEligibility),
        renderChangeLink: true,
      },
      mockAnswers[BUYER_COUNTRY].name,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, TOTAL_CONTRACT_VALUE),
        data: mockAnswers,
        href: generateChangeLink(
          TOTAL_VALUE_INSURED_CHANGE,
          checkAndChangeLink,
          `#${TOTAL_CONTRACT_VALUE}-label`,
          referenceNumber,
          isCheckAndChange,
          isEligibility,
        ),
        renderChangeLink: true,
      },
      mapTotalContractValueField(mockAnswers[TOTAL_CONTRACT_VALUE]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, COVER_PERIOD),
        data: mockAnswers,
        href: generateChangeLink(COVER_PERIOD_CHANGE, checkAndChangeLink, `#${COVER_PERIOD}-label`, referenceNumber, isCheckAndChange, isEligibility),
        renderChangeLink: true,
      },
      mapCoverPeriodField(mockAnswers[COVER_PERIOD]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_MINIMUM_UK_GOODS_OR_SERVICES),
        data: mockAnswers,
        href: generateChangeLink(
          UK_GOODS_OR_SERVICES_CHANGE,
          checkAndChangeLink,
          `#${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-label`,
          referenceNumber,
          isCheckAndChange,
          isEligibility,
        ),
        renderChangeLink: true,
      },
      FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS_ELIGIBILITY, HAS_END_BUYER),
        data: mockAnswers,
        href: generateChangeLink(END_BUYER_CHANGE, checkAndChangeLink, `#${HAS_END_BUYER}-label`, referenceNumber, isCheckAndChange, isEligibility),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[HAS_END_BUYER]),
    ),
  ];

  it('should return fields and values from the submitted data/mockAnswers', () => {
    const result = generateEligibilityFields(mockAnswers);

    expect(result).toEqual(expectedBase);
  });
});
