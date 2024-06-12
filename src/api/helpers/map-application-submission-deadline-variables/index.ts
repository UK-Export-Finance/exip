import formatDate from '../format-date';
import generateApplicationUrl from '../generate-application-url';
import { SubmissionDeadlineEmailVariables, Application } from '../../types';

/**
 * mapApplicationSubmissionDeadlineVariables
 * maps the application object to generate email variables for submission deadline
 * @param {Application} application
 * @returns {SubmissionDeadlineEmailVariables} variables for email
 */
const mapApplicationSubmissionDeadlineVariables = (application: Application): SubmissionDeadlineEmailVariables => {
  const { submissionDeadline, owner, referenceNumber, buyer } = application;
  const { email, firstName, lastName } = owner;
  const { companyOrOrganisationName } = buyer;

  return {
    email,
    name: `${firstName} ${lastName}`,
    referenceNumber: String(referenceNumber),
    applicationUrl: generateApplicationUrl(referenceNumber),
    buyerName: application.buyer.companyOrOrganisationName ? String(companyOrOrganisationName) : '',
    submissionDeadline: formatDate(new Date(submissionDeadline)),
  };
};

export default mapApplicationSubmissionDeadlineVariables;
