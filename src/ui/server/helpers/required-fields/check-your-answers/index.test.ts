import requiredFields from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';

const { CHECK_YOUR_ANSWERS } = FIELD_IDS;

const { ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER } = CHECK_YOUR_ANSWERS;

describe('server/helpers/required-fields/check-your-answers', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const expected = [ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER];

    expect(result).toEqual(expected);
  });
});
