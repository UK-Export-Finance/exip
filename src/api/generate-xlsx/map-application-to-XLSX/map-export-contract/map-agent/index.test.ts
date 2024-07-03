import mapAgent from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapAgentCharge from './map-agent-charge';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, mockCountries } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
  USING_AGENT,
} = FIELD_IDS;

const {
  exportContract: { agent },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract/map-agent', () => {
  describe(`when ${USING_AGENT} is true`, () => {
    const mockAgent = {
      ...agent,
      [COUNTRY_CODE]: mockCountries[0].isoCode,
      [USING_AGENT]: true,
    };

    it('should return an array of mapped fields', () => {
      const result = mapAgent(mockAgent, mockCountries);

      const country = getCountryByIsoCode(mockCountries, mockAgent[COUNTRY_CODE]);

      const expected = [
        xlsxRow(String(FIELDS.EXPORT_CONTRACT[USING_AGENT]), mapYesNoField({ answer: mockAgent[USING_AGENT] })),

        xlsxRow(String(FIELDS.AGENT[NAME]), mockAgent[NAME]),
        xlsxRow(String(FIELDS.AGENT[FULL_ADDRESS]), mockAgent[FULL_ADDRESS]),
        xlsxRow(String(FIELDS.AGENT[COUNTRY_CODE]), country.name),
        xlsxRow(String(FIELDS.AGENT_SERVICE[SERVICE_DESCRIPTION]), mockAgent.service[SERVICE_DESCRIPTION]),

        ...mapAgentCharge(mockAgent.service, mockCountries),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${USING_AGENT} is false`, () => {
    const mockAgent = {
      ...agent,
      [USING_AGENT]: false,
    };

    it('should return an array with one field', () => {
      const result = mapAgent(mockAgent);

      const expected = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[USING_AGENT]), mapYesNoField({ answer: mockAgent[USING_AGENT] }))];

      expect(result).toEqual(expected);
    });
  });
});
