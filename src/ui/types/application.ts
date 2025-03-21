import { InsuranceEligibilityCore } from './submitted-data';
import { Connect } from './connect';
import { Country } from './country';
import { SicCode } from './sic-code';

interface ApplicationOwner {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

type ApplicationCore = {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  dealType: string;
  submissionCount: number;
  submissionDeadline: string;
  submissionType: string;
  submissionDate?: string;
  status: string;
  version: string;
};

interface ApplicationEligibility extends InsuranceEligibilityCore {
  id: string;
  buyerCountry: Country;
}

interface ApplicationPrivateMarket {
  id: string;
  attempted?: boolean;
  declinedDescription?: string;
}

interface ApplicationExportContractAwardMethod {
  id: string;
  value?: string;
}

interface ApplicationExportContractAgentServiceCharge {
  id: string;
  fixedSumAmount?: string;
  fixedSumCurrencyCode?: string;
  method?: string;
  payableCountryCode?: string;
  percentageCharge?: string;
}

interface ApplicationExportContractAgentService {
  id: string;
  agentIsCharging?: boolean;
  serviceDescription?: string;
  charge: ApplicationExportContractAgentServiceCharge;
}

interface ApplicationExportContractAgent {
  id: string;
  countryCode?: string;
  fullAddress?: string;
  isUsingAgent?: boolean;
  name?: string;
  service: ApplicationExportContractAgentService;
}

interface ApplicationExportContract {
  agent: ApplicationExportContractAgent;
  awardMethod: ApplicationExportContractAwardMethod;
  id: string;
  finalDestinationKnown?: boolean;
  finalDestinationCountryCode?: string;
  goodsOrServicesDescription?: string;
  otherAwardMethod?: string;
  paymentTermsDescription?: string;
  privateMarket: ApplicationPrivateMarket;
}

interface ApplicationCompanyDifferentTradingAddress {
  id: string;
  fullAddress?: string;
}

interface ApplicationCompanyAddress {
  id: string;
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

interface ApplicationExporterIndustrySectorNames {
  id: string;
  industrySectorNames?: string;
}

interface ApplicationCompany {
  id: string;
  companyName?: string;
  companyNumber?: string;
  companyWebsite?: string;
  hasDifferentTradingName?: boolean;
  hasDifferentTradingAddress?: boolean;
  registeredOfficeAddress: ApplicationCompanyAddress;
  sicCodes: Array<SicCode>;
  differentTradingAddress: ApplicationCompanyDifferentTradingAddress;
  financialYearEndDate?: Date;
  dateOfCreation?: string | Date;
  industrySectorNames?: Array<string>;
  differentTradingName?: string;
  phoneNumber?: string;
}

interface ApplicationBusiness {
  id: string;
  goodsOrServices?: string;
  totalYearsExporting?: string;
  totalEmployeesUK?: string;
  estimatedAnnualTurnover?: string;
  exportsTurnoverPercentage?: string;
  turnoverCurrencyCode?: string;
  hasCreditControlProcess?: boolean;
  goodsOrServicesSupplied?: string;
}

interface ApplicationBroker {
  id: string;
  isUsingBroker?: boolean;
  isBasedInUk?: boolean;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  buildingNumberOrName?: string;
  town?: string;
  county?: string;
  postcode?: string;
  fullAddress?: string;
  email?: string;
}

interface ApplicationBuyerCountry {
  isoCode?: string;
  name?: string;
}

interface ApplicationBuyerTradingHistory {
  id: string;
  exporterHasTradedWithBuyer?: boolean;
  currencyCode?: string;
  outstandingPayments?: boolean;
  failedPayments?: boolean;
  totalOutstandingPayments?: number;
  totalOverduePayments?: number;
}

interface ApplicationBuyerCore {
  companyOrOrganisationName?: string;
  address?: string;
  registrationNumber?: string;
  website?: string;
}

interface ApplicationBuyerRelationship {
  id: string;
  exporterIsConnectedWithBuyer?: boolean;
  connectionWithBuyerDescription?: string;
  exporterHasPreviousCreditInsuranceWithBuyer?: boolean;
  exporterHasBuyerFinancialAccounts?: boolean;
  previousCreditInsuranceWithBuyerDescription?: string;
}

interface BuyerContact {
  id: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
}

interface ApplicationBuyer extends ApplicationBuyerCore {
  id: string;
  country?: ApplicationBuyerCountry;
  buyerTradingHistory: ApplicationBuyerTradingHistory;
  relationship: ApplicationBuyerRelationship;
  contact: BuyerContact;
}

interface ApplicationBuyerUiInput extends ApplicationBuyerCore {
  country?: string;
}

interface ApplicationBuyerApiInput extends ApplicationBuyerCore {
  country?: Connect;
}

interface ApplicationSectionReview {
  id: string;
  eligibility?: boolean;
  policy?: boolean;
  business?: boolean;
  buyer?: boolean;
}

export interface ApplicationDeclarationModernSlavery {
  id: string;
  willAdhereToAllRequirements?: boolean;
  hasNoOffensesOrInvestigations?: boolean;
  isNotAwareOfExistingSlavery?: boolean;
  cannotAdhereToAllRequirements?: string;
  offensesOrInvestigations?: string;
  awareOfExistingSlavery?: string;
}

export interface ApplicationDeclarationModernSlaveryVersions {
  WILL_ADHERE_TO_ALL_REQUIREMENTS: string;
  HAS_NO_OFFENSES_OR_INVESTIGATIONS: string;
  IS_NOT_AWARE_OF_EXISTING_SLAVERY: string;
}

interface ApplicationDeclarationCore {
  id: string;
  agreeHowDataWillBeUsed?: boolean;
  agreeToAntiBribery?: boolean;
  agreeToConfidentiality?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
}

interface ApplicationDeclarationFlat extends ApplicationDeclarationCore {
  willAdhereToAllRequirements?: boolean;
  hasNoOffensesOrInvestigations?: boolean;
  isNotAwareOfExistingSlavery?: boolean;
}

export interface ApplicationDeclaration extends ApplicationDeclarationCore {
  modernSlavery: ApplicationDeclarationModernSlavery;
}

interface ApplicationDeclarationVersions {
  ANTI_BRIBERY: string;
  ANTI_BRIBERY_CODE_OF_CONDUCT: string;
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: string;
  CONFIDENTIALITY: string;
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: string;
  HOW_YOUR_DATA_WILL_BE_USED?: string;
  MODERN_SLAVERY?: string;
}

interface ApplicationPolicyContact {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  position?: string;
  isSameAsOwner?: boolean;
}

interface ApplicationJointlyInsuredParty {
  id: string;
  requested?: boolean;
  companyName?: string;
  companyNumber?: string;
  countryCode?: string;
}

interface ApplicationLossPayeeFinancialDetailsInternational {
  id: string;
  bankAddress?: string;
  bicSwiftCode?: string;
  iban?: string;
}

interface ApplicationLossPayeeFinancialDetailsUk {
  id: string;
  accountNumber?: string;
  bankAddress?: string;
  sortCode?: string;
}

interface ApplicationNominatedLossPayee {
  id: string;
  financialInternational: ApplicationLossPayeeFinancialDetailsInternational;
  financialUk: ApplicationLossPayeeFinancialDetailsUk;
  isAppointed?: boolean;
  isLocatedInUk?: boolean;
  isLocatedInternationally?: boolean;
  name?: string;
}

interface ApplicationPolicyCore {
  id: string;
  policyType?: string;
  requestedStartDate?: string;
  contractCompletionDate?: string;
  totalValueOfContract?: number;
  creditPeriodWithBuyer?: string;
  policyCurrencyCode?: string;
  totalMonthsOfCover?: number;
  totalSalesToBuyer?: number;
  maximumBuyerWillOwe?: number;
  requestedCreditLimit?: number;
  needPreCreditPeriodCover?: boolean;
}

interface ApplicationPolicy extends ApplicationPolicyCore {
  jointlyInsuredParty: ApplicationJointlyInsuredParty;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  owner: ApplicationOwner;
  policy: ApplicationPolicy;
  policyContact: ApplicationPolicyContact;
  exportContract: ApplicationExportContract;
  company: ApplicationCompany;
  business: ApplicationBusiness;
  broker: ApplicationBroker;
  buyer: ApplicationBuyer;
  nominatedLossPayee: ApplicationNominatedLossPayee;
  sectionReview: ApplicationSectionReview;
  declaration: ApplicationDeclaration;
  totalContractValueOverThreshold: boolean;
  migratedTo?: number;
}

interface ApplicationFlatCore extends ApplicationCore, InsuranceEligibilityCore, ApplicationOwner {
  buyerCountry: string;
  totalContractValueOverThreshold?: boolean;
}

interface ApplicationFlatPolicy extends ApplicationPolicyCore {
  requested?: boolean;
  isAppointed?: boolean;
  'broker.fullAddress'?: string;
  isLocatedInUk?: boolean;
  isLocatedInternationally?: boolean;
}

interface ApplicationFlatExportContract extends ApplicationExportContract {
  attempted?: boolean;
  isUsingAgent?: boolean;
}

interface ApplicationFlatBuyer extends ApplicationBuyerCore {
  exporterIsConnectedWithBuyer?: boolean;
  exporterHasTradedWithBuyer?: boolean;
  outstandingPayments?: boolean;
  exporterHasPreviousCreditInsuranceWithBuyer?: boolean;
}

type ApplicationFlat = ApplicationFlatCore &
ApplicationFlatPolicy &
ApplicationBroker &
ApplicationCompany &
ApplicationDeclarationFlat &
ApplicationFlatExportContract &
ApplicationFlatBuyer;

interface ApplicationVersionSmallExportBuilder {
  MAXIMUM_BUYER_WILL_OWE: number;
}

interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE?: number;
  TOTAL_VALUE_OF_CONTRACT?: number;
  DEFAULT_FINAL_DESTINATION_KNOWN: boolean | null;
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: boolean | null;
  DEFAULT_CURRENCY?: string;
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: boolean;
  REQUESTED_CREDIT_LIMIT_REQUIRED?: boolean;
  DECLARATIONS_MODERN_SLAVERY?: boolean;
  SMALL_EXPORT_BUILDER?: ApplicationVersionSmallExportBuilder;
  BROKER_ADDRESS_LOOKUP?: boolean;
}

export {
  Application,
  ApplicationBusiness,
  ApplicationBroker,
  ApplicationBuyer,
  ApplicationBuyerRelationship,
  ApplicationBuyerTradingHistory,
  ApplicationBuyerUiInput,
  ApplicationBuyerApiInput,
  ApplicationCompany,
  ApplicationCompanyDifferentTradingAddress,
  ApplicationDeclarationVersions,
  ApplicationExportContract,
  ApplicationExportContractAgent,
  ApplicationExportContractAgentService,
  ApplicationExportContractAgentServiceCharge,
  ApplicationExporterIndustrySectorNames,
  ApplicationFlat,
  ApplicationJointlyInsuredParty,
  ApplicationLossPayeeFinancialDetailsInternational,
  ApplicationLossPayeeFinancialDetailsUk,
  ApplicationNominatedLossPayee,
  ApplicationPrivateMarket,
  ApplicationPolicy,
  ApplicationPolicyContact,
  ApplicationSectionReview,
  ApplicationOwner,
  ApplicationVersion,
};
