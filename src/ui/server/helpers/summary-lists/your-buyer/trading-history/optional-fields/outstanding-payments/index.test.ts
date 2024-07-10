import optionalOutstandingPaymentsFields from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../../../generate-field-group-item';
import getFieldById from '../../../../../get-field-by-id';
import generateChangeLink from '../../../../../generate-change-link';
import formatCurrency from '../../../../../format-currency';
import { mockApplicationBuyer, referenceNumber } from '../../../../../../test-mocks/mock-application';

const { TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const {
  YOUR_BUYER: { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE },
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/trading-history/optional-fields/outstanding-payments', () => {
  const mockAnswers = mockApplicationBuyer.buyerTradingHistory;
  const checkAndChange = false;

  describe(`when ${OUTSTANDING_PAYMENTS} is true`, () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = optionalOutstandingPaymentsFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
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
          },
          formatCurrency(mockAnswers[TOTAL_OUTSTANDING_PAYMENTS], mockAnswers[CURRENCY_CODE]),
        ),
        fieldGroupItem(
          {
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
          },
          formatCurrency(mockAnswers[TOTAL_AMOUNT_OVERDUE], mockAnswers[CURRENCY_CODE]),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${OUTSTANDING_PAYMENTS} is false`, () => {
    it('should return an empty array', () => {
      mockAnswers[OUTSTANDING_PAYMENTS] = false;

      const result = optionalOutstandingPaymentsFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual([]);
    });
  });
});
