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
  id: string;
  finalDestinationKnown?: boolean;
  finalDestinationCountryCode?: string;
  goodsOrServicesDescription?: string;
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
}

interface ApplicationBroker {
  id: string;
  isUsingBroker?: boolean;
  name?: string;
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

interface ApplicationDeclaration {
  id: string;
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean | null;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
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
  country?: string;
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

interface ApplicationPolicy {
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
}

interface ApplicationFlatCore extends ApplicationCore, InsuranceEligibilityCore, ApplicationOwner {
  buyerCountry: string;
  totalContractValueOverThreshold?: boolean;
}

type ApplicationFlat = ApplicationFlatCore & ApplicationPolicy & ApplicationBroker & ApplicationCompany & ApplicationDeclaration;

interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE: number;
  TOTAL_VALUE_OF_CONTRACT: number;
  DEFAULT_FINAL_DESTINATION_KNOWN: boolean;
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: boolean;
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
  ApplicationDeclaration,
  ApplicationVersion,
  ApplicationOwner,
};
