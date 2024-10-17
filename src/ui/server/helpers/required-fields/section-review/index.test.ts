import requiredFields from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  CHECK_YOUR_ANSWERS: { ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT },
} = FIELD_IDS;

describe('server/helpers/required-fields/section-review', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const expected = [ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];

    expect(result).toEqual(expected);
  });
});
