import Context from '@keystone-6/core/types';
import { SuccessResponse } from '../generic';
import { Country } from '../country';
import { Relationship } from '../relationship';

export interface ApplicationBroker extends Relationship {
  isUsingBroker?: boolean;
  name?: string;
  fullAddress?: string;
  email?: string;
}

export interface ApplicationBusiness extends Relationship {
  application: Relationship;
  goodsOrServicesSupplied: string;
  totalYearsExporting: string;
  totalEmployeesUK: string;
  estimatedAnnualTurnover: string;
  exportsTurnoverPercentage: string;
  turnoverCurrencyCode: string;
}

export interface BuyerTradingHistory extends Relationship {
  currencyCode?: string;
  exporterHasTradedWithBuyer?: boolean;
  failedPayments?: boolean;
  outstandingPayments?: boolean;
  totalOutstandingPayments?: number;
  totalOverduePayments?: number;
}

export interface ApplicationBuyerRelationship extends Relationship {
  exporterIsConnectedWithBuyer?: boolean;
  connectionWithBuyerDescription?: string;
  exporterHasPreviousCreditInsuranceWithBuyer?: boolean;
  exporterHasBuyerFinancialAccounts?: boolean;
  previousCreditInsuranceWithBuyerDescription?: string;
}

export interface ApplicationBuyerTradingHistory extends Relationship {
  exporterHasTradedWithBuyer?: boolean;
  currencyCode?: string;
  outstandingPayments?: boolean;
  failedPayments?: boolean;
}

export interface ApplicationBuyer extends Relationship {
  application?: string;
  companyOrOrganisationName?: string;
  address?: string;
  country?: Country;
  registrationNumber?: string;
  website?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
  buyerTradingHistory: BuyerTradingHistory;
  relationship: ApplicationBuyerRelationship;
}

export interface ApplicationBuyerMvp extends Relationship {
  application?: string;
  companyOrOrganisationName?: string;
  address?: string;
  country?: Country;
  registrationNumber?: string;
  website?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
  exporterIsConnectedWithBuyer?: boolean;
  exporterHasTradedWithBuyer?: boolean;
}

export interface ApplicationCompanyAddressCore {
  id?: string;
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

export interface ApplicationCompanyDifferentTradingAddress extends Relationship {
  fullAddress: string;
}

export interface ApplicationCompanyCore {
  companyName: string;
  companyNumber: string;
  dateOfCreation: Date;
  differentTradingAddress?: ApplicationCompanyDifferentTradingAddress;
  industrySectorNames: Array<string>;
  financialYearEndDate: Date;
  hasDifferentTradingName?: boolean;
  hasDifferentTradingAddress?: boolean;
  registeredOfficeAddress: ApplicationCompanyAddressCore;
  sicCodes: Array<string>;
}

export interface ApplicationCompany extends ApplicationCompanyCore {
  id: string;
}

export interface ApplicationCompanyAddress extends ApplicationCompanyAddressCore {
  id: string;
}

export interface ApplicationCompanySicCode {
  id: string;
  companyId: string;
  sicCode: string;
  industrySectorName: string;
}

export interface ApplicationDeclaration extends Relationship {
  agreeToAntiBribery?: boolean;
  agreeToConfidentiality?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean | null;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
}

export interface ApplicationDeclarationVersions {
  ANTI_BRIBERY: string;
  ANTI_BRIBERY_CODE_OF_CONDUCT: string;
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: string;
  CONFIDENTIALITY: string;
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: string;
  HOW_YOUR_DATA_WILL_BE_USED?: string;
}

export interface ApplicationLossPayeeFinancialInternationalVector extends Relationship {
  bicSwiftCodeVector?: string;
  ibanVector?: string;
}

export interface ApplicationLossPayeeFinancialUkVector extends Relationship {
  accountNumberVector?: string;
  sortCodeVector?: string;
}

export interface ApplicationLossPayeeFinancialInternational extends Relationship {
  lossPayeeId?: string;
  vectorId?: string;
  bankAddress?: string;
  bicSwiftCode?: string;
  iban?: string;
  vector: ApplicationLossPayeeFinancialInternationalVector;
}

export interface ApplicationLossPayeeFinancialUk extends Relationship {
  lossPayeeId?: string;
  vectorId?: string;
  accountNumber?: string;
  accountNumberVector?: string;
  bankAddress?: string;
  sortCode?: string;
  sortCodeVector?: string;
  vector: ApplicationLossPayeeFinancialUkVector;
}

export interface ApplicationNominatedLossPayee extends Relationship {
  applicationId?: string;
  isAppointed?: boolean;
  name?: string;
  isLocatedInUk?: boolean;
  isLocatedInternationally?: boolean;
  financialUk: ApplicationLossPayeeFinancialUk;
  financialInternational: ApplicationLossPayeeFinancialInternational;
}

export interface TotalContractValue extends Relationship {
  value: string;
  valueId: number;
}

export interface CoverPeriod extends Relationship {
  value: string;
  valueId: number;
}

export interface ApplicationEligibility extends Relationship {
  buyerCountryIsoCode: string;
  hasCompaniesHouseNumber: boolean;
  totalContractValueId: number;
  totalContractValue: TotalContractValue;
  coverPeriodId: number;
  coverPeriod: CoverPeriod;
  isPartyToConsortium: boolean;
  isMemberOfAGroup: boolean;
}

export interface ApplicationExportContractAgentServiceCharge extends Relationship {
  agentServiceId: string;
  fixedSumAmount?: string;
  fixedSumCurrencyCode?: string;
  method?: string;
  payableCountryCode?: string;
  percentageCharge?: string;
}

export interface ApplicationExportContractAgentService extends Relationship {
  agentIsCharging?: boolean;
  charge: ApplicationExportContractAgentServiceCharge;
  id: string;
  serviceDescription?: string;
}

export interface ApplicationExportContractAgent extends Relationship {
  id: string;
  countryCode?: string;
  fullAddress?: string;
  isUsingAgent?: boolean;
  name?: string;
  service: ApplicationExportContractAgentService;
}

export interface ApplicationPrivateMarket extends Relationship {
  attempted?: boolean;
  declinedDescription?: string;
  exportContractId: string;
}

export interface ApplicationExportContract extends Relationship {
  agent: ApplicationExportContractAgent;
  awardMethodId: string;
  id: string;
  finalDestinationKnown?: boolean;
  finalDestinationCountryCode?: string;
  goodsOrServicesDescription?: string;
  paymentTermsDescription?: string;
  privateMarket: ApplicationPrivateMarket;
}

export interface ApplicationOwner extends Relationship {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApplicationJointlyInsuredParty extends Relationship {
  policyId: string;
  requested?: boolean;
  companyName?: string;
  companyNumber?: string;
  country?: Country;
}

export interface ApplicationPolicy extends Relationship {
  policyType: string;
  requestedStartDate: Date;
  contractCompletionDate: Date;
  totalValueOfContract?: number;
  needPreCreditPeriodCover?: boolean;
  creditPeriodWithBuyer?: string;
  policyCurrencyCode?: string;
  totalMonthsOfCover?: number;
  totalSalesToBuyer?: number;
  maximumBuyerWillOwe?: number;
  jointlyInsuredParty: ApplicationJointlyInsuredParty;
  requestedCreditLimit?: number;
}

export interface ApplicationPolicyContact extends Relationship {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  isSameAsOwner: boolean;
}

export interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  dealType: string;
  submissionCount: number;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: Date;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationEligibility;
  exportContract: ApplicationExportContract;
  broker: Relationship;
  business: ApplicationBusiness;
  buyer: ApplicationBuyer;
  company: ApplicationCompany;
  companySicCodes: Array<ApplicationCompanySicCode>;
  companyAddress: ApplicationCompanyAddress;
  declaration: ApplicationDeclaration;
  nominatedLossPayee: ApplicationNominatedLossPayee;
  owner: ApplicationOwner;
  policy: ApplicationPolicy;
  policyContact: ApplicationPolicyContact;
  sectionReview: Relationship;
  totalContractValueOverThreshold: boolean;
  version: number;
  migratedV2toV3?: boolean;
}

export interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  name: string;
  referenceNumber: number;
  buyerName: string;
  buyerLocation: string;
}

interface ApplicationVersionSmallExportBuilder {
  MAXIMUM_BUYER_WILL_OWE: number;
}

export interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE?: number;
  TOTAL_VALUE_OF_CONTRACT?: number;
  DEFAULT_FINAL_DESTINATION_KNOWN: boolean | null;
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: boolean | null;
  DEFAULT_CURRENCY?: string;
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: boolean;
  REQUESTED_CREDIT_LIMIT_REQUIRED?: boolean;
  SMALL_EXPORT_BUILDER?: ApplicationVersionSmallExportBuilder;
}

export interface SectionReview extends Relationship {
  eligibility: boolean;
  business?: boolean;
  policy?: boolean;
  buyer?: boolean;
}

export interface CreateAnApplicationVariables {
  accountId: string;
  eligibilityAnswers: ApplicationEligibility;
  company: ApplicationCompanyCore;
  sectionReview: SectionReview;
  status?: string;
}

export interface CreateManyApplicationsVariables {
  accountId: string;
  count: number;
}

export interface CreateInitialApplicationParams {
  context: Context;
  accountId: string;
  status?: string;
}

export interface CreateApplicationRelationshipParams {
  context: Context;
  applicationId: string;
  companyData: ApplicationCompanyCore;
  eligibilityAnswers: ApplicationEligibility;
  sectionReviewData: SectionReview;
}

export interface CreateExportContractAgentResponse {
  agent: ApplicationExportContractAgent;
  agentService: ApplicationExportContractAgentService;
  agentServiceCharge: ApplicationExportContractAgentServiceCharge;
}

export interface CreateExportContractResponse {
  exportContract: ApplicationExportContract;
  privateMarket: ApplicationPrivateMarket;
  agent: ApplicationExportContractAgent;
  agentService: ApplicationExportContractAgentService;
}

export interface CreatePolicyResponse {
  policy: ApplicationPolicy;
  jointlyInsuredParty: ApplicationJointlyInsuredParty;
}

export interface DeleteApplicationByReferenceNumberVariables {
  referenceNumber: number;
}

export interface GetApplicationByReferenceNumberVariables {
  referenceNumber: number;
  decryptFinancialUk?: boolean;
  decryptFinancialInternational?: boolean;
}

export interface GetApplicationByReferenceNumberResponse extends SuccessResponse {
  application?: Application;
}

export interface SubmitApplicationVariables {
  applicationId: string;
}

export interface UpdateApplicationRelationshipParams {
  context: Context;
  applicationId: string;
  brokerId: string;
  businessId: string;
  buyerId: string;
  companyId: string;
  declarationId: string;
  eligibilityId: string;
  exportContractId: string;
  nominatedLossPayeeId: string;
  policyId: string;
  policyContactId: string;
  referenceNumber: string;
  sectionReviewId: string;
}
