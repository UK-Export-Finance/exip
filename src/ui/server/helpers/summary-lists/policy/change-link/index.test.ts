import changeLink from '.';
import { FIELD_VALUES, ROUTES } from '../../../../constants';
import { referenceNumber } from '../../../../test-mocks';
import generateChangeLink from '../../../generate-change-link';

const {
  INSURANCE: {
    POLICY: {
      SINGLE_CONTRACT_POLICY_CHANGE,
      SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
      MULTIPLE_CONTRACT_POLICY_CHANGE,
      MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy/change-link', () => {
  const mockFieldId = 'mockField';
  const checkAndChange = false;

  describe('when the policy type is single policy type', () => {
    it('should return renderChangeLink with correct link', () => {
      const result = changeLink(FIELD_VALUES.POLICY_TYPE.SINGLE, referenceNumber, mockFieldId, checkAndChange);

      const expected = {
        renderChangeLink: true,
        href: generateChangeLink(
          SINGLE_CONTRACT_POLICY_CHANGE,
          SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${mockFieldId}-label`,
          referenceNumber,
          checkAndChange,
        ),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is multiple policy type', () => {
    it('should return renderChangeLink with correct link', () => {
      const result = changeLink(FIELD_VALUES.POLICY_TYPE.MULTIPLE, referenceNumber, mockFieldId, checkAndChange);

      const expected = {
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_CHANGE,
          MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${mockFieldId}-label`,
          referenceNumber,
          checkAndChange,
        ),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is not single or multiple', () => {
    it('should render renderChangeLink as false', () => {
      const result = changeLink('Mock', referenceNumber, mockFieldId, checkAndChange);

      const expected = {
        renderChangeLink: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
