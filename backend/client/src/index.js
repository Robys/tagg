import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css'
import {ApolloClient,InMemoryCache} from '@apollo/client'
import {ApolloProvider} from '@apollo/react-hooks'
import {createUploadLink} from 'apollo-upload-client'

const uplink = createUploadLink({
  uri:"/graphql", 
  credentials:'include',
})

/**Setting Apollo Client**/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uplink,
})

  ReactDOM.render(
  <ApolloProvider client={client}>
  <App/>
  </ApolloProvider>
   ,
    document.getElementById('root')
  );


/** Removing WebSockets
 * 
 * import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
 * 
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});
 * 
 * const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
 * 
 * 
 */