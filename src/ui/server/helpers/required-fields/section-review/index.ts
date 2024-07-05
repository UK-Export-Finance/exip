import FIELD_IDS from '../../../constants/field-ids/insurance/check-your-answers';
import { ApplicationFlat } from '../../../../types';

const { ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT } = FIELD_IDS;

/**
 * requiredFields
 * Required fields for the insurance - check your answers section.
 * If an application has been migrated from V1 to V2, ELIGIBILITY is NOT required.
 * Otherwise, ELIGIBILITY is required.
 * This is because:
 * - In V1, there is no ability to check the ELIGIBILITY answers.
 * - In V2, there is the ability to check the ELIGIBILITY answers.
 * @returns {Array<string>} Required field IDs
 */
const requiredFields = (application: ApplicationFlat) => {
  if (application.migratedV1toV2) {
    return [EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];
  }

  return [ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];
};

export default requiredFields;
