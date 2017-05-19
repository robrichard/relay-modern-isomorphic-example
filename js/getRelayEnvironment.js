'use strict';

import 'isomorphic-fetch';
import {
  Environment,
  RecordSource,
  Store,
} from 'relay-runtime';
import network from './network';

export default function getRelayEnvironment(records) {
  const source = new RecordSource(records);
  const store = new Store(source);

  // Create a network layer from the fetch function
  return new Environment({network, store});
}

