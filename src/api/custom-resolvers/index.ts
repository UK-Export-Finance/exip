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
  deleteApplicationByReferenceNumber,
  updateCompanyAndCompanyAddress,
  submitApplication,
  createFeedbackAndSendEmail,
  verifyAccountReactivationToken,
} from './mutations';
import { getCompaniesHouseInformation, getAccountPasswordResetToken, verifyAccountPasswordResetToken } from './queries';

/**
 * customResolvers
 * Custom resolvers to add to the keystone generated GraphQL API
 * @returns {Object} Object with custom queries and mutations
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
    deleteApplicationByReferenceNumber,
    updateCompanyAndCompanyAddress,
    submitApplication,
    createFeedbackAndSendEmail,
    verifyAccountReactivationToken,
  },
  Query: {
    getCompaniesHouseInformation,
    getAccountPasswordResetToken,
    verifyAccountPasswordResetToken,
  },
};

export default customResolvers;
