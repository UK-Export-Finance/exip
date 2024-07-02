import FIELD_IDS from '../../../field-ids/insurance/policy';
import { isMultiplePolicyType } from '../../../../helpers/policy-type';
import BROKER_CONDITIONS from './BROKER_CONDITIONS';
import LOSS_PAYEE_CONDITIONS from './LOSS_PAYEE_CONDITIONS';
import { Application } from '../../../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = FIELD_IDS;

/**
 * DEFAULT_INDEXES
 * Default indexes for the "Policy" XLSX worksheet.
 */
export const DEFAULT_INDEXES = {
  BROKER_ADDRESS: 0,
  LOSS_PAYEE_ADDRESS: 0,
};

/**
 * POLICY_INDEXES
 * Generate row indexes for the XLSX's "Policy" worksheet.
 * @returns {Object}
 */
const POLICY_INDEXES = (application: Application) => {
  const {
    broker,
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy,
  } = application;

  const isMultiplePolicy = isMultiplePolicyType(policy[POLICY_TYPE]);

  let INDEXES = DEFAULT_INDEXES;

  if (broker[USING_BROKER]) {
    INDEXES.BROKER_ADDRESS = 14;

    if (isMultiplePolicy) {
      INDEXES.BROKER_ADDRESS += 1;
    }
  }

  if (nominatedLossPayeeAppointed) {
    INDEXES.LOSS_PAYEE_ADDRESS = 17;

    if (isMultiplePolicy) {
      INDEXES.LOSS_PAYEE_ADDRESS += 1;
    }
  }

  INDEXES = {
    ...INDEXES,
    ...BROKER_CONDITIONS(application, INDEXES),
    ...LOSS_PAYEE_CONDITIONS(application, INDEXES),
  };

  return INDEXES;
};

export default POLICY_INDEXES;
