import { FIELD_ID, pageVariables, HTML_FLAGS, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import save from '../../save-data';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../../test-mocks';

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT, CODE_OF_CONDUCT_SAVE_AND_BACK },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { CODE_OF_CONDUCT },
  },
} = TEMPLATES;

const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY_CODE_OF_CONDUCT;

describe('controllers/insurance/declarations/anti-bribery/code-of-conduct', () => {
  jest.mock('../../save-data');

  let mockSaveDeclaration = jest.fn(() => Promise.resolve({}));

  save.declaration = mockSaveDeclaration;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          ID: FIELD_ID,
          ...DECLARATIONS_FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CODE_OF_CONDUCT_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CONDITIONAL_YES_HTML: CODE_OF_CONDUCT.CONDITIONAL_YES_HTML,
        HINT_HTML: CODE_OF_CONDUCT.HINT_HTML,
        HORIZONTAL_RADIOS: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
        applicationAnswer: mockApplication.declaration[FIELD_ID],
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
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: 'true',
    };

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

      describe('when the answer is true', () => {
        it(`should redirect to ${EXPORTING_WITH_CODE_OF_CONDUCT}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is false', () => {
        it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, async () => {
          req.body = {
            [FIELD_ID]: 'false',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const expectedVariables = {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
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
    });
  });
});
