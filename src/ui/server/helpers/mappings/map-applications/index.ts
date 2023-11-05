import { DATE_FORMAT } from '../../../constants';
import { BUTTONS, DEFAULT } from '../../../content-strings';
import formatDate from '../../date/format-date';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import mapValue from './map-value';
import { Application } from '../../../../types';

/**
 * mapApplication
 * Map an application for display in the dashboard
 * @param {Application}
 * @returns {Object} Mapped application
 */
export const mapApplication = (application: Application) => {
  const { status, submissionDate, referenceNumber, buyer } = application;

  const mapped = {
    status,
    referenceNumber,
    buyerLocation: buyer.country?.name ? buyer.country.name : DEFAULT.EMPTY,
    buyerName: replaceCharacterCodesWithCharacters(buyer.companyOrOrganisationName) || DEFAULT.EMPTY,
    value: mapValue(application),
    submitted: submissionDate ? formatDate(new Date(submissionDate), DATE_FORMAT.SHORT_MONTH) : BUTTONS.CONTINUE,
  };

  return mapped;
};

/**
 * mapApplications
 * Map multiple applications for display in the dashboard
 * @param {Array} Applications
 * @returns {Array} Mapped applications
 */
export const mapApplications = (applications: Array<Application>) => applications.map((application) => mapApplication(application));

export default mapApplications;
