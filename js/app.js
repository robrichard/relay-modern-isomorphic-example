import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';
import RelayLookupQueryRenderer from './RelayLookupQueryRenderer';
import TodoApp from './components/TodoApp';
import rootQuery from './root';
import getRelayEnvironment from './getRelayEnvironment';
const mountNode = document.getElementById('root');

const environment = getRelayEnvironment(window.records);

ReactDOM.render(
  <RelayLookupQueryRenderer
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
