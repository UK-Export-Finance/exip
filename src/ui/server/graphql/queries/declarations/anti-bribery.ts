import gql from 'graphql-tag';

const getDeclarationAntiBriberyQuery = gql`
  query declarationAntiBriberies {
    declarationAntiBriberies(orderBy: { version: desc }, take: 1) {
      id
      version
      content {
        document
      }
    }
  }
`;

export default getDeclarationAntiBriberyQuery;
