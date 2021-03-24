import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css'
import './css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApolloClient,InMemoryCache,split} from '@apollo/client'
import {ApolloProvider} from '@apollo/react-hooks'
import {createUploadLink} from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = createUploadLink({uri:"http://localhost:4000/graphql",credentials:"include"})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const splitLink = split(
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

const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
  
})

ReactDOM.render(
<ApolloProvider client={client}>
<App/>
</ApolloProvider>
 ,
  document.getElementById('root')
);

