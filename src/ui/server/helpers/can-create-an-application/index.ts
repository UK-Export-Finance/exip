import { objectHasKeysAndValues } from '../object';
import { RequestSession } from '../../../types';

// TODO: instead of objectHasKeysAndValues,
// check the following values exist.
// ApplicationEligibility
// buyerCountryIsoCode: String!
// coverPeriodId: Int!
// hasCompaniesHouseNumber: Boolean!
// hasEndBuyer: Boolean!
// hasMinimumUkGoodsOrServices: Boolean!
// totalContractValueId: Int!
// validExporterLocation: Boolean!

/**
 * canCreateAnApplication
 * Check if there are eligibility answers in the session.
 * If so, return true
 * @param {Express.Request.session} Express request session
 * @returns {Boolean}
 */
const canCreateAnApplication = (session: RequestSession) => {
  console.info('Checking if an application can be created from eligibility session data');

  if (session.submittedData && objectHasKeysAndValues(session.submittedData.insuranceEligibility)) {
    console.info('Application can be created from eligibility session data');

    return true;
  }

  return false;
};

export default canCreateAnApplication;
