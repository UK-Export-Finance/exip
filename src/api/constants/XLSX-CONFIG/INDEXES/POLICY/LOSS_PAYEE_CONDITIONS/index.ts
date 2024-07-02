import { POLICY as POLICY_FIELD_IDS } from '../../../../field-ids/insurance/policy';
import { Application } from '../../../../../types';

const { USING_BROKER } = POLICY_FIELD_IDS;

/**
 * LOSS_PAYEE_CONDITIONS
 * Generate row indexes for the XLSX's "Policy" worksheet's "loss payee" conditions.
 * Depending on the submitted "Policy" data, new rows are rendered in the worksheet.
 * - If "different name on policy / policy contact is NOT the same as the owner", is true, the worksheet has 2 additional rows.
 * - If "need pre-credit period cover" is true, the worksheet has 1 additional row.
 * - If "requested a jointly insured party" is true, the worksheet has 3 additional rows.
 * - If "using a broker" is true, the worksheet has 3 additional rows.
 * @returns {Object}
 */
const LOSS_PAYEE_CONDITIONS = (application: Application, INDEXES: object) => {
  const {
    broker,
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy: {
      jointlyInsuredParty: { requested: requestedJointlyInsuredParty },
      needPreCreditPeriodCover,
    },
    policyContact: { isSameAsOwner: policyContactIsSameAsOwner },
  } = application;

  const MODIFIED_INDEXES = INDEXES;

  if (nominatedLossPayeeAppointed) {
    if (policyContactIsSameAsOwner === false) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 2;
    }

    if (needPreCreditPeriodCover) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 1;
    }

    if (requestedJointlyInsuredParty) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }

    if (broker[USING_BROKER]) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }
  }

  return INDEXES;
};

export default LOSS_PAYEE_CONDITIONS;
