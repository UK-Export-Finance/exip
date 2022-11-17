import { InsuranceEligibility, InsuranceEligibilityCore } from '.';
import { Country } from '.';

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
};

interface ApplicationFlat extends ApplicationCore, InsuranceEligibilityCore {
  buyerCountry: string;
};

export { Application, ApplicationFlat };
