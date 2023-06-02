import { DEFAULT } from '../../../content-strings';
import formatDate from '../../date/format-date';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import mapInsuredFor from './map-insured-for';
import { Application } from '../../../../types';

/**
 * mapApplication
 * Map an application for display in the dashboard
 * @param {Object} Application
 * @returns {Object} Mapped application
 */
export const mapApplication = (application: Application) => {
  const { status, updatedAt, referenceNumber, buyer } = application;

  const mapped = {
    status,
    lastUpdated: formatDate(new Date(updatedAt)),
    referenceNumber,
    buyerName: replaceCharacterCodesWithCharacters(buyer.companyOrOrganisationName) || DEFAULT.EMPTY,
    insuredFor: mapInsuredFor(application),
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
