# Isomorphic Relay Modern TodoMVC

This is the [todo-modern example](https://github.com/relayjs/relay-examples/tree/master/todo-modern) updated to use universal/isomorphic/server side renderering.

How? [See the diff](https://github.com/robrichard/relay-modern-isomorphic-example/compare/4a1b2ca08d5bd841dbc935eabcf1614f9272d303...master)

## Approach
On the server (renderServer.js), we fetch the data needed directly by using the `fetchQuery` function that is exported by `react-relay`. This function returns a promise that resolves with the result of the query. We then use [relay-context-provider](https://www.npmjs.com/package/relay-context-provider) to synchronously render the components to string. The Relay store is then serialized to JSON and passed to the client.

On the client (app.js), a new environment is created with the data sent from the server. Then the components are rendered using [relay-query-lookup-renderer](https://www.npmjs.com/package/relay-query-lookup-renderer). With the lookup prop, the component will be rendered immediately with the data from the store. In a more complex app you may change the variables passed to the QueryLookupRenderer and it will fetch the data if needed.

## Installation

```
yarn install
```

## Running

Set up generated files:

```
yarn run update-schema
yarn run build
```

Start a local server:

```
yarn start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.graphql`, and restart the server:

```
yarn run update-schema
yarn run build
yarn start
```
