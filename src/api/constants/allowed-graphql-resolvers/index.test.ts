import ALLOWED_GRAPHQL_RESOLVERS, { DEFAULT_RESOLVERS, CUSTOM_RESOLVERS, DEV_ENVIRONMENT_CUSTOM_RESOLVERS } from '.';

describe('api/constants/allowed-graphql-resolvers', () => {
  describe('DEFAULT_RESOLVERS', () => {
    it('should return an array of resolver names', () => {
      const expected = [
        'updateBroker',
        'updateBusiness',
        'updateBuyer',
        'updateBuyerRelationship',
        'updateBuyerTradingHistory',
        'updateCompany',
        'updateDeclaration',
        'updateNominatedLossPayee',
        'updateJointlyInsuredParty',
        'updatePolicy',
        'updatePolicyContact',
        'updateExportContract',
        'updateExportContractAgent',
        'updateExportContractAgentService',
        'updateExportContractAgentServiceCharge',
        'updatePrivateMarket',
        'updateSectionReview',
        'updateEligibility',
        'updateCompanyDifferentTradingAddress',
        'referenceNumber',
        'applications',
        'account',
        'updateAccount',
        'countries',
      ];

      expect(DEFAULT_RESOLVERS).toEqual(expected);
    });
  });

  describe('CUSTOM_RESOLVERS', () => {
    it('should return an array of resolver names', () => {
      const expected = [
        'accountPasswordReset',
        'accountSignIn',
        'accountSignInSendNewCode',
        'createAnAccount',
        'sendEmailConfirmEmailAddress',
        'sendEmailPasswordResetLink',
        'sendEmailReactivateAccountLink',
        'updateLossPayeeFinancialDetailsUk',
        'updateLossPayeeFinancialDetailsInternational',
        'verifyAccountEmailAddress',
        'verifyAccountPasswordResetToken',
        'verifyAccountReactivationToken',
        'verifyAccountSignInCode',
        'createAnApplication',
        'declarationAntiBriberies',
        'declarationConfirmationAndAcknowledgements',
        'declarationHowDataWillBeUseds',
        'deleteApplicationByReferenceNumber',
        'getApplicationByReferenceNumber',
        'getCompaniesHouseInformation',
        'getOrdnanceSurveyAddresses',
        'submitApplication',
        'createFeedbackAndSendEmail',
        'getApimCisCountries',
        'getApimCurrencies',
        'getCountriesAndCurrencies',
      ];

      expect(CUSTOM_RESOLVERS).toEqual(expected);
    });
  });

  describe('DEV_ENVIRONMENT_CUSTOM_RESOLVERS', () => {
    it('should return an array of resolver names', () => {
      const expected = [
        'accounts',
        'addAndGetOTP',
        'createApplications',
        'createAnAbandonedApplication',
        'createManyApplications',
        'createBuyer',
        'deleteAnAccount',
        'deleteApplications',
        'getAccountPasswordResetToken',
        'updateAccountStatus',
      ];

      expect(DEV_ENVIRONMENT_CUSTOM_RESOLVERS).toEqual(expected);
    });
  });

  describe('ALLOWED_GRAPHQL_RESOLVERS', () => {
    it('should return an array of resolver names', () => {
      const expected = [...DEFAULT_RESOLVERS, ...CUSTOM_RESOLVERS];

      expect(ALLOWED_GRAPHQL_RESOLVERS).toEqual(expected);
    });
  });
});
