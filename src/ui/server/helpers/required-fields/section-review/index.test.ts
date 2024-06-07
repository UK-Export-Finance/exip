import requiredFields from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/check-your-answers';

describe('server/helpers/required-fields/section-review', () => {
  it('should return array of required fields', () => {
    const expected = Object.values(FIELD_IDS);

    expect(requiredFields).toEqual(expected);
  });
});
