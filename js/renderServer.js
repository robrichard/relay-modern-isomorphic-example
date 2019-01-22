'use strict';

import {fetchQuery, ReactRelayContext} from 'react-relay';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';
import getRelayEnvironment from './getRelayEnvironment';
import PropTypes from 'prop-types';
import TodoApp from './components/TodoApp';
import rootQuery from './root';

const variables = {};

export default async function(req, res, next) {
  const environment = getRelayEnvironment();
  const data = await fetchQuery(environment, rootQuery, variables);
  const renderedComponent = renderToString(
    <ReactRelayContext.Provider value={{environment, variables}}>
      <TodoApp {...data}/>
    </ReactRelayContext.Provider>
  );


  res.send(nunjucks.render('index.html', {
    renderedComponent: renderedComponent,
    records: JSON.stringify(environment.getStore().getSource()),
  }));
}
