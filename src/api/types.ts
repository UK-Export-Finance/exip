import Context from '@keystone-6/core/types';
import { ApplicationCreateInput, AccountUpdateInput, CompanyUpdateInput } from '.keystone/types'; // eslint-disable-line

interface SuccessResponse {
  success: boolean;
}

interface ApplicationRelationship {
  id: string;
}

interface ApplicationBusinessContactDetail extends ApplicationRelationship {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface ApplicationBusiness extends ApplicationRelationship {
  businessContactDetail: ApplicationBusinessContactDetail;
  goodsOrServicesSupplied: string;
  totalYearsExporting: string;
  totalEmployeesInternational: string;
  totalEmployeesUK: string;
  estimatedAnnualTurnover: string;
  exportsTurnoverPercentage: string;
  businessContactDetailId: string;
}

interface Country extends ApplicationRelationship {
  name: string;
  isoCode: string;
}

interface ApplicationEligibility extends ApplicationRelationship {
  buyerCountry: Country;
  hasCompaniesHouseNumber: boolean;
  otherPartiesInvolved: boolean;
  paidByLetterOfCredit: boolean;
  needPreCreditPeriodCover: boolean;
  wantCoverOverMaxAmount: boolean;
  wantCoverOverMaxPeriod: boolean;
}

interface ApplicationOwner extends ApplicationRelationship {
  email: string;
  firstName: string;
  lastName: string;
}

interface ApplicationCompany {
  id: string;
  companyName?: string;
}

interface ApplicationCompanySicCode {
  id: string;
  companyId: string;
  sicCode: string;
  industrySectorName: string;
}

interface ApplicationBuyer extends ApplicationRelationship {
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

interface ApplicationDeclaration extends ApplicationRelationship {
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean | null;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

interface AccountInput {
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verificationHash: string;
  verificationExpiry: Date;
}

interface Account extends AccountUpdateInput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  hash: string;
  verificationHash: string;
  optSalt?: string;
  optHash?: string;
  otpExpiry?: Date;
  sessionIdentifier?: string;
  passwordResetHash?: string;
  passwordResetExpiry?: Date;
  isVerified: boolean;
  reactivationHash?: string;
  reactivationExpiry?: Date;
}

interface ApplicationCompanyAddress extends ApplicationRelationship {
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
}

interface ApplicationPolicyAndExport extends ApplicationRelationship {
  requestedStartDate: Date;
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: Date;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationEligibility;
  owner: ApplicationOwner;
  policyAndExport: ApplicationPolicyAndExport;
  company: ApplicationCompany;
  companySicCodes: Array<ApplicationCompanySicCode>;
  companyAddress: ApplicationCompanyAddress;
  business: ApplicationBusiness;
  broker: ApplicationRelationship;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationRelationship;
  declaration: ApplicationDeclaration;
}

interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  name: string;
  referenceNumber: number;
  buyerName: string;
  buyerLocation: string;
}

interface ApplicationVersion {
  VERSION_NUMBER: string;
  OVER_500K_SUPPORT: boolean;
  MAXIMUM_BUYER_CAN_OWE: number;
  TOTAL_VALUE_OF_CONTRACT: number;
}

type BufferEncoding = 'hex' | 'base64' | 'ascii';

interface CompanyResponse {
  id: string;
  applicationId: string;
}

interface DeleteApplicationByReferenceNumberVariables {
  referenceNumber: number;
}

interface Address {
  careOf?: string;
  premises?: string;
  addressLine1?: string;
  addressLine2?: string;
  locality?: string;
  town?: string;
  region?: string;
  county?: string;
  postalCode?: string;
  country?: string;
}

interface CompaniesHouseAccountReferenceDate {
  month: string;
  day: string;
}

interface CompaniesHouseAccounts {
  accounting_reference_date: CompaniesHouseAccountReferenceDate;
}

interface CompaniesHouseAPIAddress {
  care_of?: string;
  premises?: string;
  address_line_1?: string;
  address_line_2?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
}

interface CompaniesHouseResponse {
  company_name: string;
  registered_office_address: CompaniesHouseAPIAddress;
  company_number: string;
  date_of_creation: string;
  sic_codes: Array<string>;
  accounts: CompaniesHouseAccounts;
}

interface CompaniesHouseAPIResponse extends SuccessResponse {
  data?: CompaniesHouseResponse;
}

interface MappedCompaniesHouseResponse {
  companyName: string;
  registeredOfficeAddress: Address;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
}

interface EmailResponse extends SuccessResponse {
  emailRecipient: string;
}

interface GetCompaniesHouseInformationVariables {
  companiesHouseNumber: string;
}

interface OrdnanceSurveyAddress {
  ADDRESS: string;
  BUILDING_NUMBER: string;
  BUILDING_NAME?: string;
  POST_TOWN: string;
  POSTCODE: string;
  DEPENDENT_LOCALITY?: string;
  ORGANISATION_NAME?: string;
  THOROUGHFARE_NAME?: string;
}

interface OrdnanceSurveyResponse {
  DPA: OrdnanceSurveyAddress;
}

interface OrdnanceSurveyAPIResponse extends SuccessResponse {
  data?: Array<OrdnanceSurveyResponse>;
}

interface OrdnanceSurveyVariables {
  postcode: string;
  houseNumber: string;
}

interface ConnectId {
  id: string;
}

interface ConnectObj {
  connect: ConnectId;
}

interface Currency {
  name: string;
  isoCode: string;
}

interface NotifyPersonalisation {
  linkToFile?: string;
}

interface SicCode {
  sicCode: string;
  industrySectorName: string;
  company: ConnectObj;
  application: ConnectObj;
}

interface VerifyEmailAddressVariables {
  token: string;
}

interface VerifyEmailAddressResponse extends SuccessResponse {
  accountId?: string;
  expired?: boolean;
  invalid?: boolean;
  emailRecipient?: string;
}

interface AccountCreationVariables {
  urlOrigin: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AccountDeletionVariables {
  email: string;
}

interface AccountSendEmailPasswordResetLinkVariables {
  urlOrigin: string;
  email: string;
}

interface AccountSendEmailReactivateLinkVariables {
  urlOrigin: string;
  accountId: string;
}

interface AccountSignInVariables {
  urlOrigin: string;
  email: string;
  password: string;
}

interface AccountSignInSendNewCodeVariables {
  accountId: string;
}

interface AccountPasswordResetVariables {
  token: string;
  password: string;
}

interface GetAccountPasswordResetTokenVariables {
  email: string;
}

interface VerifyAccountPasswordResetTokenVariables {
  token: string;
}

interface AccountPasswordResetTokenResponse extends SuccessResponse {
  token?: string;
  expired?: boolean;
  invalid?: boolean;
  accountId?: string;
}

interface InsuranceFeedbackVariables {
  satisfaction?: string;
  improvement?: string;
  otherComments?: string;
  referralUrl?: string;
  createdAt?: Date;
  date?: string;
  time?: string;
}

interface AccountSignInResponse extends SuccessResponse {
  accountId?: string;
  resentVerificationEmail?: boolean;
  isBlocked?: boolean;
}

interface AccountPasswordResetResponse extends SuccessResponse {
  hasBeenUsedBefore?: boolean;
}

interface AccountSendEmailPasswordResetLinkResponse extends SuccessResponse {
  accountId?: string;
  isBlocked?: boolean;
}

interface AccountSendEmailReactivateLinkResponse extends SuccessResponse {
  accountId?: string;
  email?: string;
}

interface VerifyAccountSignInCodeVariables {
  accountId: string;
  securityCode: string;
}

interface VerifyAccountSignInCodeResponse extends SuccessResponse {
  expired?: boolean;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  expires?: string;
  sessionIdentifier?: string;
}

interface VerifyAccountSessionVariables {
  token: string;
}

interface AddOtpToAccountVariables {
  email: string;
}

interface AddAndGetOtpResponse extends SuccessResponse {
  securityCode?: string;
}

interface VerifyAccountReactivationTokenVariables {
  token: string;
}

interface VerifyAccountReactivationTokenResponse extends SuccessResponse {
  expired?: boolean;
  invalid?: boolean;
  accountId?: string;
}

interface SendExporterEmailVariables {
  urlOrigin: string;
  accountId: string;
  referenceNumber?: string;
}

interface SubmitApplicationVariables {
  applicationId: string;
}

interface UpdateCompanyAndCompanyAddressVariablesData {
  address?: ApplicationCompanyAddress;
  sicCodes?: [string];
  oldSicCodes?: [string];
  industrySectorNames?: [string];
  company?: CompanyUpdateInput;
}

interface UpdateCompanyAndCompanyAddressVariables {
  companyId: string;
  companyAddressId: string;
  data: UpdateCompanyAndCompanyAddressVariablesData;
}

interface Feedback extends SuccessResponse {
  id: string;
  service: string;
  satisfaction: string;
  improvement: string;
  otherComments: string;
  referralUrl: string;
  product: string;
  createdAt: string;
}

interface IndustrySector {
  id?: number;
  ukefIndustryId?: string;
  ukefIndustryName: string;
}

interface TestHelperCreate {
  context: Context;
  companyId?: string;
}

interface TestHelperAccountCreate extends TestHelperCreate {
  data?: Account;
  deleteAccounts?: boolean;
}

interface TestHelperApplicationCreate extends TestHelperCreate {
  data: ApplicationCreateInput;
}

interface XLSXTitleRowIndexes {
  HEADER: number;
  KEY_INFORMATION: number;
  EXPORTER_CONTACT_DETAILS?: number;
  POLICY_AND_EXPORT: number;
  EXPORTER_BUSINESS: number;
  BUYER: number;
  ELIGIBILITY: number;
}

interface XLSXRowIndexes {
  TITLES: XLSXTitleRowIndexes;
  COMPANY_ADDRESS: number;
  COMPANY_SIC_CODES: number;
  BROKER_ADDRESS: number;
  BUYER_ADDRESS: number;
  BUYER_CONTACT_DETAILS: number;
}

export {
  Account,
  AccountCreationVariables,
  AccountDeletionVariables,
  ApplicationCompanyAddress,
  AccountInput,
  AccountPasswordResetResponse,
  AccountSendEmailPasswordResetLinkVariables,
  AccountSendEmailPasswordResetLinkResponse,
  AccountSendEmailReactivateLinkVariables,
  AccountSendEmailReactivateLinkResponse,
  AccountSignInVariables,
  AccountSignInSendNewCodeVariables,
  AccountSignInResponse,
  AccountPasswordResetVariables,
  AddOtpToAccountVariables,
  AddAndGetOtpResponse,
  Address,
  Application,
  ApplicationBuyer,
  ApplicationBusiness,
  ApplicationBusinessContactDetail,
  ApplicationDeclaration,
  ApplicationEligibility,
  ApplicationCompany,
  ApplicationCompanySicCode,
  ApplicationOwner,
  ApplicationRelationship,
  ApplicationSubmissionEmailVariables,
  ApplicationVersion,
  BufferEncoding,
  MappedCompaniesHouseResponse,
  CompanyResponse,
  CompaniesHouseResponse,
  CompaniesHouseAPIResponse,
  Context,
  Country,
  Currency,
  DeleteApplicationByReferenceNumberVariables,
  EmailResponse,
  Feedback,
  GetCompaniesHouseInformationVariables,
  GetAccountPasswordResetTokenVariables,
  AccountPasswordResetTokenResponse,
  NotifyPersonalisation,
  InsuranceFeedbackVariables,
  IndustrySector,
  OrdnanceSurveyAddress,
  OrdnanceSurveyAPIResponse,
  OrdnanceSurveyResponse,
  OrdnanceSurveyVariables,
  SicCode,
  SendExporterEmailVariables,
  SubmitApplicationVariables,
  SuccessResponse,
  TestHelperAccountCreate,
  TestHelperApplicationCreate,
  TestHelperCreate,
  UpdateCompanyAndCompanyAddressVariables,
  XLSXTitleRowIndexes,
  XLSXRowIndexes,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountPasswordResetTokenVariables,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSessionVariables,
  VerifyAccountReactivationTokenVariables,
  VerifyAccountReactivationTokenResponse,
};
