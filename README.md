# GraphQL

1. 1 super chargered endpoint
2. Mutations allow us to mutate our data => Creating, Modifying or Deleting data is considered a mutation (duh).

## Imports
1. Import our datatypes for our Schema attributes
```javascript
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
```

## Sample Type
1. A 'Schema' that describes the shape of our data
2. Fields is a function that returns an object, which lists the attributes of our Schema, using the types imported above.
3. When nesting schemas' you use that SchemaType to create a 'relationship' between the data. Similar to how Foreign Keys in SQL works. It creates integrity.
4. The `parent` parameter contains the information from the parent SchemaType.
```javascript
const BookType = new GraphQLObjectType({
  name: 'Book',
  // fields are our properties
  // will help overcome reference errors when we have multiple types
  fields: () => ({
    id: { type: GraphQLID }, // GraphQLID allows you to query by ID as an integer or string => but args.id is still a string type
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // nesting
    author: {
      type: AuthorType,
      // parent object contains the data that was passed through from the parent query (Book)
      resolve(parent, args) {
        const { authorId } = parent;
        // return _.find(authors, { id: authorID });
        return Author.findById(authorId);
      },
    },
  }),
});
```

## Sample mutation
1. Fields are essentially functions used to create, update, or delete rows from our database.
2. Args is an object that lists the parameters, used to query our database.
3. Resolve is essentially the database queries we run to fetch our data (models)
```javascript
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      // expect the client to send data
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { name, age }) {
        const author = new Author({ name, age });
        return author.save();
      },
    },
  },
});
```

## EXPORT THE SCHEMA
```javascript
module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
```

## modules
1. express-graphql
    1. Allows express to understand GraphQL

# Apollo

1. GraphQL Client to make requests to the server. (similar to Axios)
2. Manages the passage of data between client and server.

## CREATE A CLIENT
```javascript
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "......."
});
```

## MODULES
1. apollo-boost: Package containing everything you need to set up Apollo Client
2. react-apollo: View layer integration for React
3. graphql: Also parses your GraphQL queries