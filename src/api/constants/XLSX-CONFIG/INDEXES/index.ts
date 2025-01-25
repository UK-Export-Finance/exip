import SECTION_NAMES from '../SECTION_NAMES';
import EXPORTER_BUSINESS_INDEXES from './EXPORTER_BUSINESS';
import POLICY_INDEXES from './POLICY';
import BUYER_INDEXES from './BUYER';
import EXPORT_CONTRACT_INDEXES from './EXPORT_CONTRACT';
import DECLARATIONS_INDEXES from './DECLARATIONS';
import { Application } from '../../../types';

const { EXPORTER_BUSINESS, POLICY, BUYER, EXPORT_CONTRACT, DECLARATIONS } = SECTION_NAMES;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for each worksheet in the XLSX.
 * If a row requires some additional row height - for example, for a multi-line address field,
 * The row's index should be listed in the relevant section below.
 * No other indexes need to be listed.
 * NOTE: The APPLICATION_INFORMATION section indexes are intentionally excluded from here,
 * because it does NOT require additional heights.
 * - The APPLICATION_INFORMATION indexes are consumed in another area for other, non-height styling purposes.
 * - The APPLICATION_INFORMATION has some unique requirements unlike all other sections.
 * @returns {Object}
 */
const XLSX_ROW_INDEXES = {
  [EXPORTER_BUSINESS]: (application: Application) => EXPORTER_BUSINESS_INDEXES(application),
  [POLICY]: (application: Application) => POLICY_INDEXES(application),
  [BUYER]: () => BUYER_INDEXES(),
  [EXPORT_CONTRACT]: (application: Application) => EXPORT_CONTRACT_INDEXES(application),
  [DECLARATIONS]: (application: Application) => DECLARATIONS_INDEXES(application.declaration.modernSlavery),
};

export default XLSX_ROW_INDEXES;
