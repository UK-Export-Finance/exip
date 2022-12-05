import gql from 'graphql-tag';

const applicationQuery = gql`
  query ($referenceNumber: ID) {
    referenceNumber(where: { id: $referenceNumber }) {
      id
      application {
        id
        createdAt
        updatedAt
        submissionDeadline
        submissionType
      }
    }
  }
`;

export default applicationQuery;
