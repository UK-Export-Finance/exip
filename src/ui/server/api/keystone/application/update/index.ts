import broker from './broker';
import business from './business';
import buyer from './buyer';
import buyerTradingHistory from './buyerTradingHistory';
import buyerRelationship from './buyerRelationship';
import company from './company';
import declarations from '../declarations';
import companyDifferentTradingAddress from './companyDifferentTradingAddress';
import exportContract from './exportContract';
import exportContractAgent from './exportContractAgent';
import exportContractAgentService from './exportContractAgentService';
import jointlyInsuredParty from './jointlyInsuredParty';
import nominatedLossPayee from './nominatedLossPayee';
import policy from './policy';
import policyContact from './policyContact';
import privateMarket from './privateMarket';
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
  buyerRelationship,
  buyerTradingHistory,
  company,
  declarations: declarations.update,
  companyDifferentTradingAddress,
  exportContract,
  exportContractAgent,
  exportContractAgentService,
  jointlyInsuredParty,
  nominatedLossPayee,
  policy,
  policyContact,
  privateMarket,
  sectionReview,
};

export default update;
