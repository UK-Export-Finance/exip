import gql from 'graphql-tag';

const updateSectionReviewMutation = gql`
  mutation updateSectionReview($where: SectionReviewWhereUniqueInput!, $data: SectionReviewUpdateInput!) {
    updateSectionReview(where: $where, data: $data) {
      id
    }
  }
`;

export default updateSectionReviewMutation;
