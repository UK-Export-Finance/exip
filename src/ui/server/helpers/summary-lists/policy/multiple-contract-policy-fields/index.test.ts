import generateMultipleContractPolicyFields from '.';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { GBP_CURRENCY_CODE, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import mapMonthString from '../../../data-content-mappings/map-month-string';
import mockApplication, { mockMultiplePolicy } from '../../../../test-mocks/mock-application';
import generateChangeLink from '../../../generate-change-link';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { MULTIPLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy/multiple-contract-policy-fields', () => {
  const mockAnswers = mockMultiplePolicy;
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  const expectedBase = {
    [TOTAL_MONTHS_OF_COVER]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_MONTHS_OF_COVER),
      renderChangeLink: true,
      href: generateChangeLink(
        MULTIPLE_CONTRACT_POLICY_CHANGE,
        MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
        `#${TOTAL_MONTHS_OF_COVER}-label`,
        referenceNumber,
        checkAndChange,
      ),
    },
    [TOTAL_SALES_TO_BUYER]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_SALES_TO_BUYER),
      renderChangeLink: true,
      href: generateChangeLink(
        MULTIPLE_CONTRACT_POLICY_CHANGE,
        MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
        `#${TOTAL_SALES_TO_BUYER}-label`,
        referenceNumber,
        checkAndChange,
      ),
    },
    [MAXIMUM_BUYER_WILL_OWE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
      renderChangeLink: true,
      href: generateChangeLink(
        MULTIPLE_CONTRACT_POLICY_CHANGE,
        MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
        `#${MAXIMUM_BUYER_WILL_OWE}-label`,
        referenceNumber,
        checkAndChange,
      ),
    },
  };

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateMultipleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange);

    const expected = [
      fieldGroupItem(expectedBase[TOTAL_MONTHS_OF_COVER], mapMonthString(mockAnswers[TOTAL_MONTHS_OF_COVER])),
      fieldGroupItem(expectedBase[TOTAL_SALES_TO_BUYER], formatCurrency(mockAnswers[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
      fieldGroupItem(expectedBase[MAXIMUM_BUYER_WILL_OWE], formatCurrency(mockAnswers[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
    ];

    expect(result).toEqual(expected);
  });

  describe('when there are no submitted data/answers', () => {
    it('should return fields without values', () => {
      const result = generateMultipleContractPolicyFields({ id: mockApplication.id }, referenceNumber, checkAndChange);

      const expected = [
        fieldGroupItem(expectedBase[TOTAL_MONTHS_OF_COVER]),
        fieldGroupItem(expectedBase[TOTAL_SALES_TO_BUYER]),
        fieldGroupItem(expectedBase[MAXIMUM_BUYER_WILL_OWE]),
      ];

      expect(result).toEqual(expected);
    });
  });
});
