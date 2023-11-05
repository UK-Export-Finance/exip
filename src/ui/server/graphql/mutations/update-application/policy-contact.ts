import gql from 'graphql-tag';

const updateApplicationPolicyContactMutation = gql`
  mutation updatePolicyContact($where: PolicyContactWhereUniqueInput!, $data: PolicyContactUpdateInput!) {
    updatePolicyContact(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationPolicyContactMutation;
