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
 * - If "buyer section - is connected with buyer" is true, the XLSX has 1 additional row.
 * - If "buyer section - traded with buyer before" is true, the XLSX has 4 additional rows.
 * - If "buyer section - traded with buyer before" is true and "buyer has outstanding payments" is true, the XLSX has 2 additional rows.
 * - If "buyer section - has previous credit insurance cover with buyer" is true, the XLSX has 1 additional row.
 * @returns {XLSXRowIndexes}
 */
export const XLSX_ROW_INDEXES = (application: Application): XLSXRowIndexes => {
  const {
    broker,
    buyer: {
      buyerTradingHistory: { exporterHasTradedWithBuyer, outstandingPayments: buyerHasOutstandingPayments },
      relationship: { exporterIsConnectedWithBuyer, exporterHasPreviousCreditInsuranceWithBuyer },
    },
    company: {
      differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
      hasDifferentTradingName,
    },
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
  } = application;

  const policyType = application.policy[POLICY_TYPE];

  let indexes = INDEXES();

  if (isMultiplePolicyType(policyType)) {
    indexes.TITLES.BUYER += 1;
    indexes.TITLES.DECLARATIONS += 1;

    indexes.BUYER_ADDRESS += 1;
    indexes.BUYER_CONTACT_DETAILS += 1;
  }

  if (broker[USING_BROKER]) {
    indexes.TITLES.POLICY += 3;
    indexes.TITLES.BUYER += 3;
    indexes.TITLES.DECLARATIONS += 3;

    indexes.BROKER_ADDRESS = 48;
    indexes.BUYER_ADDRESS += 3;
  }

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

  if (exporterIsConnectedWithBuyer) {
    indexes.TITLES.DECLARATIONS += 1;
  }

  if (exporterHasTradedWithBuyer) {
    indexes.TITLES.DECLARATIONS += 2;

    if (buyerHasOutstandingPayments) {
      indexes.TITLES.DECLARATIONS += 2;
    }
  }

  if (exporterHasPreviousCreditInsuranceWithBuyer) {
    indexes.TITLES.DECLARATIONS += 1;
  }

  if (nominatedLossPayeeAppointed) {
    indexes.TITLES.BUYER += 2;
    indexes.TITLES.DECLARATIONS += 2;

    indexes.BUYER_ADDRESS += 2;
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
