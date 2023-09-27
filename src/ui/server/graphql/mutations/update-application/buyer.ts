import gql from 'graphql-tag';

const updateBuyerMutation = gql`
  mutation updateBuyer($where: BuyerWhereUniqueInput!, $data: BuyerUpdateInput!) {
    updateBuyer(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBuyerMutation;
