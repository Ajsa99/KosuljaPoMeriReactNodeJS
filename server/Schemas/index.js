const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = graphql;
const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                userData.push({
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                });
                return args;
            },
        },
        // updateUser: {
        //     type: UserType, // Pretpostavljam da je UserType tip koji predstavlja korisnika
        //     args: {
        //         id: { type: GraphQLInt },
        //         firstName: { type: GraphQLString },
        //         lastName: { type: GraphQLString },
        //         email: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //     },
        //     resolve(parent, args) {
        //         const userIdToUpdate = args.id;
        //         // Pronađi korisnika u izvoru podataka na osnovu userIdToUpdate
        //         const userToUpdate = userData.find(user => user.id === userIdToUpdate);

        //         if (!userToUpdate) {
        //             throw new Error(`Korisnik sa ID ${userIdToUpdate} nije pronađen.`);
        //         }

        //         // Ako su dostavljeni novi podaci, ažuriraj korisnika
        //         if (args.firstName) {
        //             userToUpdate.firstName = args.firstName;
        //         }
        //         if (args.lastName) {
        //             userToUpdate.lastName = args.lastName;
        //         }
        //         if (args.email) {
        //             userToUpdate.email = args.email;
        //         }
        //         if (args.password) {
        //             userToUpdate.password = args.password;
        //         }

        //         return userToUpdate;
        //     },
        // },
        deleteUser: {
            type: GraphQLInt,
            args: {
                id: { type: GraphQLInt },
            },
            resolve(parent, args) {
                const userIdToDelete = args.id;
                const userIndexToDelete = userData.findIndex((user) => user.id === userIdToDelete);

                if (userIndexToDelete !== -1) {
                    // Ako je pronađen korisnik sa datim ID-om, obrišite ga iz niza
                    userData.splice(userIndexToDelete, 1);
                    return `Korisnik sa ID ${userIdToDelete} je obrisan.`;
                } else {
                    // Ako korisnik sa datim ID-om nije pronađen, vratite odgovarajuću poruku
                    throw new Error(`Korisnik sa ID ${userIdToDelete} nije pronađen.`);
                }
            }
        }
    }
});


module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });