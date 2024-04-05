import { FIELD_ID, pageVariables, TEMPLATE, get, post } from '.';
import { BUTTONS, PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES, APPLICATION } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import keystoneDocumentRendererConfig from '../../../../helpers/keystone-document-renderer-config';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockDeclarations } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
  DECLARATIONS: { HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

describe('controllers/insurance/declarations/how-your-data-will-be-used', () => {
  jest.mock('../save-data');

  let mockSaveDeclaration = jest.fn(() => Promise.resolve(mockApplication.declaration));
  let submitApplicationSpy = jest.fn(() => Promise.resolve({ success: true }));

  save.declaration = mockSaveDeclaration;

  let req: Request;
  let res: Response;

  let getLatestHowDataWillBeUsedSpy = jest.fn(() => Promise.resolve(mockDeclarations.howDataWillBeUsed));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.application.declarations.getLatestHowDataWillBeUsed = getLatestHowDataWillBeUsedSpy;
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SUBMIT_BUTTON_COPY: BUTTONS.SUBMIT_APPLICATION,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DECLARATIONS.DECLARATION);
    });
  });

  describe('get', () => {
    it('should call api.keystone.application.declarations.getLatestHowDataWillBeUsed', async () => {
      await get(req, res);

      expect(getLatestHowDataWillBeUsedSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        documentContent: mockDeclarations.howDataWillBeUsed.content.document,
        documentConfig: keystoneDocumentRendererConfig(),
        application: mapApplicationToFormFields(res.locals.application),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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

    describe('when there is an error calling the API', () => {
      beforeAll(() => {
        getLatestHowDataWillBeUsedSpy = jest.fn(() => Promise.reject(new Error('mock')));

        api.keystone.application.declarations.getLatestHowDataWillBeUsed = getLatestHowDataWillBeUsedSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      getLatestHowDataWillBeUsedSpy = jest.fn(() => Promise.resolve(mockDeclarations.howDataWillBeUsed));

      api.keystone.application.declarations.getLatestHowDataWillBeUsed = getLatestHowDataWillBeUsedSpy;

      api.keystone.application.submit = submitApplicationSpy;
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call save.declaration with application and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(save.declaration).toHaveBeenCalledTimes(1);
        expect(save.declaration).toHaveBeenCalledWith(mockApplication, payload);
      });

      it('should call api.keystone.application.submit with the application ID', async () => {
        await post(req, res);

        expect(api.keystone.application.submit).toHaveBeenCalledTimes(1);
        expect(api.keystone.application.submit).toHaveBeenCalledWith(mockApplication.id);
      });

      it(`should redirect to ${APPLICATION_SUBMITTED}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${APPLICATION_SUBMITTED}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe('when an application cannot be submitted (e.g, is already submitted)', () => {
        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          res.locals.application = {
            ...mockApplication,
            status: APPLICATION.STATUS.SUBMITTED,
          };

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.application.declarations.getLatestHowDataWillBeUsed', async () => {
        await post(req, res);

        expect(getLatestHowDataWillBeUsedSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          documentContent: mockDeclarations.howDataWillBeUsed.content.document,
          documentConfig: keystoneDocumentRendererConfig(),
          validationErrors: generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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
      describe('get latest how your data will be used call', () => {
        describe('when the get latest how your data will be used API call fails', () => {
          beforeEach(() => {
            getLatestHowDataWillBeUsedSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.application.declarations.getLatestHowDataWillBeUsed = getLatestHowDataWillBeUsedSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('save data call', () => {
        describe('when the save data API call does not return anything', () => {
          beforeEach(() => {
            save.declaration = jest.fn(() => Promise.resolve());

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the save data API call fails', () => {
          beforeEach(() => {
            mockSaveDeclaration = jest.fn(() => Promise.reject(new Error('mock')));
            save.declaration = mockSaveDeclaration;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('submit application call', () => {
        describe('when the submit application API call returns false', () => {
          beforeEach(() => {
            submitApplicationSpy = jest.fn(() => Promise.resolve({ success: false }));
            api.keystone.application.submit = submitApplicationSpy;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the submit application API call fails', () => {
          beforeEach(() => {
            submitApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.application.submit = submitApplicationSpy;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
