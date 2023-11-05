import gql from 'graphql-tag';

const updateCompanyAndCompanyAddressMutation = gql`
  mutation updateCompanyAndCompanyAddress($companyId: ID!, $companyAddressId: ID!, $data: CompanyAndCompanyAddressInput!) {
    updateCompanyAndCompanyAddress(companyId: $companyId, companyAddressId: $companyAddressId, data: $data) {
      id
    }
  }
`;

export default updateCompanyAndCompanyAddressMutation;
