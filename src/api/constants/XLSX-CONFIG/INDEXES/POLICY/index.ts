import { POLICY as POLICY_FIELD_IDS } from '../../../field-ids/insurance/policy';
import { Application } from '../../../../types';

const {
  // TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

/**
 * DEFAULT_INDEXES
 * Default indexes for the "Policy" XLSX worksheet.
 */
export const DEFAULT_INDEXES = {
  BROKER_ADDRESS: 0,
  LOSS_PAYEE_ADDRESS: 0,
};

// * - If the policy type is multiple, the XLSX has 1 additional row.

/**
 * POLICY_INDEXES
 * Generate row indexes for the XLSX's "Policy" worksheet.
 * Depending on the submitted "Policy" data, new rows are rendered in the worksheet.
 * - If "using a broker" is true, the worksheet has 3 additional rows.
 * - If "different name on policy / policy contact is NOT the same as the owner", is true, the worksheet has 2 additional rows.
 * - If "need pre-credit period cover" is true, the worksheet has 1 additional row.
 * - If "requested a jointly insured party" is true, the worksheet has 3 additional rows.
 * - If "using a nominated loss payee" is true, the worksheet has 5 additional rows.
 * @returns {Object}
 */
const POLICY_INDEXES = (application: Application) => {
  const {
    broker,
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy: {
      jointlyInsuredParty: { requested: requestedJointlyInsuredParty },
      needPreCreditPeriodCover,
    },
    policyContact: { isSameAsOwner: policyContactIsSameAsOwner },
  } = application;

  // const isMultiplePolicy = isMultiplePolicyType(application.policy[POLICY_TYPE]);
  const INDEXES = DEFAULT_INDEXES;

  if (nominatedLossPayeeAppointed) {
    INDEXES.LOSS_PAYEE_ADDRESS = 17;
  }

  if (broker[USING_BROKER]) {
    INDEXES.BROKER_ADDRESS = 14;

    if (policyContactIsSameAsOwner === false) {
      INDEXES.BROKER_ADDRESS += 2;
    }

    if (needPreCreditPeriodCover) {
      INDEXES.BROKER_ADDRESS += 1;
    }

    if (requestedJointlyInsuredParty) {
      INDEXES.BROKER_ADDRESS += 3;
    }
  }

  if (nominatedLossPayeeAppointed) {
    if (policyContactIsSameAsOwner === false) {
      INDEXES.LOSS_PAYEE_ADDRESS += 2;
    }

    if (needPreCreditPeriodCover) {
      INDEXES.LOSS_PAYEE_ADDRESS += 1;
    }

    if (requestedJointlyInsuredParty) {
      INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }

    if (broker[USING_BROKER]) {
      INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }
  }

  return INDEXES;
};

export default POLICY_INDEXES;
