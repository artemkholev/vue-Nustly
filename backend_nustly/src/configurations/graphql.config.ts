export const GraphQLModuleConfig = () => ({
  autoSchemaFile: 'schema.gql',
  sortSchema: true,
  playground: true,
  // driver:,
  cors: {
    credentials: true,
    origin: ['*'],
  },
  context: ({ req, res }) => ({ req, res }),
});
