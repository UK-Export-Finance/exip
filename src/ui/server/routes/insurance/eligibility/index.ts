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
import { get as coverPeriodGet, post as coverPeriodPost } from '../../../controllers/insurance/eligibility/cover-period';
import { get as longTermCoverGet } from '../../../controllers/insurance/eligibility/long-term-cover';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as endBuyerGet, post as endBuyerPost } from '../../../controllers/insurance/eligibility/end-buyer';
import { get as partyToConsortiumGet, post as partyToConsortiumPost } from '../../../controllers/insurance/eligibility/party-to-consortium';
import { get as memberOfAGroupGet, post as memberOfAGroupPost } from '../../../controllers/insurance/eligibility/member-of-a-group';
import { get as cannotApplyMultipleRisksGet } from '../../../controllers/insurance/eligibility/cannot-apply-multiple-risks';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/eligibility/check-your-answers';
import { get as eligibleToApplyOnlineGet, post as eligibleToApplyOnlinePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online';
import { get as haveAnAccountGet, post as haveAnAccountPost } from '../../../controllers/insurance/eligibility/do-you-have-an-account';
import { get as cannotApplyGet } from '../../../controllers/insurance/eligibility/cannot-apply';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../../controllers/insurance/eligibility/need-to-start-again';
import { get as talkToEfmTooShortGet } from '../../../controllers/insurance/eligibility/talk-to-an-export-finance-manager';
import { get as partyToConsortiumExitGet } from '../../../controllers/insurance/eligibility/party-to-consortium-exit';
import { get as memberOfAGroupExitGet } from '../../../controllers/insurance/eligibility/member-of-a-group-exit';

// @ts-ignore
const insuranceEligibilityRouter = express.Router();

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION_CHANGE, exporterLocationGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION_CHANGE, exporterLocationPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER_CHANGE, companiesHouseNumberGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER_CHANGE, companiesHouseNumberPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER_EXIT, noCompaniesHouseNumberGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER_CHANGE, companiesHouseSearchGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER_CHANGE, companiesHouseSearchPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE_EXIT, companiesHouseUnavailableGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE_EXIT, companyNotActiveGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS_CHANGE, companyDetailsGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS_CHANGE, companyDetailsPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY_CHANGE, buyerCountryGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY_CHANGE, buyerCountryPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED_CHANGE, totalValueInsuredGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED_CHANGE, totalValueInsuredPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, coverPeriodGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, coverPeriodPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD_CHANGE, coverPeriodGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD_CHANGE, coverPeriodPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.LONG_TERM_COVER_EXIT, longTermCoverGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER_CHANGE, endBuyerGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER_CHANGE, endBuyerPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM, partyToConsortiumGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM, partyToConsortiumPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_CHANGE, partyToConsortiumGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_CHANGE, partyToConsortiumPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP, memberOfAGroupGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP, memberOfAGroupPost);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP_CHANGE, memberOfAGroupGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP_CHANGE, memberOfAGroupPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS_EXIT, cannotApplyMultipleRisksGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlineGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlinePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_EXIT, cannotApplyGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER, talkToEfmTooShortGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_EXIT, partyToConsortiumExitGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP_EXIT, memberOfAGroupExitGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_EXIT, partyToConsortiumExitGet);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP_EXIT, memberOfAGroupExitGet);

export default insuranceEligibilityRouter;
