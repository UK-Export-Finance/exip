import express from 'express';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as insuredAmountGet, post as insuredAmountPost } from '../../../controllers/insurance/eligibility/insured-amount';
import { get as insuredPeriodGet, post as insuredPeriodPost } from '../../../controllers/insurance/eligibility/insured-period';
import { get as otherPartiesInvolvedGet, post as otherPartiesInvolvedPost } from '../../../controllers/insurance/eligibility/other-parties';
import { get as letterOfCreditGet, post as letterOfCreditPost } from '../../../controllers/insurance/eligibility/letter-of-credit';
import { get as preCreditPeriodGet, post as preCreditPeriodPost } from '../../../controllers/insurance/eligibility/pre-credit-period';
import { get as companiesHouseNumberGet, post as companiesHouseNumberPost } from '../../../controllers/insurance/eligibility/companies-house-number';
import { get as eligibleToApplyOnlineGet, post as eligibleToApplyOnlinePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online';
import { post as eligibleToApplyOnlineTempCreatePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online/temp-create-account';
import { get as alreadyHaveAccountGet, post as alreadyHaveAccountPost } from '../../../controllers/insurance/eligibility/account-to-apply-online';
import { get as cannotApplyGet } from '../../../controllers/insurance/eligibility/cannot-apply';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../../controllers/insurance/eligibility/need-to-start-again';

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

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT, letterOfCreditGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT, letterOfCreditPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD, preCreditPeriodGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD, preCreditPeriodPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlineGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlinePost);

// Temporary POST route to redirect to the create account flow.
// This is to avoid interrupting the testing/flow for other areas, whilst we develop account creation.
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE_TEMP_CREATE, eligibleToApplyOnlineTempCreatePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE, alreadyHaveAccountGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE, alreadyHaveAccountPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainPost);

export default insuranceEligibilityRouter;
