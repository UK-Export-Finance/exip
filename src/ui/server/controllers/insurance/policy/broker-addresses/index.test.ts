import { FIELD_ID, ERROR_MESSAGE, PAGE_CONTENT_STRINGS, TEMPLATE, get, post, pageVariables } from '.';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import api from '../../../../api';
import mapOrdnanceSurveyAddresses from '../../../../helpers/mappings/map-ordnance-survey-addresses';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import getOrdnanceSurveyAddressByIndex from '../../../../helpers/get-chosen-ordnance-survey-address/by-index';
import getOrdnanceSurveyAddressById from '../../../../helpers/get-chosen-ordnance-survey-address/by-id';
import mapAndSave from '../map-and-save/broker';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockOrdnanceSurveyAddressResponse, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  BROKER_DETAILS: { POSTCODE, BUILDING_NUMBER_OR_NAME },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    BROKER_ADDRESSES_SAVE_AND_BACK,
    BROKER_ADDRESSES_CHANGE,
    BROKER_ADDRESSES_CHECK_AND_CHANGE,
    BROKER_DETAILS_ROOT,
    BROKER_ZERO_ADDRESSES_ROOT,
    BROKER_CONFIRM_ADDRESS_ROOT,
    BROKER_MANUAL_ADDRESS_ROOT,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { BROKER_ADDRESSES } = POLICY_FIELDS;

const { broker } = mockApplication;
const { postcode, buildingNumberOrName } = broker;

const mappedAddresses = mapOrdnanceSurveyAddresses(mockOrdnanceSurveyAddressResponse.addresses, broker);

describe('controllers/insurance/policy/broker-addresses', () => {
  let req: Request;
  let res: Response;

  const getOrdnanceSurveyAddressesSpy = jest.fn(() => Promise.resolve(mockOrdnanceSurveyAddressResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.getOrdnanceSurveyAddresses = getOrdnanceSurveyAddressesSpy;
    mapAndSave.broker = jest.fn(() => Promise.resolve(true));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = SELECT_THE_ADDRESS;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('ERROR_MESSAGE', () => {
    it('should have the correct error message', () => {
      const expected = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

      expect(ERROR_MESSAGE).toEqual(expected);
    });
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
      SEARCH_AGAIN_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
      ENTER_ADDRESS_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_ADDRESSES_SAVE_AND_BACK}`,
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
    describe(`when application.broker does not have a ${POSTCODE}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: '',
          },
        };
      });

      it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
      });
    });

    describe(`when application.broker does not have a ${BUILDING_NUMBER_OR_NAME}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [BUILDING_NUMBER_OR_NAME]: '',
          },
        };
      });

      it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
      });
    });

    it('should call api.keystone.getOrdnanceSurveyAddresses', async () => {
      await get(req, res);

      expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledTimes(1);

      expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledWith(postcode, buildingNumberOrName);
    });

    it('should NOT call mapAndSave.broker', () => {
      expect(mapAndSave.broker).toHaveBeenCalledTimes(0);
    });

    describe('when api.keystone.getOrdnanceSurveyAddresses returns only 1 address', () => {
      const mockAddresses = mockOrdnanceSurveyAddressResponse.addresses;

      beforeEach(async () => {
        const mockResponse = {
          ...mockOrdnanceSurveyAddressResponse,
          addresses: [mockAddresses[0]],
        };

        api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockResponse));
        mapAndSave.broker = jest.fn(() => Promise.resolve(true));

        await get(req, res);
      });

      it('should call mapAndSave.broker once with address data and application data', () => {
        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        const addressToSave = getOrdnanceSurveyAddressByIndex({
          addresses: mockAddresses,
          index: 0,
        });

        expect(mapAndSave.broker).toHaveBeenCalledWith(addressToSave, mockApplication);
      });

      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT}`, async () => {
        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`);
      });

      describe('api error handling', () => {
        describe('mapAndSave.broker call', () => {
          describe('when mapAndSave.broker does not return a true boolean', () => {
            beforeEach(() => {
              const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

              mapAndSave.broker = mapAndSaveSpy;
            });

            it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
              await get(req, res);

              expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
            });
          });

          describe('when there is an error', () => {
            beforeEach(() => {
              const mapAndSaveSpy = mockSpyPromiseRejection;

              mapAndSave.broker = mapAndSaveSpy;
            });

            it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
              await get(req, res);

              expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
            });
          });
        });
      });
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
        mappedAddresses,
        postcode,
        buildingNumberOrName,
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
      describe('when api.keystone.getOrdnanceSurveyAddresses returns apiError=true', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            apiError: true,
          };

          api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when api.keystone.getOrdnanceSurveyAddresses returns invalidPostcode=true', () => {
        it(`should redirect to ${BROKER_DETAILS_ROOT}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            invalidPostcode: true,
          };

          api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
        });
      });

      describe('when api.keystone.getOrdnanceSurveyAddresses returns noAddressesFound=true', () => {
        it(`should redirect to ${BROKER_ZERO_ADDRESSES_ROOT}`, async () => {
          const mockResponse = {
            ...mockOrdnanceSurveyAddressResponse,
            noAddressesFound: true,
          };

          api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockResponse));

          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`);
        });
      });

      describe('when there is an error', () => {
        beforeEach(() => {
          api.keystone.getOrdnanceSurveyAddresses = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: mappedAddresses[0].value,
    };

    api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockOrdnanceSurveyAddressResponse.addresses));
    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should call api.keystone.getOrdnanceSurveyAddresses', async () => {
        await get(req, res);

        expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledTimes(1);

        expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledWith(broker.postcode, broker.buildingNumberOrName);
      });

      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber, mockOrdnanceSurveyAddressResponse.addresses.length),
          userName: getUserNameFromSession(req.session.user),
          mappedAddresses,
          postcode,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(async () => {
        req.body = validBody;

        await post(req, res);
      });

      it('should call api.keystone.getOrdnanceSurveyAddress', () => {
        expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledTimes(1);

        expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledWith(postcode, buildingNumberOrName);
      });

      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_ROOT}`, () => {
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.broker once with address data and application data', () => {
        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const chosenAddress = getOrdnanceSurveyAddressById(payload, FIELD_ID, mockOrdnanceSurveyAddressResponse.addresses);

        expect(mapAndSave.broker).toHaveBeenCalledWith(chosenAddress, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = BROKER_ADDRESSES_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = BROKER_ADDRESSES_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('api error handling', () => {
        describe('when api.keystone.getOrdnanceSurveyAddresses throws an error', () => {
          beforeEach(() => {
            api.keystone.getOrdnanceSurveyAddresses = mockSpyPromiseRejection;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await get(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('mapAndSave.broker call', () => {
          beforeEach(() => {
            req.body = validBody;
          });

          describe('when mapAndSave.broker does not return a true boolean', () => {
            beforeEach(() => {
              const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

              mapAndSave.broker = mapAndSaveSpy;
            });

            it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
              await post(req, res);

              expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
            });
          });

          describe('when there is an error', () => {
            beforeEach(() => {
              const mapAndSaveSpy = mockSpyPromiseRejection;

              mapAndSave.broker = mapAndSaveSpy;
            });

            it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
              await post(req, res);

              expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
            });
          });
        });
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
  });
});
