import FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import mapIntro from './map-intro';
import mapNameOnPolicy from './map-name-on-policy';
import mapSingleContractPolicy from './map-single-contract-policy';
import mapMultipleContractPolicy from './map-multiple-contract-policy';
import mapCreditPeriod from './map-credit-period';
import mapJointlyInsuredParty from './map-jointly-insured-party';
import mapBroker from './map-broker';
import mapLossPayee from './map-loss-payee';
import { Application, Country } from '../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = FIELD_IDS;

/**
 * mapPolicy
 * Map an application's policy fields into an array of objects for XLSX generation
 * @param {Application} application
 * @param {Array<Country>} countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPolicy = (application: Application, countries: Array<Country>) => {
  const { nominatedLossPayee, policy, policyContact } = application;

  const policyType = policy[POLICY_TYPE];

  let mapped = mapIntro(policy);

  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSingleContractPolicy(policy)];
  }

  if (isMultiplePolicyType(policyType)) {
    mapped = [...mapped, ...mapMultipleContractPolicy(policy)];
  }

  mapped = [
    ...mapped,

    ...mapNameOnPolicy(policyContact),

    ...mapCreditPeriod(policy),

    ...mapJointlyInsuredParty(policy.jointlyInsuredParty, countries),

    ...mapBroker(application),
    ...mapLossPayee(nominatedLossPayee),
  ];

  return mapped;
};

export default mapPolicy;
