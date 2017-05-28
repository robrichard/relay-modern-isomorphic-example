import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';
import QueryLookupRenderer from 'relay-query-lookup-renderer';
import TodoApp from './components/TodoApp';
import rootQuery from './root';
import getRelayEnvironment from './getRelayEnvironment';
const mountNode = document.getElementById('root');

const environment = getRelayEnvironment(window.records);

ReactDOM.render(
  <QueryLookupRenderer
    lookup
    environment={environment}
    query={rootQuery}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <TodoApp viewer={props.viewer} />;
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  mountNode
);
