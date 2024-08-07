import express from 'express';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';

import { get as startGet } from '../../controllers/insurance/start';
import { get as dashboardGet } from '../../controllers/insurance/dashboard';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';
import { get as noAccessToApplicationGet } from '../../controllers/insurance/no-access-to-application';
import { get as noAccessApplicationSubmittedGet } from '../../controllers/insurance/no-access-application-submitted';
import { get as applicationSubmittedGet } from '../../controllers/insurance/application-submitted';
import { get as completeOtherSectionsGet } from '../../controllers/insurance/complete-other-sections';
import { get as feedbackGet, post as feedbackPost } from '../../controllers/insurance/feedback/feedback-form';
import { get as feedbackConfirmationGet } from '../../controllers/insurance/feedback/feedback-confirmation';

import insuranceEligibilityRoutes from './eligibility';
import insurancePolicyRouter from './policy';
import insuranceBusinessRouter from './business';
import insuranceYourBuyerRouter from './your-buyer';
import insuranceExportContractrRouter from './export-contract';
import insuranceDeclarationsRouter from './declarations';
import insuranceAccountRouter from './account';
import insuranceCheckYourAnswersRouter from './check-your-answers';

// @ts-ignore
const insuranceRouter = express.Router();

insuranceRouter.get(INSURANCE_ROUTES.START, startGet);

insuranceRouter.get(INSURANCE_ROUTES.DASHBOARD, dashboardGet);
insuranceRouter.get(`${INSURANCE_ROUTES.DASHBOARD}/page/:pageNumber`, dashboardGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);

insuranceRouter.get(INSURANCE_ROUTES.NO_ACCESS_TO_APPLICATION, noAccessToApplicationGet);

insuranceRouter.get(INSURANCE_ROUTES.NO_ACCESS_APPLICATION_SUBMITTED, noAccessApplicationSubmittedGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);
insuranceRouter.use('/', insuranceAccountRouter);
insuranceRouter.use(INSURANCE_ROOT, insurancePolicyRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceBusinessRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceYourBuyerRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceExportContractrRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceDeclarationsRouter);
insuranceRouter.use(INSURANCE_ROOT, insuranceCheckYourAnswersRouter);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.COMPLETE_OTHER_SECTIONS}`, completeOtherSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.APPLICATION_SUBMITTED}`, applicationSubmittedGet);

insuranceRouter.get(INSURANCE_ROUTES.FEEDBACK, feedbackGet);
insuranceRouter.post(INSURANCE_ROUTES.FEEDBACK, feedbackPost);

insuranceRouter.get(INSURANCE_ROUTES.FEEDBACK_SENT, feedbackConfirmationGet);

export default insuranceRouter;
