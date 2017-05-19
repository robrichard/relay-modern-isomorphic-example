'use strict';

export default graphql`
    query rootQuery {
        viewer {
            ...TodoApp_viewer
        }
    }
`;
