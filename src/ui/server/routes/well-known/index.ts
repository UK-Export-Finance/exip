import express from 'express';
import { ROUTES } from '../../constants';
import get from '../../controllers/well-known/security';

// @ts-ignore
const wellknownRouter = express.Router();

wellknownRouter.get(ROUTES.WELL_KNOWN.SECURITY, get);

export default wellknownRouter;
