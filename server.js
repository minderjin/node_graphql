var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// var root = { hello: () => 'Hello World!' };
var root = {
    hello: function() {
        return 'Hello World!'
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
// app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
app.listen(4000, function() {
    console.log('Now browse to localhost:4000/graphql')
});
