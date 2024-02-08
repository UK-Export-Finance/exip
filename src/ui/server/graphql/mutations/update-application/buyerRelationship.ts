import gql from 'graphql-tag';

const updateBuyerRelationshipMutation = gql`
  mutation updateBuyerRelationship($where: BuyerRelationshipWhereUniqueInput!, $data: BuyerRelationshipUpdateInput!) {
    updateBuyerRelationship(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBuyerRelationshipMutation;
