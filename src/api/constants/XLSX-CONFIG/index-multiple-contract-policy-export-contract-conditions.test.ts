import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const { exportContract, policy } = mockApplicationSinglePolicyTotalContractValueOverThreshold;

const mockApplication = {
  ...mockApplicationSinglePolicyTotalContractValueOverThreshold,
  exportContract: {
    ...exportContract,
    agent: {
      ...exportContract.agent,
      isUsingAgent: true,
      service: {
        ...exportContract.agent.service,
        agentIsCharging: true,
      },
    },
    finalDestinationKnown: true,
    privateMarket: {
      ...exportContract.privateMarket,
      attempted: true,
    },
  },
  policy: {
    ...policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - all export contract conditions`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(mockApplication);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      AGENT_ADDRESS: 80,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 1,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 1,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 13,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 2,
      },
    };

    expect(result).toEqual(expected);
  });
});
