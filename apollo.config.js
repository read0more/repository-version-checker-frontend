module.exports = {
  client: {
    name: "client",
    includes: ["apollo/**/*.ts"],
    tagName: "gql",
    addTypename: true,
    service: {
      name: "sever",
      url: process.env.GRAPHQL_URL,
    },
  },
};
