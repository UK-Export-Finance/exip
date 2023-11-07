import gql from 'graphql-tag';

const getDeclarationConfirmationAndAcknowledgementQuery = gql`
  query declarationConfirmationAndAcknowledgements {
    declarationConfirmationAndAcknowledgements(orderBy: { version: desc }, take: 1) {
      id
      version
      content {
        document
      }
    }
  }
`;

export default getDeclarationConfirmationAndAcknowledgementQuery;
