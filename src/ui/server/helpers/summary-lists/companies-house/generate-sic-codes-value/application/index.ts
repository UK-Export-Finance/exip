import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { SicCode } from '../../../../../../types';

const {
  COMPANIES_HOUSE: { INDUSTRY_SECTOR_NAME, SIC_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * mapApplicationSicCodeValues
 * Map company SIC codes in an application.
 * This is used to render in an application's summary list.
 * @param {Array<SicCode>} sicCodes: SIC codes
 * @returns {String} Mapped SIC codes
 */
const mapApplicationSicCodeValues = (sicCodes: Array<SicCode>) => {
  const arr = [] as Array<string>;

  sicCodes.forEach((sicCode) => {
    const code = sicCode[SIC_CODE];

    if (code && sicCode[INDUSTRY_SECTOR_NAME]) {
      arr.push(`${code} - ${sicCode[INDUSTRY_SECTOR_NAME]} </br>`);
    } else if (code) {
      arr.push(`${code} </br>`);
    }
  });

  return arr.join('');
};

export default mapApplicationSicCodeValues;
