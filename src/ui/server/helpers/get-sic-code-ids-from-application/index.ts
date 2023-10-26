import { Application, ApplicationExporterSicCodes } from '../../../types';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { objectHasProperty } from '../object';

const {
  COMPANIES_HOUSE: { COMPANY_SIC },
} = INSURANCE_FIELD_IDS;

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
