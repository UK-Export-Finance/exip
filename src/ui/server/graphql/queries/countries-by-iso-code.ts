import gql from 'graphql-tag';

const countriesQuery = gql`
  query ($isoCode: String) {
    countries(where: { isoCode: { equals: $isoCode } }) {
      id
      name
      isoCode
    }
  }
`;

export default countriesQuery;
