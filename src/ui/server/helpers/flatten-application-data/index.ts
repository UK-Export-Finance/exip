import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { Application, ApplicationFlat } from '../../../types';

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Object} Application
 * @returns {Object} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { policyAndExport, company, broker, business, buyer, sectionReview, declaration } = application;

  const flattened = {
    ...application.eligibility,
    version: application.version,
    referenceNumber: application.referenceNumber,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    submissionDeadline: application.submissionDeadline,
    submissionType: application.submissionType,
    submissionDate: application.submissionDate,
    status: application.status,
    buyerCountry: application.eligibility?.buyerCountry?.isoCode,
    ...policyAndExport,
    ...company,
    ...business,
    ...broker,
    ...buyer,
    ...getTrueAndFalseAnswers(sectionReview),
    ...getTrueAndFalseAnswers(declaration),
  };

  return flattened;
};

export default flattenApplicationData;
