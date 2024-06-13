import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';
import { Application } from '../../types';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const { policy } = mockApplicationMinimalBrokerBuyerAndCompany;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
} as Application;

application.policy.jointlyInsuredParty[REQUESTED] = true;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - other company involved`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 3,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 3,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 3,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 3,
      },
    };

    expect(result).toEqual(expected);
  });
});
