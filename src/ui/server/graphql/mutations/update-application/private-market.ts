import gql from 'graphql-tag';

const updateApplicationPrivateMarketMutation = gql`
  mutation updatePrivateMarket($where: PrivateMarketWhereUniqueInput!, $data: PrivateMarketUpdateInput!) {
    updatePrivateMarket(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationPrivateMarketMutation;
