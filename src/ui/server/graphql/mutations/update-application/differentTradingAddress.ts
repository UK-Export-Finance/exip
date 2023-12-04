import gql from 'graphql-tag';

const updateDifferentTradingAddressMutation = gql`
  mutation updateDifferentTradingAddress($where: DifferentTradingAddressWhereUniqueInput!, $data: DifferentTradingAddressUpdateInput!) {
    updateDifferentTradingAddress(where: $where, data: $data) {
      id
    }
  }
`;

export default updateDifferentTradingAddressMutation;
