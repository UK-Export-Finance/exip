import canAccessSubmitYourApplicationRoutes from '.';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { mockApplication } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

describe('helpers/can-access-submit-your-application-routes', () => {
  describe('when an application has all required fields/answers', () => {
    it('should return true', () => {
      const result = canAccessSubmitYourApplicationRoutes(mockApplication);

      expect(result).toEqual(true);
    });
  });

  describe('when an application does NOT have all required fields/answers', () => {
    it('should return false', () => {
      const mockApplicationWithIncompleteFields = mockApplication;

      delete mockApplicationWithIncompleteFields.policy[POLICY_TYPE];

      const result = canAccessSubmitYourApplicationRoutes(mockApplicationWithIncompleteFields);

      expect(result).toEqual(false);
    });
  });
});
