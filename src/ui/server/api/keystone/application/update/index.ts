import broker from './broker';
import business from './business';
import buyer from './buyer';
import buyerTradingHistory from './buyerTradingHistory';
import company from './company';
import declarations from '../declarations';
import companyDifferentTradingAddress from './companyDifferentTradingAddress';
import exportContract from './exportContract';
import jointlyInsuredParty from './jointlyInsuredParty';
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
  buyerTradingHistory,
  company,
  declarations: declarations.update,
  companyDifferentTradingAddress,
  exportContract,
  jointlyInsuredParty,
  policy,
  policyContact,
  sectionReview,
};

export default update;
