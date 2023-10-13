import generateCreditPeriodAndCurrencyFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCurrencyByCode from '../../../get-currency-by-code';
import changeLink from '../change-link';
import { mockApplication, mockCurrencies } from '../../../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: { CREDIT_PERIOD_WITH_BUYER, POLICY_CURRENCY_CODE },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy/credit-period-and-currency-fields', () => {
  const mockAnswers = mockApplication.policy;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange);

    const expected = [
      fieldGroupItem({
        field: getFieldById(FIELDS.CONTRACT_POLICY, CREDIT_PERIOD_WITH_BUYER),
        data: mockAnswers,
        ...changeLink(mockAnswers[POLICY_TYPE], referenceNumber, CREDIT_PERIOD_WITH_BUYER, checkAndChange),
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTRACT_POLICY, POLICY_CURRENCY_CODE),
          ...changeLink(mockAnswers[POLICY_TYPE], referenceNumber, POLICY_CURRENCY_CODE, checkAndChange),
        },
        getCurrencyByCode(mockCurrencies, mockAnswers[POLICY_CURRENCY_CODE]).name,
      ),
    ];

    expect(result).toEqual(expected);
  });
});
