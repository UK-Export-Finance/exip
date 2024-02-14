import flattenApplicationData, { policyContactMapped } from '.';
import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const { policy, exportContract, company, broker, business, buyer, sectionReview, declaration, policyContact } = mockApplication;
    const { buyerTradingHistory, contact, relationship } = mockApplication.buyer;

    const expected = {
      ...mockApplication.eligibility,
      version: mockApplication.version,
      referenceNumber: mockApplication.referenceNumber,
      createdAt: mockApplication.createdAt,
      updatedAt: mockApplication.updatedAt,
      dealType: mockApplication.dealType,
      submissionCount: mockApplication.submissionCount,
      submissionDeadline: mockApplication.submissionDeadline,
      submissionType: mockApplication.submissionType,
      submissionDate: mockApplication.submissionDate,
      status: mockApplication.status,
      buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
      ...policy,
      ...policy.jointlyInsuredParty,
      ...exportContract,
      ...company,
      ...business,
      ...broker,
      ...buyer,
      ...buyerTradingHistory,
      ...contact,
      ...relationship,
      ...policyContactMapped(policyContact),
      ...getTrueAndFalseAnswers(sectionReview),
      ...getTrueAndFalseAnswers(declaration),
    };

    expect(result).toEqual(expected);
  });
});
