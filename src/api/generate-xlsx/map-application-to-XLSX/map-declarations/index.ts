import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { DECLARATIONS_FIELDS as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapAgreedField from '../helpers/map-agreed-field';
import { Application } from '../../../types';

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  DECLARATIONS: {
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
    WILL_EXPORT_WITH_CODE_OF_CONDUCT,
    AGREE_HOW_YOUR_DATA_WILL_BE_USED,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapDeclarations
 * Map an application's decalarations fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapDeclarations = (application: Application) => {
  const { declaration } = application;

  const mapped = [
    xlsxRow(SECTION_TITLES.DECLARATIONS, ''),
    xlsxRow(CONTENT_STRINGS[AGREE_CONFIDENTIALITY].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_CONFIDENTIALITY])),
    xlsxRow(CONTENT_STRINGS[AGREE_ANTI_BRIBERY].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_ANTI_BRIBERY])),
    xlsxRow(String(FIELDS[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]), mapYesNoField(declaration[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT])),
    xlsxRow(String(FIELDS[WILL_EXPORT_WITH_CODE_OF_CONDUCT]), mapYesNoField(declaration[WILL_EXPORT_WITH_CODE_OF_CONDUCT])),
    xlsxRow(String(FIELDS[AGREE_HOW_YOUR_DATA_WILL_BE_USED]), mapAgreedField(declaration[AGREE_HOW_YOUR_DATA_WILL_BE_USED])),
    xlsxRow(CONTENT_STRINGS[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS])),
  ];

  return mapped;
};

export default mapDeclarations;
