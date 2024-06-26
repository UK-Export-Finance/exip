import broker from './broker';
import business from './business';
import buyer from './buyer';
import company from './company';
import declarations from '../declarations';
import exportContract from './exportContract';
import policy from './policy';
import policyContact from './policyContact';
import sectionReview from './sectionReview';

/**
 * update
 * Various API update calls for an application
 * @returns {Object} API calls
 */
const update = {
  broker,
  business,
  buyer,
  company,
  declarations: declarations.update,
  exportContract,
  policy,
  policyContact,
  sectionReview,
};

export default update;
