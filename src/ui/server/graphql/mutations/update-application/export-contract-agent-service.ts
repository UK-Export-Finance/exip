import gql from 'graphql-tag';

const updateApplicationExportContractAgentServiceMutation = gql`
  mutation updateExportContractAgentService($where: ExportContractAgentServiceWhereUniqueInput!, $data: ExportContractAgentServiceUpdateInput!) {
    updateExportContractAgentService(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractAgentServiceMutation;
