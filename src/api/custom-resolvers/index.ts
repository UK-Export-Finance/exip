import {
  createAccount,
  verifyAccountEmailAddress,
  sendEmailConfirmEmailAddress,
  accountSignIn,
  accountSignInSendNewCode,
  verifyAccountSignInCode,
  addAndGetOTP,
  accountPasswordReset,
  deleteApplicationByReferenceNumber,
  updateExporterCompanyAndCompanyAddress,
  submitApplication,
  sendEmailPasswordResetLink,
  sendEmailInsuranceFeedback,
} from './mutations';
import { getCompaniesHouseInformation, getAccountPasswordResetToken } from './queries';

/**
 * customResolvers
 * Custom resolvers to add to the keystone generated GraphQL API
 * @returns {Object} Object with custom queries and mutations
 */
const customResolvers = {
  Mutation: {
    createAccount,
    accountSignIn,
    accountSignInSendNewCode,
    verifyAccountEmailAddress,
    sendEmailConfirmEmailAddress,
    verifyAccountSignInCode,
    addAndGetOTP,
    accountPasswordReset,
    deleteApplicationByReferenceNumber,
    updateExporterCompanyAndCompanyAddress,
    submitApplication,
    sendEmailPasswordResetLink,
    sendEmailInsuranceFeedback,
  },
  Query: {
    getCompaniesHouseInformation,
    getAccountPasswordResetToken,
  },
};

export default customResolvers;
