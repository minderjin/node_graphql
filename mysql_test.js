/**
 * Created by lenovo on 2017-07-06.
 */
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var pool = require('./mysql').init(app);
var model = require('./model');
model.init(pool);

// @getUser
var newUser = function(id) {
    console.log("newUser() 호출. id: "+ id);

    var promise = new Promise(function(resolve, reject) {
        model.getUser(id, function(err, rows) {
            console.log("model.getUser() 호출.")
            var user = {};
            if(err) {
                reject('getUser 호출 중 오류 : ' + err.stack);
                return;
            }

            if(rows) {
                user = new User(rows[0].id, rows[0].name, rows[0].tel, rows[0].company);
                resolve(user);
            } else {
                reject("no user ...");
            }
        });
    });

    return promise.then(function(value) {
        console.dir(value);
        return value;
    }, function(reason) {
        console.log(reason);
    });
}

// @company
var newCompany = function(compId) {
    console.log("newCompany() 호출. compId: "+ compId);

    var promise = new Promise(function(resolve, reject) {
        model.getCompany(compId, function(err, rows) {
            var company = {};
            if(err) {
                reject('getCompany 호출 중 오류 : ' + err.stack);
                return;
            }

            if(rows) {
                company = new Company(rows[0].id, rows[0].name, rows[0].corp_number);
                resolve(company);
            } else {
                reject("no company ...");
            }
        });
    });

    return promise.then(function(value) {
        return value;
    }, function(reason) {
        console.log(reason);
    });
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type User {
    id: Int!
        name: String!
        tel: String
    compId: String
    company: Company
}

type Company {
        compId: Int!
        name: String!
        corp_number: String
    }
    
    type Query {
        getUser(id: Int): User
    }
`);


// This class implements the User GraphQL type
class User {
    constructor(id, name, tel, compId) {
        this.id = id;
        this.name = name;
        this.tel = tel;
        this.compId = compId;
    }

    setField(id, name, tel, compId) {
        this.id = id;
        this.name = name;
        this.tel = tel;
        this.compId = compId;
    }

    company() {
        return newCompany(this.compId);
    }
}

// This class implements the Company GraphQL type
class Company {
    constructor(compId, name, corp_number) {
        this.compId = compId;
        this.name = name;
        this.corp_number = corp_number;
    }
}

// The root provides the top-level API endpoints
var root = {
    getUser: function ({id}) {
        return newUser(id);
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
