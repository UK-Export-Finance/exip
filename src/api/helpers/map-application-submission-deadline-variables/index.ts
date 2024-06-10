import formatDate from '../format-date';
import { SubmissionDeadlineEmailVariables, Application } from '../../types';

/**
 * mapApplicationSubmissionDeadlineVariables
 * maps the application object to generate email variables for submission deadline
 * @param {Application} application
 * @returns {SubmissionDeadlineEmailVariables} variables for email
 */
const mapApplicationSubmissionDeadlineVariables = (application: Application): SubmissionDeadlineEmailVariables => ({
  email: application.owner.email,
  name: `${application.owner.firstName} ${application.owner.lastName}`,
  referenceNumber: String(application.referenceNumber),
  applicationUrl: '',
  buyer: application.buyer.companyOrOrganisationName ? String(application.buyer.companyOrOrganisationName) : '',
  submissionDeadline: formatDate(new Date(application.submissionDeadline)),
});

export default mapApplicationSubmissionDeadlineVariables;
