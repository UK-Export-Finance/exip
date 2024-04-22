import gql from 'graphql-tag';

const updateLossPayeeFinancialDetailsInternationalMutation = gql`
  mutation updateLossPayeeFinancialDetailsInternational($id: String!, $iban: String!, $bicSwiftCode: String!, $bankAddress: String!) {
    updateLossPayeeFinancialDetailsInternational(id: $id, iban: $iban, bicSwiftCode: $bicSwiftCode, bankAddress: $bankAddress) {
      success
    }
  }
`;

export default updateLossPayeeFinancialDetailsInternationalMutation;
