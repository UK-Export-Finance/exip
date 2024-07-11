import gql from 'graphql-tag';

const updateApplicationNominatedLossPayeeMutation = gql`
  mutation updateNominatedLossPayee($where: NominatedLossPayeeWhereUniqueInput!, $data: NominatedLossPayeeUpdateInput!) {
    updateNominatedLossPayee(where: $where, data: $data) {
      id
    }
  }
`;

export default updateApplicationNominatedLossPayeeMutation;
