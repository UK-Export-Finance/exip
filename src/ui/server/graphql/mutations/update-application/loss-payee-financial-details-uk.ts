import gql from 'graphql-tag';

const updateLossPayeeFinancialDetailsUkMutation = gql`
  mutation updateLossPayeeFinancialDetailsUk($id: String!, $accountNumber: String!, $sortCode: String!, $bankAddress: String!) {
    updateLossPayeeFinancialDetailsUk(id: $id, accountNumber: $accountNumber, sortCode: $sortCode, bankAddress: $bankAddress) {
      success
    }
  }
`;

export default updateLossPayeeFinancialDetailsUkMutation;
