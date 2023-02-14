import { ExporterUpdateInput } from '.keystone/types'; // eslint-disable-line

interface ApplicationEligibility {
  id: string;
}

interface ApplicationPolicyAndExport {
  id: string;
}

interface ApplicationExporterCompany {
  id: string;
}

interface ApplicationExporterCompanyAddress {
  id: string;
}

interface ApplicationExporterBusiness {
  id: string;
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

interface Account extends ExporterUpdateInput {
  id: string;
  email: string;
  firstName: string;
  verificationHash: string;
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  eligibility: ApplicationEligibility;
  policyAndExport: ApplicationPolicyAndExport;
  exporterCompany: ApplicationExporterCompany;
  exporterCompanyAddress: ApplicationExporterCompanyAddress;
  exporterBusiness: ApplicationExporterBusiness;
}

interface CompanyResponse {
  id: string;
  applicationId: string;
}

interface ConnectId {
  id: string;
}

interface ConnectObj {
  connect: ConnectId;
}

interface SicCodes {
  sicCode: string;
  exporterCompany: ConnectObj;
  application: ConnectObj;
}

interface VerifyEmailAddressVariables {
  token: string;
}

interface SendEmailConfirmEmailAddressVariables {
  exporterId: string;
}

export { Account, AccountInput, Application, CompanyResponse, SicCodes, VerifyEmailAddressVariables, SendEmailConfirmEmailAddressVariables };
