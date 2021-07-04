const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const getPeopleFromAPI = async page => {
    let url = page && page > 1 ? `https://swapi.dev/api/people?format=json&page=${page}` : `https://swapi.dev/api/people?format=json`;
    let response = await axios.get(url)
    let data = response.data.results;
    return data.map(person => {
        return {
            name: person.name,
            height: person.height,
            gender: person.gender,
            mass: person.mass,
            homeworld: person.homeworld
        }
    });
}

const getPersonByName = async name => {
    let url = `https://swapi.dev/api/people?format=json&search=${name}`;
    let response = await axios.get(url);
    let data = response.data.results[0];
    return data;
}

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Person {
    name: String,
    height: String,
    gender: String,
    mass: String,
    homeworld: String, 
    age: String,
    hair_color: String,
    skin_color: String,
    birth_year: String,
    films: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
    created: String,
    edited: String,
    url: String 
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    person (name: String!): Person,
    persons (page: Int): [Person] 
  }
`;

const resolvers = {
    Query: {
        persons: async (parent, args, context, info) => await getPeopleFromAPI(args.page || 1),
        person: async (parent, args, context, info) => await getPersonByName(args.name),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
    getPeopleFromAPI();
});