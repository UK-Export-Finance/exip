import generateSingleContractPolicyFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import formatDate from '../../../../date/format-date';
import formatCurrency from '../../../../format-currency';
import { referenceNumber, mockSinglePolicy } from '../../../../../test-mocks/mock-application';

const {
  CONTRACT_POLICY: {
    POLICY_CURRENCY_CODE,
    SINGLE: { CONTRACT_COMPLETION_DATE, REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

const {
  INSURANCE_ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY_CHANGE, SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE },
} = INSURANCE_ROUTES;

describe('server/helpers/summary-lists/policy/policy-and-date-fields/single-contract-policy-fields', () => {
  const mockAnswers = mockSinglePolicy;
  const checkAndChange = false;

  const expectedBase = {
    [CONTRACT_COMPLETION_DATE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, CONTRACT_COMPLETION_DATE),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${CONTRACT_COMPLETION_DATE}-label`,
    },
    [TOTAL_CONTRACT_VALUE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, TOTAL_CONTRACT_VALUE),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}#${TOTAL_CONTRACT_VALUE}-label`,
    },
    [REQUESTED_CREDIT_LIMIT]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, REQUESTED_CREDIT_LIMIT),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}#${REQUESTED_CREDIT_LIMIT}-label`,
    },
  };

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateSingleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = [
      fieldGroupItem(expectedBase[CONTRACT_COMPLETION_DATE], formatDate(new Date(mockAnswers[CONTRACT_COMPLETION_DATE]))),
      fieldGroupItem(expectedBase[TOTAL_CONTRACT_VALUE], formatCurrency(mockAnswers[TOTAL_CONTRACT_VALUE], mockAnswers[POLICY_CURRENCY_CODE])),
      fieldGroupItem(expectedBase[REQUESTED_CREDIT_LIMIT], formatCurrency(mockAnswers[REQUESTED_CREDIT_LIMIT], mockAnswers[POLICY_CURRENCY_CODE])),
    ];

    expect(result).toEqual(expected);
  });
});
