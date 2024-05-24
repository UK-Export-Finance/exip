import { XLSX_ROW_INDEXES } from '.';
import { incrementIndexes, INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplication, mockCompanyScenarios } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
  broker: {
    ...mockApplication.broker,
    isUsingBroker: true,
  },
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - using a broker`, () => {
  describe('with no different trading name, no different trading adddress', () => {
    it('should return the correct row indexes', () => {
      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();

      const expected = {
        ...indexes,
        BROKER_ADDRESS: 48,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        TITLES: {
          ...indexes.TITLES,
          POLICY: indexes.TITLES.POLICY + 3,
          BUYER: indexes.TITLES.BUYER + 3,
          DECLARATIONS: indexes.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('with different trading name, no different trading adddress', () => {
    it('should return the correct row indexes', () => {
      application.company = mockCompanyScenarios.differentTradingNameNoAddress;

      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();
      const incremented = incrementIndexes(indexes);

      const expected = {
        ...incremented,
        BROKER_ADDRESS: 49,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        TITLES: {
          ...incremented.TITLES,
          POLICY: incremented.TITLES.POLICY + 3,
          BUYER: incremented.TITLES.BUYER + 3,
          DECLARATIONS: incremented.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('with different trading adddress, no different trading name', () => {
    it('should return the correct row indexes', () => {
      application.broker = {
        ...application.broker,
        [USING_BROKER]: true,
      };
      application.company = mockCompanyScenarios.differentTradingAddressNoName;

      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();
      const incremented = incrementIndexes(indexes);

      const expected = {
        ...incremented,
        BROKER_ADDRESS: 49,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        ALTERNATIVE_TRADING_ADDRESS: 37,
        TITLES: {
          ...incremented.TITLES,
          POLICY: incremented.TITLES.POLICY + 3,
          BUYER: incremented.TITLES.BUYER + 3,
          DECLARATIONS: incremented.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('with different trading adddress and different trading name', () => {
    it('should return the correct row indexes', () => {
      application.company = mockCompanyScenarios.differentTradingAddressAndName;

      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();
      const incremented = incrementIndexes(indexes);
      const secondIncrement = incrementIndexes(incremented);

      const expected = {
        ...secondIncrement,
        BROKER_ADDRESS: 50,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        ALTERNATIVE_TRADING_ADDRESS: 38,
        TITLES: {
          ...secondIncrement.TITLES,
          POLICY: incremented.TITLES.POLICY + 3,
          BUYER: incremented.TITLES.BUYER + 3,
          DECLARATIONS: incremented.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
