import FIELD_IDS from '../field-ids/insurance';
import { isMultiPolicyType } from '../../helpers/policy-type';
import { ANSWERS } from '../answers';
import { Application } from '../../types';

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  EXPORTER_BUSINESS: {
    BROKER: { USING_BROKER },
  },
} = FIELD_IDS;

/**
 * TITLE_ROW_INDEXES
 * Generate title row indexes for XLSX.
 * Depending on the submitted application data, the rows can be different:
 * - If the policy type is multiple - the XLSX's Ppolicy and exports” section has 1 additional row.
 * - If "using a broker" is true - the XLSX's “About your business“ section has 3 additional rows.
 * @returns {Object}
 */
export const TITLE_ROW_INDEXES = (application?: Application): object => {
  if (!application) {
    return {};
  }

  const { policyAndExport, broker } = application;
  const policyType = policyAndExport[POLICY_TYPE];

  let isMultiplePolicy = false;
  let isUsingBroker = false;

  if (isMultiPolicyType(policyType)) {
    isMultiplePolicy = true;
  }

  if (broker[USING_BROKER] === ANSWERS.YES) {
    isUsingBroker = true;
  }

  let EXPORTER_BUSINESS = 25;
  let BUYER = 44;
  let ELIGIBILITY = 54;

  if (isMultiplePolicy) {
    EXPORTER_BUSINESS += 1;
    BUYER += 1;
    ELIGIBILITY += 1;
  }

  if (isUsingBroker) {
    BUYER += 3;
    ELIGIBILITY += 3;
  }

  return {
    HEADER: 1,
    KEY_INFORMATION: 9,
    POLICY_AND_EXPORT: 15,
    EXPORTER_BUSINESS,
    BUYER,
    ELIGIBILITY,
  };
};

/**
 * XLSX_CONFIG
 * Generate XLSX config.
 * @returns {Object}
 */
export const XLSX_CONFIG = (application?: Application) => ({
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
  ROW_INDEXES: {
    COMPANY_ADDRESS: 30,
    COMPANY_SIC_CODES: 33,
    BROKER_ADDRESS: 45,
    BUYER_ADDRESS: 50,
    BUYER_CONTACT_DETAILS: 53,
  },
  TITLE_ROW_INDEXES: TITLE_ROW_INDEXES(application),
});

export default XLSX_CONFIG;
