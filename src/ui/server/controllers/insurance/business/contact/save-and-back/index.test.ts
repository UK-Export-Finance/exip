import { post } from '.';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/contact';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;
const { POSITION } = BUSINESS_FIELD_IDS.CONTACT;

describe('controllers/insurance/business/contact/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.contact = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [FIRST_NAME]: 'firstName',
    [LAST_NAME]: 'lastName',
    [EMAIL]: 'test@test.com',
    [POSITION]: 'CEO',
  };

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.broker once with data from constructPayload function', async () => {
      req.body = {
        ...validBody,
        injection: 1,
      };

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      expect(mapAndSave.contact).toHaveBeenCalledTimes(1);

      expect(mapAndSave.contact).toHaveBeenCalledWith(payload, mockApplication, false);
    });
  });

  describe('when there are validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = {
        [FIRST_NAME]: 'firstName',
        [LAST_NAME]: 'lastName',
        [EMAIL]: 'test',
        [POSITION]: 'CEO',
      };

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.contact once', async () => {
      req.body = {
        [FIRST_NAME]: 'firstName',
        [LAST_NAME]: 'lastName',
        [EMAIL]: 'test',
        [POSITION]: 'CEO',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);
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
    describe('when saveResponse returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.contact = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.contact fails', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.contact = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
