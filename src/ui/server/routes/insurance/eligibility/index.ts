import express from 'express';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as insuredAmountGet, post as insuredAmountPost } from '../../../controllers/insurance/eligibility/insured-amount';
import { get as insuredPeriodGet, post as insuredPeriodPost } from '../../../controllers/insurance/eligibility/insured-period';
import { get as otherPartiesInvolvedGet, post as otherPartiesInvolvedPost } from '../../../controllers/insurance/eligibility/other-parties';
import cannotApplyGet from '../../../controllers/insurance/eligibility/cannot-apply';
import applyOfflineGet from '../../../controllers/insurance/eligibility/apply-offline';
import speakToUkefEfmGet from '../../../controllers/insurance/eligibility/speak-to-ukef-efm';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceEligibilityRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, insuredAmountGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, insuredAmountPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD, insuredPeriodGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD, insuredPeriodPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED, otherPartiesInvolvedGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED, otherPartiesInvolvedPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, applyOfflineGet);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.SPEAK_TO_UKEF_EFM, speakToUkefEfmGet);

export default insuranceEligibilityRouter;
