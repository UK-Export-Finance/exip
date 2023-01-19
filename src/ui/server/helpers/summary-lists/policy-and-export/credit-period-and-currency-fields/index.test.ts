import generateCreditPeriodAndCurrencyFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCurrencyByCode from '../../../get-currency-by-code';
import { mockApplication, mockCurrencies } from '../../../../test-mocks';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: { CREDIT_PERIOD_WITH_BUYER, POLICY_CURRENCY_CODE },
    },
  },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/credit-period-and-currency-fields', () => {
  const mockAnswers = mockApplication.policyAndExport;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateCreditPeriodAndCurrencyFields(mockAnswers, mockCurrencies);

    const expected = [
      fieldGroupItem({
        field: getFieldById(FIELDS.CONTRACT_POLICY, CREDIT_PERIOD_WITH_BUYER),
        data: mockAnswers,
      }),
      fieldGroupItem(
        { field: getFieldById(FIELDS.CONTRACT_POLICY, POLICY_CURRENCY_CODE) },
        `${mockAnswers[POLICY_CURRENCY_CODE]} ${getCurrencyByCode(mockCurrencies, mockAnswers[POLICY_CURRENCY_CODE]).name}`,
      ),
    ];

    expect(result).toEqual(expected);
  });
});
