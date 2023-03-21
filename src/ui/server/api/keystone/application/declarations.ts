import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import updateApplicationDeclarationMutation from '../../../graphql/mutations/update-application/declaration';

const declarations = {
  update: async (id: string, update: object) => {
    try {
      console.info('Updating application declaration');

      const variables = {
        where: { id },
        data: update,
      };

      const response = (await apollo('POST', updateApplicationDeclarationMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating application declaration ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating application declaration ', response.networkError.result.errors);
      }

      if (response?.data?.updateDeclaration) {
        return response.data.updateDeclaration;
      }

      console.error(response);
      throw new Error('Updating application declaration');
    } catch (err) {
      console.error(err);
      throw new Error('Updating application declaration');
    }
  },
};

export default declarations;
