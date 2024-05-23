import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { isMultiplePolicyType } from '../../helpers/policy-type';
import { Application, XLSXTitleRowIndexes, XLSXRowIndexes } from '../../types';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

/**
 * TITLE_INDEXES
 * All XLSX title indexes.
 * @returns {Object}
 */
export const TITLE_INDEXES = () =>
  ({
    HEADER: 1,
    EXPORTER_CONTACT_DETAILS: 10,
    KEY_INFORMATION: 15,
    ELIGIBILITY: 21,
    EXPORTER_BUSINESS: 31,
    POLICY: 48,
    BUYER: 57,
    DECLARATIONS: 65,
  }) as XLSXTitleRowIndexes;

/**
 * INDEXES
 * All XLSX indexes.
 * @returns {Object}
 */
export const INDEXES = () =>
  ({
    TITLES: TITLE_INDEXES(),
    COMPANY_ADDRESS: 33,
    COMPANY_SIC_CODES: 44,
    BUYER_ADDRESS: 64,
  }) as XLSXRowIndexes;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for XLSX.
 * Depending on the submitted application data, the rows can be different:
 * - If the policy type is multiple - the XLSX's "Policy” section has 1 additional row.
 * - If "using a broker" is true - the XLSX's “About your business“ section has 3 additional rows.
 * @returns {Object}
 */
export const XLSX_ROW_INDEXES = (application: Application): XLSXRowIndexes => {
  const {
    broker,
    company: {
      hasDifferentTradingName,
      differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
    },
    policy,
  } = application;

  const policyType = policy[POLICY_TYPE];

  let isMultiplePolicy = false;

  if (isMultiplePolicyType(policyType)) {
    isMultiplePolicy = true;
  }

  const indexes = INDEXES();

  if (isMultiplePolicy) {
    indexes.TITLES.BUYER += 1;
    indexes.TITLES.DECLARATIONS += 1;
    indexes.BUYER_ADDRESS += 1;
    indexes.BUYER_CONTACT_DETAILS += 1;
  }

  if (broker[USING_BROKER]) {
    indexes.BROKER_ADDRESS = 48;
    indexes.TITLES.POLICY += 3;
    indexes.TITLES.BUYER += 3;
    indexes.TITLES.DECLARATIONS += 3;
  }

  if (hasDifferentTradingName) {
    indexes.COMPANY_SIC_CODES += 1;

    indexes.BROKER_ADDRESS += 1;
    indexes.BUYER_ADDRESS += 1;

    indexes.TITLES.POLICY += 1;
    indexes.TITLES.BUYER += 1;
    indexes.TITLES.DECLARATIONS += 1;
  }

  if (hasDifferentTradingAddress) {
    indexes.ALTERNATIVE_TRADING_ADDRESS = 36;

    indexes.COMPANY_SIC_CODES += 1;

    indexes.BROKER_ADDRESS += 1;
    indexes.BUYER_ADDRESS += 1;

    indexes.TITLES.POLICY += 1;
    indexes.TITLES.BUYER += 1;
    indexes.TITLES.DECLARATIONS += 1;
  }

  if (hasDifferentTradingName && hasDifferentTradingAddress) {
    indexes.ALTERNATIVE_TRADING_ADDRESS = 37;
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
