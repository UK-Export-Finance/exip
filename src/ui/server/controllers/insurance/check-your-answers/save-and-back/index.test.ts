import { FIELD_IDS, post } from '.';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import constructPayload from '../../../../helpers/construct-payload';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import save from '../save-data';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/check-your-answers/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../save-data');

  let mockSaveData = jest.fn(() => Promise.resolve(true));
  save.sectionReview = mockSaveData;

  beforeEach(() => {
    req = mockReq();
    req.body[FIELD_IDS[0]] = 'true';

    res = mockResInsurance();
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

    expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
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
        mockSaveData = mockSpyPromiseRejection;
        save.sectionReview = mockSaveData;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
