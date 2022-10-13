import express from 'express';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(ROUTES.INSURANCE.START, startGet);
insuranceRouter.post(ROUTES.INSURANCE.START, startPost);

export default insuranceRouter;
