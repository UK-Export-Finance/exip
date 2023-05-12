import {
  createAnAccount,
  verifyAccountEmailAddress,
  sendEmailConfirmEmailAddress,
  accountSignIn,
  accountSignInSendNewCode,
  verifyAccountSignInCode,
  addAndGetOTP,
  accountPasswordReset,
  sendEmailPasswordResetLink,
  deleteApplicationByReferenceNumber,
  updateCompanyAndCompanyAddress,
  submitApplication,
  createFeedback,
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
    accountSignIn,
    accountSignInSendNewCode,
    verifyAccountEmailAddress,
    sendEmailConfirmEmailAddress,
    verifyAccountSignInCode,
    addAndGetOTP,
    accountPasswordReset,
    sendEmailPasswordResetLink,
    deleteApplicationByReferenceNumber,
    updateCompanyAndCompanyAddress,
    submitApplication,
    createFeedback,
  },
  Query: {
    getCompaniesHouseInformation,
    getAccountPasswordResetToken,
    verifyAccountPasswordResetToken,
  },
};

export default customResolvers;
