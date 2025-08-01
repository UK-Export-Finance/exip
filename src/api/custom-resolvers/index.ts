import {
  createAnAccount,
  deleteAnAccount,
  verifyAccountEmailAddress,
  sendEmailConfirmEmailAddress,
  accountSignIn,
  accountSignInSendNewCode,
  verifyAccountSignInCode,
  addAndGetOTP,
  accountPasswordReset,
  sendEmailPasswordResetLink,
  sendEmailReactivateAccountLink,
  createAnApplication,
  createManyApplications,
  createAnAbandonedApplication,
  deleteApplicationByReferenceNumber,
  submitApplication,
  createFeedbackAndSendEmail,
  verifyAccountReactivationToken,
  updateLossPayeeFinancialDetailsUk,
  updateLossPayeeFinancialDetailsInternational,
} from './mutations';
import {
  getAccountPasswordResetToken,
  getApimCisCountries,
  getApimCurrencies,
  getCountriesAndCurrencies,
  getCompaniesHouseInformation,
  getApplicationByReferenceNumber,
  getOrdnanceSurveyAddresses,
  verifyAccountPasswordResetToken,
} from './queries';

/**
 * customResolvers
 * Custom resolvers to add to the GraphQL API/schema automatically generated by KeystoneJS
 * Note: Any new resolvers need to be added to ./type-defs.ts.
 * Otherwise, the resolver will not be added.
 * @returns {object} Object with custom queries and mutations
 */
const customResolvers = {
  Mutation: {
    createAnAccount,
    deleteAnAccount,
    accountSignIn,
    accountSignInSendNewCode,
    verifyAccountEmailAddress,
    sendEmailConfirmEmailAddress,
    verifyAccountSignInCode,
    addAndGetOTP,
    accountPasswordReset,
    sendEmailPasswordResetLink,
    sendEmailReactivateAccountLink,
    createAnApplication,
    createManyApplications,
    createAnAbandonedApplication,
    deleteApplicationByReferenceNumber,
    submitApplication,
    createFeedbackAndSendEmail,
    verifyAccountReactivationToken,
    updateLossPayeeFinancialDetailsUk,
    updateLossPayeeFinancialDetailsInternational,
  },
  Query: {
    getAccountPasswordResetToken,
    getApimCisCountries,
    getApimCurrencies,
    getCountriesAndCurrencies,
    getCompaniesHouseInformation,
    getApplicationByReferenceNumber,
    getOrdnanceSurveyAddresses,
    verifyAccountPasswordResetToken,
  },
};

export default customResolvers;
