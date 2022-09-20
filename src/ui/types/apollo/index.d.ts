type ApolloResponseError = {
  message: string;
  locations: Array<any>;
  extensions: any;
};

type ApolloResponseNetworkErrorResult = {
  errors?: Array<ApolloResponseError>;
};

type ApolloResponseNetworkError = {
  result: ApolloResponseNetworkErrorResult;
};

interface ApolloResponse {
  errors: Array<ApolloResponseError>;
  networkError: ApolloResponseNetworkError;
  data: any;
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export { ApolloResponse };
