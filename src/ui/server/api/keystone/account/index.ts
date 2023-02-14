import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';
import verifyExporterEmailAddressMutation from '../../../graphql/mutations/account/verify-email-address';

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
};

export default account;
