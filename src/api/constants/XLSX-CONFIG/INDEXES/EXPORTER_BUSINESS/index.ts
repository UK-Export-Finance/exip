import { Application } from '../../../../types';

/**
 * DEFAULT_INDEXES
 * Default indexes for the "Exporter business" XLSX worksheet.
 */
export const DEFAULT_INDEXES = {
  REGISTERED_OFFICE_ADDRESS: 3,
  COMPANY_SIC_CODES: 4,
  ALTERNATIVE_TRADING_ADDRESS: 0,
};

/**
 * EXPORTER_BUSINESS_INDEXES
 * Generate row indexes for the XLSX's "Exporter business" worksheet.
 * Depending on the submitted "Exporter business" data, new rows are rendered in the worksheet.
 * - If "has different trading address" is true, the worksheet has 1 additional row.
 * - If "has different trading name" is true, the worksheet has 1 additional row.
 * @returns {Object}
 */
const EXPORTER_BUSINESS_INDEXES = (application: Application) => {
  const {
    company: {
      differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
      hasDifferentTradingName,
    },
  } = application;

  const INDEXES = DEFAULT_INDEXES;

  if (hasDifferentTradingAddress) {
    INDEXES.ALTERNATIVE_TRADING_ADDRESS = 7;
  }

  if (hasDifferentTradingName && hasDifferentTradingAddress) {
    INDEXES.ALTERNATIVE_TRADING_ADDRESS += 1;
  }

  return INDEXES;
};

export default EXPORTER_BUSINESS_INDEXES;
