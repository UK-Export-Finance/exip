import { objectHasKeysAndValues } from '../object';
import { RequestSession } from '../../../types';

/**
 * canCreateAnApplication
 * Check if there are eligibility answers in the session.
 * If so, return true
 * @param {Express.Request.session} Express request session
 * @returns {Boolean}
 */
const canCreateAnApplication = (session: RequestSession) => {
  if (session.submittedData && objectHasKeysAndValues(session.submittedData.insuranceEligibility)) {
    return true;
  }

  return false;
};

export default canCreateAnApplication;
