import mapTotalContractValueOverThreshold from '.';
import { TOTAL_CONTRACT_VALUE } from '../../constants';
import { mockApplication } from '../../test-mocks';

const { eligibility } = mockApplication;

describe('api/helpers/map-total-contract-value-over-threshold', () => {
  it('should return the result of an equality check', () => {
    const result = mapTotalContractValueOverThreshold(eligibility);

    const expected = eligibility.totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;

    expect(result).toEqual(expected);
  });
});
