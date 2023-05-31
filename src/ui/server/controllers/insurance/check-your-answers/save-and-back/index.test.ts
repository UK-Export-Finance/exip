import { post } from '.';
import { ROUTES } from '../../../../constants';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/check-your-answers/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../save-data');

  let mockSaveData = jest.fn(() => Promise.resolve(true));
  save.sectionReview = mockSaveData;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should redirect to all sections page', async () => {
    await post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      res.locals = { csrfToken: '1234' };
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when the save data call does not return anything', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.resolve(false));
        save.sectionReview = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the save data API call fails', () => {
      beforeEach(() => {
        mockSaveData = jest.fn(() => Promise.reject(new Error('Mock error')));
        save.sectionReview = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
