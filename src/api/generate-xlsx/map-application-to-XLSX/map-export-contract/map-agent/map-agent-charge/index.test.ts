import mapAgentCharge from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import mapYesNoField from '../../../helpers/map-yes-no-field';
import mapAgentChargeAmount from './map-agent-charge-amount';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, mockCountries } from '../../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

const {
  exportContract: {
    agent: { service },
  },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract/map-agent/map-agent-charge', () => {
  describe(`when ${IS_CHARGING} is true`, () => {
    const mockService = {
      ...service,
      [IS_CHARGING]: true,
    };

    it('should return an array of mapped fields', () => {
      const result = mapAgentCharge(mockService, mockCountries);

      const expected = [
        xlsxRow(String(FIELDS.AGENT_SERVICE[IS_CHARGING]), mapYesNoField({ answer: mockService[IS_CHARGING] })),
        ...mapAgentChargeAmount(mockService.charge, mockCountries),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_CHARGING} is false`, () => {
    const mockService = {
      ...service,
      [IS_CHARGING]: false,
    };

    it('should return an array with one field', () => {
      const result = mapAgentCharge(mockService, mockCountries);

      const expected = [xlsxRow(String(FIELDS.AGENT_SERVICE[IS_CHARGING]), mapYesNoField({ answer: mockService[IS_CHARGING] }))];

      expect(result).toEqual(expected);
    });
  });
});
