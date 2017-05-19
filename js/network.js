'use strict';

import 'isomorphic-fetch';
import {Network} from 'relay-runtime';

function fetchQuery(
  operation,
  variables,
) {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

export default Network.create(fetchQuery);
