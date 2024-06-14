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
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
  buyer: mockApplication.buyer,
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - all buyer conditions`, () => {
  describe('with all possible buyer conditions (connected and traded with buyer, outstanding payments, previous credit insurance)', () => {
    it('should return the correct row indexes', () => {
      const result = XLSX_ROW_INDEXES(application);

      const indexes = INDEXES();

      const expected = {
        ...indexes,
        TITLES: {
          ...indexes.TITLES,
          DECLARATIONS: indexes.TITLES.DECLARATIONS + 5,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
