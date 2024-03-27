import broker from './broker';
import business from './business';
import buyer from './buyer';
import buyerTradingHistory from './buyerTradingHistory';
import buyerRelationship from './buyerRelationship';
import company from './company';
import declarations from '../declarations';
import companyDifferentTradingAddress from './companyDifferentTradingAddress';
import exportContract from './exportContract';
import jointlyInsuredParty from './jointlyInsuredParty';
import nominatedLossPayee from './nominatedLossPayee';
import lossPayeeFinancialDetailsUk from './lossPayeeFinancialDetailsUk';
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
  buyerRelationship,
  buyerTradingHistory,
  company,
  declarations: declarations.update,
  companyDifferentTradingAddress,
  exportContract,
  jointlyInsuredParty,
  lossPayeeFinancialDetailsUk,
  nominatedLossPayee,
  policy,
  policyContact,
  sectionReview,
};

export default update;
