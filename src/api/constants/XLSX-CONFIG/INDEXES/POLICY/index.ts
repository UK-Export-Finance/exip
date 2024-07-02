import BROKER_CONDITIONS from './BROKER_CONDITIONS';
import LOSS_PAYEE_CONDITIONS from './LOSS_PAYEE_CONDITIONS';
import { Application } from '../../../../types';

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
 * @returns {Object}
 */
const POLICY_INDEXES = (application: Application) => {
  const {
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
  } = application;

  // const isMultiplePolicy = isMultiplePolicyType(application.policy[POLICY_TYPE]);

  let INDEXES = DEFAULT_INDEXES;

  if (nominatedLossPayeeAppointed) {
    INDEXES.LOSS_PAYEE_ADDRESS = 17;
  }

  INDEXES = {
    ...INDEXES,
    ...BROKER_CONDITIONS(application, INDEXES),
    ...LOSS_PAYEE_CONDITIONS(application, INDEXES),
  };

  return INDEXES;
};

export default POLICY_INDEXES;
