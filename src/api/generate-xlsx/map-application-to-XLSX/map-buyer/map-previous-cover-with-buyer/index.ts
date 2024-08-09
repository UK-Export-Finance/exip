import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationBuyerRelationship, ApplicationEligibility } from '../../../../types';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapPreviousCoverWithBuyer
 * Generate an XLSX row if an exporter has "previous cover" with the buyer.
 * @param {ApplicationEligibility} eligibility: Application eligibility
 * @param {ApplicationBuyerRelationship} relationship: Application buyer relationship
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPreviousCoverWithBuyer = (eligibility: ApplicationEligibility, relationship: ApplicationBuyerRelationship, migratedV1toV2?: boolean) => {
  // TODO: EMS-3467: move to getPopulatedApplication.
  const totalContractValueOverThreshold = eligibility.totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;

  if (totalContractValueOverThreshold || migratedV1toV2) {
    const answer = relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

    const mapped = [xlsxRow(String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mapYesNoField({ answer }))];

    if (answer === true) {
      mapped.push(xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]));
    }

    return mapped;
  }

  return [];
};

export default mapPreviousCoverWithBuyer;
