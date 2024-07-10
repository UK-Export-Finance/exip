import { FIELD_IDS, post } from '.';
import { ROUTES } from '../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { referenceNumber, mockReq, mockRes } from '../../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

describe('controllers/insurance/declarations/confidentiality/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../save-data');

  let mockSaveData = jest.fn(() => Promise.resolve(true));
  save.declaration = mockSaveData;

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.body = mockFormBody;
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = Object.values(DECLARATIONS_FIELD_IDS);

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('when the form has data', () => {
    it('should call save.declaration with application and submitted values from constructPayload function', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      expect(save.declaration).toHaveBeenCalledTimes(1);
      expect(save.declaration).toHaveBeenCalledWith(res.locals.application, payload);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when the update declarations call does not return anything', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.resolve(false));
        save.declaration = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.reject(new Error('mock')));
        save.declaration = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
