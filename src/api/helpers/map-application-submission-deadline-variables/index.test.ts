import dotenv from 'dotenv';
import formatDate from '../format-date';
import mockApplication from '../../test-mocks/mock-application';
import generateApplicationUrl from '../generate-application-url';
import mapApplicationSubmissionDeadlineVariables from '.';

dotenv.config();

describe('helpers/map-application-submission-deadline-variables', () => {
  const application = {
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
    },
    referenceNumber: 12345,
    submissionDeadline: new Date(),
    buyer: mockApplication.buyer,
  };

  describe('when a fully populated application is passed', () => {
    it(`should return an object with email variables`, async () => {
      const result = mapApplicationSubmissionDeadlineVariables(application);

      const expected = {
        email: application.owner.email,
        name: `${application.owner.firstName} ${application.owner.lastName}`,
        referenceNumber: String(application.referenceNumber),
        applicationUrl: generateApplicationUrl(application.referenceNumber),
        buyerName: String(application.buyer.companyOrOrganisationName),
        submissionDeadline: formatDate(new Date(application.submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when buyer companyOrOrganisation is an empty string', () => {
    it(`should return an object with email variables`, async () => {
      application.buyer.companyOrOrganisationName = '';

      const result = mapApplicationSubmissionDeadlineVariables(application);

      const expected = {
        email: application.owner.email,
        name: `${application.owner.firstName} ${application.owner.lastName}`,
        referenceNumber: String(application.referenceNumber),
        applicationUrl: '',
        buyerName: '',
        submissionDeadline: formatDate(new Date(application.submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when buyer companyOrOrganisation is undefined', () => {
    it(`should return an object with email variables`, async () => {
      application.buyer.companyOrOrganisationName = undefined;

      const result = mapApplicationSubmissionDeadlineVariables(application);

      const expected = {
        email: application.owner.email,
        name: `${application.owner.firstName} ${application.owner.lastName}`,
        referenceNumber: String(application.referenceNumber),
        applicationUrl: '',
        buyerName: '',
        submissionDeadline: formatDate(new Date(application.submissionDeadline)),
      };

      expect(result).toEqual(expected);
    });
  });
});
