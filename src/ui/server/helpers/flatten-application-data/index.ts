import getTrueProperties from '../get-true-properties';
import { Application, ApplicationFlat } from '../../../types';

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Object} Application
 * @returns {Object} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { eligibility, policyAndExport, exporterCompany, exporterBroker, exporterBusiness, buyer, declaration, ...app } = application;

  const flattened = {
    ...eligibility,
    buyerCountry: application.eligibility?.buyerCountry?.isoCode,
    ...policyAndExport,
    ...exporterCompany,
    ...exporterBusiness,
    ...exporterBroker,
    ...buyer,
    ...getTrueProperties(declaration),
    ...app,
  };

  return flattened;
};

export default flattenApplicationData;
