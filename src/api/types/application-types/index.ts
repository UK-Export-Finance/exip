import { SuccessResponse } from '../generic';
import { Country } from '../country';
import { Relationship } from '../relationship';

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
  outstandingPayment?: boolean;
}

export interface ApplicationBuyer extends Relationship {
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
  buyerTradingHistory: BuyerTradingHistory;
}

export interface ApplicationCompanyAddressCore {
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

export interface ApplicationCompanyCore {
  companyName: string;
  companyNumber: string;
  dateOfCreation: Date;
  sicCodes: Array<string>;
  industrySectorNames: Array<string>;
  financialYearEndDate: Date;
  registeredOfficeAddress: ApplicationCompanyAddressCore;
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
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean | null;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

export interface ApplicationLossPayeeFinancialInternational extends Relationship {
  lossPayeeId?: string;
  bankAddress?: string;
  bicSwiftCode?: string;
  bicSwiftCodeVector?: string;
  iban?: string;
  ibanVector?: string;
}

export interface ApplicationLossPayeeFinancialUk extends Relationship {
  lossPayeeId?: string;
  accountNumber?: string;
  accountNumberVector?: string;
  bankAddress?: string;
  sortCode?: string;
  sortCodeVector?: string;
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
}

export interface ApplicationExportContract extends Relationship {
  applicationId: string;
  finalDestinationCountryCode?: string;
  finalDestinationCountry?: Country;
  finalDestinationKnown: boolean;
  goodsOrServicesDescription?: string;
  paymentTermsDescription?: string;
}

export interface ApplicationExportContractAgent extends Relationship {
  exportContractId: string;
  countryCode?: string;
  fullAddress?: string;
  isUsingAgent?: boolean;
  name?: string;
}

export interface ApplicationExportContractAgentService extends Relationship {
  agentId: string;
  agentIsCharging?: boolean;
  serviceDescription?: string;
}

export interface ApplicationExportContractAgentServiceCharge extends Relationship {
  agentServiceId: string;
  percentageCharge?: string;
  fixedSumAmount?: string;
  fixedSumCurrencyCode?: string;
  payableCountryCode?: string;
  method?: string;
}

export interface ApplicationOwner extends Relationship {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApplicationPolicy extends Relationship {
  requestedStartDate?: Date;
}

export interface ApplicationPolicyContact extends Relationship {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  isSameAsOwner: boolean;
}

export interface ApplicationPrivateMarket extends Relationship {
  exportContractId: string;
  attempted?: boolean;
  declinedDescription?: string;
}

export interface ApplicationJointlyInsuredParty extends Relationship {
  policyId: string;
  requested?: boolean;
  companyName?: string;
  companyNumber?: string;
  country: Country;
}

export interface ApplicationDifferentTradingAddress extends Relationship {
  fullAddress: string;
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
  version: number;
}

export interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  name: string;
  referenceNumber: number;
  buyerName: string;
  buyerLocation: string;
}

export interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE: number;
  TOTAL_VALUE_OF_CONTRACT: number;
  DEFAULT_FINAL_DESTINATION_KNOWN: boolean;
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: boolean;
  DEFAULT_CURRENCY?: string;
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: boolean;
}

export interface SectionReview {
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
