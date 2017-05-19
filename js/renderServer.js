'use strict';

import {
  createOperationSelector,
  getOperation,
} from 'relay-runtime';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';
import getRelayEnvironment from './getRelayEnvironment';
import RelayLookupQueryRenderer from './RelayLookupQueryRenderer';
import TodoApp from './components/TodoApp';
import rootQuery from './root';

const variables = {};

export default function(req, res, next) {
  const environment = getRelayEnvironment();
  const operation = createOperationSelector(
    getOperation(rootQuery),
    variables
  );

  environment.retain(operation.root);
  environment.sendQuery({
    operation,
    onCompleted: () => {
      const renderedComponent = renderToString(
        <RelayLookupQueryRenderer
          lookup
          environment={environment}
          query={rootQuery}
          variables={variables}
          render={({props}) => <TodoApp viewer={props.viewer}/>}
        />
      );


      res.send(nunjucks.render('index.html', {
        renderedComponent: renderedComponent,
        records: JSON.stringify(environment.getStore().getSource()),
      }));
    },
    onError: e => {
      console.error(e);
      res.status('500').end();
    },
  });
}
