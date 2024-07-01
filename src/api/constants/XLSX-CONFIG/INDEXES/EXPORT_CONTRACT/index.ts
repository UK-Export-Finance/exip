import { Application } from '../../../../types';

/**
 * DEFAULT_INDEXES
 * Default XLSX indexes for the "Export contract" XLSX worksheet.
 */
export const DEFAULT_INDEXES = {
  AGENT_ADDRESS: 0,
};

/**
 * EXPORT_CONTRACT_INDEXES
 * Generate row indexes for the XLSX's "Export contract" worksheet.
 * - If "using an agent" is true, the worksheet has 5 additional rows.
 * - If "final destination is known" is true, the worksheet has 1 additional row.
 * - If "has attempted private market cover" is true, the worksheet has 1 additional row.
 * @returns {Object}
 */
const EXPORT_CONTRACT_INDEXES = (application: Application) => {
  const {
    exportContract: {
      agent: { isUsingAgent },
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarket },
    },
  } = application;

  const INDEXES = DEFAULT_INDEXES;

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
};

export default EXPORT_CONTRACT_INDEXES;
