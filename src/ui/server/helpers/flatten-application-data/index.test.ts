import flattenApplicationData from '.';
import getTrueProperties from '../get-true-properties';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const { policyAndExport, exporterCompany, exporterBroker, exporterBusiness, buyer, sectionReview, declaration, ...application } = mockApplication;

    const expected = {
      ...mockApplication.eligibility,
      buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
      ...mockApplication.policyAndExport,
      ...exporterCompany,
      ...exporterBusiness,
      ...exporterBroker,
      ...buyer,
      ...getTrueProperties(sectionReview),
      ...getTrueProperties(declaration),
      ...application,
    };

    expect(result).toEqual(expected);
  });
});
