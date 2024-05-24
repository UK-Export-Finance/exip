import { XLSX_CONFIG, XLSX_ROW_INDEXES } from '.';
import { INDEXES, TITLE_INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplication } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

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

          const defaultIndexes = INDEXES();
          const defaultTitleIndexes = TITLE_INDEXES();

          const expected = {
            ...defaultIndexes,
            BROKER_ADDRESS: 48,
            BUYER_ADDRESS: defaultIndexes.BUYER_ADDRESS + 3,
            TITLES: {
              ...defaultTitleIndexes,
              POLICY: defaultTitleIndexes.POLICY + 3,
              BUYER: defaultTitleIndexes.BUYER + 3,
              DECLARATIONS: defaultTitleIndexes.DECLARATIONS + 3,
            },
          };

          expect(result).toEqual(expected);
        });
      });

      describe('when NOT using a broker', () => {
        it('should return default row indexes', () => {
          application.broker = {
            ...mockApplication.buyer,
            [USING_BROKER]: false,
          };

          const result = XLSX_ROW_INDEXES(application);

          const expected = INDEXES();

          expect(result).toEqual(expected);
        });
      });
    });
  });
});
