import { DEFAULT } from '../../../content-strings';
import formatDate from '../../date/format-date';
import mapInsuredFor from './map-insured-for';
import { Application } from '../../../../types';

export const mapApplication = (application: Application) => {
  const { status, updatedAt, referenceNumber, buyer } = application;

  const mapped = {
    status,
    lastUpdated: formatDate(new Date(updatedAt)),
    referenceNumber,
    buyerLocation: buyer?.country?.name || DEFAULT.EMPTY,
    buyerName: buyer.companyOrOrganisationName || DEFAULT.EMPTY,
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
