import gql from 'graphql-tag';

const countriesQuery = gql`
  query {
    countries {
      id
      name
      isoCode
    }
  }
`;

export default countriesQuery;
