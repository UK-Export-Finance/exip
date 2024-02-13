import tradingHistoryFields, { optionalFields } from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import mockApplication, { mockApplicationBuyer } from '../../../../test-mocks/mock-application';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  YOUR_BUYER: { TRADING_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, FAILED_PAYMENTS } = FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/trading-history-fields', () => {
  const mockAnswers = mockApplicationBuyer.buyerTradingHistory;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('optionalFields', () => {
    describe(`${OUTSTANDING_PAYMENTS} is true`, () => {
      it(`should return fields and values from the submitted data/answers including ${TOTAL_OUTSTANDING_PAYMENTS} and ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        const expected = [
          fieldGroupItem({
            field: getFieldById(FIELDS, TOTAL_OUTSTANDING_PAYMENTS),
            data: mockAnswers,
            href: generateChangeLink(
              TRADING_HISTORY_CHANGE,
              TRADING_HISTORY_CHECK_AND_CHANGE,
              `#${TOTAL_OUTSTANDING_PAYMENTS}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
          fieldGroupItem({
            field: getFieldById(FIELDS, TOTAL_AMOUNT_OVERDUE),
            data: mockAnswers,
            href: generateChangeLink(
              TRADING_HISTORY_CHANGE,
              TRADING_HISTORY_CHECK_AND_CHANGE,
              `#${TOTAL_AMOUNT_OVERDUE}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          }),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`${OUTSTANDING_PAYMENTS} is false`, () => {
      it('should return an empty array', () => {
        mockAnswers[OUTSTANDING_PAYMENTS] = false;
        const result = optionalFields(mockAnswers, referenceNumber, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('tradingHistoryFields', () => {
    const expectedBase = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TRADED_WITH_BUYER),
          data: mockAnswers,
          href: generateChangeLink(
            TRADED_WITH_BUYER_CHANGE,
            TRADED_WITH_BUYER_CHECK_AND_CHANGE,
            `#${TRADED_WITH_BUYER}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[TRADED_WITH_BUYER]),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, OUTSTANDING_PAYMENTS),
          data: mockAnswers,
          href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${OUTSTANDING_PAYMENTS}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[OUTSTANDING_PAYMENTS]),
      ),
      ...optionalFields(mockAnswers, referenceNumber, checkAndChange),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, FAILED_PAYMENTS),
          data: mockAnswers,
          href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${FAILED_PAYMENTS}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mapYesNoField(mockAnswers[FAILED_PAYMENTS]),
      ),
    ];

    it('should return fields and values from the submitted data/answers', () => {
      mockAnswers[OUTSTANDING_PAYMENTS] = true;

      const result = tradingHistoryFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = {
        title: FORM_TITLE,
        fields: expectedBase,
      };

      expect(result).toEqual(expected);
    });
  });
});
