import express from 'express';
import { ROUTES } from '../../constants';
import rootGet from '../../controllers/root';
import { get as accessibilityStatementGet } from '../../controllers/root/accessibility-statement';
import { get as cookiesGet, post as cookiesPost } from '../../controllers/root/cookies';
import { get as cookiesSavedGet } from '../../controllers/root/cookies/saved';
import cookiesConsentPost from '../../controllers/root/cookies-consent';
import { get as contactUsGet } from '../../controllers/root/contact-us';
import problemWithServiceGet from '../../controllers/root/problem-with-service';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const rootRouter = express.Router();

rootRouter.get(ROUTES.ROOT, rootGet);

rootRouter.get(ROUTES.ACCESSIBILITY_STATEMENT, accessibilityStatementGet);
rootRouter.get(ROUTES.INSURANCE.ACCESSIBILITY_STATEMENT, accessibilityStatementGet);

rootRouter.get(ROUTES.COOKIES, cookiesGet);
rootRouter.post(ROUTES.COOKIES, cookiesPost);
rootRouter.get(ROUTES.COOKIES_SAVED, cookiesSavedGet);
rootRouter.post(ROUTES.COOKIES_CONSENT, cookiesConsentPost);

rootRouter.get(ROUTES.INSURANCE.COOKIES, cookiesGet);
rootRouter.post(ROUTES.INSURANCE.COOKIES, cookiesPost);
rootRouter.get(ROUTES.INSURANCE.COOKIES_SAVED, cookiesSavedGet);
rootRouter.post(ROUTES.INSURANCE.COOKIES_CONSENT, cookiesConsentPost);

rootRouter.get(ROUTES.CONTACT_US, contactUsGet);
rootRouter.get(ROUTES.INSURANCE.CONTACT_US, contactUsGet);

rootRouter.get(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);
rootRouter.get(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE, problemWithServiceGet);

export default rootRouter;
