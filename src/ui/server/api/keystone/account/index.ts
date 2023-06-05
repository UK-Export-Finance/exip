import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createAccountMutation from '../../../graphql/mutations/account/create';
import getAccountQuery from '../../../graphql/queries/account/get';
import verifyAccountEmailAddressMutation from '../../../graphql/mutations/account/verify-email-address';
import sendEmailConfirmEmailAddressMutation from '../../../graphql/mutations/account/send-email-confirm-email-address';
import accountSignInMutation from '../../../graphql/mutations/account/sign-in';
import accountSignInSendNewCodeMutation from '../../../graphql/mutations/account/sign-in-send-new-code';
import verifyAccountSignInCodeMutation from '../../../graphql/mutations/account/verify-sign-in-code';
import sendEmailPasswordResetLinkMutation from '../../../graphql/mutations/account/send-email-password-reset-link';
import verifyAccountSessionMutation from '../../../graphql/mutations/account/verify-session';
import accountPasswordResetMutation from '../../../graphql/mutations/account/password-reset';
import sendEmailReactivateAccountLinkMutation from '../../../graphql/mutations/account/reactivate-account-link';
import verifyAccountPasswordResetTokenQuery from '../../../graphql/queries/account/verify-account-password-reset-token';

const account = {
  create: async (urlOrigin: string, accountInput: Account) => {
    try {
      console.info('Creating an account');

      const variables = {
        urlOrigin,
        ...accountInput,
      };

      const response = (await apollo('POST', createAccountMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating an account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating an account ', response.networkError.result.errors);
      }

      if (response?.data?.createAnAccount) {
        return response.data.createAnAccount;
      }

      console.error(response);
      throw new Error('Creating an account');
    } catch (err) {
      console.error(err);
      throw new Error('Creating an account');
    }
  },
  get: async (id: string) => {
    try {
      console.info('Getting an account');

      const variables = { id };

      const response = (await apollo('POST', getAccountQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting an account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting an account ', response.networkError.result.errors);
      }

      if (response?.data?.account) {
        return response.data.account;
      }

      console.error(response);
      throw new Error('Getting an account');
    } catch (err) {
      console.error(err);
      throw new Error('Getting an account');
    }
  },
  verifyEmailAddress: async (token: string) => {
    try {
      console.info('Verifying account email address');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account email address ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account email address ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountEmailAddress) {
        return response.data.verifyAccountEmailAddress;
      }

      console.error(response);
      throw new Error('Verifying account email address');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying account email address');
    }
  },
  sendEmailConfirmEmailAddress: async (urlOrigin: string, accountId: string) => {
    try {
      console.info('Sending email verification for account creation');

      const variables = { urlOrigin, accountId };

      const response = (await apollo('POST', sendEmailConfirmEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email verification for account creation ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email verification for account creation ', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailConfirmEmailAddress) {
        return response.data.sendEmailConfirmEmailAddress;
      }

      console.error(response);
      throw new Error('Sending email verification for account creation');
    } catch (err) {
      console.error(err);
      throw new Error('Sending email verification for account creation');
    }
  },
  signIn: async (urlOrigin: string, email: string, password: string) => {
    try {
      console.info('Signing in account');

      const variables = { urlOrigin, email, password };

      const response = (await apollo('POST', accountSignInMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error signing in account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error signing in account ', response.networkError.result.errors);
      }

      if (response?.data?.accountSignIn) {
        return response.data.accountSignIn;
      }

      console.error(response);
      throw new Error('Signing in account');
    } catch (err) {
      console.error(err);
      throw new Error('Signing in account');
    }
  },
  signInSendNewCode: async (accountId: string) => {
    try {
      console.info('Sending new sign in code for account');

      const variables = { accountId };

      const response = (await apollo('POST', accountSignInSendNewCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending new sign in code for account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending new sign in code for account ', response.networkError.result.errors);
      }

      if (response?.data?.accountSignInSendNewCode) {
        return response.data.accountSignInSendNewCode;
      }

      console.error(response);
      throw new Error('Sending new sign in code for account');
    } catch (err) {
      console.error(err);
      throw new Error('Sending new sign in code for account');
    }
  },
  verifyAccountSignInCode: async (accountId: string, securityCode: string) => {
    try {
      console.info('Verifying account sign in code');

      const variables = { accountId, securityCode };

      const response = (await apollo('POST', verifyAccountSignInCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account sign in code ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account sign in code ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSignInCode) {
        return response.data.verifyAccountSignInCode;
      }

      console.error(response);
      throw new Error('Verifying account sign in code');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying account sign in code');
    }
  },
  verifyAccountSession: async (token: string) => {
    try {
      console.info('Verifying account session');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountSessionMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account session ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account session ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSession) {
        return response.data.verifyAccountSession;
      }

      console.error(response);
      throw new Error('Verifying account session');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying account session');
    }
  },
  sendEmailPasswordResetLink: async (urlOrigin: string, email: string) => {
    try {
      console.info('Sending email for account password reset');

      const variables = { urlOrigin, email };

      const response = (await apollo('POST', sendEmailPasswordResetLinkMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email for account password reset ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email for account password reset ', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailPasswordResetLink) {
        return response.data.sendEmailPasswordResetLink;
      }

      console.error(response);
      throw new Error('Sending email for account password reset');
    } catch (err) {
      console.error(err);
      throw new Error('Sending email for account password reset');
    }
  },
  sendEmailReactivateAccountLink: async (urlOrigin: string, accountId: string) => {
    try {
      console.info('Sending email for account reactivation');

      const variables = { urlOrigin, accountId };

      const response = (await apollo('POST', sendEmailReactivateAccountLinkMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email for account reactivation ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email for account reactivation ', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailReactivateAccountLink) {
        return response.data.sendEmailReactivateAccountLink;
      }

      console.error(response);
      throw new Error('Sending email for account reactivation');
    } catch (err) {
      console.error(err);
      throw new Error('Sending email for account reactivation');
    }
  },
  verifyPasswordResetToken: async (token: string) => {
    try {
      console.info('Verifying account password reset token');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountPasswordResetTokenQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account password reset token ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account password reset token ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountPasswordResetToken) {
        return response.data.verifyAccountPasswordResetToken;
      }

      console.error(response);
      throw new Error('Verifying account password reset token');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying account password reset token');
    }
  },
  passwordReset: async (token: string, password: string) => {
    try {
      console.info('Resetting account password');

      const variables = { token, password };

      const response = (await apollo('POST', accountPasswordResetMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error resetting account password ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error resetting account password ', response.networkError.result.errors);
      }

      if (response?.data?.accountPasswordReset) {
        return response.data.accountPasswordReset;
      }

      console.error(response);
      throw new Error('Resetting account password');
    } catch (err) {
      console.error(err);
      throw new Error('Resetting account password');
    }
  },
};

export default account;
