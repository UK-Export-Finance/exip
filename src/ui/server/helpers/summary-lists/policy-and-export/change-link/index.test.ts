import changeLink from '.';
import { FIELD_VALUES, ROUTES } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { SINGLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy-and-export/change-link', () => {
  const { referenceNumber } = mockApplication;

  const mockFieldId = 'mockField';

  describe('when the policy type is single policy type', () => {
    it('should return renderChangeLink with correct link', () => {
      const result = changeLink(FIELD_VALUES.POLICY_TYPE.SINGLE, referenceNumber, mockFieldId);

      const expected = {
        renderChangeLink: true,
        href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${mockFieldId}-label`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is multiple policy type', () => {
    it('should return renderChangeLink with correct link', () => {
      const result = changeLink(FIELD_VALUES.POLICY_TYPE.MULTIPLE, referenceNumber, mockFieldId);

      const expected = {
        renderChangeLink: true,
        href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${mockFieldId}-label`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is not single or multiple', () => {
    it('should render renderChangeLink as false', () => {
      const result = changeLink('Mock', referenceNumber, mockFieldId);

      const expected = {
        renderChangeLink: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
