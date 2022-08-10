import {
  PAGE_VARIABLES,
  get,
  post,
} from '.';
import { BUTTONS, FIELDS, FOOTER, LINKS, PAGES, PRODUCT } from '../../content-strings';
import {
  FIELD_IDS,
  ROUTES,
  TEMPLATES,
} from '../../constants';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import { mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';

describe('controllers/can-get-private-insurance', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        CONTENT_STRINGS: {
          PRODUCT,
          FOOTER,
          BUTTONS,
          LINKS,
          ...PAGES.CAN_GET_PRIVATE_INSURANCE_PAGE,
        },
        FIELDS: {
          CAN_GET_PRIVATE_INSURANCE: {
            ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE,
            ...FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
          },
          CAN_GET_PRIVATE_INSURANCE_YES: {
            ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
            ...FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES],
          },
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
          ...PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when the submitted answer is `yes`/true', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE] = 'true';
      });

      it(`should redirect to ${ROUTES.CANNOT_OBTAIN_COVER}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', () => {
        post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.CAN_GET_PRIVATE_INSURANCE);

        const expectedReason = PAGES.CANNOT_OBTAIN_COVER_PAGE.REASON.CAN_GET_PRIVATE_INSURANCE;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: 'false',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', () => {
        post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
