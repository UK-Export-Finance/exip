import FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../content-strings';
import { POLICY_FIELDS } from '../../../content-strings/fields/insurance';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import xlsxRow from '../helpers/xlsx-row';
import mapIntro from './map-intro';
import mapSingleContractPolicy from './map-single-contract-policy';
import mapMultipleContractPolicy from './map-multiple-contract-policy';
import mapBroker from './map-broker';
import mapLossPayee from './map-loss-payee';
import mapYesNoField from '../helpers/map-yes-no-field';
import { Application } from '../../../types';

const { FIELDS } = XLSX;

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
  ...POLICY_FIELDS.EXPORT_VALUE.MULTIPLE,
  ...POLICY_FIELDS.LOSS_PAYEE_DETAILS,
  ...POLICY_FIELDS.NAME_ON_POLICY,
};

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  NAME_ON_POLICY: {
    NAME,
    // IS_SAME_AS_OWNER,
    // SAME_NAME,
    // OTHER_NAME,
    POSITION,
    // POLICY_CONTACT_EMAIL,
  },
  NEED_PRE_CREDIT_PERIOD,
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
  USING_BROKER,
} = FIELD_IDS;

/**
 * mapPolicy
 * Map an application's policy fields into an array of objects for XLSX generation
 * @param {Application} application
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPolicy = (application: Application) => {
  const { broker, nominatedLossPayee, policy, policyContact } = application;

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

    xlsxRow(String(CONTENT_STRINGS.NAME_ON_POLICY[NAME].SUMMARY?.TITLE), policyContact[NAME]),
    xlsxRow(String(CONTENT_STRINGS.NAME_ON_POLICY[POSITION].SUMMARY?.TITLE), policyContact[POSITION]),

    xlsxRow(String(FIELDS[NEED_PRE_CREDIT_PERIOD]), mapYesNoField({ answer: policy[NEED_PRE_CREDIT_PERIOD] })),
    xlsxRow(String(FIELDS[REQUESTED]), mapYesNoField({ answer: policy.jointlyInsuredParty[REQUESTED] })),
    xlsxRow(String(FIELDS[USING_BROKER]), mapYesNoField({ answer: broker[USING_BROKER] })),

    ...mapBroker(application),
    ...mapLossPayee(nominatedLossPayee),
  ];

  return mapped;
};

export default mapPolicy;
