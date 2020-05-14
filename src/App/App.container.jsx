import React from 'react';
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost';
import {flowRight} from 'lodash'

import App from './App';

const SET_CURRENT_USER = gql `
    mutation SetCurrentUser($user: User!){
        setCurrentUser(user: $user) @client
    }
`;
const GET_CURRENT_USER = gql `
    {
        currentUser @client
    }
`
const AppContainer = ({setCurrentUser,currentUserQuery}) => {
    const {currentUser} = currentUserQuery;
    return(
    <App setCurrentUser = {(user) => setCurrentUser({variables: {user}})} currentUser = {currentUser} />
)}

export default flowRight(
    graphql(SET_CURRENT_USER,{name: 'setCurrentUser'}),
    graphql(GET_CURRENT_USER,{name: 'currentUserQuery'})
)(AppContainer);