import mapExportContract from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import mapFinalDestination from './map-final-destination';
import mapPrivateMarket from './map-private-market';
import mapAgent from './map-agent';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, mockCountries } from '../../../test-mocks';

const { FIELDS } = XLSX;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract', () => {
  it('should return an array of mapped export contract fields', () => {
    const result = mapExportContract(mockApplication, mockCountries);

    const {
      eligibility: { totalContractValue },
      exportContract,
    } = mockApplication;

    const { agent, privateMarket } = exportContract;

    const expected = [
      xlsxRow(String(FIELDS.EXPORT_CONTRACT[DESCRIPTION]), exportContract[DESCRIPTION]),

      ...mapFinalDestination(exportContract, mockCountries),

      xlsxRow(String(FIELDS.EXPORT_CONTRACT[PAYMENT_TERMS_DESCRIPTION]), exportContract[PAYMENT_TERMS_DESCRIPTION]),

      ...mapPrivateMarket(privateMarket, totalContractValue),

      ...mapAgent(agent, mockCountries),
    ];

    expect(result).toEqual(expected);
  });
});
