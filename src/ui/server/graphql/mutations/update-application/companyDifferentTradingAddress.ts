import gql from 'graphql-tag';

const updateCompanyDifferentTradingAddressMutation = gql`
  mutation updateCompanyDifferentTradingAddress($where: CompanyDifferentTradingAddressWhereUniqueInput!, $data: CompanyDifferentTradingAddressUpdateInput!) {
    updateCompanyDifferentTradingAddress(where: $where, data: $data) {
      id
    }
  }
`;

export default updateCompanyDifferentTradingAddressMutation;
