import gql from 'graphql-tag';

const getAccountQuery = gql`
  query GetAccount($id: ID!) {
    exporter(where: { id: $id }) {
      id
      email
    }
  }
`;

export default getAccountQuery;
