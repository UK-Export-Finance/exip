import gql from 'graphql-tag';

const updateApplicationPolicyAndExportMutation = gql`
  mutation ($where: PolicyAndExportWhereUniqueInput!, $data: PolicyAndExportUpdateInput!) {
    updatePolicyAndExport(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationPolicyAndExportMutation;
