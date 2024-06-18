import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { ApplicationPrivateMarket, TotalContractValue } from '../../../../types';

const { FIELDS } = XLSX;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

/**
 * mapPrivateMarket
 * Map an application's "export contract - private market" fields into an array of objects for XLSX generation
 * @param {Application} application: Application
 * @param {TotalContractValue} totalContractValue: Total contract value
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPrivateMarket = (privateMarket: ApplicationPrivateMarket, totalContractValue: TotalContractValue) => {
  // TODO: EMS-3467: move to getPopulatedApplication.
  const totalContractValueOverThreshold = totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;

  if (totalContractValueOverThreshold) {
    const attempedPrivateMarketAnswer = privateMarket[ATTEMPTED];

    const mapped = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[ATTEMPTED]), mapYesNoField({ answer: attempedPrivateMarketAnswer }))];

    if (attempedPrivateMarketAnswer) {
      mapped.push(xlsxRow(String(FIELDS.EXPORT_CONTRACT[DECLINED_DESCRIPTION]), privateMarket[DECLINED_DESCRIPTION]));
    }

    return mapped;
  }

  return [];
};

export default mapPrivateMarket;
