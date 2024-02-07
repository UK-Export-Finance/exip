import totalContractValueOverThreshold from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../constants';
import { mockApplication } from '../../../test-mocks';
import { Application } from '../../../../types';

describe('middleware/insurance/total-contract-value-over-threshold', () => {
  let application: Application;

  describe('when totalContractValue?.value is undefined', () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: undefined,
        },
      };
    });

    it('should set totalContractValueOverThreshold to false', () => {
      const result = totalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue?.value is ${TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: {
            value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
            valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
          },
        },
      };
    });

    it('should set totalContractValueOverThreshold to false', () => {
      const result = totalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue?.value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: {
            value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
            valueId: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
          },
        },
      };
    });

    it('should call next()', () => {
      totalContractValueOverThreshold(application);
    });

    it('should set totalContractValueOverThreshold to true', () => {
      const result = totalContractValueOverThreshold(application);

      expect(result.totalContractValueOverThreshold).toEqual(true);
    });
  });
});
