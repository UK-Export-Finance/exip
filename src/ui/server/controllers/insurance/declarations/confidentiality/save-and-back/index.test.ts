import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { Request, Response } from '../../../../../../types';
import save from '../save-data';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/declarations/confidentiality/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../save-data');

  let mockSaveData = jest.fn(() => Promise.resolve(true));
  save.declaration = mockSaveData;

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;
  });

  describe('when the form has data', () => {
    it('should call save.declaration with application and req.body', async () => {
      await post(req, res);

      expect(save.declaration).toHaveBeenCalledTimes(1);
      expect(save.declaration).toHaveBeenCalledWith(res.locals.application, mockFormBody);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      res.locals = { csrfToken: '1234' };
    });

    it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when the update declarations call does not return anything', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.resolve(false));
        save.declaration = mockSaveData;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.reject(new Error('Mock error')));
        save.declaration = mockSaveData;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
