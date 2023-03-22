import gql from 'graphql-tag';

const getDeclarationConfirmationAndAcknowledgementyQuery = gql`
  query {
    declarationConfirmationAndAcknowledgements(orderBy: { version: desc }, take: 1) {
      id
      version
      content {
        document
      }
    }
  }
`;

export default getDeclarationConfirmationAndAcknowledgementyQuery;
