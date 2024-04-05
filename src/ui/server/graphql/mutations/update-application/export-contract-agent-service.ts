import gql from 'graphql-tag';

const updateApplicationExportContractAgentServiceMutation = gql`
  mutation updateExportContract($where: ExportContractAgentServiceWhereUniqueInput!, $data: ExportContractAgentServiceUpdateInput!) {
    updateExportContractAgentService(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractAgentServiceMutation;
