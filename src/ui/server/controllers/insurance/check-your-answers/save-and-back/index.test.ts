import { FIELD_IDS, post } from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import constructPayload from '../../../../helpers/construct-payload';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/check-your-answers/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../save-data');

  let mockSaveData = jest.fn(() => Promise.resolve(true));
  save.sectionReview = mockSaveData;

  beforeEach(() => {
    req = mockReq();
    req.body[FIELD_IDS[0]] = 'true';

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = Object.values(CHECK_YOUR_ANSWERS_FIELD_IDS);

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  it('should call save.sectionReview with application and data from constructPayload function', async () => {
    await post(req, res);

    const payload = stripEmptyFormFields(constructPayload(req.body, FIELD_IDS));

    expect(save.sectionReview).toHaveBeenCalledTimes(1);
    expect(save.sectionReview).toHaveBeenCalledWith(mockApplication, payload);
  });

  it('should redirect to all sections page', async () => {
    await post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      delete res.locals.application;
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
        mockSaveData = jest.fn(() => Promise.reject(new Error('mock')));
        save.sectionReview = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
