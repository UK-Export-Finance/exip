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
  const { id, status, submissionDate, referenceNumber, buyer } = application;

  /**
   * Specifically log out some missing properties.
   * Previously in production, there was an issue with application creation.
   * It seems that some external API, network lag or form submission in quick succession,
   * caused 2x applications to be created at the same time, without a buyer country name or reference number.
   * We were unable to replicate the issue, however, we spent quite some time debugging.
   * If such properties are missing - when viewing the dashboard/debugging,
   * errors or confusing behaviour could occur.
   * Therefore, log out these specific errors for easier, potential future debugging.
   */
  if (!buyer.country?.name) {
    console.error(`Application %s ${referenceNumber} is missing buyer country name (mapApplication helper)`);
  }

  if (!referenceNumber) {
    console.error(`Application %s ${id} is missing a reference number (mapApplication helper)`);
  }

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
export const mapApplications = (applications: Array<Application>) => {
  console.info('Mapping applications (mapApplications helper)');

  const mapped = applications.map((application) => mapApplication(application));

  return mapped;
};

export default mapApplications;
