const DECLARATIONS = {
  AGREE_CONFIDENTIALITY: 'agreeToConfidentiality',
  AGREE_ANTI_BRIBERY: 'agreeToAntiBribery',
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT: 'hasAntiBriberyCodeOfConduct',
  WILL_EXPORT_WITH_CODE_OF_CONDUCT: 'willExportWithAntiBriberyCodeOfConduct',
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS: 'agreeToConfirmationAndAcknowledgements',
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS: 'willAdhereToAllRequirements',
    HAS_NO_OFFENSES_OR_INVESTIGATIONS: 'hasNoOffensesOrInvestigations',
    IS_NOT_AWARE_OF_EXISTING_SLAVERY: 'isNotAwareOfExistingSlavery',
    CONDITIONAL_REASONS: {
      CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 'cannotAdhereToAllRequirements',
      OFFENSES_OR_INVESTIGATIONS: 'offensesOrInvestigations',
      AWARE_OF_EXISTING_SLAVERY: 'awareOfExistingSlavery',
    },
  },
};

export default DECLARATIONS;
