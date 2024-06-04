import mapDeclarations from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { DECLARATIONS_FIELDS as CONTENT_STRINGS } from '../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapAgreedField from '../helpers/map-agreed-field';
import { mockApplication } from '../../../test-mocks';

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

describe('api/generate-xlsx/map-application-to-xlsx/map-declarations', () => {
  it('should return an array of mapped declaratin fields', () => {
    const result = mapDeclarations(mockApplication);

    const { declaration } = mockApplication;

    const expected = [
      xlsxRow(XLSX.SECTION_TITLES.DECLARATIONS, ''),
      xlsxRow(CONTENT_STRINGS[AGREE_CONFIDENTIALITY].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_CONFIDENTIALITY])),
      xlsxRow(CONTENT_STRINGS[AGREE_ANTI_BRIBERY].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_ANTI_BRIBERY])),
      xlsxRow(CONTENT_STRINGS[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT].SUMMARY.TITLE, mapYesNoField({ answer: declaration[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT] })),
      xlsxRow(CONTENT_STRINGS[WILL_EXPORT_WITH_CODE_OF_CONDUCT].SUMMARY.TITLE, mapYesNoField({ answer: declaration[WILL_EXPORT_WITH_CODE_OF_CONDUCT] })),
      xlsxRow(CONTENT_STRINGS[AGREE_HOW_YOUR_DATA_WILL_BE_USED].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_HOW_YOUR_DATA_WILL_BE_USED])),
      xlsxRow(CONTENT_STRINGS[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS].SUMMARY.TITLE, mapAgreedField(declaration[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS])),
    ];

    expect(result).toEqual(expected);
  });
});
