import gql from 'graphql-tag';

const updateApplicationExportContractAgentMutation = gql`
  mutation updateExportContractAgent($where: ExportContractAgentWhereUniqueInput!, $data: ExportContractAgentUpdateInput!) {
    updateExportContractAgent(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractAgentMutation;
