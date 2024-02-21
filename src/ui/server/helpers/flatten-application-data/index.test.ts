import flattenApplicationData, { policyContactMapped } from '.';
import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const { broker, business, buyer, company, declaration, exportContract, nominatedLossPayee, policy, policyContact, sectionReview } = mockApplication;
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
      ...business,
      ...broker,
      ...buyer,
      ...buyerTradingHistory,
      ...company,
      ...contact,
      ...getTrueAndFalseAnswers(declaration),
      ...exportContract,
      ...nominatedLossPayee,
      ...getTrueAndFalseAnswers(nominatedLossPayee),
      ...relationship,
      ...policy,
      ...policy.jointlyInsuredParty,
      ...policyContactMapped(policyContact),
      ...getTrueAndFalseAnswers(sectionReview),
    };

    expect(result).toEqual(expected);
  });
});
