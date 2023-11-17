import express from 'express';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as companiesHouseNumberGet, post as companiesHouseNumberPost } from '../../../controllers/insurance/eligibility/companies-house-number';
import { get as noCompaniesHouseNumberGet } from '../../../controllers/insurance/eligibility/no-companies-house-number';
import { get as companiesHouseSearchGet, post as companiesHouseSearchPost } from '../../../controllers/insurance/eligibility/companies-house-search';
import { get as companiesHouseUnavailableGet } from '../../../controllers/insurance/eligibility/companies-house-unavailable';
import { get as companyNotActiveGet } from '../../../controllers/insurance/eligibility/company-not-active';
import { get as companyDetailsGet, post as companyDetailsPost } from '../../../controllers/insurance/eligibility/company-details';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as totalValueInsuredGet, post as totalValueInsuredPost } from '../../../controllers/insurance/eligibility/total-value-insured';
import { get as insuredPeriodGet, post as insuredPeriodPost } from '../../../controllers/insurance/eligibility/cover-period';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as endBuyerGet, post as endBuyerPost } from '../../../controllers/insurance/eligibility/end-buyer';
import { get as cannotApplyMultipleRisksGet } from '../../../controllers/insurance/eligibility/cannot-apply-multiple-risks';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/eligibility/check-your-answers';
import { get as eligibleToApplyOnlineGet, post as eligibleToApplyOnlinePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online';
import { get as haveAnAccountGet, post as haveAnAccountPost } from '../../../controllers/insurance/eligibility/do-you-have-an-account';
import { get as cannotApplyGet } from '../../../controllers/insurance/eligibility/cannot-apply';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../../controllers/insurance/eligibility/need-to-start-again';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceEligibilityRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER, noCompaniesHouseNumberGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE, companiesHouseUnavailableGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE, companyNotActiveGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, insuredPeriodGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, insuredPeriodPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS, cannotApplyMultipleRisksGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlineGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlinePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainPost);

export default insuranceEligibilityRouter;
