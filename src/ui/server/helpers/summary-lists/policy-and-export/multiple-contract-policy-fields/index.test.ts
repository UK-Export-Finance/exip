import generateMultipleContractPolicyFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import mapMonthString from '../../../data-content-mappings/map-month-string';
import { mockMultiplePolicyAndExport } from '../../../../test-mocks/mock-application';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
      },
    },
  },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/multiple-contract-policy-fields', () => {
  const mockAnswers = mockMultiplePolicyAndExport;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateMultipleContractPolicyFields(mockAnswers);

    const expected = [
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_MONTHS_OF_COVER),
          data: mockAnswers,
        },
        mapMonthString(mockAnswers[TOTAL_MONTHS_OF_COVER]),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_SALES_TO_BUYER),
          data: mockAnswers,
        },
        formatCurrency(mockAnswers[TOTAL_SALES_TO_BUYER], 'GBP'),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
          data: mockAnswers,
        },
        formatCurrency(mockAnswers[MAXIMUM_BUYER_WILL_OWE], 'GBP'),
      ),
    ];

    expect(result).toEqual(expected);
  });
});
