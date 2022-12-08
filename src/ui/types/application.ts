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
  policyType: string;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
  policyAndExport: ApplicationPolicyAndExport;
}

interface ApplicationFlat extends ApplicationCore, InsuranceEligibilityCore, ApplicationPolicyAndExport {
  buyerCountry: string;
}

export { Application, ApplicationFlat };
