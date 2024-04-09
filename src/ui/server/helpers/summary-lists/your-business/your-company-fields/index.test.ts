import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateYourCompanyFields from '.';
import generateChangeLink from '../../../generate-change-link';
import { mockCompany, referenceNumber } from '../../../../test-mocks/mock-application';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationCompany } from '../../../../../types';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import generateAddressObject from '../../generate-address-object';
import mapYesAlternateField from '../../../mappings/map-yes-alternate-field';

const {
  YOUR_BUSINESS: { COMPANY_DETAILS: FORM_TITLE },
} = FORM_TITLES;

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_ADDRESS, DIFFERENT_TRADING_NAME },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

const addressObject = generateAddressObject(mockCompany[DIFFERENT_TRADING_ADDRESS][FULL_ADDRESS]);
const address = generateMultipleFieldHtml(addressObject);

const summaryList = (mockAnswers: ApplicationCompany, refNumber: number, financialYearEndDateValue: string, checkAndChange = false) => [
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.COMPANY_DETAILS, HAS_DIFFERENT_TRADING_NAME),
      data: mockAnswers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${HAS_DIFFERENT_TRADING_NAME}-label`, refNumber, checkAndChange),
      renderChangeLink: true,
    },
    mapYesAlternateField(mockAnswers[HAS_DIFFERENT_TRADING_NAME], mockAnswers[DIFFERENT_TRADING_NAME]),
  ),
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.COMPANY_DETAILS, TRADING_ADDRESS),
      data: mockAnswers,
      href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${TRADING_ADDRESS}-label`, refNumber, checkAndChange),
      renderChangeLink: true,
    },
    mapYesAlternateField(mockAnswers[TRADING_ADDRESS], address),
  ),
  fieldGroupItem({
    field: getFieldById(FIELDS.COMPANY_DETAILS, WEBSITE),
    data: mockAnswers,
    href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${WEBSITE}-label`, refNumber, checkAndChange),
    renderChangeLink: true,
  }),
  fieldGroupItem({
    field: getFieldById(FIELDS.COMPANY_DETAILS, PHONE_NUMBER),
    data: mockAnswers,
    href: generateChangeLink(COMPANY_DETAILS_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE, `#${PHONE_NUMBER}-label`, refNumber, checkAndChange),
    renderChangeLink: true,
  }),
];

describe('server/helpers/summary-lists/your-business/your-company-fields', () => {
  describe('generateYourCompanyFields', () => {
    describe('when a company has a financial year end date', () => {
      const mockAnswers = mockCompany;
      const checkAndChange = false;
      const financialYearEndDateValue = formatDate(mockAnswers[FINANCIAL_YEAR_END_DATE], DATE_FORMAT);

      const expectedFields = summaryList(mockAnswers, referenceNumber, financialYearEndDateValue);

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateYourCompanyFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = {
          title: FORM_TITLE,
          fields: expectedFields,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a company does not have a financial year end date', () => {
      const mockAnswers = mockCompany;
      const checkAndChange = false;
      const financialYearEndDateValue = DEFAULT.EMPTY;

      const expectedFields = summaryList(mockAnswers, referenceNumber, financialYearEndDateValue);

      it('should return fields and values from the submitted data/answers with dash for financial year end date', () => {
        const result = generateYourCompanyFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = {
          title: FORM_TITLE,
          fields: expectedFields,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
