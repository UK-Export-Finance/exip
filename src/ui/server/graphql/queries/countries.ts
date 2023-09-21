import gql from 'graphql-tag';

const countriesQuery = gql`
  query countries {
    countries {
      id
      name
      isoCode
    }
  }
`;

export default countriesQuery;
