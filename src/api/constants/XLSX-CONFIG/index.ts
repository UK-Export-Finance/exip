import { TOTAL_CONTRACT_VALUE } from '../total-contract-value';
import { INDEXES, incrementIndexes } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { isMultiplePolicyType } from '../../helpers/policy-type';
import { Application, XLSXRowIndexes } from '../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for XLSX.
 * Depending on the submitted application data, the rows can be different.
 * - If the policy type is multiple, the XLSX has 1 additional row.
 * - If "using a broker" is true, the XLSX has 3 additional rows.
 * - If "exporter business section - has different trading address" is true, the XLSX has 1 additional row.
 * - If "exporter business section - has different trading name" is true, the XLSX has 1 additional row.
 * - If "exporter business section - has different trading name/address" the ALTERNATIVE_TRADING_ADDRESS row needs to change.
 * - If "buyer section - traded with buyer before" is true, the XLSX has 2 additional rows.
 * - If "buyer section - traded with buyer before" is true and "buyer has outstanding payments" is true, the XLSX has 2 additional rows.
 * - If "buyer section - has previous credit insurance cover with buyer" is true, the XLSX has 1 additional row.
 * - If "eligibility - total contract value over threshold" is true, the XLSX has 2 additional rows.
 * - If "policy - using a nominated loss payee" is true, the XLSX has 5 additional rows.
 * @returns {XLSXRowIndexes}
 */
export const XLSX_ROW_INDEXES = (application: Application): XLSXRowIndexes => {
  const {
    broker,
    buyer: {
      buyerTradingHistory: { exporterHasTradedWithBuyer, outstandingPayments: buyerHasOutstandingPayments },
      relationship: { exporterHasPreviousCreditInsuranceWithBuyer },
    },
    company: {
      differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
      hasDifferentTradingName,
    },
    eligibility: { totalContractValue },
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy: {
      jointlyInsuredParty: { requested: requestedJointlyInsuredParty },
    },
    policyContact: { isSameAsOwner: policyContactIsSameAsOwner },
  } = application;

  const policyType = application.policy[POLICY_TYPE];

  let indexes = INDEXES();

  /**
   * Increment some specific indexes,
   * depending on answers in the "Business" section of an application.
   */
  if (hasDifferentTradingAddress) {
    indexes.ALTERNATIVE_TRADING_ADDRESS = 37;

    indexes = incrementIndexes(indexes);
  }

  if (hasDifferentTradingName) {
    indexes = incrementIndexes(indexes);
  }

  if (hasDifferentTradingName && hasDifferentTradingAddress) {
    indexes.ALTERNATIVE_TRADING_ADDRESS = 38;
  }

  /**
   * Increment some specific indexes,
   * depending on answers in the "Policy" section of an application.
   */
  if (isMultiplePolicyType(policyType)) {
    indexes.TITLES.BUYER += 1;
    indexes.TITLES.DECLARATIONS += 1;

    indexes.BROKER_ADDRESS += 1;
    indexes.BUYER_ADDRESS += 1;
    indexes.BUYER_CONTACT_DETAILS += 1;
    indexes.LOSS_PAYEE_ADDRESS += 1;
  }

  if (broker[USING_BROKER]) {
    indexes.TITLES.BUYER += 3;
    indexes.TITLES.DECLARATIONS += 3;

    indexes.BUYER_ADDRESS += 3;
    indexes.LOSS_PAYEE_ADDRESS += 3;
  }

  // TODO: update documentation.
  // if different name on policy, 2 extra fields.
  if (policyContactIsSameAsOwner === false) {
    indexes.TITLES.BUYER += 2;
    indexes.TITLES.DECLARATIONS += 2;

    indexes.LOSS_PAYEE_ADDRESS += 2;
    indexes.BROKER_ADDRESS += 2;
    indexes.BUYER_ADDRESS += 2;
  }

  // TODO: update documentation - 3 extra fields.
  if (requestedJointlyInsuredParty) {
    indexes.BROKER_ADDRESS += 3;
    indexes.BUYER_ADDRESS += 3;
    indexes.LOSS_PAYEE_ADDRESS += 3;

    indexes.TITLES.BUYER += 3;
    indexes.TITLES.DECLARATIONS += 3;
  }

  if (nominatedLossPayeeAppointed) {
    indexes.TITLES.BUYER += 5;
    indexes.TITLES.DECLARATIONS += 5;

    indexes.BUYER_ADDRESS += 5;
  }

  /**
   * Increment some specific indexes,
   * depending on answers in the "Buyer" section of an application.
   */
  if (exporterHasTradedWithBuyer) {
    indexes.TITLES.DECLARATIONS += 2;

    if (buyerHasOutstandingPayments) {
      indexes.TITLES.DECLARATIONS += 2;
    }
  }

  if (exporterHasPreviousCreditInsuranceWithBuyer) {
    indexes.TITLES.DECLARATIONS += 1; // TODO: update documentation.
  }

  /**
   * Increment some specific indexes,
   * depending on generic answers in the application.
   */
  // TODO: EMS-3467: move to getPopulatedApplication.
  const totalContractValueOverThreshold = totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;

  if (totalContractValueOverThreshold) {
    indexes.TITLES.DECLARATIONS += 1; // TODO: update documentation.
  }

  return indexes;
};

/**
 * XLSX_CONFIG
 * Generate XLSX config.
 * @returns {Object}
 */
export const XLSX_CONFIG = {
  KEY: {
    ID: 'field',
    COPY: 'Field',
  },
  VALUE: {
    ID: 'answer',
    COPY: 'Answer',
  },
  COLUMN_WIDTH: 85,
  ADDITIONAL_TITLE_COLUMN_HEIGHT: 25,
  ADDITIONAL_COLUMN_HEIGHT: 50,
  LARGE_ADDITIONAL_COLUMN_HEIGHT: 50 * 2,
  FONT_SIZE: {
    DEFAULT: 11,
    TITLE: 14,
  },
};

export default XLSX_CONFIG;
