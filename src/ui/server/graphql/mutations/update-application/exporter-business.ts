import gql from 'graphql-tag';

const updateExporterBusinessMutation = gql`
  mutation ($where: ExporterBusinessWhereUniqueInput!, $data: ExporterBusinessUpdateInput!) {
    updateExporterBusiness(where: $where, data: $data) {
      id
    }
  }
`;

export default updateExporterBusinessMutation;
