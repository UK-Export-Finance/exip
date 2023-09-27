import gql from 'graphql-tag';

const updateBusinessMutation = gql`
  mutation updateBusiness($where: BusinessWhereUniqueInput!, $data: BusinessUpdateInput!) {
    updateBusiness(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBusinessMutation;
