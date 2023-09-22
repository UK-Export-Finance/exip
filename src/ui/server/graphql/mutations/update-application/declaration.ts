import gql from 'graphql-tag';

const updateApplicationDeclarationMutation = gql`
  mutation updateDeclaration($where: DeclarationWhereUniqueInput!, $data: DeclarationUpdateInput!) {
    updateDeclaration(where: $where, data: $data) {
      agreeToConfidentiality
      agreeToAntiBribery
      hasAntiBriberyCodeOfConduct
      willExportWithAntiBriberyCodeOfConduct
      agreeToConfirmationAndAcknowledgements
      agreeHowDataWillBeUsed
    }
  }
`;

export default updateApplicationDeclarationMutation;
