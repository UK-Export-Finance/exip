import express from 'express';
import { ROUTES } from '../../constants';

import cookiesPost from '../../controllers/cookies-consent';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const rootRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

rootRouter.post(ROUTES.COOKIES_CONSENT, cookiesPost);

export default rootRouter;
