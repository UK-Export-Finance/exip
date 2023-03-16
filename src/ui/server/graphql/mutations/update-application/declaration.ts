import gql from 'graphql-tag';

const updateApplicationDeclarationMutation = gql`
  mutation ($where: DeclarationWhereUniqueInput!, $data: DeclarationUpdateInput!) {
    updateDeclaration(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationDeclarationMutation;
