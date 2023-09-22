import { ALLOWED_GRAPHQL_RESOLVERS } from '../constants';

interface ApolloOperation {
  operationName?: string;
}

interface ApolloDidResolveOperation {
  request: ApolloOperation;
}

export const requestDidStart = () => ({
  /**
   * The didResolveOperation event fires after the graphql library successfully determines the operation to execute.
   * At this stage, the operationName is available.
   * When this event fires, your resolvers have not yet executed.
   * https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference/#didresolveoperation
   *
   * KeystoneJS automatically generates many GraphQL resolvers that we do not use or need.
   * Therefore, We use this event to check that a requested operation is allowed to be executed,
   * via an explicit list of allowed resolvers.
   */
  didResolveOperation({ request }: ApolloDidResolveOperation) {
    if (!request.operationName || (request.operationName && !ALLOWED_GRAPHQL_RESOLVERS.includes(request.operationName))) {
      throw new Error('Operation not permitted');
    }
  },
});

/**
 * Apollo plugins
 * This is passed to the KeystoneJS graphql/apollo config.
 */
const apolloPlugins = [{ requestDidStart }] as Array<object>;

export default apolloPlugins;
