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
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
  broker: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.broker,
    isUsingBroker: true,
  },
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - using a broker`, () => {
  describe('with no different trading name, no different trading adddress', () => {
    it('should return the correct row indexes', () => {
      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();

      const expected = {
        ...indexes,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 4,
        BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
        BROKER_ADDRESS: 59,
        TITLES: {
          ...indexes.TITLES,
          BUYER: indexes.TITLES.BUYER + 4,
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
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 4,
        BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
        BROKER_ADDRESS: 60,
        TITLES: {
          ...incremented.TITLES,
          BUYER: incremented.TITLES.BUYER + 4,
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
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 4,
        BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
        BROKER_ADDRESS: 60,
        ALTERNATIVE_TRADING_ADDRESS: 37,
        TITLES: {
          ...incremented.TITLES,
          BUYER: incremented.TITLES.BUYER + 4,
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
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 4,
        BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
        BROKER_ADDRESS: 61,
        ALTERNATIVE_TRADING_ADDRESS: 38,
        TITLES: {
          ...secondIncrement.TITLES,
          BUYER: incremented.TITLES.BUYER + 4,
          DECLARATIONS: incremented.TITLES.DECLARATIONS + 3,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
