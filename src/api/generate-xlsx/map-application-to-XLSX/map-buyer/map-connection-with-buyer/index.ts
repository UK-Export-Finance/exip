import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationBuyerRelationship } from '../../../../types';

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapPreviousCoverWithBuyer
 * Generate an XLSX row if an exporter has a connection with the buyer.
 * @param {ApplicationBuyerRelationship} relationship: Application buyer relationship
 * @returns {Object | undefined} xlsxRow
 */
const mapConnectionWithBuyer = (relationship: ApplicationBuyerRelationship) => {
  if (relationship[CONNECTION_WITH_BUYER]) {
    return xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION]), relationship[CONNECTION_WITH_BUYER_DESCRIPTION]);
  }
};

export default mapConnectionWithBuyer;
