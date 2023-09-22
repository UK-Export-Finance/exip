import gql from 'graphql-tag';

const countriesByIsoCodeQuery = gql`
  query countries($isoCode: String) {
    countries(where: { isoCode: { equals: $isoCode } }) {
      id
      name
      isoCode
    }
  }
`;

export default countriesByIsoCodeQuery;
