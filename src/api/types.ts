interface ApplicationEligibility {
  id: string;
}

interface ApplicationPolicyAndExport {
  id: string;
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  policyAndExport: ApplicationPolicyAndExport;
  eligibility: ApplicationEligibility;
}

export { Application };
