import mapApplicationToFormFields from '.';
import { FIELD_IDS } from '../../../constants';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import { mockApplication } from '../../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/mappings/map-application-to-form-fields', () => {
  it('should return the application without any mappings', () => {
    const simpleApplication = {
      ...mockApplication,
      policyAndExport: {
        id: mockApplication.policyAndExport.id,
      },
    };

    const result = mapApplicationToFormFields(simpleApplication);

    expect(result).toEqual(simpleApplication);
  });

  describe(`when an application has policyAndExport${REQUESTED_START_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[REQUESTED_START_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has policyAndExport${CONTRACT_COMPLETION_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[CONTRACT_COMPLETION_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an application is not passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields();

      expect(result).toEqual({});
    });
  });

  describe('when an empty application is passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields({});

      expect(result).toEqual({});
    });
  });
});
