import SECTION_NAMES from '../SECTION_NAMES';
import { POLICY as POLICY_FIELD_IDS } from '../../field-ids/insurance/policy';
import { Application } from '../../../types';

const { EXPORTER_BUSINESS, POLICY, BUYER, EXPORT_CONTRACT } = SECTION_NAMES;

const {
  // TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for XLSX.
 * Depending on the submitted application data, different rows are mapped and rendered.
 * - If "eligibility - total contract value over threshold" is true, the XLSX has 2 additional rows.
 * - If "exporter business section - has different trading address" is true, the XLSX has 1 additional row.
 * - If "exporter business section - has different trading name" is true, the XLSX has 1 additional row.
 * - If "exporter business section - has different trading name/address" the ALTERNATIVE_TRADING_ADDRESS row needs to change.
 * - If the policy type is multiple, the XLSX has 1 additional row.
 * - If "policy - using a broker" is true, the XLSX has 3 additional rows.
 * - If "policy - different name on policy / policy contact is NOT the same as the owner", is true, the XLSX has 2 additional rows.
 * - If "policy - requested a jointly insured party" is true, the XLSX has 3 additional rows.
 * - If "policy - using a nominated loss payee" is true, the XLSX has 5 additional rows.
 * - If "buyer section - traded with buyer before" is true, the XLSX has 2 additional rows.
 * - If "buyer section - traded with buyer before" is true and "buyer has outstanding payments" is true, the XLSX has 2 additional rows.
 * - If "total contract value over threshold", the buyer section has 2 additional rows.
 * - If "total contract value over threshold" and has previous credit insurance with buyer, the buyer section has 2 additional rows.
 * - If "buyer section - has previous credit insurance cover with buyer" is true, the XLSX has 1 additional row.
 * - If "export contract section - final destination is known" is true, the XLSX has 1 additional row.
 * - If "export contract section - has attempted private market cover" is true, the XLSX has 1 additional row.
 * - If "export contract section - using an agent" is true, the XLSX has 5 additional rows.
 * - If "export contract section - using an agent - agent is charging" is true, the XLSX has 1 additional row.
 * @returns {Object}
 */
export const XLSX_ROW_INDEXES = {
  [EXPORTER_BUSINESS]: (application: Application) => {
    const {
      company: {
        differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
        hasDifferentTradingName,
      },
    } = application;

    const INDEXES = {
      REGISTERED_OFFICE_ADDRESS: 3,
      COMPANY_SIC_CODES: 4,
      ALTERNATIVE_TRADING_ADDRESS: 0,
    };

    if (hasDifferentTradingAddress) {
      INDEXES.ALTERNATIVE_TRADING_ADDRESS = 7;
    }

    if (hasDifferentTradingName && hasDifferentTradingAddress) {
      INDEXES.ALTERNATIVE_TRADING_ADDRESS += 1;
    }

    return INDEXES;
  },
  [POLICY]: (application: Application) => {
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

    const INDEXES = {
      BROKER_ADDRESS: 0,
      LOSS_PAYEE_ADDRESS: 0,
    };

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
  },
  [BUYER]: () => {
    const INDEXES = {
      BUYER_ADDRESS: 3,
    };

    return INDEXES;
  },
  [EXPORT_CONTRACT]: (application: Application) => {
    const {
      exportContract: {
        agent: { isUsingAgent },
        finalDestinationKnown,
        privateMarket: { attempted: attemptedPrivateMarket },
      },
    } = application;

    const INDEXES = {
      AGENT_ADDRESS: 0,
    };

    if (isUsingAgent) {
      INDEXES.AGENT_ADDRESS = 9;

      if (finalDestinationKnown) {
        INDEXES.AGENT_ADDRESS += 1;
      }

      if (attemptedPrivateMarket) {
        INDEXES.AGENT_ADDRESS += 1;
      }
    }

    return INDEXES;
  },
};

export default XLSX_ROW_INDEXES;
