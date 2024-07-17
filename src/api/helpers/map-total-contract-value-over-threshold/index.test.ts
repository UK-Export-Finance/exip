import mapTotalContractValueOverThreshold from '.';
import { TOTAL_CONTRACT_VALUE } from '../../constants';
import { mockApplication } from '../../test-mocks';

describe('api/helpers/map-total-contract-value-over-threshold', () => {
  const application = mockApplication;

  describe('when totalContractValue.value is an empty string', () => {
    beforeEach(() => {
      application.eligibility.totalContractValue.value = '';
    });

    it('should set totalContractValueOverThreshold to false', () => {
      const result = mapTotalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue.value is ${TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      application.eligibility.totalContractValue = {
        ...application.eligibility.totalContractValue,
        value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
        valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
      };
    });

    it('should set totalContractValueOverThreshold to false', () => {
      const result = mapTotalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue.value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      application.eligibility.totalContractValue = {
        ...application.eligibility.totalContractValue,
        value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
        valueId: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
      };
    });

    it('should set totalContractValueOverThreshold to true', () => {
      const result = mapTotalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(true);
    });
  });
});
