import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { APPLICATION } from '../application';
import { mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../test-mocks';

const { exportContract } = mockApplicationSinglePolicyTotalContractValueOverThreshold;

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
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - all export contract conditions`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(mockApplication);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      AGENT_ADDRESS: 78,
      TITLES: {
        ...indexes.TITLES,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 10,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 1,
      },
    };

    expect(result).toEqual(expected);
  });
});
