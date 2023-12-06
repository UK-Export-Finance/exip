import FIELD_IDS from '../field-ids/insurance';
import { isMultiplePolicyType } from '../../helpers/policy-type';
import { Application, XLSXTitleRowIndexes, XLSXRowIndexes } from '../../types';

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  POLICY: {
    BROKER: { USING_BROKER },
  },
} = FIELD_IDS;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for XLSX.
 * Depending on the submitted application data, the rows can be different:
 * - If the policy type is multiple - the XLSX's "Policy” section has 1 additional row.
 * - If "using a broker" is true - the XLSX's “About your business“ section has 3 additional rows.
 * @returns {Object}
 */
export const XLSX_ROW_INDEXES = (application: Application): XLSXRowIndexes => {
  const { policy, broker } = application;

  const TITLES = {
    HEADER: 1,
    EXPORTER_CONTACT_DETAILS: 9,
    KEY_INFORMATION: 14,
    POLICY: 20,
    EXPORTER_BUSINESS: 30,
    BUYER: 49,
    ELIGIBILITY: 59,
  } as XLSXTitleRowIndexes;

  const INDEXES = {
    TITLES,
    COMPANY_ADDRESS: 34,
    COMPANY_SIC_CODES: 37,
    BROKER_ADDRESS: 45,
    BUYER_ADDRESS: 50,
    BUYER_CONTACT_DETAILS: 53,
  } as XLSXRowIndexes;

  const policyType = policy[POLICY_TYPE];

  let isMultiplePolicy = false;
  let isUsingBroker = false;

  if (isMultiplePolicyType(policyType)) {
    isMultiplePolicy = true;
  }

  if (broker[USING_BROKER]) {
    isUsingBroker = true;
  }

  if (isMultiplePolicy) {
    TITLES.EXPORTER_BUSINESS += 1;
    TITLES.BUYER += 1;
    TITLES.ELIGIBILITY += 1;

    INDEXES.COMPANY_ADDRESS += 1;
    INDEXES.COMPANY_SIC_CODES += 1;
    INDEXES.BROKER_ADDRESS += 1;
    INDEXES.BUYER_ADDRESS += 1;
    INDEXES.BUYER_CONTACT_DETAILS += 1;
  }

  if (isUsingBroker) {
    TITLES.BUYER += 3;
    TITLES.ELIGIBILITY += 3;
  }

  return INDEXES;
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
