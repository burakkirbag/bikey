const { gql } = require('apollo-server');


module.exports = gql`

    extend type Query {
        login(username:String!, password: String!) : AuthUser!
        currentUser : User
    }

    type User {
        id: Int,
        username: String,
        firstName : String,
        lastName : String
    }

    type AuthUser {
        user : User!,
        token : String!
    }
`;