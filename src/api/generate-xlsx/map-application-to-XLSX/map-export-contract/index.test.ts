import mapExportContract from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapPrivateMarket from './map-private-market';
import mapAgent from './map-agent';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication } from '../../../test-mocks';

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract', () => {
  it('should return an array of mapped export contract fields', () => {
    const result = mapExportContract(mockApplication);

    const {
      eligibility: { totalContractValue },
      exportContract,
    } = mockApplication;

    const { agent, privateMarket } = exportContract;

    const expected = [
      xlsxRow(SECTION_TITLES.EXPORT_CONTRACT, ''),

      xlsxRow(String(FIELDS.EXPORT_CONTRACT[DESCRIPTION]), exportContract[DESCRIPTION]),

      xlsxRow(String(FIELDS.EXPORT_CONTRACT[FINAL_DESTINATION_KNOWN]), mapYesNoField({ answer: exportContract[FINAL_DESTINATION_KNOWN] })),

      xlsxRow(String(FIELDS.EXPORT_CONTRACT[PAYMENT_TERMS_DESCRIPTION]), exportContract[PAYMENT_TERMS_DESCRIPTION]),

      ...mapPrivateMarket(privateMarket, totalContractValue),

      ...mapAgent(agent),
    ];

    expect(result).toEqual(expected);
  });
});