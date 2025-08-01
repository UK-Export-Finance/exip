'use strict';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, 'default', { value: mod, enumerable: true }) : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default,
});
module.exports = __toCommonJS(keystone_exports);
var import_config6 = require('dotenv/config');
var import_core3 = require('@keystone-6/core');
var import_overload_protection = __toESM(require('overload-protection'));

// middleware/headers/security/index.ts
var security = (req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none';connect-src 'self';base-uri 'self';font-src 'self' data:;form-action 'self';frame-ancestors 'self';img-src 'self';object-src 'none';script-src 'self';script-src-attr 'self';style-src 'self';upgrade-insecure-requests",
  );
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=604800');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('Expect-CT', 'max-age=0,enforce');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader(
    'Permissions-Policy',
    'fullscreen=(self),microphone=(),camera=(),payment=(),geolocation=(),display-capture=(),battery=(),autoplay=(),gyroscope=(),accelerometer=(),web-share=(),usb=(),gamepad=(),magnetometer=(),midi=(),picture-in-picture=(),xr-spatial-tracking=()',
  );
  res.removeHeader('X-Powered-By');
  next();
};
var security_default = security;

// middleware/headers/check-api-key/index.ts
var import_config = require('dotenv/config');
var { API_KEY } = process.env;
var checkApiKey = (req, res, next) => {
  const { 'x-api-key': xApiKey } = req.headers;
  if (!xApiKey || xApiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorised' });
  }
  next();
};
var check_api_key_default = checkApiKey;

// middleware/rate-limiter/index.js
var import_express_rate_limit = __toESM(require('express-rate-limit'));
var rateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 1e3,
  // 1K requests / 1 window
  standardHeaders: false,
  legacyHeaders: false,
});
var rate_limiter_default = rateLimiter;

// cron/cron-job-scheduler.ts
var cron = __toESM(require('node-cron'));

// helpers/cron/scheduler.ts
var asyncTaskToSyncTask = (task, context) => (now2) => {
  (async () => {
    await task(context, now2);
  })();
};
var taskWithErrorLogging = (description, task, context) => async (_commonContext, now2) => {
  try {
    await task(context, now2);
  } catch (error) {
    console.error("An error occurred running job '%s' %o", description, error);
    throw error;
  }
};

// cron/cron-job-scheduler.ts
var cronJobScheduler = (jobs, context) => {
  jobs.forEach((job) => {
    const { cronExpression, description, task } = job;
    if (!cron.validate(cronExpression)) {
      console.error("Failed to add scheduled job '%s' due to invalid cron expression: '%s'", description, cronExpression);
      return;
    }
    console.info("Adding scheduled job '%s' on schedule '%s'", description, cronExpression);
    cron
      .schedule(cronExpression, asyncTaskToSyncTask(taskWithErrorLogging(description, task, context), context))
      .on('error', (error) => console.error("An error occurred scheduling job '%s' %o", description, error));
  });
};
var cron_job_scheduler_default = cronJobScheduler;

// cron/account/unverified-account-cron-job.ts
var import_dotenv2 = __toESM(require('dotenv'));

// helpers/get-unverified-accounts/index.ts
var now = /* @__PURE__ */ new Date();
var getUnverifiedAccounts = async (context) => {
  try {
    console.info('Getting unverified accounts - getUnverifiedAccounts (helper)');
    const accounts = await context.query.Account.findMany({
      where: {
        AND: [{ verificationExpiry: { lt: now } }, { status: { isVerified: { equals: false } } }, { status: { isInactive: { equals: false } } }],
      },
      query:
        'id firstName lastName email otpSalt otpHash otpExpiry salt hash passwordResetHash passwordResetExpiry verificationHash verificationExpiry reactivationHash reactivationExpiry updatedAt status { id isBlocked isVerified isInactive updatedAt }',
    });
    return accounts;
  } catch (error) {
    console.error('Error getting unverified accounts (getUnverifiedAccounts helper) %o', error);
    throw new Error(`Error getting unverified accounts (getUnverifiedAccounts helper) ${error}`);
  }
};
var get_unverified_accounts_default = getUnverifiedAccounts;

// helpers/map-unverified-accounts/index.ts
var mapUnverifiedAccounts = (accounts) => {
  const mappedAccountStatusArray = accounts.map((account2) => {
    const mapped = {
      where: { id: account2.status.id },
      data: {
        isInactive: true,
        updatedAt: /* @__PURE__ */ new Date(),
      },
    };
    return mapped;
  });
  const mappedAccountArray = accounts.map((account2) => {
    const mapped = {
      where: { id: account2.id },
      data: {
        updatedAt: /* @__PURE__ */ new Date(),
        verificationHash: '',
        verificationExpiry: null,
      },
    };
    return mapped;
  });
  return {
    accountStatus: mappedAccountStatusArray,
    account: mappedAccountArray,
  };
};
var map_unverified_accounts_default = mapUnverifiedAccounts;

// helpers/map-and-update-unverified-accounts/index.ts
var mapAndUpdateUnverifiedAccounts = async (accounts, context) => {
  try {
    console.info('Mapping and updating unverified accounts - mapAndUpdateUnverifiedAccounts');
    const { account: account2, accountStatus: accountStatus2 } = map_unverified_accounts_default(accounts);
    await context.db.Account.updateMany({
      data: account2,
    });
    await context.db.AccountStatus.updateMany({
      data: accountStatus2,
    });
  } catch (error) {
    console.error('Error mapping and updating unverified accounts %o', error);
    throw new Error(`Error mapping and updating unverified accounts ${error}`);
  }
};
var map_and_update_unverified_accounts_default = mapAndUpdateUnverifiedAccounts;

// helpers/update-unverified-accounts/index.ts
var updateUnverifiedAccounts = async (context) => {
  try {
    console.info('Getting and updating unverified accounts');
    const accounts = await get_unverified_accounts_default(context);
    if (accounts.length) {
      await map_and_update_unverified_accounts_default(accounts, context);
      return {
        success: true,
      };
    }
    console.info('No unverified accounts found - updateUnverifiedAccounts');
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error getting and updating unverified accounts %o', error);
    throw new Error(`Error getting and updating unverified accounts ${error}`);
  }
};
var update_unverified_accounts_default = updateUnverifiedAccounts;

// constants/index.ts
var import_dotenv = __toESM(require('dotenv'));

// constants/field-ids/shared/index.ts
var SHARED = {
  POLICY_TYPE: 'policyType',
  SINGLE_POLICY_TYPE: 'singlePolicyType',
  MULTIPLE_POLICY_TYPE: 'multiplePolicyType',
  POLICY_LENGTH: 'policyLength',
  NAME: 'name',
  EMAIL: 'email',
};
var shared_default = SHARED;

// constants/field-ids/shared-eligibility/index.ts
var SHARED_ELIGIBILITY = {
  BUYER_COUNTRY: 'buyerCountry',
  BUYER_COUNTRY_ISO_CODE: 'buyerCountryIsoCode',
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: 'hasMinimumUkGoodsOrServices',
  VALID_EXPORTER_LOCATION: 'validExporterLocation',
};
var shared_eligibility_default = SHARED_ELIGIBILITY;

// constants/field-ids/insurance/shared/index.ts
var SHARED_FIELD_IDS = {
  COMPANY: 'company',
  COMPANIES_HOUSE: {
    COMPANY_NAME: 'companyName',
    COMPANY_ADDRESS: 'registeredOfficeAddress',
    COMPANY_NUMBER: 'companyNumber',
    COMPANY_INCORPORATED: 'dateOfCreation',
    SIC_CODE: 'sicCode',
    COMPANY_SIC: 'sicCodes',
    INDUSTRY_SECTOR_NAME: 'industrySectorName',
    INDUSTRY_SECTOR_NAMES: 'industrySectorNames',
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: 'addressLine1',
      ADDRESS_LINE_2: 'addressLine2',
      CARE_OF: 'careOf',
      LOCALITY: 'locality',
      REGION: 'region',
      POSTAL_CODE: 'postalCode',
      COUNTRY: 'country',
      PREMISES: 'premises',
    },
  },
};
var shared_default2 = SHARED_FIELD_IDS;

// constants/field-ids/insurance/account/index.ts
var ACCOUNT = {
  ID: 'id',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  SALT: 'salt',
  HASH: 'hash',
  ACCESS_CODE: 'securityCode',
  IS_VERIFIED: 'isVerified',
  IS_BLOCKED: 'isBlocked',
  PASSWORD_RESET_HASH: 'passwordResetHash',
  PASSWORD_RESET_EXPIRY: 'passwordResetExpiry',
  REACTIVATION_HASH: 'reactivationHash',
  REACTIVATION_EXPIRY: 'reactivationExpiry',
  VERIFICATION_HASH: 'verificationHash',
  VERIFICATION_EXPIRY: 'verificationExpiry',
};
var account_default = ACCOUNT;

// constants/field-ids/insurance/policy/index.ts
var REQUESTED_START_DATE = 'requestedStartDate';
var CONTRACT_COMPLETION_DATE = 'contractCompletionDate';
var SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE,
  REQUESTED_START_DATE_DAY: `${REQUESTED_START_DATE}-day`,
  REQUESTED_START_DATE_MONTH: `${REQUESTED_START_DATE}-month`,
  REQUESTED_START_DATE_YEAR: `${REQUESTED_START_DATE}-year`,
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
};
var POLICY = {
  ...shared_default,
  TYPE_OF_POLICY: {
    POLICY_TYPE: shared_default.POLICY_TYPE,
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE,
      CONTRACT_COMPLETION_DATE_DAY: `${CONTRACT_COMPLETION_DATE}-day`,
      CONTRACT_COMPLETION_DATE_MONTH: `${CONTRACT_COMPLETION_DATE}-month`,
      CONTRACT_COMPLETION_DATE_YEAR: `${CONTRACT_COMPLETION_DATE}-year`,
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
      REQUESTED_CREDIT_LIMIT: 'requestedCreditLimit',
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: 'totalMonthsOfCover',
    },
  },
  EXPORT_VALUE: {
    MULTIPLE: {
      TOTAL_SALES_TO_BUYER: 'totalSalesToBuyer',
      MAXIMUM_BUYER_WILL_OWE: 'maximumBuyerWillOwe',
    },
  },
  NAME_ON_POLICY: {
    NAME: 'nameOnPolicy',
    IS_SAME_AS_OWNER: 'isSameAsOwner',
    SAME_NAME: 'sameName',
    OTHER_NAME: 'otherName',
    POSITION: 'position',
    POLICY_CONTACT_EMAIL: 'policyContact.email',
  },
  DIFFERENT_NAME_ON_POLICY: {
    POLICY_CONTACT_DETAIL: 'policyContactDetail',
    POSITION: 'position',
  },
  NEED_PRE_CREDIT_PERIOD: 'needPreCreditPeriodCover',
  CREDIT_PERIOD_WITH_BUYER: 'creditPeriodWithBuyer',
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED: 'requested',
    COMPANY_NAME: 'companyName',
    COMPANY_NUMBER: 'companyNumber',
    COUNTRY_CODE: 'countryCode',
  },
  USING_BROKER: 'isUsingBroker',
  BROKER_DETAILS: {
    NAME: 'name',
    EMAIL: shared_default.EMAIL,
    IS_BASED_IN_UK: 'isBasedInUk',
    BUILDING_NUMBER_OR_NAME: 'buildingNumberOrName',
    ADDRESS_LINE_1: 'addressLine1',
    ADDRESS_LINE_2: 'addressLine2',
    TOWN: 'town',
    COUNTY: 'county',
    POSTCODE: 'postcode',
    BROKER_NAME: 'broker.name',
    BROKER_EMAIL: 'broker.email',
    BROKER_BUILDING_NUMBER_OR_NAME: 'broker.buildingNumberOrName',
    BROKER_ADDRESS_LINE_1: 'broker.addressLine1',
    BROKER_ADDRESS_LINE_2: 'broker.addressLine2',
    BROKER_POSTCODE: 'broker.postcode',
  },
  BROKER_ADDRESSES: {
    SELECT_THE_ADDRESS: 'selectTheAddress',
  },
  BROKER_MANUAL_ADDRESS: {
    FULL_ADDRESS: 'fullAddress',
    BROKER_FULL_ADDRESS: 'broker.fullAddress',
  },
  LOSS_PAYEE: {
    IS_APPOINTED: 'isAppointed',
  },
  LOSS_PAYEE_DETAILS: {
    NAME: 'name',
    LOSS_PAYEE_NAME: 'lossPayee.name',
    LOCATION: 'location',
    IS_LOCATED_IN_UK: 'isLocatedInUk',
    IS_LOCATED_INTERNATIONALLY: 'isLocatedInternationally',
  },
  LOSS_PAYEE_FINANCIAL_UK: {
    SORT_CODE: 'sortCode',
    ACCOUNT_NUMBER: 'accountNumber',
  },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE: 'bicSwiftCode',
    IBAN: 'iban',
  },
  FINANCIAL_ADDRESS: 'bankAddress',
  LOSS_PAYEE_FINANCIAL_ADDRESS: 'lossPayee.bankAddress',
};
var policy_default = POLICY;

// constants/field-ids/insurance/business/index.ts
var EXPORTER_BUSINESS = {
  COMPANIES_HOUSE: {
    INPUT: 'companiesHouseNumber',
    COMPANY_NAME: 'companyName',
    COMPANY_ADDRESS: 'registeredOfficeAddress',
    COMPANY_NUMBER: 'companyNumber',
    COMPANY_INCORPORATED: 'dateOfCreation',
    COMPANY_SIC: 'sicCodes',
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: 'addressLine1',
      ADDRESS_LINE_2: 'addressLine2',
      CARE_OF: 'careOf',
      LOCALITY: 'locality',
      REGION: 'region',
      POSTAL_CODE: 'postalCode',
      COUNTRY: 'country',
      PREMISES: 'premises',
    },
  },
  YOUR_COMPANY: {
    YOUR_BUSINESS: 'yourBusiness',
    HAS_DIFFERENT_TRADING_ADDRESS: 'hasDifferentTradingAddress',
    HAS_DIFFERENT_TRADING_NAME: 'hasDifferentTradingName',
    DIFFERENT_TRADING_NAME: 'differentTradingName',
    WEBSITE: 'companyWebsite',
    PHONE_NUMBER: 'phoneNumber',
  },
  ALTERNATIVE_TRADING_ADDRESS: {
    FULL_ADDRESS: 'fullAddress',
    FULL_ADDRESS_DOT_NOTATION: 'alternativeTrading.fullAddress',
  },
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: 'goodsOrServicesSupplied',
    YEARS_EXPORTING: 'totalYearsExporting',
    EMPLOYEES_UK: 'totalEmployeesUK',
  },
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    ESTIMATED_ANNUAL_TURNOVER: 'estimatedAnnualTurnover',
    PERCENTAGE_TURNOVER: 'exportsTurnoverPercentage',
    TURNOVER_CURRENCY_CODE: 'turnoverCurrencyCode',
  },
  HAS_CREDIT_CONTROL: 'hasCreditControlProcess',
};
var business_default = EXPORTER_BUSINESS;

// constants/field-ids/insurance/export-contract/index.ts
var EXPORT_CONTRACT = {
  ...shared_default,
  HOW_WAS_THE_CONTRACT_AWARDED: {
    AWARD_METHOD: 'awardMethod',
    OTHER_AWARD_METHOD: 'otherAwardMethod',
  },
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: 'goodsOrServicesDescription',
    FINAL_DESTINATION_KNOWN: 'finalDestinationKnown',
    FINAL_DESTINATION: 'finalDestinationCountryCode',
  },
  HOW_WILL_YOU_GET_PAID: {
    PAYMENT_TERMS_DESCRIPTION: 'paymentTermsDescription',
  },
  PRIVATE_MARKET: {
    ATTEMPTED: 'attempted',
    DECLINED_DESCRIPTION: 'declinedDescription',
  },
  USING_AGENT: 'isUsingAgent',
  AGENT_DETAILS: {
    NAME: 'name',
    AGENT_NAME: 'agent.name',
    FULL_ADDRESS: 'fullAddress',
    AGENT_FULL_ADDRESS: 'agent.fullAddress',
    COUNTRY_CODE: 'countryCode',
    AGENT_COUNTRY_CODE: 'agent.countryCode',
  },
  AGENT_SERVICE: {
    IS_CHARGING: 'agentIsCharging',
    SERVICE_DESCRIPTION: 'serviceDescription',
  },
  AGENT_CHARGES: {
    METHOD: 'method',
    PAYABLE_COUNTRY_CODE: 'payableCountryCode',
    FIXED_SUM: 'fixedSum',
    FIXED_SUM_AMOUNT: 'fixedSumAmount',
    FIXED_SUM_CURRENCY_CODE: 'fixedSumCurrencyCode',
    PERCENTAGE: 'percentage',
    PERCENTAGE_CHARGE: 'percentageCharge',
  },
};
var export_contract_default = EXPORT_CONTRACT;

// constants/field-ids/insurance/your-buyer/index.ts
var YOUR_BUYER = {
  COMPANY_OR_ORGANISATION: {
    NAME: 'companyOrOrganisationName',
    ADDRESS: 'address',
    COUNTRY: 'country',
    REGISTRATION_NUMBER: 'registrationNumber',
    WEBSITE: 'website',
  },
  CONNECTION_WITH_BUYER: 'exporterIsConnectedWithBuyer',
  CONNECTION_WITH_BUYER_DESCRIPTION: 'connectionWithBuyerDescription',
  TRADED_WITH_BUYER: 'exporterHasTradedWithBuyer',
  OUTSTANDING_PAYMENTS: 'outstandingPayments',
  TOTAL_OUTSTANDING_PAYMENTS: 'totalOutstandingPayments',
  TOTAL_AMOUNT_OVERDUE: 'totalOverduePayments',
  FAILED_PAYMENTS: 'failedPayments',
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: 'exporterHasPreviousCreditInsuranceWithBuyer',
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: 'previousCreditInsuranceWithBuyerDescription',
  HAS_BUYER_FINANCIAL_ACCOUNTS: 'exporterHasBuyerFinancialAccounts',
};
var your_buyer_default = YOUR_BUYER;

// constants/field-ids/insurance/declarations/index.ts
var DECLARATIONS = {
  AGREE_CONFIDENTIALITY: 'agreeToConfidentiality',
  AGREE_ANTI_BRIBERY: 'agreeToAntiBribery',
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: 'hasAntiBriberyCodeOfConduct',
  WILL_EXPORT_WITH_CODE_OF_CONDUCT: 'willExportWithAntiBriberyCodeOfConduct',
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS: 'agreeToConfirmationAndAcknowledgements',
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: 'willAdhereToAllRequirements',
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: 'hasNoOffensesOrInvestigations',
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: 'isNotAwareOfExistingSlavery',
    CONDITIONAL_REASONS: {
      CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 'cannotAdhereToAllRequirements',
      OFFENSES_OR_INVESTIGATIONS: 'offensesOrInvestigations',
      AWARE_OF_EXISTING_SLAVERY: 'awareOfExistingSlavery',
    },
  },
};
var declarations_default = DECLARATIONS;

// constants/field-ids/insurance/check-your-answers/index.ts
var CHECK_YOUR_ANSWERS = {
  ELIGIBILITY: 'eligibility',
  EXPORTER_BUSINESS: 'business',
  BUYER: 'buyer',
  POLICY: 'policy',
  EXPORT_CONTRACT: 'exportContract',
};
var check_your_answers_default = CHECK_YOUR_ANSWERS;

// constants/field-ids/insurance/index.ts
var INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...shared_eligibility_default,
    ...shared_default2,
    HAS_COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    COMPANIES_HOUSE_NUMBER: 'companyNumber',
    TOTAL_CONTRACT_VALUE: 'totalContractValue',
    TOTAL_CONTRACT_VALUE_ID: 'totalContractValueId',
    COVER_PERIOD: 'coverPeriod',
    COVER_PERIOD_ID: 'coverPeriodId',
    HAS_END_BUYER: 'hasEndBuyer',
    HAVE_AN_ACCOUNT: 'haveAnAccount',
    HAS_REVIEWED_ELIGIBILITY: 'hasReviewedEligibility',
    IS_PARTY_TO_CONSORTIUM: 'isPartyToConsortium',
    IS_MEMBER_OF_A_GROUP: 'isMemberOfAGroup',
  },
  ...shared_default2,
  CURRENCY: {
    CURRENCY_CODE: 'currencyCode',
    ALTERNATIVE_CURRENCY_CODE: 'alternativeCurrencyCode',
  },
  SUBMISSION_DEADLINE: 'submissionDeadline',
  ACCOUNT: account_default,
  POLICY: policy_default,
  EXPORTER_BUSINESS: business_default,
  EXPORT_CONTRACT: export_contract_default,
  YOUR_BUYER: your_buyer_default,
  DECLARATIONS: declarations_default,
  CHECK_YOUR_ANSWERS: check_your_answers_default,
};
var insurance_default = INSURANCE_FIELD_IDS;

// constants/field-ids/index.ts
var FIELD_IDS = {
  ...shared_default,
  ...shared_eligibility_default,
  INSURANCE: insurance_default,
};

// constants/allowed-graphql-resolvers/index.ts
var dotenv = __toESM(require('dotenv'));
dotenv.config();
var { NODE_ENV } = process.env;
var isDevEnvironment = NODE_ENV === 'development';
var DEFAULT_RESOLVERS = [
  // application
  'updateBroker',
  'updateBusiness',
  'updateBuyer',
  'updateBuyerRelationship',
  'updateBuyerTradingHistory',
  'updateCompany',
  'updateDeclaration',
  'updateDeclarationModernSlavery',
  'updateNominatedLossPayee',
  'updateJointlyInsuredParty',
  'updatePolicy',
  'updatePolicyContact',
  'updateExportContract',
  'updateExportContractAgent',
  'updateExportContractAgentService',
  'updateExportContractAgentServiceCharge',
  'updatePrivateMarket',
  'updateSectionReview',
  'updateEligibility',
  'updateCompanyDifferentTradingAddress',
  'referenceNumber',
  'applications',
  // account
  'account',
  'updateAccount',
  // misc
  'countries',
];
var CUSTOM_RESOLVERS = [
  // account
  'accountPasswordReset',
  'accountSignIn',
  'accountSignInSendNewCode',
  'createAnAccount',
  'sendEmailConfirmEmailAddress',
  'sendEmailPasswordResetLink',
  'sendEmailReactivateAccountLink',
  'updateLossPayeeFinancialDetailsUk',
  'updateLossPayeeFinancialDetailsInternational',
  'verifyAccountEmailAddress',
  'verifyAccountPasswordResetToken',
  'verifyAccountReactivationToken',
  'verifyAccountSignInCode',
  // application
  'createAnApplication',
  'declarationAntiBriberies',
  'declarationConfirmationAndAcknowledgements',
  'declarationHowDataWillBeUseds',
  'deleteApplicationByReferenceNumber',
  'getApplicationByReferenceNumber',
  'getCompaniesHouseInformation',
  'getOrdnanceSurveyAddresses',
  'submitApplication',
  // feedback
  'createFeedbackAndSendEmail',
  // countries and currencies
  'getApimCisCountries',
  'getApimCurrencies',
  'getCountriesAndCurrencies',
];
var DEV_ENVIRONMENT_CUSTOM_RESOLVERS = [
  'accounts',
  'addAndGetOTP',
  'createApplications',
  'createAnAbandonedApplication',
  'createManyApplications',
  'createBuyer',
  'deleteAnAccount',
  'deleteApplications',
  'getAccountPasswordResetToken',
  'updateAccountStatus',
];
if (isDevEnvironment) {
  CUSTOM_RESOLVERS.push(...DEV_ENVIRONMENT_CUSTOM_RESOLVERS);
}
var ALLOWED_GRAPHQL_RESOLVERS = [...DEFAULT_RESOLVERS, ...CUSTOM_RESOLVERS];

// constants/supported-currencies/index.ts
var SUPPORTED_CURRENCIES = ['EUR', 'GBP', 'JPY', 'USD'];
var GBP = 'GBP';

// constants/application/versions/index.ts
var VERSION_1 = {
  VERSION_NUMBER: '1',
  OVER_500K_SUPPORT: false,
  MAXIMUM_BUYER_CAN_OWE: 5e5,
  TOTAL_VALUE_OF_CONTRACT: 5e5,
  DEFAULT_FINAL_DESTINATION_KNOWN: true,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: true,
};
var VERSION_2 = {
  VERSION_NUMBER: '2',
  OVER_500K_SUPPORT: true,
  DEFAULT_FINAL_DESTINATION_KNOWN: null,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
  DEFAULT_CURRENCY: GBP,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
};
var VERSION_3 = {
  ...VERSION_2,
  VERSION_NUMBER: '3',
  REQUESTED_CREDIT_LIMIT_REQUIRED: true,
  SMALL_EXPORT_BUILDER: {
    MAXIMUM_BUYER_WILL_OWE: 25e3,
  },
};
var VERSION_4 = {
  ...VERSION_3,
  VERSION_NUMBER: '4',
  DECLARATIONS_MODERN_SLAVERY: true,
};
var VERSION_5 = {
  ...VERSION_4,
  VERSION_NUMBER: '5',
  BROKER_ADDRESS_LOOKUP: true,
};
var VERSIONS = [VERSION_1, VERSION_2, VERSION_3, VERSION_4, VERSION_5];
var versions_default = VERSIONS;

// constants/application/get-application-definition/index.ts
var getApplicationDefinition = (versionNumber) => {
  const applicationDefinition = versions_default.find((VERSION) => VERSION.VERSION_NUMBER === versionNumber);
  if (applicationDefinition) {
    return applicationDefinition;
  }
  console.error('Unable to find latest application version');
  throw new Error('Unable to find latest application version');
};
var get_application_definition_default = getApplicationDefinition;

// constants/application/versions/latest.ts
var LATEST_VERSION_NUMBER = versions_default[versions_default.length - 1].VERSION_NUMBER;
var latest_default = LATEST_VERSION_NUMBER;

// constants/application/index.ts
var LATEST_VERSION = get_application_definition_default(latest_default);
var APPLICATION = {
  LATEST_VERSION,
  LATEST_VERSION_NUMBER: latest_default,
  DEAL_TYPE: 'EXIP',
  SUBMISSION_COUNT_DEFAULT: 0,
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_DEADLINE_IN_DAYS: 30,
  ALL_SECTIONS_ROUTE: '/all-sections',
  SUBMISSION_DEADLINE_EMAIL: {
    REMINDER_DAYS: 2,
    START_TIME_LIMIT_HOURS: 0,
    START_TIME_LIMIT_MINUTES: 0,
    START_TIME_LIMIT_SECONDS: 0,
    START_TIME_LIMIT_MS: 0,
    END_TIME_LIMIT_HOURS: 23,
    END_TIME_LIMIT_MINUTES: 59,
    END_TIME_LIMIT_SECONDS: 59,
    END_TIME_LIMIT_MS: 999,
  },
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
  },
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
    ABBREVIATED: {
      SINGLE: 'Single',
      MULTIPLE: 'Multiple',
    },
  },
  POLICY: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: LATEST_VERSION.TOTAL_VALUE_OF_CONTRACT,
    },
    TOTAL_MONTHS_OF_COVER: {
      MINIMUM: 1,
      MAXIMUM: 12,
    },
    MAXIMUM_BUYER_CAN_OWE: LATEST_VERSION.MAXIMUM_BUYER_CAN_OWE,
  },
  STATUS: {
    IN_PROGRESS: 'In progress',
    SUBMITTED: 'Submitted to UKEF',
    ABANDONED: 'Abandoned',
  },
  DEFAULT_FINAL_DESTINATION_KNOWN: LATEST_VERSION.DEFAULT_FINAL_DESTINATION_KNOWN,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: LATEST_VERSION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
  DEFAULT_CURRENCY: LATEST_VERSION.DEFAULT_CURRENCY,
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: {
        FIXED_SUM: 'Fixed sum',
        PERCENTAGE: 'Percentage',
      },
    },
  },
  GET_QUERY:
    'id eligibility { id } buyer { id companyOrOrganisationName } company { id } declaration { id } exportContract { id } nominatedLossPayee { id } policy { id } sectionReview { id } owner { id email firstName lastName } referenceNumber submissionDeadline status ',
  VERSIONS: versions_default,
};
var application_default = APPLICATION;

// constants/cover-period/index.ts
var COVER_PERIOD = {
  LESS_THAN_2_YEARS: {
    DB_ID: 1,
    VALUE: '1 to 24 months',
  },
  MORE_THAN_2_YEARS: {
    DB_ID: 2,
    VALUE: 'More than 2 years',
  },
};

// constants/cron/index.ts
var CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED = 'Update unverified accounts (over 24hrs) to isInactive';
var CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE = `Update inactive applications (over ${APPLICATION.SUBMISSION_DEADLINE_IN_DAYS}) to Abandoned`;
var CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL = 'Email application submission deadline reminder';

// constants/date-format.ts
var DATE_FORMAT = {
  DEFAULT: 'd MMMM yyyy',
  HOURS_AND_MINUTES: 'HH:mm',
  SHORT_MONTH: 'd MMM yyyy',
  XLSX: 'dd-MMM-yy',
};

// constants/declarations/versions/index.ts
var VERSION_12 = {
  ANTI_BRIBERY: '1',
  ANTI_BRIBERY_CODE_OF_CONDUCT: '1',
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
  CONFIDENTIALITY: '1',
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
  HOW_YOUR_DATA_WILL_BE_USED: '1',
};
var VERSION_22 = {
  ANTI_BRIBERY: '2',
  ANTI_BRIBERY_CODE_OF_CONDUCT: '2',
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
  CONFIDENTIALITY: '1',
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
};
var VERSION_32 = {
  ...VERSION_22,
  MODERN_SLAVERY: '1',
};
var DECLARATION_VERSIONS = [VERSION_12, VERSION_22, VERSION_32];
var versions_default2 = DECLARATION_VERSIONS;

// constants/declarations/modern-slavery-versions/index.ts
var VERSION_13 = {
  WILL_ADHERE_TO_ALL_REQUIREMENTS: '1',
  HAS_NO_OFFENSES_OR_INVESTIGATIONS: '1',
  IS_NOT_AWARE_OF_EXISTING_SLAVERY: '1',
};
var DECLARATION_MODERN_SLAVERY_VERSIONS = [VERSION_13];
var modern_slavery_versions_default = DECLARATION_MODERN_SLAVERY_VERSIONS;

// constants/declarations/index.ts
var DECLARATIONS2 = {
  VERSIONS: versions_default2,
  V1_DECLARATIONS: versions_default2[0],
  LATEST_DECLARATIONS: versions_default2[versions_default2.length - 1],
  MODREN_SLAVERY_VERSIONS: modern_slavery_versions_default,
  LATEST_MODERN_SLAVERY_DECLARATIONS: modern_slavery_versions_default[modern_slavery_versions_default.length - 1],
};
var declarations_default2 = DECLARATIONS2;

// constants/eligibility.ts
var ELIGIBILITY = {
  MAX_COVER_AMOUNT_IN_GBP: 5e5,
  MAX_COVER_PERIOD_MONTHS: 24,
  MAX_COVER_PERIOD_YEARS: 2,
};

// constants/export-contract-award-method/index.ts
var EXPORT_CONTRACT_AWARD_METHOD = {
  OPEN_TENDER: {
    DB_ID: 'eg9qxlqw4edxa8b5mwbybsrfp',
    VALUE: 'Open tender',
  },
  NEGOTIATED_CONTRACT: {
    DB_ID: 'mzwp337piamg1mei7fqh1o73s',
    VALUE: 'Negotiated contract',
  },
  DIRECT_AWARD: {
    DB_ID: 'qnqrle4xwsj5go8pchj31sat4',
    VALUE: 'Direct award',
  },
  COMPETITIVE_BIDDING: {
    DB_ID: 'qw2hp8khykctdic2z58z70ru8',
    VALUE: 'Competitive bidding',
  },
  OTHER: {
    DB_ID: 'tn8k8lot1bvirmztmmgq2u8hn',
    VALUE: 'Other',
  },
};

// constants/external-apis.ts
var EXTERNAL_API_DEFINITIONS = {
  CIS: {
    ESRA_CLASSIFICATION: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard Risk',
      NONE: 'None',
    },
    SHORT_TERM_COVER: {
      YES: 'Yes',
      NO: 'No',
      ILC: 'ILC Only',
      CILC: 'CILC Only',
      REFER: 'Refer',
      UNLISTED: 'Unlisted',
    },
    NBI_ISSUE_AVAILABLE: {
      YES: 'Y',
      NO: 'N',
    },
    NO_COVER: 'Off cover',
    INVALID_COUNTRIES: [
      'CABEI',
      'Cor Andino Fom',
      'Eastern and Southern African Trade and Development Bank',
      'EC Market n/k',
      'Non EC Market n/k',
      'Non UK',
      'Third Country',
    ],
    INVALID_CURRENCIES: ['Gold'],
    COUNTRY_RATINGS: {
      A: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-'],
      B: ['BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'BB-', 'B+', 'B', 'B-'],
      C: ['CCC+', 'CCC', 'CCC-', 'CC', 'C'],
      D: ['D'],
      NOT_APPLICABLE: 'N/A',
    },
  },
  COMPANIES_HOUSE: {
    COMPANY_STATUS: {
      ACTIVE: 'active',
    },
  },
};
var EXTERNAL_API_MAPPINGS = {
  CIS: {
    ESRA_CLASSIFICATION: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard',
    },
  },
};
var EXTERNAL_API_ENDPOINTS = {
  APIM_MDM: {
    CURRENCY: '/currencies',
    CURRENCY_EXCHANGE: '/currencies/exchange',
    EMAIL: '/emails',
    INDUSTRY_SECTORS: '/sector-industries',
    MARKETS: '/markets',
  },
};

// constants/field-values/index.ts
var { POLICY_TYPE, POLICY: POLICY2 } = application_default;
var FIELD_VALUES = {
  OPTIONAL_COOKIES: {
    ACCEPT: 'accept',
    REJECT: 'reject',
  },
  POLICY_TYPE: {
    SINGLE: POLICY_TYPE.SINGLE,
    MULTIPLE: POLICY_TYPE.MULTIPLE,
  },
  POLICY_LENGTH: {
    // default multiple policy length in months
    MULTIPLE: 12,
  },
  TOTAL_MONTHS_OF_COVER: Array.from(Array(POLICY2.TOTAL_MONTHS_OF_COVER.MAXIMUM).keys()),
  YES: 'Yes',
  NO: 'No',
};

// constants/total-contract-value/index.ts
var TOTAL_CONTRACT_VALUE = {
  LESS_THAN_500K: {
    DB_ID: 1,
    VALUE: 'Less than 500k',
  },
  MORE_THAN_500K: {
    DB_ID: 2,
    VALUE: 'More than 500k',
  },
  LESS_THAN_250K: {
    DB_ID: 3,
    VALUE: 'Less than 250k',
  },
  MORE_THAN_250K: {
    DB_ID: 4,
    VALUE: 'More than 250k',
  },
  AMOUNT_250K: 25e4,
};

// constants/XLSX-CONFIG/index.ts
var XLSX_CONFIG = {
  KEY: 'field',
  VALUE: 'answer',
  COLUMN_WIDTH: 85,
  ADDITIONAL_TITLE_COLUMN_HEIGHT: 25,
  ADDITIONAL_COLUMN_HEIGHT: 50,
  LARGE_ADDITIONAL_COLUMN_HEIGHT: 50 * 2,
  FONT_SIZE: {
    DEFAULT: 11,
    TITLE: 14,
  },
};

// constants/validation.ts
var MAXIMUM_CHARACTERS = {
  ABOUT_GOODS_OR_SERVICES_DESCRIPTION: 1e3,
  ACCOUNT_NUMBER: 8,
  ACCOUNT: {
    NAME: 400,
  },
  AGENT_NAME: 800,
  AGENT_SERVICE_DESCRIPTION: 1e3,
  BIC_SWIFT_CODE: 11,
  BROKER_NAME: 800,
  BROKER_BUILDING_NUMBER_OR_NAME: 100,
  BUSINESS: {
    GOODS_OR_SERVICES_DESCRIPTION: 1e3,
  },
  BUYER: {
    COMPANY_OR_ORGANISATION: 200,
    REGISTRATION_NUMBER: 200,
    PREVIOUS_CREDIT_INSURANCE_COVER: 1e3,
  },
  COMPANY_DIFFERENT_TRADING_NAME: 200,
  CONNECTION_WITH_BUYER_DESCRIPTION: 1e3,
  CREDIT_PERIOD_WITH_BUYER: 1e3,
  DECLARATIONS: {
    MODERN_SLAVERY: {
      CONDITIONAL_REASON: 1e3,
    },
  },
  DECLINED_BY_PRIVATE_MARKET_DESCRIPTION: 1e3,
  DIFFERENT_NAME_ON_POLICY_POSITION: 50,
  DIFFERENT_NAME_ON_POLICY: 50,
  EMAIL: 300,
  EXPORT_CONTRACT: {
    OTHER_AWARD_METHOD: 200,
  },
  FEEDBACK: {
    IMPROVEMENT: 1200,
    OTHER_COMMENTS: 1200,
  },
  FULL_ADDRESS: 500,
  IBAN: 34,
  LOSS_PAYEE_NAME: 200,
  NAME_ON_POLICY_POSITION: 50,
  PAYMENT_TERMS_DESCRIPTION: 1e3,
  PERCENTAGE: 100,
  POLICY_CONTACT_NAME: 400,
  QUOTE: {
    CREDIT_PERIOD: 2,
  },
  REQUESTED_JOINTLY_INSURED_PARTY: {
    COMPANY_NAME: 200,
    COMPANY_NUMBER: 100,
  },
  SORT_CODE: 6,
};

// constants/index.ts
import_dotenv.default.config();
var GBP_CURRENCY_CODE = 'GBP';
var DATE_24_HOURS_FROM_NOW = () => {
  const now2 = /* @__PURE__ */ new Date();
  const day = now2.getDate();
  const tomorrow = new Date(now2.setDate(day + 1));
  return tomorrow;
};
var DATE_24_HOURS_IN_THE_PAST = () => {
  const now2 = /* @__PURE__ */ new Date();
  const day = now2.getDate();
  const yesterday = new Date(now2.setDate(day - 1));
  return yesterday;
};
var DATE_30_MINUTES_FROM_NOW = () => {
  const now2 = /* @__PURE__ */ new Date();
  const minutes = 30;
  const milliseconds = 6e4;
  const future = new Date(now2.getTime() + minutes * milliseconds);
  return future;
};
var ACCOUNT2 = {
  EMAIL: {
    VERIFICATION_EXPIRY: DATE_24_HOURS_FROM_NOW,
  },
  ENCRYPTION: {
    RANDOM_BYTES_SIZE: 32,
    STRING_TYPE: 'hex',
    PBKDF2: {
      ITERATIONS: 1e4,
      DIGEST_ALGORITHM: 'sha512',
    },
    PASSWORD: {
      PBKDF2: {
        KEY_LENGTH: 64,
      },
    },
    OTP: {
      PBKDF2: {
        KEY_LENGTH: 128,
      },
    },
  },
  PASSWORD_RESET_EXPIRY: DATE_30_MINUTES_FROM_NOW,
  // One time password
  OTP: {
    DIGITS: 6,
    VERIFICATION_EXPIRY: DATE_30_MINUTES_FROM_NOW,
  },
  REACTIVATION_EXPIRY: DATE_24_HOURS_FROM_NOW,
  // JSON web token
  JWT: {
    KEY: {
      SIGNATURE: String(process.env.JWT_SIGNING_KEY),
      ENCODING: 'base64',
      STRING_ENCODING: 'ascii',
    },
    TOKEN: {
      EXPIRY: '12h',
      ALGORITHM: 'RS256',
    },
    SESSION_EXPIRY: () => {
      const now2 = /* @__PURE__ */ new Date();
      const hours = 12;
      const seconds = 60 * 60 * 1e3;
      const future = new Date(now2.getTime() + hours * seconds);
      return future;
    },
  },
  MAX_AUTH_RETRIES: 6,
  /**
   * MAX_AUTH_RETRIES_TIMEFRAME
   * Generate a date that is 24 hours ago from now
   * To be safe, we use time rather than subtracting a day.
   */
  MAX_AUTH_RETRIES_TIMEFRAME: DATE_24_HOURS_IN_THE_PAST(),
};
var DEFAULT_ENCRYPTION_SAVE_OBJECT = {
  value: '',
  iv: '',
};
var FINANCIAL_DETAILS = {
  ENCRYPTION: {
    CIPHER: {
      ENCODING: 'hex',
      STRING_ENCODING: 'base64',
      ENCRYPTION_METHOD: 'aes-256-cbc',
      OUTPUT_ENCODING: 'utf-8',
    },
    KEY: {
      ALGORITHM: 'sha512',
      SIGNATURE: String(process.env.LOSS_PAYEE_ENCRYPTION_KEY),
      SUBSTRING_INDEX_START: 0,
      SUBSTRING_INDEX_END: 32,
    },
    IV: {
      BYTES_SIZE: 16,
      ENCODING: 'base64',
      SLICE_INDEX_START: 0,
      SLICE_INDEX_END: 16,
    },
  },
};
var EMAIL_TEMPLATE_IDS = {
  ACCOUNT: {
    CONFIRM_EMAIL: '24022e94-171c-4044-b0ee-d22418116575',
    ACCESS_CODE: 'b92650d1-9187-4510-ace2-5eec7ca7e626',
    PASSWORD_RESET: '86d5f582-e1d3-4b55-b103-50141401fd13',
    REACTIVATE_ACCOUNT_CONFIRM_EMAIL: '2abf173a-52fc-4ec8-b28c-d7a862b8cf37',
  },
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: {
        CONFIRMATION: {
          SINGLE_OR_MULTIPLE_CONTRACT_POLICY: '2e9084e2-d871-4be7-85d0-0ccc1961b148',
          MULTIPLE_CONTRACT_POLICY: {
            ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION: '7ee4729d-53ba-4729-af50-f733870914de',
          },
        },
        SEND_DOCUMENTS: {
          TRADING_HISTORY: '1ae4d77e-58d6-460e-99c0-b62bf08d8c52',
          ANTI_BRIBERY: '002e43e3-ca78-4b9c-932f-6833014bb1e4',
          ANTI_BRIBERY_AND_TRADING_HISTORY: '49753c34-24b5-4cad-a7c5-1ab32d711dfe',
        },
      },
      UNDERWRITING_TEAM: {
        NOTIFICATION_TRADING_HISTORY: '34457439-bf9c-46e3-bd05-b8732ed682fb',
        NOTIFICATION_ANTI_BRIBERY: '8be12c98-b2c7-4992-8920-925aa37b6391',
        NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY: '7f0541dd-1dae-4d51-9ebc-87d2a624f8d2',
        NO_DOCUMENTS: '65b517c6-ae86-470b-9448-194ae5ac44bb',
      },
      DEADLINE_REMINDER: 'e8e5ba73-96da-46f1-b96e-2b1909be6f3d',
    },
  },
  FEEDBACK: {
    INSURANCE: '4d3d7944-e894-4527-aee6-692038c84107',
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID: 'UNABLE_TO_DETERMINE_TEMPLATE_ID',
};
var FEEDBACK = {
  VERY_SATISFIED: 'verySatisfied',
  SATISFIED: 'satisfied',
  NEITHER: 'neither',
  DISSATISFIED: 'dissatisfied',
  VERY_DISSATISIFED: 'veryDissatisfied',
  EMAIL_TEXT: {
    verySatisfied: 'Very satisfied',
    satisfied: 'Satisfied',
    neither: 'Neither satisfied or dissatisfied',
    dissatisfied: 'Dissatisfied',
    veryDissatisfied: 'Very dissatisfied',
  },
};
var ACCEPTED_FILE_TYPES = ['.xlsx'];
var ORDNANCE_SURVEY_QUERY_URL = '/search/places/v1/postcode?postcode=';

// cron/account/unverified-account-cron-job.ts
import_dotenv2.default.config();
var { CRON_SCHEDULE_UNVERIFIED_ACCOUNT } = process.env;
var updateUnverifiedAccountsJob = {
  cronExpression: String(CRON_SCHEDULE_UNVERIFIED_ACCOUNT),
  description: CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED,
  task: update_unverified_accounts_default,
};
var unverified_account_cron_job_default = updateUnverifiedAccountsJob;

// cron/account/index.ts
var accountCronSchedulerJobs = [unverified_account_cron_job_default];
var account_default2 = accountCronSchedulerJobs;

// cron/application/inactive-application-cron-job.ts
var import_dotenv3 = __toESM(require('dotenv'));

// helpers/get-inactive-applications/index.ts
var { IN_PROGRESS } = APPLICATION.STATUS;
var getInactiveApplications = async (context) => {
  try {
    console.info('Getting inactive applications - getInactiveApplications helper');
    const applications = await context.query.Application.findMany({
      where: {
        AND: [{ status: { in: [IN_PROGRESS] } }, { submissionDeadline: { lt: /* @__PURE__ */ new Date() } }],
      },
      query: 'id status',
    });
    return applications;
  } catch (error) {
    console.error('Error getting inactive applications (getInactiveApplications helper) %o', error);
    throw new Error(`Error getting inactive applications (getInactiveApplications helper) ${error}`);
  }
};
var get_inactive_applications_default = getInactiveApplications;

// helpers/map-inactive-applications/index.ts
var mapInactiveApplications = (applications) => {
  const mappedArray = applications.map((application2) => {
    const mapped = {
      where: { id: application2.id },
      data: {
        status: APPLICATION.STATUS.ABANDONED,
        previousStatus: application2.status,
        updatedAt: /* @__PURE__ */ new Date(),
      },
    };
    return mapped;
  });
  return mappedArray;
};
var map_inactive_applications_default = mapInactiveApplications;

// helpers/map-and-update-inactive-applications/index.ts
var mapAndUpdateInactiveApplications = async (applications, context) => {
  try {
    console.info('Mapping and updating inactive applications - mapAndUpdateInactiveApplications');
    const updateData = map_inactive_applications_default(applications);
    await context.db.Application.updateMany({
      data: updateData,
    });
  } catch (error) {
    console.error('Error mapping and updating inactive applications %o', error);
    throw new Error(`Error mapping and updating inactive applications ${error}`);
  }
};
var map_and_update_inactive_applications_default = mapAndUpdateInactiveApplications;

// helpers/update-inactive-applications/index.ts
var updateInactiveApplications = async (context) => {
  try {
    console.info('Getting and updating inactive applications');
    const applications = await get_inactive_applications_default(context);
    if (applications.length) {
      await map_and_update_inactive_applications_default(applications, context);
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error getting and updating inactive applications %o', error);
    throw new Error(`Error getting and updating inactive applications ${error}`);
  }
};
var update_inactive_applications_default = updateInactiveApplications;

// cron/application/inactive-application-cron-job.ts
import_dotenv3.default.config();
var { CRON_SCHEDULE_INACTIVE_APPLICATION } = process.env;
var updateInactiveApplicationsJob = {
  cronExpression: String(CRON_SCHEDULE_INACTIVE_APPLICATION),
  description: CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE,
  task: update_inactive_applications_default,
};
var inactive_application_cron_job_default = updateInactiveApplicationsJob;

// cron/application/email-submission-deadline-reminder-cron-job.ts
var import_dotenv8 = __toESM(require('dotenv'));

// helpers/get-start-and-end-time-of-date/index.ts
var {
  START_TIME_LIMIT_HOURS,
  START_TIME_LIMIT_MINUTES,
  START_TIME_LIMIT_MS,
  START_TIME_LIMIT_SECONDS,
  END_TIME_LIMIT_HOURS,
  END_TIME_LIMIT_MINUTES,
  END_TIME_LIMIT_MS,
  END_TIME_LIMIT_SECONDS,
} = APPLICATION.SUBMISSION_DEADLINE_EMAIL;
var getStartAndEndTimeOfDate = (date) => {
  const startSet = date.setHours(START_TIME_LIMIT_HOURS, START_TIME_LIMIT_MINUTES, START_TIME_LIMIT_SECONDS, START_TIME_LIMIT_MS);
  const endSet = date.setHours(END_TIME_LIMIT_HOURS, END_TIME_LIMIT_MINUTES, END_TIME_LIMIT_SECONDS, END_TIME_LIMIT_MS);
  return {
    startTime: new Date(startSet),
    endTime: new Date(endSet),
  };
};
var get_start_and_end_time_of_date_default = getStartAndEndTimeOfDate;

// helpers/date/index.ts
var import_date_fns = require('date-fns');
var dateIsInThePast = (targetDate) => {
  const now2 = /* @__PURE__ */ new Date();
  return (0, import_date_fns.isAfter)(now2, targetDate);
};
var dateInTheFutureByDays = (date, days) => new Date(date.setDate(date.getDate() + days));

// helpers/get-expiring-applications/index.ts
var { IN_PROGRESS: IN_PROGRESS2 } = APPLICATION.STATUS;
var { REMINDER_DAYS } = APPLICATION.SUBMISSION_DEADLINE_EMAIL;
var getExpiringApplications = async (context) => {
  try {
    console.info('Getting expiring applications - getExpiringApplications helper');
    const today = /* @__PURE__ */ new Date();
    const reminderDays = dateInTheFutureByDays(today, REMINDER_DAYS);
    const { startTime, endTime } = get_start_and_end_time_of_date_default(reminderDays);
    const applications = await context.query.Application.findMany({
      where: {
        AND: [{ status: { in: [IN_PROGRESS2] } }, { submissionDeadline: { gte: startTime, lte: endTime } }],
      },
      query: APPLICATION.GET_QUERY,
    });
    return applications;
  } catch (error) {
    console.error('Error getting expiring applications (getExpiringApplications helper) %o', error);
    throw new Error(`Error getting expiring applications (getExpiringApplications helper) ${error}`);
  }
};
var get_expiring_applications_default = getExpiringApplications;

// helpers/format-date/index.ts
var import_date_fns2 = require('date-fns');
var formatDate = (timestamp3, dateFormat = DATE_FORMAT.DEFAULT) => (0, import_date_fns2.format)(new Date(timestamp3), dateFormat);
var format_date_default = formatDate;

// helpers/generate-application-url/index.ts
var import_dotenv4 = __toESM(require('dotenv'));
import_dotenv4.default.config();
var baseUrl = String(process.env.APPLICATION_URL);
var generateApplicationUrl = (referenceNumber) => `${baseUrl}/${referenceNumber}${APPLICATION.ALL_SECTIONS_ROUTE}`;
var generate_application_url_default = generateApplicationUrl;

// helpers/map-application-submission-deadline-variables/index.ts
var mapApplicationSubmissionDeadlineVariables = (application2) => {
  const { submissionDeadline, owner, referenceNumber, buyer } = application2;
  const { email, firstName, lastName } = owner;
  const { companyOrOrganisationName } = buyer;
  return {
    email,
    name: `${firstName} ${lastName}`,
    referenceNumber: String(referenceNumber),
    applicationUrl: generate_application_url_default(referenceNumber),
    buyerName: application2.buyer.companyOrOrganisationName ? String(companyOrOrganisationName) : '',
    submissionDeadline: format_date_default(new Date(submissionDeadline)),
  };
};
var map_application_submission_deadline_variables_default = mapApplicationSubmissionDeadlineVariables;

// emails/index.ts
var import_dotenv7 = __toESM(require('dotenv'));

// integrations/APIM/index.ts
var import_axios = __toESM(require('axios'));
var import_dotenv5 = __toESM(require('dotenv'));
import_dotenv5.default.config();
var { APIM_MDM_URL, APIM_MDM_KEY, APIM_MDM_VALUE, GOV_NOTIFY_API_KEY } = process.env;
var { APIM_MDM } = EXTERNAL_API_ENDPOINTS;
var statusIsValid = (status, expectedStatus = 200) => status === expectedStatus;
var responseIsValid = (response, expectedStatus) => {
  if (response.data && statusIsValid(response.status, expectedStatus)) {
    return true;
  }
  return false;
};
var APIM = {
  getCisCountries: async () => {
    try {
      console.info('Calling APIM - CIS countries');
      const response = await (0, import_axios.default)({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.MARKETS}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        validateStatus: (status) => statusIsValid(status),
      });
      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - CIS countries %o', error);
      throw new Error(`Calling APIM - CIS countries ${error}`);
    }
  },
  getCurrencies: async () => {
    try {
      console.info('Calling APIM - currencies');
      const response = await (0, import_axios.default)({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.CURRENCY}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        validateStatus: (status) => statusIsValid(status),
      });
      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - currencies %o', error);
      throw new Error(`Calling APIM - currencies ${error}`);
    }
  },
  getCurrenciesExchange: async (source, target) => {
    try {
      console.info('Calling APIM - currencies exchange');
      const response = await (0, import_axios.default)({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.CURRENCY_EXCHANGE}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        params: { source, target },
        validateStatus: (status) => statusIsValid(status),
      });
      if (responseIsValid(response)) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      console.error('Error calling APIM - currencies exchange %o', error);
      throw new Error(`Calling APIM - currencies exchange ${error}`);
    }
  },
  /**
   * sendEmail
   * Send an email via APIM
   * @param {String} templateId: Template ID
   * @param {String} sendToEmailAddress: Email recipient
   * @param {Object} personalisation: Custom variables for the email template
   * @returns {ApimSendEmailHelperResponse}
   */
  sendEmail: async (templateId, sendToEmailAddress, personalisation) => {
    try {
      console.info('Calling APIM - send email - templateId %s', templateId);
      const response = await (0, import_axios.default)({
        method: 'post',
        url: `${APIM_MDM_URL}${APIM_MDM.EMAIL}`,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
          govUkNotifyKey: GOV_NOTIFY_API_KEY,
        },
        data: {
          templateId,
          sendToEmailAddress,
          personalisation,
        },
        validateStatus: (status) => statusIsValid(status, 201),
      });
      if (responseIsValid(response, 201)) {
        return {
          success: true,
          emailRecipient: sendToEmailAddress,
        };
      }
      return {
        success: false,
        emailRecipient: sendToEmailAddress,
      };
    } catch (error) {
      console.error('Error calling APIM - send email %o', error);
      throw new Error(`Calling APIM - send email ${error}`);
    }
  },
};
var APIM_default = APIM;

// emails/confirm-email-address/index.ts
var confirmEmailAddress = async (emailAddress, urlOrigin, name, verificationHash, id) => {
  try {
    console.info('Sending confirm email address email');
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;
    const variables = { urlOrigin, name, confirmToken: verificationHash, id };
    const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
    return response;
  } catch (error) {
    console.error('Error sending confirm email address email %o', error);
    throw new Error(`Sending confirm email address email ${error}`);
  }
};

// emails/access-code-email/index.ts
var accessCodeEmail = async (emailAddress, name, securityCode) => {
  try {
    console.info('Sending access code email for account sign in');
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.ACCESS_CODE;
    const variables = { name, securityCode };
    const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
    return response;
  } catch (error) {
    console.error('Error sending access code email for account sign in %o', error);
    throw new Error(`Sending access code email for account sign in ${error}`);
  }
};

// emails/password-reset-link/index.ts
var passwordResetLink = async (urlOrigin, emailAddress, name, passwordResetHash) => {
  try {
    console.info('Sending email for account password reset');
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;
    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };
    const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
    return response;
  } catch (error) {
    console.error('Error sending email for account password reset %o', error);
    throw new Error(`Sending email for account password reset ${error}`);
  }
};

// emails/reactivate-account-link/index.ts
var reactivateAccountLink = async (urlOrigin, emailAddress, name, reactivationHash) => {
  try {
    console.info('Sending email for account reactivation');
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;
    const variables = { urlOrigin, name, reactivationToken: reactivationHash };
    const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
    return response;
  } catch (error) {
    console.error('Error sending email for account reactivation %o', error);
    throw new Error(`Sending email for account reactivation ${error}`);
  }
};

// helpers/policy-type/index.ts
var isSinglePolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.SINGLE;
var isMultiplePolicyType = (policyType) => policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE;

// helpers/get-APIM-currencies-exchange-rate/index.ts
var get = async (source, target) => {
  try {
    console.info('Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper)', source, target);
    const response = await APIM_default.getCurrenciesExchange(source, target);
    if (response.success && response.data) {
      const [currency] = response.data;
      const { midPrice: exchangeRate } = currency;
      if (source !== GBP) {
        const fixed = Number(1 / exchangeRate).toFixed(2);
        return Number(fixed);
      }
      return exchangeRate;
    }
    return 0;
  } catch (error) {
    console.error('Error Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper) %o', source, target, error);
    throw new Error(`Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper) ${error}`);
  }
};
var apimCurrencyExchangeRate = {
  get,
};
var get_APIM_currencies_exchange_rate_default = apimCurrencyExchangeRate;

// helpers/round-number/index.ts
var roundNumber = (number) => Math.round(number);
var round_number_default = roundNumber;

// emails/application/get-submitted-confirmation-template-id/multiple-policy-type/index.ts
var {
  LATEST_VERSION: { SMALL_EXPORT_BUILDER },
} = APPLICATION;
var {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID,
} = EMAIL_TEMPLATE_IDS;
var get2 = async (policyType, policyCurrencyCode, maximumBuyerWillOwe) => {
  try {
    console.info('Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper)');
    if (isMultiplePolicyType(policyType)) {
      let maximumBuyerWillOweInGbp = maximumBuyerWillOwe;
      if (policyCurrencyCode !== GBP) {
        const source = GBP;
        const target = String(policyCurrencyCode);
        const exchangeRate = await get_APIM_currencies_exchange_rate_default.get(source, target);
        maximumBuyerWillOweInGbp = round_number_default(maximumBuyerWillOwe / exchangeRate);
      }
      const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);
      const eligibleForSmallExportBuilder = maximumBuyerWillOweInGbp <= threshold;
      if (eligibleForSmallExportBuilder) {
        return CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;
      }
      return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }
    return UNABLE_TO_DETERMINE_TEMPLATE_ID;
  } catch (error) {
    console.error('Error Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper) %o', error);
    throw new Error(`Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper) ${error}`);
  }
};
var multiplePolicyTypeTemplateId = {
  get: get2,
};
var multiple_policy_type_default = multiplePolicyTypeTemplateId;

// emails/application/get-submitted-confirmation-template-id/index.ts
var {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION: CONFIRMATION2 },
    },
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID: UNABLE_TO_DETERMINE_TEMPLATE_ID2,
} = EMAIL_TEMPLATE_IDS;
var getSubmittedConfirmationTemplateId = async (policy) => {
  try {
    console.info('Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper)');
    const { maximumBuyerWillOwe, policyCurrencyCode, policyType } = policy;
    if (isSinglePolicyType(policyType)) {
      return CONFIRMATION2.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }
    if (isMultiplePolicyType(policyType) && maximumBuyerWillOwe) {
      return await multiple_policy_type_default.get(policyType, String(policyCurrencyCode), maximumBuyerWillOwe);
    }
    return UNABLE_TO_DETERMINE_TEMPLATE_ID2;
  } catch (error) {
    console.error('Error Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) %o', error);
    throw new Error(`Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) ${error}`);
  }
};
var get_submitted_confirmation_template_id_default = getSubmittedConfirmationTemplateId;

// file-system/index.ts
var import_fs = require('fs');
var import_path = __toESM(require('path'));
var fileExists = (filePath) => {
  const fileBuffer = Buffer.from(filePath);
  if (fileBuffer.length) {
    return true;
  }
  return false;
};
var isAcceptedFileType = (filePath) => {
  const fileType = import_path.default.extname(filePath);
  if (ACCEPTED_FILE_TYPES.includes(fileType)) {
    return true;
  }
  return false;
};
var readFile = async (filePath) => {
  try {
    console.info('Reading file %s', filePath);
    const file = await import_fs.promises.readFile(filePath);
    if (fileExists(file) && isAcceptedFileType(filePath)) {
      return file;
    }
    throw new Error('Reading file - does not exist or is unaccepted file type');
  } catch (error) {
    console.error('Error reading file %o', error);
    throw new Error(`Reading file ${error}`);
  }
};
var unlink = async (filePath) => {
  try {
    console.info('Deleting file %s', filePath);
    const file = await readFile(filePath);
    if (file) {
      await import_fs.promises.unlink(filePath);
    }
    return false;
  } catch (error) {
    console.error('Error deleting file %o', error);
    throw new Error(`Deleting file ${error}`);
  }
};
var fileSystem = {
  fileExists,
  isAcceptedFileType,
  readFile,
  unlink,
};
var file_system_default = fileSystem;

// emails/application/index.ts
var application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {ApplicationSubmissionEmailVariables} ApplicationSubmissionEmailVariables
   * @param { ApplicationPolicy } policy: Application policy
   * @returns {Promise<ApimSendEmailHelperResponse>}
   */
  submittedEmail: async (variables, policy) => {
    try {
      console.info('Sending application submitted email to application owner or provided business contact');
      const templateId = await get_submitted_confirmation_template_id_default(policy);
      const { emailAddress } = variables;
      const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
      return response;
    } catch (error) {
      console.error('Error sending application submitted email to to application owner or provided business contact %o', error);
      throw new Error(`Sending application submitted email to to application owner or provided business contact ${error}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read XLSX file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to XLSX
   * We send a file buffer to APIM - in turn, Notify generates a unique URL that is then rendered in the email.
   * @param {ApplicationSubmissionEmailVariables}
   * @returns {Promise<ApimSendEmailHelperResponse>}
   */
  underwritingTeam: async (variables, filePath, templateId) => {
    try {
      console.info('Sending application submitted email to underwriting team');
      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);
      const file = await file_system_default.readFile(filePath);
      if (file) {
        const bufferedHexString = file.toString('hex');
        const variablesWithFileBuffer = {
          ...variables,
          file: bufferedHexString,
        };
        const response = await APIM_default.sendEmail(templateId, emailAddress, variablesWithFileBuffer);
        await file_system_default.unlink(filePath);
        return response;
      }
      throw new Error('Sending application submitted email to underwriting team - invalid file / file not found');
    } catch (error) {
      console.error('Error sending application submitted email to underwriting team %o', error);
      throw new Error(`Sending application submitted email to underwriting team ${error}`);
    }
  },
};
var application_default2 = application;

// emails/documents/index.ts
var documentsEmail = async (variables, templateId) => {
  try {
    console.info('Sending documents email');
    const { emailAddress } = variables;
    const response = await APIM_default.sendEmail(templateId, emailAddress, variables);
    return response;
  } catch (error) {
    console.error('Error sending documents email %o', error);
    throw new Error(`Sending documents email ${error}`);
  }
};

// emails/insurance-feedback-email/index.ts
var import_dotenv6 = __toESM(require('dotenv'));

// helpers/map-feedback-satisfaction/index.ts
var mapFeedbackSatisfaction = (satisfaction) => FEEDBACK.EMAIL_TEXT[satisfaction];
var map_feedback_satisfaction_default = mapFeedbackSatisfaction;

// emails/insurance-feedback-email/index.ts
import_dotenv6.default.config();
var insuranceFeedbackEmail = async (variables) => {
  try {
    console.info('Sending insurance feedback email');
    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;
    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT;
    const emailVariables = variables;
    emailVariables.time = '';
    emailVariables.date = '';
    if (variables.createdAt) {
      emailVariables.date = format_date_default(variables.createdAt);
      emailVariables.time = format_date_default(variables.createdAt, 'HH:mm:ss');
    }
    if (variables.satisfaction) {
      emailVariables.satisfaction = map_feedback_satisfaction_default(variables.satisfaction);
    }
    const response = await APIM_default.sendEmail(templateId, emailAddress, emailVariables);
    return response;
  } catch (error) {
    console.error('Error sending insurance feedback email %o', error);
    throw new Error(`Sending insurance feedback email ${error}`);
  }
};

// emails/submission-deadline/index.ts
var submissionDeadlineEmail = async (emailAddress, submissionDeadlineEmailVariables) => {
  try {
    console.info('Sending submission deadline reminder email for %s', submissionDeadlineEmailVariables.referenceNumber);
    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.DEADLINE_REMINDER;
    const response = await APIM_default.sendEmail(templateId, emailAddress, submissionDeadlineEmailVariables);
    return response;
  } catch (error) {
    console.error('Error sending submission deadline email for applicationId %s - %o', submissionDeadlineEmailVariables.referenceNumber, error);
    throw new Error(`Sending submission deadline email for ${submissionDeadlineEmailVariables.referenceNumber} - ${error}`);
  }
};

// emails/index.ts
import_dotenv7.default.config();
var sendEmail = {
  confirmEmailAddress,
  accessCodeEmail,
  passwordResetLink,
  reactivateAccountLink,
  application: application_default2,
  documentsEmail,
  insuranceFeedbackEmail,
  submissionDeadlineEmail,
};
var emails_default = sendEmail;

// helpers/send-email-application-submission-deadline/send-email/index.ts
var send = async (applications) => {
  try {
    console.info('Sending application submission deadline emails - send helper');
    const mapped = applications.map(async (application2) => {
      const variables = map_application_submission_deadline_variables_default(application2);
      const response = await emails_default.submissionDeadlineEmail(variables.email, variables);
      return response;
    });
    const promises = await Promise.all(mapped);
    return promises;
  } catch (error) {
    console.error('Error sending application submission deadline email (send helper) %o', error);
    throw new Error(`Sending application submission deadline email (send helper) ${error}`);
  }
};
var applicationSubmissionDeadineEmail = {
  send,
};
var send_email_default = applicationSubmissionDeadineEmail;

// helpers/send-email-application-submission-deadline/index.ts
var applicationSubmissionDeadlineEmail = async (context) => {
  try {
    console.info('Sending application submission deadline email');
    const applications = await get_expiring_applications_default(context);
    if (applications.length) {
      const sentEmails = await send_email_default.send(applications);
      if (sentEmails.length === applications.length) {
        return {
          success: true,
        };
      }
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending application submission deadline email (emailApplicationSubmissionDeadlineEmail helper) %o', error);
    throw new Error(`Sending application submission deadline email (emailApplicationSubmissionDeadlineEmail helper) ${error}`);
  }
};
var send_email_application_submission_deadline_default = applicationSubmissionDeadlineEmail;

// cron/application/email-submission-deadline-reminder-cron-job.ts
import_dotenv8.default.config();
var { CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL } = process.env;
var sendEmailApplicationSubmissionDeadlineJob = {
  cronExpression: String(CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL),
  description: CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL,
  task: send_email_application_submission_deadline_default,
};
var email_submission_deadline_reminder_cron_job_default = sendEmailApplicationSubmissionDeadlineJob;

// cron/application/index.ts
var applicationCronSchedulerJobs = [inactive_application_cron_job_default, email_submission_deadline_reminder_cron_job_default];
var application_default3 = applicationCronSchedulerJobs;

// cron/index.ts
var cronJobs = (context) => {
  console.info('Running cron jobs');
  cron_job_scheduler_default(account_default2, context);
  cron_job_scheduler_default(application_default3, context);
};
var cron_default = cronJobs;

// schema.ts
var import_core2 = require('@keystone-6/core');
var import_access = require('@keystone-6/core/access');
var import_fields = require('@keystone-6/core/fields');
var import_fields_document = require('@keystone-6/fields-document');

// helpers/update-application/index.ts
var timestamp = async (context, applicationId) => {
  try {
    console.info('Updating application updatedAt timestamp');
    const now2 = /* @__PURE__ */ new Date();
    const application2 = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        updatedAt: now2,
      },
    });
    return application2;
  } catch (error) {
    console.error('Error updating application updatedAt timestamp %o', error);
    throw new Error(`Updating application updatedAt timestamp ${error}`);
  }
};
var updateApplication = {
  timestamp,
};
var update_application_default = updateApplication;

// nullable-checkbox/index.ts
var import_types = require('@keystone-6/core/types');
var import_core = require('@keystone-6/core');
var nullableCheckboxConfig = (defaultValue) =>
  /**
   * Database/GraphQL config.
   * This defines the field as an optional boolean with a default value of null.
   */
  (0, import_types.fieldType)({
    kind: 'scalar',
    mode: 'optional',
    scalar: 'Boolean',
  })({
    /**
     * Input/output config.
     * This determines what is set during a create, update and get operations.
     */
    input: {
      create: {
        arg: import_core.graphql.arg({ type: import_core.graphql.Boolean }),
        resolve(value) {
          if (defaultValue || defaultValue === false) {
            return defaultValue;
          }
          if (value || value === false) {
            return value;
          }
          return null;
        },
      },
      update: {
        arg: import_core.graphql.arg({ type: import_core.graphql.Boolean }),
        resolve(value) {
          return value;
        },
      },
    },
    output: import_core.graphql.field({
      type: import_core.graphql.Boolean,
      resolve({ value }) {
        return value;
      },
    }),
    /**
     * Keystone admin UI/CMS config for this field.
     * Since we do not use the UI/CMS, this can be empty.
     */
    views: './nullable-checkbox/views',
    getAdminMeta() {
      return {};
    },
  });
var nullableCheckbox = (defaultValue) => () => nullableCheckboxConfig(defaultValue);
var nullable_checkbox_default = nullableCheckbox;

// schema.ts
var {
  DEFAULT_CURRENCY,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
  EXPORT_CONTRACT: { AGENT_SERVICE_CHARGE },
  POLICY: POLICY3,
  POLICY_TYPE: POLICY_TYPE2,
  SUBMISSION_TYPE,
} = APPLICATION;
var lists = {
  ReferenceNumber: {
    db: {
      idField: { kind: 'autoincrement' },
    },
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
    },
    access: import_access.allowAll,
  },
  Application: {
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      eligibility: (0, import_fields.relationship)({ ref: 'Eligibility' }),
      referenceNumber: (0, import_fields.integer)({
        isIndexed: true,
      }),
      submissionCount: (0, import_fields.integer)({
        validation: { isRequired: true },
      }),
      submissionDate: (0, import_fields.timestamp)(),
      submissionDeadline: (0, import_fields.timestamp)(),
      submissionType: (0, import_fields.select)({
        options: [{ label: SUBMISSION_TYPE.MIA, value: SUBMISSION_TYPE.MIA }],
      }),
      status: (0, import_fields.text)({
        validation: { isRequired: true },
      }),
      previousStatus: (0, import_fields.text)(),
      policy: (0, import_fields.relationship)({ ref: 'Policy' }),
      exportContract: (0, import_fields.relationship)({ ref: 'ExportContract' }),
      owner: (0, import_fields.relationship)({
        ref: 'Account',
        many: false,
      }),
      business: (0, import_fields.relationship)({ ref: 'Business' }),
      broker: (0, import_fields.relationship)({ ref: 'Broker' }),
      buyer: (0, import_fields.relationship)({ ref: 'Buyer' }),
      company: (0, import_fields.relationship)({ ref: 'Company' }),
      declaration: (0, import_fields.relationship)({ ref: 'Declaration' }),
      nominatedLossPayee: (0, import_fields.relationship)({ ref: 'NominatedLossPayee' }),
      policyContact: (0, import_fields.relationship)({ ref: 'PolicyContact' }),
      sectionReview: (0, import_fields.relationship)({ ref: 'SectionReview' }),
      version: (0, import_fields.text)({
        validation: { isRequired: true },
      }),
      dealType: (0, import_fields.text)({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(4)' },
      }),
      migratedTo: (0, import_fields.integer)(),
    },
    access: import_access.allowAll,
  },
  TotalContractValue: (0, import_core2.list)({
    fields: {
      valueId: (0, import_fields.integer)(),
      value: (0, import_fields.text)({
        db: { nativeType: 'VarChar(70)' },
      }),
    },
    access: import_access.allowAll,
  }),
  CoverPeriod: (0, import_core2.list)({
    fields: {
      valueId: (0, import_fields.integer)(),
      value: (0, import_fields.text)({
        db: { nativeType: 'VarChar(70)' },
      }),
    },
    access: import_access.allowAll,
  }),
  LossPayeeFinancialInternational: {
    fields: {
      lossPayee: (0, import_fields.relationship)({ ref: 'NominatedLossPayee.financialInternational' }),
      vector: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialInternationalVector.financialInternational' }),
      bankAddress: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      bicSwiftCode: (0, import_fields.text)(),
      iban: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  },
  LossPayeeFinancialInternationalVector: {
    fields: {
      financialInternational: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialInternational.vector' }),
      bicSwiftCodeVector: (0, import_fields.text)(),
      ibanVector: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  },
  LossPayeeFinancialUk: {
    fields: {
      lossPayee: (0, import_fields.relationship)({ ref: 'NominatedLossPayee.financialUk' }),
      vector: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialUkVector.financialUk' }),
      accountNumber: (0, import_fields.text)(),
      bankAddress: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      sortCode: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  },
  LossPayeeFinancialUkVector: {
    fields: {
      financialUk: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialUk.vector' }),
      accountNumberVector: (0, import_fields.text)(),
      sortCodeVector: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  },
  NominatedLossPayee: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      financialUk: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialUk.lossPayee' }),
      financialInternational: (0, import_fields.relationship)({ ref: 'LossPayeeFinancialInternational.lossPayee' }),
      isAppointed: nullable_checkbox_default(),
      isLocatedInUk: nullable_checkbox_default(),
      isLocatedInternationally: nullable_checkbox_default(),
      name: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
    },
    access: import_access.allowAll,
  }),
  Policy: {
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      jointlyInsuredParty: (0, import_fields.relationship)({ ref: 'JointlyInsuredParty.policy' }),
      needPreCreditPeriodCover: nullable_checkbox_default(DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER),
      policyType: (0, import_fields.select)({
        options: [
          { label: POLICY_TYPE2.SINGLE, value: POLICY_TYPE2.SINGLE },
          { label: POLICY_TYPE2.MULTIPLE, value: POLICY_TYPE2.MULTIPLE },
        ],
      }),
      requestedStartDate: (0, import_fields.timestamp)(),
      contractCompletionDate: (0, import_fields.timestamp)(),
      totalValueOfContract: (0, import_fields.integer)({
        validation: {
          min: POLICY3.TOTAL_VALUE_OF_CONTRACT.MINIMUM,
          max: POLICY3.TOTAL_VALUE_OF_CONTRACT.MAXIMUM,
        },
      }),
      creditPeriodWithBuyer: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      policyCurrencyCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      totalMonthsOfCover: (0, import_fields.integer)(),
      totalSalesToBuyer: (0, import_fields.integer)(),
      maximumBuyerWillOwe: (0, import_fields.integer)(),
      requestedCreditLimit: (0, import_fields.integer)(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  },
  PolicyContact: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      firstName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(400)' },
      }),
      lastName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(400)' },
      }),
      email: (0, import_fields.text)({
        db: { nativeType: 'VarChar(300)' },
      }),
      position: (0, import_fields.text)({
        db: { nativeType: 'VarChar(50)' },
      }),
      isSameAsOwner: nullable_checkbox_default(),
    },
    access: import_access.allowAll,
  }),
  JointlyInsuredParty: (0, import_core2.list)({
    fields: {
      policy: (0, import_fields.relationship)({ ref: 'Policy.jointlyInsuredParty' }),
      requested: nullable_checkbox_default(),
      companyName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      companyNumber: (0, import_fields.text)({
        db: { nativeType: 'VarChar(100)' },
      }),
      countryCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: import_access.allowAll,
  }),
  ExportContract: {
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      agent: (0, import_fields.relationship)({ ref: 'ExportContractAgent.exportContract' }),
      privateMarket: (0, import_fields.relationship)({ ref: 'PrivateMarket.exportContract' }),
      awardMethod: (0, import_fields.relationship)({ ref: 'ExportContractAwardMethod' }),
      otherAwardMethod: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      finalDestinationKnown: nullable_checkbox_default(),
      finalDestinationCountryCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      goodsOrServicesDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      paymentTermsDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  },
  ExportContractAgent: (0, import_core2.list)({
    fields: {
      exportContract: (0, import_fields.relationship)({ ref: 'ExportContract.agent' }),
      service: (0, import_fields.relationship)({ ref: 'ExportContractAgentService.agent' }),
      countryCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      fullAddress: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      isUsingAgent: nullable_checkbox_default(),
      name: (0, import_fields.text)({
        db: { nativeType: 'VarChar(800)' },
      }),
    },
    access: import_access.allowAll,
  }),
  ExportContractAgentService: {
    fields: {
      agent: (0, import_fields.relationship)({ ref: 'ExportContractAgent.service' }),
      charge: (0, import_fields.relationship)({ ref: 'ExportContractAgentServiceCharge.service' }),
      agentIsCharging: nullable_checkbox_default(),
      serviceDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    access: import_access.allowAll,
  },
  ExportContractAgentServiceCharge: {
    fields: {
      service: (0, import_fields.relationship)({ ref: 'ExportContractAgentService.charge' }),
      percentageCharge: (0, import_fields.integer)(),
      fixedSumAmount: (0, import_fields.decimal)({ scale: 2 }),
      fixedSumCurrencyCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
        defaultValue: DEFAULT_CURRENCY,
      }),
      method: (0, import_fields.select)({
        options: [
          { label: AGENT_SERVICE_CHARGE.METHOD.FIXED_SUM, value: AGENT_SERVICE_CHARGE.METHOD.FIXED_SUM },
          { label: AGENT_SERVICE_CHARGE.METHOD.PERCENTAGE, value: AGENT_SERVICE_CHARGE.METHOD.PERCENTAGE },
        ],
      }),
      payableCountryCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: import_access.allowAll,
  },
  ExportContractAwardMethod: (0, import_core2.list)({
    fields: {
      value: (0, import_fields.text)({
        db: { nativeType: 'VarChar(50)' },
      }),
    },
    access: import_access.allowAll,
  }),
  PrivateMarket: (0, import_core2.list)({
    fields: {
      exportContract: (0, import_fields.relationship)({ ref: 'ExportContract.privateMarket' }),
      attempted: nullable_checkbox_default(),
      declinedDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  Account: (0, import_core2.list)({
    fields: {
      createdAt: (0, import_fields.timestamp)(),
      updatedAt: (0, import_fields.timestamp)(),
      firstName: (0, import_fields.text)({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(400)' },
      }),
      lastName: (0, import_fields.text)({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(400)' },
      }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        db: { nativeType: 'VarChar(300)' },
      }),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } }),
      // isVerified flag will only be true if the account has verified their email address.
      verificationHash: (0, import_fields.text)(),
      verificationExpiry: (0, import_fields.timestamp)(),
      otpSalt: (0, import_fields.text)(),
      otpHash: (0, import_fields.text)({
        db: { nativeType: 'VarChar(256)' },
      }),
      otpExpiry: (0, import_fields.timestamp)(),
      sessionExpiry: (0, import_fields.timestamp)(),
      sessionIdentifier: (0, import_fields.text)(),
      passwordResetHash: (0, import_fields.text)({ validation: { isRequired: false } }),
      passwordResetExpiry: (0, import_fields.timestamp)({ validation: { isRequired: false } }),
      authentication: (0, import_fields.relationship)({
        ref: 'Authentication',
      }),
      authenticationRetry: (0, import_fields.relationship)({
        ref: 'AuthenticationRetry',
      }),
      reactivationHash: (0, import_fields.text)({ validation: { isRequired: false } }),
      reactivationExpiry: (0, import_fields.timestamp)({ validation: { isRequired: false } }),
      applications: (0, import_fields.relationship)({
        ref: 'Application',
        many: true,
      }),
      status: (0, import_fields.relationship)({ ref: 'AccountStatus.account' }),
    },
    access: import_access.allowAll,
  }),
  AccountStatus: {
    fields: {
      account: (0, import_fields.relationship)({ ref: 'Account.status' }),
      isVerified: (0, import_fields.checkbox)({ defaultValue: false }),
      /**
       * isBlocked flag will only be true if the account has:
       * - repeatedly attempted sign in
       * - repeatedly attempted password reset request
       */
      isBlocked: (0, import_fields.checkbox)({ defaultValue: false }),
      isInactive: (0, import_fields.checkbox)({ defaultValue: false }),
      updatedAt: (0, import_fields.timestamp)(),
    },
    access: import_access.allowAll,
  },
  AuthenticationRetry: (0, import_core2.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: 'Account',
        many: true,
      }),
      createdAt: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
    },
    access: import_access.allowAll,
  }),
  Authentication: (0, import_core2.list)({
    fields: {
      account: (0, import_fields.relationship)({
        ref: 'Account',
        many: true,
      }),
      createdAt: (0, import_fields.timestamp)(),
      salt: (0, import_fields.text)({ validation: { isRequired: true } }),
      hash: (0, import_fields.text)({ validation: { isRequired: true } }),
    },
    access: import_access.allowAll,
  }),
  Business: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      goodsOrServicesSupplied: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      totalYearsExporting: (0, import_fields.integer)(),
      totalEmployeesUK: (0, import_fields.integer)(),
      totalEmployeesInternational: (0, import_fields.integer)(),
      estimatedAnnualTurnover: (0, import_fields.integer)(),
      exportsTurnoverPercentage: (0, import_fields.integer)(),
      turnoverCurrencyCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
        defaultValue: DEFAULT_CURRENCY,
      }),
      hasCreditControlProcess: nullable_checkbox_default(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  Broker: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      buildingNumberOrName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(100)' },
      }),
      isUsingBroker: nullable_checkbox_default(),
      isBasedInUk: nullable_checkbox_default(),
      name: (0, import_fields.text)({
        db: { nativeType: 'VarChar(800)' },
      }),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      town: (0, import_fields.text)(),
      county: (0, import_fields.text)(),
      postcode: (0, import_fields.text)(),
      fullAddress: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      email: (0, import_fields.text)({
        db: { nativeType: 'VarChar(300)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  CompanyAddress: (0, import_core2.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: 'Company.registeredOfficeAddress' }),
      addressLine1: (0, import_fields.text)(),
      addressLine2: (0, import_fields.text)(),
      careOf: (0, import_fields.text)(),
      locality: (0, import_fields.text)(),
      region: (0, import_fields.text)(),
      postalCode: (0, import_fields.text)(),
      country: (0, import_fields.text)(),
      premises: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  }),
  Company: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      registeredOfficeAddress: (0, import_fields.relationship)({ ref: 'CompanyAddress.company' }),
      differentTradingAddress: (0, import_fields.relationship)({ ref: 'CompanyDifferentTradingAddress.company' }),
      sicCodes: (0, import_fields.relationship)({
        ref: 'CompanySicCode.company',
        many: true,
      }),
      companyName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      companyNumber: (0, import_fields.text)(),
      dateOfCreation: (0, import_fields.timestamp)(),
      hasDifferentTradingAddress: nullable_checkbox_default(),
      differentTradingName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      hasDifferentTradingName: nullable_checkbox_default(),
      companyWebsite: (0, import_fields.text)(),
      phoneNumber: (0, import_fields.text)(),
      financialYearEndDate: (0, import_fields.timestamp)(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  CompanyDifferentTradingAddress: (0, import_core2.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: 'Company.differentTradingAddress' }),
      fullAddress: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
    },
    access: import_access.allowAll,
  }),
  CompanySicCode: (0, import_core2.list)({
    fields: {
      company: (0, import_fields.relationship)({ ref: 'Company.sicCodes' }),
      sicCode: (0, import_fields.text)(),
      industrySectorName: (0, import_fields.text)(),
    },
    access: import_access.allowAll,
  }),
  Buyer: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      companyOrOrganisationName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      address: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      country: (0, import_fields.relationship)({ ref: 'Country' }),
      registrationNumber: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      website: (0, import_fields.text)(),
      buyerTradingHistory: (0, import_fields.relationship)({ ref: 'BuyerTradingHistory.buyer' }),
      contact: (0, import_fields.relationship)({ ref: 'BuyerContact.buyer' }),
      relationship: (0, import_fields.relationship)({ ref: 'BuyerRelationship.buyer' }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  BuyerContact: {
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      buyer: (0, import_fields.relationship)({ ref: 'Buyer.contact' }),
      contactFirstName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      contactLastName: (0, import_fields.text)({
        db: { nativeType: 'VarChar(200)' },
      }),
      contactPosition: (0, import_fields.text)(),
      contactEmail: (0, import_fields.text)({
        db: { nativeType: 'VarChar(300)' },
      }),
      canContactBuyer: nullable_checkbox_default(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  },
  BuyerRelationship: {
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      buyer: (0, import_fields.relationship)({ ref: 'Buyer.relationship' }),
      exporterIsConnectedWithBuyer: nullable_checkbox_default(),
      connectionWithBuyerDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      exporterHasPreviousCreditInsuranceWithBuyer: nullable_checkbox_default(),
      exporterHasBuyerFinancialAccounts: nullable_checkbox_default(),
      previousCreditInsuranceWithBuyerDescription: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  },
  BuyerTradingHistory: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      buyer: (0, import_fields.relationship)({ ref: 'Buyer.buyerTradingHistory' }),
      currencyCode: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      outstandingPayments: nullable_checkbox_default(),
      failedPayments: nullable_checkbox_default(),
      exporterHasTradedWithBuyer: nullable_checkbox_default(),
      totalOutstandingPayments: (0, import_fields.integer)(),
      totalOverduePayments: (0, import_fields.integer)(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  Country: (0, import_core2.list)({
    fields: {
      isoCode: (0, import_fields.text)({
        validation: { isRequired: true },
      }),
      name: (0, import_fields.text)({
        validation: { isRequired: true },
      }),
    },
    access: import_access.allowAll,
  }),
  Eligibility: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      buyerCountry: (0, import_fields.relationship)({ ref: 'Country' }),
      coverPeriod: (0, import_fields.relationship)({ ref: 'CoverPeriod' }),
      hasEndBuyer: (0, import_fields.checkbox)(),
      hasMinimumUkGoodsOrServices: (0, import_fields.checkbox)(),
      hasCompaniesHouseNumber: (0, import_fields.checkbox)(),
      otherPartiesInvolved: (0, import_fields.checkbox)(),
      paidByLetterOfCredit: (0, import_fields.checkbox)(),
      totalContractValue: (0, import_fields.relationship)({ ref: 'TotalContractValue' }),
      validExporterLocation: (0, import_fields.checkbox)(),
      isPartyToConsortium: (0, import_fields.checkbox)(),
      isMemberOfAGroup: (0, import_fields.checkbox)(),
    },
    access: import_access.allowAll,
  }),
  SectionReview: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      eligibility: nullable_checkbox_default(),
      business: nullable_checkbox_default(),
      buyer: nullable_checkbox_default(),
      exportContract: nullable_checkbox_default(),
      policy: nullable_checkbox_default(),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  Declaration: (0, import_core2.list)({
    fields: {
      application: (0, import_fields.relationship)({ ref: 'Application' }),
      version: (0, import_fields.relationship)({ ref: 'DeclarationVersion' }),
      agreeHowDataWillBeUsed: nullable_checkbox_default(),
      agreeToAntiBribery: nullable_checkbox_default(),
      agreeToConfidentiality: nullable_checkbox_default(),
      agreeToConfirmationAndAcknowledgements: nullable_checkbox_default(),
      hasAntiBriberyCodeOfConduct: nullable_checkbox_default(),
      willExportWithAntiBriberyCodeOfConduct: nullable_checkbox_default(),
      modernSlavery: (0, import_fields.relationship)({ ref: 'DeclarationModernSlavery.declaration' }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  DeclarationVersion: (0, import_core2.list)({
    fields: {
      declaration: (0, import_fields.relationship)({ ref: 'Declaration' }),
      agreeToConfidentiality: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      agreeToAntiBribery: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      hasAntiBriberyCodeOfConduct: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      willExportWithAntiBriberyCodeOfConduct: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      agreeToConfirmationAndAcknowledgements: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      agreeHowDataWillBeUsed: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: import_access.allowAll,
  }),
  DeclarationModernSlavery: (0, import_core2.list)({
    fields: {
      declaration: (0, import_fields.relationship)({ ref: 'Declaration.modernSlavery' }),
      version: (0, import_fields.relationship)({ ref: 'DeclarationModernSlaveryVersion' }),
      willAdhereToAllRequirements: nullable_checkbox_default(),
      hasNoOffensesOrInvestigations: nullable_checkbox_default(),
      isNotAwareOfExistingSlavery: nullable_checkbox_default(),
      cannotAdhereToAllRequirements: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      offensesOrInvestigations: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
      awareOfExistingSlavery: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1000)' },
      }),
    },
    hooks: {
      afterOperation: async ({ item, context }) => {
        if (item?.applicationId) {
          await update_application_default.timestamp(context, item.applicationId);
        }
      },
    },
    access: import_access.allowAll,
  }),
  DeclarationModernSlaveryVersion: (0, import_core2.list)({
    fields: {
      declarationModernSlavery: (0, import_fields.relationship)({ ref: 'DeclarationModernSlavery' }),
      willAdhereToAllRequirements: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      hasNoOffensesOrInvestigations: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
      isNotAwareOfExistingSlavery: (0, import_fields.text)({
        db: { nativeType: 'VarChar(3)' },
      }),
    },
    access: import_access.allowAll,
  }),
  Page: (0, import_core2.list)({
    fields: {
      heading: (0, import_fields.text)({
        label: 'Page heading',
      }),
      metaTitle: (0, import_fields.text)({
        label: 'Meta title',
      }),
      content: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['heading', 'id'],
      },
    },
    access: import_access.allowAll,
  }),
  User: (0, import_core2.list)({
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email'],
      },
    },
    access: import_access.allowAll,
  }),
  Feedback: (0, import_core2.list)({
    fields: {
      service: (0, import_fields.text)(),
      satisfaction: (0, import_fields.select)({
        options: [
          { label: FEEDBACK.VERY_SATISFIED, value: FEEDBACK.VERY_SATISFIED },
          { label: FEEDBACK.SATISFIED, value: FEEDBACK.SATISFIED },
          { label: FEEDBACK.NEITHER, value: FEEDBACK.NEITHER },
          { label: FEEDBACK.DISSATISFIED, value: FEEDBACK.DISSATISFIED },
          { label: FEEDBACK.VERY_DISSATISIFED, value: FEEDBACK.VERY_DISSATISIFED },
          { label: '', value: '' },
        ],
        db: { isNullable: true },
      }),
      improvement: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1200)' },
      }),
      otherComments: (0, import_fields.text)({
        db: { nativeType: 'VarChar(1200)' },
      }),
      referralUrl: (0, import_fields.text)({
        db: { nativeType: 'VarChar(500)' },
      }),
      product: (0, import_fields.text)(),
      createdAt: (0, import_fields.timestamp)(),
    },
    access: import_access.allowAll,
  }),
};

// auth.ts
var import_config2 = require('dotenv/config');
var import_auth = require('@keystone-6/auth');
var import_session = require('@keystone-6/core/session');
var sessionSecret = String(process.env.SESSION_SECRET);
if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET environment variable must be set in production');
  }
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    /**
     * Ensure that if there are no items in the database,
     * keystone admin UI will ask you to create
     * a new user, with the following fields.
     */
    fields: ['name', 'email', 'password'],
  },
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

// apollo/plugins/index.ts
var requestDidStart = () => ({
  /**
   * The didResolveOperation event fires after the graphql library successfully determines the operation to execute.
   * At this stage, the operationName is available.
   * When this event fires, your resolvers have not yet executed.
   * https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference/#didresolveoperation
   *
   * KeystoneJS automatically generates many GraphQL resolvers that we do not use or need.
   * Therefore, We use this event to check that a requested operation is allowed to be executed,
   * via an explicit list of allowed resolvers.
   */
  didResolveOperation({ request }) {
    if (!request.operationName || (request.operationName && !ALLOWED_GRAPHQL_RESOLVERS.includes(request.operationName))) {
      throw new Error('Operation not permitted');
    }
  },
});
var apolloPlugins = [{ requestDidStart }];
var plugins_default = apolloPlugins;

// apollo/format-graphql-error/index.ts
var import_config3 = require('dotenv/config');
var import_apollo_server_express = require('apollo-server-express');
var formatGraphQlError = (error) => {
  const isDevEnvironment3 = process.env.NODE_ENV === 'development';
  if (!isDevEnvironment3) {
    return new import_apollo_server_express.ValidationError('Invalid request');
  }
  return error;
};
var format_graphql_error_default = formatGraphQlError;

// apollo/index.ts
var apolloPlugins2 = plugins_default;
var formatGraphQlError2 = format_graphql_error_default;

// custom-schema/index.ts
var import_schema = require('@graphql-tools/schema');

// custom-schema/type-defs.ts
var typeDefs = `
  type AccountResponse {
    id: String
    firstName: String
    lastName: String
    email: String
    isVerified: Boolean
  }

  input AccountInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type CreateAnAccountResponse {
    success: Boolean
    alreadyExists: Boolean
    isVerified: Boolean
    id: String
    email: String
    verificationHash: String
    isBlocked: Boolean
  }

  type CompaniesHouseResponse {
    companyName: String
    registeredOfficeAddress: CompanyAddress
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    success: Boolean
    apiError: Boolean
    isActive: Boolean
    notFound: Boolean
  }

  type CompanyAddress {
    addressLine1: String
    addressLine2: String
    postalCode: String
    country: String
    locality: String
    region: String
    postalCode: String
    careOf: String
    premises: String
  }

  type OrdnanceSurveyAddress {
    addressLine1: String
    addressLine2: String
    postcode: String
    country: String
    county: String
    town: String
  }

  input OldSicCodes {
    id: String
  }

  input CompanyAddressInput {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  input CompanyInput {
    companyName: String
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    registeredOfficeAddress: CompanyAddressInput
    isActive: Boolean
  }

  input SectionReviewInput {
    eligibility: Boolean!
  }

  input ApplicationWhereUniqueInput {
    id: ID
    referenceNumber: Int
  }

  input LossPayeeFinancialDetailsUkInput {
    id: String
    accountNumber: String
    sortCode: String
    bankAddress: String
  }

   type OrdnanceSurveyResponse {
    success: Boolean
    addresses: [OrdnanceSurveyAddress]
    apiError: Boolean
    noAddressesFound: Boolean
    invalidPostcode: Boolean
  }

  type EmailResponse {
    success: Boolean
    emailRecipient: String
  }

  type SuccessResponse {
    success: Boolean!
  }

  type AccountSignInResponse {
    accountId: String
    firstName: String
    lastName: String
    email: String
    token: String
    sessionIdentifier: String
    expires: DateTime
    success: Boolean!
    resentVerificationEmail: Boolean
    isBlocked: Boolean
  }

  type AddAndGetOtpResponse {
    success: Boolean!
    securityCode: String!
  }

  type AccountPasswordResetResponse {
    success: Boolean!
    hasBeenUsedBefore: Boolean
  }

  type AccountSendEmailPasswordResetLinkResponse {
    success: Boolean!
    isBlocked: Boolean
    accountId: String
  }

  type AccountPasswordResetTokenResponse {
    success: Boolean!
    token: String
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountEmailAddressResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountReactivationTokenResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type AccountSendEmailReactivateAccountLinkResponse {
    success: Boolean!
    accountId: String!
    email: String
  }

  input ApplicationEligibility {
    buyerCountryIsoCode: String!
    coverPeriodId: Int!
    hasCompaniesHouseNumber: Boolean!
    hasEndBuyer: Boolean!
    hasMinimumUkGoodsOrServices: Boolean!
    isMemberOfAGroup: Boolean!
    isPartyToConsortium: Boolean!
    totalContractValueId: Int!
    validExporterLocation: Boolean!
  }

  type CreateAnApplicationResponse {
    success: Boolean!
    id: String
    referenceNumber: Int
  }

  type ApplicationResponse {
    id: String
    referenceNumber: Int
  }

  type CreateManyApplicationsResponse {
    success: Boolean!
    applications: [ApplicationResponse]
  }

  type CreateAnAbandonedApplicationResponse {
    success: Boolean!
    id: String
    referenceNumber: Int
  }

  type Country {
    isoCode: String!
    name: String!
  }

  type MappedCisCountry {
    isoCode: String!
    name: String
    shortTermCover: Boolean
    esraClassification: String
    canGetAQuoteOnline: Boolean
    cannotGetAQuote: Boolean
    canApplyForInsuranceOnline: Boolean
    noOnlineSupport: Boolean
    noInsuranceSupport: Boolean
    isHighRisk: Boolean
  }

  type MappedCurrency {
    isoCode: String!
    name: String!
  }

  type GetApimCurrencyResponse {
    supportedCurrencies: [MappedCurrency]
    alternativeCurrencies: [MappedCurrency]
    allCurrencies: [MappedCurrency]
  }

  type GetCountriesAndCurrenciesResponse {
    countries: [Country]
    supportedCurrencies: [MappedCurrency]
    alternativeCurrencies: [MappedCurrency]
    allCurrencies: [MappedCurrency]
  }

  type Owner {
    id: String
    firstName: String
    lastName: String
    email: String
  }

  type ApplicationNominatedLossPayeeUk {
    id: String
    accountNumber: String
    sortCode: String
    bankAddress: String
  }

  type ApplicationNominatedLossPayeeInternational {
    id: String
    iban: String
    bicSwiftCode: String
    bankAddress: String
  }

  type ApplicationNominatedLossPayee {
    id: String
    isAppointed: Boolean
    isLocatedInUk: Boolean
    isLocatedInternationally: Boolean
    name: String
    financialUk: ApplicationNominatedLossPayeeUk
    financialInternational: ApplicationNominatedLossPayeeInternational
  }

  type PopulatedApplication {
    id: String!
    version: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    dealType: String!
    submissionCount: Int
    submissionDeadline: DateTime
    submissionType: String
    submissionDate: DateTime
    referenceNumber: Int
    status: String!
    totalContractValueOverThreshold: Boolean
    eligibility: Eligibility
    exportContract: ExportContract
    policy: Policy
    nominatedLossPayee: ApplicationNominatedLossPayee
    policyContact: PolicyContact
    owner: Owner
    company: Company
    business: Business
    broker: Broker
    buyer: Buyer
    sectionReview: SectionReview
    declaration: Declaration
  }

  type ApplicationSuccessResponse {
    success: Boolean!
    application: PopulatedApplication
  }

  type Mutation {
    """ create an account """
    createAnAccount(
      urlOrigin: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): CreateAnAccountResponse

    """ create an application """
    createAnApplication(
      accountId: String!
      eligibilityAnswers: ApplicationEligibility!
      company: CompanyInput!
      sectionReview: SectionReviewInput!
    ): CreateAnApplicationResponse

     """ create many applications """
    createManyApplications(
      accountId: String!
      count: Int!
    ): CreateManyApplicationsResponse

    """ create an application """
    createAnAbandonedApplication(
      accountId: String!
      eligibilityAnswers: ApplicationEligibility!
      company: CompanyInput!
      sectionReview: SectionReviewInput!
    ): CreateAnAbandonedApplicationResponse

    """ delete an account """
    deleteAnAccount(
      email: String!
    ): SuccessResponse

    """ verify an account's email address """
    verifyAccountEmailAddress(
      token: String!
      id: String!
    ): VerifyAccountEmailAddressResponse

    """ verify an account's reactivation token """
    verifyAccountReactivationToken(
      token: String!
    ): VerifyAccountReactivationTokenResponse

    """ send confirm email address email """
    sendEmailConfirmEmailAddress(
      urlOrigin: String!
      accountId: String!
    ): EmailResponse

    """ validate credentials, generate and email a OTP security code """
    accountSignIn(
      urlOrigin: String!
      email: String!
      password: String!
    ): AccountSignInResponse

    """ generate and email a new OTP security code """
    accountSignInSendNewCode(
      accountId: String!
    ): AccountSignInResponse

    """ verify an account's OTP security code """
    verifyAccountSignInCode(
      accountId: String!
      securityCode: String!
    ): AccountSignInResponse

    """ add an OTP security code to an account and return"""
    addAndGetOTP(
      email: String!
    ): AddAndGetOtpResponse

    """ send email with password reset link """
    sendEmailPasswordResetLink(
      urlOrigin: String!
      email: String!
    ): AccountSendEmailPasswordResetLinkResponse

    """ send email with reactivate account link """
    sendEmailReactivateAccountLink(
      urlOrigin: String!
      accountId: String!
    ): AccountSendEmailReactivateAccountLinkResponse

    """ reset account password """
    accountPasswordReset(
      token: String!
      password: String!
      hasBeenUsedBefore: Boolean
    ): AccountPasswordResetResponse

    """ delete an application by reference number """
    deleteApplicationByReferenceNumber(
      referenceNumber: Int!
    ): SuccessResponse

    """ submit an application """
    submitApplication(
      applicationId: String!
    ): SuccessResponse

    """ create and send email for insurance feedback """
    createFeedbackAndSendEmail(
      satisfaction: String
      improvement: String
      otherComments: String
      referralUrl: String
      product: String
      service: String
    ): SuccessResponse

    """ update loss payee financial uk """
    updateLossPayeeFinancialDetailsUk(
      id: String
      bankAddress: String
      accountNumber: String
      sortCode: String
    ): SuccessResponse

    """ update loss payee financial international """
    updateLossPayeeFinancialDetailsInternational(
      id: String
      bankAddress: String
      iban: String
      bicSwiftCode: String
    ): SuccessResponse
  }

  type Query {
    """ get an account by email """
    getAccountByEmail(
      email: String!
    ): AccountResponse

    """ get an account's password reset token """
    getAccountPasswordResetToken(
      email: String!
    ): AccountPasswordResetTokenResponse

    """ verify an account's password reset token """
    verifyAccountPasswordResetToken(
      token: String!
    ): AccountPasswordResetTokenResponse

    """ get companies house information """
    getCompaniesHouseInformation(
      companiesHouseNumber: String!
    ): CompaniesHouseResponse

    """ gets application by reference number """
    getApplicationByReferenceNumber(
      referenceNumber: Int
      decryptFinancialUk: Boolean
      decryptFinancialInternational: Boolean
    ): ApplicationSuccessResponse

    """ get Ordnance Survey addresses """
    getOrdnanceSurveyAddresses(
      postcode: String!
      houseNameOrNumber: String!
    ): OrdnanceSurveyResponse

    """ get CIS countries from APIM """
    getApimCisCountries: [MappedCisCountry]

    """ get currencies from APIM """
    getApimCurrencies: GetApimCurrencyResponse

    """ get countries and currencies """
    getCountriesAndCurrencies: GetCountriesAndCurrenciesResponse
  }
`;
var type_defs_default = typeDefs;

// custom-resolvers/mutations/create-an-account/index.ts
var import_config4 = require('dotenv/config');

// helpers/get-account-status-by-id/index.ts
var getAccountStatusById = async (context, id) => {
  try {
    console.info('Getting account status by ID  %s', id);
    const accountStatus2 = await context.query.AccountStatus.findOne({
      where: { id },
      query: 'id isVerified isBlocked isInactive',
    });
    return accountStatus2;
  } catch (error) {
    console.error('Error getting account status by ID %o', error);
    throw new Error(`Getting account status by ID ${error}`);
  }
};
var get_account_status_by_id_default = getAccountStatusById;

// helpers/get-account-by-field/index.ts
var getAccountByField = async (context, field, value) => {
  try {
    console.info('Getting account by field/value $s', `${field}, ${value}`);
    const accountsArray = await context.db.Account.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });
    if (!accountsArray?.length || !accountsArray[0]) {
      console.info('Getting account by field - no account exists with the provided field/value');
      return false;
    }
    const account2 = accountsArray[0];
    const accountStatus2 = await get_account_status_by_id_default(context, account2.statusId);
    const populatedAccount = {
      ...account2,
      status: accountStatus2,
    };
    return populatedAccount;
  } catch (error) {
    console.error('Error getting account by field/value %o', error);
    throw new Error(`Getting account by field/value ${error}`);
  }
};
var get_account_by_field_default = getAccountByField;

// helpers/get-password-hash/index.ts
var import_crypto = __toESM(require('crypto'));
var { ENCRYPTION } = ACCOUNT2;
var {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;
var getPasswordHash = (password2, salt) => {
  const hash = import_crypto.default.pbkdf2Sync(password2, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);
  return hash;
};
var get_password_hash_default = getPasswordHash;

// helpers/is-valid-account-password/index.ts
var isValidAccountPassword = (password2, salt, hash) => {
  console.info('Validating account password');
  const hashVerify = get_password_hash_default(password2, salt);
  if (hash === hashVerify) {
    console.info('Valid account password');
    return true;
  }
  console.info('Invalid account password');
  return false;
};
var is_valid_account_password_default = isValidAccountPassword;

// helpers/encrypt-password/index.ts
var import_crypto2 = __toESM(require('crypto'));
var { ENCRYPTION: ENCRYPTION2 } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE,
  STRING_TYPE: STRING_TYPE2,
  PBKDF2: { ITERATIONS: ITERATIONS2, DIGEST_ALGORITHM: DIGEST_ALGORITHM2 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH2 },
  },
} = ENCRYPTION2;
var encryptPassword = (password2) => {
  const salt = import_crypto2.default.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE2);
  const hash = import_crypto2.default.pbkdf2Sync(password2, salt, ITERATIONS2, KEY_LENGTH2, DIGEST_ALGORITHM2).toString(STRING_TYPE2);
  return {
    salt,
    hash,
  };
};
var encrypt_password_default = encryptPassword;

// helpers/get-account-verification-hash/index.ts
var import_crypto3 = __toESM(require('crypto'));
var { EMAIL, ENCRYPTION: ENCRYPTION3 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE3,
  PBKDF2: { ITERATIONS: ITERATIONS3, DIGEST_ALGORITHM: DIGEST_ALGORITHM3 },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH3 },
  },
} = ENCRYPTION3;
var generateAccountVerificationHash = (email, salt) => {
  const verificationHash = import_crypto3.default.pbkdf2Sync(email, salt, ITERATIONS3, KEY_LENGTH3, DIGEST_ALGORITHM3).toString(STRING_TYPE3);
  const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();
  return {
    verificationHash,
    verificationExpiry,
  };
};
var get_account_verification_hash_default = generateAccountVerificationHash;

// helpers/get-full-name-string/index.ts
var getFullNameString = (account2) => {
  const { firstName, lastName } = account2;
  const fullName = `${firstName} ${lastName}`;
  return fullName;
};
var get_full_name_string_default = getFullNameString;

// helpers/get-account-by-id/index.ts
var getAccountById = async (context, accountId) => {
  try {
    console.info('Getting account by ID');
    const account2 = await context.db.Account.findOne({
      where: {
        id: accountId,
      },
    });
    return account2;
  } catch (error) {
    console.error('Error getting account by ID %o', error);
    throw new Error(`Getting account by ID ${error}`);
  }
};
var get_account_by_id_default = getAccountById;

// helpers/update-account/index.ts
var account = async (context, accountId, updateData) => {
  try {
    console.info('Updating account');
    const updatedAccount = await context.db.Account.updateOne({
      where: {
        id: accountId,
      },
      data: updateData,
    });
    return updatedAccount;
  } catch (error) {
    console.error('Error updating account %o', error);
    throw new Error(`Updating account ${error}`);
  }
};
var accountStatus = async (context, accountStatusId, updateData) => {
  try {
    console.info('Updating account');
    const updatedAccountStatus = await context.db.AccountStatus.updateOne({
      where: {
        id: accountStatusId,
      },
      data: {
        ...updateData,
        updatedAt: /* @__PURE__ */ new Date(),
      },
    });
    return updatedAccountStatus;
  } catch (error) {
    console.error('Error updating account status %o', error);
    throw new Error(`Updating account status ${error}`);
  }
};
var update = {
  account,
  accountStatus,
};
var update_account_default = update;

// helpers/send-email-confirm-email-address/index.ts
var send2 = async (context, urlOrigin, accountId) => {
  try {
    console.info('Sending email verification %s %s', urlOrigin, accountId);
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info('Sending email verification - no account exists with the provided account ID');
      return {
        success: false,
      };
    }
    let latestVerificationHash = '';
    let verificationHasExpired = false;
    if (account2.verificationExpiry) {
      verificationHasExpired = dateIsInThePast(account2.verificationExpiry);
    }
    if (account2.verificationHash && !verificationHasExpired) {
      latestVerificationHash = account2.verificationHash;
    } else {
      const { email: email2, salt } = account2;
      const { verificationHash, verificationExpiry } = get_account_verification_hash_default(email2, salt);
      const accountUpdate = { verificationHash, verificationExpiry };
      latestVerificationHash = verificationHash;
      await update_account_default.account(context, accountId, accountUpdate);
    }
    const { email, id } = account2;
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, latestVerificationHash, id);
    if (emailResponse?.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${emailResponse}`);
  } catch (error) {
    console.error('Error sending email verification (sendEmailConfirmEmailAddress helper) %o', error);
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${error}`);
  }
};
var confirmEmailAddressEmail = {
  send: send2,
};
var send_email_confirm_email_address_default = confirmEmailAddressEmail;

// helpers/send-email-reactivate-account-link/index.ts
var import_crypto4 = __toESM(require('crypto'));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE4,
    PBKDF2: { ITERATIONS: ITERATIONS4, DIGEST_ALGORITHM: DIGEST_ALGORITHM4 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH4 },
    },
  },
} = ACCOUNT2;
var send3 = async (variables, context) => {
  try {
    console.info('Received a request to send reactivate account email/link - checking account - sendEmailReactivateAccountLinkHelper');
    const { urlOrigin, accountId } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info('Unable to check account and send reactivate account email/link - no account found');
      return { success: false };
    }
    const { email } = account2;
    console.info('Generating hash for account reactivation');
    const reactivationHash = import_crypto4.default.pbkdf2Sync(email, account2.salt, ITERATIONS4, KEY_LENGTH4, DIGEST_ALGORITHM4).toString(STRING_TYPE4);
    const accountUpdate = {
      reactivationHash,
      reactivationExpiry: ACCOUNT2.REACTIVATION_EXPIRY(),
    };
    console.info('Updating account for reactivation');
    await update_account_default.account(context, accountId, accountUpdate);
    console.info('Sending reactivate account email/link');
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.reactivateAccountLink(urlOrigin, email, name, reactivationHash);
    if (emailResponse.success) {
      return {
        ...emailResponse,
        email,
        accountId,
      };
    }
    return { accountId, email, success: false };
  } catch (error) {
    console.error('Error checking account and sending reactivate account email/link (sendEmailReactivateAccountLink helper) %o', error);
    throw new Error(`Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink helper) ${error}`);
  }
};
var sendEmailReactivateAccountLinkHelper = {
  send: send3,
};
var send_email_reactivate_account_link_default = sendEmailReactivateAccountLinkHelper;

// custom-resolvers/mutations/create-an-account/index.ts
var createAnAccount = async (root, variables, context) => {
  console.info('Account creation - %s', variables.email);
  const { NODE_ENV: NODE_ENV3 } = process.env;
  const isDevEnvironment3 = NODE_ENV3 === 'development';
  try {
    const { urlOrigin, firstName, lastName, email, password: password2 } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (account2) {
      console.info('Account creation - account already exists %s', email);
      if (is_valid_account_password_default(password2, account2.salt, account2.hash)) {
        console.info('Account creation - account already exists - valid credentials provided %s', email);
        if (account2.status.isBlocked) {
          console.info('Account creation - unable to create a new account - account already exists and is blocked %s', email);
          const { id: accountId2 } = account2;
          const reactivateAccountVariables = {
            accountId: accountId2,
            urlOrigin,
          };
          console.info('Account creation - resending an email for reactivation %s', email);
          const emailResponse2 = await send_email_reactivate_account_link_default.send(reactivateAccountVariables, context);
          if (emailResponse2.success) {
            return {
              id: accountId2,
              success: true,
              alreadyExists: true,
              isVerified: false,
              isBlocked: true,
            };
          }
          return {
            success: false,
            alreadyExists: true,
          };
        }
        if (!account2.status.isVerified) {
          console.info('Account creation - unable to create a new account - account already exists and is not verified %s', email);
          const { id: accountId2 } = account2;
          console.info('Account creation - resending an email verification for %s', email);
          const emailResponse2 = await send_email_confirm_email_address_default.send(context, urlOrigin, accountId2);
          if (emailResponse2.success) {
            return {
              id: accountId2,
              success: true,
              alreadyExists: true,
              isVerified: false,
            };
          }
        }
        console.info('Account creation - unable to create a new account - account already exists and is verified %s', email);
        return {
          success: false,
          alreadyExists: true,
          isVerified: true,
        };
      }
      console.info('Account creation - account already exists - invalid credentials provided %s', email);
      return { success: false };
    }
    console.info('Account creation - no existing account found. Generating an encrypted password %s', email);
    const { salt, hash } = encrypt_password_default(password2);
    const now2 = /* @__PURE__ */ new Date();
    const { verificationHash, verificationExpiry } = get_account_verification_hash_default(email, salt);
    console.info('Account creation - constructing account data %s', email);
    const accountData = {
      firstName,
      lastName,
      email,
      salt,
      hash,
      verificationHash,
      verificationExpiry,
      createdAt: now2,
      updatedAt: now2,
    };
    console.info('Account creation - creating account %s', email);
    const creationResponse = await context.db.Account.createOne({
      data: accountData,
    });
    console.info('Account creation - creating account status relationship %s', email);
    const accountId = creationResponse.id;
    await context.db.AccountStatus.createOne({
      data: {
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });
    console.info('Account creation - sending an email verification for %s', email);
    const name = get_full_name_string_default(creationResponse);
    if (isDevEnvironment3) {
      const verificationUrl = `${variables.urlOrigin}/apply/create-account/verify-email?token=${verificationHash}&id=${accountId}`;
      console.info('\u2705 Account creation (dev environment only) - mimicking sending verification link via email \n%s', verificationUrl);
      return {
        id: accountId,
        verificationHash,
        success: true,
      };
    }
    const emailResponse = await emails_default.confirmEmailAddress(email, urlOrigin, name, verificationHash, accountId);
    if (emailResponse.success) {
      return {
        id: accountId,
        verificationHash,
        success: true,
      };
    }
    throw new Error(`Account creation - sending email verification for account creation ${emailResponse}`);
  } catch (error) {
    console.error('Error Account creation - creating account %o', error);
    throw new Error(`Account creation - creating account ${error}`);
  }
};
var create_an_account_default = createAnAccount;

// helpers/get-authentication-retries-by-account-id/index.ts
var getAuthenticationRetriesByAccountId = async (context, accountId) => {
  console.info('Getting authentication retries by account ID');
  try {
    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });
    return retries;
  } catch (error) {
    console.error('Error getting authentication retries by account ID %o', error);
    throw new Error(`Getting authentication retries by account ID ${error}`);
  }
};
var get_authentication_retries_by_account_id_default = getAuthenticationRetriesByAccountId;

// custom-resolvers/mutations/delete-an-account/index.ts
var deleteAnAccount = async (root, variables, context) => {
  console.info('Deleting account ', variables.email);
  try {
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, 'email', email);
    if (!account2) {
      console.info(`Unable to delete account - account not found`);
      return { success: false };
    }
    const { id: accountId } = account2;
    console.info('Checking authentication retry entries');
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    if (retries.length) {
      console.info('Deleting authentication retry entries');
      const retriesArray = retries.map((retry) => ({
        id: retry.id,
      }));
      await context.db.AuthenticationRetry.deleteMany({
        where: retriesArray,
      });
    }
    console.info('Deleting account %s', accountId);
    await context.db.Account.deleteOne({
      where: {
        id: accountId,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting account %o', error);
    throw new Error(`Deleting account ${error}`);
  }
};
var delete_an_account_default = deleteAnAccount;

// custom-resolvers/mutations/verify-account-email-address/index.ts
var import_date_fns3 = require('date-fns');
var { ID, EMAIL: EMAIL2, VERIFICATION_EXPIRY } = account_default;
var verifyAccountEmailAddress = async (root, variables, context) => {
  try {
    console.info('Verifying account email address');
    const account2 = await get_account_by_field_default(context, ID, variables.id);
    if (!account2) {
      console.info('Unable to verify account email address - account does not exist');
      return {
        success: false,
        invalid: true,
      };
    }
    if (account2.verificationHash !== variables.token) {
      console.info('Unable to verify account email address - token does not match hash');
      return {
        success: false,
        invalid: true,
      };
    }
    if (account2.status.isVerified) {
      console.info('Account email address is already verified');
      return {
        success: true,
      };
    }
    const { id } = account2;
    const { id: statusId } = account2.status;
    const now2 = /* @__PURE__ */ new Date();
    const canActivateAccount = (0, import_date_fns3.isBefore)(now2, account2[VERIFICATION_EXPIRY]);
    if (!canActivateAccount) {
      console.info('Unable to verify account email address - verification period has expired');
      return {
        expired: true,
        success: false,
        accountId: id,
      };
    }
    console.info('Verified account email address - updating account to be verified');
    const accountUpdate = {
      verificationHash: '',
      verificationExpiry: null,
    };
    const statusUpdate = {
      isVerified: true,
    };
    await update_account_default.account(context, id, accountUpdate);
    await update_account_default.accountStatus(context, statusId, statusUpdate);
    return {
      success: true,
      accountId: id,
      emailRecipient: account2[EMAIL2],
    };
  } catch (error) {
    console.error('Error verifying account email address %o', error);
    throw new Error(`Verifying account email address ${error}`);
  }
};
var verify_account_email_address_default = verifyAccountEmailAddress;

// custom-resolvers/mutations/send-email-confirm-email-address/index.ts
var sendEmailConfirmEmailAddressMutation = async (root, variables, context) => {
  try {
    console.info('Sending email verification for account creation');
    const emailResponse = await send_email_confirm_email_address_default.send(context, variables.urlOrigin, variables.accountId);
    if (emailResponse.success) {
      return emailResponse;
    }
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (error) {
    console.error('Error sending email verification for account creation (sendEmailConfirmEmailAddress mutation) %o', error);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${error}`);
  }
};
var send_email_confirm_email_address_default2 = sendEmailConfirmEmailAddressMutation;

// helpers/create-authentication-retry-entry/index.ts
var createAuthenticationRetryEntry = async (context, accountId) => {
  try {
    console.info('Creating account authentication retry entry');
    const now2 = /* @__PURE__ */ new Date();
    const response = await context.db.AuthenticationRetry.createOne({
      data: {
        account: {
          connect: {
            id: accountId,
          },
        },
        createdAt: now2,
      },
    });
    if (response.id) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating account authentication retry entry %o', error);
    throw new Error(`${error}`);
  }
};
var create_authentication_retry_entry_default = createAuthenticationRetryEntry;

// helpers/should-block-account/index.ts
var import_date_fns4 = require('date-fns');
var { MAX_AUTH_RETRIES, MAX_AUTH_RETRIES_TIMEFRAME } = ACCOUNT2;
var shouldBlockAccount = async (context, accountId) => {
  console.info('Checking account authentication retries %s', accountId);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const now2 = /* @__PURE__ */ new Date();
    const retriesInTimeframe = [];
    retries.forEach((retry) => {
      const retryDate = retry.createdAt;
      const isWithinLast24Hours = (0, import_date_fns4.isAfter)(retryDate, MAX_AUTH_RETRIES_TIMEFRAME) && (0, import_date_fns4.isBefore)(retryDate, now2);
      if (isWithinLast24Hours) {
        retriesInTimeframe.push(retry.id);
      }
    });
    if (retriesInTimeframe.length >= MAX_AUTH_RETRIES) {
      console.info('Account authentication retries exceeds the threshold %s', accountId);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking account authentication retries %o', error);
    throw new Error(`Checking account authentication retries  ${error}`);
  }
};
var should_block_account_default = shouldBlockAccount;

// helpers/block-account/index.ts
var blockAccount = async (context, statusId) => {
  console.info('Blocking account %s', statusId);
  try {
    const statusUpdate = { isBlocked: true };
    const result = await update_account_default.accountStatus(context, statusId, statusUpdate);
    if (result.id) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error blocking account %o', error);
    throw new Error(`Blocking account ${error}`);
  }
};
var block_account_default = blockAccount;

// custom-resolvers/mutations/account-sign-in/account-sign-in-checks/index.ts
var import_config5 = require('dotenv/config');

// helpers/generate-otp/index.ts
var import_crypto5 = __toESM(require('crypto'));
var import_otplib = require('otplib');
var { ENCRYPTION: ENCRYPTION4, OTP } = ACCOUNT2;
var {
  RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE2,
  STRING_TYPE: STRING_TYPE5,
  PBKDF2: { ITERATIONS: ITERATIONS5, DIGEST_ALGORITHM: DIGEST_ALGORITHM5 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH5 },
  },
} = ENCRYPTION4;
var generateOtp = () => {
  try {
    console.info('Generating OTP');
    const salt = import_crypto5.default.randomBytes(RANDOM_BYTES_SIZE2).toString(STRING_TYPE5);
    import_otplib.authenticator.options = { digits: OTP.DIGITS };
    const securityCode = import_otplib.authenticator.generate(salt);
    const hash = import_crypto5.default.pbkdf2Sync(securityCode, salt, ITERATIONS5, KEY_LENGTH5, DIGEST_ALGORITHM5).toString(STRING_TYPE5);
    const expiry = OTP.VERIFICATION_EXPIRY();
    return {
      securityCode,
      salt,
      hash,
      expiry,
    };
  } catch (error) {
    console.error('Error generating OTP %o', error);
    throw new Error(`Error generating OTP ${error}`);
  }
};
var generate = {
  otp: generateOtp,
};
var generate_otp_default = generate;

// helpers/generate-otp-and-update-account/index.ts
var generateOTPAndUpdateAccount = async (context, accountId) => {
  try {
    console.info('Adding OTP to an account');
    const otp = generate_otp_default.otp();
    const { securityCode, salt, hash, expiry } = otp;
    const accountUpdate = {
      otpSalt: salt,
      otpHash: hash,
      otpExpiry: expiry,
    };
    const updatedAccount = await update_account_default.account(context, accountId, accountUpdate);
    const accountStatusUpdate = { isInactive: false };
    await update_account_default.accountStatus(context, String(updatedAccount.statusId), accountStatusUpdate);
    return {
      success: true,
      securityCode,
    };
  } catch (error) {
    console.error('Error adding OTP to an account %o', error);
    throw new Error(`Adding OTP to an account ${error}`);
  }
};
var generate_otp_and_update_account_default = generateOTPAndUpdateAccount;

// custom-resolvers/mutations/account-sign-in/account-sign-in-checks/index.ts
var accountSignInChecks = async (context, account2, urlOrigin) => {
  try {
    console.info('Signing in account - checking account');
    const { NODE_ENV: NODE_ENV3 } = process.env;
    const isDevEnvironment3 = NODE_ENV3 === 'development';
    const { id: accountId, email } = account2;
    if (!account2.status.isVerified) {
      console.info('Unable to sign in account - account has not been verified yet. Sending a new email verification');
      const emailResponse2 = await send_email_confirm_email_address_default.send(context, urlOrigin, accountId);
      if (emailResponse2?.success) {
        return {
          success: false,
          resentVerificationEmail: true,
          accountId,
        };
      }
      return { success: false, accountId };
    }
    console.info('Signing in account - account is verified. Generating and sending an OTP');
    const { securityCode } = await generate_otp_and_update_account_default(context, accountId);
    const name = get_full_name_string_default(account2);
    if (isDevEnvironment3) {
      console.info('\u2705 Signing in account (dev environment only) - mimicking sending OTP via email %s', securityCode);
      return {
        accountId,
        success: true,
      };
    }
    const emailResponse = await emails_default.accessCodeEmail(email, name, securityCode);
    if (emailResponse?.success) {
      return {
        ...emailResponse,
        accountId,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) %o', error);
    throw new Error(`Validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) ${error}`);
  }
};
var account_sign_in_checks_default = accountSignInChecks;

// custom-resolvers/mutations/account-sign-in/index.ts
var accountSignIn = async (root, variables, context) => {
  try {
    console.info('Signing in account');
    const { urlOrigin, email, password: password2 } = variables;
    const accountData = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!accountData) {
      console.info('Unable to validate account - no account found');
      return { success: false };
    }
    const account2 = accountData;
    const { id: accountId } = account2;
    console.info('Signing in account - account found %s', accountId);
    const { isBlocked } = account2.status;
    if (isBlocked) {
      console.info('Unable to sign in account - account is blocked');
      return { success: false, isBlocked: true, accountId };
    }
    if (is_valid_account_password_default(password2, account2.salt, account2.hash)) {
      console.info('Signing in account - valid credentials provided');
      return account_sign_in_checks_default(context, account2, urlOrigin);
    }
    console.info('Signing in account - invalid credentials provided');
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      const blocked = await block_account_default(context, account2.status.id);
      if (blocked) {
        return {
          success: false,
          isBlocked: true,
          accountId,
        };
      }
      return { success: false };
    }
    return { success: false };
  } catch (error) {
    console.error('Error signing into account %o', error);
    throw new Error(`Signing in account (accountSignIn mutation) ${error}`);
  }
};
var account_sign_in_default = accountSignIn;

// custom-resolvers/mutations/account-sign-in-new-code/index.ts
var accountSignInSendNewCode = async (root, variables, context) => {
  try {
    console.info('Generating and sending new sign in code for account');
    const { accountId } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info('Unable to validate account - no account found');
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account2.id);
    const { email } = account2;
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.accessCodeEmail(email, name, String(securityCode));
    if (emailResponse?.success) {
      return {
        ...emailResponse,
        accountId: account2.id,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error generating and sending new sign in code for account (accountSignInSendNewCode mutation) %o', error);
    throw new Error(`Generating and sending new sign in code for account (accountSignInSendNewCode mutation) ${error}`);
  }
};
var account_sign_in_new_code_default = accountSignInSendNewCode;

// helpers/is-valid-otp/index.ts
var import_crypto6 = __toESM(require('crypto'));
var { ENCRYPTION: ENCRYPTION5 } = ACCOUNT2;
var {
  STRING_TYPE: STRING_TYPE6,
  PBKDF2: { ITERATIONS: ITERATIONS6, DIGEST_ALGORITHM: DIGEST_ALGORITHM6 },
  OTP: {
    PBKDF2: { KEY_LENGTH: KEY_LENGTH6 },
  },
} = ENCRYPTION5;
var isValidOTP = (securityCode, otpSalt, otpHash) => {
  try {
    console.info('Validating OTP');
    const hashVerify = import_crypto6.default.pbkdf2Sync(securityCode, otpSalt, ITERATIONS6, KEY_LENGTH6, DIGEST_ALGORITHM6).toString(STRING_TYPE6);
    if (otpHash === hashVerify) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error validating OTP %o', error);
    throw new Error(`Error validating OTP ${error}`);
  }
};
var is_valid_otp_default = isValidOTP;

// helpers/delete-authentication-retries/index.ts
var deleteAuthenticationRetries = async (context, accountId) => {
  console.info('Deleting authentication retries for account %s', accountId);
  try {
    const retries = await get_authentication_retries_by_account_id_default(context, accountId);
    const retryIds = retries.map((obj) => ({
      id: obj.id,
    }));
    const result = await context.db.AuthenticationRetry.deleteMany({
      where: retryIds,
    });
    return result;
  } catch (error) {
    console.error('Error deleting authentication retries %o', error);
    throw new Error(`Deleting authentication retries ${error}`);
  }
};
var delete_authentication_retries_default = deleteAuthenticationRetries;

// helpers/create-jwt/index.ts
var import_crypto7 = __toESM(require('crypto'));
var import_jsonwebtoken = __toESM(require('jsonwebtoken'));
var {
  ENCRYPTION: { RANDOM_BYTES_SIZE: RANDOM_BYTES_SIZE3, STRING_TYPE: STRING_TYPE7 },
  JWT: {
    KEY: { SIGNATURE, ENCODING, STRING_ENCODING },
    TOKEN: { EXPIRY, ALGORITHM },
  },
} = ACCOUNT2;
var PRIV_KEY = Buffer.from(SIGNATURE, ENCODING).toString(STRING_ENCODING);
var createJWT = (accountId) => {
  const sessionIdentifier = import_crypto7.default.randomBytes(RANDOM_BYTES_SIZE3).toString(STRING_TYPE7);
  const expiresIn = EXPIRY;
  const payload = {
    sub: accountId,
    sessionIdentifier,
  };
  const signedToken = import_jsonwebtoken.default.sign(payload, PRIV_KEY, { expiresIn, algorithm: ALGORITHM });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
    sessionIdentifier,
  };
};
var create = {
  JWT: createJWT,
};
var create_jwt_default = create;

// custom-resolvers/mutations/verify-account-sign-in-code/index.ts
var {
  JWT: { SESSION_EXPIRY },
} = ACCOUNT2;
var verifyAccountSignInCode = async (root, variables, context) => {
  try {
    console.info('Verifying account sign in code');
    const { accountId, securityCode } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info('Unable to verify account sign in code - no account exists with the provided ID');
      return {
        success: false,
      };
    }
    if (!account2.otpSalt || !account2.otpHash || !account2.otpExpiry) {
      console.info('Unable to verify account sign in code - no OTP available for this account');
      return {
        success: false,
      };
    }
    const { otpSalt, otpHash, otpExpiry } = account2;
    const hasExpired = dateIsInThePast(otpExpiry);
    if (hasExpired) {
      console.info('Unable to verify account sign in code - verification period has expired');
      return {
        success: false,
        expired: true,
      };
    }
    const isValid = otpSalt && otpHash && is_valid_otp_default(securityCode, otpSalt, otpHash);
    if (isValid) {
      console.info('Verified account sign in code - creating JWT and updating account');
      await delete_authentication_retries_default(context, accountId);
      const jwt = create_jwt_default.JWT(accountId);
      const { sessionIdentifier } = jwt;
      const accountUpdate = {
        sessionIdentifier,
        sessionExpiry: SESSION_EXPIRY(),
        otpSalt: '',
        otpHash: '',
        otpExpiry: null,
      };
      await update_account_default.account(context, accountId, accountUpdate);
      return {
        success: true,
        accountId: account2.id,
        lastName: account2.lastName,
        firstName: account2.firstName,
        email: account2.email,
        ...jwt,
        expires: accountUpdate.sessionExpiry,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) %o', error);
    throw new Error(`Verifying account sign in code and generating JWT (verifyAccountSignInCode mutation) ${error}`);
  }
};
var verify_account_sign_in_code_default = verifyAccountSignInCode;

// custom-resolvers/mutations/add-and-get-OTP/index.ts
var addAndGetOTP = async (root, variables, context) => {
  try {
    console.info('Adding OTP to an account');
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info('Unable to generate and add OTP to an account - no account found');
      return { success: false };
    }
    const { securityCode } = await generate_otp_and_update_account_default(context, account2.id);
    return {
      success: true,
      securityCode,
    };
  } catch (error) {
    console.error('Error adding OTP to an account (addAndGetOTP mutation) %o', error);
    throw new Error(`Adding OTP to an account (addAndGetOTP mutation) ${error}`);
  }
};
var add_and_get_OTP_default = addAndGetOTP;

// custom-resolvers/mutations/send-email-password-reset-link/index.ts
var import_crypto8 = __toESM(require('crypto'));
var {
  ENCRYPTION: {
    STRING_TYPE: STRING_TYPE8,
    PBKDF2: { ITERATIONS: ITERATIONS7, DIGEST_ALGORITHM: DIGEST_ALGORITHM7 },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH: KEY_LENGTH7 },
    },
  },
} = ACCOUNT2;
var sendEmailPasswordResetLink = async (root, variables, context) => {
  try {
    console.info('Received a password reset request - checking account');
    const { urlOrigin, email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info('Unable to check account and send password reset email - no account found');
      return { success: false };
    }
    const { id: accountId } = account2;
    const { id: statusId } = account2.status;
    const newRetriesEntry = await create_authentication_retry_entry_default(context, accountId);
    if (!newRetriesEntry?.success) {
      return { success: false };
    }
    const needToBlockAccount = await should_block_account_default(context, accountId);
    if (needToBlockAccount) {
      try {
        const blocked = await block_account_default(context, statusId);
        if (blocked) {
          return {
            success: false,
            isBlocked: true,
            accountId,
          };
        }
      } catch (error) {
        console.error('Error blocking account %o', error);
        return { success: false };
      }
    }
    console.info('Generating password reset hash');
    const passwordResetHash = import_crypto8.default.pbkdf2Sync(email, account2.salt, ITERATIONS7, KEY_LENGTH7, DIGEST_ALGORITHM7).toString(STRING_TYPE8);
    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT2.PASSWORD_RESET_EXPIRY(),
    };
    console.info('Updating account for password reset');
    await update_account_default.account(context, accountId, accountUpdate);
    console.info('Sending password reset email');
    const name = get_full_name_string_default(account2);
    const emailResponse = await emails_default.passwordResetLink(urlOrigin, email, name, passwordResetHash);
    if (emailResponse?.success) {
      return emailResponse;
    }
    return { success: false };
  } catch (error) {
    console.error('Error checking account and sending password reset email (sendEmailPasswordResetLink mutation) %o', error);
    throw new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${error}`);
  }
};
var send_email_password_reset_link_default = sendEmailPasswordResetLink;

// helpers/account-has-used-password-before/index.ts
var hasAccountUsedPasswordBefore = async (context, accountId, newPassword) => {
  console.info('Checking if an account has used a password before');
  try {
    let usedBefore = false;
    const previousHashes = await context.db.Authentication.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });
    if (previousHashes.length) {
      previousHashes.forEach((previous) => {
        const newHashPreviousSalt = get_password_hash_default(newPassword, previous.salt);
        if (newHashPreviousSalt === previous.hash) {
          usedBefore = true;
        }
      });
    }
    return usedBefore;
  } catch (error) {
    console.error('Error checking if an account has used a password before %o', error);
    throw new Error(`Checking if an account has used a password before ${error}`);
  }
};
var account_has_used_password_before_default = hasAccountUsedPasswordBefore;

// helpers/create-authentication-entry/index.ts
var createAuthenticationEntry = async (context, entry) => {
  console.info('Creating authentication entry');
  try {
    const result = await context.db.Authentication.createOne({
      data: {
        ...entry,
        createdAt: /* @__PURE__ */ new Date(),
      },
    });
    return result;
  } catch (error) {
    console.error('Error creating authentication entry %o', error);
    throw new Error(`Creating authentication entry ${error}`);
  }
};
var create_authentication_entry_default = createAuthenticationEntry;

// custom-resolvers/mutations/account-password-reset/index.ts
var accountPasswordReset = async (root, variables, context) => {
  console.info('Resetting account password');
  try {
    const { token, password: newPassword } = variables;
    const account2 = await get_account_by_field_default(context, account_default.PASSWORD_RESET_HASH, token);
    if (!account2) {
      console.info('Unable to reset account password - account does not exist');
      return { success: false };
    }
    const {
      status: { isBlocked },
    } = account2;
    if (isBlocked) {
      console.info('Unable to reset account password - account is blocked');
      return { success: false };
    }
    const { id: accountId, passwordResetHash, passwordResetExpiry, salt: currentSalt, hash: currentHash } = account2;
    if (!passwordResetHash || !passwordResetExpiry) {
      console.info('Unable to reset account password - reset hash or expiry does not exist');
      return { success: false };
    }
    const hasExpired = dateIsInThePast(passwordResetExpiry);
    if (hasExpired) {
      console.info('Unable to reset account password - verification period has expired');
      return {
        success: false,
        expired: true,
      };
    }
    const newHashCurrentSalt = get_password_hash_default(newPassword, currentSalt);
    const passwordIsTheSame = newHashCurrentSalt === currentHash;
    if (passwordIsTheSame) {
      console.info('Unable to reset account password - provided password is the same');
      return {
        success: false,
        hasBeenUsedBefore: true,
      };
    }
    const usedPasswordBefore = await account_has_used_password_before_default(context, accountId, newPassword);
    if (usedPasswordBefore) {
      console.info('Unable to reset account password - provided password has been used before');
      return {
        success: false,
        hasBeenUsedBefore: true,
      };
    }
    await delete_authentication_retries_default(context, accountId);
    const authEntry = {
      account: {
        connect: {
          id: accountId,
        },
      },
      salt: currentSalt,
      hash: currentHash,
    };
    await create_authentication_entry_default(context, authEntry);
    const { salt: newSalt, hash: newHash } = encrypt_password_default(newPassword);
    const accountUpdate = {
      salt: newSalt,
      hash: newHash,
      passwordResetHash: '',
      passwordResetExpiry: null,
    };
    await update_account_default.account(context, accountId, accountUpdate);
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error resetting account password %o', error);
    throw new Error(`Resetting account password ${error}`);
  }
};
var account_password_reset_default = accountPasswordReset;

// custom-resolvers/mutations/send-email-reactivate-account-link/index.ts
var sendEmailReactivateAccountLink = async (root, variables, context) => {
  try {
    console.info('Received a request to send reactivate account email/link - checking account');
    const reactiveAccountResponse = await send_email_reactivate_account_link_default.send(variables, context);
    return reactiveAccountResponse;
  } catch (error) {
    console.error('Error checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) %o', error);
    throw new Error(`Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) ${error}`);
  }
};
var send_email_reactivate_account_link_default2 = sendEmailReactivateAccountLink;

// helpers/create-an-application/create-initial-application/index.ts
var import_date_fns5 = require('date-fns');

// constants/application/initial-application-data/index.ts
var { STATUS, LATEST_VERSION_NUMBER: LATEST_VERSION_NUMBER2, DEAL_TYPE, SUBMISSION_COUNT_DEFAULT } = APPLICATION;
var INITIAL_APPLICATION_DATA = {
  status: STATUS.IN_PROGRESS,
  version: LATEST_VERSION_NUMBER2,
  dealType: DEAL_TYPE,
  submissionCount: SUBMISSION_COUNT_DEFAULT,
};
var initial_application_data_default = INITIAL_APPLICATION_DATA;

// helpers/create-an-application/create-initial-application/index.ts
var { STATUS: STATUS2, SUBMISSION_DEADLINE_IN_MONTHS, SUBMISSION_TYPE: SUBMISSION_TYPE2 } = APPLICATION;
var { status: inititalStatus, ...APPLICATION_FIELDS } = initial_application_data_default;
var createInitialApplication = async ({ context, accountId, status = STATUS2.IN_PROGRESS }) => {
  try {
    console.info('Creating initial application (createInitialApplication helper) for user %s', accountId);
    const now2 = /* @__PURE__ */ new Date();
    const application2 = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId },
        },
        createdAt: now2,
        status,
        submissionDeadline: (0, import_date_fns5.addMonths)(new Date(now2), SUBMISSION_DEADLINE_IN_MONTHS),
        submissionType: SUBMISSION_TYPE2.MIA,
        updatedAt: now2,
        ...APPLICATION_FIELDS,
      },
    });
    return application2;
  } catch (error) {
    console.error('Error creating initial application (createInitialApplication helper) for user %s %o', accountId, error);
    throw new Error(`Creating initial application (createInitialApplication helper) for user ${accountId} ${error}`);
  }
};
var initialApplication = {
  create: createInitialApplication,
};
var create_initial_application_default = initialApplication;

// helpers/get-country-by-field/index.ts
var getCountryByField = async (context, field, value) => {
  try {
    console.info('Getting country by field/value');
    const countriesArray = await context.db.Country.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });
    if (!countriesArray?.length || !countriesArray[0]) {
      console.info('Getting country by field - no country exists with the provided field/value');
      return false;
    }
    const country = countriesArray[0];
    return country;
  } catch (error) {
    console.error('Error getting country by field/value %o', error);
    throw new Error(`Getting country by field/value ${error}`);
  }
};
var get_country_by_field_default = getCountryByField;

// helpers/get-cover-period-value-by-field/index.ts
var getCoverPeriodValueByField = async (context, field, value) => {
  try {
    console.info('Getting coverPeriod by field/value $s %s %d', field, value);
    const coverPeriodsArray = await context.db.CoverPeriod.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });
    if (!coverPeriodsArray?.length || !coverPeriodsArray[0]) {
      console.info('Getting coverPeriod by field - no coverPeriod exists with the provided field/value');
      return false;
    }
    const [coverPeriod] = coverPeriodsArray;
    return coverPeriod;
  } catch (error) {
    console.error('Error getting coverPeriod by field/value %o', error);
    throw new Error(`Getting coverPeriod by field/value ${error}`);
  }
};
var get_cover_period_value_by_field_default = getCoverPeriodValueByField;

// helpers/get-total-contract-value-by-field/index.ts
var getTotalContractValueByField = async (context, field, value) => {
  try {
    console.info('Getting totalContractValue by field/value $s %s, %s', field, value);
    const totalContractValuesArray = await context.db.TotalContractValue.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });
    if (!totalContractValuesArray?.length || !totalContractValuesArray[0]) {
      console.info('Getting totalContractValue by field - no totalContractValue exists with the provided field/value');
      return false;
    }
    const [totalContractValue] = totalContractValuesArray;
    return totalContractValue;
  } catch (error) {
    console.error('Error getting totalContractValue by field/value %o', error);
    throw new Error(`Getting totalContractValue by field/value ${error}`);
  }
};
var get_total_contract_value_by_field_default = getTotalContractValueByField;

// helpers/create-a-reference-number/index.ts
var createAReferenceNumber = async (context, applicationId) => {
  console.info('Creating a reference number for %s', applicationId);
  try {
    const created = await context.db.ReferenceNumber.createOne({
      data: {
        application: {
          connect: {
            id: applicationId,
          },
        },
      },
    });
    return created.id;
  } catch (error) {
    console.error('Error creating a reference number %o', error);
    throw new Error(`Creating a reference number ${error}`);
  }
};
var create_a_reference_number_default = createAReferenceNumber;

// helpers/create-a-broker/index.ts
var createABroker = async (context, applicationId) => {
  console.info('Creating a broker for %s', applicationId);
  try {
    const broker = await context.db.Broker.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });
    return broker;
  } catch (error) {
    console.error('Error creating a broker %o', error);
    throw new Error(`Creating a broker ${error}`);
  }
};
var create_a_broker_default = createABroker;

// helpers/create-a-business/index.ts
var createABusiness = async (context, applicationId) => {
  console.info('Creating a business for %s', applicationId);
  try {
    const business = await context.db.Business.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });
    return business;
  } catch (error) {
    console.error('Error creating a business %o', error);
    throw new Error(`Creating a business ${error}`);
  }
};
var create_a_business_default = createABusiness;

// helpers/create-a-buyer-trading-history/index.ts
var createABuyerTradingHistory = async (context, buyerId, applicationId) => {
  console.info('Creating a buyer trading history for %s', buyerId);
  try {
    const buyerTradingHistory = await context.db.BuyerTradingHistory.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        application: {
          connect: {
            id: applicationId,
          },
        },
        currencyCode: APPLICATION.DEFAULT_CURRENCY,
      },
    });
    return buyerTradingHistory;
  } catch (error) {
    console.error('Error creating a buyer trading history %o', error);
    throw new Error(`Creating a buyer trading history ${error}`);
  }
};
var create_a_buyer_trading_history_default = createABuyerTradingHistory;

// helpers/create-a-buyer-contact/index.ts
var createABuyerContact = async (context, buyerId, applicationId) => {
  console.info('Creating a buyer contact for %s', buyerId);
  try {
    const buyerContact = await context.db.BuyerContact.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        application: {
          connect: {
            id: applicationId,
          },
        },
      },
    });
    return buyerContact;
  } catch (error) {
    console.error('Error creating a buyer contact %o', error);
    throw new Error(`Creating a buyer contact ${error}`);
  }
};
var create_a_buyer_contact_default = createABuyerContact;

// helpers/create-a-buyer-relationship/index.ts
var createABuyerRelationship = async (context, buyerId, applicationId) => {
  console.info('Creating a buyer relationship for %s', buyerId);
  try {
    const buyerRelationship = await context.db.BuyerRelationship.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        application: {
          connect: {
            id: applicationId,
          },
        },
      },
    });
    return buyerRelationship;
  } catch (error) {
    console.error('Error creating a buyer relationship %o', error);
    throw new Error(`Creating a buyer relationship ${error}`);
  }
};
var create_a_buyer_relationship_default = createABuyerRelationship;

// helpers/create-a-populated-buyer/index.ts
var createAPopulatedBuyer = async (context, countryId, applicationId) => {
  console.info('Creating a buyer for %s', applicationId);
  try {
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: { id: countryId },
        },
        application: {
          connect: { id: applicationId },
        },
      },
    });
    const buyerTradingHistory = await create_a_buyer_trading_history_default(context, buyer.id, applicationId);
    const buyerRelationship = await create_a_buyer_relationship_default(context, buyer.id, applicationId);
    const buyerContact = await create_a_buyer_contact_default(context, buyer.id, applicationId);
    return {
      ...buyer,
      buyerTradingHistory,
      relationship: buyerRelationship,
      buyerContact,
    };
  } catch (error) {
    console.error('Error creating a populated buyer %o', error);
    throw new Error(`Creating a populated buyer ${error}`);
  }
};
var create_a_populated_buyer_default = createAPopulatedBuyer;

// helpers/create-a-declaration-version/index.ts
var { ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIDENTIALITY, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  declarations_default2.LATEST_DECLARATIONS;
var createADeclarationVersion = async (context, declarationId) => {
  console.info('Creating an application declaration version for %s', declarationId);
  try {
    const declaration = await context.db.DeclarationVersion.createOne({
      data: {
        declaration: {
          connect: { id: declarationId },
        },
        agreeToAntiBribery: ANTI_BRIBERY,
        agreeToConfidentiality: CONFIDENTIALITY,
        agreeToConfirmationAndAcknowledgements: CONFIRMATION_AND_ACKNOWLEDGEMENTS,
        hasAntiBriberyCodeOfConduct: ANTI_BRIBERY_CODE_OF_CONDUCT,
        willExportWithAntiBriberyCodeOfConduct: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      },
    });
    return declaration;
  } catch (error) {
    console.error('Error creating an application declaration version %o', error);
    throw new Error(`Creating an application declaration version ${error}`);
  }
};
var create_a_declaration_version_default = createADeclarationVersion;

// helpers/create-a-declaration-modern-slavery-version/index.ts
var { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } =
  declarations_default2.LATEST_MODERN_SLAVERY_DECLARATIONS;
var createADeclarationModernSlaveryVersion = async (context, declarationModernSlaveryId) => {
  console.info('Creating an application declaration modern slavery version for %s', declarationModernSlaveryId);
  try {
    const version = await context.db.DeclarationModernSlaveryVersion.createOne({
      data: {
        declarationModernSlavery: {
          connect: { id: declarationModernSlaveryId },
        },
        willAdhereToAllRequirements: WILL_ADHERE_TO_ALL_REQUIREMENTS,
        hasNoOffensesOrInvestigations: HAS_NO_OFFENSES_OR_INVESTIGATIONS,
        isNotAwareOfExistingSlavery: IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      },
    });
    return version;
  } catch (error) {
    console.error('Error creating an application declaration modern slavery version %o', error);
    throw new Error(`Creating an application declaration modern slavery version ${error}`);
  }
};
var create_a_declaration_modern_slavery_version_default = createADeclarationModernSlaveryVersion;

// helpers/create-a-declaration-modern-slavery/index.ts
var createADeclarationModernSlavery = async (context, declarationId) => {
  console.info('Creating an application declaration modern slavery for %s', declarationId);
  try {
    const declarationModernSlavery = await context.db.DeclarationModernSlavery.createOne({
      data: {
        declaration: {
          connect: { id: declarationId },
        },
      },
    });
    const declarationModernSlaveryVersion = await create_a_declaration_modern_slavery_version_default(context, declarationModernSlavery.id);
    return {
      ...declarationModernSlavery,
      declarationModernSlaveryVersion,
    };
  } catch (error) {
    console.error('Error creating an application declaration modern slavery %o', error);
    throw new Error(`Creating an application declaration modern slavery ${error}`);
  }
};
var create_a_declaration_modern_slavery_default = createADeclarationModernSlavery;

// helpers/create-a-declaration/index.ts
var createADeclaration = async (context, applicationId) => {
  console.info('Creating an application declaration for %s', applicationId);
  try {
    const declaration = await context.db.Declaration.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });
    const declarationVersion = await create_a_declaration_version_default(context, declaration.id);
    const declarationModernSlavery = await create_a_declaration_modern_slavery_default(context, declaration.id);
    return {
      ...declaration,
      declarationVersion,
      declarationModernSlavery,
    };
  } catch (error) {
    console.error('Error creating an application declaration %o', error);
    throw new Error(`Creating an application declaration ${error}`);
  }
};
var create_a_declaration_default = createADeclaration;

// helpers/create-an-eligibility/index.ts
var createAnEligibility = async (context, countryId, applicationId, coverPeriodId, totalContractValueId, eligibilityData) => {
  console.info('Creating an eligibility for %s', applicationId);
  try {
    const eligibility = await context.db.Eligibility.createOne({
      data: {
        buyerCountry: {
          connect: { id: countryId },
        },
        application: {
          connect: { id: applicationId },
        },
        coverPeriod: {
          connect: { id: coverPeriodId },
        },
        totalContractValue: {
          connect: { id: totalContractValueId },
        },
        ...eligibilityData,
      },
    });
    return eligibility;
  } catch (error) {
    console.error('Error creating an eligibility %o', error);
    throw new Error(`Creating an eligibility ${error}`);
  }
};
var create_an_eligibility_default = createAnEligibility;

// helpers/create-a-jointly-insured-party/index.ts
var createAJointlyInsuredParty = async (context, policyId) => {
  console.info('Creating a jointly insured party for %s', policyId);
  try {
    const jointlyInsuredParty = await context.db.JointlyInsuredParty.createOne({
      data: {
        policy: {
          connect: { id: policyId },
        },
      },
    });
    return jointlyInsuredParty;
  } catch (error) {
    console.error('Error creating a jointly insured party %o', error);
    throw new Error(`Creating a jointly insured party ${error}`);
  }
};
var create_a_jointly_insured_party_default = createAJointlyInsuredParty;

// helpers/create-a-policy/index.ts
var createAPolicy = async (context, applicationId) => {
  console.info('Creating a policy for %s', applicationId);
  try {
    const policy = await context.db.Policy.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        needPreCreditPeriodCover: APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
      },
    });
    const jointlyInsuredParty = await create_a_jointly_insured_party_default(context, policy.id);
    return {
      ...policy,
      jointlyInsuredParty,
    };
  } catch (error) {
    console.error('Error creating a policy %o', error);
    throw new Error(`Creating a policy ${error}`);
  }
};
var create_a_policy_default = createAPolicy;

// helpers/create-a-policy-contact/index.ts
var createAPolicyContact = async (context, applicationId) => {
  console.info('Creating a policy contact for %s', applicationId);
  try {
    const policyContact = await context.db.PolicyContact.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });
    return policyContact;
  } catch (error) {
    console.error('Error creating a policy contact %o', error);
    throw new Error(`Creating a policy contact ${error}`);
  }
};
var create_a_policy_contact_default = createAPolicyContact;

// helpers/create-a-loss-payee-financial-international/index.ts
var createALossPayeeFinancialInternational = async (context, lossPayeeId) => {
  console.info('Creating a loss payee financial (international) for %s', lossPayeeId);
  try {
    const lossPayeeFinancialInternational = await context.db.LossPayeeFinancialInternational.createOne({
      data: {
        lossPayee: {
          connect: { id: lossPayeeId },
        },
      },
    });
    const vector = await context.db.LossPayeeFinancialInternationalVector.createOne({
      data: {
        financialInternational: {
          connect: { id: lossPayeeFinancialInternational.id },
        },
      },
    });
    return {
      ...lossPayeeFinancialInternational,
      vector,
    };
  } catch (error) {
    console.error('Error creating a loss payee financial (international) for %o', error);
    throw new Error(`Creating a loss payee financial (international) for ${error}`);
  }
};
var create_a_loss_payee_financial_international_default = createALossPayeeFinancialInternational;

// helpers/create-a-loss-payee-financial-uk/index.ts
var createALossPayeeFinancialUk = async (context, lossPayeeId) => {
  console.info('Creating a loss payee financial (UK) for %s', lossPayeeId);
  try {
    const lossPayeeFinancialUk = await context.db.LossPayeeFinancialUk.createOne({
      data: {
        lossPayee: {
          connect: { id: lossPayeeId },
        },
      },
    });
    const vector = await context.db.LossPayeeFinancialUkVector.createOne({
      data: {
        financialUk: {
          connect: { id: lossPayeeFinancialUk.id },
        },
      },
    });
    return {
      ...lossPayeeFinancialUk,
      vector,
    };
  } catch (error) {
    console.error('Error creating a loss payee financial (UK) for %o', error);
    throw new Error(`Creating a loss payee financial (UK) for ${error}`);
  }
};
var create_a_loss_payee_financial_uk_default = createALossPayeeFinancialUk;

// helpers/create-a-nominated-loss-payee/index.ts
var createANominatedLossPayee = async (context, applicationId) => {
  console.info('Creating a nominated loss payee for %s', applicationId);
  try {
    const nominatedLossPayee = await context.db.NominatedLossPayee.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });
    await create_a_loss_payee_financial_international_default(context, nominatedLossPayee.id);
    await create_a_loss_payee_financial_uk_default(context, nominatedLossPayee.id);
    return nominatedLossPayee;
  } catch (error) {
    console.error('Error creating a nominated loss payee for %o', error);
    throw new Error(`Creating a nominated loss payee for ${error}`);
  }
};
var create_a_nominated_loss_payee_default = createANominatedLossPayee;

// helpers/create-a-company-address/index.ts
var createACompanyAddress = async (context, addressData, companyId) => {
  console.info('Creating a company address for %s', companyId);
  try {
    const companyAddress = await context.db.CompanyAddress.createOne({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
        ...addressData,
      },
    });
    return companyAddress;
  } catch (error) {
    console.error('Error creating a company address %o', error);
    throw new Error(`Creating a company address ${error}`);
  }
};
var create_a_company_address_default = createACompanyAddress;

// helpers/map-sic-codes/index.ts
var mapSicCodes = (sicCodes, industrySectorNames2, companyId) => {
  const mapped = [];
  if (!sicCodes.length) {
    return mapped;
  }
  sicCodes.forEach((code, index) => {
    let industrySectorName = '';
    if (industrySectorNames2?.[index]) {
      industrySectorName = industrySectorNames2[index];
    }
    const mappedCode = {
      sicCode: code,
      industrySectorName,
      company: {
        connect: {
          id: companyId,
        },
      },
    };
    mapped.push(mappedCode);
  });
  return mapped;
};
var map_sic_codes_default = mapSicCodes;

// helpers/create-company-sic-codes/index.ts
var createCompanySicCodes = async (context, companyId, sicCodes, industrySectorNames2) => {
  console.info('Creating company SIC codes for %s', companyId);
  try {
    if (sicCodes?.length) {
      const mappedSicCodes = map_sic_codes_default(sicCodes, industrySectorNames2, companyId);
      const createdSicCodes = await context.db.CompanySicCode.createMany({
        data: mappedSicCodes,
      });
      return createdSicCodes;
    }
    return [];
  } catch (error) {
    console.error('Error creating company SIC codes for %s %o', companyId, error);
    throw new Error(`Creating company SIC codes for ${companyId} ${error}`);
  }
};
var create_company_sic_codes_default = createCompanySicCodes;

// helpers/create-a-company-different-trading-address/index.ts
var createACompanyDifferentTradingAddress = async (context, companyId) => {
  console.info('Creating a different trading address for %s', companyId);
  try {
    const differentTradingAddress = await context.db.CompanyDifferentTradingAddress.createOne({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });
    return differentTradingAddress;
  } catch (error) {
    console.error('Error creating a company different trading address %o', error);
    throw new Error(`Creating a company different trading address ${error}`);
  }
};
var create_a_company_different_trading_address_default = createACompanyDifferentTradingAddress;

// helpers/create-a-company/index.ts
var createACompany = async (context, applicationId, companyData) => {
  console.info('Creating a company, address and SIC codes for %s', applicationId);
  try {
    const { registeredOfficeAddress, sicCodes, industrySectorNames: industrySectorNames2, ...companyFields } = companyData;
    const company = await context.db.Company.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        ...companyFields,
      },
    });
    const companyAddress = await create_a_company_address_default(context, registeredOfficeAddress, company.id);
    const createdSicCodes = await create_company_sic_codes_default(context, company.id, sicCodes, industrySectorNames2);
    const createdDifferentTradingAddress = await create_a_company_different_trading_address_default(context, company.id);
    return {
      ...company,
      registeredOfficeAddress: companyAddress,
      sicCodes: createdSicCodes,
      differentTradingAddress: createdDifferentTradingAddress,
    };
  } catch (error) {
    console.error('Error creating a company, address, SIC codes and company different trading address %o', error);
    throw new Error(`Creating a company, address, SIC codes and company different trading address ${error}`);
  }
};
var create_a_company_default = createACompany;

// helpers/create-a-private-market/index.ts
var createAPrivateMarket = async (context, exportContractId) => {
  console.info('Creating a private market for %s', exportContractId);
  try {
    const privateMarket = await context.db.PrivateMarket.createOne({
      data: {
        exportContract: {
          connect: { id: exportContractId },
        },
      },
    });
    return privateMarket;
  } catch (error) {
    console.error('Error creating a private market %o', error);
    throw new Error(`Creating a private market ${error}`);
  }
};
var create_a_private_market_default = createAPrivateMarket;

// helpers/create-an-export-contract-agent-service/index.ts
var createAnExportContractAgentService = async (context, agentId) => {
  console.info('Creating an export contract agent service for %s', agentId);
  try {
    const agentService = await context.db.ExportContractAgentService.createOne({
      data: {
        agent: {
          connect: { id: agentId },
        },
      },
    });
    return agentService;
  } catch (error) {
    console.error('Error creating an export contract agent service %o', error);
    throw new Error(`Creating an export contract agent service ${error}`);
  }
};
var create_an_export_contract_agent_service_default = createAnExportContractAgentService;

// helpers/create-an-export-contract-agent-service-charge/index.ts
var createAnExportContractAgentServiceCharge = async (context, agentServiceId) => {
  console.info('Creating an export contract agent service charge for %s', agentServiceId);
  try {
    const agentService = await context.db.ExportContractAgentServiceCharge.createOne({
      data: {
        service: {
          connect: { id: agentServiceId },
        },
      },
    });
    return agentService;
  } catch (error) {
    console.error('Error creating an export contract agent service charge %o', error);
    throw new Error(`Creating an export contract agent service charge ${error}`);
  }
};
var create_an_export_contract_agent_service_charge_default = createAnExportContractAgentServiceCharge;

// helpers/create-an-export-contract-agent/index.ts
var createAnExportContractAgent = async (context, exportContractId) => {
  console.info('Creating an export contract agent for %s', exportContractId);
  try {
    const agent = await context.db.ExportContractAgent.createOne({
      data: {
        exportContract: {
          connect: { id: exportContractId },
        },
      },
    });
    const agentService = await create_an_export_contract_agent_service_default(context, agent.id);
    const agentServiceCharge = await create_an_export_contract_agent_service_charge_default(context, agentService.id);
    return {
      agent,
      agentService,
      agentServiceCharge,
    };
  } catch (error) {
    console.error('Error creating an export contract agent %o', error);
    throw new Error(`Creating an export contract agent ${error}`);
  }
};
var create_an_export_contract_agent_default = createAnExportContractAgent;

// helpers/create-an-export-contract/index.ts
var createAnExportContract = async (context, applicationId) => {
  console.info('Creating an export contract for %s', applicationId);
  try {
    const exportContract = await context.db.ExportContract.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        finalDestinationKnown: APPLICATION.DEFAULT_FINAL_DESTINATION_KNOWN,
      },
    });
    const privateMarket = await create_a_private_market_default(context, exportContract.id);
    const { agent, agentService } = await create_an_export_contract_agent_default(context, exportContract.id);
    return {
      ...exportContract,
      privateMarket,
      agent,
      agentService,
    };
  } catch (error) {
    console.error('Error creating an export contract %o', error);
    throw new Error(`Creating an export contract ${error}`);
  }
};
var create_an_export_contract_default = createAnExportContract;

// helpers/create-a-section-review/index.ts
var createASectionReview = async (context, applicationId, sectionReviewData) => {
  console.info('Creating a section review for %s', applicationId);
  try {
    const sectionReview = await context.db.SectionReview.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        ...sectionReviewData,
      },
    });
    return sectionReview;
  } catch (error) {
    console.error('Error creating a section review %o', error);
    throw new Error(`Creating a section review ${error}`);
  }
};
var create_a_section_review_default = createASectionReview;

// helpers/create-an-application/create-application-relationships/index.ts
var createApplicationRelationships = async ({ context, applicationId, companyData, eligibilityAnswers, sectionReviewData }) => {
  try {
    console.info('Creating application relationships (createApplicationRelationships helper) for application %s', applicationId);
    const { buyerCountryIsoCode, totalContractValueId, coverPeriodId, ...otherEligibilityAnswers } = eligibilityAnswers;
    const country = await get_country_by_field_default(context, 'isoCode', buyerCountryIsoCode);
    if (!country) {
      console.error(
        'Unable to create application relationships - buyer country not found (createApplicationRelationships helper) for application %s',
        applicationId,
      );
      throw new Error(
        `Unable to create application relationships - buyer country not found (createApplicationRelationships helper) for application ${applicationId}`,
      );
    }
    const coverPeriod = await get_cover_period_value_by_field_default(context, 'valueId', coverPeriodId);
    const totalContractValue = await get_total_contract_value_by_field_default(context, 'valueId', totalContractValueId);
    const referenceNumber = await create_a_reference_number_default(context, applicationId);
    const createdRelationships = await Promise.all([
      create_a_broker_default(context, applicationId),
      create_a_business_default(context, applicationId),
      create_a_populated_buyer_default(context, country.id, applicationId),
      create_a_declaration_default(context, applicationId),
      create_an_eligibility_default(context, country.id, applicationId, coverPeriod.id, totalContractValue.id, otherEligibilityAnswers),
      create_an_export_contract_default(context, applicationId),
      create_a_policy_default(context, applicationId),
      create_a_policy_contact_default(context, applicationId),
      create_a_nominated_loss_payee_default(context, applicationId),
      create_a_company_default(context, applicationId, companyData),
      create_a_section_review_default(context, applicationId, sectionReviewData),
    ]);
    const [broker, business, buyer, declaration, eligibility, exportContract, policy, policyContact, nominatedLossPayee, company, sectionReview] =
      createdRelationships;
    const relationshipIds = {
      brokerId: broker.id,
      businessId: business.id,
      buyerId: buyer.id,
      companyId: company.id,
      declarationId: declaration.id,
      eligibilityId: eligibility.id,
      exportContractId: exportContract.id,
      nominatedLossPayeeId: nominatedLossPayee.id,
      policyId: policy.id,
      policyContactId: policyContact.id,
      referenceNumber,
      sectionReviewId: sectionReview.id,
    };
    return relationshipIds;
  } catch (error) {
    console.error('Error creating application relationships (createApplicationRelationships helper) for application %s %o', applicationId, error);
    throw new Error(`Creating application relationships (createApplicationRelationships helper) for application ${applicationId} ${error}`);
  }
};
var applicationRelationships = {
  create: createApplicationRelationships,
};
var create_application_relationships_default = applicationRelationships;

// helpers/create-an-application/update-application-columns/index.ts
var updateApplicationColumns = async ({
  context,
  applicationId,
  brokerId,
  businessId,
  buyerId,
  companyId,
  declarationId,
  eligibilityId,
  exportContractId,
  nominatedLossPayeeId,
  policyId,
  policyContactId,
  referenceNumber,
  sectionReviewId,
}) => {
  try {
    console.info('Updating application relationship columns (updateApplicationColumns helper) for application %s', applicationId);
    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        broker: {
          connect: { id: brokerId },
        },
        business: {
          connect: { id: businessId },
        },
        buyer: {
          connect: { id: buyerId },
        },
        company: {
          connect: { id: companyId },
        },
        declaration: {
          connect: { id: declarationId },
        },
        eligibility: {
          connect: { id: eligibilityId },
        },
        exportContract: {
          connect: { id: exportContractId },
        },
        nominatedLossPayee: {
          connect: { id: nominatedLossPayeeId },
        },
        policy: {
          connect: { id: policyId },
        },
        policyContact: {
          connect: { id: policyContactId },
        },
        referenceNumber,
        sectionReview: {
          connect: { id: sectionReviewId },
        },
      },
    });
    return updatedApplication;
  } catch (error) {
    console.error('Error updating application relationship columns (updateApplicationColumns helper) for application %s %o', applicationId, error);
    throw new Error(`Updating application relationship columns (updateApplicationColumns helper) for application ${applicationId} ${error}`);
  }
};
var applicationColumns = {
  update: updateApplicationColumns,
};
var update_application_columns_default = applicationColumns;

// helpers/create-an-application/index.ts
var createAnApplicationHelper = async (variables, context) => {
  console.info('Creating an application (createAnApplication helper) for user %s', variables.accountId);
  try {
    const { accountId, eligibilityAnswers, company: companyData, sectionReview: sectionReviewData, status } = variables;
    const account2 = await get_account_by_id_default(context, accountId);
    if (!account2) {
      console.info('Rejecting application creation - no account found (createAnApplication helper)');
      return null;
    }
    const application2 = await create_initial_application_default.create({
      context,
      accountId,
      status,
    });
    const { id: applicationId } = application2;
    const {
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    } = await create_application_relationships_default.create({
      context,
      applicationId,
      companyData,
      eligibilityAnswers,
      sectionReviewData,
    });
    const updatedApplication = await update_application_columns_default.update({
      context,
      applicationId,
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    });
    return updatedApplication;
  } catch (error) {
    console.error('Error creating an application (createAnApplication helper) for user %s %o', variables.accountId, error);
    throw new Error(`Creating an application (createAnApplication helper) for user ${variables.accountId} ${error}`);
  }
};
var create_an_application_default = createAnApplicationHelper;

// custom-resolvers/mutations/create-an-application/index.ts
var createAnApplication = async (root, variables, context) => {
  console.info('Creating application for user %s', variables.accountId);
  try {
    const application2 = await create_an_application_default(variables, context);
    if (application2) {
      return {
        ...application2,
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating application for user %s %o', variables.accountId, error);
    throw new Error(`Creating application for user ${variables.accountId} ${error}`);
  }
};
var create_an_application_default2 = createAnApplication;

// helpers/get-countries/index.ts
var getCountries = async (context) => {
  console.info('Getting countries');
  try {
    const countries = await context.db.Country.findMany();
    return countries;
  } catch (error) {
    console.error('Error getting countries %o', error);
    throw new Error(`Getting countries ${error}`);
  }
};
var get_countries_default = getCountries;

// helpers/create-a-buyer/index.ts
var createABuyer = async (context, countryId) => {
  console.info('Creating a buyer');
  try {
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    });
    return buyer;
  } catch (error) {
    console.error('Error creating a buyer %o', error);
    throw new Error(`Creating a buyer ${error}`);
  }
};
var create_a_buyer_default = createABuyer;

// helpers/create-many-applications-and-reference-numbers/index.ts
var createManyApplicationsAndReferenceNumbers = async (context, applicationData) => {
  console.info('Creating many applications and reference numbers');
  try {
    const applications = await context.db.Application.createMany({
      data: applicationData,
    });
    const referenceNumbersData = applications.map((application2) => ({
      application: {
        connect: {
          id: application2.id,
        },
      },
    }));
    const referenceNumbers = await context.db.ReferenceNumber.createMany({ data: referenceNumbersData });
    return {
      applications,
      referenceNumbers,
    };
  } catch (error) {
    console.error('Error creating many applications and reference numbers - helper %o', error);
    throw new Error(`Creating many applications and reference numbers - helper ${error}`);
  }
};
var create_many_applications_and_reference_numbers_default = createManyApplicationsAndReferenceNumbers;

// helpers/update-applications-data/index.ts
var updateApplicationsData = async (context, updateData) => {
  console.info('Updating many applications');
  try {
    const updatedApplications = await context.db.Application.updateMany({
      data: updateData,
    });
    return updatedApplications;
  } catch (error) {
    console.error('Error updating many applications - helper %o', error);
    throw new Error(`Updating many applications - helper ${error}`);
  }
};
var update_applications_data_default = updateApplicationsData;

// custom-resolvers/mutations/create-many-applications/index.ts
var createManyApplications = async (root, variables, context) => {
  console.info('Creating many applications');
  try {
    const emptyArray = new Array(variables.count).fill({});
    const countries = await get_countries_default(context);
    const buyer = await create_a_buyer_default(context, countries[0].id);
    const mockApplicationsData = emptyArray.map(() => ({
      owner: {
        connect: {
          id: variables.accountId,
        },
      },
      buyer: {
        connect: {
          id: buyer.id,
        },
      },
      ...initial_application_data_default,
    }));
    const { referenceNumbers } = await create_many_applications_and_reference_numbers_default(context, mockApplicationsData);
    const updateApplicationReferenceNumbers = referenceNumbers.map((referenceNumber) => ({
      where: { id: referenceNumber.applicationId },
      data: { referenceNumber: referenceNumber.id },
    }));
    await update_applications_data_default(context, updateApplicationReferenceNumbers);
    const allApplications = await context.query.Application.findMany({
      query: 'id referenceNumber',
    });
    if (allApplications.length) {
      return {
        applications: allApplications,
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating many applications %o', error);
    throw new Error(`Creating many applications ${error}`);
  }
};
var create_many_applications_default = createManyApplications;

// custom-resolvers/mutations/create-an-abandoned-application/index.ts
var { STATUS: STATUS3 } = APPLICATION;
var createAnAbandonedApplication = async (root, variables, context) => {
  console.info('Creating an abandoned application for %s', variables.accountId);
  const abandonedApplicationVariables = variables;
  abandonedApplicationVariables.status = STATUS3.ABANDONED;
  try {
    const createdApplication = await create_an_application_default(abandonedApplicationVariables, context);
    if (createdApplication) {
      return {
        ...createdApplication,
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating an abandoned application %o', error);
    throw new Error(`Creating an abandoned application ${error}`);
  }
};
var create_an_abandoned_application_default = createAnAbandonedApplication;

// helpers/get-application-by-reference-number/index.ts
var getApplicationByReferenceNumber = async (referenceNumber, context) => {
  try {
    console.info('Getting application by reference number - getApplicationByReferenceNumber helper %s', referenceNumber);
    const applications = await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber },
      },
    });
    if (applications?.length) {
      const [application2] = applications;
      return application2;
    }
    return null;
  } catch (error) {
    console.error('Error getting application by reference number %o', error);
    throw new Error(`Error getting application by reference number ${error}`);
  }
};
var get_application_by_reference_number_default = getApplicationByReferenceNumber;

// custom-resolvers/mutations/delete-application-by-reference-number/index.ts
var deleteApplicationByReferenceNumber = async (root, variables, context) => {
  try {
    console.info('Deleting application by reference number');
    const { referenceNumber } = variables;
    const application2 = await get_application_by_reference_number_default(referenceNumber, context);
    if (application2) {
      const { id } = application2;
      const deleteResponse = await context.db.Application.deleteOne({
        where: {
          id,
        },
      });
      if (deleteResponse?.id) {
        return {
          success: true,
        };
      }
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error deleting application by reference number (DeleteApplicationByReferenceNumber mutation) %o', error);
    throw new Error(`Deleting application by reference number (DeleteApplicationByReferenceNumber mutation) ${error}`);
  }
};
var delete_application_by_reference_number_default = deleteApplicationByReferenceNumber;

// custom-resolvers/mutations/submit-application/index.ts
var import_date_fns6 = require('date-fns');

// helpers/get-eligibility-by-id/index.ts
var getEligibilityById = async (context, id) => {
  try {
    console.info('Getting eligibility by ID %s', id);
    const eligibility = await context.db.Eligibility.findOne({
      where: { id },
    });
    return eligibility;
  } catch (error) {
    console.error('Getting eligibility by ID %s %o', id, error);
    throw new Error(`Error Getting eligibility by ID ${id} ${error}`);
  }
};
var get_eligibility_by_id_default = getEligibilityById;

// helpers/get-cover-period-by-id/index.ts
var getCoverPeriodById = async (context, id) => {
  try {
    console.info('Getting coverPeriod by ID %s', id);
    const coverPeriod = await context.db.CoverPeriod.findOne({
      where: { id },
    });
    return coverPeriod;
  } catch (error) {
    console.error('Getting coverPeriod by ID %s %o', id, error);
    throw new Error(`Error Getting coverPeriod by ID ${id} ${error}`);
  }
};
var get_cover_period_by_id_default = getCoverPeriodById;

// helpers/get-total-contract-value-by-id/index.ts
var getTotalContractValueById = async (context, id) => {
  try {
    console.info('Getting totalContractValue by ID %s', id);
    const totalContractValue = await context.db.TotalContractValue.findOne({
      where: { id },
    });
    return totalContractValue;
  } catch (error) {
    console.error('Getting totalContractValue by ID %s %o', id, error);
    throw new Error(`Error Getting totalContractValue by ID ${id} ${error}`);
  }
};
var get_total_contract_value_by_id_default = getTotalContractValueById;

// helpers/get-populated-eligibility/index.ts
var getPopulatedEligibility = async (context, id, buyerCountry) => {
  try {
    console.info('Getting populated eligibility %s', id);
    const eligibility = await get_eligibility_by_id_default(context, id);
    const coverPeriod = await get_cover_period_by_id_default(context, eligibility.coverPeriodId);
    const totalContractValue = await get_total_contract_value_by_id_default(context, eligibility.totalContractValueId);
    const populatedEligibility = {
      ...eligibility,
      buyerCountry,
      coverPeriod,
      totalContractValue,
    };
    return populatedEligibility;
  } catch (error) {
    console.error('Getting populated eligibility %s %o', id, error);
    throw new Error(`Error getting populated eligibility ${id} ${error}`);
  }
};
var get_populated_eligibility_default = getPopulatedEligibility;

// helpers/get-policy-by-id/index.ts
var getPolicyById = async (context, id) => {
  try {
    console.info('Getting policy by ID %s', id);
    const policy = await context.query.Policy.findOne({
      where: { id },
      query:
        'id policyType requestedStartDate contractCompletionDate requestedCreditLimit totalValueOfContract creditPeriodWithBuyer policyCurrencyCode totalMonthsOfCover totalSalesToBuyer maximumBuyerWillOwe needPreCreditPeriodCover jointlyInsuredParty { id companyName companyNumber countryCode requested }',
    });
    return policy;
  } catch (error) {
    console.error('Getting policy by ID %s %o', id, error);
    throw new Error(`Error Getting policy by ID ${id} ${error}`);
  }
};
var get_policy_by_id_default = getPolicyById;

// helpers/get-policy-contact-by-id/index.ts
var getPolicyContactById = async (context, id) => {
  try {
    console.info('Getting policyContact by ID %s', id);
    const policyContact = await context.db.PolicyContact.findOne({
      where: { id },
    });
    return policyContact;
  } catch (error) {
    console.error('Getting policyContact by ID %s %o', id, error);
    throw new Error(`Error Getting policyContact by ID ${id} ${error}`);
  }
};
var get_policy_contact_by_id_default = getPolicyContactById;

// helpers/encrypt/generate-key/index.ts
var import_crypto9 = __toESM(require('crypto'));
var { ALGORITHM: ALGORITHM2, SIGNATURE: SIGNATURE2, SUBSTRING_INDEX_START, SUBSTRING_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.KEY;
var generateKey = () => import_crypto9.default.createHash(ALGORITHM2).update(SIGNATURE2).digest('hex').substring(SUBSTRING_INDEX_START, SUBSTRING_INDEX_END);
var generate_key_default = generateKey;

// helpers/decrypt/generate-decipher/index.ts
var import_crypto10 = __toESM(require('crypto'));
var { ENCRYPTION_METHOD } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;
var generateDecipher = (key2, iv) => {
  try {
    return import_crypto10.default.createDecipheriv(ENCRYPTION_METHOD, key2, iv);
  } catch (error) {
    console.error('Error generating decipher %o', error);
    throw new Error(`Error generating decipher ${error}`);
  }
};
var generate_decipher_default = generateDecipher;

// helpers/decrypt/generate-buffer/index.ts
var { STRING_ENCODING: STRING_ENCODING2, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;
var generateBufferInStringFormat = (value) => {
  try {
    return Buffer.from(value, STRING_ENCODING2).toString(OUTPUT_ENCODING);
  } catch (error) {
    console.error('Error generating buffer %o', error);
    throw new Error(`Error generating buffer ${error}`);
  }
};
var generate_buffer_default = generateBufferInStringFormat;

// helpers/decrypt/index.ts
var { ENCODING: ENCODING2, OUTPUT_ENCODING: OUTPUT_ENCODING2 } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;
var key = generate_key_default();
var decryptData = (dataToDecrypt) => {
  try {
    console.info('Decrypting data');
    const { value, iv } = dataToDecrypt;
    const buffer = generate_buffer_default(value);
    const decipher = generate_decipher_default(key, iv);
    const decipherUpdate = decipher.update(buffer, ENCODING2, OUTPUT_ENCODING2);
    const decipherFinal = decipher.final(OUTPUT_ENCODING2);
    return decipherUpdate.concat(decipherFinal);
  } catch (error) {
    console.error('Error decrypting data %o', error);
    throw new Error(`Error decrypting data ${error}`);
  }
};
var decrypt = {
  decrypt: decryptData,
};
var decrypt_default = decrypt;

// helpers/decrypt-financial-uk/index.ts
var decryptFinancialUk = (applicationFinancialUk) => {
  try {
    console.info('Decrypting financial uk');
    const mapped = applicationFinancialUk;
    const {
      accountNumber,
      sortCode,
      vector: { accountNumberVector, sortCodeVector },
    } = applicationFinancialUk;
    let decryptedAccountNumber = '';
    let decryptedSortCode = '';
    if (accountNumber && accountNumberVector) {
      decryptedAccountNumber = decrypt_default.decrypt({ value: accountNumber, iv: accountNumberVector });
    }
    if (sortCode && sortCodeVector) {
      decryptedSortCode = decrypt_default.decrypt({ value: sortCode, iv: sortCodeVector });
    }
    mapped.accountNumber = decryptedAccountNumber;
    mapped.sortCode = decryptedSortCode;
    return mapped;
  } catch (error) {
    console.error('Error decrypting financial uk %o', error);
    throw new Error(`Error decrypting financial uk ${error}`);
  }
};
var decrypt_financial_uk_default = decryptFinancialUk;

// helpers/decrypt-financial-international/index.ts
var decryptFinancialInternational = (applicationFinancialInternational) => {
  try {
    console.info('Decrypting financial international');
    const mapped = applicationFinancialInternational;
    const {
      bicSwiftCode,
      iban,
      vector: { bicSwiftCodeVector, ibanVector },
    } = applicationFinancialInternational;
    let decryptedIban = '';
    let decryptedBicSwiftCode = '';
    if (bicSwiftCode && bicSwiftCodeVector) {
      decryptedBicSwiftCode = decrypt_default.decrypt({ value: bicSwiftCode, iv: bicSwiftCodeVector });
    }
    if (iban && ibanVector) {
      decryptedIban = decrypt_default.decrypt({ value: iban, iv: ibanVector });
    }
    mapped.bicSwiftCode = decryptedBicSwiftCode;
    mapped.iban = decryptedIban;
    return mapped;
  } catch (error) {
    console.error('Error decrypting international uk %o', error);
    throw new Error(`Error decrypting international uk ${error}`);
  }
};
var decrypt_financial_international_default = decryptFinancialInternational;

// helpers/decrypt-nominated-loss-payee/index.ts
var decryptNominatedLossPayee = (nominatedLossPayee, decryptFinancialUk2, decryptFinancialInternational2) => {
  try {
    console.info('Decrypting nominated loss payee %s', nominatedLossPayee.id);
    const mapped = {
      ...nominatedLossPayee,
      financialUk: {},
      financialInternational: {},
    };
    const { financialUk, financialInternational } = nominatedLossPayee;
    if (decryptFinancialUk2) {
      console.info('Decrypting nominated loss payee - financial - UK data %s', nominatedLossPayee.id);
      const mappedFinancialUk = decrypt_financial_uk_default(financialUk);
      mapped.financialUk = mappedFinancialUk;
    }
    if (decryptFinancialInternational2) {
      console.info('Decrypting nominated loss payee - financial - international data %s', nominatedLossPayee.id);
      const mappedFinancialInternational = decrypt_financial_international_default(financialInternational);
      mapped.financialInternational = mappedFinancialInternational;
    }
    return mapped;
  } catch (error) {
    console.error('Error decrypting nominated loss payee %o', error);
    throw new Error(`Error decrypting nominated loss payee ${error}`);
  }
};
var decrypt_nominated_loss_payee_default = decryptNominatedLossPayee;

// helpers/get-populated-application/nominated-loss-payee/index.ts
var getNominatedLossPayee = async (context, lossPayeeId, decryptFinancialUk2, decryptFinancialInternational2) => {
  try {
    console.info('Getting nominated loss payee %s', lossPayeeId);
    const nominatedLossPayee = await context.query.NominatedLossPayee.findOne({
      where: { id: lossPayeeId },
      query:
        'id isAppointed isLocatedInUk isLocatedInternationally name financialUk { id accountNumber sortCode bankAddress vector { accountNumberVector sortCodeVector } } financialInternational { id iban bicSwiftCode bankAddress vector { bicSwiftCodeVector ibanVector } }',
    });
    if (decryptFinancialUk2 || decryptFinancialInternational2) {
      const decryptedNominatedLossPayee = decrypt_nominated_loss_payee_default(nominatedLossPayee, decryptFinancialUk2, decryptFinancialInternational2);
      return decryptedNominatedLossPayee;
    }
    return nominatedLossPayee;
  } catch (error) {
    console.error('Error getting nominated loss payee (getNominatedLossPayee helper) %o', error);
    throw new Error(`Error getting nominated loss payee (getNominatedLossPayee helper) ${error}`);
  }
};
var nominated_loss_payee_default = getNominatedLossPayee;

// helpers/get-export-contract-by-id/index.ts
var getExportContractById = async (context, id) => {
  try {
    console.info('Getting exportContract by ID %s', id);
    const exportContract = await context.db.ExportContract.findOne({
      where: { id },
    });
    return exportContract;
  } catch (error) {
    console.error('Getting exportContract by ID %s %o', id, error);
    throw new Error(`Error Getting exportContract by ID ${id} ${error}`);
  }
};
var get_export_contract_by_id_default = getExportContractById;

// helpers/get-export-contract-agent-by-id/index.ts
var getExportContractAgentById = async (context, id) => {
  try {
    console.info('Getting exportContractAgent by ID %s', id);
    const exportContractAgent = await context.db.ExportContractAgent.findOne({
      where: { id },
    });
    return exportContractAgent;
  } catch (error) {
    console.error('Getting exportContractAgent by ID %s %o', id, error);
    throw new Error(`Error Getting exportContractAgent by ID ${id} ${error}`);
  }
};
var get_export_contract_agent_by_id_default = getExportContractAgentById;

// helpers/get-export-contract-agent-service-by-id/index.ts
var getExportContractAgentServiceById = async (context, id) => {
  try {
    console.info('Getting exportContractAgentService by ID %s', id);
    const exportContractAgentService = await context.db.ExportContractAgentService.findOne({
      where: { id },
    });
    return exportContractAgentService;
  } catch (error) {
    console.error('Getting exportContractAgentService by ID %s %o', id, error);
    throw new Error(`Error Getting exportContractAgentService by ID ${id} ${error}`);
  }
};
var get_export_contract_agent_service_by_id_default = getExportContractAgentServiceById;

// helpers/get-export-contract-agent-service-charge-by-id/index.ts
var getExportContractAgentServiceChargeById = async (context, id) => {
  try {
    console.info('Getting exportContractAgentServiceCharge by ID %s', id);
    const exportContractAgentServiceCharge = await context.db.ExportContractAgentServiceCharge.findOne({
      where: { id },
    });
    return exportContractAgentServiceCharge;
  } catch (error) {
    console.error('Getting exportContractAgentServiceCharge by ID %s %o', id, error);
    throw new Error(`Error Getting exportContractAgentServiceCharge by ID ${id} ${error}`);
  }
};
var get_export_contract_agent_service_charge_by_id_default = getExportContractAgentServiceChargeById;

// helpers/get-populated-export-contract/get-populated-agent/index.ts
var getPopulatedAgent = async (context, id) => {
  try {
    console.info('Getting populated exportContract agent %s', id);
    const exportContractAgent = await get_export_contract_agent_by_id_default(context, id);
    const exportContractAgentService = await get_export_contract_agent_service_by_id_default(context, exportContractAgent.serviceId);
    const exportContractAgentServiceCharge = await get_export_contract_agent_service_charge_by_id_default(context, exportContractAgentService.chargeId);
    const populatedAgent = {
      ...exportContractAgent,
      service: {
        ...exportContractAgentService,
        charge: exportContractAgentServiceCharge,
      },
    };
    return populatedAgent;
  } catch (error) {
    console.error('Getting populated exportContract agent %s %o', id, error);
    throw new Error(`Error Getting populated exportContract agent ${id} ${error}`);
  }
};
var get_populated_agent_default = getPopulatedAgent;

// helpers/get-private-market-by-id/index.ts
var getPrivateMarketById = async (context, id) => {
  try {
    console.info('Getting privateMarket by ID %s', id);
    const privateMarket = await context.db.PrivateMarket.findOne({
      where: { id },
    });
    return privateMarket;
  } catch (error) {
    console.error('Getting privateMarket by ID %s %o', id, error);
    throw new Error(`Error Getting privateMarket by ID ${id} ${error}`);
  }
};
var get_private_market_by_id_default = getPrivateMarketById;

// helpers/get-populated-export-contract/index.ts
var getPopulatedExportContract = async (context, id) => {
  try {
    console.info('Getting populated exportContract %s', id);
    const exportContract = await get_export_contract_by_id_default(context, id);
    const exportContractAgent = await get_populated_agent_default(context, exportContract.agentId);
    const privateMarket = await get_private_market_by_id_default(context, exportContract.privateMarketId);
    const finalDestinationCountry = await get_country_by_field_default(context, 'isoCode', exportContract.finalDestinationCountryCode);
    const populatedExportContract = {
      ...exportContract,
      agent: exportContractAgent,
      finalDestinationCountry,
      privateMarket,
    };
    return populatedExportContract;
  } catch (error) {
    console.error('Getting populated exportContract %s %o', id, error);
    throw new Error(`Error getting populated exportContract ${id} ${error}`);
  }
};
var get_populated_export_contract_default = getPopulatedExportContract;

// helpers/get-company-by-id/index.ts
var getCompanyById = async (context, id) => {
  try {
    console.info('Getting company by ID %s', id);
    const company = await context.db.Company.findOne({
      where: { id },
    });
    return company;
  } catch (error) {
    console.error('Getting company by ID %s %o', id, error);
    throw new Error(`Error Getting company by ID ${id} ${error}`);
  }
};
var get_company_by_id_default = getCompanyById;

// helpers/get-company-address-by-id/index.ts
var getCompanyAddressById = async (context, id) => {
  try {
    console.info('Getting company address by ID %s', id);
    const companyAddress = await context.db.CompanyAddress.findOne({
      where: { id },
    });
    return companyAddress;
  } catch (error) {
    console.error('Getting company address by ID %s %o', id, error);
    throw new Error(`Error Getting company address by ID ${id} ${error}`);
  }
};
var get_company_address_by_id_default = getCompanyAddressById;

// helpers/get-company-sic-codes-by-company-id/index.ts
var getCompanySicCodesByCompanyId = async (context, id) => {
  try {
    console.info('Getting company SIC codes by company ID %s', id);
    const companySicCodes = await context.db.CompanySicCode.findMany({
      where: {
        company: {
          id: { equals: id },
        },
      },
    });
    return companySicCodes;
  } catch (error) {
    console.error('Getting company SIC codes by company ID %s %o', id, error);
    throw new Error(`Error Getting company SIC codes by company ID ${id} ${error}`);
  }
};
var get_company_sic_codes_by_company_id_default = getCompanySicCodesByCompanyId;

// helpers/get-company-different-trading-address-by-id/index.ts
var getCompanyDifferentTradingAddressById = async (context, id) => {
  try {
    console.info('Getting company different trading address by ID %s', id);
    const differentTradingAddress = await context.db.CompanyDifferentTradingAddress.findOne({
      where: { id },
    });
    return differentTradingAddress;
  } catch (error) {
    console.error('Getting company different trading address by ID %s %o', id, error);
    throw new Error(`Error Getting company different trading address by ID ${id} ${error}`);
  }
};
var get_company_different_trading_address_by_id_default = getCompanyDifferentTradingAddressById;

// helpers/get-populated-company/index.ts
var getPopulatedCompany = async (context, id) => {
  try {
    console.info('Getting populated company %s', id);
    const company = await get_company_by_id_default(context, id);
    const companyAddress = await get_company_address_by_id_default(context, company.registeredOfficeAddressId);
    const companySicCodes = await get_company_sic_codes_by_company_id_default(context, company.id);
    const differentTradingAddress = await get_company_different_trading_address_by_id_default(context, company.differentTradingAddressId);
    const populatedCompany = {
      ...company,
      companySicCodes,
      registeredOfficeAddress: companyAddress,
      differentTradingAddress,
    };
    return populatedCompany;
  } catch (error) {
    console.error('Getting populated company %s %o', id, error);
    throw new Error(`Error getting populated company ${id} ${error}`);
  }
};
var get_populated_company_default = getPopulatedCompany;

// helpers/get-business-by-id/index.ts
var getBusinessById = async (context, id) => {
  try {
    console.info('Getting business by ID %s', id);
    const business = await context.db.Business.findOne({
      where: { id },
    });
    return business;
  } catch (error) {
    console.error('Getting business by ID %s %o', id, error);
    throw new Error(`Error Getting business by ID ${id} ${error}`);
  }
};
var get_business_by_id_default = getBusinessById;

// helpers/get-broker-by-id/index.ts
var getBrokerById = async (context, id) => {
  try {
    console.info('Getting broker by ID %s', id);
    const broker = await context.db.Broker.findOne({
      where: { id },
    });
    return broker;
  } catch (error) {
    console.error('Getting broker by ID %s %o', id, error);
    throw new Error(`Error Getting broker by ID ${id} ${error}`);
  }
};
var get_broker_by_id_default = getBrokerById;

// helpers/get-buyer-by-id/index.ts
var getBuyerById = async (context, id) => {
  try {
    console.info('Getting buyer by ID %s', id);
    const buyer = await context.db.Buyer.findOne({
      where: { id },
    });
    return buyer;
  } catch (error) {
    console.error('Getting buyer by ID %s %o', id, error);
    throw new Error(`Error Getting buyer by ID ${id} ${error}`);
  }
};
var get_buyer_by_id_default = getBuyerById;

// helpers/get-country-by-id/index.ts
var getCountryById = async (context, id) => {
  try {
    console.info('Getting country by ID %s', id);
    const country = await context.db.Country.findOne({
      where: { id },
    });
    return country;
  } catch (error) {
    console.error('Getting country by ID %s %o', id, error);
    throw new Error(`Error Getting country by ID ${id} ${error}`);
  }
};
var get_country_by_id_default = getCountryById;

// helpers/get-buyer-relationship-by-id/index.ts
var getBuyerRelationshipById = async (context, id) => {
  try {
    console.info('Getting buyer relationship by ID %s', id);
    const buyerRelationship = await context.db.BuyerRelationship.findOne({
      where: { id },
    });
    return buyerRelationship;
  } catch (error) {
    console.error('Getting buyer relationship by ID %s %o', id, error);
    throw new Error(`Error Getting buyer relationship by ID ${id} ${error}`);
  }
};
var get_buyer_relationship_by_id_default = getBuyerRelationshipById;

// helpers/get-buyer-trading-history-by-id/index.ts
var getBuyerTradingHistoryById = async (context, id) => {
  try {
    console.info('Getting buyer trading history by ID %s', id);
    const buyerTradingHistory = await context.db.BuyerTradingHistory.findOne({
      where: { id },
    });
    return buyerTradingHistory;
  } catch (error) {
    console.error('Getting buyer trading history by ID %s %o', id, error);
    throw new Error(`Error Getting buyer trading history by ID ${id} ${error}`);
  }
};
var get_buyer_trading_history_by_id_default = getBuyerTradingHistoryById;

// helpers/get-populated-buyer/index.ts
var getPopulatedBuyer = async (context, id) => {
  try {
    console.info('Getting populated buyer %s', id);
    const buyer = await get_buyer_by_id_default(context, id);
    const buyerCountry = await get_country_by_id_default(context, buyer.countryId);
    const buyerRelationship = await get_buyer_relationship_by_id_default(context, buyer.relationshipId);
    const buyerTradingHistory = await get_buyer_trading_history_by_id_default(context, buyer.buyerTradingHistoryId);
    const populatedBuyer = {
      ...buyer,
      country: buyerCountry,
      relationship: buyerRelationship,
      buyerTradingHistory,
    };
    return populatedBuyer;
  } catch (error) {
    console.error('Getting populated buyer %s %o', id, error);
    throw new Error(`Error getting populated buyer ${id} ${error}`);
  }
};
var get_populated_buyer_default = getPopulatedBuyer;

// helpers/get-declaration-by-id/index.ts
var getDeclarationById = async (context, id) => {
  try {
    console.info('Getting declaration by ID %s', id);
    const declaration = await context.db.Declaration.findOne({
      where: { id },
    });
    return declaration;
  } catch (error) {
    console.error('Getting declaration by ID %s %o', id, error);
    throw new Error(`Error Getting declaration by ID ${id} ${error}`);
  }
};
var get_declaration_by_id_default = getDeclarationById;

// helpers/get-declaration-modern-slavery-by-id/index.ts
var getDeclarationModernSlaveryById = async (context, id) => {
  try {
    console.info('Getting declaration modern slavery by ID %s', id);
    const declarationModernSlavery = await context.db.DeclarationModernSlavery.findOne({
      where: { id },
    });
    return declarationModernSlavery;
  } catch (error) {
    console.error('Getting declaration modern slavery by ID %s %o', id, error);
    throw new Error(`Error Getting declaration modern slavery by ID ${id} ${error}`);
  }
};
var get_declaration_modern_slavery_by_id_default = getDeclarationModernSlaveryById;

// helpers/get-populated-declaration/index.ts
var getPopulatedDeclaration = async (context, id) => {
  try {
    console.info('Getting populated declaration %s', id);
    const declaration = await get_declaration_by_id_default(context, id);
    const modernSlavery = await get_declaration_modern_slavery_by_id_default(context, declaration.modernSlaveryId);
    const populatedDeclaration = {
      ...declaration,
      modernSlavery,
    };
    return populatedDeclaration;
  } catch (error) {
    console.error('Getting populated declaration %s %o', id, error);
    throw new Error(`Error getting populated declaration ${id} ${error}`);
  }
};
var get_populated_declaration_default = getPopulatedDeclaration;

// helpers/get-section-review-by-id/index.ts
var getSectionReviewById = async (context, id) => {
  try {
    console.info('Getting sectionReview by ID %s', id);
    const sectionReview = await context.db.SectionReview.findOne({
      where: { id },
    });
    return sectionReview;
  } catch (error) {
    console.error('Getting sectionReview by ID %s %o', id, error);
    throw new Error(`Error Getting sectionReview by ID ${id} ${error}`);
  }
};
var get_section_review_by_id_default = getSectionReviewById;

// helpers/map-total-contract-value-over-threshold/index.ts
var mapTotalContractValueOverThreshold = (eligibility) => eligibility.totalContractValue.value === TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE;
var map_total_contract_value_over_threshold_default = mapTotalContractValueOverThreshold;

// helpers/get-populated-application/map-policy/index.ts
var mapPolicy = (policy) => {
  const mappedPolicy = {
    ...policy,
  };
  if (policy?.requestedStartDate) {
    const { requestedStartDate } = policy;
    mappedPolicy.requestedStartDate = new Date(requestedStartDate);
  }
  if (policy?.contractCompletionDate) {
    const { contractCompletionDate } = policy;
    mappedPolicy.contractCompletionDate = new Date(contractCompletionDate);
  }
  return mappedPolicy;
};
var map_policy_default = mapPolicy;

// helpers/object/index.ts
var objectHasKeysAndValues = (obj) => {
  if (!obj) {
    return false;
  }
  const keys = Object.keys(obj);
  if (!keys.length) {
    return false;
  }
  let hasValues = false;
  keys.forEach((key2) => {
    if (obj[key2]) {
      hasValues = true;
    }
  });
  return hasValues;
};

// helpers/get-populated-application/index.ts
var EXPECTED_RELATIONSHIPS = [
  'eligibility',
  'broker',
  'business',
  'buyer',
  'company',
  'declaration',
  'exportContract',
  'owner',
  'policy',
  'policyContact',
  'nominatedLossPayee',
  'sectionReview',
];
var getPopulatedApplication = async ({
  context,
  application: application2,
  decryptFinancialUk: decryptFinancialUk2 = false,
  decryptFinancialInternational: decryptFinancialInternational2 = false,
}) => {
  try {
    console.info('Getting populated application (helper) %s', application2.id);
    const {
      eligibilityId,
      ownerId,
      policyId,
      policyContactId,
      exportContractId,
      companyId,
      businessId,
      brokerId,
      buyerId,
      declarationId,
      nominatedLossPayeeId,
      sectionReviewId,
    } = application2;
    const populatedBuyer = await get_populated_buyer_default(context, buyerId);
    const populatedEligibility = await get_populated_eligibility_default(context, eligibilityId, populatedBuyer.country);
    const account2 = await get_account_by_id_default(context, ownerId);
    const policy = await get_policy_by_id_default(context, policyId);
    const policyContact = await get_policy_contact_by_id_default(context, policyContactId);
    const nominatedLossPayee = await nominated_loss_payee_default(context, nominatedLossPayeeId, decryptFinancialUk2, decryptFinancialInternational2);
    const populatedExportContract = await get_populated_export_contract_default(context, exportContractId);
    const { companySicCodes, ...populatedCompany } = await get_populated_company_default(context, companyId);
    const business = await get_business_by_id_default(context, businessId);
    const broker = await get_broker_by_id_default(context, brokerId);
    const declaration = await get_populated_declaration_default(context, declarationId);
    const sectionReview = await get_section_review_by_id_default(context, sectionReviewId);
    const totalContractValueOverThreshold = map_total_contract_value_over_threshold_default(populatedEligibility);
    const populatedApplication2 = {
      ...application2,
      eligibility: populatedEligibility,
      broker,
      business,
      buyer: populatedBuyer,
      company: populatedCompany,
      companySicCodes,
      declaration,
      exportContract: populatedExportContract,
      owner: account2,
      policy: map_policy_default(policy),
      policyContact,
      nominatedLossPayee,
      sectionReview,
      totalContractValueOverThreshold,
    };
    Object.keys(populatedApplication2).forEach((relationshipKey) => {
      if (EXPECTED_RELATIONSHIPS.includes(relationshipKey)) {
        const populatedRelationship = populatedApplication2[relationshipKey];
        if (!objectHasKeysAndValues(populatedRelationship)) {
          throw new Error(`Error getting '${relationshipKey}' relationship`);
        }
      }
    });
    return populatedApplication2;
  } catch (error) {
    console.error('Getting populated application (helper) %s %o', application2.id, error);
    throw new Error(`Error getting populated application (helper) ${application2.id} ${error}`);
  }
};
var populatedApplication = {
  get: getPopulatedApplication,
};
var get_populated_application_default = populatedApplication;

// helpers/replace-character-codes-with-characters/index.ts
var replaceCharacterCodesWithCharacters = (str) =>
  str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#42;/g, '*')
    .replace(/&amp;/g, '&');
var replace_character_codes_with_characters_default = replaceCharacterCodesWithCharacters;

// helpers/get-application-submitted-email-template-ids/index.ts
var {
  APPLICATION: {
    SUBMISSION: { EXPORTER, UNDERWRITING_TEAM },
  },
} = EMAIL_TEMPLATE_IDS;
var getApplicationSubmittedEmailTemplateIds = (application2) => {
  const { buyer, declaration } = application2;
  const templateIds = {
    underwritingTeam: '',
    account: '',
  };
  const { hasAntiBriberyCodeOfConduct } = declaration;
  const {
    buyerTradingHistory: { exporterHasTradedWithBuyer },
  } = buyer;
  if (!hasAntiBriberyCodeOfConduct && !exporterHasTradedWithBuyer) {
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NO_DOCUMENTS;
    return templateIds;
  }
  if (hasAntiBriberyCodeOfConduct) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY;
  }
  if (exporterHasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_TRADING_HISTORY;
  }
  if (hasAntiBriberyCodeOfConduct && exporterHasTradedWithBuyer) {
    templateIds.account = EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;
    templateIds.underwritingTeam = UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;
  }
  return templateIds;
};
var get_application_submitted_email_template_ids_default = getApplicationSubmittedEmailTemplateIds;

// emails/send-application-submitted-emails/index.ts
var send4 = async (application2, xlsxPath) => {
  try {
    const { referenceNumber, owner, company, buyer, policy, policyContact } = application2;
    const { requestedStartDate } = policy;
    const { email } = owner;
    const sharedEmailVars = {
      referenceNumber,
      buyerName: replace_character_codes_with_characters_default(String(buyer.companyOrOrganisationName)),
      buyerLocation: buyer.country?.name,
      companyName: replace_character_codes_with_characters_default(company.companyName),
      requestedStartDate: format_date_default(requestedStartDate),
    };
    const sendOwnerEmailVars = {
      ...sharedEmailVars,
      name: replace_character_codes_with_characters_default(get_full_name_string_default(owner)),
      emailAddress: email,
    };
    const sendContactEmailVars = {
      ...sharedEmailVars,
      name: replace_character_codes_with_characters_default(get_full_name_string_default(policyContact)),
      emailAddress: policyContact.email,
    };
    console.info('Sending application submitted email to application account owner: %s', sendOwnerEmailVars.emailAddress);
    const accountSubmittedResponse = await emails_default.application.submittedEmail(sendOwnerEmailVars, policy);
    if (!accountSubmittedResponse?.success) {
      throw new Error('Sending application submitted email to owner/account');
    }
    if (!policyContact.isSameAsOwner) {
      console.info('Sending application submitted email to policy contact email: %s', sendContactEmailVars.emailAddress);
      const contactSubmittedResponse = await emails_default.application.submittedEmail(sendContactEmailVars, policy);
      if (!contactSubmittedResponse?.success) {
        throw new Error('Sending application submitted email to contact');
      }
    }
    const templateIds = get_application_submitted_email_template_ids_default(application2);
    const underwritingTeamSubmittedResponse = await emails_default.application.underwritingTeam(sendOwnerEmailVars, xlsxPath, templateIds.underwritingTeam);
    if (!underwritingTeamSubmittedResponse.success) {
      throw new Error('Sending application submitted email to underwriting team');
    }
    if (templateIds.account) {
      console.info('Sending documents email to application owner: %s', sendOwnerEmailVars.emailAddress);
      const documentsResponse = await emails_default.documentsEmail(sendOwnerEmailVars, templateIds.account);
      if (!documentsResponse.success) {
        throw new Error(`Sending application documents emails ${documentsResponse}`);
      }
      if (!policyContact.isSameAsOwner) {
        console.info('Sending documents email to policy contact: %s', sendContactEmailVars.emailAddress);
        const contactDocumentsResponse = await emails_default.documentsEmail(sendContactEmailVars, templateIds.account);
        if (!contactDocumentsResponse.success) {
          throw new Error(`Sending application documents emails to contact ${documentsResponse}`);
        }
      }
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending application submitted emails %o', error);
    throw new Error(`Sending application submitted emails ${error}`);
  }
};
var applicationSubmittedEmails = {
  send: send4,
};
var send_application_submitted_emails_default = applicationSubmittedEmails;

// generate-xlsx/index.ts
var import_dotenv9 = __toESM(require('dotenv'));
var import_exceljs = __toESM(require('exceljs'));

// constants/XLSX-CONFIG/SECTION_NAMES/index.ts
var SECTION_NAMES = {
  APPLICATION_INFORMATION: 'Application Information',
  ELIGIBILITY: 'Eligibility',
  EXPORTER_BUSINESS: 'The Business',
  BUYER: 'The Buyer',
  POLICY: 'Insurance Policy',
  EXPORT_CONTRACT: 'Export Contract',
  DECLARATIONS: 'Declarations',
};
var SECTION_NAMES_default = SECTION_NAMES;

// content-strings/fields/insurance/declarations/index.ts
var {
  DECLARATIONS: {
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    MODERN_SLAVERY: {
      WILL_ADHERE_TO_ALL_REQUIREMENTS: WILL_ADHERE_TO_ALL_REQUIREMENTS2,
      HAS_NO_OFFENSES_OR_INVESTIGATIONS: HAS_NO_OFFENSES_OR_INVESTIGATIONS2,
      IS_NOT_AWARE_OF_EXISTING_SLAVERY: IS_NOT_AWARE_OF_EXISTING_SLAVERY2,
    },
    WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  },
} = insurance_default;
var DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    SUMMARY: {
      TITLE: 'Confidentiality',
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    SUMMARY: {
      TITLE: 'Anti-bribery and corruption',
    },
  },
  [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: {
    SUMMARY: {
      TITLE: 'Do you have a code of conduct?',
    },
  },
  [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: {
    SUMMARY: {
      TITLE: 'Will you export using your code of conduct?',
    },
  },
  MODERN_SLAVERY: {
    [WILL_ADHERE_TO_ALL_REQUIREMENTS2]: {
      LABEL:
        'Do you adhere to, and intend to continue to adhere to, all requirements that apply to you as set out in the Modern Slavery Act 2015, including reporting obligations, and all applicable legislation relating to the prevention of modern slavery in every country that you operate in?',
      SUMMARY: {
        TITLE: 'Adhere to the Modern Slavery Act',
      },
      CONDITIONAL_REASON: {
        LABEL: 'Provide full details.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Why can the exporter not adhere?',
        },
      },
    },
    [HAS_NO_OFFENSES_OR_INVESTIGATIONS2]: {
      LABEL:
        'Do you confirm you are not currently under investigation and have not been fined, convicted or found guilty of any offences under the Modern Slavery Act 2015, or under any applicable similar laws or regulations relating to the prevention of modern slavery or any similar infringement of human rights in any jurisdiction?',
      SUMMARY: {
        TITLE: 'Does the user confirm they are not under investigation or has been convicted of any human right violations',
      },
      CONDITIONAL_REASON: {
        LABEL:
          'Provide full details. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Details of investigation for violating the Modern Slavery Act',
        },
      },
    },
    [IS_NOT_AWARE_OF_EXISTING_SLAVERY2]: {
      LABEL:
        'To the best of your knowledge, can you confirm you are not aware of the existence of Modern Slavery in respect of yourself, the export contract(s), your immediate holding company or your supply chain, in each case, at present or in the past 2 years.',
      SUMMARY: {
        TITLE: 'Confirm Modern Slavery is not involved in the export',
      },
      CONDITIONAL_REASON: {
        LABEL:
          'Provide full details. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Details of how modern slavery is involved in the export',
        },
      },
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    SUMMARY: {
      TITLE: 'Confirmation and acknowledgements',
    },
  },
};

// content-strings/links.ts
var LINKS = {
  EXTERNAL: {
    GUIDANCE: 'https://www.gov.uk/guidance/credit-insurance-policy#eligibility',
    BEFORE_YOU_START: 'https://www.gov.uk/guidance/get-a-quote-for-ukef-credit-insurance',
    PRIVACY: 'https://www.gov.uk/government/publications/ukef-privacy-notice/ukef-privacy-notice--2',
    FEEDBACK: 'https://forms.office.com/r/TacytrRCgJ',
    RESEARCH: 'https://forms.office.com/pages/responsepage.aspx?id=jhOEgACUnkCm2ka1KB4LCkj8OKxLpCpDmTbrMyQ3j2JUOUFHNUc0QUhUOFdLNkJXWkRUS0wyMUZFNiQlQCN0PWcu',
    EXPORT_FINANCE_MANAGERS: 'https://www.gov.uk/government/publications/find-an-export-finance-manager',
    APPROVED_BROKER_LIST: 'https://www.gov.uk/government/publications/uk-export-finance-insurance-list-of-approved-brokers/export-insurance-approved-brokers',
    PROPOSAL_FORM:
      'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1075267/10489_UKEF_Export_Insurance_Proposal_Form_20220513-fillable.pdf',
    NBI_FORM:
      'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/618316/export-insurance-non-binding-indication-request-form_20170609.pdf',
    FULL_APPLICATION: 'https://www.gov.uk/guidance/apply-for-ukef-credit-insurance',
    ABILITY_NET: 'https://mcmw.abilityNet.org.uk',
    EQUALITY_ADVISORY_SERVICE: 'https://www.equalityadvisoryservice.com',
    ACCESSIBILITY_GUIDLINES: 'https://www.w3.org/TR/WCAG21',
    BRIBERY_ACT_2010_GUIDANCE: 'https://www.justice.gov.uk/downloads/legislation/bribery-act-2010-guidance.pdf',
    ICO_MAKE_A_COMPLAINT: 'https://ico.org.uk/make-a-complaint',
    COMPANIES_HOUSE: 'https://find-and-update.company-information.service.gov.uk',
    OHCHR_UN_GUIDING_PRINCIPLES_ON_BUSINESS_AND_HUMAN_RIGHTS:
      'https://www.ohchr.org/en/publications/reference-publications/guiding-principles-business-and-human-rights',
    SMALL_EXPORT_BUILDER: 'https://www.gov.uk/guidance/credit-insurance-policy',
  },
};

// helpers/format-currency/index.ts
var formatCurrency = (number, currencyCode, decimalPlaces) =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });
var format_currency_default = formatCurrency;

// content-strings/fields/insurance/eligibility/index.ts
var {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  COVER_PERIOD: COVER_PERIOD_FIELD_ID,
  COMPANIES_HOUSE_NUMBER,
  TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID,
  HAS_END_BUYER,
  HAS_COMPANIES_HOUSE_NUMBER,
} = insurance_default.ELIGIBILITY;
var { COMPANY_NAME } = insurance_default.COMPANIES_HOUSE;
var THRESHOLD = format_currency_default(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE);
var ELIGIBILITY_FIELDS = {
  [BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer location',
    },
  },
  [VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: 'In UK, Channel Islands or Isle of Man',
    },
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
    ANSWER: 'At least 20%',
  },
  [HAS_END_BUYER]: {
    HINT: "Sometimes, exporters supply goods to a client in an overseas market who will then sell them on. The exporter will not get paid by the buyer until they have been paid by this third party. We call this third party an 'end buyer'.",
    SUMMARY: {
      TITLE: 'End buyer',
    },
  },
  [COVER_PERIOD_FIELD_ID]: {
    OPTIONS: {
      BELOW: {
        ID: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.LESS_THAN_2_YEARS.VALUE,
      },
      ABOVE: {
        ID: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        VALUE: COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID,
        TEXT: COVER_PERIOD.MORE_THAN_2_YEARS.VALUE,
      },
    },
    SUMMARY: {
      TITLE: 'Length of policy',
    },
  },
  [COMPANIES_HOUSE_NUMBER]: {
    HINT: {
      INTRO: "For example, 8989898 or SC907816. You'll find it on your incorporation certificate or on the",
      LINK: {
        TEXT: 'Companies House website',
        HREF: LINKS.EXTERNAL.COMPANIES_HOUSE,
      },
    },
    SUMMARY: {
      TITLE: 'UK Companies House number',
    },
  },
  [HAS_COMPANIES_HOUSE_NUMBER]: {
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
  [COMPANY_NAME]: {
    SUMMARY: {
      TITLE: 'Company name',
    },
  },
  [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
    OPTIONS: {
      ABOVE: {
        ID: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID,
        TEXT: `${THRESHOLD} and above`,
      },
      BELOW: {
        ID: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        VALUE: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.DB_ID,
        TEXT: `Less than ${THRESHOLD}`,
      },
    },
    SUMMARY: {
      TITLE: 'Total value to insure',
      ABOVE: `Above ${THRESHOLD}`,
      BELOW: `Below ${THRESHOLD}`,
    },
  },
};

// content-strings/fields/insurance/export-contract/index.ts
var { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = EXPORT_CONTRACT_AWARD_METHOD;
var {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  PRIVATE_MARKET: { DECLINED_DESCRIPTION },
} = export_contract_default;
var EXPORT_CONTRACT_FIELDS = {
  HOW_WAS_THE_CONTRACT_AWARDED: {
    [AWARD_METHOD]: {
      LEGEND: 'How was the contract awarded?',
      OPTIONS: {
        OPEN_TENDER: {
          ID: OPEN_TENDER.DB_ID,
          VALUE: OPEN_TENDER.DB_ID,
          TEXT: OPEN_TENDER.VALUE,
        },
        NEGOTIATED_CONTRACT: {
          ID: NEGOTIATED_CONTRACT.DB_ID,
          VALUE: NEGOTIATED_CONTRACT.DB_ID,
          TEXT: NEGOTIATED_CONTRACT.VALUE,
        },
        DIRECT_AWARD: {
          ID: DIRECT_AWARD.DB_ID,
          VALUE: DIRECT_AWARD.DB_ID,
          TEXT: DIRECT_AWARD.VALUE,
        },
        COMPETITIVE_BIDDING: {
          ID: COMPETITIVE_BIDDING.DB_ID,
          VALUE: COMPETITIVE_BIDDING.DB_ID,
          TEXT: COMPETITIVE_BIDDING.VALUE,
        },
        OTHER: {
          ID: OTHER.DB_ID,
          VALUE: OTHER.DB_ID,
          TEXT: OTHER.VALUE,
        },
      },
      SUMMARY: {
        TITLE: 'How was the contract awarded',
      },
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    [DESCRIPTION]: {
      LABEL: "Describe the goods or services you're exporting and explain how they'll be used by the buyer",
      HINT: {
        INTRO: 'For example:',
        LIST: [
          'fast moving consumer goods, like vegan protein bars',
          'construction materials to build commercial property',
          'educational services such as teacher training',
        ],
        OUTRO: "We may contact you to get more information if you're exporting goods or services that might have an impact on the environment.",
      },
      MAXIMUM: MAXIMUM_CHARACTERS.ABOUT_GOODS_OR_SERVICES_DESCRIPTION,
      SUMMARY: {
        TITLE: "Goods or services you're exporting",
      },
    },
    [FINAL_DESTINATION_KNOWN]: {
      LABEL: 'Do you know the final destination of the goods or services?',
    },
    [FINAL_DESTINATION]: {
      LABEL: "What's the final destination of the goods or services?",
      SUMMARY: {
        TITLE: 'Final destination of goods or services',
      },
    },
  },
  HOW_WILL_YOU_GET_PAID: {
    [PAYMENT_TERMS_DESCRIPTION]: {
      HINT: {
        INTRO: 'Types of payment terms include:',
        LIST: ['payments that are due within 60 days from date of invoice', 'payments collected by a letter of credit', 'staged payments'],
        OUTRO: "If you use staged payments, explain their structure and whether they're monthly, in advance or something else.",
      },
    },
  },
  PRIVATE_MARKET: {
    [DECLINED_DESCRIPTION]: {
      HINT: "Tell us about the best quote you received and why you were unable to use it. For example, your current policy might not cover the country you're exporting to.",
    },
  },
};

// content-strings/form-titles.ts
var FORM_TITLES = {
  YOUR_BUSINESS: {
    COMPANY_DETAILS: 'Company details',
    NATURE_OF_BUSINESS: 'Nature of your business',
    TURNOVER: 'Turnover',
    CREDIT_CONTROL: 'Credit control',
  },
  YOUR_BUYER: {
    COMPANY_DETAILS: 'Company details',
    CONNECTION_TO_BUYER: 'Connection to the buyer',
    TRADING_HISTORY: 'Trading history',
    CREDIT_INSURANCE_HISTORY: 'Credit insurance history',
    FINANCIAL_ACCOUNTS: 'Financial accounts',
  },
  POLICY: {
    CONTRACT_POLICY: 'Requested insurance policy',
    NAME_ON_POLICY: 'Named person on the policy',
    BROKER: 'Broker',
    OTHER_COMPANY: 'Other company to be insured',
    LOSS_PAYEE: 'Loss payee',
  },
  EXPORT_CONTRACT: {
    ABOUT_THE_EXPORT: 'About the export',
    PRIVATE_MARKET: 'Private insurance market',
    AGENT: 'Agent',
  },
};

// content-strings/fields/insurance/policy/index.ts
var {
  ACCOUNT: { EMAIL: EMAIL3 },
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    POLICY_TYPE: POLICY_TYPE3,
    SINGLE_POLICY_TYPE,
    MULTIPLE_POLICY_TYPE,
    CONTRACT_POLICY,
    EXPORT_VALUE,
    NAME_ON_POLICY,
    DIFFERENT_NAME_ON_POLICY,
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
    REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME: COMPANY_NAME2, COMPANY_NUMBER, COUNTRY_CODE },
    USING_BROKER,
    BROKER_DETAILS: { NAME },
    BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
    LOSS_PAYEE: { IS_APPOINTED },
    BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
    LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
    FINANCIAL_ADDRESS,
  },
} = insurance_default;
var { MAX_COVER_PERIOD_MONTHS } = ELIGIBILITY;
var {
  LATEST_VERSION: { SMALL_EXPORT_BUILDER: SMALL_EXPORT_BUILDER2 },
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;
var { POLICY: POLICY_FORM_TITLES } = FORM_TITLES;
var maxBuyerWillOweThreshold = Number(SMALL_EXPORT_BUILDER2?.MAXIMUM_BUYER_WILL_OWE);
var SMALL_EXPORT_BUILDER_THRESHOLD = format_currency_default(maxBuyerWillOweThreshold, GBP_CURRENCY_CODE);
var POLICY_FIELDS = {
  [POLICY_TYPE3]: {
    ID: POLICY_TYPE3,
    OPTIONS: {
      SINGLE: {
        ID: SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT_LIST: [
          'Covers a single contract with a buyer, for one or more shipments',
          `Cover for up to ${MAX_COVER_PERIOD_MONTHS} months`,
          'Best for a one off- project, when you know the exact value of your export contract now',
          'You pay for the insurance before the policy starts',
        ],
      },
      MULTIPLE: {
        ID: MULTIPLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        TEXT: 'Multiple contract policy (Revolving credit)',
        HINT_LIST: [
          `Covers multiple contracts with the same buyer, usually for ${TOTAL_MONTHS_OF_COVER.MAXIMUM} months`,
          "Best if you'll have an ongoing relationship with the buyer but you're not sure yet how many contracts or sales you'll have",
          'You only pay for your insurance each time you declare a new contract or sale - no need to pay before the policy starts',
        ],
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      LABEL: 'When do you want your policy to start?',
      HINT: 'For example, 06 11 2023',
      SUMMARY: {
        TITLE: 'Policy start date',
        FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
      },
    },
    [CURRENCY_CODE]: {
      LEGEND: "Select currency you'd like your policy to be issued in",
      HINT: 'This is the currency your policy will be issued in',
      SUMMARY: {
        TITLE: 'Policy currency',
        FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
      },
      [ALTERNATIVE_CURRENCY_CODE]: {
        ID: ALTERNATIVE_CURRENCY_CODE,
        VALUE: ALTERNATIVE_CURRENCY_CODE,
      },
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        LABEL: 'When do you expect to complete the export contract?',
        HINT: 'For example, 06 11 2024',
        SUMMARY: {
          TITLE: 'Date you expect it to complete',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        LABEL: "What's the total value of the contract you want to insure?",
        HINT: 'Enter a whole number. Do not enter decimals.',
        SUMMARY: {
          TITLE: 'Contract value',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [CONTRACT_POLICY.SINGLE.REQUESTED_CREDIT_LIMIT]: {
        LABEL: 'What credit limit do you require?',
        HINT: {
          INTRO: 'For example, your total contract maybe \xA3250,000 but the amount you want to insure is \xA3100,000.',
          OUTRO: 'Enter a whole number. Do not enter decimals.',
        },
        SUMMARY: {
          TITLE: 'Credit limit',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        LABEL: 'How many months do you want to be insured for?',
        HINT: `The maximum is ${TOTAL_MONTHS_OF_COVER.MAXIMUM} months.`,
        OPTIONS: FIELD_VALUES.TOTAL_MONTHS_OF_COVER,
        SUMMARY: {
          TITLE: 'How many months you want to be insured for',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
  },
  EXPORT_VALUE: {
    MULTIPLE: {
      [EXPORT_VALUE.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        LABEL: 'Estimate total sales to your buyer during this time',
        HINT: 'Enter a whole number. Do not enter decimals.',
        SUMMARY: {
          TITLE: 'Estimated total sales to the buyer',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [EXPORT_VALUE.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        LABEL: 'Estimate the maximum amount your buyer will owe you at any single point during this time',
        HINT: {
          FOR_EXAMPLE: 'For example, your total sales might be \xA3250,000 but the maximum the buyer will owe you at any single point is \xA3100,000.',
          INITIAL_CREDIT_LIMIT: {
            INTRO: `If your initial credit limit request is ${SMALL_EXPORT_BUILDER_THRESHOLD} or less you could be eligible for the`,
            LINK: {
              TEXT: 'Small Export Builder.',
              HREF: LINKS.EXTERNAL.SMALL_EXPORT_BUILDER,
            },
          },
          NO_DECIMALS: 'Enter a whole number. Do not enter decimals.',
        },
        SUMMARY: {
          TITLE: 'Estimated maximum amount owed by the buyer',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
  },
  NAME_ON_POLICY: {
    OPTIONS: {
      SAME_NAME: {
        ID: NAME_ON_POLICY.SAME_NAME,
        VALUE: NAME_ON_POLICY.SAME_NAME,
      },
      OTHER_NAME: {
        ID: NAME_ON_POLICY.OTHER_NAME,
        VALUE: NAME_ON_POLICY.OTHER_NAME,
        TEXT: 'Someone else',
      },
    },
    [NAME_ON_POLICY.POSITION]: {
      LABEL: "What's your position at the company?",
      MAXIMUM: MAXIMUM_CHARACTERS.NAME_ON_POLICY_POSITION,
      SUMMARY: {
        TITLE: 'Position at company',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
    [NAME_ON_POLICY.NAME]: {
      SUMMARY: {
        TITLE: 'Contact name',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
  },
  DIFFERENT_NAME_ON_POLICY: {
    [DIFFERENT_NAME_ON_POLICY.POSITION]: {
      LABEL: 'Position at company',
      MAXIMUM: MAXIMUM_CHARACTERS.DIFFERENT_NAME_ON_POLICY,
    },
    [EMAIL3]: {
      SUMMARY: {
        TITLE: 'Contact email',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
  },
  [NEED_PRE_CREDIT_PERIOD]: {
    HINT: 'This is known as the pre-credit period',
    SUMMARY: {
      TITLE: 'Pre-credit period',
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
  },
  [CREDIT_PERIOD_WITH_BUYER]: {
    LABEL: 'How long do you need pre-credit cover for?',
    SUMMARY: {
      TITLE: 'Period of pre-credit cover',
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
    MAXIMUM: MAXIMUM_CHARACTERS.CREDIT_PERIOD_WITH_BUYER,
  },
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [REQUESTED]: {
      HINT: 'This could be a parent company, subsidiary or a subcontractor.',
      SUMMARY: {
        TITLE: 'Another company to be insured',
      },
    },
    [COMPANY_NAME2]: {
      LABEL: 'Name of the other company',
      MAXIMUM: MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NAME,
      SUMMARY: {
        TITLE: 'Name of the other company',
      },
    },
    [COMPANY_NUMBER]: {
      LABEL: 'Registration number of the other company (optional)',
      MAXIMUM: MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER,
      SUMMARY: {
        TITLE: 'Registration number of the other company',
      },
    },
    [COUNTRY_CODE]: {
      LABEL: 'What country is the other company based in?',
      SUMMARY: {
        TITLE: 'Country of the company',
      },
    },
  },
  BROKER: {
    [USING_BROKER]: {
      LABEL: 'Are you using a broker to get this insurance?',
      SUMMARY: {
        TITLE: 'Using a broker',
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
  },
  BROKER_DETAILS: {
    [NAME]: {
      LABEL: 'Name of broker or company',
      MAXIMUM: MAXIMUM_CHARACTERS.BROKER_NAME,
      SUMMARY: {
        TITLE: "Broker's name or company",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [EMAIL3]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
  },
  BROKER_ADDRESSES: {
    [SELECT_THE_ADDRESS]: {
      LABEL: 'Select the address',
      SUMMARY: {
        TITLE: "Broker's address",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
  },
  BROKER_MANUAL_ADDRESS: {
    [FULL_ADDRESS]: {
      LABEL: "Broker's address",
      SUMMARY: {
        TITLE: "Broker's address",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
    },
  },
  LOSS_PAYEE: {
    [IS_APPOINTED]: {
      HINT: {
        INTRO:
          'A loss payee is a financial organisation, like a bank or a lender, who will be paid in the event of a valid claim.  A loss payee could also be a parent company or subsidiary of your business.',
        OUTRO: "Not every policy has a loss payee. If you don't, select 'No' and you will be listed as the default claimant.",
      },
      SUMMARY: {
        TITLE: 'Appointed a loss payee',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  LOSS_PAYEE_DETAILS: {
    [LOSS_PAYEE_NAME]: {
      LABEL: 'Name of the loss payee',
      MAXIMUM: MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME,
      SUMMARY: {
        TITLE: 'Name of the loss payee',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [LOCATION]: {
      LABEL: 'Where is the loss payee located?',
      OPTIONS: {
        UK: {
          ID: IS_LOCATED_IN_UK,
          VALUE: IS_LOCATED_IN_UK,
          TEXT: 'United Kingdom',
        },
        INTERNATIONALLY: {
          ID: IS_LOCATED_INTERNATIONALLY,
          VALUE: IS_LOCATED_INTERNATIONALLY,
          TEXT: 'International',
        },
      },
    },
  },
  LOSS_PAYEE_FINANCIAL_UK: {
    [SORT_CODE]: {
      LABEL: 'Sort code',
      HINT: 'Must be 6 digits long',
      SUMMARY: {
        TITLE: 'Sort code',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [ACCOUNT_NUMBER]: {
      LABEL: 'Account number',
      HINT: 'Must be between 6 and 8 digits long',
      SUMMARY: {
        TITLE: 'Account number',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [FINANCIAL_ADDRESS]: {
      SUMMARY: {
        TITLE: "Loss payee's bank based in the UK",
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    [BIC_SWIFT_CODE]: {
      LABEL: 'BIC or SWIFT code',
      HINT: 'Must be between 8 and 11 characters long',
      SUMMARY: {
        TITLE: 'BIC or SWIFT code',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [IBAN]: {
      LABEL: 'IBAN',
      HINT: 'Must be between 16 and 34 characters long',
      SUMMARY: {
        TITLE: 'IBAN',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [FINANCIAL_ADDRESS]: {
      SUMMARY: {
        TITLE: "Loss payee's bank based internationally",
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  FINANCIAL_ADDRESS: {
    LABEL: 'Bank address',
    MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
  },
};

// content-strings/fields/insurance/your-business/index.ts
var {
  COMPANIES_HOUSE: {
    COMPANY_NAME: COMPANY_NAME3,
    COMPANY_NUMBER: COMPANY_NUMBER2,
    COMPANY_INCORPORATED,
    COMPANY_SIC,
    COMPANY_ADDRESS,
    FINANCIAL_YEAR_END_DATE,
  },
  EXPORTER_BUSINESS: EXPORTER_BUSINESS2,
} = insurance_default;
var {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, WEBSITE },
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS: FULL_ADDRESS2 },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  HAS_CREDIT_CONTROL,
} = EXPORTER_BUSINESS2;
var EXPORTER_BUSINESS_FIELDS = {
  COMPANY_DETAILS: {
    [COMPANY_NUMBER2]: {
      SUMMARY: {
        TITLE: 'Companies House registration number',
      },
    },
    [COMPANY_NAME3]: {
      SUMMARY: {
        TITLE: 'Company name',
      },
    },
    [COMPANY_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Registered office address',
      },
    },
    [COMPANY_INCORPORATED]: {
      SUMMARY: {
        TITLE: 'Date incorporated',
      },
    },
    [COMPANY_SIC]: {
      SUMMARY: {
        TITLE: 'Standard industry classification (SIC) codes and nature of business',
      },
    },
    [FINANCIAL_YEAR_END_DATE]: {
      SUMMARY: {
        TITLE: 'Financial year end date',
      },
    },
    [HAS_DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        TITLE: 'Different trading name',
      },
    },
    [HAS_DIFFERENT_TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Different trading address',
      },
    },
    [WEBSITE]: {
      SUMMARY: {
        TITLE: 'Company website (optional)',
      },
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: 'UK telephone number (optional)',
      },
    },
  },
  [FULL_ADDRESS2]: {
    LABEL: "What's your alternative trading address?",
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [YEARS_EXPORTING]: {
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [EMPLOYEES_UK]: {
      SUMMARY: {
        TITLE: 'Number of UK employees',
      },
    },
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [PERCENTAGE_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  [HAS_CREDIT_CONTROL]: {
    SUMMARY: {
      TITLE: 'Process for managing late payments',
    },
  },
};

// content-strings/fields/insurance/your-buyer/index.ts
var {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION,
    CONNECTION_WITH_BUYER,
    TRADED_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
    OUTSTANDING_PAYMENTS,
    FAILED_PAYMENTS,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    TOTAL_OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    HAS_BUYER_FINANCIAL_ACCOUNTS,
  },
  CURRENCY: { CURRENCY_CODE: CURRENCY_CODE2 },
} = FIELD_IDS.INSURANCE;
var {
  YOUR_BUYER: { COMPANY_DETAILS, TRADING_HISTORY, CONNECTION_TO_BUYER, CREDIT_INSURANCE_HISTORY, FINANCIAL_ACCOUNTS },
} = FORM_TITLES;
var YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      LABEL: "Buyer's company or organisation name",
      SUMMARY: {
        TITLE: 'Company or organisation name',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      LABEL: 'Company address',
      SUMMARY: {
        TITLE: 'Buyer address',
        FORM_TITLE: COMPANY_DETAILS,
      },
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Buyer country',
      SUMMARY: {
        TITLE: 'Buyer country',
      },
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      LABEL: 'Company registration number (optional)',
      SUMMARY: {
        TITLE: 'Registration number (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
      MAXIMUM: MAXIMUM_CHARACTERS.BUYER.REGISTRATION_NUMBER,
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      LABEL: 'Enter their website (optional)',
      SUMMARY: {
        TITLE: 'Buyer website (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
  },
  [CONNECTION_WITH_BUYER]: {
    LABEL: 'Are you connected with the buyer in any way?',
    HINT: {
      INTRO: 'For example:',
      LIST: [
        "someone in your company is a shareholder or director of the buyer's company",
        "someone in the buyer's company is a shareholder or director of your company",
      ],
    },
    SUMMARY: {
      TITLE: 'Connected with the buyer',
      FORM_TITLE: CONNECTION_TO_BUYER,
    },
  },
  [CONNECTION_WITH_BUYER_DESCRIPTION]: {
    LABEL: 'Describe the connection with the buyer',
    MAXIMUM: MAXIMUM_CHARACTERS.CONNECTION_WITH_BUYER_DESCRIPTION,
    SUMMARY: {
      TITLE: 'Details of connection',
      FORM_TITLE: CONNECTION_TO_BUYER,
    },
  },
  [TRADED_WITH_BUYER]: {
    LABEL: 'Have you traded with this buyer before?',
    HINT: 'If yes, we will request a copy of your trading history once the application has been submitted.',
    SUMMARY: {
      TITLE: 'Trading history',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [OUTSTANDING_PAYMENTS]: {
    LABEL: 'Do you currently have any outstanding or overdue payments from the buyer?',
    SUMMARY: {
      TITLE: 'Outstanding or overdue payments',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [FAILED_PAYMENTS]: {
    HINT: 'This is when an invoice has still not been paid 30 days or more after the agreed payment date.',
    SUMMARY: {
      TITLE: 'Buyer failed to pay on time?',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [CURRENCY_CODE2]: {
    LEGEND: 'What is the currency the outstanding or overdue payments are in?',
    SUMMARY: {
      TITLE: 'Outstanding payments currency',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Have you in the past held credit insurance cover on the buyer?',
    SUMMARY: {
      TITLE: 'Credit insurance previously held for the buyer',
      FORM_TITLE: CREDIT_INSURANCE_HISTORY,
    },
  },
  [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Tell us about the credit insurance cover you had on the buyer',
    HINT: 'Include the name of the insurer(s) and the credit limit.',
    SUMMARY: {
      TITLE: 'Details of credit insurance',
      FORM_TITLE: CREDIT_INSURANCE_HISTORY,
    },
    MAXIMUM: MAXIMUM_CHARACTERS.BUYER.PREVIOUS_CREDIT_INSURANCE_COVER,
  },
  [TOTAL_OUTSTANDING_PAYMENTS]: {
    LABEL: 'Total outstanding, including overdue in',
    HINT: 'Enter a whole number. Do not enter decimals.',
    SUMMARY: {
      TITLE: 'Total outstanding including overdue',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [TOTAL_AMOUNT_OVERDUE]: {
    LABEL: 'Amount overdue in',
    HINT: 'Enter a whole number. Do not enter decimals.',
    SUMMARY: {
      TITLE: 'Amount overdue',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [HAS_BUYER_FINANCIAL_ACCOUNTS]: {
    SUMMARY: {
      TITLE: 'Financial accounts relating to the buyer',
      FORM_TITLE: FINANCIAL_ACCOUNTS,
    },
  },
};

// content-strings/fields/insurance/index.ts
var REFERENCE_NUMBER = {
  SUMMARY: {
    TITLE: 'Application reference number',
  },
};
var DATE_SUBMITTED = {
  SUMMARY: {
    TITLE: 'Date submitted',
  },
};
var TIME_SUBMITTED = {
  SUMMARY: {
    TITLE: 'Time submitted',
  },
};

// content-strings/default.ts
var DEFAULT = {
  EMPTY: '-',
};

// content-strings/XLSX.ts
var { AMOUNT_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;
var {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
  DECLARATIONS: { HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: HAS_ANTI_BRIBERY_CODE_OF_CONDUCT2, WILL_EXPORT_WITH_CODE_OF_CONDUCT: WILL_EXPORT_WITH_CODE_OF_CONDUCT2 },
  ELIGIBILITY: {
    BUYER_COUNTRY: BUYER_COUNTRY2,
    COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER2,
    COVER_PERIOD: COVER_PERIOD2,
    HAS_END_BUYER: HAS_END_BUYER2,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES: HAS_MINIMUM_UK_GOODS_OR_SERVICES2,
    IS_MEMBER_OF_A_GROUP,
    IS_PARTY_TO_CONSORTIUM,
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION: DESCRIPTION2, FINAL_DESTINATION_KNOWN: FINAL_DESTINATION_KNOWN2 },
    AGENT_CHARGES: { PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
    AGENT_DETAILS: { NAME: AGENT_NAME, FULL_ADDRESS: AGENT_ADDRESS, COUNTRY_CODE: AGENT_COUNTRY_CODE },
    AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: PAYMENT_TERMS_DESCRIPTION2 },
    PRIVATE_MARKET: { ATTEMPTED: ATTEMPTED_PRIVATE_MARKET, DECLINED_DESCRIPTION: DECLINED_DESCRIPTION2 },
    USING_AGENT,
  },
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS_DOT_NOTATION },
    COMPANIES_HOUSE: { COMPANY_ADDRESS: EXPORTER_COMPANY_ADDRESS, COMPANY_NAME: EXPORTER_COMPANY_NAME, COMPANY_SIC: EXPORTER_COMPANY_SIC },
    HAS_CREDIT_CONTROL: HAS_CREDIT_CONTROL2,
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES2, YEARS_EXPORTING: YEARS_EXPORTING2, EMPLOYEES_UK: EMPLOYEES_UK2 },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER2 },
    YOUR_COMPANY: {
      HAS_DIFFERENT_TRADING_NAME: HAS_DIFFERENT_TRADING_NAME2,
      DIFFERENT_TRADING_NAME,
      PHONE_NUMBER: PHONE_NUMBER2,
      HAS_DIFFERENT_TRADING_ADDRESS: HAS_DIFFERENT_TRADING_ADDRESS2,
      WEBSITE: WEBSITE2,
    },
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME, EMAIL: BROKER_EMAIL },
    BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: BROKER_ADDRESS },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE: REQUESTED_START_DATE2,
      SINGLE: { CONTRACT_COMPLETION_DATE: CONTRACT_COMPLETION_DATE2, TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_ID },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER: TOTAL_MONTHS_OF_COVER2 },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    FINANCIAL_ADDRESS: FINANCIAL_ADDRESS2,
    LOSS_PAYEE: { IS_APPOINTED: IS_APPOINTED2 },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE: BIC_SWIFT_CODE2, IBAN: IBAN2 },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE: SORT_CODE2, ACCOUNT_NUMBER: ACCOUNT_NUMBER2 },
    NAME_ON_POLICY: NAME_ON_POLICY2,
    NEED_PRE_CREDIT_PERIOD: NEED_PRE_CREDIT_PERIOD2,
    CREDIT_PERIOD_WITH_BUYER: CREDIT_PERIOD_WITH_BUYER2,
    REQUESTED_JOINTLY_INSURED_PARTY,
    TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE4 },
    USING_BROKER: USING_BROKER2,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME, REGISTRATION_NUMBER: BUYER_REGISTRATION_NUMBER },
    CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER2,
    CONNECTION_WITH_BUYER_DESCRIPTION: CONNECTION_WITH_BUYER_DESCRIPTION2,
    FAILED_PAYMENTS: FAILED_PAYMENTS2,
    HAS_BUYER_FINANCIAL_ACCOUNTS: HAS_BUYER_FINANCIAL_ACCOUNTS2,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER2,
    OUTSTANDING_PAYMENTS: OUTSTANDING_PAYMENTS2,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER2,
    TOTAL_OUTSTANDING_PAYMENTS: TOTAL_OUTSTANDING_PAYMENTS2,
    TRADED_WITH_BUYER: TRADED_WITH_BUYER2,
  },
} = insurance_default;
var XLSX = {
  AGREED: 'Agreed',
  FIELDS: {
    [ACCOUNT_NUMBER2]: 'Loss payee account number',
    AGENT: {
      [AGENT_NAME]: 'Name of the agent',
      [AGENT_ADDRESS]: 'Address of the agent',
      [AGENT_COUNTRY_CODE]: 'Country the agent is based in',
    },
    AGENT_CHARGES: {
      [FIXED_SUM_AMOUNT]: 'How much is the agent charging?',
      [PAYABLE_COUNTRY_CODE]: 'Country where the charges are payable',
      [PERCENTAGE_CHARGE]: 'How much is the agent charging?',
    },
    AGENT_SERVICE: {
      [IS_CHARGING]: 'Is the agent charging for their support in the export contract?',
      [SERVICE_DESCRIPTION]: 'Service the agent is providing',
    },
    APPLICANT_EMAIL_ADDRESS: 'Applicant email address',
    [BIC_SWIFT_CODE2]: 'Loss payee BIC or SWIFT code',
    [BROKER_NAME]: 'Name of broker or company',
    [BROKER_ADDRESS]: 'Broker address',
    [BROKER_EMAIL]: "Broker's email address",
    [BUYER_COMPANY_NAME]: 'Buyer company name or organisation',
    BUYER_CONTACT_DETAILS: 'Buyer contact details',
    [BUYER_COUNTRY2]: 'Where is your buyer based?',
    [BUYER_REGISTRATION_NUMBER]: 'Buyer registration number (optional)',
    [COMPANIES_HOUSE_NUMBER2]: 'Companies house number',
    [CONNECTION_WITH_BUYER2]: 'Is the exporter connected with the buyer in any way?',
    [CONNECTION_WITH_BUYER_DESCRIPTION2]: 'Describe connection to the buyer',
    [CONTRACT_COMPLETION_DATE2]: 'Expected contract completion date',
    [COUNTRY]: 'Buyer location',
    [COVER_PERIOD2]: 'Length of cover',
    [DIFFERENT_TRADING_NAME]: 'Alternative trading name',
    [EMPLOYEES_UK2]: 'Number of UK Employees',
    [ESTIMATED_ANNUAL_TURNOVER2]: 'Exporter estimated turnover this current financial year',
    [EXPORTER_COMPANY_ADDRESS]: 'Exporter registered office address',
    [EXPORTER_COMPANY_NAME]: 'Exporter company name',
    [EXPORTER_COMPANY_SIC]: 'Exporter standard industry classification (SIC) code(s)',
    EXPORTER_CONTACT: {
      TITLE: 'Exporter contact details',
      [FIRST_NAME]: 'Exporter first name',
      [LAST_NAME]: 'Exporter last name',
      EXPORTER_CONTACT_EMAIL: 'Exporter email address',
      EXPORTER_CONTACT_POSITION: "Exporter's role",
    },
    EXPORT_CONTRACT: {
      [DESCRIPTION2]: "About the exporter's goods or services",
      [FINAL_DESTINATION_KNOWN2]: 'Does the exporter know the final destination of the goods or services?',
      [PAYMENT_TERMS_DESCRIPTION2]: 'How the exporter will be paid for their export',
      [ATTEMPTED_PRIVATE_MARKET]: 'Did the exporter try to insure through the private market?',
      [DECLINED_DESCRIPTION2]: 'Why could they not get insurance through the private market? ',
      [USING_AGENT]: 'Did the exporter use an agent?',
    },
    [FAILED_PAYMENTS2]: 'Has the buyer ever failed to pay the exporter on time?',
    [FINANCIAL_ADDRESS2]: 'Bank address of the loss payee',
    [FIRST_NAME]: 'Applicant first name',
    [FULL_ADDRESS_DOT_NOTATION]: 'Alternative trading address',
    [GOODS_OR_SERVICES2]: 'Goods or services the business supplies',
    [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT2]: 'Does the exporter have a code of conduct?',
    [HAS_BUYER_FINANCIAL_ACCOUNTS2]: 'Does the exporter hold any financial accounts in relation to the buyer?',
    [HAS_CREDIT_CONTROL2]: 'Do you have a process for dealing with late payments?',
    [HAS_DIFFERENT_TRADING_NAME2]: 'Different trading name?',
    [HAS_END_BUYER2]: 'Is there an end buyer?',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES2]: 'Is at least 20% of the contract value made up from UK goods or services?',
    [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER2]: 'Has the exporter previously held credit insurance cover on the buyer?',
    [IBAN2]: 'Loss payee IBAN number',
    [IS_APPOINTED2]: 'Using a loss payee?',
    JOINTLY_INSURED_PARTY: {
      [REQUESTED_JOINTLY_INSURED_PARTY.REQUESTED]: 'Is there another company that needs to be insured on the policy?',
      [REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NAME]: 'Name of the company',
      [REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER]: 'Registration number of the other company (optional)',
      [REQUESTED_JOINTLY_INSURED_PARTY.COUNTRY_CODE]: 'The country the other company is based in',
    },
    KEY_INFORMATION_TITLE: 'Key information',
    [LAST_NAME]: 'Applicant last name',
    [MAXIMUM_BUYER_WILL_OWE]: 'Maximum buyer will owe exporter',
    [MORE_THAN_250K.VALUE]: `Contract value of ${format_currency_default(AMOUNT_250K, GBP_CURRENCY_CODE)} or more?`,
    NAME_ON_POLICY: {
      [NAME_ON_POLICY2.NAME]: 'Name on the policy',
      [NAME_ON_POLICY2.POSITION]: 'Position at the company',
    },
    [NEED_PRE_CREDIT_PERIOD2]: 'Is there a pre-credit period?',
    [CREDIT_PERIOD_WITH_BUYER2]: 'The period of pre-credit cover required',
    NO_FINANCIAL_YEAR_END_DATE: 'No data from Companies House',
    [OUTSTANDING_PAYMENTS2]: 'Does the exporter currently have any outstanding or overdue payments from the buyer?',
    [PHONE_NUMBER2]: 'Exporter UK telephone number (optional)',
    [POLICY_TYPE4]: 'Type of policy',
    [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER2]: 'Details of credit insurance cover held on the buyer',
    [REQUESTED_START_DATE2]: 'Requested policy start date',
    SOMEONE_ELSE: 'Someone else',
    [SORT_CODE2]: 'Loss payee sort code',
    [TOTAL_CONTRACT_VALUE_ID]: 'Total value of the contract',
    [TOTAL_MONTHS_OF_COVER2]: 'Requested length of insurance',
    [TOTAL_OUTSTANDING_PAYMENTS2]: 'Total outstanding payments',
    [TOTAL_SALES_TO_BUYER]: 'Total sales estimate',
    [HAS_DIFFERENT_TRADING_ADDRESS2]: 'Different trading address?',
    [TRADED_WITH_BUYER2]: 'Has the exporter traded with this buyer before?',
    [USING_BROKER2]: 'Using a broker for this insurance?',
    [WEBSITE2]: 'Exporter Company website (optional)',
    [WILL_EXPORT_WITH_CODE_OF_CONDUCT2]: 'Will the exporter export using their code of conduct?',
    [YEARS_EXPORTING2]: 'How long the business has been exporting for',
    [IS_PARTY_TO_CONSORTIUM]: 'Party to any consortium in connection with the export contract(s)?',
    [IS_MEMBER_OF_A_GROUP]: 'Member of a group which may have a part in negotiating the contract(s)?',
  },
};

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-row/index.ts
var { KEY, VALUE } = XLSX_CONFIG;
var xlsxRow = (fieldName, answer) => {
  if (fieldName) {
    console.info('Mapping XLSX row %s', fieldName);
    const value = answer || answer === 0 ? answer : '';
    const cleanValue = replace_character_codes_with_characters_default(String(value));
    const row = {
      [KEY]: fieldName,
      [VALUE]: cleanValue,
    };
    return row;
  }
};
var xlsx_row_default = xlsxRow;

// generate-xlsx/map-application-to-XLSX/helpers/format-time-of-day/index.ts
var formatTimeOfDay = (date) => format_date_default(date, DATE_FORMAT.HOURS_AND_MINUTES);
var format_time_of_day_default = formatTimeOfDay;

// generate-xlsx/map-application-to-XLSX/map-introduction/index.ts
var { FIELDS } = XLSX;
var { FIRST_NAME: FIRST_NAME2, LAST_NAME: LAST_NAME2, EMAIL: EMAIL4 } = account_default;
var mapIntroduction = (application2) => {
  const mapped = [
    xlsx_row_default(REFERENCE_NUMBER.SUMMARY.TITLE, application2.referenceNumber),
    xlsx_row_default(DATE_SUBMITTED.SUMMARY.TITLE, format_date_default(application2.submissionDate, DATE_FORMAT.XLSX)),
    xlsx_row_default(TIME_SUBMITTED.SUMMARY.TITLE, format_time_of_day_default(application2.submissionDate)),
    xlsx_row_default(String(FIELDS[FIRST_NAME2]), application2.owner[FIRST_NAME2]),
    xlsx_row_default(String(FIELDS[LAST_NAME2]), application2.owner[LAST_NAME2]),
    xlsx_row_default(FIELDS.APPLICANT_EMAIL_ADDRESS, application2.owner[EMAIL4]),
  ];
  return mapped;
};
var map_introduction_default = mapIntroduction;

// generate-xlsx/map-application-to-XLSX/map-exporter-contact-details/index.ts
var {
  ACCOUNT: { FIRST_NAME: FIRST_NAME3, LAST_NAME: LAST_NAME3, EMAIL: EMAIL5 },
  POLICY: {
    NAME_ON_POLICY: { POSITION },
  },
} = insurance_default;
var { FIELDS: FIELDS2 } = XLSX;
var mapExporterContactDetails = (application2) => {
  const { policyContact } = application2;
  const mapped = [
    xlsx_row_default(FIELDS2.EXPORTER_CONTACT.TITLE),
    xlsx_row_default(FIELDS2.EXPORTER_CONTACT[FIRST_NAME3], policyContact[FIRST_NAME3]),
    xlsx_row_default(FIELDS2.EXPORTER_CONTACT[LAST_NAME3], policyContact[LAST_NAME3]),
    xlsx_row_default(FIELDS2.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL5]),
    xlsx_row_default(FIELDS2.EXPORTER_CONTACT.EXPORTER_CONTACT_POSITION, policyContact[POSITION]),
  ];
  return mapped;
};
var map_exporter_contact_details_default = mapExporterContactDetails;

// generate-xlsx/map-application-to-XLSX/helpers/map-yes-no-field/index.ts
var { YES, NO } = FIELD_VALUES;
var mapYesNoField = ({ answer }) => {
  if (answer === false) {
    return NO;
  }
  if (answer === true) {
    return YES;
  }
  return DEFAULT.EMPTY;
};
var map_yes_no_field_default = mapYesNoField;

// generate-xlsx/map-application-to-XLSX/map-eligibility/index.ts
var { MORE_THAN_250K: MORE_THAN_250K2 } = TOTAL_CONTRACT_VALUE;
var { FIELDS: FIELDS3 } = XLSX;
var {
  ELIGIBILITY: {
    BUYER_COUNTRY: BUYER_COUNTRY3,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES: HAS_MINIMUM_UK_GOODS_OR_SERVICES3,
    VALID_EXPORTER_LOCATION: VALID_EXPORTER_LOCATION2,
    COVER_PERIOD: COVER_PERIOD_ELIGIBILITY,
    TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID2,
    COVER_PERIOD: COVER_PERIOD3,
    HAS_COMPANIES_HOUSE_NUMBER: HAS_COMPANIES_HOUSE_NUMBER2,
    COMPANIES_HOUSE_NUMBER: COMPANIES_HOUSE_NUMBER3,
    HAS_END_BUYER: HAS_END_BUYER3,
    IS_PARTY_TO_CONSORTIUM: IS_PARTY_TO_CONSORTIUM2,
    IS_MEMBER_OF_A_GROUP: IS_MEMBER_OF_A_GROUP2,
  },
} = insurance_default;
var mapEligibility = (application2) => {
  const { company, eligibility } = application2;
  let mapped = [
    xlsx_row_default(ELIGIBILITY_FIELDS[VALID_EXPORTER_LOCATION2].SUMMARY?.TITLE, map_yes_no_field_default({ answer: eligibility[VALID_EXPORTER_LOCATION2] })),
    xlsx_row_default(
      ELIGIBILITY_FIELDS[HAS_COMPANIES_HOUSE_NUMBER2].SUMMARY?.TITLE,
      map_yes_no_field_default({ answer: eligibility[HAS_COMPANIES_HOUSE_NUMBER2] }),
    ),
    xlsx_row_default(String(FIELDS3[COMPANIES_HOUSE_NUMBER3]), company[COMPANIES_HOUSE_NUMBER3]),
    xlsx_row_default(String(FIELDS3[BUYER_COUNTRY3]), eligibility[BUYER_COUNTRY3].name),
  ];
  const totalContractValueAnswer = eligibility[TOTAL_CONTRACT_VALUE_FIELD_ID2].valueId === MORE_THAN_250K2.DB_ID;
  mapped = [
    ...mapped,
    xlsx_row_default(String(FIELDS3[MORE_THAN_250K2.VALUE]), map_yes_no_field_default({ answer: totalContractValueAnswer })),
    xlsx_row_default(String(FIELDS3[COVER_PERIOD3]), eligibility[COVER_PERIOD_ELIGIBILITY].value),
    xlsx_row_default(String(FIELDS3[HAS_MINIMUM_UK_GOODS_OR_SERVICES3]), map_yes_no_field_default({ answer: eligibility[HAS_MINIMUM_UK_GOODS_OR_SERVICES3] })),
    xlsx_row_default(String(FIELDS3[HAS_END_BUYER3]), map_yes_no_field_default({ answer: eligibility[HAS_END_BUYER3] })),
    xlsx_row_default(String(FIELDS3[IS_PARTY_TO_CONSORTIUM2]), map_yes_no_field_default({ answer: eligibility[IS_PARTY_TO_CONSORTIUM2] })),
    xlsx_row_default(String(FIELDS3[IS_MEMBER_OF_A_GROUP2]), map_yes_no_field_default({ answer: eligibility[IS_PARTY_TO_CONSORTIUM2] })),
  ];
  return mapped;
};
var map_eligibility_default = mapEligibility;

// generate-xlsx/map-application-to-XLSX/map-key-information/index.ts
var { FIELDS: FIELDS4 } = XLSX;
var CONTENT_STRINGS = {
  ...POLICY_FIELDS,
};
var {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME2 },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY: COUNTRY2, NAME: BUYER_COMPANY_NAME2 },
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE5 },
  },
} = insurance_default;
var mapKeyInformation = (application2) => {
  const { policy } = application2;
  const mapped = [
    xlsx_row_default(FIELDS4.KEY_INFORMATION_TITLE),
    xlsx_row_default(String(FIELDS4[EXPORTER_COMPANY_NAME2]), replace_character_codes_with_characters_default(application2.company[EXPORTER_COMPANY_NAME2])),
    xlsx_row_default(String(FIELDS4[COUNTRY2]), application2.buyer[COUNTRY2].name),
    xlsx_row_default(String(FIELDS4[BUYER_COMPANY_NAME2]), replace_character_codes_with_characters_default(application2.buyer[BUYER_COMPANY_NAME2])),
    xlsx_row_default(String(CONTENT_STRINGS[POLICY_TYPE5].SUMMARY?.TITLE), policy[POLICY_TYPE5]),
  ];
  return mapped;
};
var map_key_information_default = mapKeyInformation;

// generate-xlsx/map-application-to-XLSX/map-policy/map-intro/map-policy-type/index.ts
var {
  POLICY_TYPE: { ABBREVIATED },
} = APPLICATION;
var mapPolicyType = (policyType) => {
  if (isSinglePolicyType(policyType)) {
    return ABBREVIATED.SINGLE;
  }
  if (isMultiplePolicyType(policyType)) {
    return ABBREVIATED.MULTIPLE;
  }
};
var map_policy_type_default = mapPolicyType;

// generate-xlsx/map-application-to-XLSX/map-policy/map-intro/index.ts
var { FIELDS: FIELDS5 } = XLSX;
var {
  POLICY_TYPE: POLICY_TYPE6,
  CONTRACT_POLICY: { REQUESTED_START_DATE: REQUESTED_START_DATE3 },
} = policy_default;
var mapIntro = (policy) => {
  const mapped = [
    xlsx_row_default(String(FIELDS5[POLICY_TYPE6]), map_policy_type_default(policy[POLICY_TYPE6])),
    xlsx_row_default(String(FIELDS5[REQUESTED_START_DATE3]), format_date_default(policy[REQUESTED_START_DATE3], DATE_FORMAT.XLSX)),
  ];
  return mapped;
};
var map_intro_default = mapIntro;

// content-strings/fields/insurance/account/index.ts
var { ACCOUNT: ACCOUNT3 } = FIELD_IDS.INSURANCE;
var { FIRST_NAME: FIRST_NAME4, LAST_NAME: LAST_NAME4, EMAIL: EMAIL6, PASSWORD, ACCESS_CODE } = ACCOUNT3;
var PASSWORD_HINT = {
  INTRO: 'Your password must contain at least 14 characters and have:',
  RULES: ['an uppercase letter', 'a lowercase letter', 'a number', 'a special character (for example @%!?*)'],
};
var ACCOUNT_FIELDS = {
  MAXIMUM: {
    NAME: {
      CHARACTERS: 100,
    },
  },
  [FIRST_NAME4]: {
    LABEL: 'First name',
  },
  [LAST_NAME4]: {
    LABEL: 'Last name',
  },
  [EMAIL6]: {
    LABEL: 'Email address',
  },
  [PASSWORD]: {
    REVEAL: {
      SHOW: 'Show',
      HIDE: 'Hide',
    },
  },
  [ACCESS_CODE]: {
    LABEL: 'Access code',
  },
  CREATE: {
    YOUR_DETAILS: {
      [FIRST_NAME4]: {
        LABEL: 'First name',
      },
      [LAST_NAME4]: {
        LABEL: 'Last name',
      },
      [PASSWORD]: {
        LABEL: 'Create a password',
        HINT: PASSWORD_HINT,
      },
    },
  },
  SIGN_IN: {
    [PASSWORD]: {
      LABEL: 'Password',
    },
  },
  PASSWORD_RESET: {
    [EMAIL6]: {
      LABEL: 'Email address',
      HINT: 'Enter the email address associated with your credit insurance application(s).',
    },
  },
  NEW_PASSWORD: {
    [PASSWORD]: {
      LABEL: 'Create a password',
      HINT: PASSWORD_HINT,
    },
  },
};

// generate-xlsx/map-application-to-XLSX/map-policy/map-name-on-policy/index.ts
var { FIELDS: FIELDS6 } = XLSX;
var {
  ACCOUNT: { FIRST_NAME: FIRST_NAME5, LAST_NAME: LAST_NAME5, EMAIL: EMAIL7 },
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, NAME: NAME2, POSITION: POSITION2 },
  },
} = insurance_default;
var mapNameOnPolicy = (policyContact) => {
  let mapped = [];
  if (policyContact[IS_SAME_AS_OWNER]) {
    const nameOnPolicy = `${policyContact[FIRST_NAME5]} ${policyContact[LAST_NAME5]} (${policyContact[EMAIL7]})`;
    mapped = [
      xlsx_row_default(String(FIELDS6.NAME_ON_POLICY[NAME2]), nameOnPolicy),
      xlsx_row_default(String(FIELDS6.NAME_ON_POLICY[POSITION2]), policyContact[POSITION2]),
    ];
    return mapped;
  }
  mapped = [
    xlsx_row_default(String(FIELDS6.NAME_ON_POLICY[NAME2]), FIELDS6.SOMEONE_ELSE),
    xlsx_row_default(String(ACCOUNT_FIELDS[FIRST_NAME5].LABEL), policyContact[FIRST_NAME5]),
    xlsx_row_default(String(ACCOUNT_FIELDS[LAST_NAME5].LABEL), policyContact[LAST_NAME5]),
    xlsx_row_default(String(ACCOUNT_FIELDS[EMAIL7].LABEL), policyContact[EMAIL7]),
    xlsx_row_default(String(FIELDS6.NAME_ON_POLICY[POSITION2]), policyContact[POSITION2]),
  ];
  return mapped;
};
var map_name_on_policy_default = mapNameOnPolicy;

// generate-xlsx/map-application-to-XLSX/helpers/format-currency/index.ts
var formatCurrency2 = (number, currencyCode, decimalPlaces) =>
  number.toLocaleString('en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimalPlaces ?? 0,
    maximumFractionDigits: decimalPlaces ?? 0,
  });
var format_currency_default2 = formatCurrency2;

// generate-xlsx/map-application-to-XLSX/map-policy/map-single-contract-policy/index.ts
var { FIELDS: FIELDS7 } = XLSX;
var CONTENT_STRINGS2 = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
};
var {
  CURRENCY: { CURRENCY_CODE: CURRENCY_CODE3 },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { CONTRACT_COMPLETION_DATE: CONTRACT_COMPLETION_DATE3 },
      POLICY_CURRENCY_CODE,
      SINGLE: { REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE2 },
    },
  },
} = insurance_default;
var mapSingleContractPolicy = (policy) => {
  const mapped = [
    xlsx_row_default(String(FIELDS7[CONTRACT_COMPLETION_DATE3]), format_date_default(policy[CONTRACT_COMPLETION_DATE3], DATE_FORMAT.XLSX)),
    xlsx_row_default(String(CONTENT_STRINGS2[CURRENCY_CODE3].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
    xlsx_row_default(String(FIELDS7[TOTAL_CONTRACT_VALUE2]), format_currency_default2(policy[TOTAL_CONTRACT_VALUE2], policy[POLICY_CURRENCY_CODE])),
    xlsx_row_default(
      String(CONTENT_STRINGS2[REQUESTED_CREDIT_LIMIT].SUMMARY?.TITLE),
      format_currency_default2(policy[REQUESTED_CREDIT_LIMIT], policy[POLICY_CURRENCY_CODE]),
    ),
  ];
  return mapped;
};
var map_single_contract_policy_default = mapSingleContractPolicy;

// generate-xlsx/map-application-to-XLSX/helpers/map-month-string/index.ts
var mapMonthString = (answer) => (answer === 1 ? `${answer} month` : `${answer} months`);
var map_month_string_default = mapMonthString;

// generate-xlsx/map-application-to-XLSX/map-policy/map-multiple-contract-policy/index.ts
var { FIELDS: FIELDS8 } = XLSX;
var CONTENT_STRINGS3 = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...POLICY_FIELDS.EXPORT_VALUE.MULTIPLE,
};
var {
  CURRENCY: { CURRENCY_CODE: CURRENCY_CODE4 },
  POLICY: {
    CONTRACT_POLICY: {
      POLICY_CURRENCY_CODE: POLICY_CURRENCY_CODE2,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER: TOTAL_MONTHS_OF_COVER3 },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER: TOTAL_SALES_TO_BUYER2, MAXIMUM_BUYER_WILL_OWE: MAXIMUM_BUYER_WILL_OWE2 },
    },
  },
} = insurance_default;
var mapMultipleContractPolicy = (policy) => [
  xlsx_row_default(String(FIELDS8[TOTAL_MONTHS_OF_COVER3]), map_month_string_default(policy[TOTAL_MONTHS_OF_COVER3])),
  xlsx_row_default(String(CONTENT_STRINGS3[CURRENCY_CODE4].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE2]),
  xlsx_row_default(String(FIELDS8[TOTAL_SALES_TO_BUYER2]), format_currency_default2(policy[TOTAL_SALES_TO_BUYER2], policy[POLICY_CURRENCY_CODE2])),
  xlsx_row_default(String(FIELDS8[MAXIMUM_BUYER_WILL_OWE2]), format_currency_default2(policy[MAXIMUM_BUYER_WILL_OWE2], policy[POLICY_CURRENCY_CODE2])),
];
var map_multiple_contract_policy_default = mapMultipleContractPolicy;

// generate-xlsx/map-application-to-XLSX/map-policy/map-credit-period/index.ts
var { FIELDS: FIELDS9 } = XLSX;
var { NEED_PRE_CREDIT_PERIOD: NEED_PRE_CREDIT_PERIOD3, CREDIT_PERIOD_WITH_BUYER: CREDIT_PERIOD_WITH_BUYER3 } = policy_default;
var mapCreditPeriod = (policy) => {
  const needPreCreditPeriod = policy[NEED_PRE_CREDIT_PERIOD3];
  let mapped = [xlsx_row_default(String(FIELDS9[NEED_PRE_CREDIT_PERIOD3]), map_yes_no_field_default({ answer: needPreCreditPeriod }))];
  if (needPreCreditPeriod) {
    mapped = [...mapped, xlsx_row_default(String(FIELDS9[CREDIT_PERIOD_WITH_BUYER3]), policy[CREDIT_PERIOD_WITH_BUYER3])];
  }
  return mapped;
};
var map_credit_period_default = mapCreditPeriod;

// helpers/get-country-by-iso-code/index.ts
var getCountryByIsoCode = (countries, isoCode) => {
  const country = countries.find((c) => c.isoCode === isoCode);
  return country;
};
var get_country_by_iso_code_default = getCountryByIsoCode;

// generate-xlsx/map-application-to-XLSX/map-policy/map-jointly-insured-party/index.ts
var { FIELDS: FIELDS10 } = XLSX;
var {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED: REQUESTED2, COMPANY_NAME: COMPANY_NAME4, COMPANY_NUMBER: COMPANY_NUMBER3, COUNTRY_CODE: COUNTRY_CODE2 },
} = policy_default;
var mapJointlyInsuredParty = (party, countries) => {
  const requestedParty = party[REQUESTED2];
  let mapped = [xlsx_row_default(String(FIELDS10.JOINTLY_INSURED_PARTY[REQUESTED2]), map_yes_no_field_default({ answer: requestedParty }))];
  const country = get_country_by_iso_code_default(countries, party[COUNTRY_CODE2]);
  if (requestedParty) {
    mapped = [
      ...mapped,
      xlsx_row_default(String(FIELDS10.JOINTLY_INSURED_PARTY[COMPANY_NAME4]), party[COMPANY_NAME4]),
      xlsx_row_default(String(FIELDS10.JOINTLY_INSURED_PARTY[COUNTRY_CODE2]), country.name),
      xlsx_row_default(String(FIELDS10.JOINTLY_INSURED_PARTY[COMPANY_NUMBER3]), party[COMPANY_NUMBER3]),
    ];
  }
  return mapped;
};
var map_jointly_insured_party_default = mapJointlyInsuredParty;

// generate-xlsx/map-application-to-XLSX/map-policy/map-broker/map-broker-address/based-in-the-uk/index.ts
var mapBrokerAddressBasedInTheUk = (broker) => {
  const { addressLine1, addressLine2, town, county, postcode } = broker;
  let addressString = '';
  if (addressLine1) {
    addressString += `${addressLine1}
`;
  }
  if (addressLine2) {
    addressString += `${addressLine2}
`;
  }
  if (town) {
    addressString += `${town}
`;
  }
  if (county) {
    addressString += `${county}
`;
  }
  addressString += postcode;
  return addressString;
};
var based_in_the_uk_default = mapBrokerAddressBasedInTheUk;

// generate-xlsx/map-application-to-XLSX/map-policy/map-broker/map-broker-address/index.ts
var {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: FULL_ADDRESS3 },
} = POLICY;
var { FIELDS: FIELDS11 } = XLSX;
var mapBrokerAddress = (broker) => {
  let fieldValue = '';
  if (broker[FULL_ADDRESS3]) {
    fieldValue = broker[FULL_ADDRESS3];
  } else {
    fieldValue = based_in_the_uk_default(broker);
  }
  return xlsx_row_default(String(FIELDS11[FULL_ADDRESS3]), fieldValue);
};
var map_broker_address_default = mapBrokerAddress;

// generate-xlsx/map-application-to-XLSX/map-policy/map-broker/index.ts
var {
  USING_BROKER: USING_BROKER3,
  BROKER_DETAILS: { NAME: BROKER_NAME2, EMAIL: EMAIL8 },
} = POLICY;
var { FIELDS: FIELDS12 } = XLSX;
var mapBroker = (application2) => {
  const { broker } = application2;
  let mapped = [xlsx_row_default(String(FIELDS12[USING_BROKER3]), map_yes_no_field_default({ answer: broker[USING_BROKER3] }))];
  if (broker[USING_BROKER3]) {
    mapped = [
      ...mapped,
      xlsx_row_default(String(FIELDS12[BROKER_NAME2]), broker[BROKER_NAME2]),
      xlsx_row_default(String(FIELDS12[EMAIL8]), broker[EMAIL8]),
      map_broker_address_default(broker),
    ];
  }
  return mapped;
};
var map_broker_default = mapBroker;

// generate-xlsx/map-application-to-XLSX/map-policy/map-loss-payee/map-appointed-loss-payee/map-location/index.ts
var {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY: IS_LOCATED_INTERNATIONALLY2, IS_LOCATED_IN_UK: IS_LOCATED_IN_UK2, LOCATION: LOCATION2 },
} = policy_default;
var CONTENT_STRINGS4 = POLICY_FIELDS.LOSS_PAYEE_DETAILS[LOCATION2].OPTIONS;
var mapLossPayeeLocation = (lossPayee) => {
  if (lossPayee[IS_LOCATED_INTERNATIONALLY2]) {
    return String(CONTENT_STRINGS4?.INTERNATIONALLY.TEXT);
  }
  if (lossPayee[IS_LOCATED_IN_UK2]) {
    return String(CONTENT_STRINGS4?.UK.TEXT);
  }
};
var map_location_default = mapLossPayeeLocation;

// generate-xlsx/map-application-to-XLSX/map-policy/map-loss-payee/map-appointed-loss-payee/index.ts
var { FIELDS: FIELDS13 } = XLSX;
var CONTENT_STRINGS5 = POLICY_FIELDS.LOSS_PAYEE_DETAILS;
var {
  LOSS_PAYEE: { IS_APPOINTED: IS_APPOINTED3 },
  LOSS_PAYEE_DETAILS: { LOCATION: LOCATION3, NAME: LOSS_PAYEE_NAME2 },
} = policy_default;
var mapAppointedLossPayee = (lossPayee) => {
  let mapped = [xlsx_row_default(String(FIELDS13[IS_APPOINTED3]), map_yes_no_field_default({ answer: lossPayee[IS_APPOINTED3] }))];
  if (lossPayee[IS_APPOINTED3]) {
    mapped = [
      ...mapped,
      xlsx_row_default(String(CONTENT_STRINGS5[LOSS_PAYEE_NAME2].SUMMARY?.TITLE), lossPayee[LOSS_PAYEE_NAME2]),
      xlsx_row_default(String(CONTENT_STRINGS5[LOCATION3].LABEL), map_location_default(lossPayee)),
    ];
  }
  return mapped;
};
var map_appointed_loss_payee_default = mapAppointedLossPayee;

// generate-xlsx/map-application-to-XLSX/map-policy/map-loss-payee/map-financial-details-international/index.ts
var { FIELDS: FIELDS14 } = XLSX;
var {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY: IS_LOCATED_INTERNATIONALLY3 },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE: BIC_SWIFT_CODE3, IBAN: IBAN3 },
  FINANCIAL_ADDRESS: FINANCIAL_ADDRESS3,
} = policy_default;
var mapLossPayeeFinancialDetailsInternational = (lossPayee) => {
  if (lossPayee[IS_LOCATED_INTERNATIONALLY3]) {
    const mapped = [
      xlsx_row_default(String(FIELDS14[BIC_SWIFT_CODE3]), lossPayee.financialInternational[BIC_SWIFT_CODE3]),
      xlsx_row_default(String(FIELDS14[IBAN3]), lossPayee.financialInternational[IBAN3]),
      xlsx_row_default(String(FIELDS14[FINANCIAL_ADDRESS3]), lossPayee.financialInternational[FINANCIAL_ADDRESS3]),
    ];
    return mapped;
  }
  return [];
};
var map_financial_details_international_default = mapLossPayeeFinancialDetailsInternational;

// generate-xlsx/map-application-to-XLSX/map-policy/map-loss-payee/map-financial-details-uk/index.ts
var { FIELDS: FIELDS15 } = XLSX;
var {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_IN_UK: IS_LOCATED_IN_UK3 },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE: SORT_CODE3, ACCOUNT_NUMBER: ACCOUNT_NUMBER3 },
  FINANCIAL_ADDRESS: FINANCIAL_ADDRESS4,
} = policy_default;
var mapLossPayeeFinancialDetailsUk = (lossPayee) => {
  if (lossPayee[IS_LOCATED_IN_UK3]) {
    const mapped = [
      xlsx_row_default(String(FIELDS15[SORT_CODE3]), lossPayee.financialUk[SORT_CODE3]),
      xlsx_row_default(String(FIELDS15[ACCOUNT_NUMBER3]), lossPayee.financialUk[ACCOUNT_NUMBER3]),
      xlsx_row_default(String(FIELDS15[FINANCIAL_ADDRESS4]), lossPayee.financialUk[FINANCIAL_ADDRESS4]),
    ];
    return mapped;
  }
  return [];
};
var map_financial_details_uk_default = mapLossPayeeFinancialDetailsUk;

// generate-xlsx/map-application-to-XLSX/map-policy/map-loss-payee/index.ts
var mapLossPayee = (lossPayee) => {
  const mapped = [
    ...map_appointed_loss_payee_default(lossPayee),
    ...map_financial_details_uk_default(lossPayee),
    ...map_financial_details_international_default(lossPayee),
  ];
  return mapped;
};
var map_loss_payee_default = mapLossPayee;

// generate-xlsx/map-application-to-XLSX/map-policy/index.ts
var {
  TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE7 },
} = policy_default;
var mapPolicy2 = (application2, countries) => {
  const { nominatedLossPayee, policy, policyContact } = application2;
  const policyType = policy[POLICY_TYPE7];
  let mapped = map_intro_default(policy);
  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...map_single_contract_policy_default(policy)];
  }
  if (isMultiplePolicyType(policyType)) {
    mapped = [...mapped, ...map_multiple_contract_policy_default(policy)];
  }
  mapped = [
    ...mapped,
    ...map_name_on_policy_default(policyContact),
    ...map_credit_period_default(policy),
    ...map_jointly_insured_party_default(policy.jointlyInsuredParty, countries),
    ...map_broker_default(application2),
    ...map_loss_payee_default(nominatedLossPayee),
  ];
  return mapped;
};
var map_policy_default2 = mapPolicy2;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/map-different-trading-name/index.ts
var {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME: HAS_DIFFERENT_TRADING_NAME3, DIFFERENT_TRADING_NAME: DIFFERENT_TRADING_NAME2 },
} = business_default;
var { FIELDS: FIELDS16 } = XLSX;
var mapDifferentTradingName = (company) => {
  if (company[HAS_DIFFERENT_TRADING_NAME3]) {
    return xlsx_row_default(String(FIELDS16[DIFFERENT_TRADING_NAME2]), company[DIFFERENT_TRADING_NAME2]);
  }
};
var map_different_trading_name_default = mapDifferentTradingName;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/map-different-trading-address/index.ts
var {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS: FULL_ADDRESS4, FULL_ADDRESS_DOT_NOTATION: FULL_ADDRESS_DOT_NOTATION2 },
} = business_default;
var { FIELDS: FIELDS17 } = XLSX;
var mapDifferentTradingAddress = (company) => {
  const { differentTradingAddress } = company;
  const differentTradingAddressValue = differentTradingAddress[FULL_ADDRESS4];
  if (differentTradingAddressValue) {
    return xlsx_row_default(String(FIELDS17[FULL_ADDRESS_DOT_NOTATION2]), differentTradingAddressValue);
  }
};
var map_different_trading_address_default = mapDifferentTradingAddress;

// generate-xlsx/map-application-to-XLSX/helpers/xlsx-new-line/index.ts
var NEW_LINE = '\r\n';
var xlsx_new_line_default = NEW_LINE;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/map-exporter-address/index.ts
var mapExporterAddress = (address) => {
  let addressString = '';
  Object.keys(address).forEach((field) => {
    if (address[field] && field !== 'id' && field !== '__typename') {
      addressString += `${address[field]}${xlsx_new_line_default}`;
    }
  });
  return addressString;
};
var map_exporter_address_default = mapExporterAddress;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/map-financial-year-end-date/index.ts
var {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE2 },
} = business_default;
var { FIELDS: FIELDS18 } = XLSX;
var mapFinancialYearEndDate = (company) => {
  if (company[FINANCIAL_YEAR_END_DATE2]) {
    return format_date_default(company[FINANCIAL_YEAR_END_DATE2], DATE_FORMAT.XLSX);
  }
  return FIELDS18.NO_FINANCIAL_YEAR_END_DATE;
};
var map_financial_year_end_date_default = mapFinancialYearEndDate;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/map-sic-codes/index.ts
var mapSicCodes2 = (sicCodes) => {
  let mapped = '';
  sicCodes.forEach((sicCodeObj) => {
    const { sicCode, industrySectorName } = sicCodeObj;
    mapped += `${sicCode} - ${industrySectorName}${xlsx_new_line_default}`;
  });
  return mapped;
};
var map_sic_codes_default2 = mapSicCodes2;

// generate-xlsx/map-application-to-XLSX/map-exporter-business/index.ts
var { FIELDS: FIELDS19 } = XLSX;
var CONTENT_STRINGS6 = {
  ...EXPORTER_BUSINESS_FIELDS.COMPANY_DETAILS,
  ...EXPORTER_BUSINESS_FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...EXPORTER_BUSINESS_FIELDS.TURNOVER,
  ...EXPORTER_BUSINESS_FIELDS.BROKER,
};
var {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS: COMPANY_ADDRESS2,
    COMPANY_INCORPORATED: COMPANY_INCORPORATED2,
    COMPANY_SIC: COMPANY_SIC2,
    FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE3,
  },
  YOUR_COMPANY: {
    HAS_DIFFERENT_TRADING_NAME: HAS_DIFFERENT_TRADING_NAME4,
    HAS_DIFFERENT_TRADING_ADDRESS: HAS_DIFFERENT_TRADING_ADDRESS3,
    PHONE_NUMBER: PHONE_NUMBER3,
    WEBSITE: WEBSITE3,
  },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES: GOODS_OR_SERVICES3, YEARS_EXPORTING: YEARS_EXPORTING3, EMPLOYEES_UK: EMPLOYEES_UK3 },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER: ESTIMATED_ANNUAL_TURNOVER3, PERCENTAGE_TURNOVER: PERCENTAGE_TURNOVER2, TURNOVER_CURRENCY_CODE },
  HAS_CREDIT_CONTROL: HAS_CREDIT_CONTROL3,
} = business_default;
var mapExporterBusiness = (application2) => {
  const { business, company, companySicCodes } = application2;
  const mapped = [
    xlsx_row_default(CONTENT_STRINGS6[COMPANY_INCORPORATED2].SUMMARY?.TITLE, format_date_default(company[COMPANY_INCORPORATED2], DATE_FORMAT.XLSX)),
    xlsx_row_default(String(FIELDS19[COMPANY_ADDRESS2]), map_exporter_address_default(company[COMPANY_ADDRESS2])),
    xlsx_row_default(String(FIELDS19[COMPANY_SIC2]), map_sic_codes_default2(companySicCodes)),
    xlsx_row_default(String(FIELDS19[HAS_DIFFERENT_TRADING_NAME4]), map_yes_no_field_default({ answer: company[HAS_DIFFERENT_TRADING_NAME4] })),
    map_different_trading_name_default(company),
    xlsx_row_default(String(FIELDS19[HAS_DIFFERENT_TRADING_ADDRESS3]), map_yes_no_field_default({ answer: company[HAS_DIFFERENT_TRADING_ADDRESS3] })),
    map_different_trading_address_default(company),
    xlsx_row_default(String(FIELDS19[WEBSITE3]), company[WEBSITE3]),
    xlsx_row_default(String(FIELDS19[PHONE_NUMBER3]), company[PHONE_NUMBER3]),
    xlsx_row_default(String(FIELDS19[GOODS_OR_SERVICES3]), business[GOODS_OR_SERVICES3]),
    xlsx_row_default(String(FIELDS19[YEARS_EXPORTING3]), business[YEARS_EXPORTING3]),
    xlsx_row_default(String(FIELDS19[EMPLOYEES_UK3]), business[EMPLOYEES_UK3]),
    xlsx_row_default(CONTENT_STRINGS6[FINANCIAL_YEAR_END_DATE3].SUMMARY?.TITLE, map_financial_year_end_date_default(company)),
    xlsx_row_default(
      String(FIELDS19[ESTIMATED_ANNUAL_TURNOVER3]),
      format_currency_default2(business[ESTIMATED_ANNUAL_TURNOVER3], business[TURNOVER_CURRENCY_CODE]),
    ),
    xlsx_row_default(CONTENT_STRINGS6[PERCENTAGE_TURNOVER2].SUMMARY?.TITLE, `${business[PERCENTAGE_TURNOVER2]}%`),
    xlsx_row_default(String(FIELDS19[HAS_CREDIT_CONTROL3]), map_yes_no_field_default({ answer: business[HAS_CREDIT_CONTROL3] })),
  ];
  return mapped;
};
var map_exporter_business_default = mapExporterBusiness;

// generate-xlsx/map-application-to-XLSX/map-buyer/map-connection-with-buyer/index.ts
var { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER3, CONNECTION_WITH_BUYER_DESCRIPTION: CONNECTION_WITH_BUYER_DESCRIPTION3 } = your_buyer_default;
var { FIELDS: FIELDS20 } = XLSX;
var mapConnectionWithBuyer = (relationship2) => {
  if (relationship2[CONNECTION_WITH_BUYER3]) {
    return xlsx_row_default(String(FIELDS20[CONNECTION_WITH_BUYER_DESCRIPTION3]), relationship2[CONNECTION_WITH_BUYER_DESCRIPTION3]);
  }
};
var map_connection_with_buyer_default = mapConnectionWithBuyer;

// generate-xlsx/map-application-to-XLSX/map-buyer/map-outstanding-payments/index.ts
var {
  CURRENCY: { CURRENCY_CODE: CURRENCY_CODE5 },
  YOUR_BUYER: {
    OUTSTANDING_PAYMENTS: OUTSTANDING_PAYMENTS3,
    TOTAL_OUTSTANDING_PAYMENTS: TOTAL_OUTSTANDING_PAYMENTS3,
    TOTAL_AMOUNT_OVERDUE: TOTAL_AMOUNT_OVERDUE2,
  },
} = insurance_default;
var { FIELDS: FIELDS21 } = XLSX;
var mapOutstandingPayments = (tradingHistory) => {
  if (tradingHistory[OUTSTANDING_PAYMENTS3]) {
    const values = {
      currency: tradingHistory[CURRENCY_CODE5],
      totalOutstanding: format_currency_default(tradingHistory[TOTAL_OUTSTANDING_PAYMENTS3], tradingHistory[CURRENCY_CODE5]),
      totalAmountOverdue: format_currency_default(tradingHistory[TOTAL_AMOUNT_OVERDUE2], tradingHistory[CURRENCY_CODE5]),
    };
    const mapped = [
      xlsx_row_default(String(FIELDS21[TOTAL_OUTSTANDING_PAYMENTS3]), values.totalOutstanding),
      xlsx_row_default(String(YOUR_BUYER_FIELDS[CURRENCY_CODE5].SUMMARY?.TITLE), values.currency),
      xlsx_row_default(String(YOUR_BUYER_FIELDS[TOTAL_AMOUNT_OVERDUE2].SUMMARY?.TITLE), values.totalAmountOverdue),
    ];
    return mapped;
  }
  return [];
};
var map_outstanding_payments_default = mapOutstandingPayments;

// generate-xlsx/map-application-to-XLSX/map-buyer/map-buyer-trading-history/index.ts
var { FAILED_PAYMENTS: FAILED_PAYMENTS3, OUTSTANDING_PAYMENTS: OUTSTANDING_PAYMENTS4, TRADED_WITH_BUYER: TRADED_WITH_BUYER3 } = your_buyer_default;
var { FIELDS: FIELDS22 } = XLSX;
var mapBuyerTradingHistory = (tradingHistory) => {
  if (tradingHistory[TRADED_WITH_BUYER3]) {
    const mapped = [
      xlsx_row_default(String(FIELDS22[OUTSTANDING_PAYMENTS4]), map_yes_no_field_default({ answer: tradingHistory[OUTSTANDING_PAYMENTS4] })),
      ...map_outstanding_payments_default(tradingHistory),
      xlsx_row_default(String(FIELDS22[FAILED_PAYMENTS3]), map_yes_no_field_default({ answer: tradingHistory[FAILED_PAYMENTS3] })),
    ];
    return mapped;
  }
  return [];
};
var map_buyer_trading_history_default = mapBuyerTradingHistory;

// generate-xlsx/map-application-to-XLSX/map-buyer/map-previous-cover-with-buyer/index.ts
var {
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3,
} = your_buyer_default;
var { FIELDS: FIELDS23 } = XLSX;
var mapPreviousCoverWithBuyer = (application2) => {
  const {
    buyer: { relationship: relationship2 },
    totalContractValueOverThreshold,
  } = application2;
  if (totalContractValueOverThreshold) {
    const answer = relationship2[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3];
    const mapped = [xlsx_row_default(String(FIELDS23[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3]), map_yes_no_field_default({ answer }))];
    if (answer === true) {
      mapped.push(xlsx_row_default(String(FIELDS23[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3]), relationship2[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER3]));
    }
    return mapped;
  }
  return [];
};
var map_previous_cover_with_buyer_default = mapPreviousCoverWithBuyer;

// generate-xlsx/map-application-to-XLSX/map-buyer/index.ts
var CONTENT_STRINGS7 = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS,
};
var {
  COMPANY_OR_ORGANISATION: { NAME: NAME3, ADDRESS, COUNTRY: COUNTRY3, REGISTRATION_NUMBER, WEBSITE: WEBSITE4 },
  CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER4,
  HAS_BUYER_FINANCIAL_ACCOUNTS: HAS_BUYER_FINANCIAL_ACCOUNTS3,
  TRADED_WITH_BUYER: TRADED_WITH_BUYER4,
} = your_buyer_default;
var { FIELDS: FIELDS24 } = XLSX;
var mapBuyer = (application2) => {
  const { buyer } = application2;
  const { buyerTradingHistory, relationship: relationship2 } = buyer;
  const mapped = [
    xlsx_row_default(String(FIELDS24[NAME3]), buyer[NAME3]),
    xlsx_row_default(String(CONTENT_STRINGS7[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${xlsx_new_line_default}${buyer[COUNTRY3].name}`),
    xlsx_row_default(String(FIELDS24[REGISTRATION_NUMBER]), buyer[REGISTRATION_NUMBER]),
    xlsx_row_default(String(CONTENT_STRINGS7[WEBSITE4].SUMMARY?.TITLE), buyer[WEBSITE4]),
    xlsx_row_default(String(FIELDS24[CONNECTION_WITH_BUYER4]), map_yes_no_field_default({ answer: relationship2[CONNECTION_WITH_BUYER4] })),
    map_connection_with_buyer_default(relationship2),
    xlsx_row_default(String(FIELDS24[TRADED_WITH_BUYER4]), map_yes_no_field_default({ answer: buyerTradingHistory[TRADED_WITH_BUYER4] })),
    ...map_buyer_trading_history_default(buyerTradingHistory),
    ...map_previous_cover_with_buyer_default(application2),
    xlsx_row_default(String(FIELDS24[HAS_BUYER_FINANCIAL_ACCOUNTS3]), map_yes_no_field_default({ answer: relationship2[HAS_BUYER_FINANCIAL_ACCOUNTS3] })),
  ];
  return mapped;
};
var map_buyer_default = mapBuyer;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-how-was-the-contract-awarded/index.ts
var { OTHER: OTHER2 } = EXPORT_CONTRACT_AWARD_METHOD;
var CONTENT_STRINGS8 = EXPORT_CONTRACT_FIELDS.HOW_WAS_THE_CONTRACT_AWARDED;
var {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: AWARD_METHOD2, OTHER_AWARD_METHOD },
} = export_contract_default;
var mapHowWasTheContractAwarded = (exportContract) => {
  const submittedMethodId = exportContract.awardMethodId;
  let answer;
  if (submittedMethodId === OTHER2.DB_ID) {
    answer = exportContract[OTHER_AWARD_METHOD];
  } else {
    const allMethods = Object.values(EXPORT_CONTRACT_AWARD_METHOD);
    const method = allMethods.find((methodObj) => methodObj.DB_ID === submittedMethodId);
    if (method) {
      answer = method.VALUE;
    }
  }
  const title = `${String(CONTENT_STRINGS8[AWARD_METHOD2].SUMMARY?.TITLE)}?`;
  return xlsx_row_default(title, answer);
};
var map_how_was_the_contract_awarded_default = mapHowWasTheContractAwarded;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-final-destination/index.ts
var CONTENT_STRINGS9 = EXPORT_CONTRACT_FIELDS.ABOUT_GOODS_OR_SERVICES;
var { FIELDS: FIELDS25 } = XLSX;
var {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION: FINAL_DESTINATION2, FINAL_DESTINATION_KNOWN: FINAL_DESTINATION_KNOWN3 },
} = export_contract_default;
var mapFinalDestination = (exportContract, countries) => {
  const finalDestinationKnownAnswer = exportContract[FINAL_DESTINATION_KNOWN3];
  const mapped = [
    xlsx_row_default(String(FIELDS25.EXPORT_CONTRACT[FINAL_DESTINATION_KNOWN3]), map_yes_no_field_default({ answer: finalDestinationKnownAnswer })),
  ];
  if (finalDestinationKnownAnswer) {
    const country = get_country_by_iso_code_default(countries, exportContract[FINAL_DESTINATION2]);
    mapped.push(xlsx_row_default(String(CONTENT_STRINGS9[FINAL_DESTINATION2].SUMMARY?.TITLE), country.name));
  }
  return mapped;
};
var map_final_destination_default = mapFinalDestination;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-private-market/index.ts
var { FIELDS: FIELDS26 } = XLSX;
var {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION: DECLINED_DESCRIPTION3 },
} = export_contract_default;
var mapPrivateMarket = (application2) => {
  const {
    exportContract: { privateMarket },
    totalContractValueOverThreshold,
  } = application2;
  if (totalContractValueOverThreshold) {
    const attempedPrivateMarketAnswer = privateMarket[ATTEMPTED];
    const mapped = [xlsx_row_default(String(FIELDS26.EXPORT_CONTRACT[ATTEMPTED]), map_yes_no_field_default({ answer: attempedPrivateMarketAnswer }))];
    if (attempedPrivateMarketAnswer) {
      mapped.push(xlsx_row_default(String(FIELDS26.EXPORT_CONTRACT[DECLINED_DESCRIPTION3]), privateMarket[DECLINED_DESCRIPTION3]));
    }
    return mapped;
  }
  return [];
};
var map_private_market_default = mapPrivateMarket;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-agent/map-agent-charge/map-agent-charge-amount/index.ts
var { FIELDS: FIELDS27 } = XLSX;
var {
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT: FIXED_SUM_AMOUNT2,
    FIXED_SUM_CURRENCY_CODE,
    PAYABLE_COUNTRY_CODE: PAYABLE_COUNTRY_CODE2,
    PERCENTAGE_CHARGE: PERCENTAGE_CHARGE2,
  },
} = export_contract_default;
var mapAgentChargeAmount = (charge, countries) => {
  const country = get_country_by_iso_code_default(countries, charge[PAYABLE_COUNTRY_CODE2]);
  const payableCountryRow = xlsx_row_default(String(FIELDS27.AGENT_CHARGES[PAYABLE_COUNTRY_CODE2]), country.name);
  if (charge[FIXED_SUM_AMOUNT2]) {
    const currencyValue = format_currency_default2(Number(charge[FIXED_SUM_AMOUNT2]), charge[FIXED_SUM_CURRENCY_CODE]);
    const mapped = [xlsx_row_default(String(FIELDS27.AGENT_CHARGES[FIXED_SUM_AMOUNT2]), currencyValue), payableCountryRow];
    return mapped;
  }
  if (charge[PERCENTAGE_CHARGE2]) {
    const mapped = [xlsx_row_default(String(FIELDS27.AGENT_CHARGES[PERCENTAGE_CHARGE2]), `${charge[PERCENTAGE_CHARGE2]}%`), payableCountryRow];
    return mapped;
  }
  return [];
};
var map_agent_charge_amount_default = mapAgentChargeAmount;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-agent/map-agent-charge/index.ts
var { FIELDS: FIELDS28 } = XLSX;
var {
  AGENT_SERVICE: { IS_CHARGING: IS_CHARGING2 },
} = export_contract_default;
var mapAgentCharge = (service, countries) => {
  const { charge } = service;
  const chargingAnswer = service[IS_CHARGING2];
  let mapped = [xlsx_row_default(String(FIELDS28.AGENT_SERVICE[IS_CHARGING2]), map_yes_no_field_default({ answer: chargingAnswer }))];
  if (chargingAnswer) {
    mapped = [...mapped, ...map_agent_charge_amount_default(charge, countries)];
  }
  return mapped;
};
var map_agent_charge_default = mapAgentCharge;

// generate-xlsx/map-application-to-XLSX/map-export-contract/map-agent/index.ts
var { FIELDS: FIELDS29 } = XLSX;
var {
  AGENT_DETAILS: { NAME: NAME4, FULL_ADDRESS: FULL_ADDRESS5, COUNTRY_CODE: COUNTRY_CODE3 },
  AGENT_SERVICE: { SERVICE_DESCRIPTION: SERVICE_DESCRIPTION2 },
  USING_AGENT: USING_AGENT2,
} = export_contract_default;
var mapAgent = (agent, countries) => {
  const usingAgentAnswer = agent[USING_AGENT2];
  let mapped = [xlsx_row_default(String(FIELDS29.EXPORT_CONTRACT[USING_AGENT2]), map_yes_no_field_default({ answer: usingAgentAnswer }))];
  if (usingAgentAnswer) {
    const { service } = agent;
    const country = get_country_by_iso_code_default(countries, agent[COUNTRY_CODE3]);
    mapped = [
      ...mapped,
      xlsx_row_default(String(FIELDS29.AGENT[NAME4]), agent[NAME4]),
      xlsx_row_default(String(FIELDS29.AGENT[FULL_ADDRESS5]), agent[FULL_ADDRESS5]),
      xlsx_row_default(String(FIELDS29.AGENT[COUNTRY_CODE3]), country.name),
      xlsx_row_default(String(FIELDS29.AGENT_SERVICE[SERVICE_DESCRIPTION2]), service[SERVICE_DESCRIPTION2]),
      ...map_agent_charge_default(service, countries),
    ];
  }
  return mapped;
};
var map_agent_default = mapAgent;

// generate-xlsx/map-application-to-XLSX/map-export-contract/index.ts
var { FIELDS: FIELDS30 } = XLSX;
var {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION: DESCRIPTION3 },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: PAYMENT_TERMS_DESCRIPTION3 },
} = export_contract_default;
var mapExportContract = (application2, countries) => {
  const { exportContract } = application2;
  const { agent } = exportContract;
  const mapped = [
    xlsx_row_default(String(FIELDS30.EXPORT_CONTRACT[DESCRIPTION3]), exportContract[DESCRIPTION3]),
    map_how_was_the_contract_awarded_default(exportContract),
    ...map_final_destination_default(exportContract, countries),
    xlsx_row_default(String(FIELDS30.EXPORT_CONTRACT[PAYMENT_TERMS_DESCRIPTION3]), exportContract[PAYMENT_TERMS_DESCRIPTION3]),
    ...map_private_market_default(application2),
    ...map_agent_default(agent, countries),
  ];
  return mapped;
};
var map_export_contract_default = mapExportContract;

// generate-xlsx/map-application-to-XLSX/helpers/map-agreed-field/index.ts
var mapAgreedField = (answer) => {
  if (answer === true) {
    return XLSX.AGREED;
  }
  return DEFAULT.EMPTY;
};
var map_agreed_field_default = mapAgreedField;

// generate-xlsx/map-application-to-XLSX/map-declarations/map-modern-slavery-fields/map-cannot-adhere-conditional-reason/index.ts
var {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: WILL_ADHERE_TO_ALL_REQUIREMENTS3,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID },
  },
} = declarations_default;
var CONTENT_STRINGS10 = DECLARATIONS_FIELDS.MODERN_SLAVERY[WILL_ADHERE_TO_ALL_REQUIREMENTS3];
var mapCannotAdhereConditionalReason = (modernSlavery) => {
  if (modernSlavery[FIELD_ID]) {
    return xlsx_row_default(CONTENT_STRINGS10.CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[FIELD_ID]);
  }
};
var map_cannot_adhere_conditional_reason_default = mapCannotAdhereConditionalReason;

// generate-xlsx/map-application-to-XLSX/map-declarations/map-modern-slavery-fields/map-offenses-conditional-reason/index.ts
var {
  MODERN_SLAVERY: {
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: HAS_NO_OFFENSES_OR_INVESTIGATIONS3,
    CONDITIONAL_REASONS: { OFFENSES_OR_INVESTIGATIONS: FIELD_ID2 },
  },
} = declarations_default;
var CONTENT_STRINGS11 = DECLARATIONS_FIELDS.MODERN_SLAVERY[HAS_NO_OFFENSES_OR_INVESTIGATIONS3];
var mapOffensesConditionalReason = (modernSlavery) => {
  if (modernSlavery[FIELD_ID2]) {
    return xlsx_row_default(CONTENT_STRINGS11.CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[FIELD_ID2]);
  }
};
var map_offenses_conditional_reason_default = mapOffensesConditionalReason;

// generate-xlsx/map-application-to-XLSX/map-declarations/map-modern-slavery-fields/map-aware-of-conditional-reason/index.ts
var {
  MODERN_SLAVERY: {
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: IS_NOT_AWARE_OF_EXISTING_SLAVERY3,
    CONDITIONAL_REASONS: { AWARE_OF_EXISTING_SLAVERY: FIELD_ID3 },
  },
} = declarations_default;
var CONTENT_STRINGS12 = DECLARATIONS_FIELDS.MODERN_SLAVERY[IS_NOT_AWARE_OF_EXISTING_SLAVERY3];
var mapAwareOfConditionalReason = (modernSlavery) => {
  if (modernSlavery[FIELD_ID3]) {
    return xlsx_row_default(CONTENT_STRINGS12.CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[FIELD_ID3]);
  }
};
var map_aware_of_conditional_reason_default = mapAwareOfConditionalReason;

// generate-xlsx/map-application-to-XLSX/map-declarations/map-modern-slavery-fields/index.ts
var {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: WILL_ADHERE_TO_ALL_REQUIREMENTS4,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: HAS_NO_OFFENSES_OR_INVESTIGATIONS4,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: IS_NOT_AWARE_OF_EXISTING_SLAVERY4,
  },
} = declarations_default;
var CONTENT_STRINGS13 = DECLARATIONS_FIELDS.MODERN_SLAVERY;
var WILL_ADHERE_TO_ALL_REQUIREMENTS_STRINGS = CONTENT_STRINGS13[WILL_ADHERE_TO_ALL_REQUIREMENTS4];
var HAS_NO_OFFENSES_OR_INVESTIGATIONS_STRINGS = CONTENT_STRINGS13[HAS_NO_OFFENSES_OR_INVESTIGATIONS4];
var IS_NOT_AWARE_OF_EXISTING_SLAVERY_STRINGS = CONTENT_STRINGS13[IS_NOT_AWARE_OF_EXISTING_SLAVERY4];
var mapModernSlaveryFields = (modernSlavery) => {
  const mapped = [
    xlsx_row_default(
      WILL_ADHERE_TO_ALL_REQUIREMENTS_STRINGS.SUMMARY.TITLE,
      map_yes_no_field_default({ answer: modernSlavery[WILL_ADHERE_TO_ALL_REQUIREMENTS4] }),
    ),
    map_cannot_adhere_conditional_reason_default(modernSlavery),
    xlsx_row_default(
      HAS_NO_OFFENSES_OR_INVESTIGATIONS_STRINGS.SUMMARY.TITLE,
      map_yes_no_field_default({ answer: modernSlavery[HAS_NO_OFFENSES_OR_INVESTIGATIONS4] }),
    ),
    map_offenses_conditional_reason_default(modernSlavery),
    xlsx_row_default(
      IS_NOT_AWARE_OF_EXISTING_SLAVERY_STRINGS.SUMMARY.TITLE,
      map_yes_no_field_default({ answer: modernSlavery[IS_NOT_AWARE_OF_EXISTING_SLAVERY4] }),
    ),
    map_aware_of_conditional_reason_default(modernSlavery),
  ];
  return mapped;
};
var map_modern_slavery_fields_default = mapModernSlaveryFields;

// generate-xlsx/map-application-to-XLSX/map-declarations/index.ts
var { FIELDS: FIELDS31 } = XLSX;
var {
  DECLARATIONS: {
    AGREE_CONFIDENTIALITY: AGREE_CONFIDENTIALITY2,
    AGREE_ANTI_BRIBERY: AGREE_ANTI_BRIBERY2,
    HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: HAS_ANTI_BRIBERY_CODE_OF_CONDUCT3,
    WILL_EXPORT_WITH_CODE_OF_CONDUCT: WILL_EXPORT_WITH_CODE_OF_CONDUCT3,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS: AGREE_CONFIRMATION_ACKNOWLEDGEMENTS2,
  },
} = insurance_default;
var mapDeclarations = (application2) => {
  const { declaration } = application2;
  const mapped = [
    xlsx_row_default(DECLARATIONS_FIELDS[AGREE_CONFIDENTIALITY2].SUMMARY.TITLE, map_agreed_field_default(declaration[AGREE_CONFIDENTIALITY2])),
    xlsx_row_default(DECLARATIONS_FIELDS[AGREE_ANTI_BRIBERY2].SUMMARY.TITLE, map_agreed_field_default(declaration[AGREE_ANTI_BRIBERY2])),
    xlsx_row_default(String(FIELDS31[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT3]), map_yes_no_field_default({ answer: declaration[HAS_ANTI_BRIBERY_CODE_OF_CONDUCT3] })),
    xlsx_row_default(String(FIELDS31[WILL_EXPORT_WITH_CODE_OF_CONDUCT3]), map_yes_no_field_default({ answer: declaration[WILL_EXPORT_WITH_CODE_OF_CONDUCT3] })),
    ...map_modern_slavery_fields_default(declaration.modernSlavery),
    xlsx_row_default(
      DECLARATIONS_FIELDS[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS2].SUMMARY.TITLE,
      map_agreed_field_default(declaration[AGREE_CONFIRMATION_ACKNOWLEDGEMENTS2]),
    ),
  ];
  return mapped;
};
var map_declarations_default = mapDeclarations;

// generate-xlsx/map-application-to-XLSX/index.ts
var {
  APPLICATION_INFORMATION,
  ELIGIBILITY: ELIGIBILITY2,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS3,
  POLICY: POLICY4,
  BUYER,
  EXPORT_CONTRACT: EXPORT_CONTRACT2,
  DECLARATIONS: DECLARATIONS3,
} = SECTION_NAMES_default;
var mapApplicationToXLSX = (application2, countries) => {
  try {
    const mapped = {
      [APPLICATION_INFORMATION]: [
        ...map_introduction_default(application2),
        ...map_exporter_contact_details_default(application2),
        ...map_key_information_default(application2),
      ],
      [ELIGIBILITY2]: map_eligibility_default(application2),
      [EXPORTER_BUSINESS3]: map_exporter_business_default(application2),
      [POLICY4]: map_policy_default2(application2, countries),
      [BUYER]: map_buyer_default(application2),
      [EXPORT_CONTRACT2]: map_export_contract_default(application2, countries),
      [DECLARATIONS3]: map_declarations_default(application2),
    };
    return mapped;
  } catch (error) {
    console.error('Error mapping application to XLSX %o', error);
    throw new Error(`Mapping application to XLSX ${error}`);
  }
};
var map_application_to_XLSX_default = mapApplicationToXLSX;

// generate-xlsx/header-columns/index.ts
var { KEY: KEY2, VALUE: VALUE2, COLUMN_WIDTH } = XLSX_CONFIG;
var XLSX_HEADER_COLUMNS = (sheetName) => [
  { key: KEY2, header: sheetName, width: COLUMN_WIDTH },
  { key: VALUE2, width: COLUMN_WIDTH },
];
var header_columns_default = XLSX_HEADER_COLUMNS;

// constants/XLSX-CONFIG/INDEXES/EXPORTER_BUSINESS/index.ts
var DEFAULT_INDEXES = () => ({
  REGISTERED_OFFICE_ADDRESS: 3,
  COMPANY_SIC_CODES: 4,
  ALTERNATIVE_TRADING_ADDRESS: 0,
});
var EXPORTER_BUSINESS_INDEXES = (application2) => {
  const {
    company: {
      differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
      hasDifferentTradingName,
    },
  } = application2;
  const INDEXES = DEFAULT_INDEXES();
  if (hasDifferentTradingAddress) {
    INDEXES.ALTERNATIVE_TRADING_ADDRESS = 7;
    if (hasDifferentTradingName) {
      INDEXES.ALTERNATIVE_TRADING_ADDRESS += 1;
    }
  }
  return INDEXES;
};
var EXPORTER_BUSINESS_default = EXPORTER_BUSINESS_INDEXES;

// constants/XLSX-CONFIG/INDEXES/POLICY/BROKER_CONDITIONS/index.ts
var { USING_BROKER: USING_BROKER4 } = POLICY;
var BROKER_CONDITIONS = (application2, INDEXES) => {
  const {
    broker,
    policy: {
      jointlyInsuredParty: { requested: requestedJointlyInsuredParty },
      needPreCreditPeriodCover,
    },
    policyContact: { isSameAsOwner: policyContactIsSameAsOwner },
  } = application2;
  const MODIFIED_INDEXES = INDEXES;
  if (broker[USING_BROKER4]) {
    if (policyContactIsSameAsOwner === false) {
      MODIFIED_INDEXES.BROKER_ADDRESS += 2;
    }
    if (needPreCreditPeriodCover) {
      MODIFIED_INDEXES.BROKER_ADDRESS += 1;
    }
    if (requestedJointlyInsuredParty) {
      MODIFIED_INDEXES.BROKER_ADDRESS += 3;
    }
  }
  return MODIFIED_INDEXES;
};
var BROKER_CONDITIONS_default = BROKER_CONDITIONS;

// constants/XLSX-CONFIG/INDEXES/POLICY/LOSS_PAYEE_CONDITIONS/index.ts
var { USING_BROKER: USING_BROKER5 } = POLICY;
var LOSS_PAYEE_CONDITIONS = (application2, INDEXES) => {
  const {
    broker,
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy: {
      jointlyInsuredParty: { requested: requestedJointlyInsuredParty },
      needPreCreditPeriodCover,
    },
    policyContact: { isSameAsOwner: policyContactIsSameAsOwner },
  } = application2;
  const MODIFIED_INDEXES = INDEXES;
  if (nominatedLossPayeeAppointed) {
    if (policyContactIsSameAsOwner === false) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 2;
    }
    if (needPreCreditPeriodCover) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 1;
    }
    if (requestedJointlyInsuredParty) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }
    if (broker[USING_BROKER5]) {
      MODIFIED_INDEXES.LOSS_PAYEE_ADDRESS += 3;
    }
  }
  return INDEXES;
};
var LOSS_PAYEE_CONDITIONS_default = LOSS_PAYEE_CONDITIONS;

// constants/XLSX-CONFIG/INDEXES/POLICY/index.ts
var {
  TYPE_OF_POLICY: { POLICY_TYPE: POLICY_TYPE8 },
  USING_BROKER: USING_BROKER6,
  NAME_ON_POLICY: { IS_SAME_AS_OWNER: IS_SAME_AS_OWNER2 },
} = policy_default;
var DEFAULT_INDEXES2 = {
  BROKER_ADDRESS: 0,
  LOSS_PAYEE_ADDRESS: 0,
};
var POLICY_INDEXES = (application2) => {
  const {
    broker,
    nominatedLossPayee: { isAppointed: nominatedLossPayeeAppointed },
    policy,
    policyContact,
  } = application2;
  const isMultiplePolicy = isMultiplePolicyType(policy[POLICY_TYPE8]);
  let INDEXES = DEFAULT_INDEXES2;
  if (broker[USING_BROKER6]) {
    INDEXES.BROKER_ADDRESS = 14;
    if (isMultiplePolicy) {
      INDEXES.BROKER_ADDRESS += 1;
    }
  }
  if (nominatedLossPayeeAppointed) {
    INDEXES.LOSS_PAYEE_ADDRESS = 17;
    if (isMultiplePolicy) {
      INDEXES.LOSS_PAYEE_ADDRESS += 1;
    }
  }
  if (!policyContact[IS_SAME_AS_OWNER2]) {
    INDEXES.BROKER_ADDRESS += 1;
    INDEXES.LOSS_PAYEE_ADDRESS += 1;
  }
  INDEXES = {
    ...INDEXES,
    ...BROKER_CONDITIONS_default(application2, INDEXES),
    ...LOSS_PAYEE_CONDITIONS_default(application2, INDEXES),
  };
  return INDEXES;
};
var POLICY_default = POLICY_INDEXES;

// constants/XLSX-CONFIG/INDEXES/BUYER/index.ts
var BUYER_INDEXES = () => ({
  BUYER_ADDRESS: 3,
});
var BUYER_default = BUYER_INDEXES;

// constants/XLSX-CONFIG/INDEXES/EXPORT_CONTRACT/index.ts
var DEFAULT_INDEXES3 = () => ({
  AGENT_ADDRESS: 0,
});
var EXPORT_CONTRACT_INDEXES = (application2) => {
  const { exportContract } = application2;
  const { finalDestinationKnown, privateMarket } = exportContract;
  const INDEXES = DEFAULT_INDEXES3();
  if (exportContract.agent?.isUsingAgent) {
    INDEXES.AGENT_ADDRESS = 9;
    if (finalDestinationKnown) {
      INDEXES.AGENT_ADDRESS += 1;
    }
    if (privateMarket.attempted) {
      INDEXES.AGENT_ADDRESS += 1;
    }
  }
  return INDEXES;
};
var EXPORT_CONTRACT_default = EXPORT_CONTRACT_INDEXES;

// constants/XLSX-CONFIG/INDEXES/DECLARATIONS/index.ts
var {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = declarations_default;
var DEFAULT_INDEXES4 = () => ({
  CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 0,
  OFFENSES_OR_INVESTIGATIONS: 0,
  AWARE_OF_EXISTING_SLAVERY: 0,
});
var DECLARATIONS_INDEXES = (modernSlavery) => {
  const INDEXES = DEFAULT_INDEXES4();
  const cannotAdhereAnswer = modernSlavery[CANNOT_ADHERE_TO_ALL_REQUIREMENTS];
  const offensesInvestigationsAnswer = modernSlavery[OFFENSES_OR_INVESTIGATIONS];
  const awareOfAnswer = modernSlavery[AWARE_OF_EXISTING_SLAVERY];
  if (cannotAdhereAnswer) {
    INDEXES.CANNOT_ADHERE_TO_ALL_REQUIREMENTS = 7;
  }
  if (offensesInvestigationsAnswer) {
    INDEXES.OFFENSES_OR_INVESTIGATIONS = 8;
    if (cannotAdhereAnswer) {
      INDEXES.OFFENSES_OR_INVESTIGATIONS += 1;
    }
    if (awareOfAnswer) {
      INDEXES.OFFENSES_OR_INVESTIGATIONS += 1;
    }
  }
  if (awareOfAnswer) {
    INDEXES.AWARE_OF_EXISTING_SLAVERY = 9;
    if (cannotAdhereAnswer) {
      INDEXES.AWARE_OF_EXISTING_SLAVERY += 1;
    }
    if (offensesInvestigationsAnswer) {
      INDEXES.AWARE_OF_EXISTING_SLAVERY += 1;
    }
  }
  return INDEXES;
};
var DECLARATIONS_default = DECLARATIONS_INDEXES;

// constants/XLSX-CONFIG/INDEXES/index.ts
var {
  EXPORTER_BUSINESS: EXPORTER_BUSINESS4,
  POLICY: POLICY5,
  BUYER: BUYER2,
  EXPORT_CONTRACT: EXPORT_CONTRACT3,
  DECLARATIONS: DECLARATIONS4,
} = SECTION_NAMES_default;
var XLSX_ROW_INDEXES = {
  [EXPORTER_BUSINESS4]: (application2) => EXPORTER_BUSINESS_default(application2),
  [POLICY5]: (application2) => POLICY_default(application2),
  [BUYER2]: () => BUYER_default(),
  [EXPORT_CONTRACT3]: (application2) => EXPORT_CONTRACT_default(application2),
  [DECLARATIONS4]: (application2) => DECLARATIONS_default(application2.declaration.modernSlavery),
};
var INDEXES_default = XLSX_ROW_INDEXES;

// constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION/index.ts
var APPLICATION_INFORMATION_INDEXES = {
  EXPORTER_CONTACT_DETAILS: 8,
  KEY_INFORMATION: 13,
};
var APPLICATION_INFORMATION_default = APPLICATION_INFORMATION_INDEXES;

// generate-xlsx/styled-columns/is-title-row/index.ts
var { APPLICATION_INFORMATION: APPLICATION_INFORMATION2 } = SECTION_NAMES_default;
var { EXPORTER_CONTACT_DETAILS, KEY_INFORMATION } = APPLICATION_INFORMATION_default;
var isTitleRow = (sheetName, rowNumber) => {
  const isInfoSheet = sheetName === APPLICATION_INFORMATION2;
  const isInfoTitle = isInfoSheet && (rowNumber === EXPORTER_CONTACT_DETAILS || rowNumber === KEY_INFORMATION);
  const result = rowNumber === 1 || isInfoTitle;
  return result;
};
var is_title_row_default = isTitleRow;

// generate-xlsx/styled-columns/modify-row-styles/index.ts
var { FONT_SIZE } = XLSX_CONFIG;
var modifyRowStyles = (worksheet, sheetName) => {
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;
      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };
      const isATitleRow = is_title_row_default(sheetName, rowNumber);
      modifiedRow.getCell(colNumber).font = {
        bold: isATitleRow,
        size: isATitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });
  return worksheet;
};
var modify_row_styles_default = modifyRowStyles;

// generate-xlsx/styled-columns/modify-row-heights/index.ts
var { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT } = XLSX_CONFIG;
var { APPLICATION_INFORMATION: APPLICATION_INFORMATION3 } = SECTION_NAMES_default;
var { EXPORTER_CONTACT_DETAILS: EXPORTER_CONTACT_DETAILS2, KEY_INFORMATION: KEY_INFORMATION2 } = APPLICATION_INFORMATION_default;
var modifyRowHeights = (rowIndexes, worksheet, sheetName) => {
  const modifiedWorksheet = worksheet;
  modifiedWorksheet.getRow(1).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  if (sheetName === APPLICATION_INFORMATION3) {
    modifiedWorksheet.getRow(EXPORTER_CONTACT_DETAILS2).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
    modifiedWorksheet.getRow(KEY_INFORMATION2).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  }
  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });
  return modifiedWorksheet;
};
var modify_row_heights_default = modifyRowHeights;

// generate-xlsx/styled-columns/index.ts
var getAdditionalRowHeightIndexes = (application2, sheetName) => {
  let INDEXES = [];
  if (INDEXES_default[sheetName]) {
    const sheetIndexes = INDEXES_default[sheetName](application2);
    INDEXES = Object.values(sheetIndexes);
  }
  return INDEXES;
};
var styledColumns = (application2, worksheet, sheetName) => {
  const withRowStyles = modify_row_styles_default(worksheet, sheetName);
  const indexes = getAdditionalRowHeightIndexes(application2, sheetName);
  const withRowHeights = modify_row_heights_default(indexes, withRowStyles, sheetName);
  return withRowHeights;
};
var styled_columns_default = styledColumns;

// generate-xlsx/index.ts
import_dotenv9.default.config();
var { EXCELJS_PROTECTION_PASSWORD } = process.env;
var XLSX2 = (application2, countries) => {
  try {
    console.info('Generating XLSX file for application %s', application2.id);
    const { referenceNumber } = application2;
    const refNumber = String(referenceNumber);
    return new Promise((resolve) => {
      const filePath = `XLSX/${refNumber}.xlsx`;
      const xlsxData = map_application_to_XLSX_default(application2, countries);
      console.info('Generating XLSX file - creating a new workbook');
      const workbook = new import_exceljs.default.Workbook();
      console.info('Generating XLSX file - adding worksheets to workbook');
      const sheetNames = Object.values(SECTION_NAMES_default);
      sheetNames.forEach((sheetName) => {
        console.info('Generating XLSX file - adding %s worksheet', sheetName);
        let worksheet = workbook.addWorksheet(sheetName);
        console.info('Generating XLSX file - protecting %s worksheet from modification', sheetName);
        worksheet.protect(String(EXCELJS_PROTECTION_PASSWORD), {});
        console.info('Generating XLSX file - adding %s worksheet header columns', sheetName);
        worksheet.columns = header_columns_default(sheetName);
        xlsxData[sheetName].forEach((row) => {
          console.info('Generating XLSX file - adding rows to %s worksheeet', sheetName);
          if (row) {
            worksheet.addRow(row);
          }
        });
        console.info('Generating XLSX file - adding custom styles to %s worksheet', sheetName);
        worksheet = styled_columns_default(application2, worksheet, sheetName);
      });
      console.info('Generating XLSX file - writing file');
      workbook.xlsx.writeFile(filePath).then(() => resolve(filePath));
    });
  } catch (error) {
    console.error('Error generating XLSX file %o', error);
    throw new Error(`Generating XLSX file ${error}`);
  }
};
var generate2 = {
  XLSX: XLSX2,
};
var generate_xlsx_default = generate2;

// custom-resolvers/mutations/submit-application/index.ts
var submitApplication = async (root, variables, context) => {
  try {
    console.info('Submitting application %s', variables.applicationId);
    const application2 = await context.db.Application.findOne({
      where: { id: variables.applicationId },
    });
    if (application2) {
      const { status, submissionDeadline, submissionCount } = application2;
      const isInProgress = status === APPLICATION.STATUS.IN_PROGRESS;
      const now2 = /* @__PURE__ */ new Date();
      const validSubmissionDate = (0, import_date_fns6.isAfter)(new Date(submissionDeadline), now2);
      const isFirstSubmission = submissionCount === 0;
      const canSubmit = isInProgress && validSubmissionDate && isFirstSubmission;
      if (canSubmit) {
        console.info('Submitting application - updating status, submission date and count %s', variables.applicationId);
        const update2 = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.IN_PROGRESS,
          submissionDate: now2,
          submissionCount: submissionCount + 1,
        };
        const updatedApplication = await context.db.Application.updateOne({
          where: { id: application2.id },
          data: update2,
        });
        console.info('Submitting application - getting populated application %s', variables.applicationId);
        const populatedApplication2 = await get_populated_application_default.get({
          context,
          application: updatedApplication,
          decryptFinancialUk: true,
          decryptFinancialInternational: true,
        });
        const countries = await get_countries_default(context);
        const xlsxPath = await generate_xlsx_default.XLSX(populatedApplication2, countries);
        await send_application_submitted_emails_default.send(populatedApplication2, xlsxPath);
        return {
          success: true,
        };
      }
      console.error('Unable to submit application - application already submitted');
    }
    console.error('Unable to submit application - no application found');
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error submitting application %o', error);
    throw new Error(`Submitting application ${error}`);
  }
};
var submit_application_default = submitApplication;

// custom-resolvers/mutations/create-feedback/index.ts
var createFeedback = async (root, variables, context) => {
  console.info('Creating feedback');
  try {
    const feedback = {
      ...variables,
      createdAt: /* @__PURE__ */ new Date(),
    };
    const response = await context.db.Feedback.createOne({
      data: feedback,
    });
    const emailResponse = await emails_default.insuranceFeedbackEmail(feedback);
    if (response && emailResponse?.success) {
      return {
        ...response,
        success: true,
      };
    }
    return { success: false };
  } catch (error) {
    console.error('Error creating feedback %o', error);
    throw new Error(`Creating feedback: ${error}`);
  }
};
var create_feedback_default = createFeedback;

// custom-resolvers/mutations/verify-account-reactivation-token/index.ts
var import_date_fns7 = require('date-fns');
var {
  INSURANCE: {
    ACCOUNT: { REACTIVATION_HASH, REACTIVATION_EXPIRY },
  },
} = FIELD_IDS;
var verifyAccountReactivationToken = async (root, variables, context) => {
  try {
    console.info('Received a request to reactivate account - checking account');
    const account2 = await get_account_by_field_default(context, REACTIVATION_HASH, variables.token);
    if (account2) {
      console.info('Received a request to reactivate account - found account %s', account2.id);
      const now2 = /* @__PURE__ */ new Date();
      const canReactivateAccount = (0, import_date_fns7.isBefore)(now2, account2[REACTIVATION_EXPIRY]);
      if (!canReactivateAccount) {
        console.info('Unable to reactivate account - reactivation period has expired');
        return {
          expired: true,
          success: false,
          accountId: account2.id,
        };
      }
      console.info('Reactivating account %s', account2.id);
      const accountUpdate = {
        reactivationHash: '',
        reactivationExpiry: null,
      };
      const statusUpdate = {
        isBlocked: false,
        isVerified: true,
      };
      await update_account_default.account(context, account2.id, accountUpdate);
      await update_account_default.accountStatus(context, account2.status.id, statusUpdate);
      await delete_authentication_retries_default(context, account2.id);
      return {
        success: true,
      };
    }
    console.info('Unable to reactivate account - no account found from the provided %s', REACTIVATION_HASH);
    return {
      success: false,
      invalid: true,
    };
  } catch (error) {
    console.error('Error checking account and reactivating account(verifyAccountReactivationToken mutation) %o', error);
    throw new Error(`Checking account and reactivating account(verifyAccountReactivationToken mutation) ${error}`);
  }
};
var verify_account_reactivation_token_default = verifyAccountReactivationToken;

// helpers/encrypt/index.ts
var import_crypto12 = __toESM(require('crypto'));

// helpers/encrypt/generate-initialisation-vector/index.ts
var import_crypto11 = __toESM(require('crypto'));
var { BYTES_SIZE, ENCODING: ENCODING3, SLICE_INDEX_START, SLICE_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.IV;
var generateInitialisationVector = () => import_crypto11.default.randomBytes(BYTES_SIZE).toString(ENCODING3).slice(SLICE_INDEX_START, SLICE_INDEX_END);
var generate_initialisation_vector_default = generateInitialisationVector;

// helpers/encrypt/index.ts
var {
  ENCRYPTION_METHOD: ENCRYPTION_METHOD2,
  ENCODING: ENCODING4,
  STRING_ENCODING: STRING_ENCODING3,
  OUTPUT_ENCODING: OUTPUT_ENCODING3,
} = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;
var encrypt = (dataToEncrypt) => {
  try {
    console.info('Encrypting data');
    const key2 = generate_key_default();
    const iv = generate_initialisation_vector_default();
    const cipher = import_crypto12.default.createCipheriv(ENCRYPTION_METHOD2, key2, iv);
    const value = Buffer.from(cipher.update(dataToEncrypt, OUTPUT_ENCODING3, ENCODING4).concat(cipher.final(ENCODING4))).toString(STRING_ENCODING3);
    return {
      value,
      iv,
    };
  } catch (error) {
    console.error('Error encrypting data %o', error);
    throw new Error(`Error encrypting data ${error}`);
  }
};
var encrypt_default = encrypt;

// helpers/map-loss-payee-financial-details-uk/index.ts
var mapLossPayeeFinancialDetailsUk2 = (variables) => {
  try {
    console.info('Mapping loss payee financial UK');
    const { accountNumber, sortCode, bankAddress } = variables;
    let accountNumberData = DEFAULT_ENCRYPTION_SAVE_OBJECT;
    let sortCodeData = DEFAULT_ENCRYPTION_SAVE_OBJECT;
    if (accountNumber) {
      accountNumberData = encrypt_default(accountNumber);
    }
    if (sortCode) {
      sortCodeData = encrypt_default(sortCode);
    }
    const updateData = {
      uk: {
        accountNumber: accountNumberData.value,
        sortCode: sortCodeData.value,
        bankAddress,
      },
      vectors: {
        accountNumberVector: accountNumberData.iv,
        sortCodeVector: sortCodeData.iv,
      },
    };
    return updateData;
  } catch (error) {
    console.error('Error mapping loss payee financial UK %o', error);
    throw new Error(`Error mapping loss payee financial UK ${error}`);
  }
};
var map_loss_payee_financial_details_uk_default = mapLossPayeeFinancialDetailsUk2;

// helpers/update-loss-payee-financial-uk/index.ts
var updateLossPayeeFinancialInternationalUk = async (context, id, data) => {
  try {
    console.info('Updating loss payee financial uk (helper) %s', id);
    const updated = await context.db.LossPayeeFinancialUk.updateOne({
      where: {
        id,
      },
      data,
    });
    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial uk (helper) %o', error);
    throw new Error(`Updating loss payee financial uk (helper) ${error}`);
  }
};
var update_loss_payee_financial_uk_default = updateLossPayeeFinancialInternationalUk;

// helpers/update-loss-payee-financial-uk-vector/index.ts
var updateLossPayeeFinancialUkVector = async (context, id, data) => {
  try {
    console.info('Updating loss payee financial uk vector (helper) %s', id);
    const updated = await context.db.LossPayeeFinancialUkVector.updateOne({
      where: {
        id,
      },
      data,
    });
    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial uk vector (helper) %o', error);
    throw new Error(`Updating loss payee financial uk vector (helper) ${error}`);
  }
};
var update_loss_payee_financial_uk_vector_default = updateLossPayeeFinancialUkVector;

// custom-resolvers/mutations/update-loss-payee-financial-details-uk/index.ts
var updateLossPayeeFinancialDetailsUk = async (root, variables, context) => {
  try {
    console.info('Updating loss payee financial UK %s', variables.id);
    const { id } = variables;
    const mappedData = map_loss_payee_financial_details_uk_default(variables);
    const uk = await update_loss_payee_financial_uk_default(context, id, mappedData.uk);
    const vector = await update_loss_payee_financial_uk_vector_default(context, String(uk.vectorId), mappedData.vectors);
    if (uk && vector) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error updating loss payee financial UK %o', error);
    throw new Error(`Updating loss payee financial UK ${error}`);
  }
};
var update_loss_payee_financial_details_uk_default = updateLossPayeeFinancialDetailsUk;

// helpers/map-loss-payee-financial-details-international/index.ts
var mapLossPayeeFinancialDetailsInternational2 = (variables) => {
  try {
    const { iban, bicSwiftCode, bankAddress } = variables;
    let ibanData = DEFAULT_ENCRYPTION_SAVE_OBJECT;
    let bicSwiftCodeData = DEFAULT_ENCRYPTION_SAVE_OBJECT;
    if (iban) {
      ibanData = encrypt_default(iban);
    }
    if (bicSwiftCode) {
      bicSwiftCodeData = encrypt_default(bicSwiftCode);
    }
    const updateData = {
      international: {
        iban: ibanData.value,
        bicSwiftCode: bicSwiftCodeData.value,
        bankAddress,
      },
      vectors: {
        ibanVector: ibanData.iv,
        bicSwiftCodeVector: bicSwiftCodeData.iv,
      },
    };
    return updateData;
  } catch (error) {
    console.error('Error mapping loss payee financial international %o', error);
    throw new Error(`Error mapping loss payee financial international ${error}`);
  }
};
var map_loss_payee_financial_details_international_default = mapLossPayeeFinancialDetailsInternational2;

// helpers/update-loss-payee-financial-international/index.ts
var updateLossPayeeFinancialInternational = async (context, id, data) => {
  try {
    console.info('Updating loss payee financial international (helper) %s', id);
    const updated = await context.db.LossPayeeFinancialInternational.updateOne({
      where: {
        id,
      },
      data,
    });
    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial international (helper) %o', error);
    throw new Error(`Updating loss payee financial international (helper) ${error}`);
  }
};
var update_loss_payee_financial_international_default = updateLossPayeeFinancialInternational;

// helpers/update-loss-payee-financial-international-vector/index.ts
var updateLossPayeeFinancialInternationalVector = async (context, id, data) => {
  try {
    console.info('Updating loss payee financial international vector (helper) %s', id);
    const updated = await context.db.LossPayeeFinancialInternationalVector.updateOne({
      where: {
        id,
      },
      data,
    });
    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial international vector (helper) %o', error);
    throw new Error(`Updating loss payee financial international vector (helper) ${error}`);
  }
};
var update_loss_payee_financial_international_vector_default = updateLossPayeeFinancialInternationalVector;

// custom-resolvers/mutations/update-loss-payee-financial-details-international/index.ts
var updateLossPayeeFinancialDetailsInternational = async (root, variables, context) => {
  try {
    console.info('Updating loss payee financial international %s', variables.id);
    const { id } = variables;
    const mappedData = map_loss_payee_financial_details_international_default(variables);
    const international = await update_loss_payee_financial_international_default(context, id, mappedData.international);
    const vector = await update_loss_payee_financial_international_vector_default(context, String(international.vectorId), mappedData.vectors);
    if (international && vector) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error updating loss payee financial international %o', error);
    throw new Error(`Updating loss payee financial international ${error}`);
  }
};
var update_loss_payee_financial_details_international_default = updateLossPayeeFinancialDetailsInternational;

// custom-resolvers/queries/get-account-password-reset-token/index.ts
var getAccountPasswordResetToken = async (root, variables, context) => {
  console.info('Getting account password reset token');
  try {
    const { email } = variables;
    const account2 = await get_account_by_field_default(context, account_default.EMAIL, email);
    if (!account2) {
      console.info('Unable to get account password reset token - account does not exist');
      return { success: false };
    }
    if (account2.passwordResetHash) {
      return {
        success: true,
        token: account2.passwordResetHash,
      };
    }
    console.info('Unable to get account password reset token - reset hash does not exist');
    return { success: false };
  } catch (error) {
    console.error('Error getting account password reset token %o', error);
    throw new Error(`Getting account password reset token ${error}`);
  }
};
var get_account_password_reset_token_default = getAccountPasswordResetToken;

// helpers/filter-cis-entries/index.ts
var filterCisEntries = (arr, invalidEntries, entityPropertyName) => {
  const filtered = arr.filter((obj) => !invalidEntries.includes(obj[entityPropertyName]));
  return filtered;
};
var filter_cis_entries_default = filterCisEntries;

// helpers/map-CIS-countries/map-CIS-country/map-esra-classification/index.ts
var {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;
var mapEsraClassification = (classification) => {
  if (classification === ESRA_CLASSIFICATION.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.STANDARD;
  }
  if (classification === ESRA_CLASSIFICATION.HIGH) {
    return classification;
  }
  if (classification === ESRA_CLASSIFICATION.VERY_HIGH) {
    return classification;
  }
  return null;
};
var map_esra_classification_default = mapEsraClassification;

// helpers/map-CIS-countries/map-CIS-country/country-rating-is-a-or-b/index.ts
var {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;
var countryRatingIsAorB = (rating) => {
  if (COUNTRY_RATINGS.A.includes(rating)) {
    return true;
  }
  if (COUNTRY_RATINGS.B.includes(rating)) {
    return true;
  }
  return false;
};
var country_rating_is_a_or_b_default = countryRatingIsAorB;

// helpers/map-CIS-countries/map-CIS-country/country-rating-is-c-or-d/index.ts
var {
  CIS: { COUNTRY_RATINGS: COUNTRY_RATINGS2 },
} = EXTERNAL_API_DEFINITIONS;
var countryRatingIsCorD = (rating) => {
  if (COUNTRY_RATINGS2.C.includes(rating)) {
    return true;
  }
  if (COUNTRY_RATINGS2.D.includes(rating)) {
    return true;
  }
  return false;
};
var country_rating_is_c_or_d_default = countryRatingIsCorD;

// helpers/map-CIS-countries/map-CIS-country/esra-classification-is-standard-high-or-very-high/index.ts
var {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;
var esraClassificationIsStandardHighOrVeryHigh = (esraClassification) => {
  switch (esraClassification) {
    case STANDARD:
      return true;
    case HIGH:
      return true;
    case VERY_HIGH:
      return true;
    default:
      return false;
  }
};
var esra_classification_is_standard_high_or_very_high_default = esraClassificationIsStandardHighOrVeryHigh;

// helpers/map-CIS-countries/map-CIS-country/has-no-support/index.ts
var {
  CIS: {
    COUNTRY_RATINGS: { NOT_APPLICABLE },
    ESRA_CLASSIFICATION: { NONE },
    SHORT_TERM_COVER: { UNLISTED, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;
var hasNoSupport = ({ countryRating, esraClassification, shortTermCover }) => {
  const shortTermCoverIsUnlisted = shortTermCover === UNLISTED;
  const esraClassificationIsNone = esraClassification === NONE;
  const countryRatingIsNotApplicable = countryRating === NOT_APPLICABLE;
  const countryRatingConditions =
    country_rating_is_a_or_b_default(countryRating) || country_rating_is_c_or_d_default(countryRating) || countryRatingIsNotApplicable;
  if (shortTermCoverIsUnlisted && esraClassificationIsNone && countryRatingConditions) {
    return true;
  }
  const esraClassificationConditions = esra_classification_is_standard_high_or_very_high_default(esraClassification) || esraClassificationIsNone;
  if (shortTermCover === CILC && countryRatingIsNotApplicable && esraClassificationConditions) {
    return true;
  }
  return false;
};
var has_no_support_default = hasNoSupport;

// helpers/map-CIS-countries/map-CIS-country/has-no-online-support/a-and-b-rating-conditions/index.ts
var {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD: STANDARD2, HIGH: HIGH2, VERY_HIGH: VERY_HIGH2, NONE: NONE2 },
    SHORT_TERM_COVER: { NO: NO2, ILC, CILC: CILC2 },
  },
} = EXTERNAL_API_DEFINITIONS;
var aAndBRatingConditions = ({ countryRating, esraClassification, shortTermCover }) => {
  if (!country_rating_is_a_or_b_default(countryRating)) {
    return false;
  }
  if (esraClassification === STANDARD2 || esraClassification === HIGH2 || esraClassification === VERY_HIGH2) {
    if (shortTermCover === ILC) {
      return true;
    }
    if (shortTermCover === CILC2) {
      return true;
    }
    if (shortTermCover === NO2) {
      return true;
    }
  }
  if (esraClassification === NONE2 && shortTermCover === NO2) {
    return true;
  }
  return false;
};
var a_and_b_rating_conditions_default = aAndBRatingConditions;

// helpers/map-CIS-countries/map-CIS-country/has-no-online-support/c-and-d-rating-conditions/index.ts
var {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD: STANDARD3, HIGH: HIGH3, VERY_HIGH: VERY_HIGH3, NONE: NONE3 },
    SHORT_TERM_COVER: { YES: YES2, NO: NO3, ILC: ILC2, CILC: CILC3, REFER, UNLISTED: UNLISTED2 },
  },
} = EXTERNAL_API_DEFINITIONS;
var cAndDRatingConditions = ({ countryRating, esraClassification, shortTermCover }) => {
  if (!country_rating_is_c_or_d_default(countryRating)) {
    return false;
  }
  if (esraClassification === STANDARD3 || esraClassification === HIGH3 || esraClassification === VERY_HIGH3) {
    if (shortTermCover === YES2) {
      return true;
    }
    if (shortTermCover === ILC2) {
      return true;
    }
    if (shortTermCover === CILC3) {
      return true;
    }
    if (shortTermCover === REFER) {
      return true;
    }
    if (shortTermCover === UNLISTED2) {
      return true;
    }
    if (shortTermCover === NO3) {
      return true;
    }
  }
  if (esraClassification === NONE3 && shortTermCover === NO3) {
    return true;
  }
  return false;
};
var c_and_d_rating_conditions_default = cAndDRatingConditions;

// helpers/map-CIS-countries/map-CIS-country/has-no-online-support/index.ts
var hasNoOnlineSupport = ({ countryRating, esraClassification, shortTermCover }) => {
  const aAndBConditions = a_and_b_rating_conditions_default({
    countryRating,
    esraClassification,
    shortTermCover,
  });
  const cAndDConditions = c_and_d_rating_conditions_default({
    countryRating,
    esraClassification,
    shortTermCover,
  });
  const conditions = aAndBConditions || cAndDConditions;
  return conditions;
};
var has_no_online_support_default = hasNoOnlineSupport;

// helpers/map-CIS-countries/map-CIS-country/short-term-cover-is-yes-refer-or-unlisted/index.ts
var {
  CIS: {
    SHORT_TERM_COVER: { YES: YES3, REFER: REFER2, UNLISTED: UNLISTED3 },
  },
} = EXTERNAL_API_DEFINITIONS;
var shortTermCoverIsYesReferOrUnlisted = (shortTermCover) => {
  switch (shortTermCover) {
    case YES3:
      return true;
    case REFER2:
      return true;
    case UNLISTED3:
      return true;
    default:
      return false;
  }
};
var short_term_cover_is_yes_refer_or_unlisted_default = shortTermCoverIsYesReferOrUnlisted;

// helpers/map-CIS-countries/map-CIS-country/can-get-a-quote-online/index.ts
var canGetAQuoteOnline = (cisCountry) => {
  const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, countryRatingDesc } = cisCountry;
  const conditions =
    esra_classification_is_standard_high_or_very_high_default(ESRAClassificationDesc) &&
    short_term_cover_is_yes_refer_or_unlisted_default(shortTermCoverAvailabilityDesc) &&
    country_rating_is_a_or_b_default(countryRatingDesc);
  return conditions;
};
var can_get_a_quote_online_default = canGetAQuoteOnline;

// helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online/index.ts
var canApplyForInsuranceOnline = (cisCountry) => {
  const { ESRAClassificationDesc, shortTermCoverAvailabilityDesc, countryRatingDesc } = cisCountry;
  const conditions =
    esra_classification_is_standard_high_or_very_high_default(ESRAClassificationDesc) &&
    short_term_cover_is_yes_refer_or_unlisted_default(shortTermCoverAvailabilityDesc) &&
    country_rating_is_a_or_b_default(countryRatingDesc);
  return conditions;
};
var can_apply_for_insurance_online_default = canApplyForInsuranceOnline;

// helpers/map-CIS-countries/map-CIS-country/is-high-risk-country/index.ts
var {
  CIS: {
    ESRA_CLASSIFICATION: { HIGH: HIGH4 },
  },
} = EXTERNAL_API_DEFINITIONS;
var isHighRiskCountry = (riskClassification) => riskClassification === HIGH4;
var is_high_risk_country_default = isHighRiskCountry;

// helpers/map-CIS-countries/map-CIS-country/index.ts
var mapCisCountry = (cisCountry) => {
  const { countryRatingDesc: countryRating, ESRAClassificationDesc, isoCode, marketName, shortTermCoverAvailabilityDesc: shortTermCover } = cisCountry;
  const esraClassification = map_esra_classification_default(cisCountry.ESRAClassificationDesc);
  const noSupport = has_no_support_default({
    countryRating,
    esraClassification: ESRAClassificationDesc,
    shortTermCover,
  });
  const mapped = {
    countryRating,
    esraClassification,
    isoCode,
    name: marketName,
    noOnlineSupport: has_no_online_support_default({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover,
    }),
    canGetAQuoteOnline: can_get_a_quote_online_default(cisCountry),
    cannotGetAQuote: noSupport,
    canApplyForInsuranceOnline: can_apply_for_insurance_online_default(cisCountry),
    noInsuranceSupport: noSupport,
    isHighRisk: is_high_risk_country_default(esraClassification),
  };
  return mapped;
};
var map_CIS_country_default = mapCisCountry;

// helpers/sort-array-alphabetically/index.ts
var sortArrayAlphabetically = (arr, field) => {
  const alphabetical = arr.sort((a, b) => a[field].localeCompare(b[field]));
  return alphabetical;
};
var sort_array_alphabetically_default = sortArrayAlphabetically;

// helpers/map-CIS-countries/index.ts
var { CIS } = EXTERNAL_API_DEFINITIONS;
var mapCisCountries = (countries) => {
  const filteredCountries = filter_cis_entries_default(countries, CIS.INVALID_COUNTRIES, 'marketName');
  const mapped = filteredCountries.map((country) => map_CIS_country_default(country));
  const sorted = sort_array_alphabetically_default(mapped, 'name');
  return sorted;
};
var map_CIS_countries_default = mapCisCountries;

// helpers/get-APIM-CIS-countries/index.ts
var get3 = async () => {
  try {
    console.info('Getting and mapping CIS countries from APIM (apimCisCountries helper)');
    const response = await APIM_default.getCisCountries();
    if (response.data) {
      const mapped = map_CIS_countries_default(response.data);
      return {
        success: true,
        countries: mapped,
      };
    }
    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping CIS countries from APIM (apimCisCountries helper) %o', error);
    throw new Error(`Getting and mapping CIS countries from APIM (apimCisCountries helper) ${error}`);
  }
};
var apimCisCountries = {
  get: get3,
};
var get_APIM_CIS_countries_default = apimCisCountries;

// custom-resolvers/queries/get-APIM-CIS-countries/index.ts
var getApimCisCountriesQuery = async () => {
  try {
    console.info('Getting CIS countries from APIM');
    const response = await get_APIM_CIS_countries_default.get();
    if (response.success) {
      return response.countries;
    }
    return [];
  } catch (error) {
    console.error('Error Getting CIS countries from APIM %o', error);
    throw new Error(`Getting CIS countries from APIM ${error}`);
  }
};
var get_APIM_CIS_countries_default2 = getApimCisCountriesQuery;

// helpers/map-currencies/index.ts
var { CIS: CIS2 } = EXTERNAL_API_DEFINITIONS;
var getSupportedCurrencies = (currencies) => {
  const supported = currencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode) => currency.isoCode === currencyCode));
  return supported;
};
var getAlternativeCurrencies = (currencies) => {
  const alternate = currencies.filter((currency) => !SUPPORTED_CURRENCIES.includes(currency.isoCode));
  return alternate;
};
var mapCurrencies = (currencies, alternativeCurrencies) => {
  let currenciesArray = filter_cis_entries_default(currencies, CIS2.INVALID_CURRENCIES, 'name');
  if (!alternativeCurrencies) {
    currenciesArray = getSupportedCurrencies(currenciesArray);
  } else {
    currenciesArray = getAlternativeCurrencies(currenciesArray);
  }
  const sorted = sort_array_alphabetically_default(currenciesArray, FIELD_IDS.NAME);
  return sorted;
};
var map_currencies_default = mapCurrencies;

// helpers/get-APIM-currencies/index.ts
var get4 = async () => {
  try {
    console.info('Getting and mapping currencies from APIM (apimCurrencies helper)');
    const response = await APIM_default.getCurrencies();
    if (response.data) {
      const supportedCurrencies = map_currencies_default(response.data, false);
      const alternativeCurrencies = map_currencies_default(response.data, true);
      const allCurrencies = [...supportedCurrencies, ...alternativeCurrencies];
      return {
        success: true,
        supportedCurrencies,
        alternativeCurrencies,
        allCurrencies,
      };
    }
    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM (apimCurrencies helper) %o', error);
    throw new Error(`Getting and mapping currencies from APIM (apimCurrencies helper) ${error}`);
  }
};
var apimCurrencies = {
  get: get4,
};
var get_APIM_currencies_default = apimCurrencies;

// custom-resolvers/queries/get-APIM-currencies/index.ts
var getApimCurrenciesQuery = async () => {
  try {
    console.info('Getting and mapping currencies from APIM');
    const response = await get_APIM_currencies_default.get();
    if (response.success) {
      return response;
    }
    return {};
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM %o', error);
    throw new Error(`Getting and mapping currencies from APIM ${error}`);
  }
};
var get_APIM_currencies_default2 = getApimCurrenciesQuery;

// custom-resolvers/queries/get-countries-and-currencies/index.ts
var getCountriesAndCurrencies = async (root, variables, context) => {
  try {
    console.info('Getting countries and currencies (getCountriesAndCurrencies resolver)');
    const [countries, currenciesResponse] = await Promise.all([await get_countries_default(context), await get_APIM_currencies_default.get()]);
    if (!currenciesResponse.success) {
      throw new Error('Getting currencies (getCountriesAndCurrencies resolver)');
    }
    const { allCurrencies, alternativeCurrencies, supportedCurrencies } = currenciesResponse;
    return {
      countries,
      allCurrencies,
      alternativeCurrencies,
      supportedCurrencies,
    };
  } catch (error) {
    console.error('Error getting countries and currencies (getCountriesAndCurrencies resolver) %o', error);
    throw new Error(`Getting countries and currencies (getCountriesAndCurrencies resolver) ${error}`);
  }
};
var get_countries_and_currencies_default = getCountriesAndCurrencies;

// helpers/remove-white-space/index.ts
var removeWhiteSpace = (string) => string.replace(' ', '');
var remove_white_space_default = removeWhiteSpace;

// helpers/sanitise-companies-house-number/index.ts
var sanitiseCompaniesHouseNumber = (companyNumber) => remove_white_space_default(companyNumber).toUpperCase().padStart(8, '0');
var sanitise_companies_house_number_default = sanitiseCompaniesHouseNumber;

// integrations/companies-house/index.ts
var import_axios2 = __toESM(require('axios'));
var import_dotenv10 = __toESM(require('dotenv'));
import_dotenv10.default.config();
var username = String(process.env.COMPANIES_HOUSE_API_KEY);
var companiesHouseURL = String(process.env.COMPANIES_HOUSE_API_URL);
var companiesHouse = {
  get: async (companyNumber) => {
    try {
      const response = await (0, import_axios2.default)({
        method: 'get',
        url: `${companiesHouseURL}/company/${companyNumber}`,
        auth: { username, password: '' },
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });
      if (response.status === 404) {
        return {
          success: false,
          notFound: true,
        };
      }
      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error calling Companies House API %o', error);
      throw new Error(`Calling Companies House API. Unable to search for company ${error}`);
    }
  },
};
var companies_house_default = companiesHouse;

// integrations/industry-sector/index.ts
var import_axios3 = __toESM(require('axios'));
var import_dotenv11 = __toESM(require('dotenv'));
import_dotenv11.default.config();
var { APIM_MDM_URL: APIM_MDM_URL2, APIM_MDM_KEY: APIM_MDM_KEY2, APIM_MDM_VALUE: APIM_MDM_VALUE2 } = process.env;
var { APIM_MDM: APIM_MDM2 } = EXTERNAL_API_ENDPOINTS;
var headers = {
  'Content-Type': 'application/json',
  [String(APIM_MDM_KEY2)]: APIM_MDM_VALUE2,
};
var industrySectorNames = {
  get: async () => {
    try {
      console.info('Calling industry sector API');
      const response = await (0, import_axios3.default)({
        method: 'get',
        url: `${APIM_MDM_URL2}${APIM_MDM2.INDUSTRY_SECTORS}`,
        headers,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });
      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error calling industry sector API %o', error);
      return {
        success: false,
        apiError: true,
      };
    }
  },
};
var industry_sector_default = industrySectorNames;

// helpers/create-full-timestamp-from-day-month/index.ts
var createFullTimestampFromDayAndMonth = (day, month) => {
  if (day && month) {
    return /* @__PURE__ */ new Date(`${/* @__PURE__ */ new Date().getFullYear()}-${month}-${day}`);
  }
  return null;
};
var create_full_timestamp_from_day_month_default = createFullTimestampFromDayAndMonth;

// helpers/map-sic-code-descriptions/index.ts
var mapSicCodeDescriptions = (sicCodes, sectors) => {
  const industrySectorNames2 = [];
  if (!sicCodes?.length || !sectors?.length) {
    return industrySectorNames2;
  }
  sicCodes.forEach((sicCode) => {
    const sicCodeSector = sectors.find((sector) => sector.ukefIndustryId === sicCode);
    industrySectorNames2.push(sicCodeSector?.ukefIndustryName);
  });
  return industrySectorNames2;
};
var map_sic_code_descriptions_default = mapSicCodeDescriptions;

// helpers/map-companies-house-fields/index.ts
var {
  COMPANIES_HOUSE: { COMPANY_STATUS },
} = EXTERNAL_API_DEFINITIONS;
var mapCompaniesHouseFields = (companiesHouseResponse, sectors) => ({
  companyName: companiesHouseResponse.company_name,
  registeredOfficeAddress: {
    careOf: companiesHouseResponse.registered_office_address.care_of,
    premises: companiesHouseResponse.registered_office_address.premises,
    addressLine1: companiesHouseResponse.registered_office_address.address_line_1,
    addressLine2: companiesHouseResponse.registered_office_address.address_line_2,
    locality: companiesHouseResponse.registered_office_address.locality,
    region: companiesHouseResponse.registered_office_address.region,
    postalCode: companiesHouseResponse.registered_office_address.postal_code,
    country: companiesHouseResponse.registered_office_address.country,
  },
  companyNumber: companiesHouseResponse.company_number,
  dateOfCreation: companiesHouseResponse.date_of_creation,
  sicCodes: companiesHouseResponse.sic_codes,
  industrySectorNames: map_sic_code_descriptions_default(companiesHouseResponse.sic_codes, sectors),
  /**
   * Create a timestamp for financialYearEndDate
   * If day and month exist
   */
  financialYearEndDate: create_full_timestamp_from_day_month_default(
    companiesHouseResponse.accounts?.accounting_reference_date?.day,
    companiesHouseResponse.accounts?.accounting_reference_date?.month,
  ),
  isActive: companiesHouseResponse.company_status === COMPANY_STATUS.ACTIVE,
});

// custom-resolvers/queries/get-companies-house-information/index.ts
var getCompaniesHouseInformation = async (root, variables) => {
  try {
    const { companiesHouseNumber } = variables;
    console.info('Getting Companies House information for %s', companiesHouseNumber);
    const sanitisedNumber = sanitise_companies_house_number_default(companiesHouseNumber);
    const response = await companies_house_default.get(sanitisedNumber);
    if (!response.success || !response.data) {
      return {
        success: false,
        notFound: response.notFound,
      };
    }
    const industrySectors = await industry_sector_default.get();
    if (!industrySectors.success || industrySectors.apiError) {
      return {
        apiError: true,
        success: false,
      };
    }
    const mappedResponse = mapCompaniesHouseFields(response.data, industrySectors.data);
    return {
      ...mappedResponse,
      success: true,
    };
  } catch (error) {
    console.error('Error getting companies house information %o', error);
    return {
      apiError: true,
      success: false,
    };
  }
};
var get_companies_house_information_default = getCompaniesHouseInformation;

// custom-resolvers/queries/get-application-by-reference-number/index.ts
var getApplicationByReferenceNumberQuery = async (root, variables, context) => {
  try {
    console.info('Getting application by reference number %s', variables.referenceNumber);
    const { referenceNumber, decryptFinancialUk: decryptFinancialUk2, decryptFinancialInternational: decryptFinancialInternational2 } = variables;
    const application2 = await get_application_by_reference_number_default(referenceNumber, context);
    if (application2) {
      const populatedApplication2 = await get_populated_application_default.get({
        context,
        application: application2,
        decryptFinancialUk: decryptFinancialUk2,
        decryptFinancialInternational: decryptFinancialInternational2,
      });
      return {
        success: true,
        application: populatedApplication2,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    console.error('Error getting application by reference number (GetApplicationByReferenceNumber query) %o', error);
    throw new Error(`Get application by reference number (GetApplicationByReferenceNumber query) ${error}`);
  }
};
var get_application_by_reference_number_default2 = getApplicationByReferenceNumberQuery;

// integrations/ordnance-survey/index.ts
var import_axios4 = __toESM(require('axios'));
var import_dotenv12 = __toESM(require('dotenv'));
import_dotenv12.default.config();
var { ORDNANCE_SURVEY_API_KEY, ORDNANCE_SURVEY_API_URL } = process.env;
var ordnanceSurvey = {
  get: async (postcode) => {
    try {
      const acceptableStatuses = [200, 400, 404];
      const response = await (0, import_axios4.default)({
        method: 'get',
        url: `${ORDNANCE_SURVEY_API_URL}${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ORDNANCE_SURVEY_API_KEY}`,
        validateStatus(status) {
          return acceptableStatuses.includes(status);
        },
      });
      if (!response.data?.results || !acceptableStatuses.includes(response.status)) {
        return {
          success: false,
          status: response.status,
        };
      }
      return {
        success: true,
        data: response.data.results,
        status: response.status,
      };
    } catch (error) {
      console.error('Error calling Ordnance Survey API %o', error);
      throw new Error(`Calling Ordnance Survey API. Unable to search for address ${error}`);
    }
  },
};
var ordnance_survey_default = ordnanceSurvey;

// helpers/is-valid-postcode/index.ts
var import_postcode_validator = require('postcode-validator');
var isValidPostcode = (postcode) => (0, import_postcode_validator.postcodeValidator)(postcode, 'GB');

// helpers/filter-ordnance-survey-addresses/index.ts
var filterOrdnanceSurveyAddress = (address, houseNameOrNumber) => {
  if (address.DPA.SUB_BUILDING_NAME && address.DPA.SUB_BUILDING_NAME.includes(houseNameOrNumber)) {
    return address;
  }
  if (address.DPA.BUILDING_NAME && address.DPA.BUILDING_NAME.includes(houseNameOrNumber)) {
    return address;
  }
  if (address.DPA.ORGANISATION_NAME && address.DPA.ORGANISATION_NAME.includes(houseNameOrNumber)) {
    return address;
  }
  if (address.DPA.BUILDING_NUMBER && address.DPA.BUILDING_NUMBER.includes(houseNameOrNumber)) {
    return address;
  }
  return null;
};
var filterOrdnanceSurveyAddresses = (addresses, houseNameOrNumber) => addresses.filter((address) => filterOrdnanceSurveyAddress(address, houseNameOrNumber));
var filter_ordnance_survey_addresses_default = filterOrdnanceSurveyAddresses;

// helpers/map-ordnance-survey-address/index.ts
var mapOrdnanceSurveyAddress = (address) => {
  let addressLine1 = '';
  if (address.DPA.BUILDING_NUMBER) {
    addressLine1 = `${address.DPA.BUILDING_NUMBER} `;
  }
  if (address.DPA.SUB_BUILDING_NAME) {
    addressLine1 += `${address.DPA.SUB_BUILDING_NAME} `;
  }
  if (address.DPA.ORGANISATION_NAME) {
    addressLine1 += `${address.DPA.ORGANISATION_NAME} `;
  }
  if (address.DPA.BUILDING_NAME) {
    addressLine1 += `${address.DPA.BUILDING_NAME} `;
  }
  addressLine1 = addressLine1.trim();
  const county = '';
  return {
    addressLine1,
    addressLine2: address.DPA.THOROUGHFARE_NAME,
    town: address.DPA.POST_TOWN,
    county,
    postcode: address.DPA.POSTCODE,
  };
};
var map_ordnance_survey_address_default = mapOrdnanceSurveyAddress;

// helpers/map-ordnance-survey-addresses/index.ts
var mapOrdnanceSurveyAddresses = (addresses) => {
  const mapped = addresses.map((address) => map_ordnance_survey_address_default(address));
  return mapped;
};
var map_ordnance_survey_addresses_default = mapOrdnanceSurveyAddresses;

// helpers/map-and-filter-ordnance-survey-addresses/index.ts
var mapAndFilterOrdnanceSurveyAddresses = (addresses, houseNameOrNumber) => {
  try {
    console.info('Mapping and filtering Ordnance Survey addresses');
    const filtered = filter_ordnance_survey_addresses_default(addresses, houseNameOrNumber);
    const mapped = map_ordnance_survey_addresses_default(filtered);
    return mapped;
  } catch (error) {
    console.error('Error mapping and filtering Ordnance Survey addresses %o', error);
    throw new Error(`Mapping and filtering Ordnance Survey addresses ${error}`);
  }
};
var map_and_filter_ordnance_survey_addresses_default = mapAndFilterOrdnanceSurveyAddresses;

// custom-resolvers/queries/get-ordnance-survey-addresses/index.ts
var getOrdnanceSurveyAddresses = async (root, variables) => {
  try {
    const { postcode, houseNameOrNumber } = variables;
    console.info('Getting Ordnance Survey addresses for postcode: %s, houseNameOrNumber: %s', postcode, houseNameOrNumber);
    const noWhitespacePostcode = remove_white_space_default(postcode);
    if (!isValidPostcode(noWhitespacePostcode)) {
      console.error('Invalid postcode: %s', postcode);
      return {
        success: false,
        invalidPostcode: true,
      };
    }
    const response = await ordnance_survey_default.get(postcode);
    const acceptableStatuses = [200, 400];
    if (!response.success && acceptableStatuses.includes(response.status)) {
      return {
        success: false,
        noAddressesFound: true,
      };
    }
    if (!response.success || !response.data) {
      return {
        success: false,
        apiError: true,
      };
    }
    const uppercaseHouseNameOrNumber = houseNameOrNumber.toUpperCase();
    const mappedAddresses = map_and_filter_ordnance_survey_addresses_default(response.data, uppercaseHouseNameOrNumber);
    if (!mappedAddresses.length) {
      return {
        success: false,
        noAddressesFound: true,
      };
    }
    return {
      addresses: mappedAddresses,
      success: true,
    };
  } catch (error) {
    console.error('Error getting Ordnance Survey addresses %o', error);
    throw new Error(`Getting Ordnance Survey addresses ${error}`);
  }
};
var get_ordnance_survey_addresses_default = getOrdnanceSurveyAddresses;

// custom-resolvers/queries/verify-account-password-reset-token/index.ts
var { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY } = account_default;
var verifyAccountPasswordResetToken = async (root, variables, context) => {
  console.info('Verifying account password reset token');
  try {
    const { token } = variables;
    const account2 = await get_account_by_field_default(context, PASSWORD_RESET_HASH, token);
    if (account2) {
      const hasExpired = dateIsInThePast(account2[PASSWORD_RESET_EXPIRY]);
      if (hasExpired) {
        console.info('Unable to verify account password reset token - token has expired');
        return {
          success: false,
          expired: true,
          accountId: account2.id,
        };
      }
      console.info('Successfully verified account password reset token');
      return {
        success: true,
      };
    }
    console.info('Unable to verify account password reset token - no account found from the provided %s', PASSWORD_RESET_HASH);
    return {
      success: false,
      invalid: true,
    };
  } catch (error) {
    console.error('Error verifying account password reset token %o', error);
    throw new Error(`Verifying account password reset token ${error}`);
  }
};
var verify_account_password_reset_token_default = verifyAccountPasswordResetToken;

// custom-resolvers/index.ts
var customResolvers = {
  Mutation: {
    createAnAccount: create_an_account_default,
    deleteAnAccount: delete_an_account_default,
    accountSignIn: account_sign_in_default,
    accountSignInSendNewCode: account_sign_in_new_code_default,
    verifyAccountEmailAddress: verify_account_email_address_default,
    sendEmailConfirmEmailAddress: send_email_confirm_email_address_default2,
    verifyAccountSignInCode: verify_account_sign_in_code_default,
    addAndGetOTP: add_and_get_OTP_default,
    accountPasswordReset: account_password_reset_default,
    sendEmailPasswordResetLink: send_email_password_reset_link_default,
    sendEmailReactivateAccountLink: send_email_reactivate_account_link_default2,
    createAnApplication: create_an_application_default2,
    createManyApplications: create_many_applications_default,
    createAnAbandonedApplication: create_an_abandoned_application_default,
    deleteApplicationByReferenceNumber: delete_application_by_reference_number_default,
    submitApplication: submit_application_default,
    createFeedbackAndSendEmail: create_feedback_default,
    verifyAccountReactivationToken: verify_account_reactivation_token_default,
    updateLossPayeeFinancialDetailsUk: update_loss_payee_financial_details_uk_default,
    updateLossPayeeFinancialDetailsInternational: update_loss_payee_financial_details_international_default,
  },
  Query: {
    getAccountPasswordResetToken: get_account_password_reset_token_default,
    getApimCisCountries: get_APIM_CIS_countries_default2,
    getApimCurrencies: get_APIM_currencies_default2,
    getCountriesAndCurrencies: get_countries_and_currencies_default,
    getCompaniesHouseInformation: get_companies_house_information_default,
    getApplicationByReferenceNumber: get_application_by_reference_number_default2,
    getOrdnanceSurveyAddresses: get_ordnance_survey_addresses_default,
    verifyAccountPasswordResetToken: verify_account_password_reset_token_default,
  },
};
var custom_resolvers_default = customResolvers;

// custom-schema/index.ts
var extendGraphqlSchema = (schema) =>
  (0, import_schema.mergeSchemas)({
    schemas: [schema],
    typeDefs: type_defs_default,
    resolvers: custom_resolvers_default,
  });

// keystone.ts
var { NODE_ENV: NODE_ENV2, PORT, DATABASE_URL } = process.env;
var isDevEnvironment2 = NODE_ENV2 === 'development';
var isProdEnvironment = NODE_ENV2 === 'production';
var keystone_default = withAuth(
  (0, import_core3.config)({
    server: {
      port: Number(PORT),
      extendExpressApp: (app) => {
        app.use((0, import_overload_protection.default)('express'));
        app.use(security_default);
        app.use(check_api_key_default);
        if (isProdEnvironment) {
          app.use(rate_limiter_default);
        }
      },
      extendHttpServer: (httpServer, context) => {
        cron_default(context);
      },
    },
    db: {
      provider: 'mysql',
      url: String(DATABASE_URL),
      enableLogging: isDevEnvironment2,
    },
    graphql: {
      playground: isDevEnvironment2,
      apolloConfig: {
        introspection: isDevEnvironment2,
        plugins: apolloPlugins2,
        formatError: formatGraphQlError2,
      },
    },
    lists,
    session,
    extendGraphqlSchema,
    telemetry: false,
  }),
);
//# sourceMappingURL=config.js.map
