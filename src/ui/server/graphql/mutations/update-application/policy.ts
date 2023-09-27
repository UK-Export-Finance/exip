import gql from 'graphql-tag';

const updateApplicationPolicyMutation = gql`
  mutation ($where: PolicyWhereUniqueInput!, $data: PolicyUpdateInput!) {
    updatePolicy(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationPolicyMutation;
