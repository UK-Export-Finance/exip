import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { Application } from '../../../../types';

const { FIELDS } = XLSX;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

/**
 * mapPrivateMarket
 * Map an application's "export contract - private market" fields into an array of objects for XLSX generation
 * @param {Application} application
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapPrivateMarket = (application: Application) => {
  const {
    exportContract: { privateMarket },
    totalContractValueOverThreshold,
  } = application;

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
