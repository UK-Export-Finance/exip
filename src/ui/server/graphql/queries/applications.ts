import gql from 'graphql-tag';

const applicationsQuery = gql`
  query {
    applications {
      referenceNumber
    }
  }
`;

export default applicationsQuery;
