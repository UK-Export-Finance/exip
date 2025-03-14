import mapExportContract from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import mapHowWasTheContractAwarded from './map-how-was-the-contract-awarded';
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

    const { exportContract } = mockApplication;

    const { agent } = exportContract;

    const expected = [
      xlsxRow(String(FIELDS.EXPORT_CONTRACT[DESCRIPTION]), exportContract[DESCRIPTION]),

      mapHowWasTheContractAwarded(exportContract),

      ...mapFinalDestination(exportContract, mockCountries),

      xlsxRow(String(FIELDS.EXPORT_CONTRACT[PAYMENT_TERMS_DESCRIPTION]), exportContract[PAYMENT_TERMS_DESCRIPTION]),

      ...mapPrivateMarket(mockApplication),

      ...mapAgent(agent, mockCountries),
    ];

    expect(result).toEqual(expected);
  });
});
