import requiredFields from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  CHECK_YOUR_ANSWERS: { ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER },
} = FIELD_IDS;

describe('server/helpers/required-fields/section-review', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const expected = [ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER];

    expect(result).toEqual(expected);
  });
});
