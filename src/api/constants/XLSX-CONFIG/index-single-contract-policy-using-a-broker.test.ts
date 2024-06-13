import { XLSX_ROW_INDEXES } from '.';
import { incrementIndexes, INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany, mockCompanyScenarios } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  USING_BROKER,
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
  broker: {
    ...mockApplicationMinimalBrokerBuyerAndCompany,
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
        BROKER_ADDRESS: 59,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
        TITLES: {
          ...indexes.TITLES,
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
        BROKER_ADDRESS: 60,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
        TITLES: {
          ...incremented.TITLES,
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
        BROKER_ADDRESS: 60,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        ALTERNATIVE_TRADING_ADDRESS: 37,
        LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
        TITLES: {
          ...incremented.TITLES,
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
        BROKER_ADDRESS: 61,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
        ALTERNATIVE_TRADING_ADDRESS: 38,
        LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
        TITLES: {
          ...secondIncrement.TITLES,
          BUYER: incremented.TITLES.BUYER + 3,
          DECLARATIONS: incremented.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
