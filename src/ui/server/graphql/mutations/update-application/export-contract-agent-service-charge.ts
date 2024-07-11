import gql from 'graphql-tag';

const updateApplicationExportContractAgentServiceChargeMutation = gql`
  mutation updateExportContractAgentServiceCharge(
    $where: ExportContractAgentServiceChargeWhereUniqueInput!
    $data: ExportContractAgentServiceChargeUpdateInput!
  ) {
    updateExportContractAgentServiceCharge(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationExportContractAgentServiceChargeMutation;
