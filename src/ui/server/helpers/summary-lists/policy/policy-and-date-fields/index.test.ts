import generatePolicyAndDateFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import changeLink from '../change-link';
import { mockApplication } from '../../../../test-mocks';

const {
  INSURANCE: {
    POLICY: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: { REQUESTED_START_DATE },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { TYPE_OF_POLICY_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy/policy-and-date-fields', () => {
  const { referenceNumber } = mockApplication;

  const mockAnswers = mockApplication.policy;
  const checkAndChange = false;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generatePolicyAndDateFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = [
      fieldGroupItem({
        field: getFieldById(FIELDS, POLICY_TYPE),
        data: mockAnswers,
        href: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`,
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
          ...changeLink(mockAnswers[POLICY_TYPE], referenceNumber, REQUESTED_START_DATE, checkAndChange),
        },
        formatDate(mockAnswers[REQUESTED_START_DATE]),
      ),
    ];

    expect(result).toEqual(expected);
  });
});
