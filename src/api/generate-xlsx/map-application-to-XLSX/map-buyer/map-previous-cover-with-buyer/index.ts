import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationBuyerRelationship } from '../../../../types';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapPreviousCoverWithBuyer
 * Generate an XLSX row if an exporter has "previous cover" with the buyer.
 * @param {ApplicationBuyerRelationship} relationship: Application buyer relationship
 * @returns {Object | undefined} xlsxRow
 */
const mapPreviousCoverWithBuyer = (relationship: ApplicationBuyerRelationship) => {
  if (relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]) {
    return xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]);
  }
};

export default mapPreviousCoverWithBuyer;
