import requiredFields from '.';
import FIELD_IDS from '../../constants/field-ids/insurance';
import flattenApplicationData from '../flatten-application-data';
import requiredEligibilityFields from './eligibility';
import requiredPolicyAndExportFields from './policy-and-exports';
import requiredExporterBusinessFields from './exporter-business';
import requiredYourBuyerFields from './your-buyer';
import requiredSectionReviewFields from './section-review';
import requiredDeclarationsFields from './declarations';
import { mockApplication } from '../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

describe('server/helpers/required-fields/index', () => {
  const flatApplicationData = flattenApplicationData(mockApplication);

  it('should return array of required fields', () => {
    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyAndExportFields(flatApplicationData[POLICY_TYPE]),
      ...requiredExporterBusinessFields(),
      ...requiredYourBuyerFields(),
      ...requiredSectionReviewFields(),
      ...requiredDeclarationsFields(flatApplicationData[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]),
    ];

    expect(result).toEqual(expected);
  });
});
