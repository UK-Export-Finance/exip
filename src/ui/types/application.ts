import { InsuranceEligibilityCore } from './submitted-data';
import { Country } from './country';

type ApplicationCore = {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
};

interface ApplicationEligibility extends InsuranceEligibilityCore {
  id: string;
  buyerCountry: Country;
}

interface ApplicationPolicyAndExport {
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
  goodsOrServicesDescription?: string;
  finalDestinationCountryCode?: string;
}

interface ApplicationExporterCompanyAddress {
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

interface ApplicationExporterSicCodes {
  id: string;
  sicCode?: string;
}

interface ApplicationExporterCompany {
  id: string;
  companyName?: string;
  companyNumber?: string;
  companyWebsite?: string;
  hasTradingName?: boolean;
  hasTradingAddress?: boolean;
  registeredOfficeAddress: ApplicationExporterCompanyAddress;
  sicCodes: Array<ApplicationExporterSicCodes>;
}

interface ApplicationExporterBusiness {
  id: string;
  goodsOrServices?: string;
  yearsExporting?: string;
  employeesUK?: string;
  employeesInternational?: string;
}
interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  policyAndExport: ApplicationPolicyAndExport;
  exporterCompany: ApplicationExporterCompany;
  exporterBusiness: ApplicationExporterBusiness;
}

interface ApplicationFlat extends ApplicationCore, InsuranceEligibilityCore, ApplicationPolicyAndExport, ApplicationExporterCompany {
  buyerCountry: string;
}

export { Application, ApplicationExporterCompany, ApplicationFlat, ApplicationPolicyAndExport, ApplicationExporterSicCodes };
