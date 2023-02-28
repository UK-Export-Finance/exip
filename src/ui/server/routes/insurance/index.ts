import express from 'express';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as applyOfflineGet } from '../../controllers/insurance/apply-offline';
import { get as speakToUkefEfmGet } from '../../controllers/insurance/speak-to-ukef-efm';
import { get as dashboardGet } from '../../controllers/insurance/dashboard';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';
import insuranceEligibilityRoutes from './eligibility';
import insurancePolicyAndExportsRouter from './policy-and-exports';
import insuranceBusinessRouter from './business';
import insuranceYourBuyerRouter from './your-buyer';
import insuranceAccountRouter from './account';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(INSURANCE_ROUTES.START, startGet);
insuranceRouter.post(INSURANCE_ROUTES.START, startPost);

insuranceRouter.get(INSURANCE_ROUTES.APPLY_OFFLINE, applyOfflineGet);
insuranceRouter.get(INSURANCE_ROUTES.SPEAK_TO_UKEF_EFM, speakToUkefEfmGet);

insuranceRouter.get(INSURANCE_ROUTES.DASHBOARD, dashboardGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);
insuranceRouter.use('/', insuranceAccountRouter);
insuranceRouter.use(INSURANCE_ROOT, insurancePolicyAndExportsRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceBusinessRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceYourBuyerRouter);

export default insuranceRouter;
