import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';
import getExporterByEmailQuery from '../../../graphql/queries/account/get-by-email';
import verifyExporterEmailAddressMutation from '../../../graphql/mutations/account/verify-email-address';
import sendEmailConfirmEmailAddressMutation from '../../../graphql/mutations/account/send-email-confirm-email-address';

const account = {
  create: async (update: Account) => {
    try {
      console.info('Creating exporter account');

      const variables = { data: update };

      const response = (await apollo('POST', createExporterMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating exporter account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating exporter account ', response.networkError.result.errors);
      }

      if (response?.data?.createAccount) {
        const { data } = response;

        return data.createAccount;
      }

      console.error(response);
      throw new Error('Creating exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Creating exporter account');
    }
  },
  getByEmail: async (email: string) => {
    try {
      console.info('Getting exporter account by email');

      const variables = { email };

      const response = (await apollo('POST', getExporterByEmailQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting exporter account by email ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting exporter account by email ', response.networkError.result.errors);
      }

      if (response?.data?.getAccountByEmail) {
        const { data } = response;

        return data.getAccountByEmail;
      }

      console.error(response);
      throw new Error('Getting exporter account by email');
    } catch (err) {
      console.error(err);
      throw new Error('Getting exporter account by email');
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
        const { data } = response;

        return data.verifyAccountEmailAddress;
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
        const { data } = response;

        return data.sendEmailConfirmEmailAddress;
      }

      console.error(response);
      throw new Error('Sending email verification for account creation');
    } catch (err) {
      console.error(err);
      throw new Error('Sending email verification for account creation');
    }
  },
};

export default account;
