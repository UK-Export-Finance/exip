import flattenApplicationData from '.';
import getYesAndTrueAnswerProperties from '../get-true-properties';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const { policyAndExport, company, broker, business, buyer, sectionReview, declaration } = mockApplication;

    const expected = {
      ...mockApplication.eligibility,
      version: mockApplication.version,
      referenceNumber: mockApplication.referenceNumber,
      createdAt: mockApplication.createdAt,
      updatedAt: mockApplication.updatedAt,
      submissionDeadline: mockApplication.submissionDeadline,
      submissionType: mockApplication.submissionType,
      submissionDate: mockApplication.submissionDate,
      status: mockApplication.status,
      buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
      ...policyAndExport,
      ...company,
      ...business,
      ...broker,
      ...buyer,
      ...getYesAndTrueAnswerProperties(sectionReview),
      ...getYesAndTrueAnswerProperties(declaration),
    };

    expect(result).toEqual(expected);
  });
});
