export const APPLICATION = {
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
  },
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_DEADLINE_IN_DAYS: 30,
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
    ABBREVIATED: {
      SINGLE: 'Single',
      MULTIPLE: 'Multiple',
    },
  },
  POLICY: {
    TOTAL_MONTHS_OF_COVER: {
      MINIMUM: 1,
      MAXIMUM: 12,
    },
  },
  STATUS: {
    IN_PROGRESS: 'In progress',
    SUBMITTED: 'Submitted to UKEF',
    ABANDONED: 'Abandoned',
  },
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: {
        FIXED_SUM: 'Fixed sum',
        PERCENTAGE: 'Percentage',
      },
    },
  },
  SMALL_EXPORT_BUILDER: {
    MAXIMUM_BUYER_WILL_OWE: 25000,
  },
};
