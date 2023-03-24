import getTrueProperties from '../get-true-properties';
import { Application, ApplicationFlat } from '../../../types';

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Object} Application
 * @returns {Object} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { policyAndExport, exporterCompany, exporterBroker, exporterBusiness, buyer, sectionReview, declaration, ...app } = application;

  const flattened = {
    ...application.eligibility,
    buyerCountry: application.eligibility?.buyerCountry?.isoCode,
    ...policyAndExport,
    ...exporterCompany,
    ...exporterBusiness,
    ...exporterBroker,
    ...buyer,
    ...getTrueProperties(sectionReview),
    ...getTrueProperties(declaration),
    ...app,
  };

  return flattened;
};

export default flattenApplicationData;
