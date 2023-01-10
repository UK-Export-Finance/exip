import gql from 'graphql-tag';

const updateCompanyAndCompanyAddressMutation = gql`
  mutation ($companyId: ID!, $companyAddressId: ID!, $data: ExporterCompanyAndCompanyAddressInput!) {
    updateExporterCompanyAndCompanyAddress(companyId: $companyId, companyAddressId: $companyAddressId, data: $data) {
      id
    }
  }
`;

export default updateCompanyAndCompanyAddressMutation;
