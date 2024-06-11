import mapBuyer from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import NEW_LINE from '../helpers/xlsx-new-line';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapConnectionWithBuyer from './map-connection-with-buyer';
import mapBuyerTradingHistory from './map-buyer-trading-history';
import mapPreviousCoverWithBuyer from './map-previous-cover-with-buyer';
import { mockApplication } from '../../../test-mocks';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS,
};

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
  CONNECTION_WITH_BUYER,
  HAS_BUYER_FINANCIAL_ACCOUNTS,
  TRADED_WITH_BUYER,
} = FIELD_IDS;

const { SECTION_TITLES, FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapBuyer(mockApplication);

    const { eligibility, buyer } = mockApplication;
    const { buyerTradingHistory, relationship } = buyer;

    const expected = [
      xlsxRow(SECTION_TITLES.BUYER, ''),
      xlsxRow(FIELDS[NAME], buyer[NAME]),
      xlsxRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${NEW_LINE}${buyer[COUNTRY].name}`),
      xlsxRow(FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
      xlsxRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
      xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER]), mapYesNoField({ answer: relationship[CONNECTION_WITH_BUYER] })),

      mapConnectionWithBuyer(relationship),

      xlsxRow(String(FIELDS[TRADED_WITH_BUYER]), mapYesNoField({ answer: buyerTradingHistory[TRADED_WITH_BUYER] })),

      ...mapBuyerTradingHistory(buyerTradingHistory),

      ...mapPreviousCoverWithBuyer(eligibility, relationship),

      xlsxRow(String(FIELDS[HAS_BUYER_FINANCIAL_ACCOUNTS]), mapYesNoField({ answer: relationship[HAS_BUYER_FINANCIAL_ACCOUNTS] })),
    ];

    expect(result).toEqual(expected);
  });
});
