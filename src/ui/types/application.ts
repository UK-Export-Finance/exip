import { InsuranceEligibilityCore } from './submitted-data';
import { Country } from './country';

interface ApplicationExporter {
  id: string;
}

type ApplicationCore = {
  id: string;
  exporter: ApplicationExporter;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate?: Date;
  status: string;
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
  totalYearsExporting?: string;
  totalEmployeesUK?: string;
  totalEmployeesInternational?: string;
}

interface ApplicationExporterBroker {
  id: string;
  isUsingBroker?: string;
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

interface ApplicationBuyer {
  id: string;
  companyOrOrganisationName?: string;
  address?: string;
  country?: ApplicationBuyerCountry;
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

interface ApplicationSectionReview {
  id: string;
  eligibility?: boolean;
  policyAndExport?: boolean;
  exporterBusiness?: boolean;
  buyer?: boolean;
}

interface ApplicationDeclaration {
  id: string;
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  exporter: ApplicationExporter;
  policyAndExport: ApplicationPolicyAndExport;
  exporterCompany: ApplicationExporterCompany;
  exporterBusiness: ApplicationExporterBusiness;
  exporterBroker: ApplicationExporterBroker;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationSectionReview;
  declaration: ApplicationDeclaration;
}

interface ApplicationFlat extends ApplicationCore, InsuranceEligibilityCore, ApplicationPolicyAndExport, ApplicationExporterCompany {
  buyerCountry: string;
}

export {
  Application,
  ApplicationExporterCompany,
  ApplicationFlat,
  ApplicationPolicyAndExport,
  ApplicationExporterSicCodes,
  ApplicationExporterBusiness,
  ApplicationExporterBroker,
  ApplicationBuyer,
  ApplicationSectionReview,
  ApplicationDeclaration,
};
