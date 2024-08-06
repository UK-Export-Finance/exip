import { EXPORT_CONTRACT_AWARD_METHOD } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { EXPORT_CONTRACT_FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationExportContract } from '../../../../types';

const { OTHER } = EXPORT_CONTRACT_AWARD_METHOD;

const CONTENT_STRINGS = EXPORT_CONTRACT_FIELDS.HOW_WAS_THE_CONTRACT_AWARDED;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = FIELD_IDS;

/**
 * mapHowWasTheContractAwarded
 * Map an application's export contract - AWARD_METHOD answers into an object for XLSX generation
 * @param {ApplicationExportContract} application: Application export contract
 * @returns {Object} xlsxRow
 */
const mapHowWasTheContractAwarded = (exportContract: ApplicationExportContract) => {
  const submittedMethodId = exportContract.awardMethodId;

  let answer;

  if (submittedMethodId === OTHER.DB_ID) {
    answer = exportContract[OTHER_AWARD_METHOD];
  } else {
    const allMethods = Object.values(EXPORT_CONTRACT_AWARD_METHOD);

    const method = allMethods.find((methodObj) => methodObj.DB_ID === submittedMethodId);

    if (method) {
      answer = method.VALUE;
    }
  }

  const title = `${String(CONTENT_STRINGS[AWARD_METHOD].SUMMARY?.TITLE)}?`;

  return xlsxRow(title, answer);
};

export default mapHowWasTheContractAwarded;
