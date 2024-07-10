import gql from 'graphql-tag';

const updateApplicationJointlyInsuredPartyMutation = gql`
  mutation updateJointlyInsuredParty($where: JointlyInsuredPartyWhereUniqueInput!, $data: JointlyInsuredPartyUpdateInput!) {
    updateJointlyInsuredParty(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationJointlyInsuredPartyMutation;
