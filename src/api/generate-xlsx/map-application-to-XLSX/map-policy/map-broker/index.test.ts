import mapBroker from '.';
import { POLICY as FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapBrokerAddress from './map-broker-address';
import { mockApplication } from '../../../../test-mocks';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-broker', () => {
  describe(`when ${USING_BROKER} is true`, () => {
    it('should return an array of mapped exporter fields', () => {
      const result = mapBroker(mockApplication);

      const { broker } = mockApplication;

      const expected = [
        xlsxRow(String(FIELDS[USING_BROKER]), mapYesNoField({ answer: broker[USING_BROKER] })),
        xlsxRow(String(FIELDS[BROKER_NAME]), broker[BROKER_NAME]),
        xlsxRow(String(FIELDS[EMAIL]), broker[EMAIL]),
        mapBrokerAddress(broker),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${USING_BROKER} is false`, () => {
    it('should return an array of mapped exporter fields', () => {
      const mockApplicationNoBroker = {
        ...mockApplication,
        broker: {
          ...mockApplication.broker,
          [USING_BROKER]: false,
        },
      };

      const result = mapBroker(mockApplicationNoBroker);

      const { broker } = mockApplicationNoBroker;

      const expected = [xlsxRow(String(FIELDS[USING_BROKER]), mapYesNoField({ answer: broker[USING_BROKER] }))];

      expect(result).toEqual(expected);
    });
  });
});
