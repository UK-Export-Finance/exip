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

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_ZERO_ADDRESSES_ROOT },
} = INSURANCE_ROUTES;

const { BROKER_ADDRESSES } = POLICY_FIELDS;

const tempMockPostcode = 'W1A 1AA';
const tempMockHouseNameOrNumber = 'WOGAN HOUSE';

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
    const expectedGenericProperties = {
      FIELD: {
        ID: SELECT_THE_ADDRESS,
        ...BROKER_ADDRESSES[SELECT_THE_ADDRESS],
      },
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
    };

    describe('when totalAddresses is 1', () => {
      it('should have correct properties', () => {
        const mockTotalAddresses = 1;

        const result = pageVariables(referenceNumber, mockTotalAddresses);

        const expected = {
          ...expectedGenericProperties,
          INTRO: {
            ...PAGE_CONTENT_STRINGS.INTRO,
            ADDRESSES_FOUND: `${mockTotalAddresses} ${PAGE_CONTENT_STRINGS.INTRO.ADDRESS} ${PAGE_CONTENT_STRINGS.INTRO.FOUND_FOR}`,
          },
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when totalAddresses is greater than 1', () => {
      it('should have correct properties', () => {
        const mockTotalAddresses = 2;

        const result = pageVariables(referenceNumber, mockTotalAddresses);

        const expected = {
          ...expectedGenericProperties,
          INTRO: {
            ...PAGE_CONTENT_STRINGS.INTRO,
            ADDRESSES_FOUND: `${mockTotalAddresses} ${PAGE_CONTENT_STRINGS.INTRO.ADDRESSES} ${PAGE_CONTENT_STRINGS.INTRO.FOUND_FOR}`,
          },
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('get', () => {
    it('should call api.keystone.getOrdnanceSurveyAddress', async () => {
      await get(req, res);

      expect(getOrdnanceSurveyAddressSpy).toHaveBeenCalledTimes(1);

      expect(getOrdnanceSurveyAddressSpy).toHaveBeenCalledWith(tempMockPostcode, tempMockHouseNameOrNumber);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, mockOrdnanceSurveyAddressResponse.addresses.length),
        userName: getUserNameFromSession(req.session.user),
        mappedAddresses: mapOrdnanceSurveyAddresses(mockOrdnanceSurveyAddressResponse.addresses),
        postcode: tempMockPostcode,
        buildingNumberOrName: tempMockHouseNameOrNumber,
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

      describe('when api.keystone.getOrdnanceSurveyAddress returns invalidPostcode=true', () => {
        it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            invalidPostcode: true,
          };

          api.keystone.getOrdnanceSurveyAddress = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
        });
      });

      describe('when api.keystone.getOrdnanceSurveyAddress returns noAddressesFound=true', () => {
        it(`should redirect to ${BROKER_ZERO_ADDRESSES_ROOT}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            noAddressesFound: true,
          };

          api.keystone.getOrdnanceSurveyAddress = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`);
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
