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

interface ApplicationPolicy {
  id: string;
  policyType?: string;
  requestedStartDate?: Date;
  contractCompletionDate?: Date;
  totalValueOfContract?: number;
  creditPeriodWithBuyer?: string;
  policyCurrencyCode?: string;
  totalMonthsOfCover?: number;
  totalSalesToBuyer?: number;
  maximumBuyerWillOwe?: number;
}

interface ApplicationExportContract {
  id: string;
  goodsOrServicesDescription?: string;
  finalDestinationKnown?: boolean;
  finalDestinationCountryCode?: string;
}

interface ApplicationDifferentTradingAddress {
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
  differentTradingAddress: ApplicationDifferentTradingAddress;
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
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
  email?: string;
}

interface ApplicationBuyerCountry {
  isoCode?: string;
  name?: string;
}

interface BuyerTradingHistory {
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
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
  exporterIsConnectedWithBuyer?: boolean;
  connectionWithBuyerDescription?: string;
}

interface ApplicationBuyer extends ApplicationBuyerCore {
  id: string;
  country?: ApplicationBuyerCountry;
  buyerTradingHistory: BuyerTradingHistory;
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
  country?: Country;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  owner: ApplicationOwner;
  policy: ApplicationPolicy;
  policyContact: ApplicationPolicyContact;
  jointlyInsuredParty: ApplicationJointlyInsuredParty;
  exportContract: ApplicationExportContract;
  company: ApplicationCompany;
  business: ApplicationBusiness;
  broker: ApplicationBroker;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationSectionReview;
  declaration: ApplicationDeclaration;
  totalContractValueOverThreshold?: boolean;
}

interface ApplicationFlatCore extends ApplicationCore, InsuranceEligibilityCore, ApplicationOwner {
  buyerCountry: string;
}

type ApplicationFlat = ApplicationFlatCore & ApplicationPolicy & ApplicationCompany & ApplicationDeclaration;

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
  ApplicationCompany,
  ApplicationFlat,
  ApplicationPolicy,
  ApplicationPolicyContact,
  ApplicationJointlyInsuredParty,
  ApplicationExporterIndustrySectorNames,
  ApplicationBusiness,
  ApplicationBroker,
  ApplicationBuyer,
  ApplicationBuyerUiInput,
  ApplicationBuyerApiInput,
  ApplicationExportContract,
  ApplicationSectionReview,
  ApplicationDeclaration,
  ApplicationVersion,
  ApplicationOwner,
};
