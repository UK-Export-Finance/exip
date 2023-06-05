import gql from 'graphql-tag';

const updateBusinessContactMutation = gql`
  mutation ($where: BusinessContactDetailWhereUniqueInput!, $data: BusinessContactDetailUpdateInput!) {
    updateBusinessContactDetail(where: $where, data: $data) {
      id
    }
  }
`;

export default updateBusinessContactMutation;
