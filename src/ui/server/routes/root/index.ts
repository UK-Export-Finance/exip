import express from 'express';
import { ROUTES } from '../../constants';
import rootGet from '../../controllers/root';
import { get as cookiesGet, post as cookiesPost } from '../../controllers/root/cookies';
import cookiesConsentPost from '../../controllers/root/cookies-consent';
import problemWithServiceGet from '../../controllers/quote/problem-with-service';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const rootRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

rootRouter.get(ROUTES.ROOT, rootGet);

rootRouter.get(ROUTES.COOKIES, cookiesGet);
rootRouter.post(ROUTES.COOKIES, cookiesPost);

rootRouter.post(ROUTES.COOKIES_CONSENT, cookiesConsentPost);

rootRouter.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);

export default rootRouter;
