import { Application, ApplicationExporterSicCodes } from '../../../types';
import { FIELD_IDS } from '../../constants';
import { objectHasProperty } from '../object';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_SIC },
  },
} = FIELD_IDS.INSURANCE;

/**
 * gets sic codes from application and creates an array
 * array contains object with { id: id of sic code }
 * @param {Application} application
 * @returns {Array<Object>} sicCodeIDArray
 */
const getSicCodeIDsFromApplication = (application: Application) => {
  const { company } = application;

  // if no sic codes stored in application, then return empty array
  if (!objectHasProperty(company, COMPANY_SIC)) {
    return [];
  }

  const sicCodeIDArray = company[COMPANY_SIC].map((code: ApplicationExporterSicCodes) => ({ id: code.id }));

  return sicCodeIDArray;
};

export default getSicCodeIDsFromApplication;
