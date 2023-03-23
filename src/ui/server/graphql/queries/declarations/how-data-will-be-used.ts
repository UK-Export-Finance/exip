import gql from 'graphql-tag';

const getDeclarationHowDataWillBeUsedQuery = gql`
  query {
    declarationHowDataWillBeUseds(orderBy: { version: desc }, take: 1) {
      id
      version
      content {
        document
      }
    }
  }
`;

export default getDeclarationHowDataWillBeUsedQuery;
