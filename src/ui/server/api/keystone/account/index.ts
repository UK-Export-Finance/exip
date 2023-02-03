import { ApolloResponse, Account } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createExporterMutation from '../../../graphql/mutations/account/create';

const account = {
  create: async (update: Account) => {
    try {
      console.info('Creating account');

      const variables = { data: update };

      const response = (await apollo('POST', createExporterMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating account ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating account ', response.networkError.result.errors);
      }

      if (response?.data?.createExporter) {
        const { data } = response;

        return data.createExporter;
      }

      throw new Error('Creating account');
    } catch (err) {
      throw new Error(`Creating account ${err}`);
    }
  },
};

export default account;
