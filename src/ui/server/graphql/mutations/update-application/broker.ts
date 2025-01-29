import gql from 'graphql-tag';

const updateBrokerMutation = gql`
  mutation updateBroker($where: BrokerWhereUniqueInput!, $data: BrokerUpdateInput!) {
    updateBroker(where: $where, data: $data) {
      id
      isUsingBroker
      name
      email
      addressLine1
      addressLine2
      town
      county
      postcode
      fullAddress
      isBasedInUk
      postcode
      buildingNumberOrName
    }
  }
`;

export default updateBrokerMutation;
