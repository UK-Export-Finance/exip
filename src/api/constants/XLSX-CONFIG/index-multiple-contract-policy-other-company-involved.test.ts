import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const { policy } = mockApplicationMinimalBrokerBuyerAndCompany;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
};

application.policy.jointlyInsuredParty[REQUESTED] = true;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - other company involved`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 4,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 4,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 4,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 4,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 4,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 4,
      },
    };

    expect(result).toEqual(expected);
  });
});
