import { pageVariables, TEMPLATE, get } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import keystoneDocumentRendererConfig from '../../../../helpers/keystone-document-renderer-config';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockDeclarations } from '../../../../test-mocks';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_ANTI_BRIBERY;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  DECLARATIONS: {
    ANTI_BRIBERY: { ROOT_SAVE_AND_BACK: ANTI_BRIBERY_SAVE_AND_BACK },
  },
} = INSURANCE;

describe('controllers/insurance/declarations/anti-bribery', () => {
  let req: Request;
  let res: Response;

  let getLatestAntiBriberySpy = jest.fn(() => Promise.resolve(mockDeclarations.antiBribery));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    api.keystone.application.declarations.getLatestAntiBribery = getLatestAntiBriberySpy;
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ANTI_BRIBERY_SAVE_AND_BACK}`,
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
    it('should call api.keystone.application.declarations.getLatestAntiBribery', async () => {
      await get(req, res);

      expect(getLatestAntiBriberySpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.ANTI_BRIBERY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        documentContent: mockDeclarations.antiBribery.content.document,
        documentConfig: keystoneDocumentRendererConfig(),
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

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeAll(() => {
          getLatestAntiBriberySpy = jest.fn(() => Promise.reject());
          api.keystone.application.declarations.getLatestAntiBribery = getLatestAntiBriberySpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
