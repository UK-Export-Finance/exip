import gql from 'graphql-tag';

const updateApplicationDeclarationModernSlaveryMutation = gql`
  mutation updateDeclarationModernSlavery($where: DeclarationModernSlaveryWhereUniqueInput!, $data: DeclarationModernSlaveryUpdateInput!) {
    updateDeclarationModernSlavery(where: $where, data: $data) {
      willAdhereToAllRequirements
      hasNoOffensesOrInvestigations
      isNotAwareOfExistingSlavery
      cannotAdhereToAllRequirements
      offensesOrInvestigations
      awareOfExistingSlavery
    }
  }
`;

export default updateApplicationDeclarationModernSlaveryMutation;
