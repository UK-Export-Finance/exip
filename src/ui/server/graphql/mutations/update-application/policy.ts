import gql from 'graphql-tag';

const updateApplicationPolicyMutation = gql`
  mutation updatePolicy($where: PolicyWhereUniqueInput!, $data: PolicyUpdateInput!) {
    updatePolicy(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationPolicyMutation;
