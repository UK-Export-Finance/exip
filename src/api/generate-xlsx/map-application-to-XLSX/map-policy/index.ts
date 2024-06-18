import FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../content-strings';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import xlsxRow from '../helpers/xlsx-row';
import mapIntro from './map-intro';
import mapNameOnPolicy from './map-name-on-policy';
import mapSingleContractPolicy from './map-single-contract-policy';
import mapMultipleContractPolicy from './map-multiple-contract-policy';
import mapJointlyInsuredParty from './map-jointly-insured-party';
import mapBroker from './map-broker';
import mapLossPayee from './map-loss-payee';
import mapYesNoField from '../helpers/map-yes-no-field';
import { Application, Country } from '../../../types';

const { FIELDS } = XLSX;

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  NEED_PRE_CREDIT_PERIOD,
} = FIELD_IDS;

/**
 * mapPolicy
 * Map an application's policy fields into an array of objects for XLSX generation
 * @param {Application} application
 * @param {Array} countries
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

    xlsxRow(String(FIELDS[NEED_PRE_CREDIT_PERIOD]), mapYesNoField({ answer: policy[NEED_PRE_CREDIT_PERIOD] })),

    ...mapJointlyInsuredParty(policy.jointlyInsuredParty, countries),

    ...mapBroker(application),
    ...mapLossPayee(nominatedLossPayee),
  ];

  return mapped;
};

export default mapPolicy;
