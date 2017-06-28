# Isomorphic Relay Modern TodoMVC

This is the [todo-modern example](https://github.com/relayjs/relay-examples/tree/master/todo-modern) updated to use universal/isomorphic/server side renderering.

How? [See the diff](https://github.com/robrichard/relay-modern-isomorphic-example/compare/4a1b2ca08d5bd841dbc935eabcf1614f9272d303...master)

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
