import { XLSX_CONFIG, TITLE_ROW_INDEXES } from '.';
import FIELD_IDS from '../field-ids/insurance';
import { APPLICATION } from '../application';
import { ANSWERS } from '../answers';
import { mockApplication } from '../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
  EXPORTER_BUSINESS: {
    BROKER: { USING_BROKER },
  },
} = FIELD_IDS;

describe('api/constants/XLSX-CONFIG', () => {
  describe('XLSX_CONFIG', () => {
    it('should return a config for XLSX', () => {
      const result = XLSX_CONFIG();

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
        ROW_INDEXES: {
          COMPANY_ADDRESS: 30,
          COMPANY_SIC_CODES: 33,
          BROKER_ADDRESS: 45,
          BUYER_ADDRESS: 50,
          BUYER_CONTACT_DETAILS: 53,
        },
        TITLE_ROW_INDEXES: TITLE_ROW_INDEXES(),
      };

      expect(result).toEqual(expected);
    });

    describe('when an application is passed', () => {
      it('should return TITLE_ROW_INDEXES with the application', () => {
        const result = XLSX_CONFIG(mockApplication);

        const expected = TITLE_ROW_INDEXES(mockApplication);

        expect(result.TITLE_ROW_INDEXES).toEqual(expected);
      });
    });
  });

  describe('TITLE_ROW_INDEXES', () => {
    describe('when no application is passed', () => {
      it('should return an empty object', () => {
        const result = TITLE_ROW_INDEXES();

        expect(result).toEqual({});
      });
    });

    describe(APPLICATION.POLICY_TYPE.SINGLE, () => {
      const application = {
        ...mockApplication,
        policyAndExport: {
          ...mockApplication.policyAndExport,
          [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
        },
      };

      describe('when using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: ANSWERS.YES,
          };

          const result = TITLE_ROW_INDEXES(application);

          const expected = {
            HEADER: 1,
            KEY_INFORMATION: 9,
            POLICY_AND_EXPORT: 15,
            EXPORTER_BUSINESS: 25,
            BUYER: 47,
            ELIGIBILITY: 57,
          };

          expect(result).toEqual(expected);
        });
      });

      describe('when NOT using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: ANSWERS.NO,
          };

          const result = TITLE_ROW_INDEXES(application);

          const expected = {
            HEADER: 1,
            KEY_INFORMATION: 9,
            POLICY_AND_EXPORT: 15,
            EXPORTER_BUSINESS: 25,
            BUYER: 44,
            ELIGIBILITY: 54,
          };

          expect(result).toEqual(expected);
        });
      });
    });

    describe(APPLICATION.POLICY_TYPE.MULTIPLE, () => {
      const application = {
        ...mockApplication,
        policyAndExport: {
          ...mockApplication.policyAndExport,
          [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
        },
      };

      describe('when using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: ANSWERS.YES,
          };

          const result = TITLE_ROW_INDEXES(application);

          const expected = {
            HEADER: 1,
            KEY_INFORMATION: 9,
            POLICY_AND_EXPORT: 15,
            EXPORTER_BUSINESS: 26,
            BUYER: 48,
            ELIGIBILITY: 58,
          };

          expect(result).toEqual(expected);
        });
      });

      describe('when NOT using a broker', () => {
        it('should return correct row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: ANSWERS.NO,
          };

          const result = TITLE_ROW_INDEXES(application);

          const expected = {
            HEADER: 1,
            KEY_INFORMATION: 9,
            POLICY_AND_EXPORT: 15,
            EXPORTER_BUSINESS: 26,
            BUYER: 45,
            ELIGIBILITY: 55,
          };

          expect(result).toEqual(expected);
        });
      });
    });
  });
});
