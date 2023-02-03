import gql from 'graphql-tag';

const createExporterMutation = gql`
  mutation CreateExporter($data: ExporterCreateInput!) {
    createExporter(data: $data) {
      firstName
      lastName
      email
    }
  }
`;

export default createExporterMutation;
