import generatePolicyAndDateFields from '.';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import formatDate from '../../../date/format-date';
import { mockApplication } from '../../../../test-mocks';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
      },
    },
  },
} = FIELD_IDS;

describe('server/helpers/summary-lists/policy-and-export/policy-and-date-fields', () => {
  const mockAnswers = mockApplication.policyAndExport;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generatePolicyAndDateFields(mockAnswers);

    const expected = [
      fieldGroupItem({
        field: { id: POLICY_TYPE, ...FIELDS[POLICY_TYPE] },
        data: mockAnswers,
      }),
      fieldGroupItem(
        { field: { id: REQUESTED_START_DATE, ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE] } },
        formatDate(mockAnswers[REQUESTED_START_DATE]),
      ),
    ];

    expect(result).toEqual(expected);
  });
});
