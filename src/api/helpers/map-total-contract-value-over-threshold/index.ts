import { ApplicationEligibility } from '../../types';
import { TOTAL_CONTRACT_VALUE } from '../../constants';

/**
 * mapTotalContractValueOverThreshold
 * return a flag for if eligibility totalContractValue is above or below threshold
 * if below, set application totalContractValueOverThreshold to false
 * if above, set application totalContractValueOverThreshold to true
 * @param {ApplicationEligibility} eligibility
 * @returns {Boolean} modified application
 */
const mapTotalContractValueOverThreshold = (eligibility: ApplicationEligibility) =>
  eligibility.totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;

export default mapTotalContractValueOverThreshold;
