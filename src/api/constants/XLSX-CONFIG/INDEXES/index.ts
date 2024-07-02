import SECTION_NAMES from '../SECTION_NAMES';
import EXPORTER_BUSINESS_INDEXES from './EXPORTER_BUSINESS';
import POLICY_INDEXES from './POLICY';
import BUYER_INDEXES from './BUYER';
import EXPORT_CONTRACT_INDEXES from './EXPORT_CONTRACT';
import { Application } from '../../../types';

const { EXPORTER_BUSINESS, POLICY, BUYER, EXPORT_CONTRACT } = SECTION_NAMES;

/**
 * XLSX_ROW_INDEXES
 * Generate row indexes for each worksheet in the XLSX.
 * @returns {Object}
 */
const XLSX_ROW_INDEXES = {
  [EXPORTER_BUSINESS]: (application: Application) => EXPORTER_BUSINESS_INDEXES(application),
  [POLICY]: (application: Application) => POLICY_INDEXES(application),
  [BUYER]: () => BUYER_INDEXES(),
  [EXPORT_CONTRACT]: (application: Application) => EXPORT_CONTRACT_INDEXES(application),
};

export default XLSX_ROW_INDEXES;
