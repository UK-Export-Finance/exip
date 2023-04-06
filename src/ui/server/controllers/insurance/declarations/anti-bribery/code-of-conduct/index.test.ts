import { pageVariables, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../../../constants';
import singleInputPageVariables from '../../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import save from '../../save-data';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.HAS_ANTI_BRIBERY_CODE_OF_CONDUCT;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { EXPORTING_WITH_CODE_OF_CONDUCT, CODE_OF_CONDUCT_SAVE_AND_BACK },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  },
} = INSURANCE;

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

    res.locals.application = mockApplication;
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...DECLARATIONS_FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CODE_OF_CONDUCT_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
        ...pageVariables(mockApplication.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: res.locals.application,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: 'Yes',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call save.declaration with application and req.body', async () => {
        await post(req, res);

        expect(save.declaration).toHaveBeenCalledTimes(1);
        expect(save.declaration).toHaveBeenCalledWith(mockApplication, validBody);
      });

      describe(`when the answer is ${FIELD_VALUES.YES}`, () => {
        it(`should redirect to ${EXPORTING_WITH_CODE_OF_CONDUCT}`, async () => {
          req.body = {
            [FIELD_ID]: FIELD_VALUES.YES,
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the answer is ${FIELD_VALUES.NO}`, () => {
        it(`should redirect to ${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, async () => {
          req.body = {
            [FIELD_ID]: FIELD_VALUES.NO,
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedVariables = {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
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
            mockSaveDeclaration = jest.fn(() => Promise.reject());
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
