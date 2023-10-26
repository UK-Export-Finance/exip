import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateYourCompanyFields from '.';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockCompany } from '../../../../test-mocks/mock-application';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationCompany } from '../../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS, TRADING_NAME, WEBSITE, PHONE_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

const summaryList = (mockAnswers: ApplicationCompany, referenceNumber: number, financialYearEndDateValue: string, checkAndChange = false) => [
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

describe('server/helpers/summary-lists/your-business/your-company-fields', () => {
  describe('when a company has a financial year end date', () => {
    const mockAnswers = mockCompany;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;
    const financialYearEndDateValue = formatDate(mockAnswers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT);

    const expectedBase = summaryList(mockAnswers, referenceNumber, financialYearEndDateValue);

    it('should return fields and values from the submitted data/answers', () => {
      const result = generateYourCompanyFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });

  describe('when a company does not have a financial year end date', () => {
    const mockAnswers = mockCompany;
    const { referenceNumber } = mockApplication;
    const checkAndChange = false;
    const financialYearEndDateValue = DEFAULT.EMPTY;

    const expectedBase = summaryList(mockAnswers, referenceNumber, financialYearEndDateValue);

    it('should return fields and values from the submitted data/answers with dash for financial year end date', () => {
      const result = generateYourCompanyFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual(expectedBase);
    });
  });
});
