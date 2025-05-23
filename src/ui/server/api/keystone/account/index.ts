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
import verifyAccountReactivationTokenMutation from '../../../graphql/mutations/account/verify-account-reactivation-token';
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
        console.error('GraphQL error creating an account %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating an account %o', response.networkError.result.errors);
      }

      if (response?.data?.createAnAccount) {
        return response.data.createAnAccount;
      }

      console.error('Error with GraphQL createAccountMutation query %o', response);

      throw new Error('Creating an account');
    } catch (error) {
      console.error('Error creating an account %o', error);

      throw new Error('Creating an account');
    }
  },
  get: async (id: string) => {
    try {
      console.info('Getting an account');

      const variables = { id };

      const response = (await apollo('POST', getAccountQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting an account %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting an account %o', response.networkError.result.errors);
      }

      if (response?.data?.account) {
        return response.data.account;
      }

      console.error('Error with GraphQL getAccountQuery %o', response);

      throw new Error('Getting an account');
    } catch (error) {
      console.error('Error getting an account %o', error);

      throw new Error('Getting an account');
    }
  },
  verifyEmailAddress: async (token: string, id: string) => {
    try {
      console.info('Verifying account email address');

      const variables = { token, id };

      const response = (await apollo('POST', verifyAccountEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account email address %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account email address %o', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountEmailAddress) {
        return response.data.verifyAccountEmailAddress;
      }

      console.error('Error with GraphQL verifyAccountEmailAddressMutation %o', response);

      throw new Error('Verifying account email address');
    } catch (error) {
      console.error('Error verifying account email address %o', error);

      throw new Error('Verifying account email address');
    }
  },
  sendEmailConfirmEmailAddress: async (urlOrigin: string, accountId: string) => {
    try {
      console.info('Sending email verification for account creation %s %s', urlOrigin, accountId);

      const variables = { urlOrigin, accountId };

      const response = (await apollo('POST', sendEmailConfirmEmailAddressMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email verification for account creation %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email verification for account creation %o', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailConfirmEmailAddress) {
        return response.data.sendEmailConfirmEmailAddress;
      }

      console.error('Error with GraphQL sendEmailConfirmEmailAddressMutation %o', response);

      throw new Error('Sending email verification for account creation');
    } catch (error) {
      console.error('Error sending email verification for account creation %o', error);

      throw new Error('Sending email verification for account creation');
    }
  },
  signIn: async (urlOrigin: string, email: string, password: string) => {
    try {
      console.info('Signing in account');

      const variables = { urlOrigin, email, password };

      const response = (await apollo('POST', accountSignInMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error signing in account %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error signing in account %o', response.networkError.result.errors);
      }

      if (response?.data?.accountSignIn) {
        return response.data.accountSignIn;
      }

      console.error('Error with GraphQL accountSignInMutation %o', response);

      throw new Error('Signing in account');
    } catch (error) {
      console.error('Error signing into account %o', error);

      throw new Error('Signing in account');
    }
  },
  signInSendNewCode: async (accountId: string) => {
    try {
      console.info('Sending new sign in code for account');

      const variables = { accountId };

      const response = (await apollo('POST', accountSignInSendNewCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending new sign in code for account %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending new sign in code for account %o', response.networkError.result.errors);
      }

      if (response?.data?.accountSignInSendNewCode) {
        return response.data.accountSignInSendNewCode;
      }

      console.error('Error with GraphQL accountSignInSendNewCodeMutation %o', response);

      throw new Error('Sending new sign in code for account');
    } catch (error) {
      console.error('Error sending new sign in code for account %o', error);

      throw new Error('Sending new sign in code for account');
    }
  },
  verifyAccountSignInCode: async (accountId: string, securityCode: string) => {
    try {
      console.info('Verifying account sign in code');

      const variables = { accountId, securityCode };

      const response = (await apollo('POST', verifyAccountSignInCodeMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account sign in code %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account sign in code %o', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSignInCode) {
        return response.data.verifyAccountSignInCode;
      }

      console.error('Error with GraphQL verifyAccountSignInCodeMutation %o', response);

      throw new Error('Verifying account sign in code');
    } catch (error) {
      console.error('Error verifying account sign in code %o', error);

      throw new Error('Verifying account sign in code');
    }
  },
  verifyAccountSession: async (token: string) => {
    try {
      console.info('Verifying account session');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountSessionMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account session %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account session %o', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountSession) {
        return response.data.verifyAccountSession;
      }

      console.error('Error with GraphQL verifyAccountSessionMutation %o', response);

      throw new Error('Verifying account session');
    } catch (error) {
      console.error('Error verifying account session %o', error);

      throw new Error('Verifying account session');
    }
  },
  sendEmailPasswordResetLink: async (urlOrigin: string, email: string) => {
    try {
      console.info('Sending email for account password reset');

      const variables = { urlOrigin, email };

      const response = (await apollo('POST', sendEmailPasswordResetLinkMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email for account password reset %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email for account password reset %o', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailPasswordResetLink) {
        return response.data.sendEmailPasswordResetLink;
      }

      console.error('Error with GraphQL sendEmailPasswordResetLinkMutation %o', response);

      throw new Error('Sending email for account password reset');
    } catch (error) {
      console.error('Error sending email for account password reset %o', error);

      throw new Error('Sending email for account password reset');
    }
  },
  sendEmailReactivateAccountLink: async (urlOrigin: string, accountId: string) => {
    try {
      console.info('Sending email for account reactivation');

      const variables = { urlOrigin, accountId };

      const response = (await apollo('POST', sendEmailReactivateAccountLinkMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending email for account reactivation %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending email for account reactivation %o', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailReactivateAccountLink) {
        return response.data.sendEmailReactivateAccountLink;
      }

      console.error('Error with GraphQL sendEmailReactivateAccountLinkMutation %o', response);

      throw new Error('Sending email for account reactivation');
    } catch (error) {
      console.error('Error sending email for account reactivation %o', error);

      throw new Error('Sending email for account reactivation');
    }
  },
  verifyAccountReactivationToken: async (token: string) => {
    try {
      console.info('Verifying account reactivation token');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountReactivationTokenMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account reactivation token %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account reactivation token %o', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountReactivationToken) {
        return response.data.verifyAccountReactivationToken;
      }

      console.error('Error with GraphQL verifyAccountReactivationTokenMutation %o', response);

      throw new Error('Verifying account reactivation token');
    } catch (error) {
      console.error('Error verifying account reactivation token %o', error);

      throw new Error('Verifying account reactivation token');
    }
  },
  verifyPasswordResetToken: async (token: string) => {
    try {
      console.info('Verifying account password reset token');

      const variables = { token };

      const response = (await apollo('POST', verifyAccountPasswordResetTokenQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error verifying account password reset token %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error verifying account password reset token %o', response.networkError.result.errors);
      }

      if (response?.data?.verifyAccountPasswordResetToken) {
        return response.data.verifyAccountPasswordResetToken;
      }

      console.error('Error with GraphQL verifyAccountPasswordResetTokenQuery %o', response);

      throw new Error('Verifying account password reset token');
    } catch (error) {
      console.error('Error verifying account password reset token %o', error);

      throw new Error('Verifying account password reset token');
    }
  },
  passwordReset: async (token: string, password: string) => {
    try {
      console.info('Resetting account password');

      const variables = { token, password };

      const response = (await apollo('POST', accountPasswordResetMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error resetting account password %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error resetting account password %o', response.networkError.result.errors);
      }

      if (response?.data?.accountPasswordReset) {
        return response.data.accountPasswordReset;
      }

      console.error('Error with GraphQL accountPasswordResetMutation %o', response);

      throw new Error('Resetting account password');
    } catch (error) {
      console.error('Error resetting account password %o', error);

      throw new Error('Resetting account password');
    }
  },
};

export default account;
