import { objectHasKeysAndValues } from '../object';
import getSubmittedEligibilityFields from './get-submitted-eligibility-fields';
import missingEligibilityFields from './log-missing-eligibility-fields';
import hasRequiredEligibilityFields from './has-required-eligibility-fields';
import { InsuranceEligibility, RequestSession } from '../../../types';

/**
 * canCreateAnApplication
 * Check if the session's eligibility answers has all fields
 * that are required to create an application.
 * If so, return true. Otherwise, return false.
 * @param {Express.Request.session} Express request session
 * @returns {boolean}
 */
const canCreateAnApplication = (session: RequestSession) => {
  console.info('Checking if an application can be created from eligibility session data');

  if (session.submittedData && objectHasKeysAndValues(session.submittedData.insuranceEligibility)) {
    console.info('Eligibility session has some data');

    const { insuranceEligibility } = session.submittedData;

    const eligibilityAnswers = insuranceEligibility as InsuranceEligibility;

    const submittedFields = getSubmittedEligibilityFields(eligibilityAnswers);

    missingEligibilityFields.log(submittedFields);

    if (hasRequiredEligibilityFields(submittedFields)) {
      console.info('Eligibility session has all required data - application can be created from eligibility session data');

      return true;
    }
  }

  console.info('Application cannot be created from eligibility session data');

  return false;
};

export default canCreateAnApplication;
