import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import generateYourCompanyFields, { optionalFields } from '.';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockCompany } from '../../../../test-mocks/mock-application';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationCompany } from '../../../../../types';
import generateMultipleFieldHtml from '../../../generate-multiple-field-html';
import generateAddressObject from '../../generate-address-object';

const {
  YOUR_BUSINESS: { COMPANY_DETAILS: FORM_TITLE },
} = FORM_TITLES;

const {
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_CHANGE,
    COMPANY_DETAILS_CHECK_AND_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHANGE,
    ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_ADDRESS },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
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
      field: getFieldById(FIELDS.COMPANY_DETAILS, HAS_DIFFERENT_TRADING_NAME),
      data: mockAnswers,
      href: generateChangeLink(
        COMPANY_DETAILS_CHANGE,
        COMPANY_DETAILS_CHECK_AND_CHANGE,
        `#${HAS_DIFFERENT_TRADING_NAME}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    },
    mapYesNoField(mockAnswers[HAS_DIFFERENT_TRADING_NAME]),
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
  ...optionalFields(mockAnswers, referenceNumber, checkAndChange),
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
  describe('optionalFields', () => {
    const { referenceNumber } = mockApplication;

    it(`should return an empty array when ${TRADING_ADDRESS} is false`, () => {
      const mockAnswers = {
        ...mockCompany,
        [TRADING_ADDRESS]: false,
      };
      const checkAndChange = false;

      const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual([]);
    });

    it(`should return optional field when ${TRADING_ADDRESS} is true`, () => {
      const mockAnswers = {
        ...mockCompany,
        [TRADING_ADDRESS]: true,
      };
      const checkAndChange = false;

      const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

      const address = generateAddressObject(mockAnswers[DIFFERENT_TRADING_ADDRESS][FULL_ADDRESS]);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, FULL_ADDRESS),
            data: mockAnswers,
            href: generateChangeLink(
              ALTERNATIVE_TRADING_ADDRESS_CHANGE,
              ALTERNATIVE_TRADING_ADDRESS_CHECK_AND_CHANGE,
              `#${FULL_ADDRESS}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          generateMultipleFieldHtml(address),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('generateYourCompanyFields', () => {
    describe('when a company has a financial year end date', () => {
      const mockAnswers = mockCompany;
      const { referenceNumber } = mockApplication;
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
      const { referenceNumber } = mockApplication;
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
