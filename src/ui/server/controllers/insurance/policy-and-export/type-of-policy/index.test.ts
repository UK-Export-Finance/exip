import { PAGE_VARIABLES, get, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

describe('controllers/insurance/policy-and-export/type-of-policy', () => {
  let req: Request;
  let res: Response;

  const mockGetApplicationResponse = mockApplication;
  let getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));

  const mockUpdatePolicyAndExportResponse = {
    id: mockApplication.policyAndExport.id,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    beforeEach(() => {
      api.keystone.application.get = getApplicationSpy;
    });

    it('should call api.keystone.application.get', async () => {
      await get(req, res);

      expect(getApplicationSpy).toHaveBeenCalledTimes(1);
      expect(getApplicationSpy).toHaveBeenCalledWith(Number(req.params.referenceNumber));
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        application: mockApplication,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, expectedVariables);
    });

    describe('when there is no application returned from the API', () => {
      beforeEach(() => {
        // @ts-ignore
        getApplicationSpy = jest.fn(() => Promise.resolve());
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error with the getApplication API call', () => {
      beforeEach(() => {
        getApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.application.get = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    let updatePolicyAndExportSpy = jest.fn(() => Promise.resolve(mockUpdatePolicyAndExportResponse));

    beforeEach(() => {
      getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));

      api.keystone.application.get = getApplicationSpy;
      api.keystone.application.update.policyAndExport = updatePolicyAndExportSpy;
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = {
          [PAGE_VARIABLES.FIELD.ID]: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE].OPTIONS.SINGLE.VALUE,
        };
      });

      it('should call api.keystone.application.get', async () => {
        await post(req, res);

        expect(getApplicationSpy).toHaveBeenCalledTimes(1);
        expect(getApplicationSpy).toHaveBeenCalledWith(Number(req.params.referenceNumber));
      });

      it('should call api.keystone.application.update.policyAndExport with policyAndExport id and sanitised data', async () => {
        await post(req, res);

        expect(updatePolicyAndExportSpy).toHaveBeenCalledTimes(1);

        const expectedPayload = sanitiseData(req.body);
        expect(updatePolicyAndExportSpy).toHaveBeenCalledWith(mockApplication.policyAndExport.id, expectedPayload);
      });

      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const referenceNumber = Number(req.params.referenceNumber);

        const expected = `${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(req.body),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY, expectedVariables);
      });
    });

    describe('api error handling', () => {
      beforeEach(() => {
        req.body = {
          [PAGE_VARIABLES.FIELD.ID]: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE].OPTIONS.SINGLE.VALUE,
        };
      });

      describe('get application call', () => {
        describe('when there is no application returned', () => {
          beforeEach(() => {
            // @ts-ignore
            getApplicationSpy = jest.fn(() => Promise.resolve());
            api.keystone.application.get = getApplicationSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when an application does not have policyAndExport', () => {
          beforeEach(() => {
            const application = {};
            // @ts-ignore
            getApplicationSpy = jest.fn(() => Promise.resolve(application));
            api.keystone.application.get = getApplicationSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when an application does not have policyAndExport.id', () => {
          beforeEach(() => {
            const application = { policyAndExport: {} };

            // @ts-ignore
            getApplicationSpy = jest.fn(() => Promise.resolve(application));
            api.keystone.application.get = getApplicationSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            getApplicationSpy = jest.fn(() => Promise.reject());
            api.keystone.application.get = getApplicationSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('update policyAndExport call', () => {
        describe('when there is no object returned', () => {
          beforeEach(() => {
            getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));
            api.keystone.application.get = getApplicationSpy;

            // @ts-ignore
            updatePolicyAndExportSpy = jest.fn(() => Promise.resolve());

            api.keystone.application.update.policyAndExport = updatePolicyAndExportSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));
            api.keystone.application.get = getApplicationSpy;

            updatePolicyAndExportSpy = jest.fn(() => Promise.reject());

            api.keystone.application.update.policyAndExport = updatePolicyAndExportSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
