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
  buyerCountry: Country;
}

interface Application extends ApplicationCore {
  eligibility: ApplicationEligibility;
}

interface ApplicationFlat extends ApplicationCore, InsuranceEligibilityCore {
  buyerCountry: string;
}

export { Application, ApplicationFlat };
