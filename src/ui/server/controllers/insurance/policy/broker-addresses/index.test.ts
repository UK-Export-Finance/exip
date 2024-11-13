import { PAGE_CONTENT_STRINGS, TEMPLATE, get, pageVariables } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import api from '../../../../api';
import mapOrdnanceSurveyAddresses from '../../../../helpers/mappings/map-ordnance-survey-addresses';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockOrdnanceSurveyAddressResponse, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const { SELECT_THE_ADDRESS } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { BROKER_ADDRESSES } = POLICY_FIELDS;

const tempMockTotalAddresses = '2';
const tempMockPostcode = 'W1A';

describe('controllers/insurance/policy/broker-addresses', () => {
  let req: Request;
  let res: Response;

  const getOrdnanceSurveyAddressSpy = jest.fn(() => Promise.resolve(mockOrdnanceSurveyAddressResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.getOrdnanceSurveyAddress = getOrdnanceSurveyAddressSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_ADDRESSES);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_ADDRESSES);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber, tempMockPostcode, mockOrdnanceSurveyAddressResponse.addresses.length);

      const expected = {
        FIELD: {
          ID: SELECT_THE_ADDRESS,
          ...BROKER_ADDRESSES[SELECT_THE_ADDRESS],
        },
        BODY: `${tempMockTotalAddresses} ${PAGE_CONTENT_STRINGS.BODY} ${tempMockPostcode}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.getOrdnanceSurveyAddress', async () => {
      await get(req, res);

      expect(getOrdnanceSurveyAddressSpy).toHaveBeenCalledTimes(1);

      expect(getOrdnanceSurveyAddressSpy).toHaveBeenCalledWith(tempMockPostcode, tempMockTotalAddresses);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, tempMockPostcode, mockOrdnanceSurveyAddressResponse.addresses.length),
        userName: getUserNameFromSession(req.session.user),
        mappedAddresses: mapOrdnanceSurveyAddresses(mockOrdnanceSurveyAddressResponse.addresses),
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when api.keystone.getOrdnanceSurveyAddress returns apiError=true', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            apiError: true,
          };

          api.keystone.getOrdnanceSurveyAddress = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error', () => {
        beforeEach(() => {
          api.keystone.getOrdnanceSurveyAddress = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
