import express from 'express';
import { ROUTES } from '../../constants';
import get from '../../controllers/wellknown/security';

// @ts-ignore
const wellknownRouter = express.Router();

// Routes
wellknownRouter.get(ROUTES.WELL_KNOWN.SECURITY, get);

export default wellknownRouter;
