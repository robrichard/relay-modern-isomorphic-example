'use strict';

import {fetchQuery} from 'react-relay';
import nunjucks from 'nunjucks';
import React from 'react';
import {renderToString} from 'react-dom/server';
import getRelayEnvironment from './getRelayEnvironment';
import PropTypes from 'prop-types';
import TodoApp from './components/TodoApp';
import rootQuery from './root';

const variables = {};

class RelayContextProvider extends React.Component {
  getChildContext() {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.variables
      }
    }
  }
  render() {
    return this.props.render();
  }
}

RelayContextProvider.childContextTypes = {
  relay: PropTypes.object.isRequired
};

export default async function(req, res, next) {
  const environment = getRelayEnvironment();
  const data = await fetchQuery(environment, rootQuery, variables);
  const renderedComponent = renderToString(
    <RelayContextProvider
      environment={environment}
      variables={variables}
      render={() => <TodoApp {...data}/>}
    />
  );


  res.send(nunjucks.render('index.html', {
    renderedComponent: renderedComponent,
    records: JSON.stringify(environment.getStore().getSource()),
  }));
}
