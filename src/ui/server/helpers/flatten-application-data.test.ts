import flattenApplicationData from './flatten-application-data';
import { mockApplication } from '../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const expected = {
      ...mockApplication,
      ...mockApplication.eligibility,
      buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
    };

    expect(result).toEqual(expected);
  });
});
