import dotenv from 'dotenv';
import formatDate from '../format-date';
import mockApplication from '../../test-mocks/mock-application';
import generateApplicationUrl from '../generate-application-url';
import mapApplicationSubmissionDeadlineVariables from '.';

dotenv.config();

describe('helpers/map-application-submission-deadline-variables', () => {
  const { owner, referenceNumber, buyer, submissionDeadline } = mockApplication;

  describe('when a fully populated application is passed', () => {
    it(`should return an object with email variables`, async () => {
      const result = mapApplicationSubmissionDeadlineVariables(mockApplication);

      const expected = {
        email: owner.email,
        name: `${owner.firstName} ${owner.lastName}`,
        referenceNumber: String(referenceNumber),
        applicationUrl: generateApplicationUrl(referenceNumber),
        buyerName: String(buyer.companyOrOrganisationName),
        submissionDeadline: formatDate(new Date(submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when buyer companyOrOrganisation is an empty string', () => {
    it(`should return an object with email variables`, async () => {
      mockApplication.buyer.companyOrOrganisationName = '';

      const result = mapApplicationSubmissionDeadlineVariables(mockApplication);

      const expected = {
        email: owner.email,
        name: `${owner.firstName} ${owner.lastName}`,
        referenceNumber: String(referenceNumber),
        applicationUrl: generateApplicationUrl(referenceNumber),
        buyerName: '',
        submissionDeadline: formatDate(new Date(submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when buyer companyOrOrganisation is undefined', () => {
    it(`should return an object with email variables`, async () => {
      mockApplication.buyer.companyOrOrganisationName = undefined;

      const result = mapApplicationSubmissionDeadlineVariables(mockApplication);

      const expected = {
        email: owner.email,
        name: `${owner.firstName} ${owner.lastName}`,
        referenceNumber: String(referenceNumber),
        applicationUrl: generateApplicationUrl(referenceNumber),
        buyerName: '',
        submissionDeadline: formatDate(new Date(submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });
});
