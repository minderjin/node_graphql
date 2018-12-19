/**
 * Created by lenovo on 2017-07-06.
 */
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// var root = { hello: () => 'Hello world!' };
var root = { hello: function() { return 'Hello world!'; } };

// graphql(schema, '{hello}', root).then((response) => {
//     console.log(response);
// });
graphql(schema, '{hello}', root).then(function(response) {
    console.log(response);
});
