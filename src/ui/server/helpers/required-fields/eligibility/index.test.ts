import { FIELD_IDS } from '../../../constants';
import requiredFields from '.';

describe('server/helpers/required-fields/eligibility', () => {
  const { ACCOUNT_TO_APPLY_ONLINE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

  it('should return array of required fields', () => {
    const result = requiredFields();

    const expected = Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE);

    expect(result).toEqual(expected);
  });
});
