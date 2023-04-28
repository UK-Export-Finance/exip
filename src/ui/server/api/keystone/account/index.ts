import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';
import getExporterQuery from '../../../graphql/queries/account/get';
import verifyExporterEmailAddressMutation from '../../../graphql/mutations/account/verify-email-address';
import sendEmailConfirmEmailAddressMutation from '../../../graphql/mutations/account/send-email-confirm-email-address';
import accountSignInMutation from '../../../graphql/mutations/account/sign-in';
import accountSignInSendNewCodeMutation from '../../../graphql/mutations/account/sign-in-send-new-code';
import verifyAccountSignInCodeMutation from '../../../graphql/mutations/account/verify-sign-in-code';
import sendEmailPasswordResetLinkMutation from '../../../graphql/mutations/account/send-email-password-reset-link';
import verifyAccountSessionMutation from '../../../graphql/mutations/account/verify-session';
import accountPasswordResetMutation from '../../../graphql/mutations/account/password-reset';
import verifyAccountPasswordResetTokenQuery from '../../../graphql/queries/account/verify-account-password-reset-token';

const account = {
  create: async (variables: Account) => {
    try {
      console.info('Creating exporter account');

      const response = (await apollo('POST', createExporterMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.createAccount) {
        return response.data.createAccount;
      }

      console.error(response);
      throw new Error('Creating exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Creating exporter account');
    }
  },
  get: async (id: string) => {
    try {
      console.info('Getting exporter account');

      const variables = { id };

      const response = (await apollo('POST', getExporterQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.exporter) {
        return response.data.exporter;
      }

      console.error(response);
      throw new Error('Getting exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Getting exporter account');
    }
  },
  verifyEmailAddress: async (token: string) => {
    try {
      console.info('Verifying exporter email address');

      const variables = { token };

      const response = (await apollo('POST', verifyExporterEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying exporter email address ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying exporter email address ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountEmailAddress) {
        return response.data.verifyAccountEmailAddress;
      }

      console.error(response);
      throw new Error('Verifying exporter email address');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying exporter email address');
    }
  },
  sendEmailConfirmEmailAddress: async (exporterId: string) => {
    try {
      console.info('Sending email verification for account creation');

      const variables = { exporterId };

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
  signIn: async (email: string, password: string) => {
    try {
      console.info('Signing in exporter account');

      const variables = { email, password };

      const response = (await apollo('POST', accountSignInMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error signing in exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error signing in exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.accountSignIn) {
        return response.data.accountSignIn;
      }

      console.error(response);
      throw new Error('Signing in exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Signing in exporter account');
    }
  },
  signInSendNewCode: async (accountId: string) => {
    try {
      console.info('Sending new sign in code for exporter account');

      const variables = { accountId };

      const response = (await apollo('POST', accountSignInSendNewCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending new sign in code for exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending new sign in code for exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.accountSignInSendNewCode) {
        return response.data.accountSignInSendNewCode;
      }

      console.error(response);
      throw new Error('Sending new sign in code for exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Sending new sign in code for exporter account');
    }
  },
  verifyAccountSignInCode: async (accountId: string, securityCode: string) => {
    try {
      console.info('Verifying exporter account sign in code');

      const variables = { accountId, securityCode };

      const response = (await apollo('POST', verifyAccountSignInCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying exporter account sign in code ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying exporter account sign in code ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSignInCode) {
        return response.data.verifyAccountSignInCode;
      }

      console.error(response);
      throw new Error('Verifying exporter account sign in code');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying exporter account sign in code');
    }
  },
  verifyAccountSession: async (token: string) => {
    try {
      console.info('Verifying exporter account session');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountSessionMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying exporter account session ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying exporter account session ', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSession) {
        return response.data.verifyAccountSession;
      }

      console.error(response);
      throw new Error('Verifying exporter account session');
    } catch (err) {
      console.error(err);
      throw new Error('Verifying exporter account session');
    }
  },
  sendEmailPasswordResetLink: async (email: string) => {
    try {
      console.info('Sending email for account password reset');

      const variables = { email };

      const response = (await apollo('POST', sendEmailPasswordResetLinkMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending new sign in code for exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending new sign in code for exporter account ', response.networkError.result.errors);
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
