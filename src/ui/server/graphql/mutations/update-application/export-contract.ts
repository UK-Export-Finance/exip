import gql from 'graphql-tag';

const updateApplicationExportContractMutation = gql`
  mutation updateExportContract($where: ExportContractWhereUniqueInput!, $data: ExportContractUpdateInput!) {
    updateExportContract(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractMutation;
