import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateYourCompanyFields from '.';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import mapSicCodes from '../map-sic-codes';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockCompany } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  COMPANY_HOUSE: { INPUT, COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, WEBSITE, PHONE_NUMBER },
} = FIELD_IDS;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

describe('server/helpers/summary-lists/your-business/your-company-fields', () => {
  const mockAnswers = mockCompany;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NUMBER),
      data: mockAnswers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${INPUT}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NAME),
      data: mockAnswers,
      renderChangeLink: false,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_ADDRESS),
        data: mockAnswers,
        renderChangeLink: false,
      },
      generateMultipleFieldHtml(mockAnswers[COMPANY_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_INCORPORATED),
        data: mockAnswers,
        renderChangeLink: false,
      },
      formatDate(mockAnswers[COMPANY_INCORPORATED]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_SIC),
        data: mockAnswers,
        renderChangeLink: false,
      },
      mapSicCodes(mockAnswers[COMPANY_SIC]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, FINANCIAL_YEAR_END_DATE),
        data: mockAnswers,
        renderChangeLink: false,
      },
      formatDate(mockAnswers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_NAME),
        data: mockAnswers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[TRADING_NAME]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
        data: mockAnswers,
        href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_ADDRESS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[TRADING_ADDRESS]),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, WEBSITE),
      data: mockAnswers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${WEBSITE}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, PHONE_NUMBER),
      data: mockAnswers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${PHONE_NUMBER}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateYourCompanyFields(mockAnswers, referenceNumber, checkAndChange);

    expect(result).toEqual(expectedBase);
  });
});
