import gql from 'graphql-tag';

const updateApplicationCompanyMutation = gql`
  mutation updateCompany($where: CompanyWhereUniqueInput!, $data: CompanyUpdateInput!) {
    updateCompany(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationCompanyMutation;
