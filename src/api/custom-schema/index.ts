import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import typeDefs from './type-defs';
import customResolvers from '../custom-resolvers';

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs,
    resolvers: customResolvers,
  });
