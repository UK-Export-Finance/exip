import generateSingleContractPolicyFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import formatCurrency from '../../../format-currency';
import { mockSinglePolicyAndExport } from '../../../../test-mocks/mock-application';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/single-contract-policy-fields', () => {
  const mockAnswers = mockSinglePolicyAndExport;

  it('should return fields and values from the submitted data/answes', () => {
    const result = generateSingleContractPolicyFields(mockAnswers);

    const expected = [
      fieldGroupItem({ field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, CONTRACT_COMPLETION_DATE) }, formatDate(mockAnswers[CONTRACT_COMPLETION_DATE])),
      fieldGroupItem({ field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, TOTAL_CONTRACT_VALUE) }, formatCurrency(mockAnswers[TOTAL_CONTRACT_VALUE], 'GBP')),
    ];

    expect(result).toEqual(expected);
  });
});
