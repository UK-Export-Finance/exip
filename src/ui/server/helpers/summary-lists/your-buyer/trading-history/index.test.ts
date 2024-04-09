import tradingHistoryFields from '.';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import optionalTradedWithBuyerFields from './optional-fields/traded-with-buyer';
import optionalOutstandingPaymentsFields from './optional-fields/outstanding-payments';
import { mockApplicationBuyer, referenceNumber } from '../../../../test-mocks/mock-application';

const {
  YOUR_BUYER: { TRADING_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const { TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS } = BUYER_FIELD_IDS;

describe('server/helpers/summary-lists/your-buyer/trading-history', () => {
  const mockAnswers = mockApplicationBuyer.buyerTradingHistory;
  const checkAndChange = false;

  const expectedBase = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, TRADED_WITH_BUYER),
        data: mockAnswers,
        href: generateChangeLink(TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, `#${TRADED_WITH_BUYER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(mockAnswers[TRADED_WITH_BUYER]),
    ),
    ...optionalTradedWithBuyerFields(mockAnswers, referenceNumber, checkAndChange),
    ...optionalOutstandingPaymentsFields(mockAnswers, referenceNumber, checkAndChange),
  ];

  it('should return fields and values from the submitted data/answers', () => {
    mockAnswers[TRADED_WITH_BUYER] = true;
    mockAnswers[OUTSTANDING_PAYMENTS] = true;

    const result = tradingHistoryFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = {
      title: FORM_TITLE,
      fields: expectedBase,
    };

    expect(result).toEqual(expected);
  });
});
