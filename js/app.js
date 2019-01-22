import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';
import {ReactRelayContext} from 'react-relay';
import {createOperationDescriptor, getRequest} from 'relay-runtime';
import TodoApp from './components/TodoApp';
import rootQuery from './root';
import getRelayEnvironment from './getRelayEnvironment';

const environment = getRelayEnvironment(window.records);
const operation = createOperationDescriptor(getRequest(rootQuery), {});
const snapshot = environment.lookup(operation.fragment);

ReactDOM.render(
  <ReactRelayContext.Provider value={{environment, variables: snapshot.variables}}>
    <TodoApp viewer={snapshot.data.viewer} />
  </ReactRelayContext.Provider>,
  document.getElementById('root')
);
