import requiredFields from '.';
import requiredBusinessFields from '../business';
import requiredSectionReviewFields from '../section-review';
import requiredEligibilityFields from '../eligibility';
import requiredExportContractFields from '../export-contract';
import requiredPolicyFields from '../policy';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

describe('server/helpers/required-fields/check-your-answers', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);
    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredBusinessFields(),
      ...requiredEligibilityFields(),
      ...requiredExportContractFields(flatApplicationData),
      ...requiredPolicyFields(flatApplicationData),
      ...requiredSectionReviewFields(),
      ...requiredYourBuyerFields({}),
    ];

    expect(result).toEqual(expected);
  });
});
