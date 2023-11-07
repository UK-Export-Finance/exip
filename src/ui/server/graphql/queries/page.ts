import gql from 'graphql-tag';

const pageQuery = gql`
  query page($id: ID) {
    page(where: { id: $id }) {
      heading
      content {
        document
      }
    }
  }
`;

export default pageQuery;
