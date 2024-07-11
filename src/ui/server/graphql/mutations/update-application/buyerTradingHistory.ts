import gql from 'graphql-tag';

const updateBuyerTradingHistoryMutation = gql`
  mutation updateBuyerTradingHistory($where: BuyerTradingHistoryWhereUniqueInput!, $data: BuyerTradingHistoryUpdateInput!) {
    updateBuyerTradingHistory(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBuyerTradingHistoryMutation;
