import optionalTradedWithBuyerFields from '.';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';
import BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../../../generate-field-group-item';
import getFieldById from '../../../../../get-field-by-id';
import mapYesNoField from '../../../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../../../generate-change-link';
import mockApplication, { mockApplicationBuyer } from '../../../../../../test-mocks/mock-application';

const { TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = BUYER_FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/trading-history/optional-fields/traded-with-buyer', () => {
  const mockAnswers = mockApplicationBuyer.buyerTradingHistory;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe(`when ${TRADED_WITH_BUYER} is true`, () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = optionalTradedWithBuyerFields(mockAnswers, referenceNumber, checkAndChange);

      const expected = [
        fieldGroupItem(
          {
            field: getFieldById(FIELDS, OUTSTANDING_PAYMENTS),
            data: mockAnswers,
            href: generateChangeLink(
              TRADING_HISTORY_CHANGE,
              TRADING_HISTORY_CHECK_AND_CHANGE,
              `#${OUTSTANDING_PAYMENTS}-label`,
              referenceNumber,
              checkAndChange,
            ),
            renderChangeLink: true,
          },
          mapYesNoField(mockAnswers[OUTSTANDING_PAYMENTS]),
        ),
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

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${TRADED_WITH_BUYER} is false`, () => {
    it('should return an empty array', () => {
      mockAnswers[TRADED_WITH_BUYER] = false;

      const result = optionalTradedWithBuyerFields(mockAnswers, referenceNumber, checkAndChange);

      expect(result).toEqual([]);
    });
  });
});
