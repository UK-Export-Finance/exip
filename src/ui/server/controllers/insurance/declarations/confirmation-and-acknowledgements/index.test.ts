import { FIELD_ID, pageVariables, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { APPLICATION, FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
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
import { mockReq, mockRes, mockApplication, mockDeclarations, mockSpyPromise, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
  DECLARATIONS: { CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

describe('controllers/insurance/declarations/confirmation-and-acknowledgements', () => {
  jest.mock('../save-data');

  let mockSaveDeclaration = mockSpyPromise();

  save.declaration = mockSaveDeclaration;

  let req: Request;
  let res: Response;

  let getLatestConfirmationAndAcknowledgementSpy = jest.fn(() => Promise.resolve(mockDeclarations.confirmationAndAcknowledgement));

  let submitApplicationSpy = jest.fn(() => Promise.resolve({ success: true }));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement = getLatestConfirmationAndAcknowledgementSpy;
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIRMATION_ACKNOWLEDGEMENTS;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK}`,
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
    it('should call api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement', async () => {
      await get(req, res);

      expect(getLatestConfirmationAndAcknowledgementSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        documentContent: mockDeclarations.confirmationAndAcknowledgement.content.document,
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
        getLatestConfirmationAndAcknowledgementSpy = jest.fn(() => Promise.reject(new Error('mock')));

        api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement = getLatestConfirmationAndAcknowledgementSpy;
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
      getLatestConfirmationAndAcknowledgementSpy = jest.fn(() => Promise.resolve(mockDeclarations.confirmationAndAcknowledgement));

      api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement = getLatestConfirmationAndAcknowledgementSpy;

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

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

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
      it('should call api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement', async () => {
        await post(req, res);

        expect(getLatestConfirmationAndAcknowledgementSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          documentContent: mockDeclarations.confirmationAndAcknowledgement.content.document,
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
      describe('get latest confirmation and acknowledgements call', () => {
        describe('when the get latest confirmation and acknowledgements API call fails', () => {
          beforeEach(() => {
            getLatestConfirmationAndAcknowledgementSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.application.declarations.getLatestConfirmationAndAcknowledgement = getLatestConfirmationAndAcknowledgementSpy;
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
            mockSaveDeclaration = jest.fn(() => Promise.resolve(false));
            save.declaration = mockSaveDeclaration;

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
