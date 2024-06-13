import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany, mockApplication } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
  buyer: mockApplication.buyer,
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - all buyer conditions`, () => {
  describe('with all possible buyer conditions (connected and traded with buyer, outstanding payments, previous credit insurance)', () => {
    it('should return the correct row indexes', () => {
      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();

      const expected = {
        ...indexes,
        BROKER_ADDRESS: indexes.BROKER_ADDRESS + 1,
        BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
        BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
        LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
        TITLES: {
          ...indexes.TITLES,
          BUYER: indexes.TITLES.BUYER + 1,
          DECLARATIONS: indexes.TITLES.DECLARATIONS + 6,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
