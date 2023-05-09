import requiredFields from '.';
import FIELD_IDS from '../../constants/field-ids/insurance';
import flattenApplicationData from '../flatten-application-data';
import requiredPrepareApplicationFields from './prepare-application';
import requiredCheckYourAnswersFields from './check-your-answers';
import requiredDeclarationsFields from './declarations';
import { mockApplication } from '../../test-mocks';

const {
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT },
} = FIELD_IDS;

describe('server/helpers/required-fields/index', () => {
  const flatApplicationData = flattenApplicationData(mockApplication);

  it('should return array of required fields', () => {
    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredPrepareApplicationFields(flatApplicationData),
      ...requiredCheckYourAnswersFields(flatApplicationData),
      ...requiredDeclarationsFields(flatApplicationData[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]),
    ];

    expect(result).toEqual(expected);
  });
});
