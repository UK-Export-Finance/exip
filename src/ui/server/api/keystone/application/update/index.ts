import broker from './broker';
import business from './business';
import buyer from './buyer';
import buyerTradingHistory from './buyerTradingHistory';
import buyerRelationship from './buyerRelationship';
import company from './company';
import companyDifferentTradingAddress from './companyDifferentTradingAddress';
import declaration from './declaration';
import declarationModernSlavery from './declarationModernSlavery';
import exportContract from './exportContract';
import exportContractAgent from './exportContractAgent';
import exportContractAgentService from './exportContractAgentService';
import exportContractAgentServiceCharge from './exportContractAgentServiceCharge';
import jointlyInsuredParty from './jointlyInsuredParty';
import nominatedLossPayee from './nominatedLossPayee';
import lossPayeeFinancialDetailsUk from './lossPayeeFinancialDetailsUk';
import updateLossPayeeFinancialDetailsInternational from './lossPayeeFinancialDetailsInternational';
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
  declaration,
  declarationModernSlavery,
  companyDifferentTradingAddress,
  exportContract,
  exportContractAgent,
  exportContractAgentService,
  exportContractAgentServiceCharge,
  jointlyInsuredParty,
  lossPayeeFinancialDetailsUk,
  updateLossPayeeFinancialDetailsInternational,
  nominatedLossPayee,
  policy,
  policyContact,
  privateMarket,
  sectionReview,
};

export default update;
