import gql from 'graphql-tag';

const updateApplicationExportContractAgentMutation = gql`
  mutation updateExportContract($where: ExportContractAgentWhereUniqueInput!, $data: ExportContractAgentUpdateInput!) {
    updateExportContractAgent(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractAgentMutation;
