import apollo from '../../../../graphql/apollo';
import updateCompanyPostDataMigrationMutation from '../../../../graphql/mutations/update-application/companyPostDataMigration';
import { ApolloResponse } from '../../../../../types';

/**
 * updateCompanyPostDataMigration
 * Update an application's "company"
 * Note: this is only consumed by V1 applications that have been migrated to V2,
 * that do not have company data. Company data is required in V2.
 * @param {String} Company ID
 * @param {Object} Company update
 * @returns {Promise<Object>} Updated company
 */
const updateCompanyPostDataMigration = async (id: string, update: object) => {
  try {
    console.info('Updating application company (post data migration)');

    const variables = {
      id,
      company: update,
    };

    const response = (await apollo('POST', updateCompanyPostDataMigrationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application company (post data migration) %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application company (post data migration) %O', response.networkError.result.errors);
    }

    if (response?.data?.updateCompanyPostDataMigration) {
      return response.data.updateCompanyPostDataMigration;
    }

    console.error('Error with GraphQL updateCompanyPostDataMigration %O', response);

    throw new Error('Updating application company (post data migration)');
  } catch (error) {
    console.error('Error updating application company (post data migration) %O', error);
    throw new Error('Updating application company (post data migration)');
  }
};

export default updateCompanyPostDataMigration;
