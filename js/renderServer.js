'use strict';

import {fetchQuery} from 'react-relay';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';
import getRelayEnvironment from './getRelayEnvironment';
import PropTypes from 'prop-types';
import TodoApp from './components/TodoApp';
import RelayContextProvider from 'relay-context-provider';
import rootQuery from './root';

const variables = {};

export default async function(req, res, next) {
  const environment = getRelayEnvironment();
  const data = await fetchQuery(environment, rootQuery, variables);
  const renderedComponent = renderToString(
    <RelayContextProvider
      environment={environment}
      variables={variables}
    >
      <TodoApp {...data}/>
    </RelayContextProvider>
  );


  res.send(nunjucks.render('index.html', {
    renderedComponent: renderedComponent,
    records: JSON.stringify(environment.getStore().getSource()),
  }));
}
