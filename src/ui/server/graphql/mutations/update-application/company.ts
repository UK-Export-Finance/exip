import gql from 'graphql-tag';

const updateCompanyAndExporterCompanyAddressMutation = gql`
  mutation ($companyId: ID!, $companyAddressId: ID!, $data: CompanyAndExporterCompanyAddressInput!) {
    updateCompanyAndExporterCompanyAddress(companyId: $companyId, companyAddressId: $companyAddressId, data: $data) {
      id
    }
  }
`;

export default updateCompanyAndExporterCompanyAddressMutation;
