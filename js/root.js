import {graphql} from 'react-relay';

export default graphql`
    query rootQuery {
        viewer {
            ...TodoApp_viewer
        }
    }
`;
