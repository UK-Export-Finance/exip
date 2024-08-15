import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { Application } from '../../../../types';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapPreviousCoverWithBuyer
 * Generate an XLSX row if an exporter has "previous cover" with the buyer.
 * @param {Application} application
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPreviousCoverWithBuyer = (application: Application) => {
  const {
    buyer: { relationship: buyerRelationship },
    totalContractValueOverThreshold,
  } = application;

  if (totalContractValueOverThreshold) {
    const answer = buyerRelationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

    const mapped = [xlsxRow(String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mapYesNoField({ answer }))];

    if (answer === true) {
      mapped.push(xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), buyerRelationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]));
    }

    return mapped;
  }

  return [];
};

export default mapPreviousCoverWithBuyer;
