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

      console.error(response);
      throw new Error('Creating exporter account');
    } catch (err) {
      console.error(err);
      throw new Error('Creating exporter account');
    }
  },
};

export default account;
