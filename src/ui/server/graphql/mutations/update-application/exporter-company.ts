import gql from 'graphql-tag';

const updateCompanyAndCompanyAddressMutation = gql`
  mutation ($companyId: ID!, $companyAddressId: ID!, $data: ExporterCompanyAndCompanyAddressInput!) {
    updateExporterCompanyAndCompanyAddress(companyId: $id, companyAddressId: $companyAddressId, data: $data) {
      id
    }
  }
`;

export default updateCompanyAndCompanyAddressMutation;
