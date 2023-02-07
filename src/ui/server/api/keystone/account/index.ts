import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';

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

      throw new Error(`Creating exporter account ${response}`);
    } catch (err) {
      throw new Error(`Creating exporter account ${err}`);
    }
  },
};

export default account;
