import { FIELD_IDS } from '../../../constants';
import requiredFields from '.';

describe('requiredFields', () => {
  const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, ...COMPANY_OR_ORGANISATION_FIELDS } = FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

  it('should return array of required fields for section', () => {
    const response = requiredFields();

    const expected = Object.values({
      ...COMPANY_OR_ORGANISATION_FIELDS,
      ...FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
    });

    expect(response).toEqual(expected);
  });
});
