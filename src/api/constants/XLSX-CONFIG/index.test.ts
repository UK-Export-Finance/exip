import { XLSX_CONFIG, XLSX_ROW_INDEXES } from '.';
import FIELD_IDS from '../field-ids/insurance';
import { APPLICATION } from '../application';
import { mockApplication } from '../../test-mocks';

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  POLICY: {
    BROKER: { USING_BROKER },
  },
} = FIELD_IDS;

describe('api/constants/XLSX-CONFIG', () => {
  describe('XLSX_CONFIG', () => {
    it('should return a config for XLSX', () => {
      const result = XLSX_CONFIG;

      const expected = {
        KEY: {
          ID: 'field',
          COPY: 'Field',
        },
        VALUE: {
          ID: 'answer',
          COPY: 'Answer',
        },
        COLUMN_WIDTH: 85,
        ADDITIONAL_TITLE_COLUMN_HEIGHT: 25,
        ADDITIONAL_COLUMN_HEIGHT: 50,
        LARGE_ADDITIONAL_COLUMN_HEIGHT: 50 * 2,
        FONT_SIZE: {
          DEFAULT: 11,
          TITLE: 14,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('XLSX_ROW_INDEXES', () => {
    describe(APPLICATION.POLICY_TYPE.SINGLE, () => {
      const application = {
        ...mockApplication,
        policy: {
          ...mockApplication.policy,
          [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
        },
      };

      describe('when using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: true,
          };

          const result = XLSX_ROW_INDEXES(application);

          const expected = {
            TITLES: {
              HEADER: 1,
              EXPORTER_CONTACT_DETAILS: 9,
              KEY_INFORMATION: 14,
              POLICY: 20,
              EXPORTER_BUSINESS: 30,
              BUYER: 52,
              ELIGIBILITY: 62,
            },
            COMPANY_ADDRESS: 34,
            COMPANY_SIC_CODES: 37,
            BROKER_ADDRESS: 45,
            BUYER_ADDRESS: 50,
            BUYER_CONTACT_DETAILS: 53,
          };

          expect(result).toEqual(expected);
        });
      });

      describe('when NOT using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: false,
          };

          const result = XLSX_ROW_INDEXES(application);

          const expected = {
            TITLES: {
              HEADER: 1,
              EXPORTER_CONTACT_DETAILS: 9,
              KEY_INFORMATION: 14,
              POLICY: 20,
              EXPORTER_BUSINESS: 30,
              BUYER: 49,
              ELIGIBILITY: 59,
            },
            COMPANY_ADDRESS: 34,
            COMPANY_SIC_CODES: 37,
            BROKER_ADDRESS: 45,
            BUYER_ADDRESS: 50,
            BUYER_CONTACT_DETAILS: 53,
          };

          expect(result).toEqual(expected);
        });
      });
    });

    describe(APPLICATION.POLICY_TYPE.MULTIPLE, () => {
      const application = {
        ...mockApplication,
        policy: {
          ...mockApplication.policy,
          [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
        },
      };

      describe('when using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: true,
          };

          const result = XLSX_ROW_INDEXES(application);

          const expected = {
            TITLES: {
              HEADER: 1,
              EXPORTER_CONTACT_DETAILS: 9,
              KEY_INFORMATION: 14,
              POLICY: 20,
              EXPORTER_BUSINESS: 31,
              BUYER: 53,
              ELIGIBILITY: 63,
            },
            COMPANY_ADDRESS: 35,
            COMPANY_SIC_CODES: 38,
            BROKER_ADDRESS: 46,
            BUYER_ADDRESS: 51,
            BUYER_CONTACT_DETAILS: 54,
          };

          expect(result).toEqual(expected);
        });
      });

      describe('when NOT using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: false,
          };

          const result = XLSX_ROW_INDEXES(application);

          const expected = {
            TITLES: {
              HEADER: 1,
              EXPORTER_CONTACT_DETAILS: 9,
              KEY_INFORMATION: 14,
              POLICY: 20,
              EXPORTER_BUSINESS: 31,
              BUYER: 50,
              ELIGIBILITY: 60,
            },
            COMPANY_ADDRESS: 35,
            COMPANY_SIC_CODES: 38,
            BROKER_ADDRESS: 46,
            BUYER_ADDRESS: 51,
            BUYER_CONTACT_DETAILS: 54,
          };

          expect(result).toEqual(expected);
        });
      });
    });
  });
});
