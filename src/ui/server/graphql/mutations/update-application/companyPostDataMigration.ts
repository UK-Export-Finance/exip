import gql from 'graphql-tag';

const updateCompanyPostDataMigrationMutation = gql`
  mutation updateCompanyPostDataMigration($id: String!, $company: CompanyInput!) {
    updateCompanyPostDataMigration(id: $id, company: $company) {
      success
    }
  }
`;

export default updateCompanyPostDataMigrationMutation;
