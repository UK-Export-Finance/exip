import gql from 'graphql-tag';

const updateExporterBrokerMutation = gql`
  mutation ($where: ExporterBrokerWhereUniqueInput!, $data: ExporterBrokerUpdateInput!) {
    updateExporterBroker(where: $where, data: $data) {
      id
    }
  }
`;

export default updateExporterBrokerMutation;
