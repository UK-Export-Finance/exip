import gql from 'graphql-tag';

const updateCompanyAndCompanyAddressMutation = gql`
  mutation ($companyId: ID!, $companyAddressId: ID!, $data: ApplicationCompanyAndCompanyAddressInput!) {
    updateApplicationCompanyAndCompanyAddress(companyId: $id, companyAddressId: $companyAddressId, data: $data) {
      id
    }
  }
`;

export default updateCompanyAndCompanyAddressMutation;
