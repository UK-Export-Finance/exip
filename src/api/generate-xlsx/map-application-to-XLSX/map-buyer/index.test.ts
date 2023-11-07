import mapBuyer from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import NEW_LINE from '../helpers/xlsx-new-line';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import { mockApplication } from '../../../test-mocks';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS.WORKING_WITH_BUYER,
};

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapBuyer(mockApplication);

    const { buyer } = mockApplication;

    const expected = [
      xlsxRow(XLSX.SECTION_TITLES.BUYER, ''),
      xlsxRow(XLSX.FIELDS[NAME], buyer[NAME]),
      xlsxRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${NEW_LINE}${buyer[COUNTRY].name}`),
      xlsxRow(XLSX.FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
      xlsxRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
      xlsxRow(XLSX.FIELDS[FIRST_NAME], `${buyer[FIRST_NAME]} ${buyer[LAST_NAME]} ${NEW_LINE}${buyer[POSITION]} ${NEW_LINE}${buyer[EMAIL]}`),
      xlsxRow(String(CONTENT_STRINGS[CAN_CONTACT_BUYER].SUMMARY?.TITLE), mapYesNoField(buyer[CAN_CONTACT_BUYER])),
      xlsxRow(String(CONTENT_STRINGS[CONNECTED_WITH_BUYER].SUMMARY?.TITLE), mapYesNoField(buyer[CONNECTED_WITH_BUYER])),
      xlsxRow(String(CONTENT_STRINGS[TRADED_WITH_BUYER].SUMMARY?.TITLE), mapYesNoField(buyer[TRADED_WITH_BUYER])),
    ];

    expect(result).toEqual(expected);
  });
});
