import totalContractValueOverThreshold from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../constants';
import { mockReq, mockRes, mockApplication } from '../../../test-mocks';
import { Next, Request, Response } from '../../../../types';

describe('middleware/insurance/total-contract-value-over-threshold', () => {
  let req: Request;
  let res: Response;
  let next: Next;

  const nextSpy = jest.fn();

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
    next = nextSpy;
  });

  describe('when totalContractValue?.value is undefined', () => {
    beforeEach(() => {
      res.locals.application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: undefined,
        },
      };

      next = nextSpy;
    });

    it('should call next()', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should totalContractValueOverThreshold to false', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(res.locals.application?.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue?.value is ${TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      res.locals.application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: {
            value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
            valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
          },
        },
      };

      next = nextSpy;
    });

    it('should call next()', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should totalContractValueOverThreshold to false', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(res.locals.application?.totalContractValueOverThreshold).toEqual(false);
    });
  });

  describe(`when totalContractValue?.value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    beforeEach(() => {
      res.locals.application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          totalContractValue: {
            value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
            valueId: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
          },
        },
      };

      next = nextSpy;
    });

    it('should call next()', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should totalContractValueOverThreshold to true', () => {
      totalContractValueOverThreshold(req, res, next);

      expect(res.locals.application?.totalContractValueOverThreshold).toEqual(true);
    });
  });
});
