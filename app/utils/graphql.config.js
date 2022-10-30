const { graphql_Schema } = require("../graphQL/index.graphQL");

function graphqlConfig(req, res) {
  return {
    schema: graphql_Schema,
    graphiql: true,
    context: { req, res },
  };
}

module.exports = {
  graphqlConfig,
};
