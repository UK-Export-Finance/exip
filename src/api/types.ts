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

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive?: boolean;
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

export { Account, Application, CompanyResponse, SicCodes };
