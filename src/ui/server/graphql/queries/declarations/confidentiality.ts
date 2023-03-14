import gql from 'graphql-tag';

const declarationConfidentialityQuery = gql`
  query {
    declarationConfidentialities(orderBy: { version: desc }, take: 1) {
      id
      version
      content {
        document
      }
    }
  }
`;

export default declarationConfidentialityQuery;
