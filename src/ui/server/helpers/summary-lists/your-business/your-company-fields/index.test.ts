import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateYourCompanyFields from '.';
import { generateAddressHTML } from '../../company-house-summary-list';
import sicCodeMapping from '../map-sic-codes';
import mockApplication, { mockExporterCompany } from '../../../../test-mocks/mock-application';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT },
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
  const mockAnswers = mockExporterCompany;
  const { referenceNumber } = mockApplication;

  const expectedBase = [
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, COMPANY_NUMBER),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}#${INPUT}`,
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
      generateAddressHTML(mockAnswers[COMPANY_ADDRESS]),
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
      sicCodeMapping(mockAnswers[COMPANY_SIC]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.COMPANY_DETAILS, FINANCIAL_YEAR_END_DATE),
        data: mockAnswers,
        renderChangeLink: false,
      },
      formatDate(mockAnswers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT),
    ),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_NAME),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}#${TRADING_NAME}`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}#${TRADING_ADDRESS}`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, WEBSITE),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}#${WEBSITE}`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.COMPANY_DETAILS, PHONE_NUMBER),
      data: mockAnswers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}#${PHONE_NUMBER}`,
      renderChangeLink: true,
    }),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateYourCompanyFields(mockAnswers, referenceNumber);

    expect(result).toEqual(expectedBase);
  });
});
