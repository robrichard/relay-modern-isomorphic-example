import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';
import {ReactRelayContext} from 'react-relay';
import QueryRenderer from 'relay-query-lookup-renderer';
import TodoApp from './components/TodoApp';
import rootQuery from './root';
import getRelayEnvironment from './getRelayEnvironment';

const environment = getRelayEnvironment(window.records);

ReactDOM.render(
  <QueryRenderer
    lookup
    retain
    environment={environment}
    variables={{}}
    query={rootQuery}
    render={({props}) => {
      if (!props) {
        return null;
      }
      return <TodoApp viewer={props.viewer} />
    }}
  />,
  document.getElementById('root')
);
